import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

@Component({
  selector: 'amw-demo-button-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwInputComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button-validation.component.html',
  styleUrl: './button-validation.component.scss'
})
export class ButtonValidationComponent extends BaseValidationComponent {
  validationForm: FormGroup = this.fb.group({
    requiredField: ['', Validators.required],
    emailField: ['', [Validators.required, Validators.email]],
    minLengthField: ['', [Validators.required, Validators.minLength(5)]],
    maxLengthField: ['', [Validators.required, Validators.maxLength(10)]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Valid Form', description: 'Submit button is enabled and ready to process' },
    { title: 'Invalid Form', description: 'Submit button is disabled until all validation passes' },
    { title: 'Required Fields', description: 'Must have a value before form can be submitted' },
    { title: 'Email Validation', description: 'Must be a valid email format' },
    { title: 'Length Validation', description: 'Must meet minimum/maximum character requirements' }
  ];
}
