import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwAutocompleteComponent } from '../../../../library/src/controls/components/amw-autocomplete/amw-autocomplete.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-autocomplete-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AmwAutocompleteComponent,
    AmwButtonComponent,
    AmwAutocompleteComponent,
    AmwButtonComponent
],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './autocomplete-validation.component.html',
  styleUrl: './autocomplete-validation.component.scss'
})
export class AutocompleteValidationComponent implements OnInit {
  validationForm: FormGroup;

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

  constructor(
    private fb: FormBuilder,
    private notification: AmwNotificationService
  ) {
    this.validationForm = this.fb.group({
      country: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      favoriteColor: ['', [Validators.required]],
      company: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.validationForm.valid) {
      this.notification.success('Success', 'Form is valid! All autocomplete fields are properly filled.', { duration: 3000 });
    } else {
      this.notification.error('Error', 'Form has validation errors. Please check the autocomplete fields.', { duration: 3000 });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.validationForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }
}