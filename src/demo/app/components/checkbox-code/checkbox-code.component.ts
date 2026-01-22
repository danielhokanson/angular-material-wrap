import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-checkbox-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmwCodeDocComponent,
    AmwButtonComponent,
    AmwCheckboxComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './checkbox-code.component.html',
  styleUrl: './checkbox-code.component.scss'
})
export class CheckboxCodeComponent implements OnInit {
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

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Checkbox',
      description: 'Simple checkbox with different states',
      code: `<amw-checkbox>Check me</amw-checkbox>
<amw-checkbox [checked]="true">Checked</amw-checkbox>
<amw-checkbox [indeterminate]="true">Indeterminate</amw-checkbox>`
    },
    {
      key: 'colors',
      title: 'Checkbox Colors',
      description: 'Different color themes',
      code: `<amw-checkbox color="primary" [checked]="true">Primary</amw-checkbox>
<amw-checkbox color="accent" [checked]="true">Accent</amw-checkbox>
<amw-checkbox color="warn" [checked]="true">Warn</amw-checkbox>`
    },
    {
      key: 'states',
      title: 'Checkbox States',
      description: 'Checked, unchecked, and indeterminate',
      code: `<amw-checkbox [checked]="true">Checked</amw-checkbox>
<amw-checkbox [checked]="false">Unchecked</amw-checkbox>
<amw-checkbox [indeterminate]="true">Indeterminate</amw-checkbox>`
    },
    {
      key: 'labelPosition',
      title: 'Label Position',
      description: 'Position label before or after checkbox',
      code: `<amw-checkbox labelPosition="before">Label before</amw-checkbox>
<amw-checkbox labelPosition="after">Label after</amw-checkbox>`
    },
    {
      key: 'indeterminate',
      title: 'Indeterminate State',
      description: 'Parent checkbox with child checkboxes',
      code: `<amw-checkbox
  [checked]="allComplete"
  [indeterminate]="someComplete()"
  (change)="setAll(!!$event)">
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
</ul>`
    },
    {
      key: 'disabled',
      title: 'Disabled State',
      description: 'Non-interactive checkboxes',
      code: `<amw-checkbox [disabled]="true">Disabled unchecked</amw-checkbox>
<amw-checkbox [disabled]="true" [checked]="true">Disabled checked</amw-checkbox>`
    },
    {
      key: 'events',
      title: 'Event Handling',
      description: 'Listen to checkbox change events',
      code: `<amw-checkbox
  (change)="onCheckboxChange($event)"
  (indeterminateChange)="onIndeterminateChange($event)">
  Event tracking
</amw-checkbox>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
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
