import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'amw-demo-switch-code',
    standalone: true,
    imports: [CommonModule, MatExpansionModule, MatCardModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './switch-code.component.html',
    styleUrl: './switch-code.component.scss'
})
export class SwitchCodeComponent {
    getCodeExamples() {
        return Object.values(this.codeExamples);
    }

    codeExamples = {
        basic: {
            title: 'Basic Switch',
            description: 'Simple switch with default configuration',
            code: `<amw-switch
  [(checked)]="isEnabled"
  (switchChange)="onSwitchChange($event)">
</amw-switch>`
        },
        configured: {
            title: 'Configured Switch',
            description: 'Switch with custom configuration and styling',
            code: `<amw-switch
  [(checked)]="notificationsEnabled"
  [size]="'large'"
  [color]="'accent'"
  [labelPosition]="'before'"
  [disabled]="false"
  [required]="true"
  (switchChange)="onNotificationChange($event)">
  Enable Notifications
</amw-switch>`
        },
        formControl: {
            title: 'Reactive Form Integration',
            description: 'Switch integrated with Angular reactive forms',
            code: `// Component
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
</form>`
        },
        validation: {
            title: 'With Validation',
            description: 'Switch with custom validation and error handling',
            code: `// Component
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
</form>`
        },
        sizes: {
            title: 'Size Variations',
            description: 'Different switch sizes for various use cases',
            code: `<amw-switch [size]="'small'">Small Switch</amw-switch>
<amw-switch [size]="'medium'">Medium Switch</amw-switch>
<amw-switch [size]="'large'">Large Switch</amw-switch>`
        },
        colors: {
            title: 'Color Themes',
            description: 'Switch with different Material Design color themes',
            code: `<amw-switch [color]="'primary'">Primary Switch</amw-switch>
<amw-switch [color]="'accent'">Accent Switch</amw-switch>
<amw-switch [color]="'warn'">Warn Switch</amw-switch>`
        }
    };
}
