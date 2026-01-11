import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';

type PopoverExamples = 'basic' | 'positions' | 'styling' | 'interactive';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwPopoverComponent } from '../../../../library/src/components/components/amw-popover/amw-popover.component';

@Component({
    selector: 'app-popover-code',
    standalone: true,
    imports: [
        FormsModule,
        AmwButtonComponent,
        AmwAccordionComponent,
        AmwAccordionPanelComponent,
        AmwIconComponent,
        AmwPopoverComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './popover-code.component.html',
    styleUrl: './popover-code.component.scss'
})
export class PopoverCodeComponent extends BaseCodeComponent<PopoverExamples> {
    // Original code examples (for reset functionality)
    readonly codeExamples: Record<PopoverExamples, string> = {
        basic: `<amw-popover [config]="{ position: 'bottom', showArrow: true }">
  <ng-template #trigger>
    <amw-button variant="elevated">Hover Me</amw-button>
  </ng-template>
  <ng-template #content>
    <p>This is a basic popover</p>
  </ng-template>
</amw-popover>`,

        positions: `<!-- Popover on top -->
<amw-popover [config]="{ position: 'top', showArrow: true }">
  <ng-template #trigger>
    <amw-button variant="text">Top</amw-button>
  </ng-template>
  <ng-template #content>
    <p>Popover on top</p>
  </ng-template>
</amw-popover>

<!-- Popover on right -->
<amw-popover [config]="{ position: 'right', showArrow: true }">
  <ng-template #trigger>
    <amw-button variant="text">Right</amw-button>
  </ng-template>
  <ng-template #content>
    <p>Popover on right</p>
  </ng-template>
</amw-popover>

<!-- Popover on bottom -->
<amw-popover [config]="{ position: 'bottom', showArrow: true }">
  <ng-template #trigger>
    <amw-button variant="text">Bottom</amw-button>
  </ng-template>
  <ng-template #content>
    <p>Popover on bottom</p>
  </ng-template>
</amw-popover>

<!-- Popover on left -->
<amw-popover [config]="{ position: 'left', showArrow: true }">
  <ng-template #trigger>
    <amw-button variant="text">Left</amw-button>
  </ng-template>
  <ng-template #content>
    <p>Popover on left</p>
  </ng-template>
</amw-popover>`,

        styling: `<amw-popover [config]="{ position: 'bottom', showArrow: true, size: 'large' }">
  <ng-template #trigger>
    <amw-button variant="elevated" color="primary">Custom Popover</amw-button>
  </ng-template>
  <ng-template #content>
    <p>Custom styled popover content</p>
  </ng-template>
</amw-popover>`,

        interactive: `<amw-popover
  [config]="{ position: 'bottom', showArrow: true, showClose: true, disabled: popoverDisabled }">
  <ng-template #trigger>
    <amw-button variant="elevated" (click)="togglePopover()">Toggle Popover</amw-button>
  </ng-template>
  <ng-template #content>
    <p>Click to show/hide</p>
  </ng-template>
</amw-popover>`
    };

    // State for interactive example
    tooltipDisabled = false;

    constructor() {
        super();
    }

    // Toggle tooltip state
    toggleTooltip() {
        this.tooltipDisabled = !this.tooltipDisabled;
        console.log('Tooltip disabled:', this.tooltipDisabled);
    }
}
