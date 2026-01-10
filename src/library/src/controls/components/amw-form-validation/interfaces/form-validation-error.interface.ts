import { FormGroup } from '@angular/forms';
import { FormValidationSeverity } from './form-validation-severity.type';

/**
 * Configuration for a single form-level validation error
 *
 * @description
 * Defines the properties of a form-level validation error, including the error message,
 * when to show it, its severity, and which fields are affected.
 *
 * @example
 * ```typescript
 * const passwordMismatch: FormValidationError = {
 *   message: 'Passwords do not match.',
 *   showWhen: (form) => form.get('confirmPassword')?.touched ?? false,
 *   severity: 'error',
 *   affectedFields: ['password', 'confirmPassword']
 * };
 * ```
 */
export interface FormValidationError {
  /**
   * The error message to display
   *
   * @description
   * Can be a static string or a function that receives the form and returns a string.
   * Use a function for dynamic messages that include form values or error details.
   *
   * @example
   * ```typescript
   * // Static message
   * message: 'Passwords do not match.'
   *
   * // Dynamic message
   * message: (form) => `End date must be after ${form.get('startDate')?.value}`
   * ```
   */
  message: string | ((form: FormGroup) => string);

  /**
   * Custom condition for when to show this error
   *
   * @description
   * Optional function that receives the form and returns a boolean indicating
   * whether this error should be displayed. If not provided, the error will
   * be shown whenever the form has the corresponding error key.
   *
   * @example
   * ```typescript
   * showWhen: (form) => form.get('confirmPassword')?.touched ?? false
   * ```
   */
  showWhen?: (form: FormGroup) => boolean;

  /**
   * Severity level of the error
   *
   * @description
   * Affects the visual styling (color, icon) of the error message.
   * Defaults to 'error' if not specified.
   */
  severity?: FormValidationSeverity;

  /**
   * Form field names affected by this error
   *
   * @description
   * Optional array of form control names that are related to this error.
   * Used for error click navigation and field highlighting.
   *
   * @example
   * ```typescript
   * affectedFields: ['password', 'confirmPassword']
   * ```
   */
  affectedFields?: string[];

  /**
   * Custom CSS class to apply to this error
   *
   * @description
   * Optional CSS class name for custom styling of this specific error.
   */
  customClass?: string;

  /**
   * Internal property: Error key from FormGroup.errors
   *
   * @internal
   * This property is set internally by the component and should not be
   * provided in the configuration.
   */
  key?: string;
}
