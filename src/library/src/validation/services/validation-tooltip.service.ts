import { Injectable, signal, inject } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { IFieldError } from '../interfaces/field-error.interface';
import { AmwValidationMessageService } from './validation-message.service';

/**
 * Position coordinates for the validation tooltip overlay
 */
export interface ValidationTooltipCoordinates {
    top: number;
    left: number;
}

/**
 * Service for managing the validation tooltip overlay.
 * Uses signals for reactive state management.
 *
 * @example
 * ```typescript
 * // In a directive or component
 * tooltipService.show(myForm, buttonElement);
 *
 * // In the overlay component template
 * @if (tooltipService.isVisible()) {
 *   <div [style.top.px]="tooltipService.position().top">
 *     {{ tooltipService.errors() }}
 *   </div>
 * }
 * ```
 */
@Injectable({
    providedIn: 'root'
})
export class AmwValidationTooltipService {
    private validationMessageService = inject(AmwValidationMessageService);

    /**
     * Whether the tooltip is currently visible
     */
    readonly isVisible = signal<boolean>(false);

    /**
     * Current validation errors to display
     */
    readonly errors = signal<IFieldError[]>([]);

    /**
     * Current tooltip position (fixed positioning)
     */
    readonly position = signal<ValidationTooltipCoordinates>({ top: 0, left: 0 });

    /**
     * The element the tooltip is anchored to
     */
    private anchorElement: HTMLElement | null = null;

    /**
     * Current form reference for updates
     */
    private currentForm: FormGroup | FormArray | null = null;

    /**
     * Shows the tooltip with validation errors positioned above the element.
     *
     * @param form The form to extract errors from
     * @param element The element to position the tooltip above
     */
    show(form: FormGroup | FormArray, element: HTMLElement): void {
        this.currentForm = form;
        this.anchorElement = element;

        // Get all errors (regardless of touched state) for submit button tooltip
        const fieldErrors = this.validationMessageService.getAllFieldErrors(form);

        if (fieldErrors.length === 0) {
            this.hide();
            return;
        }

        this.errors.set(fieldErrors);
        this.updatePosition(element);
        this.isVisible.set(true);
    }

    /**
     * Hides the tooltip.
     */
    hide(): void {
        this.isVisible.set(false);
        this.anchorElement = null;
        this.currentForm = null;
    }

    /**
     * Updates errors without changing visibility (for live updates).
     *
     * @param form The form to extract updated errors from
     */
    updateErrors(form?: FormGroup | FormArray): void {
        const formToUse = form || this.currentForm;
        if (!formToUse) return;

        const fieldErrors = this.validationMessageService.getAllFieldErrors(formToUse);
        this.errors.set(fieldErrors);

        // Auto-hide if no more errors
        if (fieldErrors.length === 0 && this.isVisible()) {
            this.hide();
        }
    }

    /**
     * Updates the tooltip position based on the anchor element.
     * Positions the tooltip centered above the element.
     *
     * @param element The anchor element
     */
    updatePosition(element?: HTMLElement): void {
        const el = element || this.anchorElement;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const tooltipHeight = 150; // Estimated max height
        const tooltipWidth = 320; // Max width from CSS

        // Calculate position centered above the element
        let top = rect.top - tooltipHeight - 12; // 12px gap for arrow
        let left = rect.left + (rect.width / 2);

        // Adjust if tooltip would go off screen
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Keep within horizontal bounds
        if (left - (tooltipWidth / 2) < 8) {
            left = (tooltipWidth / 2) + 8;
        } else if (left + (tooltipWidth / 2) > viewportWidth - 8) {
            left = viewportWidth - (tooltipWidth / 2) - 8;
        }

        // If not enough room above, position below
        if (top < 8) {
            top = rect.bottom + 12;
        }

        // Keep within vertical bounds
        if (top + tooltipHeight > viewportHeight - 8) {
            top = viewportHeight - tooltipHeight - 8;
        }

        this.position.set({ top, left });
    }

    /**
     * Gets the total count of validation errors
     */
    getErrorCount(): number {
        return this.errors().reduce(
            (count, field) => count + field.errors.length,
            0
        );
    }

    /**
     * Checks if there are any validation errors
     */
    hasErrors(): boolean {
        return this.errors().length > 0;
    }
}
