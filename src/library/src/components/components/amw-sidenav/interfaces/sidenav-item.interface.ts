/**
 * Interface for sidenav navigation items
 * 
 * Defines the structure of navigation items within the sidenav component
 */
export interface SidenavItem {
    /** Unique identifier for the item */
    id: string;

    /** Display text for the item */
    label: string;

    /** Icon name for the item */
    icon?: string;

    /** Route path for the item */
    route?: string;

    /** External URL for the item */
    href?: string;

    /** Whether the item is disabled */
    disabled?: boolean;

    /** Whether the item is active */
    active?: boolean;

    /** CSS classes for the item */
    classes?: string;

    /** Tooltip text for the item */
    tooltip?: string;

    /** Badge text for the item */
    badge?: string;

    /** Badge color for the item */
    badgeColor?: string;

    /** Child items for nested navigation */
    children?: SidenavItem[];

    /** Whether the item is expanded (for nested items) */
    expanded?: boolean;

    /** Custom data for the item */
    data?: any;
}
