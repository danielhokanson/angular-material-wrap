import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwRadioGroupComponent } from '../../../../library/src/controls/components/amw-radio-group/amw-radio-group.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-radio-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmwCodeDocComponent,
    AmwButtonComponent,
    AmwRadioGroupComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './radio-code.component.html',
  styleUrl: './radio-code.component.scss'
})
export class RadioCodeComponent implements OnInit {
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

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Radio Group',
      description: 'Simple radio button group',
      code: `<amw-radio-group
  [options]="[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ]">
</amw-radio-group>`
    },
    {
      key: 'colors',
      title: 'Radio Button Colors',
      description: 'Different color themes',
      code: `<amw-radio-group
  color="primary"
  [options]="[
    { value: 'primary', label: 'Primary' },
    { value: 'accent', label: 'Accent' },
    { value: 'warn', label: 'Warn' }
  ]">
</amw-radio-group>`
    },
    {
      key: 'disabled',
      title: 'Disabled Radio Buttons',
      description: 'Individual buttons can be disabled',
      code: `<amw-radio-group
  [options]="[
    { value: '1', label: 'Enabled' },
    { value: '2', label: 'Disabled', disabled: true },
    { value: '3', label: 'Enabled' }
  ]">
</amw-radio-group>`
    },
    {
      key: 'labelPosition',
      title: 'Label Position',
      description: 'Position label before or after button',
      code: `<amw-radio-group
  labelPosition="before"
  [options]="[
    { value: '1', label: 'Label before' },
    { value: '2', label: 'Label after' }
  ]">
</amw-radio-group>`
    },
    {
      key: 'ngModel',
      title: 'Two-Way Binding with ngModel',
      description: 'Bind radio group to a model property',
      code: `<amw-radio-group
  [(ngModel)]="selectedSeason"
  [options]="seasons">
</amw-radio-group>
<p>Your favorite season is: {{selectedSeason}}</p>`
    },
    {
      key: 'events',
      title: 'Event Handling',
      description: 'Listen to radio group change events',
      code: `<amw-radio-group
  (selectionChange)="onRadioChange($event)"
  [options]="[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ]">
</amw-radio-group>`
    },
    {
      key: 'dynamicOptions',
      title: 'Dynamic Options',
      description: 'Generate radio buttons from array',
      code: `<amw-radio-group
  [(ngModel)]="selectedColor"
  [options]="seasons">
</amw-radio-group>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }

  // Event handlers
  onRadioChange(event: any) {
    console.log('Radio changed:', event);
  }
}
