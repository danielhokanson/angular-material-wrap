import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

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
export class AmwDividerComponent {
    /** Whether the divider is vertical */
    readonly vertical = input(false);

    /** Whether the divider is inset */
    readonly inset = input(false);

    /** Custom CSS class for the divider */
    readonly dividerClass = input<string | undefined>();

    readonly dividerClasses = computed(() => {
        const classes = ['amw-divider'];
        const customClass = this.dividerClass();
        if (customClass) classes.push(customClass);
        if (this.vertical()) classes.push('amw-divider--vertical');
        if (this.inset()) classes.push('amw-divider--inset');
        return classes.join(' ');
    });
}
