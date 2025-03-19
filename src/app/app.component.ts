import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { HeaderComponent } from './components/header/header.component';
import { CountriesService } from './services/countries.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, HeaderComponent, HttpClientModule],
  providers: [CountriesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'matia-segunda-fase';

  countries = new Observable<string[]>();
  states = new Observable<string[]>();
  isLoadingStates = false;

  constructor(private countriesService: CountriesService) {
    this.countries = this.countriesService.getCountries();
  }

  onSelectedCountry(country: string) {
    this.isLoadingStates = true;
    this.states = this.countriesService.getStatesByCountryName(country);
    this.isLoadingStates = false;
  }
}
