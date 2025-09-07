import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-datepicker-code',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './datepicker-code.component.html',
  styleUrl: './datepicker-code.component.scss'
})
export class DatepickerCodeComponent {
  codeExamples = {
    basic: {
      title: 'Basic Datepicker',
      description: 'A simple datepicker with default settings',
      code: `<amw-datepicker
  label="Select Date"
  placeholder="Choose a date..."
  [value]="selectedDate">
</amw-datepicker>`
    },
    withMinMax: {
      title: 'Datepicker with Min/Max Dates',
      description: 'Datepicker with date range restrictions',
      code: `<amw-datepicker
  label="Birth Date"
  placeholder="Select your birth date..."
  [min]="minDate"
  [max]="maxDate"
  [value]="birthDate">
</amw-datepicker>

// Component setup
minDate = new Date(1900, 0, 1);
maxDate = new Date();
birthDate = new Date(1990, 0, 1);`
    },
    withValidation: {
      title: 'Datepicker with Validation',
      description: 'Datepicker with required validation',
      code: `<amw-datepicker
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
});`
    },
    differentFormats: {
      title: 'Different Date Formats',
      description: 'Datepickers with various display formats',
      code: `<amw-datepicker
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
</amw-datepicker>`
    },
    disabled: {
      title: 'Disabled Datepicker',
      description: 'Datepicker in disabled state',
      code: `<amw-datepicker
  label="Disabled Datepicker"
  placeholder="This is disabled..."
  [value]="selectedDate"
  [disabled]="true">
</amw-datepicker>`
    },
    reactiveForm: {
      title: 'Reactive Form Integration',
      description: 'Using datepickers with Angular reactive forms',
      code: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
</form>`
    },
    withEvents: {
      title: 'Datepicker with Events',
      description: 'Datepickers with event handling',
      code: `<amw-datepicker
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
}`
    },
    bookingForm: {
      title: 'Booking Form Example',
      description: 'Complete booking form with multiple datepickers',
      code: `<form [formGroup]="bookingForm" class="booking-form">
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
    }
  };
}