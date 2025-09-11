/**
 * Chip menu item interface
 */
export interface ChipMenuItem {
    /** Unique identifier for the menu item */
    id: string;
    /** Display text for the menu item */
    label: string;
    /** Icon name for the menu item */
    icon?: string;
    /** Whether the menu item is disabled */
    disabled?: boolean;
    /** Whether the menu item is visible */
    visible?: boolean;
    /** Custom CSS classes for the menu item */
    classes?: string | string[];
    /** Custom data associated with the menu item */
    data?: any;
    /** Action to perform when clicked */
    action?: (chip: any, menuItem: ChipMenuItem) => void;
    /** Whether to show a divider after this item */
    divider?: boolean;
}
