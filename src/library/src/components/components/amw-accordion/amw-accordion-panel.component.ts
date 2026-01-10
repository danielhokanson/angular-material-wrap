import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BaseComponent } from '../../../controls/components/base/base.component';

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
        CommonModule,
        MatExpansionModule,
        MatIconModule
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <mat-expansion-panel
            [expanded]="expanded"
            [disabled]="disabled"
            [hideToggle]="hideToggle"
            (opened)="opened.emit()"
            (closed)="closed.emit()"
            (expandedChange)="expandedChange.emit($event)">

            <mat-expansion-panel-header *ngIf="hasHeader">
                <mat-panel-title>
                    <ng-container *ngIf="headerTemplate" [ngTemplateOutlet]="headerTemplate"></ng-container>
                    <ng-container *ngIf="!headerTemplate && amwTitle">{{ amwTitle }}</ng-container>
                </mat-panel-title>
                <mat-panel-description *ngIf="amwDescription">
                    {{ amwDescription }}
                </mat-panel-description>
            </mat-expansion-panel-header>

            <ng-content></ng-content>
        </mat-expansion-panel>
    `,
    styleUrls: ['./amw-accordion-panel.component.scss']
})
export class AmwAccordionPanelComponent extends BaseComponent {
    /** Simple title for the panel header */
    @Input() amwTitle = '';

    /** Optional description shown in the header */
    @Input() amwDescription = '';

    /** Whether the panel is expanded */
    @Input() expanded = false;

    /** Whether the panel is disabled */
    @Input() override disabled = false;

    /** Whether to hide the toggle indicator */
    @Input() hideToggle = false;

    /** Emitted when the panel is opened */
    @Output() opened = new EventEmitter<void>();

    /** Emitted when the panel is closed */
    @Output() closed = new EventEmitter<void>();

    /** Emitted when the expanded state changes */
    @Output() expandedChange = new EventEmitter<boolean>();

    /** Custom header template reference */
    @ContentChild('header') headerTemplate?: TemplateRef<any>;

    /**
     * Determines if the panel should show a header
     */
    get hasHeader(): boolean {
        return !!(this.headerTemplate || this.amwTitle || this.amwDescription);
    }
}
