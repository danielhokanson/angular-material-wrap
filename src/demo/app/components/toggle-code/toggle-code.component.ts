import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'amw-demo-toggle-code',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './toggle-code.component.html',
  styleUrl: './toggle-code.component.scss'
})
export class ToggleCodeComponent {
  codeExamples = {
    basic: {
      title: 'Basic Toggle',
      description: 'A simple toggle switch with label',
      code: `<amw-toggle
  label="Enable notifications"
  [checked]="true">
</amw-toggle>`
    },
    withColor: {
      title: 'Toggle with Color',
      description: 'Toggles with different color themes',
      code: `<amw-toggle
  label="Primary toggle"
  color="primary"
  [checked]="true">
</amw-toggle>

<amw-toggle
  label="Accent toggle"
  color="accent"
  [checked]="false">
</amw-toggle>

<amw-toggle
  label="Warn toggle"
  color="warn"
  [checked]="false">
</amw-toggle>`
    },
    states: {
      title: 'Different States',
      description: 'Toggles in various states',
      code: `<amw-toggle
  label="Checked toggle"
  [checked]="true">
</amw-toggle>

<amw-toggle
  label="Unchecked toggle"
  [checked]="false">
</amw-toggle>

<amw-toggle
  label="Disabled toggle"
  [checked]="true"
  [disabled]="true">
</amw-toggle>`
    },
    labelPosition: {
      title: 'Label Position',
      description: 'Toggles with different label positions',
      code: `<amw-toggle
  labelPosition="after"
  label="Label after toggle"
  [checked]="true">
</amw-toggle>

<amw-toggle
  labelPosition="before"
  label="Label before toggle"
  [checked]="true">
</amw-toggle>`
    },
    reactiveForm: {
      title: 'Reactive Form Integration',
      description: 'Using toggles with Angular reactive forms',
      code: `// Component TypeScript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      notifications: [false, Validators.requiredTrue],
      darkMode: [false],
      analytics: [false]
    });
  }
}

// Template
<form [formGroup]="form">
  <amw-toggle
    formControlName="notifications"
    label="Enable notifications"
    color="primary">
  </amw-toggle>
  
  <amw-toggle
    formControlName="darkMode"
    label="Dark mode"
    color="accent">
  </amw-toggle>
  
  <amw-toggle
    formControlName="analytics"
    label="Analytics tracking"
    color="primary">
  </amw-toggle>
</form>`
    },
    withEvents: {
      title: 'Toggle with Events',
      description: 'Toggles with event handling',
      code: `<amw-toggle
  label="Enable feature"
  [checked]="isEnabled"
  (change)="onToggleChange($event)">
</amw-toggle>

// Component method
onToggleChange(event: any): void {
  this.isEnabled = event.checked;
  console.log('Toggle changed:', event.checked);
}`
    },
    settingsGroup: {
      title: 'Settings Group',
      description: 'Multiple toggles in a settings panel',
      code: `<div class="settings-panel">
  <h3>User Preferences</h3>
  
  <amw-toggle
    color="primary"
    label="Email notifications"
    [checked]="emailNotifications">
  </amw-toggle>
  
  <amw-toggle
    color="primary"
    label="Push notifications"
    [checked]="pushNotifications">
  </amw-toggle>
  
  <amw-toggle
    color="accent"
    label="Dark mode"
    [checked]="darkMode">
  </amw-toggle>
  
  <amw-toggle
    color="warn"
    label="Delete account"
    [checked]="deleteAccount">
  </amw-toggle>
</div>`
    }
  };
}