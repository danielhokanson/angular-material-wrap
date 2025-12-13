import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'amw-demo-timepicker-code',
  standalone: true,
  imports: [
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './timepicker-code.component.html',
  styleUrl: './timepicker-code.component.scss'
})
export class TimepickerCodeComponent {
  // State for live preview examples
  selectedTime = '14:30';

  // Editable code examples
  editableCode = {
    basic: '',
    format: '',
    seconds: '',
    validation: '',
    configuration: ''
  };

  // Original code examples (for reset functionality)
  readonly codeExamples = {
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

  constructor() {
    // Initialize editable code
    Object.keys(this.codeExamples).forEach(key => {
      this.editableCode[key as keyof typeof this.codeExamples] =
        this.codeExamples[key as keyof typeof this.codeExamples];
    });
  }

  // Event handler for time change
  onTimeChange(time: string): void {
    console.log('Selected time:', time);
  }

  // Reset code to original
  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
  }
}