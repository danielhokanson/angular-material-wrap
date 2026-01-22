import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwFormValidationComponent, FormValidationConfig } from 'angular-material-wrap';
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

interface Step {
  label: string;
  completed: boolean;
  error: boolean;
}

@Component({
  selector: 'amw-demo-tabs-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwFormValidationComponent,
    AmwTabsComponent,
    AmwTabComponent,
    AmwCardComponent,
    AmwIconComponent,
    AmwInputComponent,
    AmwSelectComponent,
    AmwButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tabs-validation.component.html',
  styleUrl: './tabs-validation.component.scss'
})
export class TabsValidationComponent extends BaseValidationComponent {
  selectedTabIndex = 0;

  languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' }
  ];

  timezoneOptions = [
    { value: 'UTC', label: 'UTC' },
    { value: 'EST', label: 'Eastern Time' },
    { value: 'CST', label: 'Central Time' },
    { value: 'MST', label: 'Mountain Time' },
    { value: 'PST', label: 'Pacific Time' }
  ];

  notificationOptions = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'both', label: 'Both' },
    { value: 'none', label: 'None' }
  ];

  steps: Step[] = [
    { label: 'Personal Info', completed: false, error: false },
    { label: 'Account Details', completed: false, error: false },
    { label: 'Preferences', completed: false, error: false },
    { label: 'Review', completed: false, error: false }
  ];

  // Main validation form - used by BaseValidationComponent
  validationForm: FormGroup = this.fb.group({
    placeholder: ['']
  });

  // Form groups for each step
  personalInfoForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
  });

  accountDetailsForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: [this.passwordMatchValidator.bind(this)]
  });

  preferencesForm: FormGroup = this.fb.group({
    language: ['', Validators.required],
    timezone: ['', Validators.required],
    notifications: ['email', Validators.required]
  });

  accountDetailsValidation: FormValidationConfig = {
    passwordMismatch: {
      message: 'Passwords do not match.',
      showWhen: (form) => form.get('confirmPassword')?.touched ?? false,
      severity: 'error',
      affectedFields: ['password', 'confirmPassword']
    }
  };

  validationInfo: ValidationInfo[] = [
    { title: 'Multi-Step Form', description: 'Complete all steps to submit' },
    { title: 'Personal Info', description: 'First name, last name, email, and phone required' },
    { title: 'Account Details', description: 'Username and matching passwords required' },
    { title: 'Preferences', description: 'Language and timezone selection required' }
  ];

  constructor() {
    super();
    this.personalInfoForm.statusChanges.subscribe(() => this.updateStepStatus(0));
    this.accountDetailsForm.statusChanges.subscribe(() => this.updateStepStatus(1));
    this.preferencesForm.statusChanges.subscribe(() => this.updateStepStatus(2));
  }

  private updateStepStatus(stepIndex: number) {
    const forms = [this.personalInfoForm, this.accountDetailsForm, this.preferencesForm];
    const form = forms[stepIndex];

    if (form) {
      this.steps[stepIndex].completed = form.valid;
      this.steps[stepIndex].error = form.invalid && form.touched;
    }
  }

  nextStep() {
    if (this.selectedTabIndex < this.steps.length - 1) {
      const currentForm = this.getCurrentForm();
      if (currentForm) {
        Object.keys(currentForm.controls).forEach(key => {
          currentForm.get(key)?.markAsTouched();
        });

        if (currentForm.valid) {
          this.steps[this.selectedTabIndex].completed = true;
          this.selectedTabIndex++;
        }
      }
    }
  }

  previousStep() {
    if (this.selectedTabIndex > 0) {
      this.selectedTabIndex--;
    }
  }

  goToStep(index: number) {
    this.selectedTabIndex = index;
  }

  private getCurrentForm(): FormGroup | null {
    switch (this.selectedTabIndex) {
      case 0: return this.personalInfoForm;
      case 1: return this.accountDetailsForm;
      case 2: return this.preferencesForm;
      default: return null;
    }
  }

  getStepErrorMessage(formGroup: FormGroup, field: string): string {
    const control = formGroup.get(field);
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('email')) return 'Invalid email format';
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Minimum length is ${minLength} characters`;
    }
    if (control?.hasError('pattern')) {
      if (field === 'phone') return 'Phone must be 10 digits';
    }
    return '';
  }

  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  passwordsMatch(): boolean {
    return !this.accountDetailsForm.hasError('passwordMismatch');
  }

  canProceed(): boolean {
    const currentForm = this.getCurrentForm();
    if (this.selectedTabIndex === 1) {
      return currentForm?.valid && this.passwordsMatch() || false;
    }
    return currentForm?.valid || false;
  }

  isFormComplete(): boolean {
    return this.personalInfoForm.valid &&
           this.accountDetailsForm.valid &&
           this.preferencesForm.valid &&
           this.passwordsMatch();
  }

  submitForm() {
    if (this.isFormComplete()) {
      const formData = {
        personalInfo: this.personalInfoForm.value,
        accountDetails: {
          username: this.accountDetailsForm.get('username')?.value,
          password: this.accountDetailsForm.get('password')?.value
        },
        preferences: this.preferencesForm.value
      };
      console.log('Form submitted:', formData);
      alert('Form submitted successfully! Check console for data.');
      this.steps[3].completed = true;
    }
  }

  getStepIcon(index: number): string {
    if (this.steps[index].completed) return 'check_circle';
    if (this.steps[index].error) return 'error';
    return 'radio_button_unchecked';
  }

  getStepClass(index: number): string {
    if (this.steps[index].completed) return 'step-completed';
    if (this.steps[index].error) return 'step-error';
    return '';
  }
}
