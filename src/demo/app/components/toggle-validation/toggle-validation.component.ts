import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwToggleComponent } from '../../../../library/src/controls/components/amw-toggle/amw-toggle.component';

@Component({
  selector: 'amw-demo-toggle-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwToggleComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './toggle-validation.component.html',
  styleUrl: './toggle-validation.component.scss'
})
export class ToggleValidationComponent extends BaseValidationComponent {
  validationForm: FormGroup = this.fb.group({
    notifications: [false, Validators.requiredTrue],
    marketing: [false],
    analytics: [false, Validators.requiredTrue],
    darkMode: [false],
    autoSave: [false, Validators.requiredTrue],
    twoFactor: [false],
    location: [false],
    cookies: [false, Validators.requiredTrue]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Notifications', description: 'Must be enabled to proceed' },
    { title: 'Analytics', description: 'Must be enabled to proceed' },
    { title: 'Auto-save', description: 'Must be enabled to proceed' },
    { title: 'Cookies', description: 'Must be enabled to proceed' },
    { title: 'Marketing, Dark Mode, 2FA, Location', description: 'Optional - can be left disabled' }
  ];
}
