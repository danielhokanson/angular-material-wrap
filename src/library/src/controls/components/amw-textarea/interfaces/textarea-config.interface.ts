import { TextareaAppearance } from './textarea-appearance.type';

/**
 * Textarea configuration interface
 */
export interface TextareaConfig {
    appearance?: TextareaAppearance;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    label?: string;
    hint?: string;
    value?: string;
    name?: string;
    id?: string;
    tabIndex?: number;
    maxLength?: number;
    minLength?: number;
    rows?: number;
    cols?: number;
    wrap?: 'soft' | 'hard' | 'off';
    readonly?: boolean;
    spellcheck?: boolean;
    autocomplete?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    ariaRequired?: boolean;
    ariaInvalid?: boolean;
    errorMessage?: string;
    hasError?: boolean;
    validationMessages?: {
        required?: string;
        minlength?: string;
        maxlength?: string;
        pattern?: string;
    };
}
