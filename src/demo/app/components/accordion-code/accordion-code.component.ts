import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'amw-demo-accordion-code',
  standalone: true,
  imports: [
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './accordion-code.component.html',
  styleUrl: './accordion-code.component.scss'
})
export class AccordionCodeComponent {
  // State for live previews
  step = 0;

  // Editable code examples - these will be bound to textareas
  editableCode = {
    basic: '',
    multiExpand: '',
    hideToggle: '',
    disabled: '',
    programmatic: '',
    events: '',
    togglePosition: ''
  };

  // Event handlers for event example
  onOpened() {
    console.log('Panel opened');
  }

  onClosed() {
    console.log('Panel closed');
  }

  onAfterExpand() {
    console.log('Expansion animation complete');
  }

  onAfterCollapse() {
    console.log('Collapse animation complete');
  }

  constructor() {
    // Initialize editable code with original examples
    this.editableCode.basic = this.codeExamples.basic;
    this.editableCode.multiExpand = this.codeExamples.multiExpand;
    this.editableCode.hideToggle = this.codeExamples.hideToggle;
    this.editableCode.disabled = this.codeExamples.disabled;
    this.editableCode.programmatic = this.codeExamples.programmatic;
    this.editableCode.events = this.codeExamples.events;
    this.editableCode.togglePosition = this.codeExamples.togglePosition;
  }

  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
  }
  codeExamples = {
    basic: `<mat-accordion>
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Personal Information</mat-panel-title>
      <mat-panel-description>Enter your details</mat-panel-description>
    </mat-expansion-panel-header>
    <p>Panel content goes here</p>
  </mat-expansion-panel>
</mat-accordion>`,

    multiExpand: `<mat-accordion [multi]="true">
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Panel 1</mat-panel-title>
    </mat-expansion-panel-header>
    <p>First panel content</p>
  </mat-expansion-panel>
  
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Panel 2</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Second panel content</p>
  </mat-expansion-panel>
</mat-accordion>`,

    hideToggle: `<mat-accordion>
  <mat-expansion-panel [hideToggle]="true">
    <mat-expansion-panel-header>
      <mat-panel-title>No Toggle Indicator</mat-panel-title>
    </mat-expansion-panel-header>
    <p>This panel has no toggle indicator</p>
  </mat-expansion-panel>
</mat-accordion>`,

    disabled: `<mat-accordion>
  <mat-expansion-panel [disabled]="true">
    <mat-expansion-panel-header>
      <mat-panel-title>Disabled Panel</mat-panel-title>
    </mat-expansion-panel-header>
    <p>This panel cannot be opened</p>
  </mat-expansion-panel>
</mat-accordion>`,

    programmatic: `<!-- Template -->
<mat-accordion>
  <mat-expansion-panel #myPanel>
    <mat-expansion-panel-header>
      <mat-panel-title>Controlled Panel</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Panel controlled by buttons</p>
  </mat-expansion-panel>
</mat-accordion>

<button mat-button (click)="myPanel.open()">Open</button>
<button mat-button (click)="myPanel.close()">Close</button>
<button mat-button (click)="myPanel.toggle()">Toggle</button>`,

    events: `<!-- Template -->
<mat-expansion-panel
  (opened)="onOpened()"
  (closed)="onClosed()"
  (afterExpand)="onAfterExpand()"
  (afterCollapse)="onAfterCollapse()">
  <mat-expansion-panel-header>
    <mat-panel-title>Event Handling</mat-panel-title>
  </mat-expansion-panel-header>
  <p>Panel with event listeners</p>
</mat-expansion-panel>

<!-- Component -->
export class MyComponent {
  onOpened() {
    console.log('Panel opened');
  }
  
  onClosed() {
    console.log('Panel closed');
  }
  
  onAfterExpand() {
    console.log('Expansion animation complete');
  }
  
  onAfterCollapse() {
    console.log('Collapse animation complete');
  }
}`,

    togglePosition: `<mat-accordion [togglePosition]="'before'">
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Toggle on Left</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Toggle indicator appears before the title</p>
  </mat-expansion-panel>
</mat-accordion>`
  };
}
