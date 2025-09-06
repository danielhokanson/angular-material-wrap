import { CheckboxColor } from './checkbox-color.type';
import { CheckboxSize } from './checkbox-size.type';

/**
 * Checkbox configuration interface
 */
export interface CheckboxConfig {
    color?: CheckboxColor;
    size?: CheckboxSize;
    label?: string;
    labelPosition?: 'before' | 'after';
    disabled?: boolean;
    required?: boolean;
    indeterminate?: boolean;
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
    disableCheckRipple?: boolean;
    animationDuration?: string;
    animationTimingFunction?: string;
    customIcon?: boolean;
    customCheckmark?: boolean;
    customIndeterminateIcon?: boolean;
    validationMessages?: {
        required?: string;
        invalid?: string;
    };
}
