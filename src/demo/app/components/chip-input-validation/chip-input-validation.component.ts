import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwChipInputComponent, ChipInputOption } from '../../../../library/src/controls/components/amw-chip-input';

@Component({
  selector: 'amw-demo-chip-input-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    AmwValidationDocComponent,
    AmwChipInputComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chip-input-validation.component.html',
  styleUrl: './chip-input-validation.component.scss'
})
export class ChipInputValidationComponent extends BaseValidationComponent {
  suggestions: ChipInputOption[] = [
    { value: 'skill1', label: 'JavaScript' },
    { value: 'skill2', label: 'TypeScript' },
    { value: 'skill3', label: 'Angular' },
    { value: 'skill4', label: 'React' },
    { value: 'skill5', label: 'Node.js' },
    { value: 'skill6', label: 'Python' },
    { value: 'skill7', label: 'Java' },
    { value: 'skill8', label: 'SQL' }
  ];

  validationForm: FormGroup = this.fb.group({
    requiredSkills: [[], Validators.required],
    optionalSkills: [[]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Required Skills', description: 'Must select at least one skill' },
    { title: 'Optional Skills', description: 'No validation required' },
    { title: 'Suggestions', description: 'Autocomplete from predefined list' },
    { title: 'Custom Input', description: 'Allow adding custom skills' }
  ];

  hasChipError(fieldName: string): boolean {
    const field = this.validationForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }
}
