import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';

type ToggleExamples = 'basic' | 'colors' | 'disabled' | 'labelPosition' | 'ngModel' | 'events' | 'formField';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
@Component({
  selector: 'amw-demo-toggle-code',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    AmwButtonComponent,
    AmwSwitchComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './toggle-code.component.html',
  styleUrl: './toggle-code.component.scss'
})
export class ToggleCodeComponent extends BaseCodeComponent<ToggleExamples> {
  // State for live preview examples
  isChecked = true;
  isDisabled = false;
  labelPosition: 'before' | 'after' = 'after';

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<ToggleExamples, string> = {
    basic: `<amw-switch>Enable notifications</amw-switch>`,

    colors: `<amw-switch color="primary">Primary toggle</amw-switch>
<amw-switch color="accent">Accent toggle</amw-switch>
<amw-switch color="warn">Warn toggle</amw-switch>`,

    disabled: `<amw-switch [checked]="true">Checked toggle</amw-switch>
<amw-switch [checked]="false">Unchecked toggle</amw-switch>
<amw-switch [checked]="true" [disabled]="true">Disabled toggle</amw-switch>`,

    labelPosition: `<amw-switch labelPosition="after">Label after toggle</amw-switch>
<amw-switch labelPosition="before">Label before toggle</amw-switch>`,

    ngModel: `<amw-switch [(ngModel)]="isChecked">
  Toggle is {{ isChecked ? 'ON' : 'OFF' }}
</amw-switch>`,

    events: `<amw-switch
  [checked]="isChecked"
  (switchChange)="onToggleChange($event)">
  Enable feature
</amw-switch>

// Component method
onToggleChange(event: any): void {
  this.isChecked = event.checked;
  console.log('Toggle changed:', event.checked);
}`,

    formField: `<div class="settings-panel">
  <h3>User Preferences</h3>

  <amw-switch color="primary">
    Email notifications
  </amw-switch>

  <amw-switch color="primary">
    Push notifications
  </amw-switch>

  <amw-switch color="accent">
    Dark mode
  </amw-switch>

  <amw-switch color="warn">
    Delete account
  </amw-switch>
</div>`
  };

  constructor() {
    super();
  }
}
