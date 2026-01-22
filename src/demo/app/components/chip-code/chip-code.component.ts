import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwChipComponent } from '../../../../library/src/controls/components/amw-chip/amw-chip.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-chip-code',
  standalone: true,
  imports: [
    AmwCodeDocComponent,
    AmwChipComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chip-code.component.html',
  styleUrl: './chip-code.component.scss'
})
export class ChipCodeComponent implements OnInit {
  // State for selectable chip example
  isSelected = false;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Chips',
      description: 'Simple chips with different colors',
      code: `<amw-chip label="Basic Chip"></amw-chip>
<amw-chip label="Primary" color="primary"></amw-chip>
<amw-chip label="Accent" color="accent"></amw-chip>
<amw-chip label="Warn" color="warn"></amw-chip>`
    },
    {
      key: 'removable',
      title: 'Removable Chips',
      description: 'Chips that can be removed',
      code: `<amw-chip
  label="Removable"
  [removable]="true"
  (removed)="onChipRemoved()">
</amw-chip>`
    },
    {
      key: 'selectable',
      title: 'Selectable Chips',
      description: 'Chips that can be selected',
      code: `<amw-chip
  label="Option"
  [selectable]="true"
  [(selected)]="isSelected"
  (selectionChange)="onSelectionChange($event)">
</amw-chip>`
    },
    {
      key: 'icons',
      title: 'Chips with Icons',
      description: 'Chips with leading icons',
      code: `<amw-chip label="Home" icon="home"></amw-chip>
<amw-chip label="Settings" icon="settings"></amw-chip>
<amw-chip label="Favorite" icon="favorite" color="warn"></amw-chip>`
    },
    {
      key: 'avatars',
      title: 'Chips with Avatars',
      description: 'Chips with avatar images',
      code: `<amw-chip
  label="John Doe"
  avatar="https://example.com/avatar.jpg">
</amw-chip>

<amw-chip
  label="User"
  avatar="/assets/user.png"
  [removable]="true">
</amw-chip>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  onChipRemoved(): void {
    console.log('Chip removed');
  }

  onSelectionChange(selected: boolean): void {
    console.log('Selection changed:', selected);
  }
}
