import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseCodeComponent } from '../base/base-code.component';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwAutocompleteComponent } from '../../../../library/src/controls/components/amw-autocomplete/amw-autocomplete.component';

type AutocompleteExamples = 'basic' | 'withValidation' | 'withFiltering' | 'multipleSelection' | 'withCustomDisplay' | 'reactiveForm' | 'withEvents' | 'searchForm';

@Component({
  selector: 'amw-demo-autocomplete-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent,
    AmwAutocompleteComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './autocomplete-code.component.html',
  styleUrl: './autocomplete-code.component.scss'
})
export class AutocompleteCodeComponent extends BaseCodeComponent<AutocompleteExamples> {
  // State for live preview examples
  countryValue = '';
  skillValue = '';
  searchValue = '';

  // Data for autocomplete options
  countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia'];
  skills = ['Angular', 'React', 'Vue.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java'];
  filteredCountries = [...this.countries];
  filteredSkills = [...this.skills];

  // Options for amw-autocomplete
  countryOptions = this.countries.map(c => ({ value: c, label: c }));
  skillOptions = this.skills.map(s => ({ value: s, label: s }));

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<AutocompleteExamples, string> = {
    basic: `<amw-autocomplete
  label="Country"
  [(ngModel)]="countryValue"
  placeholder="Select your country..."
  [options]="countryOptions"
  appearance="outline">
</amw-autocomplete>

// Component
countryOptions = [
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'United Kingdom', label: 'United Kingdom' }
];`,

    withValidation: `<amw-autocomplete
  label="Country"
  [(ngModel)]="countryValue"
  placeholder="Select your country..."
  [options]="countryOptions"
  appearance="outline"
  [required]="true"
  hint="Country is required">
</amw-autocomplete>`,

    withFiltering: `<amw-autocomplete
  label="Search Skills"
  [(ngModel)]="skillValue"
  placeholder="Type to search skills..."
  [options]="filteredSkillOptions"
  (input)="filterSkills($event)"
  appearance="outline">
</amw-autocomplete>

// Component method
filterSkills(event: any): void {
  const value = event.target.value.toLowerCase();
  this.filteredSkillOptions = this.skillOptions.filter(skill =>
    skill.label.toLowerCase().includes(value)
  );
}`,

    multipleSelection: `// For multiple selection, use amw-chips with autocomplete
<amw-chips
  [chips]="selectedSkillChips"
  [addable]="true"
  [removable]="true"
  (chipAdd)="addSkill($event)"
  (chipRemove)="removeSkill($event)">
</amw-chips>

// With autocomplete suggestions
<amw-autocomplete
  label="Add Skills"
  [options]="availableSkillOptions"
  (optionSelected)="onSkillSelected($event)"
  appearance="outline">
</amw-autocomplete>`,

    withCustomDisplay: `<amw-autocomplete
  label="Users"
  placeholder="Search users..."
  [options]="userOptions"
  [displayWith]="displayUser"
  appearance="outline">
</amw-autocomplete>

// Component data and method
userOptions = [
  { value: { id: 1, name: 'John Doe', email: 'john@example.com' }, label: 'John Doe (john@example.com)' },
  { value: { id: 2, name: 'Jane Smith', email: 'jane@example.com' }, label: 'Jane Smith (jane@example.com)' }
];

displayUser(user: any): string {
  return user ? user.name : '';
}`,

    reactiveForm: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup;
  countryOptions = [
    { value: 'United States', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'United Kingdom', label: 'United Kingdom' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      country: ['', Validators.required]
    });
  }
}

// Template
<form [formGroup]="form">
  <amw-autocomplete
    label="Country"
    formControlName="country"
    placeholder="Select country..."
    [options]="countryOptions"
    appearance="outline">
  </amw-autocomplete>
</form>`,

    withEvents: `<amw-autocomplete
  label="Search"
  [(ngModel)]="searchValue"
  placeholder="Type to search..."
  [options]="filteredOptions"
  (input)="onInputChange($event)"
  (optionSelected)="onOptionSelected($event)"
  appearance="outline">
</amw-autocomplete>

// Component methods
onInputChange(event: any): void {
  console.log('Input changed:', event.target.value);
  this.filterOptions(event.target.value);
}

onOptionSelected(event: any): void {
  console.log('Option selected:', event);
}`,

    searchForm: `<form class="search-form">
  <h3>Advanced Search</h3>

  <amw-autocomplete
    label="Category"
    placeholder="Select category..."
    [options]="categoryOptions"
    appearance="outline"
    [required]="true">
  </amw-autocomplete>

  <amw-autocomplete
    label="Location"
    placeholder="Enter or select location..."
    [options]="locationOptions"
    appearance="outline">
  </amw-autocomplete>

  <amw-button appearance="elevated" color="primary" type="submit">
    Search
  </amw-button>
</form>`
  };

  constructor() {
    super();
  }

  // Filter methods
  filterSkills(value: string): void {
    const search = value.toLowerCase();
    this.filteredSkills = this.skills.filter(skill =>
      skill.toLowerCase().includes(search)
    );
  }

  filterCountries(value: string): void {
    const search = value.toLowerCase();
    this.filteredCountries = this.countries.filter(country =>
      country.toLowerCase().includes(search)
    );
  }

  // Event handlers
  onInputChange(event: any): void {
    console.log('Input changed:', event.target?.value || event);
  }

  onOptionSelected(event: any): void {
    console.log('Option selected:', event);
  }
}
