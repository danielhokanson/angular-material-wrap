import { Injectable, ComponentRef, Type } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AmwDialogComponent } from '../components/amw-dialog/amw-dialog.component';
import { DialogConfig, DialogType, DialogSize, DialogPosition } from '../components/amw-dialog/interfaces';

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

/**
 * Service for managing dialogs programmatically
 * 
 * Provides convenient methods for creating and managing various types of dialogs
 * including alerts, confirmations, prompts, and custom dialogs.
 * 
 * @example
 * ```typescript
 * constructor(private dialogService: DialogService) {}
 * 
 * showAlert() {
 *   this.dialogService.alert('Operation completed!', 'Success');
 * }
 * 
 * confirmAction() {
 *   this.dialogService.confirm('Are you sure?', 'Confirm').subscribe(result => {
 *     if (result === 'confirm') {
 *       // Handle confirmation
 *     }
 *   });
 * }
 * ```
 */
@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(private dialog: MatDialog) { }

    /**
     * Opens a standard dialog with custom configuration
     * 
     * @param options - Dialog configuration options
     * @returns MatDialogRef for the opened dialog
     * 
     * @example
     * ```typescript
     * const dialogRef = this.dialogService.open({
     *   title: 'Custom Dialog',
     *   content: 'This is a custom dialog',
     *   type: 'info',
     *   size: 'medium',
     *   actions: [
     *     { label: 'OK', action: 'close', color: 'primary' }
     *   ]
     * });
     * 
     * dialogRef.afterClosed().subscribe(result => {
     *   console.log('Dialog closed with result:', result);
     * });
     * ```
     */
    open(options: DialogOptions): MatDialogRef<any> {
        const config = this.getDialogConfig(options);
        return this.dialog.open(AmwDialogComponent, config);
    }

    /**
     * Opens an alert dialog with a single OK button
     * 
     * @param message - Alert message to display
     * @param title - Dialog title (default: 'Alert')
     * @returns MatDialogRef for the opened dialog
     * 
     * @example
     * ```typescript
     * this.dialogService.alert('Operation completed successfully!', 'Success');
     * ```
     */
    alert(message: string, title: string = 'Alert'): MatDialogRef<any> {
        return this.open({
            title,
            content: message,
            type: 'alert',
            actions: [
                { label: 'OK', action: 'close', color: 'primary' }
            ],
            size: 'small'
        });
    }

    /**
     * Opens a confirmation dialog with Cancel and Confirm buttons
     * 
     * @param message - Confirmation message to display
     * @param title - Dialog title (default: 'Confirm')
     * @returns Observable that emits the result when dialog closes
     * 
     * @example
     * ```typescript
     * this.dialogService.confirm('Are you sure you want to delete this item?', 'Delete Item')
     *   .subscribe(result => {
     *     if (result === 'confirm') {
     *       this.deleteItem();
     *     }
     *   });
     * ```
     */
    confirm(message: string, title: string = 'Confirm'): Observable<any> {
        const dialogRef = this.open({
            title,
            content: message,
            type: 'confirm',
            actions: [
                { label: 'Cancel', action: 'cancel', color: 'warn' },
                { label: 'Confirm', action: 'confirm', color: 'primary' }
            ],
            size: 'small'
        });

        return dialogRef.afterClosed();
    }

    /**
     * Opens a prompt dialog for user input
     * 
     * @param message - Prompt message to display
     * @param title - Dialog title (default: 'Prompt')
     * @param defaultValue - Default input value (default: '')
     * @returns Observable that emits the result when dialog closes
     * 
     * @example
     * ```typescript
     * this.dialogService.prompt('Enter your name:', 'User Input', 'John Doe')
     *   .subscribe(result => {
     *     if (result === 'confirm') {
     *       console.log('User input:', result);
     *     }
     *   });
     * ```
     */
    prompt(message: string, title: string = 'Prompt', defaultValue: string = ''): Observable<any> {
        const dialogRef = this.open({
            title,
            content: message,
            type: 'prompt',
            actions: [
                { label: 'Cancel', action: 'cancel', color: 'warn' },
                { label: 'OK', action: 'confirm', color: 'primary' }
            ],
            size: 'medium',
            data: { defaultValue }
        });

        return dialogRef.afterClosed();
    }

    /**
     * Opens an informational dialog
     * 
     * @param message - Information message to display
     * @param title - Dialog title (default: 'Information')
     * @returns MatDialogRef for the opened dialog
     * 
     * @example
     * ```typescript
     * this.dialogService.info('This feature is coming soon!', 'Feature Notice');
     * ```
     */
    info(message: string, title: string = 'Information'): MatDialogRef<any> {
        return this.open({
            title,
            content: message,
            type: 'info',
            actions: [
                { label: 'Got it', action: 'close', color: 'primary' }
            ],
            size: 'small'
        });
    }

    /**
     * Opens a warning dialog with Cancel and Proceed buttons
     * 
     * @param message - Warning message to display
     * @param title - Dialog title (default: 'Warning')
     * @returns Observable that emits the result when dialog closes
     * 
     * @example
     * ```typescript
     * this.dialogService.warning('This action cannot be undone!', 'Warning')
     *   .subscribe(result => {
     *     if (result === 'confirm') {
     *       this.performDestructiveAction();
     *     }
     *   });
     * ```
     */
    warning(message: string, title: string = 'Warning'): Observable<any> {
        const dialogRef = this.open({
            title,
            content: message,
            type: 'warning',
            actions: [
                { label: 'Cancel', action: 'cancel' },
                { label: 'Proceed', action: 'confirm', color: 'warn' }
            ],
            size: 'small'
        });

        return dialogRef.afterClosed();
    }

    /**
     * Opens an error dialog
     * 
     * @param message - Error message to display
     * @param title - Dialog title (default: 'Error')
     * @returns MatDialogRef for the opened dialog
     * 
     * @example
     * ```typescript
     * this.dialogService.error('Failed to save data. Please try again.', 'Save Error');
     * ```
     */
    error(message: string, title: string = 'Error'): MatDialogRef<any> {
        return this.open({
            title,
            content: message,
            type: 'error',
            actions: [
                { label: 'OK', action: 'close', color: 'primary' }
            ],
            size: 'small'
        });
    }

    /**
     * Opens a success dialog
     * 
     * @param message - Success message to display
     * @param title - Dialog title (default: 'Success')
     * @returns MatDialogRef for the opened dialog
     * 
     * @example
     * ```typescript
     * this.dialogService.success('Data saved successfully!', 'Success');
     * ```
     */
    success(message: string, title: string = 'Success'): MatDialogRef<any> {
        return this.open({
            title,
            content: message,
            type: 'success',
            actions: [
                { label: 'Great!', action: 'close', color: 'primary' }
            ],
            size: 'small'
        });
    }

    /**
     * Opens a loading dialog with spinner
     * 
     * @param message - Loading message to display (default: 'Loading...')
     * @param title - Dialog title (default: 'Please wait')
     * @returns MatDialogRef for the opened dialog
     * 
     * @example
     * ```typescript
     * const loadingDialog = this.dialogService.loading('Processing your request...', 'Please wait');
     * 
     * // Simulate async operation
     * setTimeout(() => {
     *   loadingDialog.close();
     *   this.dialogService.success('Complete!', 'Success');
     * }, 3000);
     * ```
     */
    loading(message: string = 'Loading...', title: string = 'Please wait'): MatDialogRef<any> {
        return this.open({
            title,
            content: message,
            loading: true,
            closable: false,
            actions: [
                { label: 'Cancel', action: 'cancel', disabled: true }
            ],
            size: 'small'
        });
    }

    /**
     * Opens a custom dialog with any Angular component
     * 
     * @param component - Angular component to display in dialog
     * @param config - Optional MatDialog configuration
     * @returns MatDialogRef for the opened dialog
     * 
     * @example
     * ```typescript
     * const dialogRef = this.dialogService.openComponent(MyCustomComponent, {
     *   width: '600px',
     *   height: '400px',
     *   data: { userId: 123 }
     * });
     * ```
     */
    openComponent<T>(component: Type<T>, config?: MatDialogConfig): MatDialogRef<T> {
        return this.dialog.open(component, config);
    }

    /**
     * Closes all currently open dialogs
     * 
     * @example
     * ```typescript
     * this.dialogService.closeAll();
     * ```
     */
    closeAll(): void {
        this.dialog.closeAll();
    }

    /**
     * Gets all currently open dialogs
     * 
     * @returns Array of MatDialogRef instances for open dialogs
     * 
     * @example
     * ```typescript
     * const openDialogs = this.dialogService.getOpenDialogs();
     * console.log(`Currently ${openDialogs.length} dialogs are open`);
     * ```
     */
    getOpenDialogs(): MatDialogRef<any>[] {
        return this.dialog.openDialogs;
    }

    /**
     * Checks if any dialogs are currently open
     * 
     * @returns True if any dialogs are open, false otherwise
     * 
     * @example
     * ```typescript
     * if (this.dialogService.hasOpenDialogs()) {
     *   console.log('Some dialogs are still open');
     * }
     * ```
     */
    hasOpenDialogs(): boolean {
        return this.dialog.openDialogs.length > 0;
    }

    private getDialogConfig(options: DialogOptions): MatDialogConfig {
        const config: MatDialogConfig = {
            data: {
                title: options.title || '',
                content: options.content || '',
                type: options.type || 'standard',
                size: options.size || 'medium',
                position: options.position || 'center',
                actions: options.actions || [],
                showCloseButton: options.showCloseButton !== false,
                showHeader: options.showHeader !== false,
                showFooter: options.showFooter !== false,
                loading: options.loading || false,
                disabled: options.disabled || false,
                closable: options.closable !== false,
                backdrop: options.backdrop !== false,
                escapeKeyClose: options.escapeKeyClose !== false,
                clickOutsideClose: options.clickOutsideClose !== false,
                autoFocus: options.autoFocus !== false,
                restoreFocus: options.restoreFocus !== false,
                hasBackdrop: options.hasBackdrop !== false,
                backdropClass: options.backdropClass || '',
                panelClass: options.panelClass || '',
                data: options.data
            },
            width: options.width || this.getDefaultWidth(options.size),
            height: options.height || this.getDefaultHeight(options.size),
            maxWidth: options.maxWidth || this.getDefaultMaxWidth(options.size),
            maxHeight: options.maxHeight || this.getDefaultMaxHeight(options.size),
            minWidth: options.minWidth || this.getDefaultMinWidth(options.size),
            minHeight: options.minHeight || this.getDefaultMinHeight(options.size),
            hasBackdrop: options.hasBackdrop !== false,
            backdropClass: options.backdropClass || this.getBackdropClass(options.type),
            panelClass: options.panelClass || this.getPanelClass(options.type, options.size),
            disableClose: options.closable === false,
            autoFocus: options.autoFocus !== false,
            restoreFocus: options.restoreFocus !== false,
            closeOnNavigation: true
        };

        // Apply position
        if (options.position) {
            config.position = this.getPosition(options.position);
        }

        return config;
    }

    private getDefaultWidth(size?: DialogSize): string {
        switch (size) {
            case 'small': return '300px';
            case 'medium': return '500px';
            case 'large': return '800px';
            case 'fullscreen': return '100vw';
            default: return '500px';
        }
    }

    private getDefaultHeight(size?: DialogSize): string {
        switch (size) {
            case 'small': return '200px';
            case 'medium': return '400px';
            case 'large': return '600px';
            case 'fullscreen': return '100vh';
            default: return '400px';
        }
    }

    private getDefaultMaxWidth(size?: DialogSize): string {
        switch (size) {
            case 'small': return '400px';
            case 'medium': return '600px';
            case 'large': return '900px';
            case 'fullscreen': return '100vw';
            default: return '600px';
        }
    }

    private getDefaultMaxHeight(size?: DialogSize): string {
        switch (size) {
            case 'small': return '300px';
            case 'medium': return '500px';
            case 'large': return '700px';
            case 'fullscreen': return '100vh';
            default: return '500px';
        }
    }

    private getDefaultMinWidth(size?: DialogSize): string {
        switch (size) {
            case 'small': return '250px';
            case 'medium': return '400px';
            case 'large': return '600px';
            case 'fullscreen': return '100vw';
            default: return '400px';
        }
    }

    private getDefaultMinHeight(size?: DialogSize): string {
        switch (size) {
            case 'small': return '150px';
            case 'medium': return '300px';
            case 'large': return '400px';
            case 'fullscreen': return '100vh';
            default: return '300px';
        }
    }

    private getPosition(position: DialogPosition): any {
        switch (position) {
            case 'top': return { top: '20px' };
            case 'bottom': return { bottom: '20px' };
            case 'left': return { left: '20px' };
            case 'right': return { right: '20px' };
            case 'center': return {};
            default: return {};
        }
    }

    private getBackdropClass(type?: DialogType): string {
        const classes = ['amw-dialog-backdrop'];
        if (type) classes.push(`amw-dialog-backdrop--${type}`);
        return classes.join(' ');
    }

    private getPanelClass(type?: DialogType, size?: DialogSize): string {
        const classes = ['amw-dialog-panel'];
        if (type) classes.push(`amw-dialog-panel--${type}`);
        if (size) classes.push(`amw-dialog-panel--${size}`);
        return classes.join(' ');
    }
}
