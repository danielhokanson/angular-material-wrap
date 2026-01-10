import { Component, Input, ViewEncapsulation, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BaseComponent } from '../../../controls/components/base/base.component';
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
        CommonModule,
        MatToolbarModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-toolbar.component.html',
    styleUrl: './amw-toolbar.component.scss'
})
export class AmwToolbarComponent extends BaseComponent {
    /** Color of the toolbar */
    @Input() color: AmwColor = 'primary';
    /** Title text for the toolbar */
    @Input() title?: string;
    /** Position of the toolbar */
    @Input() position: ToolbarPosition = 'static';
    /** Custom CSS class for the toolbar */
    @Input() toolbarClass?: string;
    /** Whether the toolbar should be elevated */
    @Input() elevated = false;

    @ContentChild('toolbarStart') startTemplate?: TemplateRef<any>;
    @ContentChild('toolbarEnd') endTemplate?: TemplateRef<any>;
    @ContentChild('toolbarActions') actionsTemplate?: TemplateRef<any>;

    get toolbarClasses(): string {
        const classes = ['amw-toolbar'];
        if (this.toolbarClass) classes.push(this.toolbarClass);
        if (this.position) classes.push(`amw-toolbar--${this.position}`);
        if (this.elevated) classes.push('amw-toolbar--elevated');
        return classes.join(' ');
    }
}
