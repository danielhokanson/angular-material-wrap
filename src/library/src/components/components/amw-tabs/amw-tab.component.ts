import { Component, TemplateRef, input, viewChild, contentChild, computed } from '@angular/core';

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
    template: `
        <ng-template #tabContent>
            <ng-content></ng-content>
        </ng-template>
    `
})
export class AmwTabComponent {
    /** Label for the tab */
    readonly label = input('');

    /** Icon for the tab */
    readonly icon = input<string | undefined>();

    /** Whether the tab is disabled */
    readonly disabled = input(false);

    /** Whether the tab is closable */
    readonly closable = input(false);

    /** Badge count for the tab */
    readonly badgeCount = input<number | undefined>();

    /** Badge color for the tab */
    readonly badgeColor = input<string | undefined>();

    /** Reference to the tab content template */
    readonly contentTemplate = viewChild.required<TemplateRef<any>>('tabContent');

    /** Custom header template provided by the user (for complex tab headers) */
    readonly headerTemplate = contentChild<TemplateRef<any>>('tabHeader');

    /** Whether this tab has a custom header template */
    readonly hasCustomHeader = computed(() => this.headerTemplate() !== undefined);
}
