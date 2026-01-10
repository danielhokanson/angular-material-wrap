import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BaseCodeComponent } from '../base/base-code.component';

type AccordionExamples = 'basic' | 'multiExpand' | 'hideToggle' | 'disabled' | 'programmatic' | 'events' | 'togglePosition';
import { MatExpansionModule } from '@angular/material/expansion';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
@Component({
  selector: 'amw-demo-accordion-code',
  standalone: true,
  imports: [FormsModule,
    MatIconModule,
    MatExpansionModule,
    AmwButtonComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './accordion-code.component.html',
  styleUrl: './accordion-code.component.scss'
})
export class AccordionCodeComponent extends BaseCodeComponent<AccordionExamples> {
  // State for live preview examples
  step = 0;
  multiExpandMode = false;

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<AccordionExamples, string> = {
    basic: `<mat-accordion>
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Panel 1</mat-panel-title>
      <mat-panel-description>First panel content</mat-panel-description>
    </mat-expansion-panel-header>
    <p>First panel content</p>
  </mat-expansion-panel>

  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Panel 2</mat-panel-title>
      <mat-panel-description>Second panel content</mat-panel-description>
    </mat-expansion-panel-header>
    <p>Second panel content</p>
  </mat-expansion-panel>
</mat-accordion>`,

    multiExpand: `<mat-accordion [multi]="true">
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Panel 1</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Content 1 - can stay open with others</p>
  </mat-expansion-panel>

  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Panel 2</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Content 2 - can stay open with others</p>
  </mat-expansion-panel>
</mat-accordion>`,

    hideToggle: `<mat-accordion>
  <mat-expansion-panel [hideToggle]="true">
    <mat-expansion-panel-header>
      <mat-panel-title>No Toggle Indicator</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Panel without toggle indicator</p>
  </mat-expansion-panel>
</mat-accordion>`,

    disabled: `<mat-accordion>
  <mat-expansion-panel [disabled]="true">
    <mat-expansion-panel-header>
      <mat-panel-title>Disabled Panel</mat-panel-title>
    </mat-expansion-panel-header>
    <p>This content cannot be accessed</p>
  </mat-expansion-panel>
</mat-accordion>`,

    programmatic: `<mat-accordion>
  <mat-expansion-panel #panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Programmatically Controlled</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Control this panel with methods</p>
  </mat-expansion-panel>
</mat-accordion>

<amw-button variant="elevated" (click)="panel.open()">Open</amw-button>
<amw-button variant="elevated" (click)="panel.close()">Close</amw-button>
<amw-button variant="elevated" (click)="panel.toggle()">Toggle</amw-button>`,

    events: `<mat-accordion>
  <mat-expansion-panel
    (opened)="onOpened()"
    (closed)="onClosed()"
    (afterExpand)="onAfterExpand()"
    (afterCollapse)="onAfterCollapse()">
    <mat-expansion-panel-header>
      <mat-panel-title>Event Handling</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Check console for event logs</p>
  </mat-expansion-panel>
</mat-accordion>`,

    togglePosition: `<mat-accordion>
  <mat-expansion-panel [togglePosition]="'before'">
    <mat-expansion-panel-header>
      <mat-panel-title>Toggle Before Title</mat-panel-title>
    </mat-expansion-panel-header>
    <p>Toggle indicator on the left</p>
  </mat-expansion-panel>
</mat-accordion>`
  };

  constructor() {
    super();
  }

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

  // Methods for programmatic control example
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
