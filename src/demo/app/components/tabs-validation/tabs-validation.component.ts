import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AmwFormValidationComponent, FormValidationConfig } from 'angular-material-wrap';
import { MatOptionModule } from '@angular/material/core';
import { AmwTabsComponent } from '@angular/material/tabs';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';

interface Step {
  label: string;
  completed: boolean;
  error: boolean;
}

@Component({
  selector: 'amw-demo-tabs-validation',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    AmwFormValidationComponent,
    MatOptionModule,
    AmwTabsComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwSelectComponent],
  templateUrl: './tabs-validation.component.html',
  styleUrl: './tabs-validation.component.scss'
})
export class TabsValidationComponent {
  // Multi-step form with tabs
  selectedTabIndex = 0;

  // Step tracking
  steps: Step[] = [
    { label: 'Personal Info', completed: false, error: false },
    { label: 'Account Details', completed: false, error: false },
    { label: 'Preferences', completed: false, error: false },
    { label: 'Review', completed: false, error: false }
  ];

  // Form groups for each step
  personalInfoForm: FormGroup;
  accountDetailsForm: FormGroup;
  preferencesForm: FormGroup;

  // Form validation configuration
  accountDetailsValidation: FormValidationConfig = {
    passwordMismatch: {
      message: 'Passwords do not match.',
      showWhen: (form) => form.get('confirmPassword')?.touched ?? false,
      severity: 'error',
      affectedFields: ['password', 'confirmPassword']
    }
  };

  constructor(private fb: FormBuilder) {
    // Personal info form
    this.personalInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    // Account details form with password matching validator
    this.accountDetailsForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: [this.passwordMatchValidator.bind(this)]
    });

    // Preferences form
    this.preferencesForm = this.fb.group({
      language: ['', Validators.required],
      timezone: ['', Validators.required],
      notifications: ['email', Validators.required]
    });

    // Watch for form changes to update step status
    this.personalInfoForm.statusChanges.subscribe(() => this.updateStepStatus(0));
    this.accountDetailsForm.statusChanges.subscribe(() => this.updateStepStatus(1));
    this.preferencesForm.statusChanges.subscribe(() => this.updateStepStatus(2));
  }

  // Update step status based on form validity
  private updateStepStatus(stepIndex: number) {
    const forms = [this.personalInfoForm, this.accountDetailsForm, this.preferencesForm];
    const form = forms[stepIndex];

    if (form) {
      this.steps[stepIndex].completed = form.valid;
      this.steps[stepIndex].error = form.invalid && form.touched;
    }
  }

  // Navigation methods
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

  // Get current form based on tab index
  private getCurrentForm(): FormGroup | null {
    switch (this.selectedTabIndex) {
      case 0: return this.personalInfoForm;
      case 1: return this.accountDetailsForm;
      case 2: return this.preferencesForm;
      default: return null;
    }
  }

  // Validation helper methods
  getErrorMessage(formGroup: FormGroup, field: string): string {
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

  // Password matching validation
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

  // Check if user can proceed to next step
  canProceed(): boolean {
    const currentForm = this.getCurrentForm();
    if (this.selectedTabIndex === 1) {
      return currentForm?.valid && this.passwordsMatch() || false;
    }
    return currentForm?.valid || false;
  }

  // Check if form is complete
  isFormComplete(): boolean {
    return this.personalInfoForm.valid &&
           this.accountDetailsForm.valid &&
           this.preferencesForm.valid &&
           this.passwordsMatch();
  }

  // Form submission
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

  // Get tab icon based on step status
  getStepIcon(index: number): string {
    if (this.steps[index].completed) return 'check_circle';
    if (this.steps[index].error) return 'error';
    return 'radio_button_unchecked';
  }

  // Get tab color class
  getStepClass(index: number): string {
    if (this.steps[index].completed) return 'step-completed';
    if (this.steps[index].error) return 'step-error';
    return '';
  }
}
