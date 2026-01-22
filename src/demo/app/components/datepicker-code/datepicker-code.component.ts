import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwDatepickerComponent } from '../../../../library/src/controls/components/amw-datepicker/amw-datepicker.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-datepicker-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AmwCodeDocComponent,
    AmwDatepickerComponent,
    AmwButtonComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './datepicker-code.component.html',
  styleUrl: './datepicker-code.component.scss'
})
export class DatepickerCodeComponent implements OnInit {
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

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Datepicker',
      description: 'A simple datepicker with default settings',
      code: `<amw-datepicker
  label="Select Date"
  placeholder="Choose a date..."
  [value]="selectedDate">
</amw-datepicker>`
    },
    {
      key: 'withMinMax',
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
    {
      key: 'withValidation',
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
    {
      key: 'differentFormats',
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
    {
      key: 'disabled',
      title: 'Disabled Datepicker',
      description: 'Datepicker in disabled state',
      code: `<amw-datepicker
  label="Disabled Datepicker"
  placeholder="This is disabled..."
  [value]="selectedDate"
  [disabled]="true">
</amw-datepicker>`
    },
    {
      key: 'reactiveForm',
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
    {
      key: 'withEvents',
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
    {
      key: 'bookingForm',
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
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });

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
