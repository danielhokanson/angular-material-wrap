import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AmwValidationDocComponent, ValidationInfo } from '../../shared/components/validation-doc/validation-doc.component';
import { BaseValidationComponent } from '../base/base-validation.component';
import { AmwAutocompleteComponent } from '../../../../library/src/controls/components/amw-autocomplete/amw-autocomplete.component';

@Component({
  selector: 'amw-demo-autocomplete-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwValidationDocComponent,
    AmwAutocompleteComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './autocomplete-validation.component.html',
  styleUrl: './autocomplete-validation.component.scss'
})
export class AutocompleteValidationComponent extends BaseValidationComponent {
  // Sample data for autocomplete options
  countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'it', label: 'Italy' },
    { value: 'es', label: 'Spain' },
    { value: 'au', label: 'Australia' },
    { value: 'jp', label: 'Japan' },
    { value: 'cn', label: 'China' }
  ];

  skills = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' }
  ];

  colors = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'purple', label: 'Purple' },
    { value: 'orange', label: 'Orange' },
    { value: 'pink', label: 'Pink' },
    { value: 'brown', label: 'Brown' },
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' }
  ];

  validationForm: FormGroup = this.fb.group({
    country: ['', [Validators.required]],
    skills: ['', [Validators.required]],
    favoriteColor: ['', [Validators.required]],
    company: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  });

  validationInfo: ValidationInfo[] = [
    { title: 'Country', description: 'Required selection from predefined list' },
    { title: 'Skills', description: 'Required selection from predefined list' },
    { title: 'Favorite Color', description: 'Required selection from predefined list' },
    { title: 'Company', description: 'Required, minimum 2 characters' },
    { title: 'Email', description: 'Required, valid email format' }
  ];
}
