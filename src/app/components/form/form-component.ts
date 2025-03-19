import { Component } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-component.html',
  styleUrl: './form-component.css',
})
export class FormComponent implements ControlValueAccessor {
  onChange: any = () => {};
  onTouched: any = () => {};

  countries = ['Argentina', 'Brasil', 'Chile', 'Uruguay'];
  provinces: { [key: string]: string[] } = {
    Argentina: ['Buenos Aires', 'Córdoba', 'Mendoza', 'Tierra del Fuego'],
    Brasil: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Paraná'],
    Chile: ['Santiago', 'Valparaíso', 'Antofagasta', 'Atacama'],
    Uruguay: ['Montevideo', 'Artigas', 'Canelones', 'Maldonado'],
  };
  filteredProvinces: string[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.pattern('^[0-9]{9}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
  });

  onSelectedCountry(event: Event) {
    const selectedCountry: string | null | undefined =
      this.form.get('country')?.value;
    if (selectedCountry != null) this.onFilteredProvinces(selectedCountry);
  }

  // should be an observable from the values of the service when we select a country
  onFilteredProvinces(selectedCountry: string) {
    this.filteredProvinces = this.provinces[selectedCountry];
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  // CVA
  writeValue(value: any): void {
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength} characters`;
    }
    if (control?.hasError('pattern')) {
      return 'Please enter a valid phone number (9 digits)';
    }
    return '';
  }
}
