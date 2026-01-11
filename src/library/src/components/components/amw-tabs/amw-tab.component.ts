import { Component, Input, TemplateRef, ViewChild, ContentChild, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Angular Material Wrap Tab Component
 *
 * A single tab component used as a child of AmwTabsComponent for content projection.
 *
 * @example
 * ```html
 * <!-- Simple usage with label and icon inputs -->
 * <amw-tabs>
 *   <amw-tab label="Home" icon="home">
 *     <p>Content for home tab</p>
 *   </amw-tab>
 *   <amw-tab label="Settings" icon="settings">
 *     <p>Content for settings tab</p>
 *   </amw-tab>
 * </amw-tabs>
 *
 * <!-- Complex usage with custom header template -->
 * <amw-tabs>
 *   <amw-tab>
 *     <ng-template #tabHeader>
 *       <amw-icon name="home"></amw-icon>
 *       <span>Custom Header</span>
 *     </ng-template>
 *     <p>Content for tab with custom header</p>
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

    /** Custom header template provided by the user (for complex tab headers) */
    @ContentChild('tabHeader') headerTemplate?: TemplateRef<any>;

    /** Whether this tab has a custom header template */
    hasCustomHeader: boolean = false;

    ngAfterContentInit(): void {
        this.hasCustomHeader = this.headerTemplate !== undefined;
    }
}
