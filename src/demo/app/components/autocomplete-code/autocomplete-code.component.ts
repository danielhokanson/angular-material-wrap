import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-autocomplete-code',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './autocomplete-code.component.html',
  styleUrl: './autocomplete-code.component.scss'
})
export class AutocompleteCodeComponent {
  codeExamples = {
    basic: {
      title: 'Basic Autocomplete',
      description: 'A simple autocomplete with predefined options',
      code: `<amw-autocomplete
  label="Country"
  placeholder="Select your country..."
  [options]="countries">
</amw-autocomplete>

// Component data
countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' }
];`
    },
    withValidation: {
      title: 'Autocomplete with Validation',
      description: 'Autocomplete with required validation',
      code: `<amw-autocomplete
  formControlName="country"
  label="Country"
  placeholder="Select your country..."
  [options]="countries"
  [required]="true"
  appearance="outline">
</amw-autocomplete>

// Form setup
form = this.fb.group({
  country: ['', Validators.required]
});`
    },
    withFiltering: {
      title: 'Autocomplete with Filtering',
      description: 'Autocomplete that filters options as you type',
      code: `<amw-autocomplete
  label="Search Skills"
  placeholder="Type to search skills..."
  [options]="filteredSkills"
  [filterable]="true">
</amw-autocomplete>

// Component logic
filteredSkills = this.skills;

onSearchChange(searchTerm: string): void {
  this.filteredSkills = this.skills.filter(skill =>
    skill.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
}`
    },
    multipleSelection: {
      title: 'Multiple Selection',
      description: 'Autocomplete allowing multiple selections',
      code: `<amw-autocomplete
  label="Skills"
  placeholder="Select multiple skills..."
  [options]="skills"
  [multiple]="true"
  [chips]="true">
</amw-autocomplete>

// Component data
skills = [
  { value: 'angular', label: 'Angular' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'typescript', label: 'TypeScript' }
];`
    },
    withCustomDisplay: {
      title: 'Custom Display Format',
      description: 'Autocomplete with custom option display',
      code: `<amw-autocomplete
  label="Users"
  placeholder="Search users..."
  [options]="users"
  displayWith="displayName">
</amw-autocomplete>

// Component data
users = [
  { value: 1, label: 'John Doe', displayName: 'John Doe (john@example.com)' },
  { value: 2, label: 'Jane Smith', displayName: 'Jane Smith (jane@example.com)' }
];`
    },
    reactiveForm: {
      title: 'Reactive Form Integration',
      description: 'Using autocomplete with Angular reactive forms',
      code: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup;
  countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      country: ['', Validators.required],
      skills: ['', Validators.required]
    });
  }
}

// Template
<form [formGroup]="form">
  <amw-autocomplete
    formControlName="country"
    label="Country"
    placeholder="Select country..."
    [options]="countries"
    [required]="true">
  </amw-autocomplete>
  
  <amw-autocomplete
    formControlName="skills"
    label="Skills"
    placeholder="Select skills..."
    [options]="skills"
    [required]="true">
  </amw-autocomplete>
</form>`
    },
    withEvents: {
      title: 'Autocomplete with Events',
      description: 'Autocomplete with event handling',
      code: `<amw-autocomplete
  label="Search"
  placeholder="Type to search..."
  [options]="options"
  (selectionChange)="onSelectionChange($event)"
  (inputChange)="onInputChange($event)">
</amw-autocomplete>

// Component methods
onSelectionChange(event: any): void {
  console.log('Selection changed:', event.value);
  this.selectedValue = event.value;
}

onInputChange(event: any): void {
  console.log('Input changed:', event.value);
  this.filterOptions(event.value);
}`
    },
    searchForm: {
      title: 'Search Form Example',
      description: 'Complete search form with multiple autocompletes',
      code: `<form [formGroup]="searchForm" class="search-form">
  <h3>Advanced Search</h3>
  
  <amw-autocomplete
    formControlName="category"
    label="Category"
    placeholder="Select category..."
    [options]="categories"
    [required]="true">
  </amw-autocomplete>
  
  <amw-autocomplete
    formControlName="location"
    label="Location"
    placeholder="Enter or select location..."
    [options]="locations"
    [filterable]="true">
  </amw-autocomplete>
  
  <amw-autocomplete
    formControlName="tags"
    label="Tags"
    placeholder="Select multiple tags..."
    [options]="tags"
    [multiple]="true"
    [chips]="true">
  </amw-autocomplete>
  
  <amw-button
    type="submit"
    variant="elevated"
    color="primary"
    [disabled]="searchForm.invalid">
    Search
  </amw-button>
</form>`
    }
  };
}