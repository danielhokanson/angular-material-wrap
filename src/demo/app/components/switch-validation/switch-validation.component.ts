import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';

@Component({
  selector: 'amw-demo-switch-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwSwitchComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './switch-validation.component.html',
  styleUrl: './switch-validation.component.scss'
})
export class SwitchValidationComponent extends BaseValidationComponent {
  validationForm: FormGroup = this.fb.group({
    notificationsEnabled: [false, [Validators.requiredTrue]],
    darkModeEnabled: [false],
    autoSaveEnabled: [true, [Validators.requiredTrue]],
    termsAccepted: [false, [Validators.requiredTrue]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Required Switches', description: 'Notifications, Auto Save, and Terms must be enabled' },
    { title: 'Optional Switches', description: 'Dark Mode can be enabled or disabled' },
    { title: 'RequiredTrue Validator', description: 'Ensures switches are in the "on" position' },
    { title: 'Form State', description: 'Form is invalid if any required switches are off' },
    { title: 'Error Display', description: 'Shows validation errors below each switch' }
  ];

  getSwitchError(controlName: string): string {
    const control = this.validationForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('requiredTrue')) {
      return 'This option must be enabled';
    }
    return '';
  }

  hasSwitchError(controlName: string): boolean {
    const control = this.validationForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}
