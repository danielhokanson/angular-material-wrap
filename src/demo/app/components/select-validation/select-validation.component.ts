import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';

@Component({
  selector: 'amw-demo-select-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwSelectComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './select-validation.component.html',
  styleUrl: './select-validation.component.scss'
})
export class SelectValidationComponent extends BaseValidationComponent {
  countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' }
  ];

  sizeOptions = [
    { value: 'xs', label: 'Extra Small' },
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xl', label: 'Extra Large' }
  ];

  colorOptions = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'purple', label: 'Purple' }
  ];

  validationForm: FormGroup = this.fb.group({
    requiredSelect: ['', Validators.required],
    countrySelect: ['', Validators.required],
    sizeSelect: ['', Validators.required],
    colorSelect: [[], Validators.required],
    optionalSelect: ['']
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Required Select', description: 'Must select a country' },
    { title: 'Country Selection', description: 'Must choose a valid country' },
    { title: 'Size Selection', description: 'Must select a size option' },
    { title: 'Color Selection', description: 'Must select at least one color (multiple selection)' },
    { title: 'Optional Selection', description: 'No validation required' }
  ];
}
