import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { BaseCodeComponent } from '../base/base-code.component';

type AutocompleteExamples = 'basic' | 'withValidation' | 'withFiltering' | 'multipleSelection' | 'withCustomDisplay' | 'reactiveForm' | 'withEvents' | 'searchForm';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';

@Component({
  selector: 'amw-demo-autocomplete-code',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatOptionModule,
    MatExpansionModule,
    MatFormFieldModule,
    AmwButtonComponent],
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

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<AutocompleteExamples, string> = {
    basic: `<amw-input
  label="Country"
  [(ngModel)]="countryValue"
  placeholder="Select your country..."
  appearance="outline"
  [matAutocomplete]="auto">
  <mat-autocomplete #auto="matAutocomplete">
    @for (country of countries; track country) {
      <mat-option [value]="country">{{country}}</mat-option>
    }
  </mat-autocomplete>
</amw-input>`,

    withValidation: `<amw-input
  label="Country"
  [(ngModel)]="countryValue"
  placeholder="Select your country..."
  appearance="outline"
  required
  hint="Country is required"
  [matAutocomplete]="autoValidation">
  <mat-autocomplete #autoValidation="matAutocomplete">
    @for (country of countries; track country) {
      <mat-option [value]="country">{{country}}</mat-option>
    }
  </mat-autocomplete>
</amw-input>`,

    withFiltering: `<amw-input
  label="Search Skills"
  [(ngModel)]="skillValue"
  (input)="filterSkills($event)"
  placeholder="Type to search skills..."
  appearance="outline"
  [matAutocomplete]="autoFilter">
  <mat-autocomplete #autoFilter="matAutocomplete">
    @for (skill of filteredSkills; track skill) {
      <mat-option [value]="skill">{{skill}}</mat-option>
    }
  </mat-autocomplete>
</amw-input>

// Component method
filterSkills(event: any): void {
  const value = event.target.value.toLowerCase();
  this.filteredSkills = this.skills.filter(skill =>
    skill.toLowerCase().includes(value)
  );
}`,

    multipleSelection: `// For multiple selection, use mat-chip-grid with autocomplete
<amw-input
  label="Skills"
  appearance="outline">
  <mat-chip-grid #chipGrid>
    @for (skill of selectedSkills; track skill) {
      <mat-chip-row (removed)="removeSkill(skill)">
        {{skill}}
        <button matChipRemove>
          <mat-icon>cancel</mat-icon>
        </button>
      </mat-chip-row>
    }
  </mat-chip-grid>
  <input
    placeholder="Select skills..."
    [matChipInputFor]="chipGrid"
    [matAutocomplete]="autoMulti">
  <mat-autocomplete #autoMulti="matAutocomplete" (optionSelected)="addSkill($event)">
    @for (skill of skills; track skill) {
      <mat-option [value]="skill">{{skill}}</mat-option>
    }
  </mat-autocomplete>
</amw-input>`,

    withCustomDisplay: `<amw-input
  label="Users"
  placeholder="Search users..."
  appearance="outline"
  [matAutocomplete]="autoCustom">
  <mat-autocomplete #autoCustom="matAutocomplete" [displayWith]="displayUser">
    @for (user of users; track user.id) {
      <mat-option [value]="user">
        <span>{{user.name}}</span>
        <small>({{user.email}})</small>
      </mat-option>
    }
  </mat-autocomplete>
</amw-input>

// Component data and method
users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

displayUser(user: any): string {
  return user ? user.name : '';
}`,

    reactiveForm: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup;
  countries = ['United States', 'Canada', 'United Kingdom'];
  skills = ['Angular', 'React', 'Vue.js'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      country: ['', Validators.required],
      skill: ['', Validators.required]
    });
  }
}

// Template
<form [formGroup]="form">
  <amw-input
    label="Country"
    formControlName="country"
    placeholder="Select country..."
    appearance="outline"
    [matAutocomplete]="autoCountry">
    <mat-autocomplete #autoCountry="matAutocomplete">
      @for (country of countries; track country) {
        <mat-option [value]="country">{{country}}</mat-option>
      }
    </mat-autocomplete>
  </amw-input>

  <amw-input
    label="Skill"
    formControlName="skill"
    placeholder="Select skill..."
    appearance="outline"
    [matAutocomplete]="autoSkill">
    <mat-autocomplete #autoSkill="matAutocomplete">
      @for (skill of skills; track skill) {
        <mat-option [value]="skill">{{skill}}</mat-option>
      }
    </mat-autocomplete>
  </amw-input>
</form>`,

    withEvents: `<amw-input
  label="Search"
  [(ngModel)]="searchValue"
  (input)="onInputChange($event)"
  placeholder="Type to search..."
  appearance="outline"
  [matAutocomplete]="autoEvent">
  <mat-autocomplete #autoEvent="matAutocomplete" (optionSelected)="onOptionSelected($event)">
    @for (option of filteredOptions; track option) {
      <mat-option [value]="option">{{option}}</mat-option>
    }
  </mat-autocomplete>
</amw-input>

// Component methods
onInputChange(event: any): void {
  console.log('Input changed:', event.target.value);
  this.filterOptions(event.target.value);
}

onOptionSelected(event: any): void {
  console.log('Option selected:', event.option.value);
}`,

    searchForm: `<form class="search-form">
  <h3>Advanced Search</h3>

  <amw-input
    label="Category"
    placeholder="Select category..."
    appearance="outline"
    required
    [matAutocomplete]="autoCategory">
    <mat-autocomplete #autoCategory="matAutocomplete">
      @for (category of categories; track category) {
        <mat-option [value]="category">{{category}}</mat-option>
      }
    </mat-autocomplete>
  </amw-input>

  <amw-input
    label="Location"
    placeholder="Enter or select location..."
    appearance="outline"
    [matAutocomplete]="autoLocation">
    <mat-autocomplete #autoLocation="matAutocomplete">
      @for (location of locations; track location) {
        <mat-option [value]="location">{{location}}</mat-option>
      }
    </mat-autocomplete>
  </amw-input>

  <amw-button variant="elevated" color="primary" type="submit">
    Search
  </amw-button>
</form>`
  };

  constructor() {
    super();
  }

  // Filter methods
  filterSkills(event: any): void {
    const value = event.target.value.toLowerCase();
    this.filteredSkills = this.skills.filter(skill =>
      skill.toLowerCase().includes(value)
    );
  }

  filterCountries(event: any): void {
    const value = event.target.value.toLowerCase();
    this.filteredCountries = this.countries.filter(country =>
      country.toLowerCase().includes(value)
    );
  }

  // Event handlers
  onInputChange(event: any): void {
    console.log('Input changed:', event.target.value);
  }

  onOptionSelected(event: any): void {
    console.log('Option selected:', event.option.value);
  }
}