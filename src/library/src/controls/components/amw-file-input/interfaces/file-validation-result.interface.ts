/**
 * Result of file validation
 */
export interface FileValidationResult {
    /** Whether the validation passed */
    valid: boolean;
    /** Array of validation error messages */
    errors: string[];
    /** Array of valid files */
    files: File[];
}


