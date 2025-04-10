import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Record } from '../../interfaces/form';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputComponent, SelectComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements ControlValueAccessor {
  onChange: any = () => {};
  onTouched: any = () => {};
  phoneErrorMessage: string = '';
  nameErrorMessage: string = '';
  surnameErrorMessage: string = '';
  emailErrorMessage: string = '';

  @Input() countries$: Observable<string[]> = new Observable<string[]>();
  @Input() provinces$: Observable<string[]> = new Observable<string[]>();
  @Input() isLoadingStates = false;

  @Output() selectedCountry = new EventEmitter<string>();
  @Output() addRecord = new EventEmitter<Record>();
  previousCountry: string | null = null;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phoneRegex = /^[0-9]{9}$/;

  // The form group validators should use a factory to generate each form control
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.pattern(this.phoneRegex),
      Validators.maxLength(9),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailRegex),
    ]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
  });

  onSelectedCountry(event: Event) {
    const selectedCountry: string | null | undefined =
      this.form.get('country')?.value;
    if (selectedCountry != null && selectedCountry !== this.previousCountry) {
      this.selectedCountry.emit(selectedCountry);
      this.previousCountry = selectedCountry;
      // Reset state when country changes
      this.form.get('state')?.setValue('');
    }
  }

  onClearFields() {
    this.form.reset({
      name: '',
      surname: '',
      phone: '',
      email: '',
      country: '',
      state: '',
    });
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.markAsUntouched();
      control?.updateValueAndValidity();
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const record: Record = this.form.value as Record;
      this.addRecord.emit(record);
      this.onClearFields();
    }
  }

  onBlurPhone() {
    const phoneControl = this.form.get('phone');
    if (phoneControl?.value && phoneControl.valid) {
      phoneControl.setErrors(null);
    } else {
      phoneControl?.setErrors({ pattern: true });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'Introduce un email válido';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (control?.hasError('pattern')) {
      if (controlName === 'phone') {
        return 'Introduce un teléfono válido (9 dígitos)';
      }
      if (controlName === 'email') {
        return 'Introduce un email válido';
      }
    }
    return '';
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
}
