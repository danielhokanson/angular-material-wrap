import { Directive, ElementRef, HostListener, OnInit, OnDestroy, Renderer2, output } from '@angular/core';

@Directive({
    selector: '[amwClickOutside]',
    standalone: true
})
export class AmwClickOutsideDirective implements OnInit, OnDestroy {
    amwClickOutside = output<Event>();

    private documentClickListener?: () => void;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        // Add document click listener
        this.documentClickListener = this.renderer.listen('document', 'click', (event: Event) => {
            this.onDocumentClick(event);
        });
    }

    ngOnDestroy(): void {
        // Remove document click listener
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }

    @HostListener('click', ['$event'])
    onHostClick(event: Event): void {
        // Stop propagation to prevent document click from firing
        event.stopPropagation();
    }

    private onDocumentClick(event: Event): void {
        const clickedInside = this.elementRef.nativeElement.contains(event.target);
        if (!clickedInside) {
            this.amwClickOutside.emit(event);
        }
    }
}
