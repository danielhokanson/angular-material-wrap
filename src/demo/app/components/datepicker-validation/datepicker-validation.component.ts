import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwDatepickerComponent } from '../../../../library/src/controls/components/amw-datepicker/amw-datepicker.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-datepicker-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AmwDatepickerComponent,
    AmwButtonComponent,
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
    private notification: AmwNotificationService
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
      this.notification.success('Success', 'Form is valid! All date fields are properly filled.', { duration: 3000 });
    } else {
      this.notification.error('Error', 'Form has validation errors. Please check the date fields.', { duration: 3000 });
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