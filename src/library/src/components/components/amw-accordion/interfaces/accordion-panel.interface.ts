/**
 * Accordion panel interface
 */
export interface AccordionPanel {
    /** Panel title */
    title: string;

    /** Panel description */
    description?: string;

    /** Panel icon */
    icon?: string;

    /** Panel content */
    content: string;

    /** Panel badge count */
    badgeCount?: number;

    /** Panel badge color */
    badgeColor?: string;

    /** Whether the panel is disabled */
    isDisabled?: boolean;

    /** Whether the panel is expanded by default */
    isExpanded?: boolean;

    /** Whether the panel is valid */
    isValid?: boolean;

    /** Panel validator function */
    validator?: (panel: AccordionPanel) => boolean;

    /** Panel expand callback */
    onExpand?: () => void;

    /** Panel collapse callback */
    onCollapse?: () => void;

    /** Panel toggle callback */
    onToggle?: (isExpanded: boolean) => void;

    /** Custom CSS classes */
    customClasses?: string[];

    /** Custom styles */
    customStyles?: { [key: string]: string };

    /** Additional panel data */
    data?: any;
}

