import { Component, ViewEncapsulation, TemplateRef, input, contentChild, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AmwColor } from '../../../shared/types/amw-color.type';

export type ToolbarPosition = 'static' | 'fixed' | 'sticky' | 'absolute';

/**
 * Angular Material Wrap Toolbar Component
 *
 * A comprehensive toolbar component that wraps Angular Material's mat-toolbar
 * with additional features and Material 3 theming support.
 *
 * @example
 * ```html
 * <amw-toolbar
 *   [color]="'primary'"
 *   [title]="'My Application'">
 *   <ng-template #toolbarActions>
 *     <amw-button variant="icon" icon="menu">
 *     </amw-button>
 *   </ng-template>
 * </amw-toolbar>
 * ```
 *
 * @example
 * ```html
 * <!-- With multiple rows -->
 * <amw-toolbar [color]="'primary'">
 *   <mat-toolbar-row>
 *     <span>First Row</span>
 *   </mat-toolbar-row>
 *   <mat-toolbar-row>
 *     <span>Second Row</span>
 *   </mat-toolbar-row>
 * </amw-toolbar>
 * ```
 */
@Component({
    selector: 'amw-toolbar',
    standalone: true,
    imports: [
        NgTemplateOutlet,
        MatToolbarModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-toolbar.component.html',
    styleUrl: './amw-toolbar.component.scss'
})
export class AmwToolbarComponent {
    /** Color of the toolbar */
    readonly color = input<AmwColor>('primary');
    /** Title text for the toolbar */
    readonly title = input<string | undefined>();
    /** Position of the toolbar */
    readonly position = input<ToolbarPosition>('static');
    /** Custom CSS class for the toolbar */
    readonly toolbarClass = input<string | undefined>();
    /** Whether the toolbar should be elevated */
    readonly elevated = input(false);

    readonly startTemplate = contentChild<TemplateRef<any>>('toolbarStart');
    readonly endTemplate = contentChild<TemplateRef<any>>('toolbarEnd');
    readonly actionsTemplate = contentChild<TemplateRef<any>>('toolbarActions');

    readonly toolbarClasses = computed(() => {
        const classes = ['amw-toolbar'];
        const customClass = this.toolbarClass();
        if (customClass) classes.push(customClass);
        const pos = this.position();
        if (pos) classes.push(`amw-toolbar--${pos}`);
        if (this.elevated()) classes.push('amw-toolbar--elevated');
        return classes.join(' ');
    });
}
