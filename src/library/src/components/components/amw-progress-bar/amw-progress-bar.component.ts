import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BaseComponent } from '../../../controls/components/base/base.component';
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
        CommonModule,
        MatProgressBarModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-progress-bar.component.html',
    styleUrl: './amw-progress-bar.component.scss'
})
export class AmwProgressBarComponent extends BaseComponent {
    /** Mode of the progress bar */
    @Input() mode: ProgressBarMode = 'determinate';
    /** Value of the progress (0-100) */
    @Input() value: number = 0;
    /** Buffer value (only for buffer mode, 0-100) */
    @Input() bufferValue: number = 0;
    /** Color of the progress bar */
    @Input() color: AmwColor = 'primary';
    /** Custom CSS class for the progress bar */
    @Input() progressClass?: string;
    /** Whether to show the percentage label */
    @Input() showLabel = false;
    /** Custom label text (overrides percentage) */
    @Input() label?: string;

    get progressBarClasses(): string {
        const classes = ['amw-progress-bar'];
        if (this.progressClass) classes.push(this.progressClass);
        if (this.showLabel) classes.push('amw-progress-bar--with-label');
        return classes.join(' ');
    }

    get displayLabel(): string {
        if (this.label) {
            return this.label;
        }
        if (this.showLabel && this.mode === 'determinate') {
            return `${Math.round(this.value)}%`;
        }
        return '';
    }
}
