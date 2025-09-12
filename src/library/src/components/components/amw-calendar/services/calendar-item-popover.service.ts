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
            maxWidth: '90vw',
            maxHeight: '90vh'
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

        // Set the context on the component instance
        componentRef.instance.context = context;

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
            // Position relative to trigger element
            const strategy = this.overlay.position()
                .flexibleConnectedTo(triggerElement)
                .withPush(true)
                .withGrowAfterOpen(true)
                .withFlexibleDimensions(true);

            // Set position based on preference
            switch (position) {
                case 'top':
                    return strategy.withPositions([
                        { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8 },
                        { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 }
                    ]);
                case 'bottom':
                    return strategy.withPositions([
                        { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 },
                        { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8 }
                    ]);
                case 'left':
                    return strategy.withPositions([
                        { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8 },
                        { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8 }
                    ]);
                case 'right':
                    return strategy.withPositions([
                        { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8 },
                        { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8 }
                    ]);
                default:
                    return strategy.withPositions([
                        { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 }
                    ]);
            }
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
