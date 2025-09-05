import { ButtonVariant } from './button.interface';
import { ButtonSize } from './button-size.type';
import { ButtonType } from './button-type.type';
import { ButtonColor } from './button-color.type';
import { IconPosition } from './icon-position.type';

/**
 * Button configuration interface
 */
export interface ButtonConfig {
    variant?: ButtonVariant;
    size?: ButtonSize;
    type?: ButtonType;
    color?: ButtonColor;
    icon?: string;
    iconPosition?: IconPosition;
    loading?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    required?: boolean;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    tabIndex?: number;
    autofocus?: boolean;
    name?: string;
    value?: string;
    form?: string;
    formAction?: string;
    formMethod?: 'get' | 'post' | 'put' | 'delete';
    formTarget?: '_blank' | '_self' | '_parent' | '_top';
    formEnctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
    formNoValidate?: boolean;
    formReset?: boolean;
    ripple?: boolean;
    disableRipple?: boolean;
    rippleColor?: string;
    rippleRadius?: number;
    rippleCentered?: boolean;
    rippleUnbounded?: boolean;
    rippleAnimation?: {
        enterDuration?: number;
        exitDuration?: number;
    };
}
