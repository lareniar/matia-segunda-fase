import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('getErrorMessage', () => {
    it('should return required error message', () => {
      component.form.get('name')?.setErrors({ required: true });
      expect(component.getErrorMessage('name')).toBe('Este campo es requerido');
    });

    it('should return email error message', () => {
      component.form.get('email')?.setErrors({ email: true });
      expect(component.getErrorMessage('email')).toBe(
        'Introduce un email válido'
      );
    });

    it('should return minlength error message', () => {
      component.form.get('name')?.setErrors({
        minlength: { requiredLength: 3 },
      });
      expect(component.getErrorMessage('name')).toBe('Mínimo 3 caracteres');
    });

    it('should return phone pattern error message', () => {
      component.form.get('phone')?.setErrors({ pattern: true });
      expect(component.getErrorMessage('phone')).toBe(
        'Introduce un teléfono válido (9 dígitos)'
      );
    });

    it('should return email pattern error message', () => {
      component.form.get('email')?.setErrors({ pattern: true });
      expect(component.getErrorMessage('email')).toBe(
        'Introduce un email válido'
      );
    });
  });
});
