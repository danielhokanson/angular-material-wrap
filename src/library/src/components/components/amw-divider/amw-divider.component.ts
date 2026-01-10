import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { BaseComponent } from '../../../controls/components/base/base.component';

/**
 * Angular Material Wrap Divider Component
 *
 * A comprehensive divider component that wraps Angular Material's mat-divider
 * with additional features and Material 3 theming support.
 *
 * @example
 * ```html
 * <amw-divider></amw-divider>
 * ```
 *
 * @example
 * ```html
 * <!-- Vertical divider -->
 * <amw-divider [vertical]="true"></amw-divider>
 * ```
 *
 * @example
 * ```html
 * <!-- Inset divider -->
 * <amw-divider [inset]="true"></amw-divider>
 * ```
 */
@Component({
    selector: 'amw-divider',
    standalone: true,
    imports: [
        CommonModule,
        MatDividerModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-divider.component.html',
    styleUrl: './amw-divider.component.scss'
})
export class AmwDividerComponent extends BaseComponent {
    /** Whether the divider is vertical */
    @Input() vertical = false;
    /** Whether the divider is inset */
    @Input() inset = false;
    /** Custom CSS class for the divider */
    @Input() dividerClass?: string;

    get dividerClasses(): string {
        const classes = ['amw-divider'];
        if (this.dividerClass) classes.push(this.dividerClass);
        if (this.vertical) classes.push('amw-divider--vertical');
        if (this.inset) classes.push('amw-divider--inset');
        return classes.join(' ');
    }
}
