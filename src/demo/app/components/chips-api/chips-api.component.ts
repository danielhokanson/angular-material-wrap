import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'amw-demo-chips-api',
  standalone: true,
  imports: [],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chips-api.component.html',
  styleUrl: './chips-api.component.scss'
})
export class ChipsApiComponent {
  apiDocumentation = {
    inputs: [
      {
        name: 'selectable',
        type: 'boolean',
        default: 'true',
        description: 'Whether the chip can be selected',
        options: ['true', 'false']
      },
      {
        name: 'removable',
        type: 'boolean',
        default: 'true',
        description: 'Whether the chip can be removed',
        options: ['true', 'false']
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the chip is disabled',
        options: ['true', 'false']
      },
      {
        name: 'color',
        type: 'ThemePalette',
        default: 'undefined',
        description: 'Theme color palette for the chip',
        options: ['primary', 'accent', 'warn']
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        description: 'The value of the chip'
      },
      {
        name: 'selected',
        type: 'boolean',
        default: 'false',
        description: 'Whether the chip is selected',
        options: ['true', 'false']
      }
    ],
    outputs: [
      {
        name: 'selectionChange',
        type: 'EventEmitter<MatChipSelectionChange>',
        description: 'Emitted when the chip selection state changes'
      },
      {
        name: 'destroyed',
        type: 'EventEmitter<MatChipEvent>',
        description: 'Emitted when the chip is destroyed'
      },
      {
        name: 'removed',
        type: 'EventEmitter<MatChipEvent>',
        description: 'Emitted when the chip is removed'
      }
    ],
    methods: [
      {
        name: 'focus()',
        returns: 'void',
        description: 'Focuses the chip'
      },
      {
        name: 'remove()',
        returns: 'void',
        description: 'Removes the chip from its parent chip set'
      },
      {
        name: 'select()',
        returns: 'void',
        description: 'Selects the chip'
      },
      {
        name: 'deselect()',
        returns: 'void',
        description: 'Deselects the chip'
      },
      {
        name: 'toggleSelected()',
        returns: 'void',
        description: 'Toggles the current selected state'
      }
    ]
  };
}
