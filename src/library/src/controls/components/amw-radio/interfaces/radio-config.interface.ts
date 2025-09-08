import { AmwColor } from '../../../shared/types/amw-color.type';
import { AmwSize } from '../../../shared/types/amw-size.type';

/**
 * Radio button configuration interface
 */
export interface RadioConfig {
    color?: AmwColor;
    size?: AmwSize;
    label?: string;
    labelPosition?: 'before' | 'after';
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
    disableFocusRipple?: boolean;
    animationDuration?: string;
    animationTimingFunction?: string;
    validationMessages?: {
        required?: string;
        invalid?: string;
    };
}
