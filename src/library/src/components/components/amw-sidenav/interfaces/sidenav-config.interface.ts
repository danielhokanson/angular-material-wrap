import { AmwSize } from '../../../../shared/types';

/**
 * Configuration interface for amw-sidenav component
 * 
 * Defines the properties and behavior options for the Angular Material Wrap sidenav component
 */
export interface SidenavConfig {
    /** Whether the sidenav is opened */
    opened?: boolean;

    /** The mode of the sidenav */
    mode?: 'over' | 'push' | 'side';

    /** Whether the sidenav is disabled */
    disabled?: boolean;

    /** Whether the sidenav can be closed when clicking outside */
    disableClose?: boolean;

    /** Whether the sidenav is fixed in viewport */
    fixedInViewport?: boolean;

    /** The size of the sidenav */
    size?: AmwSize;

    /** The width of the sidenav */
    width?: string | number;

    /** The minimum width of the sidenav */
    minWidth?: string | number;

    /** The maximum width of the sidenav */
    maxWidth?: string | number;

    /** Whether to show the backdrop */
    showBackdrop?: boolean;

    /** The backdrop class */
    backdropClass?: string;

    /** The panel class */
    panelClass?: string;

    /** Whether the sidenav is auto focus */
    autoFocus?: boolean;

    /** Whether to restore focus to the previously focused element */
    restoreFocus?: boolean;

    /** The position of the sidenav */
    position?: 'start' | 'end';

    /** Whether the sidenav is responsive */
    responsive?: boolean;

    /** The breakpoint for responsive behavior */
    responsiveBreakpoint?: string;

    /** Whether to show the toggle button */
    showToggle?: boolean;

    /** The toggle button text */
    toggleText?: string;

    /** The toggle button icon */
    toggleIcon?: string;

    /** Whether to show the close button */
    showClose?: boolean;

    /** The close button text */
    closeText?: string;

    /** The close button icon */
    closeIcon?: string;
}
