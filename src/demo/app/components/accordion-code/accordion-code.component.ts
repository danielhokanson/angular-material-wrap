import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';

type AccordionExamples = 'basic' | 'multiExpand' | 'hideToggle' | 'disabled' | 'programmatic' | 'events' | 'togglePosition';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwIconComponent, AmwAccordionComponent, AmwAccordionPanelComponent } from '../../../../library/src/components/components';
@Component({
  selector: 'amw-demo-accordion-code',
  standalone: true,
  imports: [FormsModule,
    AmwButtonComponent,
    AmwIconComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent],
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
    basic: `<amw-accordion>
  <amw-accordion-panel amwTitle="Panel 1" amwDescription="First panel content">
    <p>First panel content</p>
  </amw-accordion-panel>

  <amw-accordion-panel amwTitle="Panel 2" amwDescription="Second panel content">
    <p>Second panel content</p>
  </amw-accordion-panel>
</amw-accordion>`,

    multiExpand: `<amw-accordion [multi]="true">
  <amw-accordion-panel amwTitle="Panel 1">
    <p>Content 1 - can stay open with others</p>
  </amw-accordion-panel>

  <amw-accordion-panel amwTitle="Panel 2">
    <p>Content 2 - can stay open with others</p>
  </amw-accordion-panel>
</amw-accordion>`,

    hideToggle: `<amw-accordion>
  <amw-accordion-panel amwTitle="No Toggle Indicator" [hideToggle]="true">
    <p>Panel without toggle indicator</p>
  </amw-accordion-panel>
</amw-accordion>`,

    disabled: `<amw-accordion>
  <amw-accordion-panel amwTitle="Disabled Panel" [disabled]="true">
    <p>This content cannot be accessed</p>
  </amw-accordion-panel>
</amw-accordion>`,

    programmatic: `<amw-accordion>
  <amw-accordion-panel #panel amwTitle="Programmatically Controlled">
    <p>Control this panel with methods</p>
  </amw-accordion-panel>
</amw-accordion>

<amw-button variant="elevated" (click)="panel.expanded = true">Open</amw-button>
<amw-button variant="elevated" (click)="panel.expanded = false">Close</amw-button>
<amw-button variant="elevated" (click)="panel.expanded = !panel.expanded">Toggle</amw-button>`,

    events: `<amw-accordion>
  <amw-accordion-panel
    amwTitle="Event Handling"
    (opened)="onOpened()"
    (closed)="onClosed()">
    <p>Check console for event logs</p>
  </amw-accordion-panel>
</amw-accordion>`,

    togglePosition: `<amw-accordion [togglePosition]="'before'">
  <amw-accordion-panel amwTitle="Toggle Before Title">
    <p>Toggle indicator on the left</p>
  </amw-accordion-panel>
</amw-accordion>`
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
