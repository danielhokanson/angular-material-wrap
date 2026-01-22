import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';

@Component({
  selector: 'amw-demo-checkbox-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwCheckboxComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './checkbox-validation.component.html',
  styleUrl: './checkbox-validation.component.scss'
})
export class CheckboxValidationComponent extends BaseValidationComponent {
  validationForm: FormGroup = this.fb.group({
    termsAccepted: [false, Validators.requiredTrue],
    privacyAccepted: [false, Validators.requiredTrue],
    marketingEmails: [false],
    smsNotifications: [false],
    pushNotifications: [false],
    dataCollection: [false, Validators.requiredTrue],
    ageVerification: [false, Validators.requiredTrue]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Terms & Conditions', description: 'Must be checked to proceed' },
    { title: 'Privacy Policy', description: 'Must be checked to proceed' },
    { title: 'Data Collection', description: 'Must be checked to proceed' },
    { title: 'Age Verification', description: 'Must be checked to proceed' },
    { title: 'Communication Preferences', description: 'Optional - can be left unchecked' }
  ];
}
