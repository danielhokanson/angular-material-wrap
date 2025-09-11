import { ChipMenuItem } from './chip-menu-item.interface';

/**
 * Individual chip interface
 */
export interface Chip {
    /** Unique identifier for the chip */
    id: string;
    /** Display text for the chip */
    label: string;
    /** Optional value associated with the chip */
    value?: any;
    /** Whether the chip can be removed */
    removable?: boolean;
    /** Whether the chip is disabled */
    disabled?: boolean;
    /** Whether the chip is selected (for choice chips) */
    selected?: boolean;
    /** Custom CSS classes for the chip */
    classes?: string | string[];
    /** Custom data associated with the chip */
    data?: any;
    /** Icon name for the chip */
    icon?: string;
    /** Avatar image URL for the chip */
    avatar?: string;
    /** Color variant for the chip */
    color?: 'primary' | 'accent' | 'warn' | 'basic';
    /** Menu items for the chip */
    menuItems?: ChipMenuItem[];
    /** Whether to show menu button */
    showMenu?: boolean;
}
