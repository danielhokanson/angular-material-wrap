import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwFormValidationComponent, FormValidationConfig } from 'angular-material-wrap';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwDatepickerComponent } from '../../../../library/src/controls/components/amw-datepicker/amw-datepicker.component';
import { AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-calendar-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwFormValidationComponent,
    AmwInputComponent,
    AmwDatepickerComponent,
    AmwCardComponent,
    AmwIconComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar-validation.component.html',
  styleUrl: './calendar-validation.component.scss'
})
export class CalendarValidationComponent extends BaseValidationComponent {
  today = new Date();
  minDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  maxDate = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate());

  // Main validation form - used by BaseValidationComponent
  validationForm: FormGroup = this.fb.group({
    birthDate: ['', Validators.required]
  });

  dateRangeForm: FormGroup = this.fb.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  }, {
    validators: [this.dateRangeValidator.bind(this)]
  });

  eventBookingForm: FormGroup = this.fb.group({
    eventName: ['', [Validators.required, Validators.minLength(3)]],
    eventDate: ['', Validators.required],
    registrationDeadline: ['', Validators.required]
  }, {
    validators: [this.eventBookingValidator.bind(this)]
  });

  dateRangeValidation: FormValidationConfig = {
    invalidDateRange: {
      message: 'End date must be after start date',
      showWhen: (form) => {
        const startDate = form.get('startDate');
        const endDate = form.get('endDate');
        return (startDate?.touched || endDate?.touched) ?? false;
      },
      severity: 'error',
      affectedFields: ['startDate', 'endDate']
    }
  };

  eventBookingValidation: FormValidationConfig = {
    invalidEventBooking: {
      message: 'Registration deadline must be before event date',
      showWhen: (form) => {
        const eventDate = form.get('eventDate');
        const deadline = form.get('registrationDeadline');
        return (eventDate?.touched || deadline?.touched) ?? false;
      },
      severity: 'error',
      affectedFields: ['eventDate', 'registrationDeadline']
    }
  };

  validationInfo: ValidationInfo[] = [
    { title: 'Basic Date Picker', description: 'Simple date selection with required validation' },
    { title: 'Date Range', description: 'Start/end date with range validation' },
    { title: 'Event Booking', description: 'Complex form with multiple date constraints' },
    { title: 'Cross-field Validation', description: 'End date must be after start date' }
  ];

  dateRangeValidator(group: FormGroup): ValidationErrors | null {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    return start <= end ? null : { invalidDateRange: true };
  }

  eventBookingValidator(group: FormGroup): ValidationErrors | null {
    const eventDate = group.get('eventDate')?.value;
    const deadline = group.get('registrationDeadline')?.value;

    if (!eventDate || !deadline) {
      return null;
    }

    const event = new Date(eventDate);
    const registrationDeadline = new Date(deadline);

    return registrationDeadline <= event ? null : { invalidEventBooking: true };
  }

  getCalendarErrorMessage(formGroup: FormGroup, field: string): string {
    const control = formGroup.get(field);
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('matDatepickerParse')) return 'Invalid date format';
    if (control?.hasError('matDatepickerMin')) return 'Date is before minimum allowed';
    if (control?.hasError('matDatepickerMax')) return 'Date is after maximum allowed';
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Minimum length is ${minLength} characters`;
    }
    return '';
  }

  validateDateRange(): boolean {
    return !this.dateRangeForm.hasError('invalidDateRange');
  }

  validateEventBooking(): boolean {
    return !this.eventBookingForm.hasError('invalidEventBooking');
  }

  submitBasicDate() {
    if (this.validationForm.valid) {
      console.log('Basic date submitted:', this.validationForm.value);
      alert('Basic date submitted! Check console for data.');
    }
  }

  submitDateRange() {
    if (this.dateRangeForm.valid && this.validateDateRange()) {
      console.log('Date range submitted:', this.dateRangeForm.value);
      alert('Date range submitted! Check console for data.');
    }
  }

  submitEventBooking() {
    if (this.eventBookingForm.valid && this.validateEventBooking()) {
      console.log('Event booking submitted:', this.eventBookingForm.value);
      alert('Event booking submitted! Check console for data.');
    }
  }

  isBasicDateValid(): boolean {
    return this.validationForm.valid;
  }

  isDateRangeValid(): boolean {
    return this.dateRangeForm.valid && this.validateDateRange();
  }

  isEventBookingValid(): boolean {
    return this.eventBookingForm.valid && this.validateEventBooking();
  }
}
