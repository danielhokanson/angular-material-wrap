import { Component, ViewEncapsulation } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'amw-demo-dialog-api',
    standalone: true,
    imports: [
    MatCardModule,
    MatTableModule
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dialog-api.component.html',
    styleUrl: './dialog-api.component.scss'
})
export class DialogApiComponent {
    apiDocumentation = {
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
            { name: 'open()', type: 'void', description: 'Opens the dialog' },
            { name: 'close(result?: any)', type: 'void', description: 'Closes the dialog with optional result' },
            { name: 'onActionClick(action: any, index: number)', type: 'void', description: 'Handles action button clicks' },
            { name: 'onCloseClick()', type: 'void', description: 'Handles close button clicks' }
        ],
        serviceMethods: [
            { name: 'alert(message: string, title?: string)', type: 'MatDialogRef<any>', description: 'Opens an alert dialog' },
            { name: 'confirm(message: string, title?: string)', type: 'Observable<any>', description: 'Opens a confirmation dialog and returns observable' },
            { name: 'prompt(message: string, title?: string, defaultValue?: string)', type: 'Observable<any>', description: 'Opens a prompt dialog and returns observable' },
            { name: 'info(message: string, title?: string)', type: 'MatDialogRef<any>', description: 'Opens an info dialog' },
            { name: 'warning(message: string, title?: string)', type: 'Observable<any>', description: 'Opens a warning dialog and returns observable' },
            { name: 'error(message: string, title?: string)', type: 'MatDialogRef<any>', description: 'Opens an error dialog' },
            { name: 'success(message: string, title?: string)', type: 'MatDialogRef<any>', description: 'Opens a success dialog' },
            { name: 'loading(message?: string, title?: string)', type: 'MatDialogRef<any>', description: 'Opens a loading dialog' },
            { name: 'openComponent<T>(component: Type<T>, config?: MatDialogConfig)', type: 'MatDialogRef<T>', description: 'Opens a custom component dialog' },
            { name: 'closeAll()', type: 'void', description: 'Closes all open dialogs' },
            { name: 'getOpenDialogs()', type: 'MatDialogRef<any>[]', description: 'Gets all currently open dialogs' },
            { name: 'hasOpenDialogs()', type: 'boolean', description: 'Checks if any dialogs are open' }
        ],
        interfaces: [
            {
                name: 'DialogConfig',
                description: 'Configuration options for the dialog',
                properties: [
                    { name: 'width', type: 'string', description: 'Width of the dialog' },
                    { name: 'height', type: 'string', description: 'Height of the dialog' },
                    { name: 'maxWidth', type: 'string', description: 'Maximum width of the dialog' },
                    { name: 'maxHeight', type: 'string', description: 'Maximum height of the dialog' },
                    { name: 'minWidth', type: 'string', description: 'Minimum width of the dialog' },
                    { name: 'minHeight', type: 'string', description: 'Minimum height of the dialog' },
                    { name: 'position', type: '{ top?: string; bottom?: string; left?: string; right?: string }', description: 'Position of the dialog' },
                    { name: 'hasBackdrop', type: 'boolean', description: 'Whether the dialog has a backdrop' },
                    { name: 'backdropClass', type: 'string', description: 'CSS class for the backdrop' },
                    { name: 'panelClass', type: 'string', description: 'CSS class for the dialog panel' },
                    { name: 'disableClose', type: 'boolean', description: 'Whether to disable closing the dialog' },
                    { name: 'autoFocus', type: 'boolean', description: 'Whether to auto-focus the dialog' },
                    { name: 'restoreFocus', type: 'boolean', description: 'Whether to restore focus after closing' },
                    { name: 'closeOnNavigation', type: 'boolean', description: 'Whether to close on navigation' },
                    { name: 'autoOpen', type: 'boolean', description: 'Whether to auto-open the dialog' },
                    { name: 'data', type: 'any', description: 'Data to pass to the dialog' }
                ]
            },
            {
                name: 'DialogType',
                description: 'Type variants for the dialog',
                properties: [
                    { name: 'standard', type: 'string', description: 'Standard dialog (default)' },
                    { name: 'alert', type: 'string', description: 'Alert dialog' },
                    { name: 'confirm', type: 'string', description: 'Confirmation dialog' },
                    { name: 'prompt', type: 'string', description: 'Prompt dialog' },
                    { name: 'info', type: 'string', description: 'Information dialog' },
                    { name: 'warning', type: 'string', description: 'Warning dialog' },
                    { name: 'error', type: 'string', description: 'Error dialog' },
                    { name: 'success', type: 'string', description: 'Success dialog' }
                ]
            },
            {
                name: 'DialogSize',
                description: 'Size variants for the dialog',
                properties: [
                    { name: 'small', type: 'string', description: 'Small dialog (300x200px)' },
                    { name: 'medium', type: 'string', description: 'Medium dialog (500x400px)' },
                    { name: 'large', type: 'string', description: 'Large dialog (800x600px)' },
                    { name: 'fullscreen', type: 'string', description: 'Fullscreen dialog (100vw x 100vh)' }
                ]
            },
            {
                name: 'DialogPosition',
                description: 'Position variants for the dialog',
                properties: [
                    { name: 'center', type: 'string', description: 'Center position (default)' },
                    { name: 'top', type: 'string', description: 'Top position' },
                    { name: 'bottom', type: 'string', description: 'Bottom position' },
                    { name: 'left', type: 'string', description: 'Left position' },
                    { name: 'right', type: 'string', description: 'Right position' }
                ]
            }
        ]
    };

    getDisplayedColumns(section: string): any[] {
        const data = this.apiDocumentation[section as keyof typeof this.apiDocumentation];
        return Array.isArray(data) ? data : [];
    }

    /** API interfaces - computed property */
    get interfacesList() {
        return this.apiDocumentation.interfaces;
    }
}
