/**
 * Tab item interface
 */
export interface TabItem {
    /** Tab label */
    label: string;

    /** Tab content */
    content: string;

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

