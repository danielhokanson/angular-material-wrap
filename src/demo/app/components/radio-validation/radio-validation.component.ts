import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwRadioComponent } from '../../../../library/src/controls/components/amw-radio/amw-radio.component';
import { AmwRadioGroupComponent } from '../../../../library/src/controls/components/amw-radio-group/amw-radio-group.component';

@Component({
  selector: 'amw-demo-radio-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwRadioComponent,
    AmwRadioGroupComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radio-validation.component.html',
  styleUrl: './radio-validation.component.scss'
})
export class RadioValidationComponent extends BaseValidationComponent {
  validationForm: FormGroup = this.fb.group({
    gender: ['', Validators.required],
    experience: ['', Validators.required],
    preferences: ['', Validators.required],
    subscription: ['', Validators.required],
    ageGroup: ['', Validators.required]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Gender Selection', description: 'Must select one option' },
    { title: 'Experience Level', description: 'Must select one option' },
    { title: 'Communication Preferences', description: 'Must select one option' },
    { title: 'Subscription Type', description: 'Must select one option' },
    { title: 'Age Group', description: 'Must select one option' }
  ];
}
