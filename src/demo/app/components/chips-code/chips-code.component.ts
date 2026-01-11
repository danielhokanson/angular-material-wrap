import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';

type ChipsExamples = 'basic' | 'removable' | 'selectable' | 'input' | 'styled';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwChipsComponent } from '../../../../library/src/controls/components/amw-chips/amw-chips.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { Chip, ChipEvent } from '../../../../library/src/controls/components/amw-chips/interfaces';

@Component({
  selector: 'amw-demo-chips-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwButtonComponent,
    AmwChipsComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chips-code.component.html',
  styleUrl: './chips-code.component.scss'
})
export class ChipsCodeComponent extends BaseCodeComponent<ChipsExamples> {
  // Basic chips data
  basicChips: Chip[] = [
    { id: '1', label: 'Tag 1' },
    { id: '2', label: 'Tag 2' },
    { id: '3', label: 'Tag 3' }
  ];

  // Removable chips data
  removableChipsList: Chip[] = [
    { id: '1', label: 'Removable Chip 1', removable: true },
    { id: '2', label: 'Removable Chip 2', removable: true },
    { id: '3', label: 'Removable Chip 3', removable: true }
  ];

  // Selectable chips data
  selectableChips: Chip[] = [
    { id: '1', label: 'Selected', selected: true },
    { id: '2', label: 'Not Selected', selected: false }
  ];

  // Input chips data
  inputChipsList: Chip[] = [
    { id: '1', label: 'Apple' },
    { id: '2', label: 'Banana' },
    { id: '3', label: 'Orange' }
  ];

  // Styled chips data
  styledChips: Chip[] = [
    { id: '1', label: 'Primary', color: 'primary' },
    { id: '2', label: 'Accent', color: 'accent' },
    { id: '3', label: 'Warn', color: 'warn' }
  ];

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<ChipsExamples, string> = {
    basic: `<amw-chips
  [chips]="chips"
  [addable]="false"
  [removable]="false">
</amw-chips>

// Component
chips: Chip[] = [
  { id: '1', label: 'Tag 1' },
  { id: '2', label: 'Tag 2' },
  { id: '3', label: 'Tag 3' }
];`,

    removable: `<amw-chips
  [chips]="chips"
  [removable]="true"
  (chipRemove)="onRemove($event)">
</amw-chips>

// Component
chips: Chip[] = [
  { id: '1', label: 'Removable Chip', removable: true }
];

onRemove(event: ChipEvent) {
  console.log('Removed:', event.chip);
}`,

    selectable: `<amw-chips
  [chips]="chips"
  [selectable]="true"
  (chipSelect)="onSelect($event)">
</amw-chips>

// Component
chips: Chip[] = [
  { id: '1', label: 'Selected', selected: true },
  { id: '2', label: 'Not Selected', selected: false }
];`,

    input: `<amw-chips
  [chips]="chips"
  [addable]="true"
  [removable]="true"
  placeholder="Add a chip..."
  (chipAdd)="onAdd($event)"
  (chipRemove)="onRemove($event)">
</amw-chips>

// Component
chips: Chip[] = [
  { id: '1', label: 'Apple' },
  { id: '2', label: 'Banana' }
];`,

    styled: `<amw-chips
  [chips]="chips"
  [addable]="false"
  [removable]="false">
</amw-chips>

// Component
chips: Chip[] = [
  { id: '1', label: 'Primary', color: 'primary' },
  { id: '2', label: 'Accent', color: 'accent' },
  { id: '3', label: 'Warn', color: 'warn' }
];`
  };

  constructor() {
    super();
  }

  // Event handlers
  onChipRemove(event: ChipEvent) {
    const index = this.removableChipsList.findIndex(c => c.id === event.chip.id);
    if (index > -1) {
      this.removableChipsList.splice(index, 1);
    }
  }

  onChipSelect(event: ChipEvent) {
    console.log('Chip selected:', event.chip);
  }

  onChipAdd(event: ChipEvent) {
    console.log('Chip added:', event.chip);
  }

  onInputChipRemove(event: ChipEvent) {
    const index = this.inputChipsList.findIndex(c => c.id === event.chip.id);
    if (index > -1) {
      this.inputChipsList.splice(index, 1);
    }
  }
}
