import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwDialogService } from '../../../../library/src/components/services/amw-dialog.service';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwTextareaComponent } from '../../../../library/src/controls/components/amw-textarea/amw-textarea.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';

@Component({
  selector: 'amw-demo-dialog-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwTextareaComponent,
    AmwSelectComponent,
    AmwCheckboxComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dialog-validation.component.html',
  styleUrl: './dialog-validation.component.scss'
})
export class DialogValidationComponent extends BaseValidationComponent implements OnInit {
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

  validationForm: FormGroup = this.fb.group({
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

  validationInfo: ValidationInfo[] = [
    { title: 'Title', description: 'Dialog title is required' },
    { title: 'Content', description: 'Dialog content is required' },
    { title: 'Type', description: 'Dialog type must be selected' },
    { title: 'Size', description: 'Dialog size must be selected' },
    { title: 'Options', description: 'Configure dialog behavior options' }
  ];

  constructor(private dialogService: AmwDialogService) {
    super();
  }

  ngOnInit(): void {
    this.validationForm.patchValue({
      title: 'Sample Dialog',
      content: 'This is a sample dialog for validation testing.'
    });
  }

  openDialog(): void {
    if (this.validationForm.valid) {
      const formValue = this.validationForm.value;

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

  override onSubmit(): void {
    if (this.validationForm.valid) {
      this.openDialog();
    } else {
      this.notification.error('Error', 'Please fix the validation errors', { duration: 3000 });
    }
  }

  onReset(): void {
    this.validationForm.reset();
    this.lastDialogResult = null;
    this.validationForm.patchValue({
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
