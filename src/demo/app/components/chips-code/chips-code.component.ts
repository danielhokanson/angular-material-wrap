import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { BaseCodeComponent } from '../base/base-code.component';

type ChipsExamples = 'basic' | 'removable' | 'selectable' | 'input' | 'styled';

@Component({
  selector: 'amw-demo-chips-code',
  standalone: true,
  imports: [FormsModule, MatChipsModule, MatIconModule, MatButtonModule, MatExpansionModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chips-code.component.html',
  styleUrl: './chips-code.component.scss'
})
export class ChipsCodeComponent extends BaseCodeComponent<ChipsExamples> {
  // State for removable chips preview
  removableChips = [
    { label: 'Removable Chip', removed: false }
  ];

  // State for input chips preview
  inputChips = ['Apple', 'Banana', 'Orange'];

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<ChipsExamples, string> = {
    basic: `<mat-chip-set>
  <mat-chip>Tag 1</mat-chip>
  <mat-chip>Tag 2</mat-chip>
  <mat-chip>Tag 3</mat-chip>
</mat-chip-set>`,

    removable: `<mat-chip-set>
  <mat-chip [removable]="true" (removed)="remove()">
    Removable Chip
    <mat-icon matChipRemove>cancel</mat-icon>
  </mat-chip>
</mat-chip-set>`,

    selectable: `<mat-chip-listbox>
  <mat-chip-option [selected]="true">Selected</mat-chip-option>
  <mat-chip-option>Not Selected</mat-chip-option>
</mat-chip-listbox>`,

    input: `<mat-chip-grid #chipGrid>
  @for (item of items; track item) {
    <mat-chip-row (removed)="remove(item)">
      {{ item }}
      <mat-icon matChipRemove>cancel</mat-icon>
    </mat-chip-row>
  }
  <input [matChipInputFor]="chipGrid" />
</mat-chip-grid>`,

    styled: `<mat-chip-set>
  <mat-chip color="primary">Primary</mat-chip>
  <mat-chip color="accent">Accent</mat-chip>
  <mat-chip color="warn">Warn</mat-chip>
</mat-chip-set>`
  };

  constructor() {
    super();
  }

  // Remove a chip from removable chips preview
  removeChip(index: number) {
    this.removableChips.splice(index, 1);
  }

  // Remove a chip from input chips preview
  removeInputChip(index: number) {
    this.inputChips.splice(index, 1);
  }

  // Add chip from input field
  addInputChip(input: HTMLInputElement) {
    if (input.value.trim()) {
      this.inputChips.push(input.value.trim());
      input.value = '';
    }
  }
}
