import { Component, ViewEncapsulation, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { DialogService, AmwDialogRef, getAmwDialogTitle, AmwDialogData } from '../../../../library/src/components/services/dialog.service';
import { DialogType, DialogSize } from '../../../../library/src/components/components/amw-dialog/interfaces';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

@Component({
    selector: 'amw-demo-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        AmwButtonComponent,
        AmwCardComponent,
        AmwIconComponent,
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dialog-demo.component.html',
    styleUrl: './dialog-demo.component.scss'
})
export class DialogDemoComponent {
    // Signal to track saved items from dialog
    savedItems = signal<string[]>([]);
    lastDialogResult = signal<string>('');

    // Legacy dialog variations (for backwards compatibility demo)
    legacyDialogVariations = [
        {
            title: 'Basic Dialog',
            description: 'Simple dialog with title and content',
            dialog: {
                title: 'Basic Dialog',
                content: 'This is a basic dialog with title and content.',
                actions: [{ label: 'Close', action: 'close' }]
            }
        },
        {
            title: 'Confirmation Dialog',
            description: 'Dialog for confirming actions',
            dialog: {
                title: 'Confirm Action',
                content: 'Are you sure you want to perform this action?',
                type: 'confirm' as DialogType,
                actions: [
                    { label: 'Cancel', action: 'cancel', color: 'warn' },
                    { label: 'Confirm', action: 'confirm', color: 'primary' }
                ]
            }
        },
        {
            title: 'Small Dialog',
            description: 'Compact dialog variant',
            dialog: {
                title: 'Small Dialog',
                content: 'This is a small dialog.',
                size: 'small' as DialogSize,
                actions: [{ label: 'Close', action: 'close' }]
            }
        },
        {
            title: 'Large Dialog',
            description: 'Larger dialog variant',
            dialog: {
                title: 'Large Dialog',
                content: 'This is a large dialog with more space for content.',
                size: 'large' as DialogSize,
                actions: [{ label: 'Close', action: 'close' }]
            }
        }
    ];

    constructor(
        private dialogService: DialogService,
        private notification: AmwNotificationService
    ) { }

    // ============================================
    // RECOMMENDED: Signal-based dialog patterns
    // ============================================

    /**
     * Opens an edit dialog using the recommended signal-based pattern.
     * The dialog component exposes signals that we react to via effect().
     */
    openEditDialog() {
        const dialogRef = this.dialogService.open('Edit Item', EditItemDialogComponent, {
            width: '500px',
            data: { itemName: 'Sample Item', itemId: 123 }
        });

        // React to the save signal from the dialog
        const cleanup = effect(() => {
            const savedData = dialogRef.instance.savedData();
            if (savedData) {
                this.savedItems.update(items => [...items, savedData]);
                this.lastDialogResult.set(`Saved: ${savedData}`);
                this.notification.success('Success', `Item saved: ${savedData}`, { duration: 3000 });
                dialogRef.close();
                cleanup.destroy(); // Clean up the effect
            }
        });

        // Also handle cancellation
        dialogRef.afterClosed().subscribe(() => {
            cleanup.destroy();
        });
    }

    /**
     * Opens a confirmation dialog using the recommended signal-based pattern.
     */
    openSignalConfirmDialog() {
        const dialogRef = this.dialogService.open('Confirm Action', ConfirmDialogComponent, {
            width: '400px',
            data: { message: 'Are you sure you want to delete this item?' }
        });

        const cleanup = effect(() => {
            const confirmed = dialogRef.instance.confirmed();
            if (confirmed !== null) {
                if (confirmed) {
                    this.lastDialogResult.set('Action confirmed!');
                    this.notification.success('Success', 'Action confirmed!', { duration: 2000 });
                } else {
                    this.lastDialogResult.set('Action cancelled');
                    this.notification.info('Info', 'Action cancelled', { duration: 2000 });
                }
                dialogRef.close();
                cleanup.destroy();
            }
        });

        dialogRef.afterClosed().subscribe(() => {
            cleanup.destroy();
        });
    }

    /**
     * Opens a form dialog using the recommended signal-based pattern.
     */
    openFormDialog() {
        const dialogRef = this.dialogService.open('Create New Item', FormDialogComponent, {
            width: '600px',
            data: { categories: ['Category A', 'Category B', 'Category C'] }
        });

        const cleanup = effect(() => {
            const formData = dialogRef.instance.submittedData();
            if (formData) {
                this.savedItems.update(items => [...items, `${formData.name} (${formData.category})`]);
                this.lastDialogResult.set(`Created: ${formData.name}`);
                this.notification.success('Success', `Created: ${formData.name}`, { duration: 3000 });
                dialogRef.close();
                cleanup.destroy();
            }
        });

        dialogRef.afterClosed().subscribe(() => {
            cleanup.destroy();
        });
    }

    // Clear saved items list
    clearSavedItems() {
        this.savedItems.set([]);
        this.lastDialogResult.set('');
    }

    // ============================================
    // LEGACY: Deprecated service methods
    // ============================================

    openLegacyDialog(variation: any) {
        const dialogRef = this.dialogService.openWithOptions({
            title: variation.dialog.title,
            content: variation.dialog.content,
            type: variation.dialog.type,
            size: variation.dialog.size,
            actions: variation.dialog.actions,
        });

        dialogRef.afterClosed().subscribe(result => {
            this.notification.info('Info', `Dialog closed with result: ${result || 'undefined'}`, { duration: 3000 });
        });
    }

    openLegacyAlert() {
        this.dialogService.alert('This is an alert message!', 'Alert');
    }

    openLegacyConfirm() {
        this.dialogService.confirm('Are you sure you want to proceed?', 'Confirm').subscribe(result => {
            if (result === 'confirm') {
                this.notification.info('Info', 'Confirmed!', { duration: 2000 });
            } else {
                this.notification.info('Info', 'Cancelled', { duration: 2000 });
            }
        });
    }
}

// ============================================
// RECOMMENDED: Example Dialog Components with Signals
// ============================================

/**
 * Edit Item Dialog - demonstrates signal-based communication
 */
@Component({
    selector: 'edit-item-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule, MatDialogModule, AmwButtonComponent, AmwIconComponent],
    template: `
        <div class="amw-dialog-demo">
            <h2 mat-dialog-title>
                <amw-icon name="edit" color="primary"></amw-icon>
                {{ title }}
            </h2>
            <mat-dialog-content>
                <p>Editing item: <strong>{{ data.itemName }}</strong> (ID: {{ data.itemId }})</p>
                <div class="form-field">
                    <label>New Name:</label>
                    <input type="text" [(ngModel)]="editedName" placeholder="Enter new name">
                </div>
            </mat-dialog-content>
            <mat-dialog-actions align="end">
                <amw-button appearance="text" (click)="cancel()">Cancel</amw-button>
                <amw-button appearance="elevated" color="primary" (click)="save()" [disabled]="!editedName">
                    Save Changes
                </amw-button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [`
        .amw-dialog-demo { padding: 8px; }
        .amw-dialog-demo h2 { display: flex; align-items: center; gap: 8px; margin: 0 0 16px 0; }
        .form-field { margin: 16px 0; }
        .form-field label { display: block; margin-bottom: 8px; font-weight: 500; }
        .form-field input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; }
        mat-dialog-actions { padding: 16px 0 0 0; }
    `]
})
export class EditItemDialogComponent {
    readonly data = inject<{ itemName: string; itemId: number } & AmwDialogData>(MAT_DIALOG_DATA);
    readonly title = getAmwDialogTitle(this.data);

    editedName = '';

    // Signal for communicating save events to parent
    readonly savedData = signal<string | null>(null);

    constructor() {
        this.editedName = this.data.itemName;
    }

    save() {
        // Setting the signal triggers the effect in the parent
        this.savedData.set(this.editedName);
    }

    cancel() {
        // Parent will handle closing via afterClosed()
        this.savedData.set(null);
    }
}

/**
 * Confirm Dialog - demonstrates signal-based confirmation
 */
@Component({
    selector: 'confirm-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, AmwButtonComponent, AmwIconComponent],
    template: `
        <div class="amw-dialog-demo">
            <h2 mat-dialog-title>
                <amw-icon name="help_outline" color="accent"></amw-icon>
                {{ title }}
            </h2>
            <mat-dialog-content>
                <p>{{ data.message }}</p>
            </mat-dialog-content>
            <mat-dialog-actions align="end">
                <amw-button appearance="text" (click)="onCancel()">Cancel</amw-button>
                <amw-button appearance="elevated" color="warn" (click)="onConfirm()">
                    Confirm
                </amw-button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [`
        .amw-dialog-demo { padding: 8px; }
        .amw-dialog-demo h2 { display: flex; align-items: center; gap: 8px; margin: 0 0 16px 0; }
        mat-dialog-actions { padding: 16px 0 0 0; }
    `]
})
export class ConfirmDialogComponent {
    readonly data = inject<{ message: string } & AmwDialogData>(MAT_DIALOG_DATA);
    readonly title = getAmwDialogTitle(this.data);

    // Signal: null = no decision, true = confirmed, false = cancelled
    readonly confirmed = signal<boolean | null>(null);

    onConfirm() {
        this.confirmed.set(true);
    }

    onCancel() {
        this.confirmed.set(false);
    }
}

/**
 * Form Dialog - demonstrates signal-based form submission
 */
@Component({
    selector: 'form-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule, MatDialogModule, AmwButtonComponent, AmwIconComponent],
    template: `
        <div class="amw-dialog-demo">
            <h2 mat-dialog-title>
                <amw-icon name="add_circle" color="primary"></amw-icon>
                {{ title }}
            </h2>
            <mat-dialog-content>
                <div class="form-field">
                    <label>Item Name:</label>
                    <input type="text" [(ngModel)]="formData.name" placeholder="Enter item name">
                </div>
                <div class="form-field">
                    <label>Description:</label>
                    <textarea [(ngModel)]="formData.description" placeholder="Enter description" rows="3"></textarea>
                </div>
                <div class="form-field">
                    <label>Category:</label>
                    <select [(ngModel)]="formData.category">
                        <option value="">Select a category</option>
                        @for (cat of data.categories; track cat) {
                            <option [value]="cat">{{ cat }}</option>
                        }
                    </select>
                </div>
            </mat-dialog-content>
            <mat-dialog-actions align="end">
                <amw-button appearance="text" (click)="cancel()">Cancel</amw-button>
                <amw-button appearance="elevated" color="primary" (click)="submit()" [disabled]="!isValid()">
                    Create Item
                </amw-button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [`
        .amw-dialog-demo { padding: 8px; }
        .amw-dialog-demo h2 { display: flex; align-items: center; gap: 8px; margin: 0 0 16px 0; }
        .form-field { margin: 16px 0; }
        .form-field label { display: block; margin-bottom: 8px; font-weight: 500; }
        .form-field input, .form-field textarea, .form-field select {
            width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;
            font-family: inherit;
        }
        mat-dialog-actions { padding: 16px 0 0 0; }
    `]
})
export class FormDialogComponent {
    readonly data = inject<{ categories: string[] } & AmwDialogData>(MAT_DIALOG_DATA);
    readonly title = getAmwDialogTitle(this.data);

    formData = {
        name: '',
        description: '',
        category: ''
    };

    // Signal for communicating form submission to parent
    readonly submittedData = signal<{ name: string; description: string; category: string } | null>(null);

    isValid(): boolean {
        return !!this.formData.name && !!this.formData.category;
    }

    submit() {
        if (this.isValid()) {
            this.submittedData.set({ ...this.formData });
        }
    }

    cancel() {
        this.submittedData.set(null);
    }
}
