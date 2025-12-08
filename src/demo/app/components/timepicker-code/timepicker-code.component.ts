import { Component, ViewEncapsulation } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'amw-demo-timepicker-code',
  standalone: true,
  imports: [
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule
],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './timepicker-code.component.html',
  styleUrl: './timepicker-code.component.scss'
})
export class TimepickerCodeComponent {
  codeExamples = {
    basic: {
      title: 'Basic Timepicker',
      description: 'Simple timepicker with default settings',
      html: `<amw-timepicker
  [value]="selectedTime"
  (timeChange)="onTimeChange($event)">
</amw-timepicker>`,
      typescript: `export class MyComponent {
  selectedTime = '14:30';

  onTimeChange(time: string) {
    console.log('Selected time:', time);
  }
}`
    },
    format: {
      title: '12-Hour Format',
      description: 'Timepicker with AM/PM display',
      html: `<amw-timepicker
  [value]="selectedTime"
  format="12h"
  (timeChange)="onTimeChange($event)">
</amw-timepicker>`,
      typescript: `export class MyComponent {
  selectedTime = '02:30 PM';

  onTimeChange(time: string) {
    console.log('Selected time:', time);
  }
}`
    },
    seconds: {
      title: 'With Seconds',
      description: 'Timepicker showing seconds',
      html: `<amw-timepicker
  [value]="selectedTime"
  [showSeconds]="true"
  (timeChange)="onTimeChange($event)">
</amw-timepicker>`,
      typescript: `export class MyComponent {
  selectedTime = '14:30:45';

  onTimeChange(time: string) {
    console.log('Selected time:', time);
  }
}`
    },
    validation: {
      title: 'Form Validation',
      description: 'Timepicker with form validation',
      html: `<form [formGroup]="timeForm">
  <mat-form-field appearance="outline">
    <mat-label>Select Time</mat-label>
    <amw-timepicker
      formControlName="time"
      required
      placeholder="Choose time">
    </amw-timepicker>
    <mat-error *ngIf="timeForm.get('time')?.hasError('required')">
      Time is required
    </mat-error>
  </mat-form-field>
</form>`,
      typescript: `export class MyComponent implements OnInit {
  timeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.timeForm = this.fb.group({
      time: ['', Validators.required]
    });
  }
}`
    },
    configuration: {
      title: 'Advanced Configuration',
      description: 'Timepicker with custom configuration',
      html: `<amw-timepicker
  [value]="selectedTime"
  [config]="timepickerConfig"
  color="accent"
  size="large"
  [disabled]="isDisabled"
  (timeChange)="onTimeChange($event)">
</amw-timepicker>`,
      typescript: `export class MyComponent {
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
  };

  copyToClipboard(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      // Could add a snackbar notification here
      console.log('Code copied to clipboard');
    });
  }
}