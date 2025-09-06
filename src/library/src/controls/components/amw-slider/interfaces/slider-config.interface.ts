import { SliderColor } from './slider-color.type';

/**
 * Slider configuration interface
 */
export interface SliderConfig {
    color?: SliderColor;
    disabled?: boolean;
    required?: boolean;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    discrete?: boolean;
    showTickMarks?: boolean;
    showThumbLabel?: boolean;
    thumbLabel?: string;
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
    invert?: boolean;
    vertical?: boolean;
    orientation?: 'horizontal' | 'vertical';
    displayWith?: (value: number) => string | string;
    valueText?: string;
    validationMessages?: {
        required?: string;
        min?: string;
        max?: string;
        step?: string;
    };
}
