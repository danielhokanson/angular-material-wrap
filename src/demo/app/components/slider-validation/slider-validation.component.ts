import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AmwSliderComponent } from '../../../../library/src/controls/components/amw-slider/amw-slider.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-slider-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSliderModule,
    MatButtonModule,
    MatSnackBarModule,
    AmwSliderComponent,
    AmwButtonComponent
],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './slider-validation.component.html',
  styleUrl: './slider-validation.component.scss'
})
export class SliderValidationComponent implements OnInit {
  validationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.validationForm = this.fb.group({
      volume: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
      brightness: [75, [Validators.required, Validators.min(10), Validators.max(100)]],
      temperature: [20, [Validators.required, Validators.min(-10), Validators.max(40)]],
      rating: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      progress: [25, [Validators.required, Validators.min(0), Validators.max(100)]],
      price: [100, [Validators.required, Validators.min(10), Validators.max(1000)]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.validationForm.valid) {
      this.snackBar.open('Form is valid! All slider values are within acceptable ranges.', 'Close', { duration: 3000 });
    } else {
      this.snackBar.open('Form has validation errors. Please check the slider values.', 'Close', { duration: 3000 });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.validationForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['min']) return `Minimum value is ${field.errors['min'].min}`;
      if (field.errors['max']) return `Maximum value is ${field.errors['max'].max}`;
    }
    return '';
  }

  getFieldValue(fieldName: string): number {
    const field = this.validationForm.get(fieldName);
    return field?.value || 0;
  }

  getFieldMin(fieldName: string): number {
    const field = this.validationForm.get(fieldName);
    return field?.errors?.['min']?.min || 0;
  }

  getFieldMax(fieldName: string): number {
    const field = this.validationForm.get(fieldName);
    return field?.errors?.['max']?.max || 100;
  }
}