import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BaseCodeComponent } from '../base/base-code.component';

type DialogExamples = 'basic' | 'confirmation' | 'alert' | 'customActions';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
@Component({
    selector: 'amw-demo-dialog-code',
    standalone: true,
    imports: [FormsModule,
    MatDialogModule,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dialog-code.component.html',
    styleUrl: './dialog-code.component.scss'
})
export class DialogCodeComponent extends BaseCodeComponent<DialogExamples> {
    // Original code examples (for reset functionality)
    readonly codeExamples: Record<DialogExamples, string> = {
        basic: `<amw-button variant="elevated" (click)="openDialog()">Open Dialog</amw-button>`,

        confirmation: `<amw-button variant="elevated" color="warn" (click)="openConfirmDialog()">
  Delete Item
</amw-button>`,

        alert: `<amw-button variant="elevated" (click)="openAlertDialog()">
  Show Alert
</amw-button>`,

        customActions: `<amw-button variant="elevated" color="primary" (click)="openFormDialog()">
  Open Form Dialog
</amw-button>`
    };

    constructor(public dialog: MatDialog) {
        super();
    }

    // Dialog methods
    openDialog() {
        const dialogRef = this.dialog.open(SimpleDialogComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog closed with result:', result);
        });
    }

    openConfirmDialog() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Confirmed!');
            }
        });
    }

    openAlertDialog() {
        this.dialog.open(AlertDialogComponent, {
            width: '350px'
        });
    }

    openFormDialog() {
        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('Form data:', result);
        });
    }
}

// Simple Dialog Component
@Component({
    selector: 'simple-dialog',
    standalone: true,
    imports: [
    FormsModule,
    MatDialogModule,
    AmwButtonComponent,
    AmwIconComponent
],
    template: `
        <h2 mat-dialog-title>Simple Dialog</h2>
        <mat-dialog-content>
            <p>This is a basic dialog with title and content.</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <amw-button variant="text" mat-dialog-close>Cancel</amw-button>
            <amw-button variant="text" mat-dialog-close="confirmed" cdkFocusInitial>OK</amw-button>
        </mat-dialog-actions>
    `
})
export class SimpleDialogComponent {}

// Confirm Dialog Component
@Component({
    selector: 'confirm-dialog',
    standalone: true,
    imports: [
    FormsModule,
    MatDialogModule,
    AmwButtonComponent,
    AmwIconComponent
],
    template: `
        <h2 mat-dialog-title>Confirm Delete</h2>
        <mat-dialog-content>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <amw-button variant="text" mat-dialog-close>Cancel</amw-button>
            <amw-button variant="text" color="warn" [mat-dialog-close]="true" cdkFocusInitial>Delete</amw-button>
        </mat-dialog-actions>
    `
})
export class ConfirmDialogComponent {}

// Alert Dialog Component
@Component({
    selector: 'alert-dialog',
    standalone: true,
    imports: [
    FormsModule,
    MatDialogModule,
    AmwButtonComponent,
    AmwIconComponent
],
    template: `
        <h2 mat-dialog-title>
            <amw-icon name="warning" color="warn"></amw-icon>
            Alert
        </h2>
        <mat-dialog-content>
            <p>This is an important alert message that requires your attention.</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <amw-button variant="elevated" color="primary" mat-dialog-close cdkFocusInitial>OK</amw-button>
        </mat-dialog-actions>
    `
})
export class AlertDialogComponent {}

// Form Dialog Component
@Component({
    selector: 'form-dialog',
    standalone: true,
    imports: [
    FormsModule,
    MatDialogModule,
    AmwButtonComponent,
    AmwIconComponent
],
    template: `
        <h2 mat-dialog-title>Form Dialog</h2>
        <mat-dialog-content>
            <p>This dialog demonstrates custom actions and form handling.</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <amw-button variant="text" mat-dialog-close>Cancel</amw-button>
            <amw-button variant="text" color="accent" [mat-dialog-close]="{action: 'save'}">Save</amw-button>
            <amw-button variant="elevated" color="primary" [mat-dialog-close]="{action: 'saveClose'}" cdkFocusInitial>
                Save & Close
            </amw-button>
        </mat-dialog-actions>
    `
})
export class FormDialogComponent {}
