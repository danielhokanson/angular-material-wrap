import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogService } from '../../../../library/src/components/services/dialog.service';
import { DialogType, DialogSize, DialogPosition } from '../../../../library/src/components/components/amw-dialog/interfaces';

@Component({
    selector: 'amw-demo-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dialog-demo.component.html',
    styleUrl: './dialog-demo.component.scss'
})
export class DialogDemoComponent {
    dialogVariations = [
        {
            title: 'Basic Dialog',
            description: 'Simple dialog with title and content',
            dialog: {
                title: 'Basic Dialog',
                content: 'This is a basic dialog with title and content.',
                actions: [
                    { label: 'Close', action: 'close' }
                ]
            }
        },
        {
            title: 'Confirmation Dialog',
            description: 'Dialog for confirming actions',
            dialog: {
                title: 'Confirm Action',
                content: 'Are you sure you want to perform this action? This cannot be undone.',
                type: 'confirm' as DialogType,
                actions: [
                    { label: 'Cancel', action: 'cancel', color: 'warn' },
                    { label: 'Confirm', action: 'confirm', color: 'primary' }
                ]
            }
        },
        {
            title: 'Alert Dialog',
            description: 'Dialog for displaying alerts',
            dialog: {
                title: 'Alert',
                content: 'This is an important alert message that requires your attention.',
                type: 'alert' as DialogType,
                actions: [
                    { label: 'OK', action: 'close', color: 'primary' }
                ]
            }
        },
        {
            title: 'Info Dialog',
            description: 'Dialog for displaying information with HTML formatting',
            dialog: {
                title: 'Information',
                content: 'Here is some helpful information about the current process.<br><br><em>This text includes <strong>HTML formatting</strong> and <u>styling</u>.</em>',
                type: 'info' as DialogType,
                actions: [
                    { label: 'Got it', action: 'close', color: 'primary' }
                ]
            }
        },
        {
            title: 'Warning Dialog',
            description: 'Dialog for displaying warnings',
            dialog: {
                title: 'Warning',
                content: 'Please be careful with this action. It may have unintended consequences.',
                type: 'warning' as DialogType,
                actions: [
                    { label: 'Cancel', action: 'cancel' },
                    { label: 'Proceed', action: 'confirm', color: 'warn' }
                ]
            }
        },
        {
            title: 'Error Dialog',
            description: 'Dialog for displaying errors',
            dialog: {
                title: 'Error',
                content: 'An error occurred while processing your request. Please try again.',
                type: 'error' as DialogType,
                actions: [
                    { label: 'Retry', action: 'confirm', color: 'primary' },
                    { label: 'Cancel', action: 'cancel' }
                ]
            }
        },
        {
            title: 'Success Dialog',
            description: 'Dialog for displaying success messages with HTML content',
            dialog: {
                title: 'Success',
                content: 'Your action was completed successfully!<br><strong>Great!</strong>',
                type: 'success' as DialogType,
                actions: [
                    { label: 'Great!', action: 'close', color: 'primary' }
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
                actions: [
                    { label: 'Close', action: 'close' }
                ]
            }
        },
        {
            title: 'Large Dialog',
            description: 'Larger dialog variant',
            dialog: {
                title: 'Large Dialog',
                content: 'This is a large dialog with more space for content. It can accommodate more information and longer text.',
                size: 'large' as DialogSize,
                actions: [
                    { label: 'Close', action: 'close' }
                ]
            }
        },
        {
            title: 'Fullscreen Dialog',
            description: 'Fullscreen dialog variant',
            dialog: {
                title: 'Fullscreen Dialog',
                content: 'This dialog takes up the full screen.',
                size: 'fullscreen' as DialogSize,
                actions: [
                    { label: 'Close', action: 'close' }
                ]
            }
        },
        {
            title: 'Dialog with Custom Actions',
            description: 'Dialog with multiple custom actions',
            dialog: {
                title: 'Custom Actions',
                content: 'This dialog has multiple custom actions with different colors and icons.',
                actions: [
                    { label: 'Save', icon: 'save', color: 'primary', action: 'save' },
                    { label: 'Save & Close', icon: 'save_alt', color: 'accent', action: 'saveClose' },
                    { label: 'Cancel', icon: 'cancel', color: 'warn', action: 'cancel' }
                ]
            }
        },
        {
            title: 'Loading Dialog',
            description: 'Dialog in loading state',
            dialog: {
                title: 'Processing',
                content: 'Please wait while we process your request...',
                loading: true,
                actions: [
                    { label: 'Cancel', action: 'cancel', disabled: true }
                ]
            }
        }
    ];

    constructor(
        private dialogService: DialogService,
        private snackBar: MatSnackBar
    ) { }

    openDialog(variation: any) {
        const dialogRef = this.dialogService.open({
            title: variation.dialog.title,
            content: variation.dialog.content,
            type: variation.dialog.type,
            size: variation.dialog.size,
            position: variation.dialog.position,
            actions: variation.dialog.actions,
            showCloseButton: variation.dialog.showCloseButton,
            showHeader: variation.dialog.showHeader,
            showFooter: variation.dialog.showFooter,
            loading: variation.dialog.loading,
            disabled: variation.dialog.disabled,
            closable: variation.dialog.closable,
            backdrop: variation.dialog.backdrop,
            escapeKeyClose: variation.dialog.escapeKeyClose,
            clickOutsideClose: variation.dialog.clickOutsideClose,
            autoFocus: variation.dialog.autoFocus,
            restoreFocus: variation.dialog.restoreFocus,
            data: variation.dialog.data
        });

        dialogRef.afterClosed().subscribe(result => {
            this.snackBar.open(`Dialog closed with result: ${result || 'undefined'}`, 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        });
    }

    // Service methods for quick access
    openAlert() {
        this.dialogService.alert('This is an alert message!', 'Alert');
    }

    openConfirm() {
        this.dialogService.confirm('Are you sure you want to proceed?', 'Confirm').subscribe(result => {
            if (result === 'confirm') {
                this.snackBar.open('Confirmed!', 'Close', { duration: 2000 });
            } else {
                this.snackBar.open('Cancelled', 'Close', { duration: 2000 });
            }
        });
    }

    openInfo() {
        this.dialogService.info('Here is some helpful information.<br><br><em>This includes <strong>HTML formatting</strong>!</em>', 'Information');
    }

    openWarning() {
        this.dialogService.warning('Please be careful with this action.', 'Warning').subscribe(result => {
            if (result === 'confirm') {
                this.snackBar.open('Proceeded with warning', 'Close', { duration: 2000 });
            } else {
                this.snackBar.open('Cancelled', 'Close', { duration: 2000 });
            }
        });
    }

    openError() {
        this.dialogService.error('An error occurred while processing your request.', 'Error');
    }

    openSuccess() {
        this.dialogService.success('Your action was completed successfully!<br><strong>Great!</strong>', 'Success');
    }

    openLoading() {
        const loadingDialog = this.dialogService.loading('Processing your request...', 'Please wait');

        // Simulate loading
        setTimeout(() => {
            loadingDialog.close();
            this.dialogService.success('Processing complete!', 'Success');
        }, 3000);
    }
}
