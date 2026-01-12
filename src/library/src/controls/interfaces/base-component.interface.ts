import { ControlValueAccessor } from '@angular/forms';
import { InputSignal, WritableSignal } from '@angular/core';

/**
 * Base interface for all AMW components that can work both inside and outside forms
 * Uses Angular signals for reactive properties
 */
export interface BaseComponentInterface extends ControlValueAccessor {
    /**
     * Whether the component is disabled (signal)
     */
    disabled: InputSignal<boolean>;

    /**
     * Whether the component is required (signal)
     */
    required: InputSignal<boolean>;

    /**
     * The value of the component
     */
    value?: any;

    /**
     * Placeholder text (signal)
     */
    placeholder: InputSignal<string>;

    /**
     * Label text (signal)
     */
    label: InputSignal<string>;

    /**
     * Error message to display (signal)
     */
    errorMessage: InputSignal<string>;

    /**
     * Whether the component has an error (signal)
     */
    hasError: WritableSignal<boolean>;
}
