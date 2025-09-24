/**
 * Accordion configuration interface
 */
export interface AccordionConfig {
    /** Whether multiple panels can be expanded */
    multiExpand?: boolean;

    /** Whether to show panel icons */
    showIcons?: boolean;

    /** Whether to show panel descriptions */
    showDescriptions?: boolean;

    /** Whether to show panel badges */
    showBadges?: boolean;

    /** Whether to show expand/collapse all buttons */
    showExpandCollapseAll?: boolean;

    /** Whether to show panel actions */
    showPanelActions?: boolean;

    /** Animation duration in milliseconds */
    animationDuration?: number;

    /** Animation easing function */
    animationEasing?: string;

    /** Custom CSS classes */
    customClasses?: string[];

    /** Custom styles */
    customStyles?: { [key: string]: string };
}

