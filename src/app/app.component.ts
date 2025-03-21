import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { HeaderComponent } from './components/header/header.component';
import { CountriesService } from './services/countries/countries.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { TableComponent } from './components/table/table.component';
import { Record } from './interfaces/form';
import { RecordStorageService } from './services/storage/record.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, HeaderComponent, TableComponent],
  providers: [CountriesService, RecordStorageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'matia-segunda-fase';

  records: Record[] = [];

  countries$ = new Observable<string[]>();
  provinces$ = new Observable<string[]>();
  isLoadingStates = true;
  tableHeaders: string[] = [];

  constructor(
    private countriesService: CountriesService,
    private storageService: RecordStorageService
  ) {
    this.countries$ = this.countriesService.getCountries();
    this.tableHeaders = [
      'Nombre',
      'Apellidos',
      'Teléfono',
      'Email',
      'País',
      'Provincia',
    ];
  }

  ngOnInit() {
    this.records = this.storageService.getLocalStorage();
  }

  onSelectedCountry(country: string) {
    this.isLoadingStates = true;
    this.provinces$ = this.countriesService
      .getProvincesByCountryName(country)
      .pipe(
        tap((provinces) => {
          this.isLoadingStates = provinces.length == 0;
        }),
        catchError((error) => {
          return of([]);
        })
      );
  }

  onAddRecord(record: Record) {
    this.records.push(record);
    this.storageService.saveLocalStorageArray(this.records);
  }

  onDeleteRecord() {
    this.storageService.saveLocalStorageArray(this.records);
  }
}
