import { Component, Input, TemplateRef, ViewChild, ContentChild, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Angular Material Wrap Tab Component
 *
 * A single tab component used as a child of AmwTabsComponent for content projection.
 *
 * @example
 * ```html
 * <amw-tabs>
 *   <amw-tab label="First Tab">
 *     <p>Content for first tab</p>
 *   </amw-tab>
 *   <amw-tab label="Second Tab">
 *     <p>Content for second tab</p>
 *   </amw-tab>
 * </amw-tabs>
 * ```
 */
@Component({
    selector: 'amw-tab',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-template #tabContent>
            <ng-content></ng-content>
        </ng-template>
        <ng-template #tabLabel>
            <ng-content select="[mat-tab-label]"></ng-content>
        </ng-template>
    `
})
export class AmwTabComponent implements AfterContentInit {
    /** Label for the tab */
    @Input() label: string = '';

    /** Icon for the tab */
    @Input() icon?: string;

    /** Whether the tab is disabled */
    @Input() disabled: boolean = false;

    /** Whether the tab is closable */
    @Input() closable: boolean = false;

    /** Badge count for the tab */
    @Input() badgeCount?: number;

    /** Badge color for the tab */
    @Input() badgeColor?: string;

    /** Reference to the tab content template */
    @ViewChild('tabContent', { static: true }) contentTemplate!: TemplateRef<any>;

    /** Reference to the tab label template (for custom labels with icons) */
    @ViewChild('tabLabel', { static: true }) labelTemplate!: TemplateRef<any>;

    /** Custom label template provided by the user */
    @ContentChild('matTabLabel') customLabelTemplate?: TemplateRef<any>;

    /** Whether this tab has custom label content */
    hasCustomLabel: boolean = false;

    ngAfterContentInit(): void {
        this.hasCustomLabel = this.customLabelTemplate !== undefined;
    }
}
