import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';

type SelectExamples = 'basic' | 'withValue' | 'multiple' | 'optGroups' | 'disabled' | 'customTrigger' | 'errorState';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
@Component({
  selector: 'amw-demo-select-code',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    AmwButtonComponent,
    AmwSelectComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './select-code.component.html',
  styleUrl: './select-code.component.scss'
})
export class SelectCodeComponent extends BaseCodeComponent<SelectExamples> {
  // State for live preview examples
  selectedValue = '';
  selectedFood = '';
  selectedMultiple: string[] = [];
  selectedCar = '';

  foods = [
    { value: 'steak', label: 'Steak' },
    { value: 'pizza', label: 'Pizza' },
    { value: 'tacos', label: 'Tacos' }
  ];

  cars = [
    { value: 'volvo', label: 'Volvo' },
    { value: 'saab', label: 'Saab' },
    { value: 'mercedes', label: 'Mercedes' }
  ];

  toppings = [
    { value: 'extra-cheese', label: 'Extra cheese' },
    { value: 'mushroom', label: 'Mushroom' },
    { value: 'onion', label: 'Onion' },
    { value: 'pepperoni', label: 'Pepperoni' },
    { value: 'sausage', label: 'Sausage' },
    { value: 'tomato', label: 'Tomato' }
  ];

  pokemonGroups: { [key: string]: { value: string; label: string }[] } = {
    'Grass': [
      { value: 'bulbasaur', label: 'Bulbasaur' },
      { value: 'oddish', label: 'Oddish' }
    ],
    'Water': [
      { value: 'squirtle', label: 'Squirtle' },
      { value: 'psyduck', label: 'Psyduck' }
    ],
    'Fire': [
      { value: 'charmander', label: 'Charmander' },
      { value: 'vulpix', label: 'Vulpix' }
    ]
  };

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<SelectExamples, string> = {
    basic: `<amw-select
  label="Favorite food"
  [options]="[
    { value: 'steak', label: 'Steak' },
    { value: 'pizza', label: 'Pizza' },
    { value: 'tacos', label: 'Tacos' }
  ]">
</amw-select>`,

    withValue: `<amw-select
  label="Select your car"
  [(ngModel)]="selectedCar"
  [options]="cars">
</amw-select>
<p>You selected: {{selectedCar}}</p>`,

    multiple: `<amw-select
  label="Toppings"
  [multiple]="true"
  [options]="toppings">
</amw-select>`,

    optGroups: `<amw-select
  label="Pokemon"
  [options]="[
    { value: 'bulbasaur', label: 'Bulbasaur', group: 'Grass' },
    { value: 'oddish', label: 'Oddish', group: 'Grass' },
    { value: 'squirtle', label: 'Squirtle', group: 'Water' },
    { value: 'psyduck', label: 'Psyduck', group: 'Water' },
    { value: 'charmander', label: 'Charmander', group: 'Fire' },
    { value: 'vulpix', label: 'Vulpix', group: 'Fire' }
  ]">
</amw-select>`,

    disabled: `<amw-select
  label="Disabled select"
  [disabled]="true"
  [options]="[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]">
</amw-select>`,

    customTrigger: `<amw-select
  label="Favorite food"
  [options]="foods">
</amw-select>`,

    errorState: `<amw-select
  label="Favorite food"
  [required]="true"
  [options]="foods">
</amw-select>`
  };

  constructor() {
    super();
  }
}
