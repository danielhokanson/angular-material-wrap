import { Component, ViewEncapsulation } from '@angular/core';

import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';

@Component({
    selector: 'amw-demo-dialog-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dialog-api.component.html',
    styleUrl: './dialog-api.component.scss'
})
export class DialogApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        usageNotes: [
            '✅ **Recommended Pattern**: Use `dialogService.open(title, component, config)` with signal-based communication',
            'The dialog component should expose signals (e.g., `savedItem = signal<Item | null>(null)`) that the parent can react to via `effect()`',
            'Use `getAmwDialogTitle(data)` in your dialog component to access the title',
            'Use `inject(MAT_DIALOG_DATA)` to access the data passed via config.data',
            '⚠️ Legacy methods (alert, confirm, etc.) are deprecated and will show console warnings',
            'For simple confirmations, create a reusable ConfirmDialogComponent and use signals'
        ],
        inputs: [
            { name: 'config', type: 'DialogConfig', default: '{}', description: 'Configuration object for the dialog' },
            { name: 'type', type: 'DialogType', default: "'standard'", description: 'Type of dialog (standard, alert, confirm, etc.)' },
            { name: 'size', type: 'DialogSize', default: "'medium'", description: 'Size variant of the dialog' },
            { name: 'position', type: 'DialogPosition', default: "'center'", description: 'Position of the dialog on screen' },
            { name: 'title', type: 'string', default: "''", description: 'Title text for the dialog header' },
            { name: 'content', type: 'string', default: "''", description: 'Text content for the dialog body' },
            { name: 'actions', type: 'Array<{label: string; icon?: string; color?: string; disabled?: boolean; action?: string}>', default: '[]', description: 'Action buttons for the dialog' },
            { name: 'showCloseButton', type: 'boolean', default: 'true', description: 'Whether to show the close button' },
            { name: 'showHeader', type: 'boolean', default: 'true', description: 'Whether to show the header' },
            { name: 'showFooter', type: 'boolean', default: 'true', description: 'Whether to show the footer' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Whether the dialog is in loading state' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the dialog is disabled' },
            { name: 'closable', type: 'boolean', default: 'true', description: 'Whether the dialog can be closed' },
            { name: 'backdrop', type: 'boolean', default: 'true', description: 'Whether to show backdrop' },
            { name: 'escapeKeyClose', type: 'boolean', default: 'true', description: 'Whether ESC key closes the dialog' },
            { name: 'clickOutsideClose', type: 'boolean', default: 'true', description: 'Whether clicking outside closes the dialog' },
            { name: 'maxWidth', type: 'string', default: "''", description: 'Maximum width of the dialog' },
            { name: 'maxHeight', type: 'string', default: "''", description: 'Maximum height of the dialog' },
            { name: 'minWidth', type: 'string', default: "''", description: 'Minimum width of the dialog' },
            { name: 'minHeight', type: 'string', default: "''", description: 'Minimum height of the dialog' },
            { name: 'width', type: 'string', default: "''", description: 'Width of the dialog' },
            { name: 'height', type: 'string', default: "''", description: 'Height of the dialog' },
            { name: 'autoFocus', type: 'boolean', default: 'true', description: 'Whether to auto-focus the dialog' },
            { name: 'restoreFocus', type: 'boolean', default: 'true', description: 'Whether to restore focus after closing' },
            { name: 'hasBackdrop', type: 'boolean', default: 'true', description: 'Whether the dialog has a backdrop' },
            { name: 'backdropClass', type: 'string', default: "''", description: 'CSS class for the backdrop' },
            { name: 'panelClass', type: 'string', default: "''", description: 'CSS class for the dialog panel' }
        ],
        outputs: [
            { name: 'dialogOpen', type: 'EventEmitter<void>', description: 'Emitted when the dialog opens' },
            { name: 'dialogClose', type: 'EventEmitter<any>', description: 'Emitted when the dialog closes' },
            { name: 'dialogAfterOpen', type: 'EventEmitter<void>', description: 'Emitted after the dialog has opened' },
            { name: 'dialogAfterClose', type: 'EventEmitter<any>', description: 'Emitted after the dialog has closed' },
            { name: 'actionClick', type: 'EventEmitter<{action: any; index: number}>', description: 'Emitted when an action button is clicked' },
            { name: 'closeClick', type: 'EventEmitter<void>', description: 'Emitted when the close button is clicked' }
        ],
        methods: [
            { name: 'open()', returns: 'void', description: 'Opens the dialog' },
            { name: 'close(result?: any)', returns: 'void', description: 'Closes the dialog with optional result' },
            { name: 'onActionClick(action: any, index: number)', returns: 'void', description: 'Handles action button clicks' },
            { name: 'onCloseClick()', returns: 'void', description: 'Handles close button clicks' }
        ]
    };

    /** Recommended service methods */
    serviceMethods = [
            { name: 'open<T>(title: string, component: Type<T>, config?: AmwDialogConfig)', returns: 'AmwDialogRef<T>', description: '✅ RECOMMENDED: Opens a dialog with a custom component. Returns typed AmwDialogRef for signal-based communication.' },
            { name: 'closeAll()', returns: 'void', description: 'Closes all open dialogs' },
            { name: 'getOpenDialogs()', returns: 'MatDialogRef<any>[]', description: 'Gets all currently open dialogs' },
            { name: 'hasOpenDialogs()', returns: 'boolean', description: 'Checks if any dialogs are open' }
    ];

    /** Legacy service methods (deprecated) */
    legacyServiceMethods = [
            { name: 'alert(message: string, title?: string)', returns: 'MatDialogRef<any>', description: '⚠️ DEPRECATED: Opens an alert dialog. Use open() with a custom component instead.' },
            { name: 'confirm(message: string, title?: string)', returns: 'Observable<any>', description: '⚠️ DEPRECATED: Opens a confirmation dialog. Use open() with signals instead.' },
            { name: 'prompt(message: string, title?: string, defaultValue?: string)', returns: 'Observable<any>', description: '⚠️ DEPRECATED: Opens a prompt dialog. Use open() with a custom component instead.' },
            { name: 'info(message: string, title?: string)', returns: 'MatDialogRef<any>', description: '⚠️ DEPRECATED: Opens an info dialog. Use open() with a custom component instead.' },
            { name: 'warning(message: string, title?: string)', returns: 'Observable<any>', description: '⚠️ DEPRECATED: Opens a warning dialog. Use open() with signals instead.' },
            { name: 'error(message: string, title?: string)', returns: 'MatDialogRef<any>', description: '⚠️ DEPRECATED: Opens an error dialog. Use open() with a custom component instead.' },
            { name: 'success(message: string, title?: string)', returns: 'MatDialogRef<any>', description: '⚠️ DEPRECATED: Opens a success dialog. Use open() with a custom component instead.' },
            { name: 'loading(message?: string, title?: string)', returns: 'MatDialogRef<any>', description: '⚠️ DEPRECATED: Opens a loading dialog. Use open() with a custom component instead.' },
            { name: 'openComponent<T>(component: Type<T>, config?: MatDialogConfig)', returns: 'MatDialogRef<T>', description: '⚠️ DEPRECATED: Opens a custom component dialog. Use open() instead.' },
            { name: 'openWithOptions(options: DialogOptions)', returns: 'MatDialogRef<any>', description: '⚠️ DEPRECATED: Opens a dialog with legacy options. Use open() instead.' }
    ];

    interfaces = [
            {
                name: 'AmwDialogConfig',
                description: '✅ RECOMMENDED: Configuration options for the new open() method',
                properties: [
                    { name: 'width', returns: 'string', description: 'Width of the dialog (default: 500px)' },
                    { name: 'height', returns: 'string', description: 'Height of the dialog' },
                    { name: 'maxWidth', returns: 'string', description: 'Maximum width of the dialog (default: 90vw)' },
                    { name: 'maxHeight', returns: 'string', description: 'Maximum height of the dialog (default: 90vh)' },
                    { name: 'minWidth', returns: 'string', description: 'Minimum width of the dialog' },
                    { name: 'minHeight', returns: 'string', description: 'Minimum height of the dialog' },
                    { name: 'position', returns: '{ top?: string; bottom?: string; left?: string; right?: string }', description: 'Position of the dialog' },
                    { name: 'hasBackdrop', returns: 'boolean', description: 'Whether the dialog has a backdrop (default: true)' },
                    { name: 'backdropClass', returns: 'string | string[]', description: 'CSS class for the backdrop' },
                    { name: 'panelClass', returns: 'string | string[]', description: 'CSS class for the dialog panel' },
                    { name: 'disableClose', returns: 'boolean', description: 'Whether clicking outside or ESC closes the dialog (default: false)' },
                    { name: 'autoFocus', returns: "boolean | 'first-tabbable' | 'first-heading' | 'dialog'", description: 'Auto-focus strategy (default: first-tabbable)' },
                    { name: 'restoreFocus', returns: 'boolean', description: 'Whether to restore focus after closing (default: true)' },
                    { name: 'data', returns: 'D', description: 'Custom data passed to component via MAT_DIALOG_DATA' }
                ]
            },
            {
                name: 'AmwDialogRef<T, R>',
                description: '✅ RECOMMENDED: Modern dialog reference with typed component access',
                properties: [
                    { name: 'instance', returns: 'T', description: 'The component instance - use to access signals and methods' },
                    { name: 'close(result?: R)', returns: 'void', description: 'Closes the dialog with optional result' },
                    { name: 'afterClosed()', returns: 'Observable<R | undefined>', description: 'Observable that emits when dialog closes' },
                    { name: 'afterOpened()', returns: 'Observable<void>', description: 'Observable that emits when dialog opens' },
                    { name: 'updatePosition(position)', returns: 'this', description: 'Updates dialog position' },
                    { name: 'updateSize(width, height)', returns: 'this', description: 'Updates dialog size' },
                    { name: 'addPanelClass(classes)', returns: 'this', description: 'Adds CSS class to panel' },
                    { name: 'removePanelClass(classes)', returns: 'this', description: 'Removes CSS class from panel' }
                ]
            },
            {
                name: 'getAmwDialogTitle(data)',
                description: 'Helper function to extract the dialog title from MAT_DIALOG_DATA',
                properties: [
                    { name: 'data', returns: 'any', description: 'The MAT_DIALOG_DATA object injected in your component' },
                    { name: 'returns', returns: 'string', description: 'The title passed to dialogService.open()' }
                ]
            },
            {
                name: 'AmwDialogData',
                description: 'Interface to extend your dialog data type for type-safe title access',
                properties: [
                    { name: '_amwTitle', returns: 'string | undefined', description: 'The dialog title (automatically included by DialogService.open())' }
                ]
            },
            {
                name: 'DialogConfig',
                description: '⚠️ LEGACY: Configuration options for the dialog (use AmwDialogConfig instead)',
                properties: [
                    { name: 'width', returns: 'string', description: 'Width of the dialog' },
                    { name: 'height', returns: 'string', description: 'Height of the dialog' },
                    { name: 'maxWidth', returns: 'string', description: 'Maximum width of the dialog' },
                    { name: 'maxHeight', returns: 'string', description: 'Maximum height of the dialog' },
                    { name: 'minWidth', returns: 'string', description: 'Minimum width of the dialog' },
                    { name: 'minHeight', returns: 'string', description: 'Minimum height of the dialog' },
                    { name: 'position', returns: '{ top?: string; bottom?: string; left?: string; right?: string }', description: 'Position of the dialog' },
                    { name: 'hasBackdrop', returns: 'boolean', description: 'Whether the dialog has a backdrop' },
                    { name: 'backdropClass', returns: 'string', description: 'CSS class for the backdrop' },
                    { name: 'panelClass', returns: 'string', description: 'CSS class for the dialog panel' },
                    { name: 'disableClose', returns: 'boolean', description: 'Whether to disable closing the dialog' },
                    { name: 'autoFocus', returns: 'boolean', description: 'Whether to auto-focus the dialog' },
                    { name: 'restoreFocus', returns: 'boolean', description: 'Whether to restore focus after closing' },
                    { name: 'closeOnNavigation', returns: 'boolean', description: 'Whether to close on navigation' },
                    { name: 'autoOpen', returns: 'boolean', description: 'Whether to auto-open the dialog' },
                    { name: 'data', returns: 'any', description: 'Data to pass to the dialog' }
                ]
            },
            {
                name: 'DialogType',
                description: 'Type variants for the dialog',
                properties: [
                    { name: 'standard', returns: 'string', description: 'Standard dialog (default)' },
                    { name: 'alert', returns: 'string', description: 'Alert dialog' },
                    { name: 'confirm', returns: 'string', description: 'Confirmation dialog' },
                    { name: 'prompt', returns: 'string', description: 'Prompt dialog' },
                    { name: 'info', returns: 'string', description: 'Information dialog' },
                    { name: 'warning', returns: 'string', description: 'Warning dialog' },
                    { name: 'error', returns: 'string', description: 'Error dialog' },
                    { name: 'success', returns: 'string', description: 'Success dialog' }
                ]
            },
            {
                name: 'DialogSize',
                description: 'Size variants for the dialog',
                properties: [
                    { name: 'small', returns: 'string', description: 'Small dialog (300x200px)' },
                    { name: 'medium', returns: 'string', description: 'Medium dialog (500x400px)' },
                    { name: 'large', returns: 'string', description: 'Large dialog (800x600px)' },
                    { name: 'fullscreen', returns: 'string', description: 'Fullscreen dialog (100vw x 100vh)' }
                ]
            },
            {
                name: 'DialogPosition',
                description: 'Position variants for the dialog',
                properties: [
                    { name: 'center', returns: 'string', description: 'Center position (default)' },
                    { name: 'top', returns: 'string', description: 'Top position' },
                    { name: 'bottom', returns: 'string', description: 'Bottom position' },
                    { name: 'left', returns: 'string', description: 'Left position' },
                    { name: 'right', returns: 'string', description: 'Right position' }
                ]
            }
    ];

    getDisplayedColumns(section: string): any[] {
        const data = this.apiDocumentation[section as keyof typeof this.apiDocumentation];
        return Array.isArray(data) ? data : [];
    }

    /** API interfaces - computed property */
    get interfacesList() {
        return this.interfaces;
    }

    constructor() {
        super();
    }
}