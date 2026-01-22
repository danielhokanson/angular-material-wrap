import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwChipsComponent } from '../../../../library/src/controls/components/amw-chips/amw-chips.component';
import { Chip, ChipEvent } from '../../../../library/src/controls/components/amw-chips/interfaces';

@Component({
  selector: 'amw-demo-chips-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwCodeDocComponent,
    AmwChipsComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chips-code.component.html',
  styleUrl: './chips-code.component.scss'
})
export class ChipsCodeComponent implements OnInit {
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

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Chip Set',
      description: 'Simple chip collection',
      code: `<amw-chips
  [chips]="chips"
  [addable]="false"
  [removable]="false">
</amw-chips>

// Component
chips: Chip[] = [
  { id: '1', label: 'Tag 1' },
  { id: '2', label: 'Tag 2' },
  { id: '3', label: 'Tag 3' }
];`
    },
    {
      key: 'removable',
      title: 'Removable Chips',
      description: 'Chips with remove functionality',
      code: `<amw-chips
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
}`
    },
    {
      key: 'selectable',
      title: 'Selectable Chips',
      description: 'Chips that can be selected',
      code: `<amw-chips
  [chips]="chips"
  [selectable]="true"
  (chipSelect)="onSelect($event)">
</amw-chips>

// Component
chips: Chip[] = [
  { id: '1', label: 'Selected', selected: true },
  { id: '2', label: 'Not Selected', selected: false }
];`
    },
    {
      key: 'input',
      title: 'Chip Input',
      description: 'Add chips with input field',
      code: `<amw-chips
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
];`
    },
    {
      key: 'styled',
      title: 'Styled Chips',
      description: 'Chips with color themes',
      code: `<amw-chips
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
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
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
