import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BaseCodeComponent } from '../base/base-code.component';

type PopoverExamples = 'basic' | 'positions' | 'styling' | 'interactive';

@Component({
    selector: 'app-popover-code',
    standalone: true,
    imports: [
        FormsModule,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './popover-code.component.html',
    styleUrl: './popover-code.component.scss'
})
export class PopoverCodeComponent extends BaseCodeComponent<PopoverExamples> {
    // Original code examples (for reset functionality)
    readonly codeExamples: Record<PopoverExamples, string> = {
        basic: `<button mat-raised-button
        matTooltip="This is a basic tooltip">
  Hover Me
</button>`,

        positions: `<!-- Tooltip on top -->
<button mat-button
        matTooltip="Tooltip on top"
        matTooltipPosition="above">
  Top
</button>

<!-- Tooltip on right -->
<button mat-button
        matTooltip="Tooltip on right"
        matTooltipPosition="after">
  Right
</button>

<!-- Tooltip on bottom -->
<button mat-button
        matTooltip="Tooltip on bottom"
        matTooltipPosition="below">
  Bottom
</button>

<!-- Tooltip on left -->
<button mat-button
        matTooltip="Tooltip on left"
        matTooltipPosition="before">
  Left
</button>`,

        styling: `<button mat-raised-button
        matTooltip="Custom styled tooltip"
        matTooltipClass="custom-tooltip"
        color="primary">
  Custom Tooltip
</button>`,

        interactive: `<button mat-raised-button
        matTooltip="Click to show/hide"
        matTooltipShowDelay="500"
        matTooltipHideDelay="200"
        [matTooltipDisabled]="tooltipDisabled"
        (click)="toggleTooltip()">
  Toggle Tooltip
</button>`
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
