import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, FormArray, ValidationErrors } from '@angular/forms';
import { IFieldError, IFieldValidationError } from '../interfaces/field-error.interface';
import { VALIDATION_MESSAGES, FIELD_LABELS } from '../constants/validation-messages.constant';

/**
 * Service for extracting and formatting form validation error messages.
 *
 * @example
 * ```typescript
 * const errors = validationMessageService.getFieldErrors(myForm);
 * // Returns array of IFieldError with human-readable messages
 * ```
 */
@Injectable({
    providedIn: 'root'
})
export class AmwValidationMessageService {
    /**
     * Custom validation messages that override defaults
     */
    private customMessages: Record<string, string> = {};

    /**
     * Custom field labels that override defaults
     */
    private customLabels: Record<string, string> = {};

    /**
     * Register custom validation messages
     * @param messages Record of error keys to message templates
     */
    registerMessages(messages: Record<string, string>): void {
        this.customMessages = { ...this.customMessages, ...messages };
    }

    /**
     * Register custom field labels
     * @param labels Record of field names to human-readable labels
     */
    registerLabels(labels: Record<string, string>): void {
        this.customLabels = { ...this.customLabels, ...labels };
    }

    /**
     * Extracts all validation errors from a form, returning human-readable messages.
     * Handles nested FormGroups and FormArrays recursively.
     *
     * @param form The FormGroup or FormArray to extract errors from
     * @param parentPath Optional parent path for nested forms
     * @returns Array of field errors with human-readable messages
     */
    getFieldErrors(form: FormGroup | FormArray, parentPath?: string): IFieldError[] {
        const fieldErrors: IFieldError[] = [];

        Object.keys(form.controls).forEach(key => {
            const control = form.get(key);
            if (!control) return;

            const fieldPath = parentPath ? `${parentPath}.${key}` : key;

            if (control instanceof FormGroup || control instanceof FormArray) {
                // Recursively get errors from nested groups/arrays
                const nestedErrors = this.getFieldErrors(control, fieldPath);
                fieldErrors.push(...nestedErrors);
            } else if (control.errors && (control.touched || control.dirty)) {
                // Get errors for this control
                const errors = this.getControlErrors(control.errors, key);
                if (errors.length > 0) {
                    fieldErrors.push({
                        fieldName: fieldPath,
                        fieldLabel: this.getFieldLabel(key),
                        errors
                    });
                }
            }
        });

        // Also check for form-level errors (cross-field validation)
        if (form.errors) {
            const formErrors = this.getControlErrors(form.errors, 'form');
            if (formErrors.length > 0) {
                fieldErrors.push({
                    fieldName: 'form',
                    fieldLabel: 'Form',
                    errors: formErrors
                });
            }
        }

        return fieldErrors;
    }

    /**
     * Gets all validation errors from a form, regardless of touched/dirty state.
     * Useful for showing all errors on submit.
     *
     * @param form The FormGroup or FormArray to extract errors from
     * @param parentPath Optional parent path for nested forms
     * @returns Array of field errors with human-readable messages
     */
    getAllFieldErrors(form: FormGroup | FormArray, parentPath?: string): IFieldError[] {
        const fieldErrors: IFieldError[] = [];

        Object.keys(form.controls).forEach(key => {
            const control = form.get(key);
            if (!control) return;

            const fieldPath = parentPath ? `${parentPath}.${key}` : key;

            if (control instanceof FormGroup || control instanceof FormArray) {
                // Recursively get errors from nested groups/arrays
                const nestedErrors = this.getAllFieldErrors(control, fieldPath);
                fieldErrors.push(...nestedErrors);
            } else if (control.errors) {
                // Get errors for this control (regardless of touched/dirty)
                const errors = this.getControlErrors(control.errors, key);
                if (errors.length > 0) {
                    fieldErrors.push({
                        fieldName: fieldPath,
                        fieldLabel: this.getFieldLabel(key),
                        errors
                    });
                }
            }
        });

        // Also check for form-level errors (cross-field validation)
        if (form.errors) {
            const formErrors = this.getControlErrors(form.errors, 'form');
            if (formErrors.length > 0) {
                fieldErrors.push({
                    fieldName: 'form',
                    fieldLabel: 'Form',
                    errors: formErrors
                });
            }
        }

        return fieldErrors;
    }

    /**
     * Converts Angular validation errors to human-readable messages.
     *
     * @param errors The ValidationErrors object from a control
     * @param fieldName The field name for message placeholders
     * @returns Array of field validation errors
     */
    private getControlErrors(errors: ValidationErrors, fieldName: string): IFieldValidationError[] {
        const fieldLabel = this.getFieldLabel(fieldName);
        return Object.entries(errors).map(([errorKey, errorValue]) => ({
            key: errorKey,
            message: this.getErrorMessage(errorKey, errorValue, fieldLabel)
        }));
    }

    /**
     * Converts an Angular validation error to a human-readable message.
     * Uses VALIDATION_MESSAGES constants with placeholder replacement.
     *
     * @param errorKey The Angular error key (e.g., 'required', 'minlength')
     * @param errorValue The error value (e.g., { requiredLength: 8, actualLength: 5 })
     * @param fieldLabel The human-readable field name
     * @returns Human-readable error message
     */
    getErrorMessage(errorKey: string, errorValue: any, fieldLabel: string): string {
        // Get message template (custom > default > fallback)
        const template =
            this.customMessages[errorKey] ||
            VALIDATION_MESSAGES[errorKey] ||
            VALIDATION_MESSAGES['default'];

        // Replace placeholders with actual values
        let message = template.replace('{field}', fieldLabel);

        // Handle different error value types
        if (errorValue && typeof errorValue === 'object') {
            Object.entries(errorValue).forEach(([key, value]) => {
                message = message.replace(`{${key}}`, String(value));
            });
        } else if (errorValue !== true && errorValue !== null) {
            // For simple error values, replace a generic {value} placeholder
            message = message.replace('{value}', String(errorValue));
        }

        return message;
    }

    /**
     * Gets a human-readable label for a field name.
     * Falls back to camelCase to Title Case conversion if not in FIELD_LABELS.
     *
     * @param fieldName The field name to convert
     * @returns Human-readable label
     */
    getFieldLabel(fieldName: string): string {
        // Check custom labels first, then defaults
        const label = this.customLabels[fieldName] || FIELD_LABELS[fieldName];
        if (label) {
            return label;
        }

        // Convert camelCase to Title Case
        return this.camelCaseToTitleCase(fieldName);
    }

    /**
     * Converts a camelCase string to Title Case.
     *
     * @param str The camelCase string
     * @returns Title Case string
     */
    private camelCaseToTitleCase(str: string): string {
        // Handle dot notation (nested fields)
        const lastPart = str.split('.').pop() || str;

        // Insert space before uppercase letters and capitalize first letter
        return lastPart
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, firstChar => firstChar.toUpperCase())
            .trim();
    }

    /**
     * Marks all controls in a form as touched to trigger validation display.
     *
     * @param form The form to mark as touched
     */
    markAllAsTouched(form: AbstractControl): void {
        if (form instanceof FormGroup || form instanceof FormArray) {
            Object.values(form.controls).forEach(control => {
                this.markAllAsTouched(control);
            });
        }
        form.markAsTouched();
        form.markAsDirty();
    }

    /**
     * Checks if a form has any validation errors.
     *
     * @param form The form to check
     * @returns true if the form has errors
     */
    hasErrors(form: AbstractControl): boolean {
        return form.invalid;
    }

    /**
     * Gets the count of validation errors in a form.
     *
     * @param form The form to count errors in
     * @returns Number of validation errors
     */
    getErrorCount(form: FormGroup | FormArray): number {
        return this.getAllFieldErrors(form).reduce(
            (count, field) => count + field.errors.length,
            0
        );
    }
}
