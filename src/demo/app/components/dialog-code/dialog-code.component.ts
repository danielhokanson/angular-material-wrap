import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'amw-demo-dialog-code',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dialog-code.component.html',
    styleUrl: './dialog-code.component.scss'
})
export class DialogCodeComponent {
    codeExamples = {
        basic: {
            title: 'Basic Dialog',
            description: 'Simple dialog with title and content',
            html: `<button mat-raised-button (click)="openDialog()">Open Dialog</button>`,
            typescript: `import { MatDialog } from '@angular/material/dialog';
import { AmwDialogComponent } from '@angular-material-wrap/components';

export class MyComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(AmwDialogComponent, {
      data: {
        title: 'Basic Dialog',
        content: 'This is a basic dialog with title and content.',
        actions: [
          { label: 'Close', action: 'close' }
        ]
      },
      width: '500px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }
}`
        },
        confirmation: {
            title: 'Confirmation Dialog',
            description: 'Dialog for confirming actions',
            html: `<button mat-raised-button color="warn" (click)="openConfirmDialog()">Delete Item</button>`,
            typescript: `openConfirmDialog() {
  const dialogRef = this.dialog.open(AmwDialogComponent, {
    data: {
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this item? This action cannot be undone.',
      type: 'confirm',
      actions: [
        { label: 'Cancel', action: 'cancel', color: 'warn' },
        { label: 'Delete', action: 'confirm', color: 'primary' }
      ]
    },
    width: '400px',
    height: '300px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'confirm') {
      this.deleteItem();
    }
  });
}`
        },
        alert: {
            title: 'Alert Dialog',
            description: 'Dialog for displaying alerts',
            html: `<button mat-raised-button (click)="openAlertDialog()">Show Alert</button>`,
            typescript: `openAlertDialog() {
  const dialogRef = this.dialog.open(AmwDialogComponent, {
    data: {
      title: 'Alert',
      content: 'This is an important alert message.',
      type: 'alert',
      actions: [
        { label: 'OK', action: 'close', color: 'primary' }
      ]
    },
    width: '400px',
    height: '250px'
  });
}`
        },
        customActions: {
            title: 'Dialog with Custom Actions',
            description: 'Dialog with multiple custom actions',
            html: `<button mat-raised-button (click)="openCustomDialog()">Open Custom Dialog</button>`,
            typescript: `openCustomDialog() {
  const dialogRef = this.dialog.open(AmwDialogComponent, {
    data: {
      title: 'Custom Actions',
      content: 'This dialog has multiple custom actions.',
      actions: [
        { label: 'Save', icon: 'save', color: 'primary', action: 'save' },
        { label: 'Save & Close', icon: 'save_alt', color: 'accent', action: 'saveClose' },
        { label: 'Cancel', icon: 'cancel', color: 'warn', action: 'cancel' }
      ]
    },
    width: '500px',
    height: '400px'
  });

  dialogRef.afterClosed().subscribe(result => {
    switch (result) {
      case 'save':
        this.saveData();
        break;
      case 'saveClose':
        this.saveData();
        this.closeDialog();
        break;
      case 'cancel':
        this.cancelAction();
        break;
    }
  });
}`
        },
        sizes: {
            title: 'Dialog Sizes',
            description: 'Different dialog size variants',
            html: `<button mat-raised-button (click)="openSmallDialog()">Small</button>
<button mat-raised-button (click)="openMediumDialog()">Medium</button>
<button mat-raised-button (click)="openLargeDialog()">Large</button>
<button mat-raised-button (click)="openFullscreenDialog()">Fullscreen</button>`,
            typescript: `openSmallDialog() {
  this.dialog.open(AmwDialogComponent, {
    data: { title: 'Small Dialog', content: 'This is a small dialog.' },
    width: '300px',
    height: '200px'
  });
}

openMediumDialog() {
  this.dialog.open(AmwDialogComponent, {
    data: { title: 'Medium Dialog', content: 'This is a medium dialog.' },
    width: '500px',
    height: '400px'
  });
}

openLargeDialog() {
  this.dialog.open(AmwDialogComponent, {
    data: { title: 'Large Dialog', content: 'This is a large dialog.' },
    width: '800px',
    height: '600px'
  });
}

openFullscreenDialog() {
  this.dialog.open(AmwDialogComponent, {
    data: { title: 'Fullscreen Dialog', content: 'This is a fullscreen dialog.' },
    width: '100vw',
    height: '100vh',
    maxWidth: '100vw',
    maxHeight: '100vh'
  });
}`
        },
        configuration: {
            title: 'Advanced Configuration',
            description: 'Dialog with advanced configuration options',
            html: `<button mat-raised-button (click)="openAdvancedDialog()">Open Advanced Dialog</button>`,
            typescript: `openAdvancedDialog() {
  const dialogRef = this.dialogService.open({
    title: 'Advanced Dialog',
    content: 'This dialog demonstrates advanced configuration.',
    type: 'info',
    size: 'large',
    actions: [
      { label: 'Close', action: 'close', color: 'primary' }
    ],
    maxWidth: '90vw',
    maxHeight: '90vh',
    minWidth: '400px',
    minHeight: '300px',
    hasBackdrop: true,
    backdropClass: 'custom-backdrop',
    panelClass: 'custom-panel',
    closable: true,
    autoFocus: true,
    restoreFocus: true
  });

  dialogRef.afterOpened().subscribe(() => {
    console.log('Dialog opened');
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed with result:', result);
  });
}`
        },
        service: {
            title: 'Using Dialog Service',
            description: 'Using the DialogService for common dialog types',
            html: `<button mat-raised-button (click)="openAlert()">Alert</button>
<button mat-raised-button (click)="openConfirm()">Confirm</button>
<button mat-raised-button (click)="openInfo()">Info</button>`,
            typescript: `import { DialogService } from '@angular-material-wrap/services';

export class MyComponent {
  constructor(private dialogService: DialogService) {}

  openAlert() {
    this.dialogService.alert('This is an alert!', 'Alert');
  }

  openConfirm() {
    this.dialogService.confirm('Are you sure?', 'Confirm').subscribe(result => {
      if (result === 'confirm') {
        console.log('Confirmed!');
      } else {
        console.log('Cancelled');
      }
    });
  }

  openInfo() {
    this.dialogService.info('Here is some information.', 'Info');
  }

  openWarning() {
    this.dialogService.warning('Please be careful!', 'Warning').subscribe(result => {
      if (result === 'confirm') {
        console.log('Proceeded with warning');
      }
    });
  }

  openError() {
    this.dialogService.error('An error occurred!', 'Error');
  }

  openSuccess() {
    this.dialogService.success('Operation successful!', 'Success');
  }

  openLoading() {
    const loadingDialog = this.dialogService.loading('Processing...', 'Please wait');
    
    // Simulate async operation
    setTimeout(() => {
      loadingDialog.close();
      this.dialogService.success('Complete!', 'Success');
    }, 3000);
  }
}`
        }
    };

    copyToClipboard(code: string) {
        navigator.clipboard.writeText(code).then(() => {
            console.log('Code copied to clipboard');
        });
    }
}
