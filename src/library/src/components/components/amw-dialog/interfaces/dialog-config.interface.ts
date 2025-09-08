/**
 * Configuration options for the amw-dialog component
 */
export interface DialogConfig {
    /** Width of the dialog */
    width?: string;
    /** Height of the dialog */
    height?: string;
    /** Maximum width of the dialog */
    maxWidth?: string;
    /** Maximum height of the dialog */
    maxHeight?: string;
    /** Minimum width of the dialog */
    minWidth?: string;
    /** Minimum height of the dialog */
    minHeight?: string;
    /** Position of the dialog on screen */
    position?: {
        /** Top position offset */
        top?: string;
        /** Bottom position offset */
        bottom?: string;
        /** Left position offset */
        left?: string;
        /** Right position offset */
        right?: string
    };
    /** Whether the dialog has a backdrop */
    hasBackdrop?: boolean;
    /** CSS class for the backdrop */
    backdropClass?: string;
    /** CSS class for the dialog panel */
    panelClass?: string;
    /** Whether to disable closing the dialog */
    disableClose?: boolean;
    /** Whether to auto-focus the dialog */
    autoFocus?: boolean;
    /** Whether to restore focus after closing */
    restoreFocus?: boolean;
    /** Whether to close on navigation */
    closeOnNavigation?: boolean;
    /** Whether to auto-open the dialog */
    autoOpen?: boolean;
    /** Custom data to pass to the dialog */
    data?: any;
}
