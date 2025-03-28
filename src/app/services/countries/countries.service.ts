import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countriesUrl = `${environment.BASE_URL}/v0.1/countries/flag/unicode`;
  private provincesUrl = `${environment.BASE_URL}/v0.1/countries/states`;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<string[]> {
    return this.http
      .get<any>(this.countriesUrl)
      .pipe(
        map((response) =>
          response.data.map((country: any) => country.name).sort()
        )
      );
  }

  getProvincesByCountryName(country: string): Observable<string[]> {
    return this.http
      .post<any>(this.provincesUrl, { country })
      .pipe(
        map((response) =>
          response.data.states
            .filter((state: any) =>
              state.name.toLowerCase().includes('province')
            )
            .map((state: any) =>
              state.name.replace(/\s*province\s*/i, '').trim()
            )
        )
      );
  }
}
