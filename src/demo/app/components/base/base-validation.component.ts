import { Directive, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';

/**
 * Represents a validation field configuration
 */
export interface ValidationField {
  /** Form control name */
  name: string;
  /** Display label */
  label: string;
  /** Placeholder text */
  placeholder: string;
  /** Input type (text, email, number, etc.) */
  type?: string;
  /** Whether field is required */
  required?: boolean;
  /** Field appearance */
  appearance?: 'outline' | 'fill';
  /** Hint text */
  hint?: string;
}

/**
 * Represents validation rules for a field
 */
export interface ValidationRule {
  /** Field name */
  field: string;
  /** Rule type */
  type: 'required' | 'email' | 'minlength' | 'maxlength' | 'min' | 'max' | 'pattern';
  /** Rule value (for length/range rules) */
  value?: number | string | RegExp;
  /** Custom error message */
  message?: string;
}

/**
 * Represents a validation info item for display
 */
export interface ValidationInfo {
  /** Title/label for the validation rule */
  title: string;
  /** Description of what the rule does */
  description: string;
}

/**
 * Base class for all validation demo components
 * Provides standard structure and methods for form validation demos
 */
@Directive()
export abstract class BaseValidationComponent {
  protected fb = inject(FormBuilder);
  protected notification = inject(AmwNotificationService);

  /**
   * The validation form group - must be initialized by subclass
   */
  abstract validationForm: FormGroup;

  /**
   * Validation info to display - describes the validation rules
   */
  abstract validationInfo: ValidationInfo[];

  /**
   * Submit handler - shows success/error notification
   */
  onSubmit(): void {
    if (this.validationForm.valid) {
      this.notification.success('Success', 'Form is valid!', { duration: 3000 });
    } else {
      this.notification.error('Error', 'Form has validation errors', { duration: 3000 });
    }
  }

  /**
   * Reset the form to initial state
   */
  resetForm(): void {
    this.validationForm.reset();
  }

  /**
   * Get the error message for a field
   * @param fieldName - The form control name
   * @returns Error message string or empty string if no error
   */
  getFieldError(fieldName: string): string {
    const field = this.validationForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `This field is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `Minimum length is ${field.errors['minlength'].requiredLength}`;
      if (field.errors['maxlength']) return `Maximum length is ${field.errors['maxlength'].requiredLength}`;
      if (field.errors['min']) return `Minimum value is ${field.errors['min'].min}`;
      if (field.errors['max']) return `Maximum value is ${field.errors['max'].max}`;
      if (field.errors['pattern']) return 'Invalid format';
    }
    return '';
  }

  /**
   * Check if a field has an error
   * @param fieldName - The form control name
   * @returns true if field has error and is touched
   */
  hasError(fieldName: string): boolean {
    const field = this.validationForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }

  /**
   * Check if a field is valid
   * @param fieldName - The form control name
   * @returns true if field is valid
   */
  isValid(fieldName: string): boolean {
    const field = this.validationForm.get(fieldName);
    return !!(field?.valid && field.touched);
  }
}
