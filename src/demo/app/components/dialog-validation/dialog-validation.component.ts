import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogService } from '../../../../library/src/components/services/dialog.service';
import { DialogConfig, DialogType, DialogSize } from '../../../../library/src/components/components/amw-dialog/interfaces';

@Component({
    selector: 'amw-demo-dialog-validation',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dialog-validation.component.html',
    styleUrl: './dialog-validation.component.scss'
})
export class DialogValidationComponent implements OnInit {
    dialogForm: FormGroup;
    lastDialogResult: any = null;

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private dialogService: DialogService
    ) {
        this.dialogForm = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            type: ['standard', Validators.required],
            size: ['medium', Validators.required],
            showCloseButton: [true],
            showHeader: [true],
            showFooter: [true],
            closable: [true],
            loading: [false],
            disabled: [false]
        });
    }

    ngOnInit() {
        // Set initial values
        this.dialogForm.patchValue({
            title: 'Sample Dialog',
            content: 'This is a sample dialog for validation testing.'
        });
    }

    openDialog() {
        if (this.dialogForm.valid) {
            const formValue = this.dialogForm.value;

            const dialogRef = this.dialogService.open({
                title: formValue.title,
                content: formValue.content,
                type: formValue.type,
                size: formValue.size,
                showCloseButton: formValue.showCloseButton,
                showHeader: formValue.showHeader,
                showFooter: formValue.showFooter,
                closable: formValue.closable,
                loading: formValue.loading,
                disabled: formValue.disabled,
                actions: [
                    { label: 'Cancel', action: 'cancel', color: 'warn' },
                    { label: 'Confirm', action: 'confirm', color: 'primary' }
                ]
            });

            dialogRef.afterClosed().subscribe(result => {
                this.lastDialogResult = result;
                this.snackBar.open(`Dialog closed with result: ${result || 'undefined'}`, 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            });
        } else {
            this.snackBar.open('Please fill in all required fields', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }
    }

    onSubmit() {
        if (this.dialogForm.valid) {
            this.openDialog();
        } else {
            this.snackBar.open('Please fix the validation errors', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }
    }

    onReset() {
        this.dialogForm.reset();
        this.lastDialogResult = null;
        this.dialogForm.patchValue({
            title: 'Sample Dialog',
            content: 'This is a sample dialog for validation testing.',
            type: 'standard',
            size: 'medium',
            showCloseButton: true,
            showHeader: true,
            showFooter: true,
            closable: true,
            loading: false,
            disabled: false
        });
    }

}
