/**
 * Represents an option for the chip input component
 */
export interface ChipInputOption {
    /** Unique value for the chip */
    value: any;
    /** Display label */
    label: string;
    /** Optional Material icon name */
    icon?: string;
    /** Optional subtitle for rich display */
    subtitle?: string;
    /** Whether this was a custom user-entered value */
    isCustom?: boolean;
    /** Whether the chip/option is disabled */
    disabled?: boolean;
    /** Additional custom data */
    data?: any;
}

/**
 * Configuration options for the chip input component
 */
export interface ChipInputConfig {
    /** Form field appearance */
    appearance?: 'outline' | 'fill';
    /** Key codes that trigger chip add */
    separatorKeyCodes?: number[];
    /** Whether to add chip on blur */
    addOnBlur?: boolean;
    /** Whether chips can be removed */
    removable?: boolean;
    /** Whether custom values can be added */
    allowCustomValues?: boolean;
    /** Maximum number of chips allowed */
    maxChips?: number;
    /** Debounce time for filtering in ms */
    filterDebounce?: number;
}
