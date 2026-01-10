import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseComponent } from '../../../controls/components/base/base.component';
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
        CommonModule,
        MatProgressSpinnerModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-progress-spinner.component.html',
    styleUrl: './amw-progress-spinner.component.scss'
})
export class AmwProgressSpinnerComponent extends BaseComponent {
    /** Mode of the spinner */
    @Input() mode: SpinnerMode = 'indeterminate';
    /** Value of the progress (0-100, only for determinate mode) */
    @Input() progressValue: number = 0;
    /** Diameter of the spinner in pixels */
    @Input() diameter: number = 40;
    /** Stroke width of the spinner */
    @Input() strokeWidth?: number;
    /** Color of the spinner */
    @Input() color: AmwColor = 'primary';
    /** Custom CSS class for the spinner */
    @Input() spinnerClass?: string;
    /** Whether to show the percentage label (only for determinate mode) */
    @Input() showLabel = false;
    /** Custom label text (overrides percentage) */
    @Input() override label: string = '';

    get spinnerClasses(): string {
        const classes = ['amw-progress-spinner'];
        if (this.spinnerClass) classes.push(this.spinnerClass);
        if (this.showLabel) classes.push('amw-progress-spinner--with-label');
        return classes.join(' ');
    }

    get displayLabel(): string {
        if (this.label) {
            return this.label;
        }
        if (this.showLabel && this.mode === 'determinate') {
            return `${Math.round(this.progressValue)}%`;
        }
        return '';
    }
}
