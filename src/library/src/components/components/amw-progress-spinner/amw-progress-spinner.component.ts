import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AmwColor } from '../../../shared/types/amw-color.type';

export type SpinnerMode = 'determinate' | 'indeterminate';

/**
 * Angular Material Wrap Progress Spinner Component
 *
 * A comprehensive spinner component that wraps Angular Material's mat-progress-spinner
 * with additional features and Material 3 theming support.
 *
 * @example
 * ```html
 * <amw-progress-spinner
 *   [mode]="'indeterminate'"
 *   [diameter]="50"
 *   [color]="'primary'">
 * </amw-progress-spinner>
 * ```
 *
 * @example
 * ```html
 * <!-- Determinate spinner with value -->
 * <amw-progress-spinner
 *   [mode]="'determinate'"
 *   [value]="75"
 *   [diameter]="60"
 *   [strokeWidth]="8"
 *   [showLabel]="true">
 * </amw-progress-spinner>
 * ```
 */
@Component({
    selector: 'amw-progress-spinner',
    standalone: true,
    imports: [
        MatProgressSpinnerModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-progress-spinner.component.html',
    styleUrl: './amw-progress-spinner.component.scss'
})
export class AmwProgressSpinnerComponent {
    /** Mode of the spinner */
    readonly mode = input<SpinnerMode>('indeterminate');

    /** Value of the progress (0-100, only for determinate mode) */
    readonly progressValue = input(0);

    /** Diameter of the spinner in pixels */
    readonly diameter = input(40);

    /** Stroke width of the spinner */
    readonly strokeWidth = input<number | undefined>();

    /** Color of the spinner */
    readonly color = input<AmwColor>('primary');

    /** Custom CSS class for the spinner */
    readonly spinnerClass = input<string | undefined>();

    /** Whether to show the percentage label (only for determinate mode) */
    readonly showLabel = input(false);

    /** Custom label text (overrides percentage) */
    readonly label = input('');

    readonly spinnerClasses = computed(() => {
        const classes = ['amw-progress-spinner'];
        const customClass = this.spinnerClass();
        if (customClass) classes.push(customClass);
        if (this.showLabel()) classes.push('amw-progress-spinner--with-label');
        return classes.join(' ');
    });

    readonly displayLabel = computed(() => {
        const labelValue = this.label();
        if (labelValue) {
            return labelValue;
        }
        if (this.showLabel() && this.mode() === 'determinate') {
            return `${Math.round(this.progressValue())}%`;
        }
        return '';
    });
}
