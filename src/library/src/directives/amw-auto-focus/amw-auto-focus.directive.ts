import { Directive, ElementRef, input, OnInit, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[amwAutoFocus]',
    standalone: true
})
export class AmwAutoFocusDirective implements OnInit, AfterViewInit {
    amwAutoFocus = input<boolean>(true);
    amwAutoFocusDelay = input<number>(0);

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        // Focus immediately if no delay
        if (this.amwAutoFocus() && this.amwAutoFocusDelay() === 0) {
            this.focusElement();
        }
    }

    ngAfterViewInit(): void {
        // Focus with delay if specified
        if (this.amwAutoFocus() && this.amwAutoFocusDelay() > 0) {
            setTimeout(() => {
                this.focusElement();
            }, this.amwAutoFocusDelay());
        }
    }

    private focusElement(): void {
        const element = this.elementRef.nativeElement;

        // Check if element is focusable
        if (this.isFocusable(element)) {
            element.focus();
        } else {
            // If not directly focusable, try to find a focusable child
            const focusableChild = element.querySelector('input, textarea, select, button, [tabindex]:not([tabindex="-1"])');
            if (focusableChild) {
                focusableChild.focus();
            }
        }
    }

    private isFocusable(element: HTMLElement): boolean {
        const focusableElements = ['input', 'textarea', 'select', 'button', 'a'];
        const tagName = element.tagName.toLowerCase();

        if (focusableElements.includes(tagName)) {
            return true;
        }

        // Check if element has tabindex and is not disabled
        const tabIndex = element.getAttribute('tabindex');
        if (tabIndex !== null && tabIndex !== '-1') {
            return true;
        }

        return false;
    }
}
