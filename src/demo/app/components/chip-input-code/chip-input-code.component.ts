import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwChipInputComponent, ChipInputOption } from '../../../../library/src/controls/components/amw-chip-input';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-chip-input-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwCodeDocComponent,
    AmwChipInputComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chip-input-code.component.html',
  styleUrl: './chip-input-code.component.scss'
})
export class ChipInputCodeComponent implements OnInit {
  // Preview data
  previewSuggestions: ChipInputOption[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ];
  previewSelected: ChipInputOption[] = [];

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Usage',
      description: 'Simple chip input with suggestions',
      code: `<amw-chip-input
  [suggestions]="suggestions"
  [(ngModel)]="selectedItems"
  label="Tags"
  placeholder="Add tag...">
</amw-chip-input>`
    },
    {
      key: 'customTemplate',
      title: 'Custom Template',
      description: 'Chip input with custom suggestion template',
      code: `<amw-chip-input
  [suggestions]="suggestions"
  [(ngModel)]="selectedItems"
  label="Items with Custom Template">
  <ng-template #suggestionTemplate let-option>
    <mat-icon>{{ option.icon }}</mat-icon>
    <span>{{ option.label }}</span>
    <small>{{ option.subtitle }}</small>
  </ng-template>
</amw-chip-input>`
    },
    {
      key: 'asyncSearch',
      title: 'Async Search',
      description: 'Chip input with async search functionality',
      code: `<amw-chip-input
  [suggestions]="filteredSuggestions"
  [loading]="isSearching"
  (inputChanged)="onSearch($event)"
  label="Async Search"
  placeholder="Type to search...">
</amw-chip-input>

// In component
onSearch(query: string): void {
  this.isSearching = true;
  this.api.search(query).subscribe(results => {
    this.filteredSuggestions = results;
    this.isSearching = false;
  });
}`
    },
    {
      key: 'withValidation',
      title: 'With Form Validation',
      description: 'Chip input with form validation support',
      code: `<amw-chip-input
  formControlName="skills"
  [suggestions]="skillSuggestions"
  [hasError]="hasError('skills')"
  [errorMessage]="getError('skills')"
  label="Required Skills"
  hint="Select at least one">
</amw-chip-input>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }
}
