import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BaseCodeComponent } from '../base/base-code.component';
import { AmwDatepickerComponent } from '../../../../library/src/controls/components/amw-datepicker/amw-datepicker.component';

type DatepickerExamples = 'basic' | 'withMinMax' | 'withValidation' | 'differentFormats' | 'disabled' | 'reactiveForm' | 'withEvents' | 'bookingForm';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-datepicker-code',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    AmwDatepickerComponent,
    MatExpansionModule,
    AmwButtonComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './datepicker-code.component.html',
  styleUrl: './datepicker-code.component.scss'
})
export class DatepickerCodeComponent extends BaseCodeComponent<DatepickerExamples> implements OnInit {
  // State for live preview examples
  selectedDate = new Date();
  minDate = new Date(1900, 0, 1);
  maxDate = new Date();
  currentDate = new Date();
  birthDate = new Date(1990, 0, 1);
  shortDate = new Date();
  longDate = new Date();
  customDate = new Date();
  eventDate = new Date();
  isDisabled = false;
  dateForm!: FormGroup;
  bookingForm!: FormGroup;

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<DatepickerExamples, string> = {
    basic: `<amw-datepicker
  label="Select Date"
  placeholder="Choose a date..."
  [value]="selectedDate">
</amw-datepicker>`,

    withMinMax: `<amw-datepicker
  label="Birth Date"
  placeholder="Select your birth date..."
  [min]="minDate"
  [max]="maxDate"
  [value]="birthDate">
</amw-datepicker>

// Component setup
minDate = new Date(1900, 0, 1);
maxDate = new Date();
birthDate = new Date(1990, 0, 1);`,

    withValidation: `<amw-datepicker
  formControlName="startDate"
  label="Start Date"
  placeholder="Select start date..."
  [required]="true"
  [min]="new Date()"
  appearance="outline">
</amw-datepicker>

// Form setup
form = this.fb.group({
  startDate: ['', Validators.required]
});`,

    differentFormats: `<amw-datepicker
  label="Short Date"
  placeholder="MM/DD/YYYY"
  [value]="shortDate"
  format="short">
</amw-datepicker>

<amw-datepicker
  label="Long Date"
  placeholder="Month Day, Year"
  [value]="longDate"
  format="long">
</amw-datepicker>

<amw-datepicker
  label="Custom Format"
  placeholder="DD-MM-YYYY"
  [value]="customDate"
  format="dd-MM-yyyy">
</amw-datepicker>`,

    disabled: `<amw-datepicker
  label="Disabled Datepicker"
  placeholder="This is disabled..."
  [value]="selectedDate"
  [disabled]="true">
</amw-datepicker>`,

    reactiveForm: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
export class MyComponent {
  form: FormGroup;
  minDate = new Date();
  maxDate = new Date(2025, 11, 31);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      eventDate: ['', Validators.required]
    });
  }
}

// Template
<form [formGroup]="form">
  <amw-datepicker
    formControlName="startDate"
    label="Start Date"
    placeholder="Select start date..."
    [min]="minDate"
    [required]="true">
  </amw-datepicker>

  <amw-datepicker
    formControlName="endDate"
    label="End Date"
    placeholder="Select end date..."
    [min]="minDate"
    [max]="maxDate"
    [required]="true">
  </amw-datepicker>

  <amw-datepicker
    formControlName="eventDate"
    label="Event Date"
    placeholder="Select event date..."
    [min]="minDate"
    [required]="true">
  </amw-datepicker>
</form>`,

    withEvents: `<amw-datepicker
  label="Event Date"
  placeholder="Select event date..."
  [value]="eventDate"
  (dateChange)="onDateChange($event)"
  (opened)="onDatepickerOpened()"
  (closed)="onDatepickerClosed()">
</amw-datepicker>

// Component methods
onDateChange(event: any): void {
  this.eventDate = event.value;
  console.log('Date changed to:', this.eventDate);
}

onDatepickerOpened(): void {
  console.log('Datepicker opened');
}

onDatepickerClosed(): void {
  console.log('Datepicker closed');
}`,

    bookingForm: `<form [formGroup]="bookingForm" class="booking-form">
  <h3>Event Booking</h3>

  <amw-datepicker
    formControlName="eventDate"
    label="Event Date"
    placeholder="Select event date..."
    [min]="new Date()"
    [required]="true">
  </amw-datepicker>

  <amw-datepicker
    formControlName="startTime"
    label="Start Time"
    placeholder="Select start time..."
    [min]="new Date()"
    [required]="true">
  </amw-datepicker>

  <amw-datepicker
    formControlName="endTime"
    label="End Time"
    placeholder="Select end time..."
    [min]="new Date()"
    [required]="true">
  </amw-datepicker>

  <amw-datepicker
    formControlName="setupDate"
    label="Setup Date"
    placeholder="Select setup date..."
    [min]="new Date()">
  </amw-datepicker>

  <amw-button
    type="submit"
    variant="elevated"
    color="primary"
    [disabled]="bookingForm.invalid">
    Book Event
  </amw-button>
</form>`
  };

  constructor(private fb: FormBuilder) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    // Initialize form for validation example
    this.dateForm = this.fb.group({
      startDate: ['', Validators.required]
    });

    // Initialize booking form
    this.bookingForm = this.fb.group({
      eventDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      setupDate: ['']
    });
  }

  // Event handlers for event example
  onDateChange(event: any): void {
    console.log('Date changed to:', event);
  }

  onDatepickerOpened(): void {
    console.log('Datepicker opened');
  }

  onDatepickerClosed(): void {
    console.log('Datepicker closed');
  }
}