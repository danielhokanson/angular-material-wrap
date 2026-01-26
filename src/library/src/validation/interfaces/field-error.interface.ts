/**
 * Represents a single validation error for a field
 */
export interface IFieldValidationError {
    /** The validation error key (e.g., 'required', 'minlength', 'email') */
    key: string;
    /** Human-readable error message */
    message: string;
}

/**
 * Represents all validation errors for a single form field
 */
export interface IFieldError {
    /** The field name/path in the form (e.g., 'email', 'address.street') */
    fieldName: string;
    /** Human-readable label for the field (e.g., 'Email Address', 'Street') */
    fieldLabel: string;
    /** Array of validation errors for this field */
    errors: IFieldValidationError[];
}
