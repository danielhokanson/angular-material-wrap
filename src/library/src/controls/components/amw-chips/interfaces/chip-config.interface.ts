import { Chip } from './chip.interface';
import { ChipMenuItem } from './chip-menu-item.interface';

/**
 * Chip configuration interface
 */
export interface ChipConfig {
    /** Array of chips to display */
    chips?: Chip[];
    /** Whether chips can be added */
    addable?: boolean;
    /** Whether chips can be removed */
    removable?: boolean;
    /** Whether chips can be selected (choice chips) */
    selectable?: boolean;
    /** Whether multiple chips can be selected */
    multiple?: boolean;
    /** Placeholder text for input */
    placeholder?: string;
    /** Maximum number of chips allowed */
    maxChips?: number;
    /** Minimum number of chips required */
    minChips?: number;
    /** Whether input is disabled */
    disabled?: boolean;
    /** Whether input is required */
    required?: boolean;
    /** Custom validation function */
    validator?: (chip: Chip) => boolean | string;
    /** Custom add function */
    onAdd?: (chip: Chip) => Chip | Promise<Chip>;
    /** Custom remove function */
    onRemove?: (chip: Chip) => boolean | Promise<boolean>;
    /** Custom select function */
    onSelect?: (chip: Chip) => void;
    /** Custom deselect function */
    onDeselect?: (chip: Chip) => void;
    /** Error message for validation */
    errorMessage?: string;
    /** Whether to show error state */
    hasError?: boolean;
    /** ARIA label for accessibility */
    ariaLabel?: string;
    /** ARIA described by for accessibility */
    ariaDescribedby?: string;
    /** Tab index for keyboard navigation */
    tabIndex?: number;
    /** Custom CSS classes */
    classes?: string | string[];
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Appearance variant */
    appearance?: 'filled' | 'outlined';
    /** Whether to show input field */
    showInput?: boolean;
    /** Whether to allow duplicate chips */
    allowDuplicates?: boolean;
    /** Custom filter function for suggestions */
    filterFn?: (query: string, chips: Chip[]) => Chip[];
    /** Whether to show suggestions */
    showSuggestions?: boolean;
    /** Maximum suggestions to show */
    maxSuggestions?: number;
    /** Default menu items for all chips */
    defaultMenuItems?: ChipMenuItem[];
    /** Whether to show menu buttons on chips */
    showMenus?: boolean;
    /** Custom menu item click handler */
    onMenuItemClick?: (chip: Chip, menuItem: ChipMenuItem) => void;
}
