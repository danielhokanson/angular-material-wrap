import {
    Directive,
    HostListener,
    OnInit,
    OnDestroy,
    inject,
    input,
    effect,
    DestroyRef,
    ElementRef
} from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AmwValidationTooltipService } from '../services/validation-tooltip.service';

/**
 * Directive that shows validation errors in a tooltip when hovering/focusing a submit button.
 *
 * When a form is invalid, hovering or focusing the submit button shows ALL validation errors
 * in a tooltip positioned above the button.
 *
 * @example
 * ```html
 * <!-- Basic usage with FormGroup -->
 * <amw-button [amwValidationTooltip]="myForm" [disabled]="myForm.invalid">
 *   Save
 * </amw-button>
 *
 * <!-- With FormArray -->
 * <amw-button [amwValidationTooltip]="myFormArray" [disabled]="myFormArray.invalid">
 *   Submit
 * </amw-button>
 * ```
 */
@Directive({
    selector: '[amwValidationTooltip]',
    standalone: true
})
export class AmwValidationTooltipDirective implements OnInit, OnDestroy {
    private tooltipService = inject(AmwValidationTooltipService);
    private destroyRef = inject(DestroyRef);
    private elementRef = inject(ElementRef);
    private hostElement: HTMLElement;

    /**
     * The form (FormGroup or FormArray) to show validation errors for
     */
    readonly form = input.required<FormGroup | FormArray>({ alias: 'amwValidationTooltip' });

    /**
     * Whether to show the tooltip (can be used to conditionally disable)
     */
    readonly showTooltip = input<boolean>(true);

    /**
     * Delay before showing the tooltip (ms)
     */
    readonly showDelay = input<number>(200);

    /**
     * Delay before hiding the tooltip (ms)
     */
    readonly hideDelay = input<number>(100);

    private showTimeout: ReturnType<typeof setTimeout> | null = null;
    private hideTimeout: ReturnType<typeof setTimeout> | null = null;
    private formSubscription: (() => void) | null = null;

    constructor() {
        this.hostElement = this.elementRef.nativeElement;

        // React to form changes to update tooltip content in real-time
        effect(() => {
            const currentForm = this.form();
            if (currentForm && this.tooltipService.isVisible()) {
                this.tooltipService.updateErrors(currentForm);
            }
        });
    }

    ngOnInit(): void {
        this.setupFormSubscription();
    }

    ngOnDestroy(): void {
        this.clearTimeouts();
        this.tooltipService.hide();
        if (this.formSubscription) {
            this.formSubscription();
        }
    }

    /**
     * Shows tooltip on mouse enter when form is invalid
     */
    @HostListener('mouseenter')
    onMouseEnter(): void {
        if (!this.shouldShowTooltip()) return;

        this.clearHideTimeout();
        this.showTimeout = setTimeout(() => {
            this.showTooltipIfInvalid();
        }, this.showDelay());
    }

    /**
     * Shows tooltip on focus when form is invalid
     */
    @HostListener('focus')
    onFocus(): void {
        if (!this.shouldShowTooltip()) return;

        this.clearTimeouts();
        this.showTooltipIfInvalid();
    }

    /**
     * Hides tooltip on mouse leave
     */
    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.clearShowTimeout();
        this.hideTimeout = setTimeout(() => {
            this.tooltipService.hide();
        }, this.hideDelay());
    }

    /**
     * Hides tooltip on blur
     */
    @HostListener('blur')
    onBlur(): void {
        this.clearTimeouts();
        this.tooltipService.hide();
    }

    /**
     * Updates position on window scroll/resize
     */
    @HostListener('window:scroll')
    @HostListener('window:resize')
    onWindowChange(): void {
        if (this.tooltipService.isVisible()) {
            this.tooltipService.updatePosition(this.hostElement);
        }
    }

    private shouldShowTooltip(): boolean {
        return this.showTooltip() && this.form()?.invalid === true;
    }

    private showTooltipIfInvalid(): void {
        const currentForm = this.form();
        if (currentForm?.invalid) {
            this.tooltipService.show(currentForm, this.hostElement);
        }
    }

    private setupFormSubscription(): void {
        const currentForm = this.form();
        if (!currentForm) return;

        // Subscribe to value changes to update tooltip content
        const subscription = currentForm.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                if (this.tooltipService.isVisible()) {
                    this.tooltipService.updateErrors(currentForm);
                }
            });

        this.formSubscription = () => subscription.unsubscribe();
    }

    private clearShowTimeout(): void {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
    }

    private clearHideTimeout(): void {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }

    private clearTimeouts(): void {
        this.clearShowTimeout();
        this.clearHideTimeout();
    }
}
