/**
 * Radio group option interface
 * Inherits from select option structure for consistency
 */
export interface AmwRadioGroupOption {
    value: any;
    label: string;
    disabled?: boolean;
    icon?: string;
    description?: string;
}
