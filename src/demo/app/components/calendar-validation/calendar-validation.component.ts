import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'amw-demo-calendar-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
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

  constructor(private fb: FormBuilder) {
    // Basic date picker with required validation
    this.basicDateForm = this.fb.group({
      birthDate: ['', Validators.required]
    });

    // Date range with start/end validation
    this.dateRangeForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    // Event booking with multiple date fields
    this.eventBookingForm = this.fb.group({
      eventName: ['', [Validators.required, Validators.minLength(3)]],
      eventDate: ['', Validators.required],
      registrationDeadline: ['', Validators.required]
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
  validateDateRange(): boolean {
    const startDate = this.dateRangeForm.get('startDate')?.value;
    const endDate = this.dateRangeForm.get('endDate')?.value;

    if (startDate && endDate) {
      return new Date(startDate) <= new Date(endDate);
    }
    return true;
  }

  getDateRangeError(): string {
    if (!this.validateDateRange()) {
      return 'End date must be after start date';
    }
    return '';
  }

  // Event booking validation
  validateEventBooking(): boolean {
    const eventDate = this.eventBookingForm.get('eventDate')?.value;
    const deadline = this.eventBookingForm.get('registrationDeadline')?.value;

    if (eventDate && deadline) {
      return new Date(deadline) <= new Date(eventDate);
    }
    return true;
  }

  getEventBookingError(): string {
    if (!this.validateEventBooking()) {
      return 'Registration deadline must be before event date';
    }
    return '';
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
