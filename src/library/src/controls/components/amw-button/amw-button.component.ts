import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseComponent } from '../base/base.component';
import { ButtonVariant } from './interfaces/button.interface';
import { ButtonSize } from './interfaces/button-size.type';
import { ButtonType } from './interfaces/button-type.type';
import { ButtonColor } from './interfaces/button-color.type';
import { IconPosition } from './interfaces/icon-position.type';

/**
 * AMW Button Component
 * A comprehensive wrapper around Angular Material Button with enhanced functionality
 */
@Component({
    selector: 'amw-button',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatRippleModule, MatIconModule, MatProgressSpinnerModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-button.component.html',
    styleUrl: './amw-button.component.scss'
})
export class AmwButtonComponent extends BaseComponent {
    // Basic button properties
    @Input() type: ButtonType = 'button';
    @Input() variant: ButtonVariant = 'primary';
    @Input() size: ButtonSize = 'medium';
    @Input() color: ButtonColor = 'primary';

    // Icon properties
    @Input() icon?: string;
    @Input() iconPosition: IconPosition = 'left';

    // State properties
    @Input() loading = false;
    @Input() fullWidth = false;
    @Input() autofocus = false;

    // Form properties
    @Input() name?: string;
    @Input() form?: string;
    @Input() formAction?: string;
    @Input() formMethod?: 'get' | 'post' | 'put' | 'delete';
    @Input() formTarget?: '_blank' | '_self' | '_parent' | '_top';
    @Input() formEnctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
    @Input() formNoValidate = false;
    @Input() formReset = false;

    // Accessibility properties
    @Input() ariaLabel?: string;
    @Input() ariaLabelledby?: string;
    @Input() ariaDescribedby?: string;
    @Input() tabIndex?: number;

    // Ripple properties
    @Input() ripple = true;
    @Input() disableRipple = false;
    @Input() rippleColor?: string;
    @Input() rippleRadius?: number;
    @Input() rippleCentered = false;
    @Input() rippleUnbounded = false;

    // Events
    @Output() click = new EventEmitter<MouseEvent>();
    @Output() override focus = new EventEmitter<FocusEvent>();
    @Output() override blur = new EventEmitter<FocusEvent>();
    @Output() mouseenter = new EventEmitter<MouseEvent>();
    @Output() mouseleave = new EventEmitter<MouseEvent>();

    onButtonClick(event: MouseEvent): void {
        if (!this.disabled && !this.loading) {
            this.click.emit(event);
        }
    }

    onButtonFocus(event: FocusEvent): void {
        this.focus.emit(event);
    }

    onButtonBlur(event: FocusEvent): void {
        this.blur.emit(event);
    }

    onMouseEnter(event: MouseEvent): void {
        this.mouseenter.emit(event);
    }

    onMouseLeave(event: MouseEvent): void {
        this.mouseleave.emit(event);
    }

    get buttonClasses(): string {
        return `amw-button amw-button--${this.variant} amw-button--${this.size} ${this.fullWidth ? 'amw-button--full-width' : ''} ${this.loading ? 'amw-button--loading' : ''}`;
    }

    get rippleConfig(): any {
        return {
            color: this.rippleColor,
            radius: this.rippleRadius,
            centered: this.rippleCentered,
            unbounded: this.rippleUnbounded,
            disabled: this.disableRipple || this.disabled
        };
    }
}
