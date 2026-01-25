import {
    Directive,
    HostListener,
    ElementRef,
    OnDestroy,
    Renderer2,
    inject,
    input,
    effect,
    OnInit
} from '@angular/core';
import { AmwValidationService, ValidationContext, ValidationViolation } from '../../services/amw-validation/amw-validation.service';

/**
 * AMW Validation Tooltip Directive
 *
 * Displays validation violations in a tooltip when hovering over a submit button.
 * Works with the AmwValidationService to show relevant validation messages.
 *
 * When violations exist and the user hovers over the button, a tooltip appears
 * showing all current validation messages. The button is also automatically
 * disabled based on the validation context configuration.
 *
 * @example
 * ```html
 * <!-- Basic usage with validation context ID -->
 * <button [amwValidationTooltip]="validationContext.id">
 *   Submit
 * </button>
 *
 * <!-- With validation context object -->
 * <button [amwValidationTooltip]="validationContext">
 *   Submit
 * </button>
 *
 * <!-- Auto-disable based on validation state -->
 * <amw-button
 *   [amwValidationTooltip]="validationContext"
 *   [disabled]="validationContext.isSubmitDisabled()">
 *   Submit
 * </amw-button>
 * ```
 */
@Directive({
    selector: '[amwValidationTooltip]',
    standalone: true
})
export class AmwValidationTooltipDirective implements OnInit, OnDestroy {
    private elementRef = inject(ElementRef);
    private renderer = inject(Renderer2);
    private validationService = inject(AmwValidationService);

    /**
     * The validation context (ID string or context object)
     */
    amwValidationTooltip = input.required<string | ValidationContext>();

    /**
     * Position of the tooltip
     */
    tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');

    /**
     * Whether to auto-disable the element when validation fails
     */
    autoDisable = input<boolean>(true);

    /** The tooltip element */
    private tooltipElement: HTMLElement | null = null;

    /** Whether tooltip is currently visible */
    private isTooltipVisible = false;

    /** Timeout for delayed show */
    private showTimeout: ReturnType<typeof setTimeout> | null = null;

    /** Timeout for delayed hide */
    private hideTimeout: ReturnType<typeof setTimeout> | null = null;

    constructor() {
        // Set up effect to auto-disable based on validation state
        effect(() => {
            if (this.autoDisable()) {
                const context = this.getContext();
                if (context && context.isSubmitDisabled()) {
                    this.renderer.setAttribute(
                        this.elementRef.nativeElement,
                        'disabled',
                        'true'
                    );
                } else {
                    this.renderer.removeAttribute(
                        this.elementRef.nativeElement,
                        'disabled'
                    );
                }
            }
        });
    }

    ngOnInit(): void {
        this.createTooltipElement();
    }

    ngOnDestroy(): void {
        this.removeTooltip();
        if (this.showTimeout) clearTimeout(this.showTimeout);
        if (this.hideTimeout) clearTimeout(this.hideTimeout);
    }

    @HostListener('mouseenter')
    onMouseEnter(): void {
        const violations = this.getViolations();
        if (violations.length > 0) {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
            this.showTimeout = setTimeout(() => this.showTooltip(), 200);
        }
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
        this.hideTimeout = setTimeout(() => this.hideTooltip(), 100);
    }

    @HostListener('focus')
    onFocus(): void {
        const violations = this.getViolations();
        if (violations.length > 0) {
            this.showTooltip();
        }
    }

    @HostListener('blur')
    onBlur(): void {
        this.hideTooltip();
    }

    /**
     * Get the validation context
     */
    private getContext(): ValidationContext | undefined {
        const input = this.amwValidationTooltip();
        if (typeof input === 'string') {
            return this.validationService.getContext(input);
        }
        return input;
    }

    /**
     * Get current violations
     */
    private getViolations(): ValidationViolation[] {
        const context = this.getContext();
        return context?.violations() || [];
    }

    /**
     * Create the tooltip element
     */
    private createTooltipElement(): void {
        this.tooltipElement = this.renderer.createElement('div');
        this.renderer.addClass(this.tooltipElement, 'amw-validation-tooltip');
        this.renderer.setStyle(this.tooltipElement, 'position', 'fixed');
        this.renderer.setStyle(this.tooltipElement, 'z-index', '10000');
        this.renderer.setStyle(this.tooltipElement, 'pointer-events', 'none');
        this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
        this.renderer.setStyle(this.tooltipElement, 'visibility', 'hidden');
        this.renderer.setStyle(this.tooltipElement, 'transition', 'opacity 200ms, visibility 200ms');
        // Use softer info-style colors for less jarring appearance
        this.renderer.setStyle(this.tooltipElement, 'background-color', '#e3f2fd');
        this.renderer.setStyle(this.tooltipElement, 'color', '#002171');
        this.renderer.setStyle(this.tooltipElement, 'padding', '8px 12px');
        this.renderer.setStyle(this.tooltipElement, 'border-radius', '4px');
        this.renderer.setStyle(this.tooltipElement, 'font-size', '12px');
        this.renderer.setStyle(this.tooltipElement, 'max-width', '300px');
        this.renderer.setStyle(this.tooltipElement, 'box-shadow', '0 2px 8px rgba(0,0,0,0.15)');

        if (this.tooltipElement) {
            document.body.appendChild(this.tooltipElement);
        }
    }

    /**
     * Show the tooltip
     */
    private showTooltip(): void {
        if (!this.tooltipElement) return;

        const violations = this.getViolations();
        if (violations.length === 0) return;

        // Build tooltip content
        const content = this.buildTooltipContent(violations);
        this.tooltipElement.innerHTML = content;

        // Position the tooltip
        this.positionTooltip();

        // Show with animation
        this.renderer.setStyle(this.tooltipElement, 'opacity', '1');
        this.renderer.setStyle(this.tooltipElement, 'visibility', 'visible');
        this.isTooltipVisible = true;
    }

    /**
     * Hide the tooltip
     */
    private hideTooltip(): void {
        if (!this.tooltipElement) return;

        this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
        this.renderer.setStyle(this.tooltipElement, 'visibility', 'hidden');
        this.isTooltipVisible = false;
    }

    /**
     * Build tooltip HTML content
     */
    private buildTooltipContent(violations: ValidationViolation[]): string {
        const errors = violations.filter(v => v.severity === 'error');
        const warnings = violations.filter(v => v.severity === 'warning');
        const infos = violations.filter(v => v.severity === 'info');

        let html = '<div class="amw-validation-tooltip__content">';

        if (errors.length > 0) {
            html += '<div class="amw-validation-tooltip__section amw-validation-tooltip__section--error">';
            html += '<strong>Errors:</strong>';
            html += '<ul style="margin: 4px 0 0 0; padding-left: 16px;">';
            errors.forEach(e => {
                html += `<li>${this.escapeHtml(e.message)}</li>`;
            });
            html += '</ul></div>';
        }

        if (warnings.length > 0) {
            html += '<div class="amw-validation-tooltip__section amw-validation-tooltip__section--warning" style="margin-top: 8px;">';
            html += '<strong>Warnings:</strong>';
            html += '<ul style="margin: 4px 0 0 0; padding-left: 16px;">';
            warnings.forEach(w => {
                html += `<li>${this.escapeHtml(w.message)}</li>`;
            });
            html += '</ul></div>';
        }

        if (infos.length > 0) {
            html += '<div class="amw-validation-tooltip__section amw-validation-tooltip__section--info" style="margin-top: 8px;">';
            html += '<strong>Info:</strong>';
            html += '<ul style="margin: 4px 0 0 0; padding-left: 16px;">';
            infos.forEach(i => {
                html += `<li>${this.escapeHtml(i.message)}</li>`;
            });
            html += '</ul></div>';
        }

        html += '</div>';
        return html;
    }

    /**
     * Position the tooltip relative to the host element
     */
    private positionTooltip(): void {
        if (!this.tooltipElement) return;

        const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
        const tooltipRect = this.tooltipElement.getBoundingClientRect();
        const position = this.tooltipPosition();
        const offset = 8;

        let top: number;
        let left: number;

        switch (position) {
            case 'top':
                top = hostRect.top - tooltipRect.height - offset;
                left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = hostRect.bottom + offset;
                left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
                left = hostRect.left - tooltipRect.width - offset;
                break;
            case 'right':
                top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
                left = hostRect.right + offset;
                break;
        }

        // Keep tooltip within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (left < 8) left = 8;
        if (left + tooltipRect.width > viewportWidth - 8) {
            left = viewportWidth - tooltipRect.width - 8;
        }
        if (top < 8) top = 8;
        if (top + tooltipRect.height > viewportHeight - 8) {
            top = viewportHeight - tooltipRect.height - 8;
        }

        this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
    }

    /**
     * Remove tooltip element from DOM
     */
    private removeTooltip(): void {
        if (this.tooltipElement && this.tooltipElement.parentNode) {
            this.tooltipElement.parentNode.removeChild(this.tooltipElement);
            this.tooltipElement = null;
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
