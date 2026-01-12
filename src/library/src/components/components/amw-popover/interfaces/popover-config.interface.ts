/** Popover-specific size type that includes extra-large */
export type PopoverSize = 'small' | 'medium' | 'large' | 'extra-large';

/**
 * Configuration interface for amw-popover component
 *
 * Defines the properties and behavior options for the Angular Material Wrap popover component
 */
export interface PopoverConfig {
    /** Whether the popover is opened */
    opened?: boolean;

    /** The size of the popover */
    size?: PopoverSize;

    /** The width of the popover */
    width?: string | number;

    /** The height of the popover */
    height?: string | number;

    /** The minimum width of the popover */
    minWidth?: string | number;

    /** The maximum width of the popover */
    maxWidth?: string | number;

    /** The minimum height of the popover */
    minHeight?: string | number;

    /** The maximum height of the popover */
    maxHeight?: string | number;

    /** Whether the popover is disabled */
    disabled?: boolean;

    /** Whether the popover can be closed when clicking outside */
    disableClose?: boolean;

    /** Whether the popover is fixed in viewport */
    fixedInViewport?: boolean;

    /** Whether to show the backdrop */
    showBackdrop?: boolean;

    /** The backdrop class */
    backdropClass?: string;

    /** The panel class */
    panelClass?: string;

    /** Whether the popover is auto focus */
    autoFocus?: boolean;

    /** Whether to restore focus to the previously focused element */
    restoreFocus?: boolean;

    /** The position of the popover */
    position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

    /** The horizontal offset from the trigger */
    offsetX?: number;

    /** The vertical offset from the trigger */
    offsetY?: number;

    /** Whether the popover is responsive */
    responsive?: boolean;

    /** The breakpoint for responsive behavior */
    responsiveBreakpoint?: string;

    /** Whether to show the arrow */
    showArrow?: boolean;

    /** The arrow size */
    arrowSize?: 'small' | 'medium' | 'large';

    /** The arrow color */
    arrowColor?: string;

    /** Whether to show the close button */
    showClose?: boolean;

    /** The close button text */
    closeText?: string;

    /** The close button icon */
    closeIcon?: string;

    /** Whether to show the header */
    showHeader?: boolean;

    /** The header title */
    headerTitle?: string;

    /** The header subtitle */
    headerSubtitle?: string;

    /** Whether to show the footer */
    showFooter?: boolean;

    /** The footer text */
    footerText?: string;

    /** Whether to show the scrollbar */
    showScrollbar?: boolean;

    /** The scrollbar class */
    scrollbarClass?: string;

    /** Whether to enable keyboard navigation */
    keyboardNavigation?: boolean;

    /** Whether to enable escape key to close */
    escapeKeyClose?: boolean;

    /** The animation duration */
    animationDuration?: number;

    /** The animation easing */
    animationEasing?: string;

    /** Whether to enable click outside to close */
    clickOutsideClose?: boolean;

    /** Whether to enable hover to open */
    hoverOpen?: boolean;

    /** The hover delay in milliseconds */
    hoverDelay?: number;

    /** Whether to enable hover to close */
    hoverClose?: boolean;

    /** The hover close delay in milliseconds */
    hoverCloseDelay?: number;

    /** Whether to enable focus to open */
    focusOpen?: boolean;

    /** Whether to enable focus to close */
    focusClose?: boolean;

    /** The z-index of the popover */
    zIndex?: number;

    /** Whether to enable backdrop click to close */
    backdropClickClose?: boolean;

    /** Whether to enable scroll to close */
    scrollClose?: boolean;

    /** Whether to enable resize to close */
    resizeClose?: boolean;

    /** Whether to enable orientation change to close */
    orientationChangeClose?: boolean;

    /** Whether to enable window blur to close */
    windowBlurClose?: boolean;

    /** Whether to enable window focus to close */
    windowFocusClose?: boolean;

    /** Whether to enable window resize to close */
    windowResizeClose?: boolean;

    /** Whether to enable window scroll to close */
    windowScrollClose?: boolean;

    /** Whether to enable window orientation change to close */
    windowOrientationChangeClose?: boolean;

    /** Whether to enable window visibility change to close */
    windowVisibilityChangeClose?: boolean;
}
