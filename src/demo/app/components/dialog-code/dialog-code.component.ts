import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'amw-demo-dialog-code',
    standalone: true,
    imports: [
        FormsModule,
        MatExpansionModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dialog-code.component.html',
    styleUrl: './dialog-code.component.scss'
})
export class DialogCodeComponent {
    // Editable code examples
    editableCode = {
        basic: '',
        confirmation: '',
        alert: '',
        customActions: ''
    };

    // Original code examples (for reset functionality)
    readonly codeExamples = {
        basic: `<button mat-raised-button (click)="openDialog()">Open Dialog</button>`,

        confirmation: `<button mat-raised-button color="warn" (click)="openConfirmDialog()">
  Delete Item
</button>`,

        alert: `<button mat-raised-button (click)="openAlertDialog()">
  Show Alert
</button>`,

        customActions: `<button mat-raised-button color="primary" (click)="openFormDialog()">
  Open Form Dialog
</button>`
    };

    constructor(public dialog: MatDialog) {
        // Initialize editable code
        Object.keys(this.codeExamples).forEach(key => {
            this.editableCode[key as keyof typeof this.codeExamples] =
                this.codeExamples[key as keyof typeof this.codeExamples];
        });
    }

    // Reset code to original
    resetCode(exampleKey: keyof typeof this.codeExamples) {
        this.editableCode[exampleKey] = this.codeExamples[exampleKey];
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
    imports: [MatDialogModule, MatButtonModule],
    template: `
        <h2 mat-dialog-title>Simple Dialog</h2>
        <mat-dialog-content>
            <p>This is a basic dialog with title and content.</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>Cancel</button>
            <button mat-button mat-dialog-close="confirmed" cdkFocusInitial>OK</button>
        </mat-dialog-actions>
    `
})
export class SimpleDialogComponent {}

// Confirm Dialog Component
@Component({
    selector: 'confirm-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
    template: `
        <h2 mat-dialog-title>Confirm Delete</h2>
        <mat-dialog-content>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>Cancel</button>
            <button mat-button color="warn" [mat-dialog-close]="true" cdkFocusInitial>Delete</button>
        </mat-dialog-actions>
    `
})
export class ConfirmDialogComponent {}

// Alert Dialog Component
@Component({
    selector: 'alert-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatIconModule],
    template: `
        <h2 mat-dialog-title>
            <mat-icon color="warn">warning</mat-icon>
            Alert
        </h2>
        <mat-dialog-content>
            <p>This is an important alert message that requires your attention.</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-raised-button color="primary" mat-dialog-close cdkFocusInitial>OK</button>
        </mat-dialog-actions>
    `
})
export class AlertDialogComponent {}

// Form Dialog Component
@Component({
    selector: 'form-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
    template: `
        <h2 mat-dialog-title>Form Dialog</h2>
        <mat-dialog-content>
            <p>This dialog demonstrates custom actions and form handling.</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>Cancel</button>
            <button mat-button color="accent" [mat-dialog-close]="{action: 'save'}">Save</button>
            <button mat-raised-button color="primary" [mat-dialog-close]="{action: 'saveClose'}" cdkFocusInitial>
                Save & Close
            </button>
        </mat-dialog-actions>
    `
})
export class FormDialogComponent {}
