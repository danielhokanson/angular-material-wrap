import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BaseCodeComponent } from '../base/base-code.component';

type SelectExamples = 'basic' | 'withValue' | 'multiple' | 'optGroups' | 'disabled' | 'customTrigger' | 'errorState';

@Component({
  selector: 'amw-demo-select-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule
  ],
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
    basic: `<mat-form-field>
  <mat-label>Favorite food</mat-label>
  <mat-select>
    <mat-option value="steak">Steak</mat-option>
    <mat-option value="pizza">Pizza</mat-option>
    <mat-option value="tacos">Tacos</mat-option>
  </mat-select>
</mat-form-field>`,

    withValue: `<mat-form-field>
  <mat-label>Select your car</mat-label>
  <mat-select [(value)]="selectedCar">
    <mat-option value="volvo">Volvo</mat-option>
    <mat-option value="saab">Saab</mat-option>
    <mat-option value="mercedes">Mercedes</mat-option>
  </mat-select>
</mat-form-field>
<p>You selected: {{selectedCar}}</p>`,

    multiple: `<mat-form-field>
  <mat-label>Toppings</mat-label>
  <mat-select multiple>
    <mat-option value="extra-cheese">Extra cheese</mat-option>
    <mat-option value="mushroom">Mushroom</mat-option>
    <mat-option value="onion">Onion</mat-option>
    <mat-option value="pepperoni">Pepperoni</mat-option>
    <mat-option value="sausage">Sausage</mat-option>
    <mat-option value="tomato">Tomato</mat-option>
  </mat-select>
</mat-form-field>`,

    optGroups: `<mat-form-field>
  <mat-label>Pokemon</mat-label>
  <mat-select>
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
  </mat-select>
</mat-form-field>`,

    disabled: `<mat-form-field>
  <mat-label>Disabled select</mat-label>
  <mat-select disabled>
    <mat-option value="option1">Option 1</mat-option>
    <mat-option value="option2">Option 2</mat-option>
  </mat-select>
</mat-form-field>`,

    customTrigger: `<mat-form-field>
  <mat-label>Favorite food</mat-label>
  <mat-select #select>
    <mat-select-trigger>
      {{select.value?.viewValue || 'None'}}
    </mat-select-trigger>
    <mat-option *ngFor="let food of foods" [value]="food">
      {{food.viewValue}}
    </mat-option>
  </mat-select>
</mat-form-field>`,

    errorState: `<mat-form-field>
  <mat-label>Favorite food</mat-label>
  <mat-select required>
    <mat-option value="steak">Steak</mat-option>
    <mat-option value="pizza">Pizza</mat-option>
    <mat-option value="tacos">Tacos</mat-option>
  </mat-select>
  <mat-error>Please make a selection</mat-error>
</mat-form-field>`
  };

  constructor() {
    super();
  }
}
