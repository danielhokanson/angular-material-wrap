// Form Page Validation Interface
export interface FormPageValidation {
    isValid: boolean;
    errors: { [key: string]: string };
}
