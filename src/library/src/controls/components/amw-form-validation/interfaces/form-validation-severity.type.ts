/**
 * Severity level for form validation errors
 *
 * @description
 * Defines the severity of a validation error, which affects the visual styling
 * and user experience.
 *
 * - `error`: Critical validation failure that must be fixed before submission
 * - `warning`: Non-critical issue that should be addressed but doesn't prevent submission
 * - `info`: Informational message about the form state
 *
 * @example
 * ```typescript
 * const config: FormValidationError = {
 *   message: 'Passwords do not match',
 *   severity: 'error'
 * };
 * ```
 */
export type FormValidationSeverity = 'error' | 'warning' | 'info';
