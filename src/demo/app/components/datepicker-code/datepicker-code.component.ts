import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'amw-demo-datepicker-code',
  standalone: true,
  imports: [
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './datepicker-code.component.html',
  styleUrl: './datepicker-code.component.scss'
})
export class DatepickerCodeComponent {
  // State for live preview examples
  selectedDate = new Date();
  minDate = new Date(1900, 0, 1);
  maxDate = new Date();
  birthDate = new Date(1990, 0, 1);

  // Editable code examples
  editableCode = {
    basic: '',
    withMinMax: '',
    withValidation: '',
    differentFormats: '',
    disabled: '',
    reactiveForm: '',
    withEvents: '',
    bookingForm: ''
  };

  // Original code examples (for reset functionality)
  readonly codeExamples = {
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

  constructor() {
    // Initialize editable code
    Object.keys(this.codeExamples).forEach(key => {
      this.editableCode[key as keyof typeof this.codeExamples] =
        this.codeExamples[key as keyof typeof this.codeExamples];
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

  // Reset code to original
  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
  }
}