import { AbstractControl, FormGroup, FormArray, ValidatorFn, ValidationErrors } from '@angular/forms';

/**
 * AMW Custom Validators
 *
 * A collection of reusable Angular form validators for common validation scenarios.
 *
 * @example
 * ```typescript
 * // Using in a reactive form
 * this.form = fb.group({
 *   password: ['', [Validators.required, Validators.minLength(8)]],
 *   confirmPassword: ['', Validators.required],
 *   website: ['', AmwValidators.validUrl()],
 *   age: ['', [Validators.required, AmwValidators.positiveNumber()]]
 * }, {
 *   validators: AmwValidators.passwordsMatch()
 * });
 * ```
 */
export class AmwValidators {
    /**
     * Validates that two fields match (e.g., password confirmation).
     * Apply to FormGroup, not individual controls.
     *
     * @param field1 Name of the first field
     * @param field2 Name of the second field
     * @param errorKey The error key to use (default: 'mismatch')
     * @returns ValidatorFn that can be applied to a FormGroup
     *
     * @example
     * ```typescript
     * fb.group({
     *   email: ['', Validators.required],
     *   confirmEmail: ['', Validators.required]
     * }, { validators: AmwValidators.fieldsMatch('email', 'confirmEmail') });
     * ```
     */
    static fieldsMatch(field1: string, field2: string, errorKey = 'mismatch'): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!(control instanceof FormGroup)) {
                return null;
            }

            const value1 = control.get(field1)?.value;
            const value2 = control.get(field2)?.value;

            if (value1 !== value2) {
                // Set error on the second field
                const field2Control = control.get(field2);
                if (field2Control) {
                    field2Control.setErrors({ ...field2Control.errors, [errorKey]: true });
                }
                return { [errorKey]: { field1, field2 } };
            }

            // Clear the mismatch error if values now match
            const field2Control = control.get(field2);
            if (field2Control?.errors?.[errorKey]) {
                const { [errorKey]: _, ...remainingErrors } = field2Control.errors;
                field2Control.setErrors(Object.keys(remainingErrors).length ? remainingErrors : null);
            }

            return null;
        };
    }

    /**
     * Alias for fieldsMatch specifically for password confirmation.
     *
     * @param passwordField Name of the password field (default: 'password')
     * @param confirmField Name of the confirm password field (default: 'confirmPassword')
     * @returns ValidatorFn that can be applied to a FormGroup
     *
     * @example
     * ```typescript
     * fb.group({
     *   password: ['', Validators.required],
     *   confirmPassword: ['', Validators.required]
     * }, { validators: AmwValidators.passwordsMatch() });
     * ```
     */
    static passwordsMatch(
        passwordField = 'password',
        confirmField = 'confirmPassword'
    ): ValidatorFn {
        return AmwValidators.fieldsMatch(passwordField, confirmField, 'passwordMismatch');
    }

    /**
     * Validates URL format (http:// or https://).
     * This is a basic validation using a regex pattern.
     *
     * @returns ValidatorFn for URL validation
     *
     * @example
     * ```typescript
     * website: ['', AmwValidators.validUrl()]
     * ```
     */
    static validUrl(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null; // Don't validate empty values (use required for that)
            }

            const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
            return urlPattern.test(control.value) ? null : { invalidUrl: true };
        };
    }

    /**
     * Validates URL using the URL constructor (stricter validation).
     * Validates that the URL is well-formed and uses http or https protocol.
     *
     * @returns ValidatorFn for strict URL validation
     *
     * @example
     * ```typescript
     * website: ['', AmwValidators.validUrlStrict()]
     * ```
     */
    static validUrlStrict(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            try {
                const url = new URL(control.value);
                if (!['http:', 'https:'].includes(url.protocol)) {
                    return { invalidUrlStrict: { protocol: url.protocol } };
                }
                return null;
            } catch {
                return { invalidUrlStrict: true };
            }
        };
    }

    /**
     * Validates that number is positive (> 0).
     *
     * @returns ValidatorFn for positive number validation
     *
     * @example
     * ```typescript
     * quantity: ['', AmwValidators.positiveNumber()]
     * ```
     */
    static positiveNumber(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value === null || control.value === undefined || control.value === '') {
                return null;
            }

            const value = Number(control.value);
            if (isNaN(value) || value <= 0) {
                return { positiveNumber: { actual: control.value } };
            }

            return null;
        };
    }

    /**
     * Validates that number is non-negative (>= 0).
     *
     * @returns ValidatorFn for non-negative number validation
     *
     * @example
     * ```typescript
     * discount: ['', AmwValidators.nonNegativeNumber()]
     * ```
     */
    static nonNegativeNumber(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value === null || control.value === undefined || control.value === '') {
                return null;
            }

            const value = Number(control.value);
            if (isNaN(value) || value < 0) {
                return { nonNegativeNumber: { actual: control.value } };
            }

            return null;
        };
    }

    /**
     * Validates FormArray has at least N items.
     *
     * @param min Minimum number of items
     * @returns ValidatorFn for FormArray
     *
     * @example
     * ```typescript
     * items: fb.array([], AmwValidators.arrayMinLength(1))
     * ```
     */
    static arrayMinLength(min: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!(control instanceof FormArray)) {
                return null;
            }

            const actual = control.length;
            if (actual < min) {
                return { arrayMinLength: { min, actual } };
            }

            return null;
        };
    }

    /**
     * Validates FormArray has at most N items.
     *
     * @param max Maximum number of items
     * @returns ValidatorFn for FormArray
     *
     * @example
     * ```typescript
     * tags: fb.array([], AmwValidators.arrayMaxLength(10))
     * ```
     */
    static arrayMaxLength(max: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!(control instanceof FormArray)) {
                return null;
            }

            const actual = control.length;
            if (actual > max) {
                return { arrayMaxLength: { max, actual } };
            }

            return null;
        };
    }

    /**
     * Conditionally requires a field based on another field's value.
     * Note: This validator needs to be applied to the parent FormGroup for access to sibling controls.
     *
     * @param dependentField Name of the field to check
     * @param requiredWhen Function that returns true when the field should be required
     * @param targetField Name of the field that should be required (optional, uses control name)
     * @returns ValidatorFn that can be applied to a FormGroup
     *
     * @example
     * ```typescript
     * fb.group({
     *   deliveryMethod: [''],
     *   address: ['']
     * }, {
     *   validators: AmwValidators.requiredWhen(
     *     'deliveryMethod',
     *     (v) => v === 'delivery',
     *     'address'
     *   )
     * });
     * ```
     */
    static requiredWhen(
        dependentField: string,
        requiredWhen: (value: unknown) => boolean,
        targetField?: string
    ): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!(control instanceof FormGroup)) {
                // If applied to a control directly, we need access to parent
                const parent = control.parent;
                if (!parent) return null;

                const dependentValue = parent.get(dependentField)?.value;
                if (requiredWhen(dependentValue) && !control.value) {
                    return { requiredWhen: { dependentField, dependentValue } };
                }
                return null;
            }

            // Applied to FormGroup
            const dependentValue = control.get(dependentField)?.value;
            const target = targetField ? control.get(targetField) : null;

            if (target && requiredWhen(dependentValue) && !target.value) {
                target.setErrors({ ...target.errors, requiredWhen: { dependentField, dependentValue } });
                return { requiredWhen: { field: targetField, dependentField, dependentValue } };
            }

            // Clear the error if condition is no longer met
            if (target?.errors?.['requiredWhen'] && !requiredWhen(dependentValue)) {
                const { requiredWhen: _, ...remainingErrors } = target.errors;
                target.setErrors(Object.keys(remainingErrors).length ? remainingErrors : null);
            }

            return null;
        };
    }

    /**
     * Validates alphanumeric characters only.
     *
     * @returns ValidatorFn for alphanumeric validation
     *
     * @example
     * ```typescript
     * username: ['', AmwValidators.alphanumeric()]
     * ```
     */
    static alphanumeric(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            const alphanumericPattern = /^[a-zA-Z0-9]+$/;
            return alphanumericPattern.test(control.value) ? null : { alphanumeric: true };
        };
    }

    /**
     * Validates alphanumeric characters and spaces.
     *
     * @returns ValidatorFn for alphanumeric with spaces validation
     *
     * @example
     * ```typescript
     * displayName: ['', AmwValidators.alphanumericWithSpaces()]
     * ```
     */
    static alphanumericWithSpaces(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            const alphanumericWithSpacesPattern = /^[a-zA-Z0-9\s]+$/;
            return alphanumericWithSpacesPattern.test(control.value) ? null : { alphanumericWithSpaces: true };
        };
    }

    /**
     * Validates date is in the future.
     *
     * @returns ValidatorFn for future date validation
     *
     * @example
     * ```typescript
     * eventDate: ['', AmwValidators.futureDate()]
     * ```
     */
    static futureDate(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            const inputDate = new Date(control.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (inputDate <= today) {
                return { futureDate: { actual: control.value } };
            }

            return null;
        };
    }

    /**
     * Validates date is not in the future (past or present).
     *
     * @returns ValidatorFn for past or present date validation
     *
     * @example
     * ```typescript
     * birthDate: ['', AmwValidators.pastOrPresentDate()]
     * ```
     */
    static pastOrPresentDate(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            const inputDate = new Date(control.value);
            const today = new Date();
            today.setHours(23, 59, 59, 999);

            if (inputDate > today) {
                return { pastOrPresentDate: { actual: control.value } };
            }

            return null;
        };
    }

    /**
     * Validates that a date range is valid (start date is before end date).
     * Apply to FormGroup containing both date fields.
     *
     * @param startField Name of the start date field
     * @param endField Name of the end date field
     * @returns ValidatorFn that can be applied to a FormGroup
     *
     * @example
     * ```typescript
     * fb.group({
     *   startDate: [''],
     *   endDate: ['']
     * }, { validators: AmwValidators.dateRange('startDate', 'endDate') });
     * ```
     */
    static dateRange(startField: string, endField: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!(control instanceof FormGroup)) {
                return null;
            }

            const startValue = control.get(startField)?.value;
            const endValue = control.get(endField)?.value;

            if (!startValue || !endValue) {
                return null;
            }

            const startDate = new Date(startValue);
            const endDate = new Date(endValue);

            if (startDate > endDate) {
                return { dateRange: { startField, endField, start: startValue, end: endValue } };
            }

            return null;
        };
    }

    /**
     * Validates phone number format.
     * Accepts various formats: (123) 456-7890, 123-456-7890, 123.456.7890, +1 123 456 7890
     *
     * @returns ValidatorFn for phone number validation
     *
     * @example
     * ```typescript
     * phone: ['', AmwValidators.phoneNumber()]
     * ```
     */
    static phoneNumber(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            // Remove all non-digit characters except + for country code
            const cleaned = control.value.replace(/[^\d+]/g, '');

            // Check if it has a reasonable number of digits (7-15)
            const digitCount = cleaned.replace(/\D/g, '').length;
            if (digitCount < 7 || digitCount > 15) {
                return { phoneNumber: { actual: control.value } };
            }

            return null;
        };
    }

    /**
     * Validates that a checkbox is checked (for required checkboxes like terms acceptance).
     *
     * @returns ValidatorFn for required checkbox validation
     *
     * @example
     * ```typescript
     * acceptTerms: [false, AmwValidators.requiredTrue()]
     * ```
     */
    static requiredTrue(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return control.value === true ? null : { requiredTrue: true };
        };
    }

    /**
     * Validates that a value is unique within a list.
     *
     * @param existingValues Array of existing values to check against
     * @param caseSensitive Whether comparison should be case-sensitive (default: false)
     * @returns ValidatorFn for uniqueness validation
     *
     * @example
     * ```typescript
     * email: ['', AmwValidators.unique(existingEmails)]
     * ```
     */
    static unique(existingValues: string[], caseSensitive = false): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            const valueToCheck = caseSensitive
                ? control.value
                : String(control.value).toLowerCase();

            const values = caseSensitive
                ? existingValues
                : existingValues.map(v => String(v).toLowerCase());

            if (values.includes(valueToCheck)) {
                return { unique: { value: control.value } };
            }

            return null;
        };
    }
}
