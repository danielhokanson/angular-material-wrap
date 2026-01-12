import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { BaseComponent } from '../base/base.component';
import { ButtonVariant } from './interfaces/button.interface';
import { ButtonType } from './interfaces/button-type.type';
import { AmwColor } from '../../../shared/types/amw-color.type';
import { IconPosition } from './interfaces/icon-position.type';
import { AmwProgressSpinnerComponent } from '../../../components/components/amw-progress-spinner/amw-progress-spinner.component';

/**
 * AMW Button Component
 * A comprehensive wrapper around Angular Material Button with enhanced functionality
 * Inherits from BaseComponent: disabled, required, label, placeholder, errorMessage, hasError,
 * name, id, tabIndex, size, color, ariaLabel, ariaLabelledby, ariaDescribedby, ariaRequired,
 * ariaInvalid, hint, readonly, value, change, focus, blur
 */
@Component({
    selector: 'amw-button',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatRippleModule, MatIconModule, AmwProgressSpinnerComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-button.component.html',
    styleUrl: './amw-button.component.scss'
})
export class AmwButtonComponent extends BaseComponent<void> {
    // Button-specific properties (inherited from BaseComponent: disabled, name, id, tabIndex, size,
    // color, ariaLabel, ariaLabelledby, ariaDescribedby)

    type = input<ButtonType>('button');
    variant = input<ButtonVariant>('text');

    // Icon properties
    icon = input<string | undefined>(undefined);
    iconPosition = input<IconPosition>('left');

    // State properties
    loading = input<boolean>(false);
    fullWidth = input<boolean>(false);
    autofocus = input<boolean>(false);

    // Form properties
    form = input<string | undefined>(undefined);
    formAction = input<string | undefined>(undefined);
    formMethod = input<'get' | 'post' | 'put' | 'delete' | undefined>(undefined);
    formTarget = input<'_blank' | '_self' | '_parent' | '_top' | undefined>(undefined);
    formEnctype = input<'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain' | undefined>(undefined);
    formNoValidate = input<boolean>(false);
    formReset = input<boolean>(false);

    // Ripple properties
    ripple = input<boolean>(true);
    disableRipple = input<boolean>(false);
    rippleColor = input<string | undefined>(undefined);
    rippleRadius = input<number | undefined>(undefined);
    rippleCentered = input<boolean>(false);
    rippleUnbounded = input<boolean>(false);

    // Spinner properties
    spinnerSize = input<number>(20);
    spinnerColor = input<AmwColor>('primary');

    // Text content
    text = input<string>('');

    // Events
    buttonClick = output<MouseEvent>();
    buttonFocus = output<FocusEvent>();
    buttonBlur = output<FocusEvent>();
    mouseenter = output<MouseEvent>();
    mouseleave = output<MouseEvent>();

    onButtonClick(event: MouseEvent): void {
        if (!this.disabled() && !this.loading()) {
            this.buttonClick.emit(event);
        }
    }

    onButtonFocus(event: FocusEvent): void {
        this.buttonFocus.emit(event);
    }

    onButtonBlur(event: FocusEvent): void {
        this.buttonBlur.emit(event);
    }

    onMouseEnter(event: MouseEvent): void {
        this.mouseenter.emit(event);
    }

    onMouseLeave(event: MouseEvent): void {
        this.mouseleave.emit(event);
    }

    get buttonClasses(): string {
        return `amw-button amw-button--${this.variant()} amw-button--${this.size()} ${this.fullWidth() ? 'amw-button--full-width' : ''} ${this.loading() ? 'amw-button--loading' : ''}`;
    }

    get rippleConfig(): any {
        return {
            color: this.rippleColor(),
            radius: this.rippleRadius(),
            centered: this.rippleCentered(),
            unbounded: this.rippleUnbounded(),
            disabled: this.disableRipple() || this.disabled()
        };
    }

    /**
     * Determines if the current variant is a special variant (mutually exclusive)
     */
    isSpecialVariant(): boolean {
        const specialVariants: string[] = ['icon', 'fab', 'mini-fab', 'extended-fab'];
        return specialVariants.includes(this.variant());
    }

}
