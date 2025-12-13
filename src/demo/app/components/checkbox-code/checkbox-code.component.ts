import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'amw-demo-checkbox-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './checkbox-code.component.html',
  styleUrl: './checkbox-code.component.scss'
})
export class CheckboxCodeComponent {
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

  // Editable code examples
  editableCode = {
    basic: '',
    colors: '',
    states: '',
    labelPosition: '',
    indeterminate: '',
    disabled: '',
    events: ''
  };

  // Original code examples (for reset functionality)
  readonly codeExamples = {
    basic: `<mat-checkbox>Check me</mat-checkbox>
<mat-checkbox [checked]="true">Checked</mat-checkbox>
<mat-checkbox [indeterminate]="true">Indeterminate</mat-checkbox>`,

    colors: `<mat-checkbox color="primary" [checked]="true">Primary</mat-checkbox>
<mat-checkbox color="accent" [checked]="true">Accent</mat-checkbox>
<mat-checkbox color="warn" [checked]="true">Warn</mat-checkbox>`,

    states: `<mat-checkbox [checked]="true">Checked</mat-checkbox>
<mat-checkbox [checked]="false">Unchecked</mat-checkbox>
<mat-checkbox [indeterminate]="true">Indeterminate</mat-checkbox>`,

    labelPosition: `<mat-checkbox labelPosition="before">Label before</mat-checkbox>
<mat-checkbox labelPosition="after">Label after</mat-checkbox>`,

    indeterminate: `<mat-checkbox
  [checked]="allComplete"
  [indeterminate]="someComplete()"
  (change)="setAll($event.checked)">
  {{task.name}}
</mat-checkbox>
<ul>
  <li *ngFor="let subtask of task.subtasks">
    <mat-checkbox
      [(ngModel)]="subtask.completed"
      (ngModelChange)="updateAllComplete()">
      {{subtask.name}}
    </mat-checkbox>
  </li>
</ul>`,

    disabled: `<mat-checkbox [disabled]="true">Disabled unchecked</mat-checkbox>
<mat-checkbox [disabled]="true" [checked]="true">Disabled checked</mat-checkbox>`,

    events: `<mat-checkbox
  (change)="onCheckboxChange($event)"
  (indeterminateChange)="onIndeterminateChange($event)">
  Event tracking
</mat-checkbox>`
  };

  constructor() {
    // Initialize editable code
    Object.keys(this.codeExamples).forEach(key => {
      this.editableCode[key as keyof typeof this.codeExamples] =
        this.codeExamples[key as keyof typeof this.codeExamples];
    });
  }

  // Reset code to original
  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
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