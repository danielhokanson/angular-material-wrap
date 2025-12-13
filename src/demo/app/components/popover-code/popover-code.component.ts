import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    templateUrl: './popover-code.component.html',
    styleUrl: './popover-code.component.scss'
})
export class PopoverCodeComponent {
    // Editable code examples
    editableCode = {
        basic: '',
        positions: '',
        styling: '',
        interactive: ''
    };

    // Original code examples (for reset functionality)
    readonly codeExamples = {
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

    // Toggle tooltip state
    toggleTooltip() {
        this.tooltipDisabled = !this.tooltipDisabled;
        console.log('Tooltip disabled:', this.tooltipDisabled);
    }
}
