import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';

type CheckboxExamples = 'basic' | 'colors' | 'states' | 'labelPosition' | 'indeterminate' | 'disabled' | 'events';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
@Component({
  selector: 'amw-demo-checkbox-code',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    AmwButtonComponent,
    AmwCheckboxComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './checkbox-code.component.html',
  styleUrl: './checkbox-code.component.scss'
})
export class CheckboxCodeComponent extends BaseCodeComponent<CheckboxExamples> {
  // State for live preview examples
  checked = true;
  indeterminate = false;
  disabled = false;
  labelPosition: 'before' | 'after' = 'after';

  // Task list example
  allComplete = false;
  task = {
    name: 'All tasks',
    completed: false,
    subtasks: [
      { name: 'Task 1', completed: false },
      { name: 'Task 2', completed: false },
      { name: 'Task 3', completed: false }
    ]
  };

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<CheckboxExamples, string> = {
    basic: `<amw-checkbox>Check me</amw-checkbox>
<amw-checkbox [checked]="true">Checked</amw-checkbox>
<amw-checkbox [indeterminate]="true">Indeterminate</amw-checkbox>`,

    colors: `<amw-checkbox color="primary" [checked]="true">Primary</amw-checkbox>
<amw-checkbox color="accent" [checked]="true">Accent</amw-checkbox>
<amw-checkbox color="warn" [checked]="true">Warn</amw-checkbox>`,

    states: `<amw-checkbox [checked]="true">Checked</amw-checkbox>
<amw-checkbox [checked]="false">Unchecked</amw-checkbox>
<amw-checkbox [indeterminate]="true">Indeterminate</amw-checkbox>`,

    labelPosition: `<amw-checkbox labelPosition="before">Label before</amw-checkbox>
<amw-checkbox labelPosition="after">Label after</amw-checkbox>`,

    indeterminate: `<amw-checkbox
  [checked]="allComplete"
  [indeterminate]="someComplete()"
  (change)="setAll($event.checked)">
  {{task.name}}
</amw-checkbox>
<ul>
  <li *ngFor="let subtask of task.subtasks">
    <amw-checkbox
      [(ngModel)]="subtask.completed"
      (ngModelChange)="updateAllComplete()">
      {{subtask.name}}
    </amw-checkbox>
  </li>
</ul>`,

    disabled: `<amw-checkbox [disabled]="true">Disabled unchecked</amw-checkbox>
<amw-checkbox [disabled]="true" [checked]="true">Disabled checked</amw-checkbox>`,

    events: `<amw-checkbox
  (change)="onCheckboxChange($event)"
  (indeterminateChange)="onIndeterminateChange($event)">
  Event tracking
</amw-checkbox>`
  };

  constructor() {
    super();
  }

  // Indeterminate checkbox methods
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  // Event handlers
  onCheckboxChange(event: any) {
    console.log('Checkbox changed:', event.checked);
  }

  onIndeterminateChange(event: boolean) {
    console.log('Indeterminate changed:', event);
  }
}
