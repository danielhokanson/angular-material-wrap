import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'amw-demo-autocomplete-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './autocomplete-code.component.html',
  styleUrl: './autocomplete-code.component.scss'
})
export class AutocompleteCodeComponent {
  // State for live preview examples
  countryValue = '';
  skillValue = '';
  searchValue = '';

  // Data for autocomplete options
  countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia'];
  skills = ['Angular', 'React', 'Vue.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java'];
  filteredCountries = [...this.countries];
  filteredSkills = [...this.skills];

  // Editable code examples
  editableCode = {
    basic: '',
    withValidation: '',
    withFiltering: '',
    multipleSelection: '',
    withCustomDisplay: '',
    reactiveForm: '',
    withEvents: '',
    searchForm: ''
  };

  // Original code examples (for reset functionality)
  readonly codeExamples = {
    basic: `<mat-form-field appearance="outline">
  <mat-label>Country</mat-label>
  <input matInput
    [(ngModel)]="countryValue"
    placeholder="Select your country..."
    [matAutocomplete]="auto">
  <mat-autocomplete #auto="matAutocomplete">
    @for (country of countries; track country) {
      <mat-option [value]="country">{{country}}</mat-option>
    }
  </mat-autocomplete>
</mat-form-field>`,

    withValidation: `<mat-form-field appearance="outline">
  <mat-label>Country</mat-label>
  <input matInput
    [(ngModel)]="countryValue"
    placeholder="Select your country..."
    required
    [matAutocomplete]="autoValidation">
  <mat-autocomplete #autoValidation="matAutocomplete">
    @for (country of countries; track country) {
      <mat-option [value]="country">{{country}}</mat-option>
    }
  </mat-autocomplete>
  <mat-hint>Country is required</mat-hint>
</mat-form-field>`,

    withFiltering: `<mat-form-field appearance="outline">
  <mat-label>Search Skills</mat-label>
  <input matInput
    [(ngModel)]="skillValue"
    (input)="filterSkills($event)"
    placeholder="Type to search skills..."
    [matAutocomplete]="autoFilter">
  <mat-autocomplete #autoFilter="matAutocomplete">
    @for (skill of filteredSkills; track skill) {
      <mat-option [value]="skill">{{skill}}</mat-option>
    }
  </mat-autocomplete>
</mat-form-field>

// Component method
filterSkills(event: any): void {
  const value = event.target.value.toLowerCase();
  this.filteredSkills = this.skills.filter(skill =>
    skill.toLowerCase().includes(value)
  );
}`,

    multipleSelection: `// For multiple selection, use mat-chip-grid with autocomplete
<mat-form-field appearance="outline">
  <mat-label>Skills</mat-label>
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
</mat-form-field>`,

    withCustomDisplay: `<mat-form-field appearance="outline">
  <mat-label>Users</mat-label>
  <input matInput
    placeholder="Search users..."
    [matAutocomplete]="autoCustom">
  <mat-autocomplete #autoCustom="matAutocomplete" [displayWith]="displayUser">
    @for (user of users; track user.id) {
      <mat-option [value]="user">
        <span>{{user.name}}</span>
        <small>({{user.email}})</small>
      </mat-option>
    }
  </mat-autocomplete>
</mat-form-field>

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
  <mat-form-field appearance="outline">
    <mat-label>Country</mat-label>
    <input matInput
      formControlName="country"
      placeholder="Select country..."
      [matAutocomplete]="autoCountry">
    <mat-autocomplete #autoCountry="matAutocomplete">
      @for (country of countries; track country) {
        <mat-option [value]="country">{{country}}</mat-option>
      }
    </mat-autocomplete>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Skill</mat-label>
    <input matInput
      formControlName="skill"
      placeholder="Select skill..."
      [matAutocomplete]="autoSkill">
    <mat-autocomplete #autoSkill="matAutocomplete">
      @for (skill of skills; track skill) {
        <mat-option [value]="skill">{{skill}}</mat-option>
      }
    </mat-autocomplete>
  </mat-form-field>
</form>`,

    withEvents: `<mat-form-field appearance="outline">
  <mat-label>Search</mat-label>
  <input matInput
    [(ngModel)]="searchValue"
    (input)="onInputChange($event)"
    placeholder="Type to search..."
    [matAutocomplete]="autoEvent">
  <mat-autocomplete #autoEvent="matAutocomplete" (optionSelected)="onOptionSelected($event)">
    @for (option of filteredOptions; track option) {
      <mat-option [value]="option">{{option}}</mat-option>
    }
  </mat-autocomplete>
</mat-form-field>

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

  <mat-form-field appearance="outline">
    <mat-label>Category</mat-label>
    <input matInput
      placeholder="Select category..."
      required
      [matAutocomplete]="autoCategory">
    <mat-autocomplete #autoCategory="matAutocomplete">
      @for (category of categories; track category) {
        <mat-option [value]="category">{{category}}</mat-option>
      }
    </mat-autocomplete>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Location</mat-label>
    <input matInput
      placeholder="Enter or select location..."
      [matAutocomplete]="autoLocation">
    <mat-autocomplete #autoLocation="matAutocomplete">
      @for (location of locations; track location) {
        <mat-option [value]="location">{{location}}</mat-option>
      }
    </mat-autocomplete>
  </mat-form-field>

  <button mat-raised-button color="primary" type="submit">
    Search
  </button>
</form>`
  };

  constructor() {
    // Initialize editable code
    Object.keys(this.codeExamples).forEach(key => {
      this.editableCode[key as keyof typeof this.codeExamples] =
        this.codeExamples[key as keyof typeof this.codeExamples];
    });
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

  // Reset code to original
  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
  }
}