import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwRangeSliderComponent } from '../../../../library/src/controls/components/amw-range-slider/amw-range-slider.component';

@Component({
  selector: 'amw-demo-range-slider-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwRangeSliderComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './range-slider-validation.component.html',
  styleUrl: './range-slider-validation.component.scss'
})
export class RangeSliderValidationComponent extends BaseValidationComponent implements OnInit {
  validationForm: FormGroup = this.fb.group({
    priceRange: [{ start: 100, end: 500 }, [Validators.required]],
    ageRange: [{ start: 18, end: 65 }, [Validators.required]],
    temperatureRange: [{ start: 20, end: 30 }, [Validators.required]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Required', description: 'All range sliders are required' },
    { title: 'Range Logic', description: 'Start value must be less than end value' },
    { title: 'Bounds', description: 'Values must be within specified min/max ranges' },
    { title: 'Price Range', description: '$0 - $1000 with $10 increments' },
    { title: 'Age Range', description: '18 - 100 years with 1 year increments' },
    { title: 'Temperature', description: '-50 to 100 degrees with 1 degree increments' }
  ];

  ngOnInit(): void {
    this.validationForm.get('priceRange')?.setValidators([
      Validators.required,
      this.validateRange.bind(this)
    ]);

    this.validationForm.get('ageRange')?.setValidators([
      Validators.required,
      this.validateAgeRange.bind(this)
    ]);

    this.validationForm.get('temperatureRange')?.setValidators([
      Validators.required,
      this.validateTemperatureRange.bind(this)
    ]);
  }

  validateRange(control: AbstractControl): ValidationErrors | null {
    const range = control.value;
    if (!range || typeof range !== 'object') {
      return { invalidRange: true };
    }
    if (range.start >= range.end) {
      return { invalidRange: true };
    }
    if (range.start < 0 || range.end > 1000) {
      return { outOfBounds: true };
    }
    return null;
  }

  validateAgeRange(control: AbstractControl): ValidationErrors | null {
    const range = control.value;
    if (!range || typeof range !== 'object') {
      return { invalidRange: true };
    }
    if (range.start >= range.end) {
      return { invalidRange: true };
    }
    if (range.start < 18 || range.end > 100) {
      return { outOfBounds: true };
    }
    return null;
  }

  validateTemperatureRange(control: AbstractControl): ValidationErrors | null {
    const range = control.value;
    if (!range || typeof range !== 'object') {
      return { invalidRange: true };
    }
    if (range.start >= range.end) {
      return { invalidRange: true };
    }
    if (range.start < -50 || range.end > 100) {
      return { outOfBounds: true };
    }
    return null;
  }

  getErrorMessage(controlName: string): string {
    const control = this.validationForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('invalidRange')) {
      return 'Start value must be less than end value';
    }
    if (control?.hasError('outOfBounds')) {
      return 'Values are out of acceptable range';
    }
    return '';
  }

  hasRangeError(controlName: string): boolean {
    const control = this.validationForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}
