import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';

@Component({
  selector: 'amw-demo-select-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmwCodeDocComponent,
    AmwSelectComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './select-code.component.html',
  styleUrl: './select-code.component.scss'
})
export class SelectCodeComponent implements OnInit {
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

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Select',
      description: 'Simple dropdown selection',
      code: `<amw-select
  label="Favorite food"
  [options]="[
    { value: 'steak', label: 'Steak' },
    { value: 'pizza', label: 'Pizza' },
    { value: 'tacos', label: 'Tacos' }
  ]">
</amw-select>`
    },
    {
      key: 'withValue',
      title: 'Select with Value Binding',
      description: 'Two-way data binding example',
      code: `<amw-select
  label="Select your car"
  [(ngModel)]="selectedCar"
  [options]="cars">
</amw-select>
<p>You selected: {{selectedCar}}</p>`
    },
    {
      key: 'multiple',
      title: 'Multiple Selection',
      description: 'Select multiple options at once',
      code: `<amw-select
  label="Toppings"
  [multiple]="true"
  [options]="toppings">
</amw-select>`
    },
    {
      key: 'optGroups',
      title: 'Option Groups',
      description: 'Organize options into groups',
      code: `<amw-select
  label="Pokemon"
  [options]="[
    { value: 'bulbasaur', label: 'Bulbasaur', group: 'Grass' },
    { value: 'oddish', label: 'Oddish', group: 'Grass' },
    { value: 'squirtle', label: 'Squirtle', group: 'Water' },
    { value: 'psyduck', label: 'Psyduck', group: 'Water' },
    { value: 'charmander', label: 'Charmander', group: 'Fire' },
    { value: 'vulpix', label: 'Vulpix', group: 'Fire' }
  ]">
</amw-select>`
    },
    {
      key: 'disabled',
      title: 'Disabled State',
      description: 'Non-interactive select',
      code: `<amw-select
  label="Disabled select"
  [disabled]="true"
  [options]="[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]">
</amw-select>`
    },
    {
      key: 'customTrigger',
      title: 'Custom Trigger',
      description: 'Customize the display trigger',
      code: `<amw-select
  label="Favorite food"
  [options]="foods">
</amw-select>`
    },
    {
      key: 'errorState',
      title: 'Error State',
      description: 'Display validation errors',
      code: `<amw-select
  label="Favorite food"
  [required]="true"
  [options]="foods">
</amw-select>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }
}
