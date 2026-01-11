import { TemplateRef } from '@angular/core';

/**
 * Tab item interface
 */
export interface TabItem {
    /** Tab label */
    label: string;

    /** Tab content (string for simple content) */
    content?: string;

    /** Tab content template (for projected content) */
    contentTemplate?: TemplateRef<any>;

    /** Tab header template (for custom tab headers with icons, badges, etc.) */
    headerTemplate?: TemplateRef<any>;

    /** Tab icon */
    icon?: string;

    /** Tab badge count */
    badgeCount?: number;

    /** Tab badge color */
    badgeColor?: string;

    /** Whether the tab is disabled */
    isDisabled?: boolean;

    /** Whether the tab is closable */
    isClosable?: boolean;

    /** Whether the tab is valid */
    isValid?: boolean;

    /** Tab validator function */
    validator?: (tab: TabItem) => boolean;

    /** Tab activation callback */
    onActivate?: () => void;

    /** Tab deactivation callback */
    onDeactivate?: () => void;

    /** Tab close callback */
    onClose?: () => void;

    /** Custom CSS classes */
    customClasses?: string[];

    /** Custom styles */
    customStyles?: { [key: string]: string };

    /** Additional tab data */
    data?: any;
}

