import { TestBed } from '@angular/core/testing';

import { CountriesService } from './countries.service';
import { provideHttpClient } from '@angular/common/http';

describe('CountriesService', () => {
  let service: CountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(CountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getCountries', () => {
    it('should return an array of countries', () => {
      service.getCountries().subscribe((countries) => {
        expect(countries).toBeDefined();
      });
    });
  });

  describe('getStatesByCountryName', () => {
    it('should return an array of states', () => {
      service.getStatesByCountryName('Spain').subscribe((states) => {
        expect(states).toBeDefined();
      });
    });
  });
});
