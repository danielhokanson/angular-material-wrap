import { DialogPosition, DialogSize, DialogType } from '../components/amw-dialog/interfaces';

/**
 * Configuration options for dialog creation
 */
export interface DialogOptions {
    /** Dialog title text */
    title?: string;
    /** Dialog content text */
    content?: string;
    /** Dialog type variant */
    type?: DialogType;
    /** Dialog size variant */
    size?: DialogSize;
    /** Dialog position on screen */
    position?: DialogPosition;
    /** Array of action buttons */
    actions?: Array<{
        /** Button label text */
        label: string;
        /** Material icon name */
        icon?: string;
        /** Button color theme */
        color?: 'primary' | 'accent' | 'warn';
        /** Whether button is disabled */
        disabled?: boolean;
        /** Action identifier for event handling */
        action?: string;
    }>;
    /** Whether to show close button */
    showCloseButton?: boolean;
    /** Whether to show header section */
    showHeader?: boolean;
    /** Whether to show footer section */
    showFooter?: boolean;
    /** Whether dialog is in loading state */
    loading?: boolean;
    /** Whether dialog is disabled */
    disabled?: boolean;
    /** Whether dialog can be closed */
    closable?: boolean;
    /** Whether to show backdrop */
    backdrop?: boolean;
    /** Whether ESC key closes dialog */
    escapeKeyClose?: boolean;
    /** Whether clicking outside closes dialog */
    clickOutsideClose?: boolean;
    /** Maximum width of dialog */
    maxWidth?: string;
    /** Maximum height of dialog */
    maxHeight?: string;
    /** Minimum width of dialog */
    minWidth?: string;
    /** Minimum height of dialog */
    minHeight?: string;
    /** Width of dialog */
    width?: string;
    /** Height of dialog */
    height?: string;
    /** Whether to auto-focus dialog */
    autoFocus?: boolean;
    /** Whether to restore focus after closing */
    restoreFocus?: boolean;
    /** Whether dialog has backdrop */
    hasBackdrop?: boolean;
    /** CSS class for backdrop */
    backdropClass?: string;
    /** CSS class for dialog panel */
    panelClass?: string;
    /** Custom data to pass to dialog */
    data?: any;
}