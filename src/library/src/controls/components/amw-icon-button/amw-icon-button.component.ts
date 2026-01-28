import { Component, ViewEncapsulation, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { AmwIconComponent } from '../../../components/components/amw-icon/amw-icon.component';
import { AmwProgressSpinnerComponent } from '../../../components/components/amw-progress-spinner/amw-progress-spinner.component';

/** Icon button size type */
export type AmwIconButtonSize = 'sm' | 'md' | 'lg';

/** Icon button color type */
export type AmwIconButtonColor = 'primary' | 'accent' | 'warn';

/**
 * Angular Material Wrap Icon Button Component
 *
 * A circular button containing only an icon. Provides consistent styling,
 * accessibility features, and loading state support.
 *
 * @example
 * Basic usage:
 * ```html
 * <amw-icon-button icon="close" ariaLabel="Close dialog" (buttonClick)="close()"></amw-icon-button>
 * ```
 *
 * @example
 * With color and size:
 * ```html
 * <amw-icon-button
 *   icon="delete"
 *   color="warn"
 *   size="lg"
 *   ariaLabel="Delete item">
 * </amw-icon-button>
 * ```
 *
 * @example
 * Loading state:
 * ```html
 * <amw-icon-button
 *   icon="save"
 *   [loading]="isSaving"
 *   ariaLabel="Save changes">
 * </amw-icon-button>
 * ```
 */
@Component({
    selector: 'amw-icon-button',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        AmwIconComponent,
        MatRippleModule,
        AmwProgressSpinnerComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-icon-button.component.html',
    styleUrl: './amw-icon-button.component.scss'
})
export class AmwIconButtonComponent {
    /** Material icon name (required) */
    readonly icon = input.required<string>();

    /**
     * Accessibility label (required for icon-only buttons)
     * This sets the aria-label attribute on the button.
     */
    readonly ariaLabel = input.required<string>();

    /** Button color from theme */
    readonly color = input<AmwIconButtonColor | undefined>();

    /** Whether the button is disabled */
    readonly disabled = input<boolean>(false);

    /**
     * Button size
     * - 'sm': 32px
     * - 'md': 40px (default)
     * - 'lg': 48px
     */
    readonly size = input<AmwIconButtonSize>('md');

    /** Shows spinner instead of icon when true */
    readonly loading = input<boolean>(false);

    /** Button type attribute */
    readonly type = input<'button' | 'submit' | 'reset'>('button');

    /** Tab index for keyboard navigation */
    readonly tabIndex = input<number | undefined>();

    /** Custom CSS class */
    readonly buttonClass = input<string | undefined>();

    /** Emitted when button is clicked */
    readonly buttonClick = output<MouseEvent>();

    /** Emitted when button receives focus */
    readonly buttonFocus = output<FocusEvent>();

    /** Emitted when button loses focus */
    readonly buttonBlur = output<FocusEvent>();

    /** Computed spinner diameter based on button size */
    readonly spinnerDiameter = computed(() => {
        const size = this.size();
        switch (size) {
            case 'sm': return 16;
            case 'lg': return 24;
            default: return 20;
        }
    });

    /** Computed CSS classes for the button */
    readonly buttonClasses = computed(() => {
        const classes = ['amw-icon-button'];
        const size = this.size();
        const customClass = this.buttonClass();

        classes.push(`amw-icon-button--${size}`);

        if (this.loading()) {
            classes.push('amw-icon-button--loading');
        }

        if (this.disabled()) {
            classes.push('amw-icon-button--disabled');
        }

        if (customClass) {
            classes.push(customClass);
        }

        return classes.join(' ');
    });

    /** Handle button click */
    onClick(event: MouseEvent): void {
        if (!this.disabled() && !this.loading()) {
            this.buttonClick.emit(event);
        }
    }

    /** Handle button focus */
    onFocus(event: FocusEvent): void {
        this.buttonFocus.emit(event);
    }

    /** Handle button blur */
    onBlur(event: FocusEvent): void {
        this.buttonBlur.emit(event);
    }
}
