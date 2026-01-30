import { Component, TemplateRef, ViewEncapsulation, input, output, contentChild, computed, model } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

/**
 * Angular Material Wrap Accordion Panel Component
 *
 * A wrapper around mat-expansion-panel that provides a simpler API
 * with support for both simple title-based headers and custom template headers.
 *
 * @example
 * Simple usage with title:
 * ```html
 * <amw-accordion-panel amwTitle="Personal Information">
 *   <amw-input label="First Name"></amw-input>
 * </amw-accordion-panel>
 * ```
 *
 * @example
 * Advanced usage with custom header:
 * ```html
 * <amw-accordion-panel>
 *   <ng-template #header>
 *     <h3><mat-icon>person</mat-icon> Personal Information</h3>
 *   </ng-template>
 *   <amw-input label="First Name"></amw-input>
 * </amw-accordion-panel>
 * ```
 */
@Component({
    selector: 'amw-accordion-panel',
    standalone: true,
    imports: [
        NgTemplateOutlet,
        MatExpansionModule
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <mat-expansion-panel
            [expanded]="expanded()"
            [disabled]="disabled()"
            [hideToggle]="hideToggle()"
            (opened)="onOpened()"
            (closed)="onClosed()"
            (expandedChange)="onExpandedChange($event)">

            @if (hasHeader()) {
                <mat-expansion-panel-header>
                    <mat-panel-title>
                        @if (headerTemplate()) {
                            <ng-container [ngTemplateOutlet]="headerTemplate()!"></ng-container>
                        } @else if (amwTitle()) {
                            {{ amwTitle() }}
                        }
                    </mat-panel-title>
                    @if (amwDescription()) {
                        <mat-panel-description>
                            {{ amwDescription() }}
                        </mat-panel-description>
                    }
                </mat-expansion-panel-header>
            }

            <ng-content></ng-content>
        </mat-expansion-panel>
    `,
    styleUrls: ['./amw-accordion-panel.component.scss']
})
export class AmwAccordionPanelComponent {
    /** Simple title for the panel header */
    readonly amwTitle = input('');

    /** Optional description shown in the header */
    readonly amwDescription = input('');

    /** Whether the panel is expanded (supports two-way binding) */
    readonly expanded = model(false);

    /** Whether the panel is disabled */
    readonly disabled = input(false);

    /** Whether to hide the toggle indicator */
    readonly hideToggle = input(false);

    /** Emitted when the panel is opened */
    readonly opened = output<void>();

    /** Emitted when the panel is closed */
    readonly closed = output<void>();

    /** Emitted when the expanded state changes */
    readonly expandedChange = output<boolean>();

    /** Custom header template reference */
    readonly headerTemplate = contentChild<TemplateRef<any>>('header');

    /**
     * Determines if the panel should show a header
     */
    readonly hasHeader = computed(() => {
        return !!(this.headerTemplate() || this.amwTitle() || this.amwDescription());
    });

    /** Handles panel opened event */
    onOpened(): void {
        this.expanded.set(true);
        this.opened.emit();
    }

    /** Handles panel closed event */
    onClosed(): void {
        this.expanded.set(false);
        this.closed.emit();
    }

    /** Handles expanded state change */
    onExpandedChange(isExpanded: boolean): void {
        this.expanded.set(isExpanded);
        this.expandedChange.emit(isExpanded);
    }
}
