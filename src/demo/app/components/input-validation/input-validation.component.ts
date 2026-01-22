import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

@Component({
  selector: 'amw-demo-input-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwInputComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.scss'
})
export class InputValidationComponent extends BaseValidationComponent {
  validationForm: FormGroup = this.fb.group({
    requiredField: ['', Validators.required],
    emailField: ['', [Validators.required, Validators.email]],
    minLengthField: ['', [Validators.required, Validators.minLength(3)]],
    maxLengthField: ['', [Validators.required, Validators.maxLength(10)]],
    patternField: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
    numberField: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Required Field', description: 'Must not be empty' },
    { title: 'Email Field', description: 'Must be a valid email format' },
    { title: 'Min Length', description: 'Must be at least 3 characters' },
    { title: 'Max Length', description: 'Must not exceed 10 characters' },
    { title: 'Pattern', description: 'Must contain only letters (A-Z, a-z)' },
    { title: 'Number', description: 'Must be between 1 and 100' }
  ];
}
