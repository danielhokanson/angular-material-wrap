import { Injectable, ComponentRef, TemplateRef, ViewContainerRef, Injector } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, PositionStrategy, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { AmwCalendarItemEditorComponent } from '../amw-calendar-item-editor.component';
import { CalendarItemEditorContext } from '../interfaces/calendar-item.interface';

/**
 * Service for managing calendar item editor popovers
 */
@Injectable({
    providedIn: 'root'
})
export class CalendarItemPopoverService {
    private overlayRef: OverlayRef | null = null;

    constructor(private overlay: Overlay) { }

    /**
     * Open calendar item editor popover
     */
    openEditor<T>(
        context: CalendarItemEditorContext<T>,
        triggerElement?: HTMLElement,
        position: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
    ): ComponentRef<AmwCalendarItemEditorComponent<T>> | null {
        // Close any existing popover
        this.closeEditor();

        // Create overlay configuration
        const config: OverlayConfig = {
            hasBackdrop: true,
            backdropClass: 'amw-calendar-item-editor-backdrop',
            positionStrategy: this.createPositionStrategy(triggerElement, position),
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            width: 'auto',
            height: 'auto',
            // Remove maxWidth constraint that might be affecting positioning
            maxHeight: '90vh',
            // Ensure overlay is constrained to viewport
            panelClass: 'amw-calendar-item-editor-overlay'
        };

        // Create overlay
        this.overlayRef = this.overlay.create(config);

        // Create component portal
        const portal = new ComponentPortal(
            AmwCalendarItemEditorComponent,
            null,
            this.createInjector(context)
        );

        // Attach component to overlay
        const componentRef = this.overlayRef.attach(portal);

        // Set the context input using setInput for signal inputs
        componentRef.setInput('context', context);

        // Handle backdrop click to close
        this.overlayRef.backdropClick().subscribe(() => {
            this.closeEditor();
        });

        return componentRef;
    }

    /**
     * Close the current editor popover
     */
    closeEditor(): void {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }

    /**
     * Check if editor is open
     */
    isEditorOpen(): boolean {
        return this.overlayRef !== null;
    }

    /**
     * Create position strategy for the popover
     */
    private createPositionStrategy(
        triggerElement?: HTMLElement,
        position: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
    ): PositionStrategy {
        if (triggerElement) {
            const rect = triggerElement.getBoundingClientRect();

            // Try a more direct approach - use global positioning with calculated coordinates
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            // Calculate responsive popover dimensions based on viewport
            const popoverWidth = Math.min(400, viewportWidth * 0.4); // Max 40% of viewport width
            const popoverHeight = Math.min(300, viewportHeight * 0.4); // Max 40% of viewport height

            // Calculate position based on trigger element and preferred direction
            let x: number, y: number;

            switch (position) {
                case 'top':
                    // Center horizontally, position above
                    x = rect.left + (rect.width / 2) - (popoverWidth / 2);
                    y = rect.top - popoverHeight - 8;
                    break;
                case 'bottom':
                    // Center horizontally, position below
                    x = rect.left + (rect.width / 2) - (popoverWidth / 2);
                    y = rect.bottom + 8;
                    break;
                case 'left':
                    // Center vertically, position to the left
                    x = rect.left - popoverWidth - 8;
                    y = rect.top + (rect.height / 2) - (popoverHeight / 2);
                    break;
                case 'right':
                    // Center vertically, position to the right
                    x = rect.right + 8;
                    y = rect.top + (rect.height / 2) - (popoverHeight / 2);
                    break;
                default:
                    // Default to bottom, centered
                    x = rect.left + (rect.width / 2) - (popoverWidth / 2);
                    y = rect.bottom + 8;
            }

            // Responsive viewport boundary adjustments
            const margin = Math.max(16, viewportWidth * 0.02); // 2% of viewport width, min 16px

            // Horizontal positioning with better fallbacks
            if (x < margin) {
                x = margin;
            } else if (x + popoverWidth > viewportWidth - margin) {
                // Try alternative positioning
                if (position === 'right' || position === 'left') {
                    // For horizontal positioning, try the opposite side
                    x = position === 'right' ? rect.left - popoverWidth - 8 : rect.right + 8;
                    if (x < margin) x = margin;
                    if (x + popoverWidth > viewportWidth - margin) x = viewportWidth - popoverWidth - margin;
                } else {
                    // For vertical positioning, try centering
                    x = Math.max(margin, Math.min(viewportWidth - popoverWidth - margin,
                        rect.left + (rect.width / 2) - (popoverWidth / 2)));
                }
            }

            // Vertical positioning with better fallbacks
            if (y < margin) {
                y = margin;
            } else if (y + popoverHeight > viewportHeight - margin) {
                // Try alternative positioning
                if (position === 'top' || position === 'bottom') {
                    // For vertical positioning, try the opposite side
                    y = position === 'bottom' ? rect.top - popoverHeight - 8 : rect.bottom + 8;
                    if (y < margin) y = margin;
                    if (y + popoverHeight > viewportHeight - margin) y = viewportHeight - popoverHeight - margin;
                } else {
                    // For horizontal positioning, try centering
                    y = Math.max(margin, Math.min(viewportHeight - popoverHeight - margin,
                        rect.top + (rect.height / 2) - (popoverHeight / 2)));
                }
            }

            const positionStrategy = this.overlay.position().global()
                .left(`${x}px`)
                .top(`${y}px`);

            return positionStrategy;
        } else {
            // Center on screen
            return this.overlay.position().global()
                .centerHorizontally()
                .centerVertically();
        }
    }

    /**
     * Create injector with context data
     */
    private createInjector<T>(context: CalendarItemEditorContext<T>): Injector {
        return Injector.create({
            providers: [
                { provide: 'CALENDAR_ITEM_EDITOR_CONTEXT', useValue: context }
            ]
        });
    }
}
