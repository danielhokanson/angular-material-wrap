import { FormValidationError } from './form-validation-error.interface';

/**
 * Configuration object for form-level validation
 *
 * @description
 * Maps error keys (from FormGroup validators) to their error definitions.
 * The keys should match the error keys returned by your form-level validators.
 *
 * @example
 * ```typescript
 * // In component:
 * myForm = this.fb.group({
 *   password: ['', Validators.required],
 *   confirmPassword: ['', Validators.required]
 * }, {
 *   validators: [this.passwordMatchValidator]
 * });
 *
 * passwordMatchValidator(group: FormGroup): ValidationErrors | null {
 *   const password = group.get('password')?.value;
 *   const confirmPassword = group.get('confirmPassword')?.value;
 *   return password === confirmPassword ? null : { passwordMismatch: true };
 * }
 *
 * formValidationConfig: FormValidationConfig = {
 *   passwordMismatch: {
 *     message: 'Passwords do not match.',
 *     severity: 'error',
 *     affectedFields: ['password', 'confirmPassword']
 *   }
 * };
 *
 * // In template:
 * <amw-form-validation
 *   [form]="myForm"
 *   [errors]="formValidationConfig">
 * </amw-form-validation>
 * ```
 */
export interface FormValidationConfig {
  /**
   * Error key to error configuration mapping
   *
   * @description
   * Each key should match an error key from your form validators.
   * The value is the error configuration defining how to display the error.
   */
  [errorKey: string]: FormValidationError;
}
