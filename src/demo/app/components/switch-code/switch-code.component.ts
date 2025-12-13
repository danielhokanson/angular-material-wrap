import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'amw-demo-switch-code',
  standalone: true,
  imports: [
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './switch-code.component.html',
  styleUrl: './switch-code.component.scss'
})
export class SwitchCodeComponent {
  // State for preview examples
  isEnabled = false;
  notificationsEnabled = true;
  darkModeEnabled = false;

  editableCode = {
    basic: '',
    configured: '',
    formControl: '',
    validation: '',
    sizes: '',
    colors: ''
  };

  readonly codeExamples = {
    basic: `<amw-switch
  [(checked)]="isEnabled"
  (switchChange)="onSwitchChange($event)">
</amw-switch>`,

    configured: `<amw-switch
  [(checked)]="notificationsEnabled"
  [size]="'large'"
  [color]="'accent'"
  [labelPosition]="'before'"
  [disabled]="false"
  [required]="true"
  (switchChange)="onNotificationChange($event)">
  Enable Notifications
</amw-switch>`,

    formControl: `// Component
export class MyComponent {
  form = this.fb.group({
    notificationsEnabled: [false, Validators.requiredTrue],
    darkModeEnabled: [false]
  });

  constructor(private fb: FormBuilder) {}
}

// Template
<form [formGroup]="form">
  <amw-switch
    formControlName="notificationsEnabled"
    [hasError]="form.get('notificationsEnabled')?.invalid && form.get('notificationsEnabled')?.touched">
    Enable Notifications
  </amw-switch>

  <amw-switch formControlName="darkModeEnabled">
    Dark Mode
  </amw-switch>
</form>`,

    validation: `// Component
export class MyComponent {
  form = this.fb.group({
    termsAccepted: [false, [Validators.requiredTrue, this.validateTerms]]
  });

  validateTerms(control: any) {
    if (!control.value) {
      return { termsRequired: true };
    }
    return null;
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('requiredTrue')) {
      return 'This option must be enabled';
    }
    if (control?.hasError('termsRequired')) {
      return 'You must accept the terms';
    }
    return '';
  }
}

// Template
<form [formGroup]="form">
  <amw-switch
    formControlName="termsAccepted"
    [hasError]="form.get('termsAccepted')?.invalid && form.get('termsAccepted')?.touched"
    [errorMessage]="getErrorMessage('termsAccepted')">
    Accept Terms and Conditions
  </amw-switch>
</form>`,

    sizes: `<amw-switch [size]="'small'">Small Switch</amw-switch>
<amw-switch [size]="'medium'">Medium Switch</amw-switch>
<amw-switch [size]="'large'">Large Switch</amw-switch>`,

    colors: `<amw-switch [color]="'primary'">Primary Switch</amw-switch>
<amw-switch [color]="'accent'">Accent Switch</amw-switch>
<amw-switch [color]="'warn'">Warn Switch</amw-switch>`
  };

  constructor() {
    Object.keys(this.codeExamples).forEach(key => {
      this.editableCode[key as keyof typeof this.codeExamples] =
        this.codeExamples[key as keyof typeof this.codeExamples];
    });
  }

  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
  }

  onSwitchChange(event: any) {
    console.log('Switch changed:', event);
  }

  onNotificationChange(event: any) {
    console.log('Notification setting changed:', event);
  }
}
