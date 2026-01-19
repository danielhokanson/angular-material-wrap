import { Component, ViewEncapsulation } from '@angular/core';
import { BaseCodeComponent } from '../base/base-code.component';

type ExpansionCodeExamples = 'basic' | 'withDescription' | 'accordion' | 'multiMode' | 'events' | 'disabled';

@Component({
    selector: 'amw-demo-expansion-code',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './expansion-code.component.html',
    styleUrl: './expansion-code.component.scss'
})
export class ExpansionCodeComponent extends BaseCodeComponent<ExpansionCodeExamples> {
    readonly codeExamples: Record<ExpansionCodeExamples, string> = {
        basic: `<!-- Basic Expansion Panel -->
<amw-expansion-panel>
  <amw-expansion-panel-header>
    <amw-panel-title>Panel Title</amw-panel-title>
  </amw-expansion-panel-header>
  <p>Panel content goes here.</p>
</amw-expansion-panel>`,

        withDescription: `<!-- Panel with Title and Description -->
<amw-expansion-panel>
  <amw-expansion-panel-header>
    <amw-panel-title>Personal Information</amw-panel-title>
    <amw-panel-description>Enter your details</amw-panel-description>
  </amw-expansion-panel-header>
  <form>
    <!-- Form fields here -->
  </form>
</amw-expansion-panel>`,

        accordion: `<!-- Accordion (Single Panel Mode) -->
<amw-accordion [multi]="false">
  <amw-expansion-panel>
    <amw-expansion-panel-header>
      <amw-panel-title>Question 1</amw-panel-title>
    </amw-expansion-panel-header>
    <p>Answer 1</p>
  </amw-expansion-panel>

  <amw-expansion-panel>
    <amw-expansion-panel-header>
      <amw-panel-title>Question 2</amw-panel-title>
    </amw-expansion-panel-header>
    <p>Answer 2</p>
  </amw-expansion-panel>

  <amw-expansion-panel>
    <amw-expansion-panel-header>
      <amw-panel-title>Question 3</amw-panel-title>
    </amw-expansion-panel-header>
    <p>Answer 3</p>
  </amw-expansion-panel>
</amw-accordion>

<!-- Only one panel can be open at a time -->`,

        multiMode: `<!-- Accordion (Multi Panel Mode) -->
<amw-accordion [multi]="true">
  <amw-expansion-panel>
    <amw-expansion-panel-header>
      <amw-panel-title>Section 1</amw-panel-title>
    </amw-expansion-panel-header>
    <p>Content 1</p>
  </amw-expansion-panel>

  <amw-expansion-panel>
    <amw-expansion-panel-header>
      <amw-panel-title>Section 2</amw-panel-title>
    </amw-expansion-panel-header>
    <p>Content 2</p>
  </amw-expansion-panel>
</amw-accordion>

<!-- Multiple panels can be open simultaneously -->`,

        events: `<!-- Panel with Events -->
<amw-expansion-panel
  [expanded]="isExpanded"
  (opened)="onOpened()"
  (closed)="onClosed()"
  (expandedChange)="onExpandedChange($event)">
  <amw-expansion-panel-header>
    <amw-panel-title>Interactive Panel</amw-panel-title>
  </amw-expansion-panel-header>
  <p>Content here</p>
</amw-expansion-panel>

<!-- In component -->
isExpanded = false;

onOpened() {
  console.log('Panel opened');
}

onClosed() {
  console.log('Panel closed');
}

onExpandedChange(expanded: boolean) {
  this.isExpanded = expanded;
}`,

        disabled: `<!-- Disabled Panel -->
<amw-expansion-panel [disabled]="true">
  <amw-expansion-panel-header>
    <amw-panel-title>Disabled Panel</amw-panel-title>
  </amw-expansion-panel-header>
  <p>This content is not accessible.</p>
</amw-expansion-panel>

<!-- Conditionally disabled -->
<amw-expansion-panel [disabled]="!previousStepComplete">
  <amw-expansion-panel-header>
    <amw-panel-title>Step 2</amw-panel-title>
  </amw-expansion-panel-header>
  <p>Complete step 1 first.</p>
</amw-expansion-panel>`
    };

    constructor() {
        super();
    }
}
