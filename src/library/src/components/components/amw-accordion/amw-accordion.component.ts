import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Subject, takeUntil } from 'rxjs';
import { BaseComponent } from '../../../controls/components/base/base.component';
import { AccordionConfig, AccordionPanel } from './interfaces';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';

/**
 * Angular Material Wrap Accordion Component
 * 
 * A flexible accordion component that provides collapsible panels
 * with comprehensive configuration options and accessibility support.
 * 
 * @example
 * ```html
 * <amw-accordion
 *   [config]="accordionConfig"
 *   [panels]="accordionPanels"
 *   [expandedPanels]="[0, 2]"
 *   (panelToggle)="onPanelToggle($event)"
 *   (panelExpand)="onPanelExpand($event)"
 *   (panelCollapse)="onPanelCollapse($event)">
 * </amw-accordion>
 * ```
 */
@Component({
    selector: 'amw-accordion',
    standalone: true,
    imports: [
    MatExpansionModule,
    AmwButtonComponent,
    MatIconModule,
    MatCardModule,
    MatDividerModule
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-accordion.component.html',
    styleUrl: './amw-accordion.component.scss'
})
export class AmwAccordionComponent extends BaseComponent implements OnInit, OnDestroy {
    /** Accordion configuration */
    @Input() config?: AccordionConfig;

    /** Array of accordion panels */
    @Input() panels: AccordionPanel[] = [];

    /** Array of expanded panel indices */
    @Input() expandedPanels: number[] = [];

    /** Whether the accordion is disabled */
    @Input() override disabled: boolean = false;

    /** Whether multiple panels can be expanded */
    @Input() multiExpand: boolean = true;

    /** Whether to show panel icons */
    @Input() showIcons: boolean = true;

    /** Whether to show panel descriptions */
    @Input() showDescriptions: boolean = true;

    /** Whether to show panel badges */
    @Input() showBadges: boolean = true;

    /** Panel toggle event */
    @Output() panelToggle = new EventEmitter<{ panelIndex: number; isExpanded: boolean }>();

    /** Panel expand event */
    @Output() panelExpand = new EventEmitter<number>();

    /** Panel collapse event */
    @Output() panelCollapse = new EventEmitter<number>();

    /** Panel validation event */
    @Output() panelValidated = new EventEmitter<{ panelIndex: number; isValid: boolean }>();

    /** Current accordion configuration */
    currentConfig: AccordionConfig = {};

    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        this.initializeConfig();
        this.validatePanels();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Initializes the accordion configuration
     */
    private initializeConfig(): void {
        this.currentConfig = {
            multiExpand: true,
            showIcons: true,
            showDescriptions: true,
            showBadges: true,
            animationDuration: 300,
            animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            ...this.config
        };
    }

    /**
     * Validates all panels
     */
    private validatePanels(): void {
        this.panels.forEach((panel, index) => {
            if (panel.validator) {
                const isValid = panel.validator(panel);
                panel.isValid = isValid;
                this.panelValidated.emit({ panelIndex: index, isValid });
            }
        });
    }

    /**
     * Toggles a panel
     */
    togglePanel(panelIndex: number): void {
        if (this.isValidPanelIndex(panelIndex) && this.canTogglePanel(panelIndex)) {
            const isExpanded = this.isPanelExpanded(panelIndex);

            if (isExpanded) {
                this.collapsePanel(panelIndex);
            } else {
                this.expandPanel(panelIndex);
            }
        }
    }

    /**
     * Expands a panel
     */
    expandPanel(panelIndex: number): void {
        if (this.isValidPanelIndex(panelIndex) && this.canExpandPanel(panelIndex)) {
            if (!this.currentConfig.multiExpand) {
                // Close all other panels
                this.expandedPanels = [];
            }

            if (!this.isPanelExpanded(panelIndex)) {
                this.expandedPanels.push(panelIndex);
                this.panelExpand.emit(panelIndex);
                this.panelToggle.emit({ panelIndex, isExpanded: true });
                this.cdr.detectChanges();
            }
        }
    }

    /**
     * Collapses a panel
     */
    collapsePanel(panelIndex: number): void {
        if (this.isValidPanelIndex(panelIndex)) {
            const index = this.expandedPanels.indexOf(panelIndex);
            if (index > -1) {
                this.expandedPanels.splice(index, 1);
                this.panelCollapse.emit(panelIndex);
                this.panelToggle.emit({ panelIndex, isExpanded: false });
                this.cdr.detectChanges();
            }
        }
    }

    /**
     * Expands all panels
     */
    expandAll(): void {
        this.expandedPanels = this.panels.map((_, index) => index);
        this.panels.forEach((_, index) => {
            this.panelExpand.emit(index);
            this.panelToggle.emit({ panelIndex: index, isExpanded: true });
        });
        this.cdr.detectChanges();
    }

    /**
     * Collapses all panels
     */
    collapseAll(): void {
        this.panels.forEach((_, index) => {
            this.panelCollapse.emit(index);
            this.panelToggle.emit({ panelIndex: index, isExpanded: false });
        });
        this.expandedPanels = [];
        this.cdr.detectChanges();
    }

    /**
     * Checks if panel index is valid
     */
    private isValidPanelIndex(panelIndex: number): boolean {
        return panelIndex >= 0 && panelIndex < this.panels.length;
    }

    /**
     * Checks if panel can be toggled
     */
    private canTogglePanel(panelIndex: number): boolean {
        const panel = this.panels[panelIndex];
        return panel && !panel.isDisabled && !this.disabled;
    }

    /**
     * Checks if panel can be expanded
     */
    private canExpandPanel(panelIndex: number): boolean {
        return this.canTogglePanel(panelIndex);
    }

    /**
     * Checks if panel is expanded
     */
    isPanelExpanded(panelIndex: number): boolean {
        return this.expandedPanels.includes(panelIndex);
    }

    /**
     * Checks if panel is disabled
     */
    isPanelDisabled(panelIndex: number): boolean {
        return this.panels[panelIndex]?.isDisabled || this.disabled;
    }

    /**
     * Checks if panel is valid
     */
    isPanelValid(panelIndex: number): boolean {
        return this.panels[panelIndex]?.isValid !== false;
    }

    /**
     * Gets panel badge count
     */
    getPanelBadgeCount(panelIndex: number): number {
        return this.panels[panelIndex]?.badgeCount || 0;
    }

    /**
     * Checks if panel has badge
     */
    hasPanelBadge(panelIndex: number): boolean {
        return this.getPanelBadgeCount(panelIndex) > 0;
    }

    /**
     * Gets the number of expanded panels
     */
    getExpandedCount(): number {
        return this.expandedPanels.length;
    }

    /**
     * Checks if all panels are expanded
     */
    areAllExpanded(): boolean {
        return this.expandedPanels.length === this.panels.length;
    }

    /**
     * Checks if all panels are collapsed
     */
    areAllCollapsed(): boolean {
        return this.expandedPanels.length === 0;
    }
}
