import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-switch-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwCodeDocComponent,
    AmwButtonComponent,
    AmwSwitchComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './switch-code.component.html',
  styleUrl: './switch-code.component.scss'
})
export class SwitchCodeComponent implements OnInit {
  // State for preview examples
  isEnabled = false;
  notificationsEnabled = true;
  darkModeEnabled = false;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Switch',
      description: 'Simple switch with two-way binding',
      code: `<amw-switch
  [(checked)]="isEnabled"
  (switchChange)="onSwitchChange($event)">
</amw-switch>`
    },
    {
      key: 'configured',
      title: 'Configured Switch',
      description: 'Switch with custom configuration options',
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
    {
      key: 'formControl',
      title: 'Form Control Integration',
      description: 'Using switch with reactive forms',
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
    {
      key: 'validation',
      title: 'Validation',
      description: 'Switch with form validation',
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
    {
      key: 'sizes',
      title: 'Sizes',
      description: 'Different switch sizes',
      code: `<amw-switch [size]="'small'">Small Switch</amw-switch>
<amw-switch [size]="'medium'">Medium Switch</amw-switch>
<amw-switch [size]="'large'">Large Switch</amw-switch>`
    },
    {
      key: 'colors',
      title: 'Colors',
      description: 'Different color themes',
      code: `<amw-switch [color]="'primary'">Primary Switch</amw-switch>
<amw-switch [color]="'accent'">Accent Switch</amw-switch>
<amw-switch [color]="'warn'">Warn Switch</amw-switch>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  onSwitchChange(event: any) {
    console.log('Switch changed:', event);
  }

  onNotificationChange(event: any) {
    console.log('Notification setting changed:', event);
  }
}
