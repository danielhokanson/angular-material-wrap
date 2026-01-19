import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AmwColor } from '../../../shared/types/amw-color.type';

export type ProgressBarMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';

/**
 * Angular Material Wrap Progress Bar Component
 *
 * A comprehensive progress bar component that wraps Angular Material's mat-progress-bar
 * with additional features and Material 3 theming support.
 *
 * @example
 * ```html
 * <amw-progress-bar
 *   [value]="75"
 *   [mode]="'determinate'"
 *   [color]="'primary'">
 * </amw-progress-bar>
 * ```
 *
 * @example
 * ```html
 * <!-- Indeterminate loading -->
 * <amw-progress-bar
 *   [mode]="'indeterminate'"
 *   [color]="'accent'">
 * </amw-progress-bar>
 * ```
 *
 * @example
 * ```html
 * <!-- Buffer mode -->
 * <amw-progress-bar
 *   [value]="60"
 *   [bufferValue]="80"
 *   [mode]="'buffer'"
 *   [color]="'primary'">
 * </amw-progress-bar>
 * ```
 */
@Component({
    selector: 'amw-progress-bar',
    standalone: true,
    imports: [
        MatProgressBarModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-progress-bar.component.html',
    styleUrl: './amw-progress-bar.component.scss'
})
export class AmwProgressBarComponent {
    /** Mode of the progress bar */
    readonly mode = input<ProgressBarMode>('determinate');

    /**
     * Value of the progress (0-100)
     * @deprecated Use `value` instead. This input is kept for backwards compatibility.
     */
    readonly progressValue = input(0);

    /**
     * Value of the progress (0-100)
     * This is the preferred input name. If both `value` and `progressValue` are set,
     * `value` takes precedence.
     */
    readonly value = input<number | undefined>();

    /** Buffer value (only for buffer mode, 0-100) */
    readonly bufferValue = input(0);

    /** Color of the progress bar */
    readonly color = input<AmwColor>('primary');

    /** Custom CSS class for the progress bar */
    readonly progressClass = input<string | undefined>();

    /** Whether to show the percentage label */
    readonly showLabel = input(false);

    /** Custom label text (overrides percentage) */
    readonly label = input('');

    /**
     * Computed effective value - prefers `value` over `progressValue` for backwards compatibility
     */
    readonly effectiveValue = computed(() => {
        const value = this.value();
        return value !== undefined ? value : this.progressValue();
    });

    readonly progressBarClasses = computed(() => {
        const classes = ['amw-progress-bar'];
        const customClass = this.progressClass();
        if (customClass) classes.push(customClass);
        if (this.showLabel()) classes.push('amw-progress-bar--with-label');
        return classes.join(' ');
    });

    readonly displayLabel = computed(() => {
        const labelValue = this.label();
        if (labelValue) {
            return labelValue;
        }
        if (this.showLabel() && this.mode() === 'determinate') {
            return `${Math.round(this.effectiveValue())}%`;
        }
        return '';
    });
}
