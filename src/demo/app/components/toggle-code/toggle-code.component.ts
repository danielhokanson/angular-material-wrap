import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BaseCodeComponent } from '../base/base-code.component';

type ToggleExamples = 'basic' | 'colors' | 'disabled' | 'labelPosition' | 'ngModel' | 'events' | 'formField';

@Component({
  selector: 'amw-demo-toggle-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule
  ],
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
    basic: `<mat-slide-toggle>Enable notifications</mat-slide-toggle>`,

    colors: `<mat-slide-toggle color="primary">Primary toggle</mat-slide-toggle>
<mat-slide-toggle color="accent">Accent toggle</mat-slide-toggle>
<mat-slide-toggle color="warn">Warn toggle</mat-slide-toggle>`,

    disabled: `<mat-slide-toggle [checked]="true">Checked toggle</mat-slide-toggle>
<mat-slide-toggle [checked]="false">Unchecked toggle</mat-slide-toggle>
<mat-slide-toggle [checked]="true" [disabled]="true">Disabled toggle</mat-slide-toggle>`,

    labelPosition: `<mat-slide-toggle labelPosition="after">Label after toggle</mat-slide-toggle>
<mat-slide-toggle labelPosition="before">Label before toggle</mat-slide-toggle>`,

    ngModel: `<mat-slide-toggle [(ngModel)]="isChecked">
  Toggle is {{ isChecked ? 'ON' : 'OFF' }}
</mat-slide-toggle>`,

    events: `<mat-slide-toggle
  [checked]="isChecked"
  (change)="onToggleChange($event)">
  Enable feature
</mat-slide-toggle>

// Component method
onToggleChange(event: any): void {
  this.isChecked = event.checked;
  console.log('Toggle changed:', event.checked);
}`,

    formField: `<div class="settings-panel">
  <h3>User Preferences</h3>

  <mat-slide-toggle color="primary">
    Email notifications
  </mat-slide-toggle>

  <mat-slide-toggle color="primary">
    Push notifications
  </mat-slide-toggle>

  <mat-slide-toggle color="accent">
    Dark mode
  </mat-slide-toggle>

  <mat-slide-toggle color="warn">
    Delete account
  </mat-slide-toggle>
</div>`
  };

  constructor() {
    super();
  }
}
