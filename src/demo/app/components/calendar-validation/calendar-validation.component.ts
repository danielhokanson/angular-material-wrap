import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AmwFormValidationComponent, FormValidationConfig } from 'angular-material-wrap';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwDatepickerComponent } from '../../../../library/src/controls/components/amw-datepicker/amw-datepicker.component';
import { AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-calendar-validation',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatNativeDateModule,
    AmwFormValidationComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwDatepickerComponent,
    AmwCardComponent,
    AmwIconComponent],
  templateUrl: './calendar-validation.component.html',
  styleUrl: './calendar-validation.component.scss'
})
export class CalendarValidationComponent {
  // Basic date picker form
  basicDateForm: FormGroup;

  // Date range form
  dateRangeForm: FormGroup;

  // Event booking form
  eventBookingForm: FormGroup;

  // Min/Max dates for various forms
  today = new Date();
  minDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  maxDate = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate());

  // Form validation configurations
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

  constructor(private fb: FormBuilder) {
    // Basic date picker with required validation
    this.basicDateForm = this.fb.group({
      birthDate: ['', Validators.required]
    });

    // Date range with start/end validation
    this.dateRangeForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, {
      validators: [this.dateRangeValidator.bind(this)]
    });

    // Event booking with multiple date fields
    this.eventBookingForm = this.fb.group({
      eventName: ['', [Validators.required, Validators.minLength(3)]],
      eventDate: ['', Validators.required],
      registrationDeadline: ['', Validators.required]
    }, {
      validators: [this.eventBookingValidator.bind(this)]
    });
  }

  // Date filter for weekends only
  weekendFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day === 0 || day === 6;
  };

  // Date filter for weekdays only
  weekdayFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  // Validation methods
  getErrorMessage(formGroup: FormGroup, field: string): string {
    const control = formGroup.get(field);
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('matDatepickerParse')) return 'Invalid date format';
    if (control?.hasError('matDatepickerMin')) return 'Date is before minimum allowed';
    if (control?.hasError('matDatepickerMax')) return 'Date is after maximum allowed';
    if (control?.hasError('matDatepickerFilter')) return 'Date is not allowed';
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Minimum length is ${minLength} characters`;
    }
    return '';
  }

  // Date range validation
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

  validateDateRange(): boolean {
    return !this.dateRangeForm.hasError('invalidDateRange');
  }

  // Event booking validation
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

  validateEventBooking(): boolean {
    return !this.eventBookingForm.hasError('invalidEventBooking');
  }

  // Form submission
  submitBasicDate() {
    if (this.basicDateForm.valid) {
      console.log('Basic date submitted:', this.basicDateForm.value);
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

  // Form status checks
  isBasicDateValid(): boolean {
    return this.basicDateForm.valid;
  }

  isDateRangeValid(): boolean {
    return this.dateRangeForm.valid && this.validateDateRange();
  }

  isEventBookingValid(): boolean {
    return this.eventBookingForm.valid && this.validateEventBooking();
  }
}
