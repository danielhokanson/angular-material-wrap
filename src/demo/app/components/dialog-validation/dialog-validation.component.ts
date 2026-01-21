import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwDialogService } from '../../../../library/src/components/services/amw-dialog.service';
import { DialogConfig, DialogType, DialogSize } from '../../../../library/src/components/components/amw-dialog/interfaces';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwTextareaComponent } from '../../../../library/src/controls/components/amw-textarea/amw-textarea.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';
@Component({
    selector: 'amw-demo-dialog-validation',
    standalone: true,
    imports: [ReactiveFormsModule,
    AmwButtonComponent,
    AmwInputComponent,
    AmwTextareaComponent,
    AmwSelectComponent,
    AmwCheckboxComponent,
    AmwCardComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dialog-validation.component.html',
    styleUrl: './dialog-validation.component.scss'
})
export class DialogValidationComponent implements OnInit {
    dialogForm: FormGroup;
    lastDialogResult: any = null;

    typeOptions = [
        { value: 'standard', label: 'Standard' },
        { value: 'alert', label: 'Alert' },
        { value: 'confirm', label: 'Confirm' },
        { value: 'prompt', label: 'Prompt' },
        { value: 'info', label: 'Info' },
        { value: 'warning', label: 'Warning' },
        { value: 'error', label: 'Error' },
        { value: 'success', label: 'Success' }
    ];

    sizeOptions = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'fullscreen', label: 'Fullscreen' }
    ];

    constructor(
        private fb: FormBuilder,
        private notification: AmwNotificationService,
        private dialogService: AmwDialogService
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

    /**
     * Opens a dialog using the legacy configuration options.
     * Note: For new code, prefer the signal-based approach with dialogService.open(title, component, config)
     */
    openDialog() {
        if (this.dialogForm.valid) {
            const formValue = this.dialogForm.value;

            // Using openWithOptions for legacy configuration-based dialog testing
            const dialogRef = this.dialogService.openWithOptions({
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
                this.notification.info('Info', `Dialog closed with result: ${result || 'undefined'}`, { duration: 3000 });
            });
        } else {
            this.notification.info('Info', 'Please fill in all required fields', { duration: 3000 });
        }
    }

    onSubmit() {
        if (this.dialogForm.valid) {
            this.openDialog();
        } else {
            this.notification.error('Error', 'Please fix the validation errors', { duration: 3000 });
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
