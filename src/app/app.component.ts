import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { HeaderComponent } from './components/header/header.component';
import { CountriesService } from './services/countries.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/table/table.component';
import { Record } from './interfaces/record';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormComponent,
    HeaderComponent,
    HttpClientModule,
    TableComponent,
  ],
  providers: [CountriesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'matia-segunda-fase';

  records: Record[] = [];

  countries = new Observable<string[]>();
  states = new Observable<string[]>();
  isLoadingStates = false;
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
    // should use httpinterceptor to show loading state
    setTimeout(() => {
      this.states = this.countriesService.getStatesByCountryName(country);
      this.isLoadingStates = false;
    }, 1250);
  }

  onAddRecord(record: Record) {
    this.records.push(record);
  }
}
