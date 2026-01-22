import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwTextareaComponent } from '../../../../library/src/controls/components/amw-textarea/amw-textarea.component';

@Component({
  selector: 'amw-demo-textarea-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwTextareaComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './textarea-validation.component.html',
  styleUrl: './textarea-validation.component.scss'
})
export class TextareaValidationComponent extends BaseValidationComponent {
  validationForm: FormGroup = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    comments: ['', [Validators.maxLength(1000)]],
    feedback: ['', [Validators.required, Validators.minLength(20)]],
    bio: ['', [Validators.maxLength(200)]],
    requirements: ['', [Validators.required, Validators.minLength(50)]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Project Description', description: 'Required, 10-500 characters' },
    { title: 'Additional Comments', description: 'Optional, max 1000 characters' },
    { title: 'User Feedback', description: 'Required, minimum 20 characters' },
    { title: 'Personal Bio', description: 'Optional, max 200 characters' },
    { title: 'Project Requirements', description: 'Required, minimum 50 characters' }
  ];

  getCharacterCount(fieldName: string): number {
    const field = this.validationForm.get(fieldName);
    return field?.value?.length || 0;
  }
}
