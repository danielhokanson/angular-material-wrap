import { Injectable, Type, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { AmwDialogComponent } from '../components/amw-dialog/amw-dialog.component';
import { DialogConfig, DialogType, DialogSize, DialogPosition } from '../components/amw-dialog/interfaces';
import { DialogOptions } from '../interfaces/dialog-options';

/**
 * Modern dialog reference that provides typed access to the component instance.
 * Use with signal-based communication patterns for reactive dialog interactions.
 *
 * @example
 * ```typescript
 * const dialogRef = this.dialogService.open('Edit User', EditUserComponent, {
 *   data: { userId: 123 }
 * });
 *
 * // Signal-based communication (recommended)
 * effect(() => {
 *   const savedData = dialogRef.instance.saveSignal();
 *   if (savedData) {
 *     this.handleSave(savedData);
 *     dialogRef.close();
 *   }
 * });
 * ```
 */
export class AmwDialogRef<T, R = any> {
    private readonly _afterClosed = new Subject<R | undefined>();
    private readonly _afterOpened = new Subject<void>();

    constructor(
        private matDialogRef: MatDialogRef<T, R>,
        private _instance: T
    ) {
        // Forward MatDialogRef events
        this.matDialogRef.afterClosed().subscribe(result => {
            this._afterClosed.next(result);
            this._afterClosed.complete();
        });
        this.matDialogRef.afterOpened().subscribe(() => {
            this._afterOpened.next();
            this._afterOpened.complete();
        });
    }

    /**
     * The component instance inside the dialog.
     * Use this to access signals and methods on your dialog component.
     */
    get instance(): T {
        return this._instance;
    }

    /**
     * Closes the dialog with an optional result value.
     */
    close(result?: R): void {
        this.matDialogRef.close(result);
    }

    /**
     * Observable that emits when the dialog is closed.
     */
    afterClosed(): Observable<R | undefined> {
        return this._afterClosed.asObservable();
    }

    /**
     * Observable that emits when the dialog is opened.
     */
    afterOpened(): Observable<void> {
        return this._afterOpened.asObservable();
    }

    /**
     * Updates the dialog's position.
     */
    updatePosition(position?: { top?: string; bottom?: string; left?: string; right?: string }): this {
        this.matDialogRef.updatePosition(position);
        return this;
    }

    /**
     * Updates the dialog's size.
     */
    updateSize(width?: string, height?: string): this {
        this.matDialogRef.updateSize(width, height);
        return this;
    }

    /**
     * Adds a CSS class to the dialog panel.
     */
    addPanelClass(classes: string | string[]): this {
        this.matDialogRef.addPanelClass(classes);
        return this;
    }

    /**
     * Removes a CSS class from the dialog panel.
     */
    removePanelClass(classes: string | string[]): this {
        this.matDialogRef.removePanelClass(classes);
        return this;
    }
}

/**
 * Configuration for opening custom component dialogs
 */
export interface AmwDialogConfig<D = any> {
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
    /** Position of the dialog */
    position?: { top?: string; bottom?: string; left?: string; right?: string };
    /** Whether the dialog has a backdrop */
    hasBackdrop?: boolean;
    /** CSS class for the backdrop */
    backdropClass?: string | string[];
    /** CSS class for the dialog panel */
    panelClass?: string | string[];
    /** Whether clicking outside or pressing ESC closes the dialog */
    disableClose?: boolean;
    /** Whether to auto-focus the first focusable element */
    autoFocus?: boolean | 'first-tabbable' | 'first-heading' | 'dialog';
    /** Whether to restore focus to the previously focused element after closing */
    restoreFocus?: boolean;
    /** Custom data to pass to the dialog component (injected via MAT_DIALOG_DATA) */
    data?: D;
}

/**
 * Service for managing dialogs programmatically.
 *
 * ## Recommended Usage (Signal-based)
 *
 * The preferred way to use dialogs is with the `open()` method and signal-based
 * communication for reactive interactions:
 *
 * @example
 * ```typescript
 * // In your component
 * constructor(private dialogService: DialogService) {}
 *
 * openEditor() {
 *   const dialogRef = this.dialogService.open('Edit Item', EditItemComponent, {
 *     data: { itemId: this.itemId }
 *   });
 *
 *   // React to signals from the dialog component
 *   effect(() => {
 *     const savedItem = dialogRef.instance.savedItem();
 *     if (savedItem) {
 *       this.items.update(items => [...items, savedItem]);
 *       dialogRef.close();
 *     }
 *   });
 * }
 * ```
 *
 * ```typescript
 * // In your dialog component
 * import { getAmwDialogTitle, AmwDialogData } from '@amw/dialog';
 *
 * @Component({
 *   selector: 'app-edit-item',
 *   template: `
 *     <h2 mat-dialog-title>{{ title }}</h2>
 *     <mat-dialog-content>
 *       <!-- form content -->
 *     </mat-dialog-content>
 *     <mat-dialog-actions>
 *       <amw-button (click)="cancel()">Cancel</amw-button>
 *       <amw-button color="primary" (click)="save()">Save</amw-button>
 *     </mat-dialog-actions>
 *   `
 * })
 * export class EditItemComponent {
 *   readonly data = inject<{ itemId: number } & AmwDialogData>(MAT_DIALOG_DATA);
 *   readonly title = getAmwDialogTitle(this.data);
 *
 *   // Signal for communicating save events to parent
 *   readonly savedItem = signal<Item | null>(null);
 *
 *   save() {
 *     // Setting the signal triggers the effect in the parent
 *     this.savedItem.set(this.form.value);
 *   }
 *
 *   cancel() {
 *     this.savedItem.set(null); // Parent handles closing
 *   }
 * }
 * ```
 *
 * ## Legacy Usage
 *
 * The convenience methods (alert, confirm, etc.) are still available but
 * are considered legacy patterns. Prefer the signal-based approach for
 * new development.
 */
@Injectable({
    providedIn: 'root'
})
export class AmwDialogService {
    constructor(
        private dialog: MatDialog,
        private injector: Injector
    ) { }

    /**
     * Opens a dialog with a custom component.
     *
     * This is the recommended way to open dialogs. It returns an AmwDialogRef
     * that provides typed access to the component instance for signal-based
     * communication.
     *
     * @param title - The dialog title (accessible via getAmwDialogTitle(data) in your component)
     * @param component - The Angular component to display in the dialog
     * @param config - Optional dialog configuration
     * @returns AmwDialogRef with typed access to the component instance
     *
     * @example
     * ```typescript
     * const dialogRef = this.dialogService.open('Edit User', EditUserComponent, {
     *   width: '600px',
     *   data: { userId: 123 }
     * });
     *
     * // Access component signals
     * effect(() => {
     *   const saved = dialogRef.instance.saveSignal();
     *   if (saved) {
     *     this.handleSave(saved);
     *     dialogRef.close();
     *   }
     * });
     * ```
     */
    open<T, D = any, R = any>(
        title: string,
        component: Type<T>,
        config?: AmwDialogConfig<D>
    ): AmwDialogRef<T, R> {
        // Embed the title in the data object for component access via getAmwDialogTitle()
        const dataWithTitle = {
            ...(config?.data ?? {}),
            _amwTitle: title
        } as D;

        const matConfig: MatDialogConfig<D> = {
            width: config?.width ?? '500px',
            height: config?.height,
            maxWidth: config?.maxWidth ?? '90vw',
            maxHeight: config?.maxHeight ?? '90vh',
            minWidth: config?.minWidth,
            minHeight: config?.minHeight,
            position: config?.position,
            hasBackdrop: config?.hasBackdrop ?? true,
            backdropClass: config?.backdropClass ?? 'amw-dialog-backdrop',
            panelClass: config?.panelClass ?? 'amw-dialog-panel',
            disableClose: config?.disableClose ?? false,
            autoFocus: config?.autoFocus ?? 'first-tabbable',
            restoreFocus: config?.restoreFocus ?? true,
            data: dataWithTitle
        };

        const matDialogRef = this.dialog.open<T, D, R>(component, matConfig);

        // Create and return our typed dialog ref
        const dialogRef = new AmwDialogRef<T, R>(matDialogRef, matDialogRef.componentInstance);

        // Inject the dialog ref into the component if it has a dialogRef property
        if (matDialogRef.componentInstance && typeof matDialogRef.componentInstance === 'object') {
            (matDialogRef.componentInstance as any)._amwDialogRef = dialogRef;
        }

        return dialogRef;
    }

    /**
     * @deprecated Use `open(title, component, config)` instead.
     * Opens a standard dialog with custom configuration using the legacy options pattern.
     *
     * Migrate to the new signal-based pattern:
     * ```typescript
     * // Old pattern (deprecated)
     * this.dialogService.openWithOptions({ title: 'My Dialog', content: '...' });
     *
     * // New pattern (recommended)
     * const ref = this.dialogService.open('My Dialog', MyDialogComponent);
     * ```
     */
    openWithOptions(options: DialogOptions): MatDialogRef<any> {
        console.warn(
            '[DialogService] openWithOptions() is deprecated. ' +
            'Use open(title, component, config) with signal-based communication instead.'
        );
        const config = this.getDialogConfig(options);
        return this.dialog.open(AmwDialogComponent, config);
    }

    /**
     * @deprecated Use `open(title, component, config)` instead.
     * Opens a custom dialog with any Angular component.
     *
     * Migrate to the new pattern:
     * ```typescript
     * // Old pattern (deprecated)
     * this.dialogService.openComponent(MyComponent, { data: { id: 1 } });
     *
     * // New pattern (recommended)
     * const ref = this.dialogService.open('Title', MyComponent, { data: { id: 1 } });
     * ```
     */
    openComponent<T>(component: Type<T>, config?: MatDialogConfig): MatDialogRef<T> {
        console.warn(
            '[DialogService] openComponent() is deprecated. ' +
            'Use open(title, component, config) with signal-based communication instead.'
        );
        return this.dialog.open(component, config);
    }

    /**
     * @deprecated Use a custom dialog component with signal-based communication instead.
     * Opens an alert dialog with a single OK button.
     *
     * For new code, create a reusable alert component and use signals:
     * ```typescript
     * const ref = this.dialogService.open('Alert', AlertComponent, {
     *   data: { message: 'Operation completed!' }
     * });
     * ```
     */
    alert(message: string, title: string = 'Alert'): MatDialogRef<any> {
        console.warn(
            '[DialogService] alert() is deprecated. ' +
            'Use open(title, component, config) with a custom alert component instead.'
        );
        return this.openWithOptions({
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
     * @deprecated Use a custom dialog component with signal-based communication instead.
     * Opens a confirmation dialog with Cancel and Confirm buttons.
     *
     * For new code, create a reusable confirm component and use signals:
     * ```typescript
     * const ref = this.dialogService.open('Confirm', ConfirmComponent, {
     *   data: { message: 'Are you sure?' }
     * });
     * effect(() => {
     *   if (ref.instance.confirmed()) {
     *     // Handle confirmation
     *     ref.close();
     *   }
     * });
     * ```
     */
    confirm(message: string, title: string = 'Confirm'): Observable<any> {
        console.warn(
            '[DialogService] confirm() is deprecated. ' +
            'Use open(title, component, config) with a custom confirm component instead.'
        );
        const dialogRef = this.openWithOptions({
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
     * @deprecated Use a custom dialog component with signal-based communication instead.
     * Opens a prompt dialog for user input.
     */
    prompt(message: string, title: string = 'Prompt', defaultValue: string = ''): Observable<any> {
        console.warn(
            '[DialogService] prompt() is deprecated. ' +
            'Use open(title, component, config) with a custom prompt component instead.'
        );
        const dialogRef = this.openWithOptions({
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
     * @deprecated Use a custom dialog component with signal-based communication instead.
     * Opens an informational dialog.
     */
    info(message: string, title: string = 'Information'): MatDialogRef<any> {
        console.warn(
            '[DialogService] info() is deprecated. ' +
            'Use open(title, component, config) with a custom info component instead.'
        );
        return this.openWithOptions({
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
     * @deprecated Use a custom dialog component with signal-based communication instead.
     * Opens a warning dialog with Cancel and Proceed buttons.
     */
    warning(message: string, title: string = 'Warning'): Observable<any> {
        console.warn(
            '[DialogService] warning() is deprecated. ' +
            'Use open(title, component, config) with a custom warning component instead.'
        );
        const dialogRef = this.openWithOptions({
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
     * @deprecated Use a custom dialog component with signal-based communication instead.
     * Opens an error dialog.
     */
    error(message: string, title: string = 'Error'): MatDialogRef<any> {
        console.warn(
            '[DialogService] error() is deprecated. ' +
            'Use open(title, component, config) with a custom error component instead.'
        );
        return this.openWithOptions({
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
     * @deprecated Use a custom dialog component with signal-based communication instead.
     * Opens a success dialog.
     */
    success(message: string, title: string = 'Success'): MatDialogRef<any> {
        console.warn(
            '[DialogService] success() is deprecated. ' +
            'Use open(title, component, config) with a custom success component instead.'
        );
        return this.openWithOptions({
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
     * @deprecated Use a custom dialog component with signal-based communication instead.
     * Opens a loading dialog with spinner.
     */
    loading(message: string = 'Loading...', title: string = 'Please wait'): MatDialogRef<any> {
        console.warn(
            '[DialogService] loading() is deprecated. ' +
            'Use open(title, component, config) with a custom loading component instead.'
        );
        return this.openWithOptions({
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
     * Closes all currently open dialogs.
     */
    closeAll(): void {
        this.dialog.closeAll();
    }

    /**
     * Gets all currently open dialogs.
     */
    getOpenDialogs(): MatDialogRef<any>[] {
        return this.dialog.openDialogs;
    }

    /**
     * Checks if any dialogs are currently open.
     */
    hasOpenDialogs(): boolean {
        return this.dialog.openDialogs.length > 0;
    }

    private getDialogConfig(options: DialogOptions): MatDialogConfig {
        const backdropClass = this.getBackdropClass(options.type) || 'amw-dialog-backdrop';
        const panelClass = this.getPanelClass(options.type, options.size) || 'amw-dialog-panel';

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
                data: options.data
            },
            width: options.width || this.getDefaultWidth(options.size),
            height: options.height || this.getDefaultHeight(options.size),
            maxWidth: options.maxWidth || this.getDefaultMaxWidth(options.size),
            maxHeight: options.maxHeight || this.getDefaultMaxHeight(options.size),
            minWidth: options.minWidth || this.getDefaultMinWidth(options.size),
            minHeight: options.minHeight || this.getDefaultMinHeight(options.size),
            hasBackdrop: options.hasBackdrop !== false,
            backdropClass: backdropClass,
            panelClass: panelClass,
            disableClose: options.closable === false,
            autoFocus: options.autoFocus !== false,
            restoreFocus: options.restoreFocus !== false,
            closeOnNavigation: true
        };

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
            case 'fullscreen': return '100vh';
            default: return 'auto';
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
            case 'small': return '80vh';
            case 'medium': return '85vh';
            case 'large': return '90vh';
            case 'fullscreen': return '100vh';
            default: return '85vh';
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
            case 'fullscreen': return '100vh';
            default: return 'auto';
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
        const baseClass = 'amw-dialog-backdrop';

        if (type && typeof type === 'string' && type.trim()) {
            const cleanType = this.sanitizeClassName(type);
            if (cleanType) {
                return `${baseClass}-${cleanType}`;
            }
        }

        return baseClass;
    }

    private getPanelClass(type?: DialogType, size?: DialogSize): string {
        const baseClass = 'amw-dialog-panel';

        if (type && typeof type === 'string' && type.trim()) {
            const cleanType = this.sanitizeClassName(type);
            if (cleanType) {
                return `${baseClass}-${cleanType}`;
            }
        }

        if (size && typeof size === 'string' && size.trim()) {
            const cleanSize = this.sanitizeClassName(size);
            if (cleanSize) {
                return `${baseClass}-${cleanSize}`;
            }
        }

        return baseClass;
    }

    private sanitizeClassName(value: string): string {
        if (!value || typeof value !== 'string') return '';

        let sanitized = String(value).trim();
        if (!sanitized) return '';

        sanitized = sanitized.replace(/\s+/g, '-');
        sanitized = sanitized.replace(/[^a-zA-Z0-9-_]/g, '');
        sanitized = sanitized.replace(/-+/g, '-');
        sanitized = sanitized.replace(/^-+|-+$/g, '');
        sanitized = sanitized.replace(/\s/g, '');

        return sanitized || '';
    }
}

/**
 * Helper function to extract the dialog title from MAT_DIALOG_DATA.
 * Use this in your dialog component to access the title passed to DialogService.open()
 *
 * @example
 * ```typescript
 * import { MAT_DIALOG_DATA } from '@angular/material/dialog';
 * import { getAmwDialogTitle } from '@amw/dialog';
 *
 * @Component({ ... })
 * export class MyDialogComponent {
 *   private readonly data = inject(MAT_DIALOG_DATA);
 *   readonly title = getAmwDialogTitle(this.data);
 * }
 * ```
 */
export function getAmwDialogTitle(data: any): string {
    return data?._amwTitle ?? '';
}

/**
 * Type for data objects that include the AMW dialog title.
 * Extend your data interface from this to get type safety.
 *
 * @example
 * ```typescript
 * interface MyDialogData extends AmwDialogData {
 *   userId: number;
 * }
 *
 * @Component({ ... })
 * export class MyDialogComponent {
 *   readonly data = inject<MyDialogData>(MAT_DIALOG_DATA);
 *   readonly title = this.data._amwTitle; // Type-safe access
 * }
 * ```
 */
export interface AmwDialogData {
    _amwTitle?: string;
}
