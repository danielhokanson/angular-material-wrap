import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwSwitchComponent } from '../../../../library/src/controls/components/amw-switch/amw-switch.component';

@Component({
  selector: 'amw-demo-toggle-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmwCodeDocComponent,
    AmwButtonComponent,
    AmwSwitchComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './toggle-code.component.html',
  styleUrl: './toggle-code.component.scss'
})
export class ToggleCodeComponent implements OnInit {
  // State for live preview examples
  isChecked = true;
  isDisabled = false;
  labelPosition: 'before' | 'after' = 'after';

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Toggle',
      description: 'Simple toggle with basic functionality',
      code: `<amw-switch>Enable notifications</amw-switch>`
    },
    {
      key: 'colors',
      title: 'Toggle Colors',
      description: 'Different color themes for toggles',
      code: `<amw-switch color="primary">Primary toggle</amw-switch>
<amw-switch color="accent">Accent toggle</amw-switch>
<amw-switch color="warn">Warn toggle</amw-switch>`
    },
    {
      key: 'disabled',
      title: 'Disabled State',
      description: 'Toggles in different states including disabled',
      code: `<amw-switch [checked]="true">Checked toggle</amw-switch>
<amw-switch [checked]="false">Unchecked toggle</amw-switch>
<amw-switch [checked]="true" [disabled]="true">Disabled toggle</amw-switch>`
    },
    {
      key: 'labelPosition',
      title: 'Label Position',
      description: 'Positioning label before or after the toggle',
      code: `<amw-switch labelPosition="after">Label after toggle</amw-switch>
<amw-switch labelPosition="before">Label before toggle</amw-switch>`
    },
    {
      key: 'ngModel',
      title: 'NgModel Binding',
      description: 'Two-way data binding with ngModel',
      code: `<amw-switch [(ngModel)]="isChecked">
  Toggle is {{ isChecked ? 'ON' : 'OFF' }}
</amw-switch>`
    },
    {
      key: 'events',
      title: 'Events',
      description: 'Handling toggle change events',
      code: `<amw-switch
  [checked]="isChecked"
  (switchChange)="onToggleChange($event)">
  Enable feature
</amw-switch>

// Component method
onToggleChange(event: any): void {
  this.isChecked = event.checked;
  console.log('Toggle changed:', event.checked);
}`
    },
    {
      key: 'formField',
      title: 'Form Field Example',
      description: 'Toggle groups in a settings panel',
      code: `<div class="settings-panel">
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
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
  }
}
