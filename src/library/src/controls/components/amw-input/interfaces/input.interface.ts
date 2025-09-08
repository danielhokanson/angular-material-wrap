import { InputType } from './input-type.type';
import { InputAppearance } from './input-appearance.type';
import { AmwSize } from '../../../../shared/types/amw-size.type';

/**
 * Input configuration interface
 */
export interface InputConfig {
    type?: InputType;
    appearance?: InputAppearance;
    size?: AmwSize;
    placeholder?: string;
    label?: string;
    hint?: string;
    prefix?: string;
    suffix?: string;
    disabled?: boolean;
    required?: boolean;
    readonly?: boolean;
    maxlength?: number;
    minlength?: number;
    max?: number;
    min?: number;
    step?: number;
    pattern?: string;
    autocomplete?: string;
    autofocus?: boolean;
    tabIndex?: number;
    name?: string;
    id?: string;
    value?: string | number;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    ariaRequired?: boolean;
    ariaInvalid?: boolean;
    errorMessage?: string;
    hasError?: boolean;
    startIcon?: string;
    endIcon?: string;
    clearable?: boolean;
    showPasswordToggle?: boolean;
    showCharacterCount?: boolean;
    showValidationOnBlur?: boolean;
    showValidationOnChange?: boolean;
    validationMessages?: {
        required?: string;
        email?: string;
        minlength?: string;
        maxlength?: string;
        pattern?: string;
        min?: string;
        max?: string;
    };
}