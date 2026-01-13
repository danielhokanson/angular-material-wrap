import { Component, input, output, ViewEncapsulation, computed, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { BaseComponent } from '../base/base.component';
import { ButtonStyle, FabType } from './interfaces/button.interface';
import { ButtonType } from './interfaces/button-type.type';
import { AmwColor } from '../../../shared/types/amw-color.type';
import { IconPosition } from './interfaces/icon-position.type';
import { AmwProgressSpinnerComponent } from '../../../components/components/amw-progress-spinner/amw-progress-spinner.component';

/**
 * AMW Button Component
 * A comprehensive wrapper around Angular Material Button with enhanced functionality
 *
 * The button intelligently infers its form factor:
 * - If `icon` is set but no text content → renders as icon-only button
 * - If `fab` is truthy → renders as FAB (floating action button)
 * - Otherwise → renders as standard button with optional icon
 *
 * The `appearance` property controls the visual style independently.
 */
@Component({
    selector: 'amw-button',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatRippleModule, MatIconModule, AmwProgressSpinnerComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-button.component.html',
    styleUrl: './amw-button.component.scss'
})
export class AmwButtonComponent extends BaseComponent<void> implements AfterContentInit {
    // Button type (submit, button, reset)
    type = input<ButtonType>('button');

    /**
     * Visual appearance of the button (surface treatment)
     * Controls how the button looks, independent of its form factor
     */
    appearance = input<ButtonStyle>('filled');

    /**
     * FAB (Floating Action Button) configuration
     * - false: not a FAB (default)
     * - true or 'standard': standard FAB (56px)
     * - 'mini': mini FAB (40px)
     * - 'extended': extended FAB with text + icon
     */
    fab = input<FabType>(false);

    // Icon properties
    icon = input<string | undefined>(undefined);
    iconPosition = input<IconPosition>('left');

    // State properties
    loading = input<boolean>(false);
    fullWidth = input<boolean>(false);
    autofocus = input<boolean>(false);

    // Text content (alternative to ng-content)
    text = input<string>('');

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

    // Events
    buttonClick = output<MouseEvent>();
    buttonFocus = output<FocusEvent>();
    buttonBlur = output<FocusEvent>();
    mouseenter = output<MouseEvent>();
    mouseleave = output<MouseEvent>();

    // Track if there's projected content
    private hasProjectedContent = false;

    ngAfterContentInit(): void {
        // This will be set by checking the template
    }

    /**
     * Gets the effective appearance for the button
     */
    effectiveAppearance = computed<ButtonStyle>(() => this.appearance());

    /**
     * Gets the effective FAB type
     */
    effectiveFab = computed<FabType>(() => this.fab());

    /**
     * Determines if this is a FAB button
     */
    isFab = computed(() => {
        const fabValue = this.effectiveFab();
        return fabValue === true || fabValue === 'standard' || fabValue === 'mini' || fabValue === 'extended';
    });

    /**
     * Determines if this is an extended FAB (has text)
     */
    isExtendedFab = computed(() => {
        return this.effectiveFab() === 'extended';
    });

    /**
     * Determines if this is a mini FAB
     */
    isMiniFab = computed(() => {
        return this.effectiveFab() === 'mini';
    });

    /**
     * Determines if this should render as icon-only button
     * True when: icon is set AND no text content AND not an extended FAB
     */
    isIconOnly = computed(() => {
        const hasIcon = !!this.icon();
        const hasText = !!this.text()?.trim();
        const isExtended = this.isExtendedFab();

        // Icon-only when there's an icon but no text (and not extended FAB)
        return hasIcon && !hasText && !isExtended;
    });

    /**
     * Determines if text content should be shown
     */
    hasTextContent = computed(() => {
        return !!this.text()?.trim() || this.isExtendedFab();
    });

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

    /**
     * Generates CSS classes for the button
     */
    get buttonClasses(): string {
        const classes = ['amw-button'];

        // Appearance class
        classes.push(`amw-button--${this.effectiveAppearance()}`);

        // Size class
        classes.push(`amw-button--${this.size()}`);

        // Form factor classes
        if (this.isIconOnly()) {
            classes.push('amw-button--icon-only');
        }
        if (this.isFab()) {
            classes.push('amw-button--fab');
            if (this.isMiniFab()) {
                classes.push('amw-button--mini-fab');
            }
            if (this.isExtendedFab()) {
                classes.push('amw-button--extended-fab');
            }
        }

        // State classes
        if (this.fullWidth()) {
            classes.push('amw-button--full-width');
        }
        if (this.loading()) {
            classes.push('amw-button--loading');
        }

        return classes.join(' ');
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
}
