/**
 * Radio group option interface
 * Inherits from select option structure for consistency
 */
export interface RadioGroupOption {
    value: any;
    label: string;
    disabled?: boolean;
    icon?: string;
    description?: string;
}
