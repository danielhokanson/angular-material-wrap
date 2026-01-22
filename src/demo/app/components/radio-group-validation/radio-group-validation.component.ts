import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwRadioGroupComponent } from '../../../../library/src/controls/components/amw-radio-group/amw-radio-group.component';
import { AmwRadioGroupOption } from '../../../../library/src/controls/components/amw-radio-group/interfaces/radio-group.interface';
import { AmwDividerComponent } from '../../../../library/src/components/components/amw-divider/amw-divider.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'app-radio-group-validation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwRadioGroupComponent,
    AmwDividerComponent,
    AmwButtonComponent,
    AmwCardComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radio-group-validation.component.html',
  styleUrl: './radio-group-validation.component.scss'
})
export class RadioGroupValidationComponent extends BaseValidationComponent implements OnInit {
  readonly requiredOptions: AmwRadioGroupOption[] = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'maybe', label: 'Maybe' }
  ];

  readonly agreementOptions: AmwRadioGroupOption[] = [
    { value: 'agree', label: 'I agree to the terms and conditions' },
    { value: 'disagree', label: 'I do not agree' }
  ];

  readonly priorityOptions: AmwRadioGroupOption[] = [
    { value: 'low', label: 'Low Priority', icon: 'keyboard_arrow_down' },
    { value: 'medium', label: 'Medium Priority', icon: 'remove' },
    { value: 'high', label: 'High Priority', icon: 'keyboard_arrow_up' },
    { value: 'urgent', label: 'Urgent', icon: 'priority_high' }
  ];

  readonly sizeOptions: AmwRadioGroupOption[] = [
    { value: 'xs', label: 'Extra Small' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra Large' }
  ];

  isFormValid: boolean = false;
  formErrors: string[] = [];

  validationForm: FormGroup = this.fb.group({
    requiredField: ['', Validators.required],
    agreement: ['', Validators.required],
    priority: ['', Validators.required],
    size: ['', Validators.required]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Required Field', description: 'Must select one option' },
    { title: 'Agreement', description: 'Must accept or decline terms' },
    { title: 'Priority', description: 'Must select a priority level' },
    { title: 'Size', description: 'Must select a size' }
  ];

  ngOnInit(): void {
    this.validationForm.valueChanges.subscribe(() => {
      this.updateValidationState();
    });

    this.updateValidationState();
  }

  private updateValidationState(): void {
    this.isFormValid = this.validationForm.valid;
    this.formErrors = this.getFormErrors();
  }

  private getFormErrors(): string[] {
    const errors: string[] = [];

    Object.keys(this.validationForm.controls).forEach(key => {
      const control = this.validationForm.get(key);
      if (control && control.errors && control.touched) {
        if (control.errors['required']) {
          errors.push(`${this.getFieldLabel(key)} is required`);
        }
      }
    });

    return errors;
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      requiredField: 'Required Field',
      agreement: 'Agreement',
      priority: 'Priority',
      size: 'Size'
    };
    return labels[fieldName] || fieldName;
  }

  override onSubmit(): void {
    if (this.validationForm.valid) {
      console.log('Form submitted successfully:', this.validationForm.value);
      this.notification.success('Success', 'Form submitted successfully!', { duration: 3000 });
    } else {
      console.log('Form has validation errors:', this.formErrors);
      this.markAllFieldsAsTouched();
    }
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.validationForm.controls).forEach(key => {
      this.validationForm.get(key)?.markAsTouched();
    });
  }

  override resetForm(): void {
    this.validationForm.reset();
    this.updateValidationState();
  }

  getFieldValidationStatus(fieldName: string): 'valid' | 'invalid' | 'pending' {
    const control = this.validationForm.get(fieldName);
    if (!control) return 'pending';

    if (control.touched) {
      return control.valid ? 'valid' : 'invalid';
    }

    return 'pending';
  }

  getFieldValidationMessage(fieldName: string): string {
    const control = this.validationForm.get(fieldName);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }

    return '';
  }
}
