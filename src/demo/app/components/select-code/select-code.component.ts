import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BaseCodeComponent } from '../base/base-code.component';

type SelectExamples = 'basic' | 'withValue' | 'multiple' | 'optGroups' | 'disabled' | 'customTrigger' | 'errorState';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
@Component({
  selector: 'amw-demo-select-code',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatOptionModule,
    AmwButtonComponent],
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
    { value: 'steak', viewValue: 'Steak' },
    { value: 'pizza', viewValue: 'Pizza' },
    { value: 'tacos', viewValue: 'Tacos' }
  ];

  cars = [
    { value: 'volvo', viewValue: 'Volvo' },
    { value: 'saab', viewValue: 'Saab' },
    { value: 'mercedes', viewValue: 'Mercedes' }
  ];

  toppings = [
    { value: 'extra-cheese', viewValue: 'Extra cheese' },
    { value: 'mushroom', viewValue: 'Mushroom' },
    { value: 'onion', viewValue: 'Onion' },
    { value: 'pepperoni', viewValue: 'Pepperoni' },
    { value: 'sausage', viewValue: 'Sausage' },
    { value: 'tomato', viewValue: 'Tomato' }
  ];

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<SelectExamples, string> = {
    basic: `<amw-select label="Favorite food">
  <mat-option value="steak">Steak</mat-option>
  <mat-option value="pizza">Pizza</mat-option>
  <mat-option value="tacos">Tacos</mat-option>
</amw-select>`,

    withValue: `<amw-select label="Select your car" [(value)]="selectedCar">
  <mat-option value="volvo">Volvo</mat-option>
  <mat-option value="saab">Saab</mat-option>
  <mat-option value="mercedes">Mercedes</mat-option>
</amw-select>
<p>You selected: {{selectedCar}}</p>`,

    multiple: `<amw-select label="Toppings" multiple>
  <mat-option value="extra-cheese">Extra cheese</mat-option>
  <mat-option value="mushroom">Mushroom</mat-option>
  <mat-option value="onion">Onion</mat-option>
  <mat-option value="pepperoni">Pepperoni</mat-option>
  <mat-option value="sausage">Sausage</mat-option>
  <mat-option value="tomato">Tomato</mat-option>
</amw-select>`,

    optGroups: `<amw-select label="Pokemon">
  <mat-optgroup label="Grass">
    <mat-option value="bulbasaur">Bulbasaur</mat-option>
    <mat-option value="oddish">Oddish</mat-option>
  </mat-optgroup>
  <mat-optgroup label="Water">
    <mat-option value="squirtle">Squirtle</mat-option>
    <mat-option value="psyduck">Psyduck</mat-option>
  </mat-optgroup>
  <mat-optgroup label="Fire">
    <mat-option value="charmander">Charmander</mat-option>
    <mat-option value="vulpix">Vulpix</mat-option>
  </mat-optgroup>
</amw-select>`,

    disabled: `<amw-select label="Disabled select" disabled>
  <mat-option value="option1">Option 1</mat-option>
  <mat-option value="option2">Option 2</mat-option>
</amw-select>`,

    customTrigger: `<amw-select label="Favorite food" #select>
  <mat-select-trigger>
    {{select.value?.viewValue || 'None'}}
  </mat-select-trigger>
  <mat-option *ngFor="let food of foods" [value]="food">
    {{food.viewValue}}
  </mat-option>
</amw-select>`,

    errorState: `<amw-select label="Favorite food" required>
  <mat-option value="steak">Steak</mat-option>
  <mat-option value="pizza">Pizza</mat-option>
  <mat-option value="tacos">Tacos</mat-option>
</amw-select>`
  };

  constructor() {
    super();
  }
}
