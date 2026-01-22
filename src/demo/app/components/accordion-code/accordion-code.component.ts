import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwIconComponent, AmwAccordionComponent, AmwAccordionPanelComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-accordion-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwCodeDocComponent,
    AmwButtonComponent,
    AmwIconComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './accordion-code.component.html',
  styleUrl: './accordion-code.component.scss'
})
export class AccordionCodeComponent implements OnInit {
  // State for live preview examples
  step = 0;
  multiExpandMode = false;

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Accordion',
      description: 'Simple accordion with expandable panels',
      code: `<amw-accordion>
  <amw-accordion-panel amwTitle="Panel 1" amwDescription="First panel content">
    <p>First panel content</p>
  </amw-accordion-panel>

  <amw-accordion-panel amwTitle="Panel 2" amwDescription="Second panel content">
    <p>Second panel content</p>
  </amw-accordion-panel>
</amw-accordion>`
    },
    {
      key: 'multiExpand',
      title: 'Multi-Expansion Mode',
      description: 'Multiple panels can be open simultaneously',
      code: `<amw-accordion [multi]="true">
  <amw-accordion-panel amwTitle="Panel 1">
    <p>Content 1 - can stay open with others</p>
  </amw-accordion-panel>

  <amw-accordion-panel amwTitle="Panel 2">
    <p>Content 2 - can stay open with others</p>
  </amw-accordion-panel>
</amw-accordion>`
    },
    {
      key: 'hideToggle',
      title: 'Hide Toggle Indicator',
      description: 'Panel without visible toggle indicator',
      code: `<amw-accordion>
  <amw-accordion-panel amwTitle="No Toggle Indicator" [hideToggle]="true">
    <p>Panel without toggle indicator</p>
  </amw-accordion-panel>
</amw-accordion>`
    },
    {
      key: 'disabled',
      title: 'Disabled State',
      description: 'Non-interactive panel',
      code: `<amw-accordion>
  <amw-accordion-panel amwTitle="Disabled Panel" [disabled]="true">
    <p>This content cannot be accessed</p>
  </amw-accordion-panel>
</amw-accordion>`
    },
    {
      key: 'programmatic',
      title: 'Programmatic Control',
      description: 'Control expansion with methods',
      code: `<amw-accordion>
  <amw-accordion-panel #panel amwTitle="Programmatically Controlled">
    <p>Control this panel with methods</p>
  </amw-accordion-panel>
</amw-accordion>

<amw-button appearance="elevated" (click)="panel.expanded = true">Open</amw-button>
<amw-button appearance="elevated" (click)="panel.expanded = false">Close</amw-button>
<amw-button appearance="elevated" (click)="panel.expanded = !panel.expanded">Toggle</amw-button>`
    },
    {
      key: 'events',
      title: 'Event Handling',
      description: 'Listen to open and close events',
      code: `<amw-accordion>
  <amw-accordion-panel
    amwTitle="Event Handling"
    (opened)="onOpened()"
    (closed)="onClosed()">
    <p>Check console for event logs</p>
  </amw-accordion-panel>
</amw-accordion>`
    },
    {
      key: 'togglePosition',
      title: 'Toggle Position',
      description: 'Toggle indicator on the left',
      code: `<amw-accordion [togglePosition]="'before'">
  <amw-accordion-panel amwTitle="Toggle Before Title">
    <p>Toggle indicator on the left</p>
  </amw-accordion-panel>
</amw-accordion>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
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
