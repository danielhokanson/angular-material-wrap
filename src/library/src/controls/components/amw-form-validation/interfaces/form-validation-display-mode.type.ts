/**
 * Display mode for form validation errors
 *
 * @description
 * Defines how validation errors should be displayed to the user.
 *
 * - `summary`: Display all errors in a summary card (typically at top or bottom of form)
 * - `inline`: Display errors inline, near the affected form fields
 * - `floating`: Display errors in a floating/toast notification
 * - `all`: Display errors in all modes simultaneously
 *
 * @example
 * ```typescript
 * <amw-form-validation
 *   [form]="myForm"
 *   [errors]="validationConfig"
 *   displayMode="summary">
 * </amw-form-validation>
 * ```
 */
export type FormValidationDisplayMode = 'summary' | 'inline' | 'floating' | 'all';
