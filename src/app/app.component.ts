import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { HeaderComponent } from './components/header/header.component';
import { CountriesService } from './services/countries.service';
import { catchError, Observable, of, tap } from 'rxjs';

import { TableComponent } from './components/table/table.component';
import { Record } from './interfaces/record';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, HeaderComponent, TableComponent],
  providers: [CountriesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'matia-segunda-fase';

  records: Record[] = [];

  countries = new Observable<string[]>();
  states = new Observable<string[]>();
  isLoadingStates = true;
  tableHeaders: string[] = [];

  constructor(private countriesService: CountriesService) {
    this.countries = this.countriesService.getCountries();
    this.tableHeaders = [
      'name',
      'surname',
      'phone',
      'email',
      'country',
      'state',
    ];
  }

  onSelectedCountry(country: string) {
    this.isLoadingStates = true;
    this.states = this.countriesService.getStatesByCountryName(country).pipe(
      tap((states) => {
        this.isLoadingStates = states.length == 0;
      }),
      catchError((error) => {
        console.error('Error fetching states:', error);
        return of([]);
      })
    );
  }

  onAddRecord(record: Record) {
    this.records.push(record);
  }

  onChange(event: Event) {
    console.log('a');
  }
}
