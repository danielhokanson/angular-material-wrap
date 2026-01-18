import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwAccordionComponent } from '../../../../library/src/components/components/amw-accordion/amw-accordion.component';
import { AmwAccordionPanelComponent } from '../../../../library/src/components/components/amw-accordion/amw-accordion-panel.component';
import { AmwChipInputComponent, ChipInputOption } from '../../../../library/src/controls/components/amw-chip-input';

@Component({
    selector: 'amw-demo-chip-input-code',
    standalone: true,
    imports: [
        FormsModule,
        AmwAccordionComponent,
        AmwAccordionPanelComponent,
        AmwChipInputComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './chip-input-code.component.html',
    styleUrl: './chip-input-code.component.scss'
})
export class ChipInputCodeComponent {
    // Code examples
    editableCode = {
        basic: `<amw-chip-input
  [suggestions]="suggestions"
  [(ngModel)]="selectedItems"
  label="Tags"
  placeholder="Add tag...">
</amw-chip-input>`,
        customTemplate: `<amw-chip-input
  [suggestions]="suggestions"
  [(ngModel)]="selectedItems"
  label="Items with Custom Template">
  <ng-template #suggestionTemplate let-option>
    <mat-icon>{{ option.icon }}</mat-icon>
    <span>{{ option.label }}</span>
    <small>{{ option.subtitle }}</small>
  </ng-template>
</amw-chip-input>`,
        asyncSearch: `<amw-chip-input
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
}`,
        withValidation: `<amw-chip-input
  formControlName="skills"
  [suggestions]="skillSuggestions"
  [hasError]="hasError('skills')"
  [errorMessage]="getError('skills')"
  label="Required Skills"
  hint="Select at least one">
</amw-chip-input>`
    };

    // Preview data
    previewSuggestions: ChipInputOption[] = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' }
    ];
    previewSelected: ChipInputOption[] = [];
}
