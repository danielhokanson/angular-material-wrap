import { Component, ViewEncapsulation, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

/**
 * Angular Material Wrap Accordion Container Component
 *
 * A simple wrapper around mat-accordion that accepts amw-accordion-panel children.
 * Supports content projection for flexible accordion implementations.
 *
 * @example
 * Simple usage with title input:
 * ```html
 * <amw-accordion>
 *   <amw-accordion-panel amwTitle="Personal Information">
 *     <amw-input label="First Name"></amw-input>
 *   </amw-accordion-panel>
 * </amw-accordion>
 * ```
 *
 * @example
 * Advanced usage with custom header template:
 * ```html
 * <amw-accordion [multi]="true">
 *   <amw-accordion-panel>
 *     <ng-template #header>
 *       <h3><mat-icon>person</mat-icon> Personal Info</h3>
 *     </ng-template>
 *     <amw-input label="First Name"></amw-input>
 *   </amw-accordion-panel>
 * </amw-accordion>
 * ```
 */
@Component({
    selector: 'amw-accordion',
    standalone: true,
    imports: [
        MatExpansionModule
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <mat-accordion
            [multi]="multi()"
            [displayMode]="displayMode()"
            [togglePosition]="togglePosition()"
            [hideToggle]="hideToggle()">
            <ng-content></ng-content>
        </mat-accordion>
    `,
    styleUrls: ['./amw-accordion.component.scss']
})
export class AmwAccordionComponent {
    /** Whether multiple panels can be expanded simultaneously */
    readonly multi = input(false);

    /** Display mode for the accordion */
    readonly displayMode = input<'default' | 'flat'>('default');

    /** Position of the toggle indicator */
    readonly togglePosition = input<'before' | 'after'>('after');

    /** Whether to hide the toggle indicator for all panels */
    readonly hideToggle = input(false);
}
