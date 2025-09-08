import { AmwColor } from '../../../shared/types/amw-color.type';

/**
 * Toggle configuration interface
 */
export interface ToggleConfig {
    color?: AmwColor;
    disabled?: boolean;
    required?: boolean;
    checked?: boolean;
    value?: any;
    name?: string;
    id?: string;
    tabIndex?: number;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    ariaRequired?: boolean;
    ariaInvalid?: boolean;
    errorMessage?: string;
    hasError?: boolean;
    disableRipple?: boolean;
    labelPosition?: 'before' | 'after';
    label?: string;
    validationMessages?: {
        required?: string;
        invalid?: string;
    };
}
