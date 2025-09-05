import { ControlValueAccessor } from '@angular/forms';

/**
 * Base interface for all AMW components that can work both inside and outside forms
 */
export interface BaseComponentInterface extends ControlValueAccessor {
    /**
     * Whether the component is disabled
     */
    disabled?: boolean;

    /**
     * Whether the component is required
     */
    required?: boolean;

    /**
     * The value of the component
     */
    value?: any;

    /**
     * Placeholder text
     */
    placeholder?: string;

    /**
     * Label text
     */
    label?: string;

    /**
     * Error message to display
     */
    errorMessage?: string;

    /**
     * Whether the component has an error
     */
    hasError?: boolean;
}
