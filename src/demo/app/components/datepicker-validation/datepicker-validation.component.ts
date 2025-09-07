import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AmwDatepickerComponent } from '../../../../library/src/controls/components/amw-datepicker/amw-datepicker.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-datepicker-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    AmwDatepickerComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './datepicker-validation.component.html',
  styleUrl: './datepicker-validation.component.scss'
})
export class DatepickerValidationComponent implements OnInit {
  validationForm: FormGroup;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date();
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.validationForm = this.fb.group({
      birthDate: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.validationForm.valid) {
      this.snackBar.open('Form is valid! All date fields are properly filled.', 'Close', { duration: 3000 });
    } else {
      this.snackBar.open('Form has validation errors. Please check the date fields.', 'Close', { duration: 3000 });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.validationForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['matDatepickerMin']) return `Date must be after ${this.minDate.toLocaleDateString()}`;
      if (field.errors['matDatepickerMax']) return `Date must be before ${this.maxDate.toLocaleDateString()}`;
    }
    return '';
  }

  getFieldValue(fieldName: string): Date | null {
    const field = this.validationForm.get(fieldName);
    return field?.value || null;
  }
}