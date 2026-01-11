import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BaseCodeComponent } from '../base/base-code.component';

type PopoverExamples = 'basic' | 'positions' | 'styling' | 'interactive';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent } from '../../../../library/src/components/components';
@Component({
    selector: 'app-popover-code',
    standalone: true,
    imports: [FormsModule,
    MatTooltipModule,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './popover-code.component.html',
    styleUrl: './popover-code.component.scss'
})
export class PopoverCodeComponent extends BaseCodeComponent<PopoverExamples> {
    // Original code examples (for reset functionality)
    readonly codeExamples: Record<PopoverExamples, string> = {
        basic: `<amw-button variant="elevated"
        matTooltip="This is a basic tooltip">
  Hover Me
</amw-button>`,

        positions: `<!-- Tooltip on top -->
<amw-button variant="text"
        matTooltip="Tooltip on top"
        matTooltipPosition="above">
  Top
</amw-button>

<!-- Tooltip on right -->
<amw-button variant="text"
        matTooltip="Tooltip on right"
        matTooltipPosition="after">
  Right
</amw-button>

<!-- Tooltip on bottom -->
<amw-button variant="text"
        matTooltip="Tooltip on bottom"
        matTooltipPosition="below">
  Bottom
</amw-button>

<!-- Tooltip on left -->
<amw-button variant="text"
        matTooltip="Tooltip on left"
        matTooltipPosition="before">
  Left
</amw-button>`,

        styling: `<amw-button variant="elevated"
        matTooltip="Custom styled tooltip"
        matTooltipClass="custom-tooltip"
        color="primary">
  Custom Tooltip
</amw-button>`,

        interactive: `<amw-button variant="elevated"
        matTooltip="Click to show/hide"
        matTooltipShowDelay="500"
        matTooltipHideDelay="200"
        [matTooltipDisabled]="tooltipDisabled"
        (click)="toggleTooltip()">
  Toggle Tooltip
</amw-button>`
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
