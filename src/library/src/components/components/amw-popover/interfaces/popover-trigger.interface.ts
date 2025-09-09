/**
 * Interface for popover trigger configuration
 * 
 * Defines how the popover should be triggered and its behavior
 */
export interface PopoverTrigger {
    /** The type of trigger */
    type?: 'click' | 'hover' | 'focus' | 'manual';

    /** Whether the trigger is disabled */
    disabled?: boolean;

    /** The trigger element selector */
    selector?: string;

    /** The trigger element reference */
    element?: HTMLElement;

    /** Whether to prevent default behavior */
    preventDefault?: boolean;

    /** Whether to stop propagation */
    stopPropagation?: boolean;

    /** The trigger delay in milliseconds */
    delay?: number;

    /** The trigger close delay in milliseconds */
    closeDelay?: number;

    /** Whether to toggle on trigger */
    toggle?: boolean;

    /** Whether to close on escape key */
    escapeKey?: boolean;

    /** Whether to close on outside click */
    outsideClick?: boolean;

    /** Whether to close on scroll */
    scroll?: boolean;

    /** Whether to close on resize */
    resize?: boolean;

    /** Whether to close on orientation change */
    orientationChange?: boolean;

    /** Whether to close on window blur */
    windowBlur?: boolean;

    /** Whether to close on window focus */
    windowFocus?: boolean;

    /** Whether to close on window resize */
    windowResize?: boolean;

    /** Whether to close on window scroll */
    windowScroll?: boolean;

    /** Whether to close on window orientation change */
    windowOrientationChange?: boolean;

    /** Whether to close on window visibility change */
    windowVisibilityChange?: boolean;

    /** Custom trigger function */
    customTrigger?: (event: Event) => void;

    /** Custom close function */
    customClose?: (event: Event) => void;

    /** Whether to enable keyboard navigation */
    keyboardNavigation?: boolean;

    /** Whether to enable focus management */
    focusManagement?: boolean;

    /** Whether to enable aria attributes */
    ariaAttributes?: boolean;

    /** The aria label for the trigger */
    ariaLabel?: string;

    /** The aria described by for the trigger */
    ariaDescribedBy?: string;

    /** The aria expanded state */
    ariaExpanded?: boolean;

    /** The aria controls for the trigger */
    ariaControls?: string;

    /** The aria has popup for the trigger */
    ariaHasPopup?: boolean;
}
