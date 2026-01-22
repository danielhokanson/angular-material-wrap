import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwIconComponent } from '../../../../library/src/components/components';
import { AmwAutocompleteComponent } from '../../../../library/src/controls/components/amw-autocomplete/amw-autocomplete.component';

@Component({
  selector: 'amw-demo-autocomplete-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AmwCodeDocComponent,
    AmwButtonComponent,
    AmwIconComponent,
    AmwAutocompleteComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './autocomplete-code.component.html',
  styleUrl: './autocomplete-code.component.scss'
})
export class AutocompleteCodeComponent implements OnInit {
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

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Autocomplete',
      description: 'A simple autocomplete with predefined options',
      code: `<amw-autocomplete
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
];`
    },
    {
      key: 'withValidation',
      title: 'Autocomplete with Validation',
      description: 'Autocomplete with required validation',
      code: `<amw-autocomplete
  label="Country"
  [(ngModel)]="countryValue"
  placeholder="Select your country..."
  [options]="countryOptions"
  appearance="outline"
  [required]="true"
  hint="Country is required">
</amw-autocomplete>`
    },
    {
      key: 'withFiltering',
      title: 'Autocomplete with Filtering',
      description: 'Autocomplete that filters options as you type',
      code: `<amw-autocomplete
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
}`
    },
    {
      key: 'multipleSelection',
      title: 'Multiple Selection',
      description: 'Autocomplete allowing multiple selections',
      code: `// For multiple selection, use amw-chips with autocomplete
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
</amw-autocomplete>`
    },
    {
      key: 'withCustomDisplay',
      title: 'Custom Display Format',
      description: 'Autocomplete with custom option display',
      code: `<amw-autocomplete
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
}`
    },
    {
      key: 'reactiveForm',
      title: 'Reactive Form Integration',
      description: 'Using autocomplete with Angular reactive forms',
      code: `// Component TypeScript
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
</form>`
    },
    {
      key: 'withEvents',
      title: 'Autocomplete with Events',
      description: 'Autocomplete with event handling',
      code: `<amw-autocomplete
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
}`
    },
    {
      key: 'searchForm',
      title: 'Search Form Example',
      description: 'Complete search form with multiple autocompletes',
      code: `<form class="search-form">
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
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
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
