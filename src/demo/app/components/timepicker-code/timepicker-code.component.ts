import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseCodeComponent } from '../base/base-code.component';
import { AmwTimepickerComponent } from '../../../../library/src/controls/components/amw-timepicker/amw-timepicker.component';

type TimepickerExamples = 'basic' | 'format' | 'seconds' | 'validation' | 'configuration';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
@Component({
  selector: 'amw-demo-timepicker-code',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AmwTimepickerComponent,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './timepicker-code.component.html',
  styleUrl: './timepicker-code.component.scss'
})
export class TimepickerCodeComponent extends BaseCodeComponent<TimepickerExamples> implements OnInit {
  // State for live preview examples
  selectedTime = '14:30';
  time12h = '02:30 PM';
  timeWithSeconds = '14:30:45';
  advancedTime = '09:15';
  isDisabled = false;
  timeForm!: FormGroup;

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<TimepickerExamples, string> = {
    basic: `<amw-timepicker
  [value]="selectedTime"
  (timeChange)="onTimeChange($event)">
</amw-timepicker>

// Component
export class MyComponent {
  selectedTime = '14:30';

  onTimeChange(time: string) {
    console.log('Selected time:', time);
  }
}`,

    format: `<amw-timepicker
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
}`,

    seconds: `<amw-timepicker
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
}`,

    validation: `<form [formGroup]="timeForm">
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
}`,

    configuration: `<amw-timepicker
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
  };

  constructor(private fb: FormBuilder) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

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
