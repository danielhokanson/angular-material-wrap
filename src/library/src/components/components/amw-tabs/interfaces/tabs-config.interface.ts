/**
 * Tabs configuration interface
 */
export interface TabsConfig {
    /** Tabs orientation */
    orientation?: 'horizontal' | 'vertical';

    /** Tabs alignment */
    alignment?: 'start' | 'center' | 'end' | 'stretch';

    /** Whether to show tab icons */
    showIcons?: boolean;

    /** Whether to show tab badges */
    showBadges?: boolean;

    /** Whether to show close buttons */
    showCloseButtons?: boolean;

    /** Whether tabs are closable */
    closable?: boolean;

    /** Whether tabs are draggable */
    draggable?: boolean;

    /** Whether to show add button */
    showAddButton?: boolean;

    /** Whether to show scroll buttons */
    showScrollButtons?: boolean;

    /** Animation duration in milliseconds */
    animationDuration?: number;

    /** Animation easing function */
    animationEasing?: string;

    /** Custom CSS classes */
    customClasses?: string[];

    /** Custom styles */
    customStyles?: { [key: string]: string };
}

