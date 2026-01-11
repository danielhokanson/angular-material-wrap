import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';

type RadioExamples = 'basic' | 'colors' | 'disabled' | 'labelPosition' | 'ngModel' | 'events' | 'dynamicOptions';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwRadioGroupComponent } from '../../../../library/src/controls/components/amw-radio-group/amw-radio-group.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
@Component({
  selector: 'amw-demo-radio-code',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    AmwButtonComponent,
    AmwRadioGroupComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radio-code.component.html',
  styleUrl: './radio-code.component.scss'
})
export class RadioCodeComponent extends BaseCodeComponent<RadioExamples> {
  // State for live preview examples
  selectedSeason = 'winter';
  selectedColor = '';
  selectedOption = '1';
  labelPosition: 'before' | 'after' = 'after';

  seasons = [
    { value: 'winter', label: 'Winter' },
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'autumn', label: 'Autumn' }
  ];

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<RadioExamples, string> = {
    basic: `<amw-radio-group
  [options]="[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ]">
</amw-radio-group>`,

    colors: `<amw-radio-group
  color="primary"
  [options]="[
    { value: 'primary', label: 'Primary' },
    { value: 'accent', label: 'Accent' },
    { value: 'warn', label: 'Warn' }
  ]">
</amw-radio-group>`,

    disabled: `<amw-radio-group
  [options]="[
    { value: '1', label: 'Enabled' },
    { value: '2', label: 'Disabled', disabled: true },
    { value: '3', label: 'Enabled' }
  ]">
</amw-radio-group>`,

    labelPosition: `<amw-radio-group
  labelPosition="before"
  [options]="[
    { value: '1', label: 'Label before' },
    { value: '2', label: 'Label after' }
  ]">
</amw-radio-group>`,

    ngModel: `<amw-radio-group
  [(ngModel)]="selectedSeason"
  [options]="seasons">
</amw-radio-group>
<p>Your favorite season is: {{selectedSeason}}</p>`,

    events: `<amw-radio-group
  (selectionChange)="onRadioChange($event)"
  [options]="[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ]">
</amw-radio-group>`,

    dynamicOptions: `<amw-radio-group
  [(ngModel)]="selectedColor"
  [options]="seasons">
</amw-radio-group>`
  };

  constructor() {
    super();
  }

  // Event handlers
  onRadioChange(event: any) {
    console.log('Radio changed:', event);
  }
}
