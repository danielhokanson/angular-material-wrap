import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwTimepickerComponent } from '../../../../library/src/controls/components/amw-timepicker/amw-timepicker.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-timepicker-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AmwCodeDocComponent,
    AmwTimepickerComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './timepicker-code.component.html',
  styleUrl: './timepicker-code.component.scss'
})
export class TimepickerCodeComponent implements OnInit {
  // State for live preview examples
  selectedTime = '14:30';
  time12h = '02:30 PM';
  timeWithSeconds = '14:30:45';
  advancedTime = '09:15';
  isDisabled = false;
  timeForm!: FormGroup;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Timepicker',
      description: 'Simple timepicker with default settings',
      code: `<amw-timepicker
  [value]="selectedTime"
  (timeChange)="onTimeChange($event)">
</amw-timepicker>

// Component
export class MyComponent {
  selectedTime = '14:30';

  onTimeChange(time: string) {
    console.log('Selected time:', time);
  }
}`
    },
    {
      key: 'format',
      title: '12-Hour Format',
      description: 'Timepicker with AM/PM display',
      code: `<amw-timepicker
  [value]="selectedTime"
  format="12h"
  (timeChange)="onTimeChange($event)">
</amw-timepicker>

// Component
export class MyComponent {
  selectedTime = '02:30 PM';

  onTimeChange(time: string) {
    console.log('Selected time:', time);
  }
}`
    },
    {
      key: 'seconds',
      title: 'With Seconds',
      description: 'Timepicker showing seconds',
      code: `<amw-timepicker
  [value]="selectedTime"
  [showSeconds]="true"
  (timeChange)="onTimeChange($event)">
</amw-timepicker>

// Component
export class MyComponent {
  selectedTime = '14:30:45';

  onTimeChange(time: string) {
    console.log('Selected time:', time);
  }
}`
    },
    {
      key: 'validation',
      title: 'Form Validation',
      description: 'Timepicker with form validation',
      code: `<form [formGroup]="timeForm">
  <amw-timepicker
    label="Select Time"
    formControlName="time"
    required
    placeholder="Choose time"
    appearance="outline">
  </amw-timepicker>
</form>

// Component
export class MyComponent implements OnInit {
  timeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.timeForm = this.fb.group({
      time: ['', Validators.required]
    });
  }
}`
    },
    {
      key: 'configuration',
      title: 'Advanced Configuration',
      description: 'Timepicker with custom configuration',
      code: `<amw-timepicker
  [value]="selectedTime"
  [config]="timepickerConfig"
  color="accent"
  size="large"
  [disabled]="isDisabled"
  (timeChange)="onTimeChange($event)">
</amw-timepicker>

// Component
export class MyComponent {
  selectedTime = '09:15';
  isDisabled = false;

  timepickerConfig: TimepickerConfig = {
    appearance: 'outline',
    step: 15,
    format: '24h',
    showSeconds: false
  };

  onTimeChange(time: string) {
    console.log('Selected time:', time);
  }
}`
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });

    // Initialize form for validation example
    this.timeForm = this.fb.group({
      time: ['', Validators.required]
    });
  }

  // Event handler for time change
  onTimeChange(time: string): void {
    console.log('Selected time:', time);
  }
}
