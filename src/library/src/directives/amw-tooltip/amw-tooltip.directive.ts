import { Directive, ElementRef, input, OnDestroy, ComponentRef, Injector } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { AmwTooltipComponent } from './amw-tooltip.component';

/** Tooltip position type - supports both naming conventions */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'above' | 'below' | 'auto';

export interface TooltipConfig {
    content: string;
    position?: TooltipPosition;
    disabled?: boolean;
    maxWidth?: string;
    class?: string;
    allowHtml?: boolean;
    showDelay?: number;
    hideDelay?: number;
}

@Directive({
    selector: '[amwTooltip]',
    standalone: true,
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()',
        '(focus)': 'onFocus()',
        '(blur)': 'onBlur()'
    }
})
export class AmwTooltipDirective implements OnDestroy {
    tooltipConfig = input<TooltipConfig | string>('', { alias: 'amwTooltip' });

    /**
     * Tooltip position. Supports both conventions:
     * - 'top'/'bottom'/'left'/'right' (Material style)
     * - 'above'/'below' (aliases for top/bottom)
     * - 'auto' (automatically position based on available space)
     */
    tooltipPosition = input<TooltipPosition>('auto');
    /** Alias for tooltipPosition using the amwTooltipPosition name */
    amwTooltipPosition = input<TooltipPosition | undefined>();

    tooltipDisabled = input<boolean>(false);
    /** Alias for tooltipDisabled */
    amwTooltipDisabled = input<boolean | undefined>();

    tooltipMaxWidth = input<string>('200px');
    tooltipClass = input<string>('');
    /** Alias for tooltipClass */
    amwTooltipClass = input<string | undefined>();

    tooltipAllowHtml = input<boolean>(false);

    /** Delay in milliseconds before showing the tooltip */
    tooltipDelay = input<number>(200);
    /** Alias for tooltipDelay */
    amwTooltipDelay = input<number | undefined>();

    /** Delay in milliseconds before hiding the tooltip */
    tooltipHideDelay = input<number>(0);
    /** Alias for tooltipHideDelay */
    amwTooltipHideDelay = input<number | undefined>();

    private overlayRef: OverlayRef | null = null;
    private tooltipComponent: ComponentRef<AmwTooltipComponent> | null = null;
    private isVisible = false;
    private positionSubscription: Subscription | null = null;
    private currentCustomClass = '';
    private showTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private hideTimeoutId: ReturnType<typeof setTimeout> | null = null;

    constructor(
        private elementRef: ElementRef,
        private overlay: Overlay,
        private injector: Injector
    ) {
        // Inject CDK overlay styles if not already present
        this.injectCdkOverlayStyles();
    }

    /**
     * Injects CDK overlay styles into the document head if not already present.
     * This ensures the overlay works correctly even if consumers don't import
     * the library's global styles or @angular/cdk/overlay-prebuilt.css.
     */
    private injectCdkOverlayStyles(): void {
        const styleId = 'amw-cdk-overlay-styles';
        if (document.getElementById(styleId)) {
            return;
        }

        const styles = `
            .cdk-overlay-container,.cdk-global-overlay-wrapper{pointer-events:none;top:0;left:0;height:100%;width:100%}
            .cdk-overlay-container{position:fixed;z-index:1000}
            .cdk-overlay-container:empty{display:none}
            .cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}
            .cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;display:flex;max-width:100%;max-height:100%;z-index:1000}
            .cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:auto;-webkit-tap-highlight-color:transparent;opacity:0;touch-action:manipulation;z-index:1000;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}
            @media(prefers-reduced-motion){.cdk-overlay-backdrop{transition-duration:1ms}}
            .cdk-overlay-backdrop-showing{opacity:1}
            @media(forced-colors: active){.cdk-overlay-backdrop-showing{opacity:.6}}
            .cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}
            .cdk-overlay-transparent-backdrop{transition:visibility 1ms linear,opacity 1ms linear;visibility:hidden;opacity:1}
            .cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing,.cdk-high-contrast-active .cdk-overlay-transparent-backdrop{opacity:0;visibility:visible}
            .cdk-overlay-backdrop-noop-animation{transition:none}
            .cdk-overlay-connected-position-bounding-box{position:absolute;display:flex;flex-direction:column;min-width:1px;min-height:1px;z-index:1000}
            .cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}
        `;

        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    ngOnDestroy(): void {
        this.clearTimeouts();
        this.destroyTooltip();
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
    }

    onMouseEnter(): void {
        this.scheduleShow();
    }

    onMouseLeave(): void {
        this.scheduleHide();
    }

    onFocus(): void {
        this.scheduleShow();
    }

    onBlur(): void {
        this.scheduleHide();
    }

    /** Clear any pending show/hide timeouts */
    private clearTimeouts(): void {
        if (this.showTimeoutId) {
            clearTimeout(this.showTimeoutId);
            this.showTimeoutId = null;
        }
        if (this.hideTimeoutId) {
            clearTimeout(this.hideTimeoutId);
            this.hideTimeoutId = null;
        }
    }

    /** Schedule showing the tooltip after the configured delay */
    private scheduleShow(): void {
        this.clearTimeouts();

        const delay = this.getEffectiveShowDelay();
        if (delay > 0) {
            this.showTimeoutId = setTimeout(() => {
                this.show();
            }, delay);
        } else {
            this.show();
        }
    }

    /** Schedule hiding the tooltip after the configured delay */
    private scheduleHide(): void {
        this.clearTimeouts();

        const delay = this.getEffectiveHideDelay();
        if (delay > 0) {
            this.hideTimeoutId = setTimeout(() => {
                this.hide();
            }, delay);
        } else {
            this.hide();
        }
    }

    /** Get the effective show delay (prefers amwTooltipDelay over tooltipDelay) */
    private getEffectiveShowDelay(): number {
        return this.amwTooltipDelay() ?? this.tooltipDelay();
    }

    /** Get the effective hide delay (prefers amwTooltipHideDelay over tooltipHideDelay) */
    private getEffectiveHideDelay(): number {
        return this.amwTooltipHideDelay() ?? this.tooltipHideDelay();
    }

    /** Get the effective position (prefers amwTooltipPosition, normalizes above/below) */
    private getEffectivePosition(): 'top' | 'bottom' | 'left' | 'right' | 'auto' {
        const pos = this.amwTooltipPosition() ?? this.tooltipPosition();
        // Normalize 'above' and 'below' to 'top' and 'bottom'
        if (pos === 'above') return 'top';
        if (pos === 'below') return 'bottom';
        return pos;
    }

    /** Get the effective disabled state */
    private getEffectiveDisabled(): boolean {
        return this.amwTooltipDisabled() ?? this.tooltipDisabled();
    }

    /** Get the effective custom class */
    private getEffectiveClass(): string {
        return this.amwTooltipClass() ?? this.tooltipClass();
    }

    private show(): void {
        if (this.getEffectiveDisabled() || this.isVisible) {
            return;
        }

        const config = this.getConfig();
        if (!config.content) {
            return;
        }

        this.createTooltip(config);
    }

    private hide(): void {
        this.destroyTooltip();
    }

    private getConfig(): TooltipConfig {
        const config = this.tooltipConfig();
        if (typeof config === 'string') {
            return {
                content: config,
                position: this.getEffectivePosition(),
                disabled: this.getEffectiveDisabled(),
                maxWidth: this.tooltipMaxWidth(),
                class: this.getEffectiveClass(),
                allowHtml: this.tooltipAllowHtml(),
                showDelay: this.getEffectiveShowDelay(),
                hideDelay: this.getEffectiveHideDelay()
            };
        }
        // For object config, apply effective values as defaults
        return {
            ...config,
            position: config.position ? this.normalizePosition(config.position) : this.getEffectivePosition(),
            showDelay: config.showDelay ?? this.getEffectiveShowDelay(),
            hideDelay: config.hideDelay ?? this.getEffectiveHideDelay()
        };
    }

    /** Normalize position values (above→top, below→bottom) */
    private normalizePosition(pos: TooltipPosition): 'top' | 'bottom' | 'left' | 'right' | 'auto' {
        if (pos === 'above') return 'top';
        if (pos === 'below') return 'bottom';
        return pos;
    }

    private createTooltip(config: TooltipConfig): void {
        if (this.overlayRef) {
            this.destroyTooltip();
        }

        const overlayConfig = this.getOverlayConfig(config);
        this.overlayRef = this.overlay.create(overlayConfig);

        // Create tooltip component
        const tooltipPortal = new ComponentPortal(AmwTooltipComponent, null, this.injector);
        this.tooltipComponent = this.overlayRef.attach(tooltipPortal);

        // Store custom class for later use
        this.currentCustomClass = config.class || '';

        // Set tooltip content and configuration using setInput for signal-based inputs
        const position = config.position || this.tooltipPosition() || 'top';

        // For non-auto positions, set the class directly
        // For auto, we'll update it when position changes
        const initialPositionClass = position === 'auto' ? 'amw-tooltip--top' : `amw-tooltip--${position}`;
        const combinedClass = this.currentCustomClass ? `${initialPositionClass} ${this.currentCustomClass}` : initialPositionClass;

        this.tooltipComponent.setInput('content', config.content);
        this.tooltipComponent.setInput('allowHtml', config.allowHtml || false);
        this.tooltipComponent.setInput('maxWidth', config.maxWidth || '200px');
        this.tooltipComponent.setInput('class', combinedClass);

        // Subscribe to position changes for auto positioning
        if (position === 'auto') {
            const positionStrategy = overlayConfig.positionStrategy as any;
            if (positionStrategy && positionStrategy.positionChanges) {
                this.positionSubscription = positionStrategy.positionChanges.subscribe(
                    (change: ConnectedOverlayPositionChange) => {
                        this.updateTooltipPositionClass(change);
                    }
                );
            }
        }

        // Manually trigger change detection for dynamically created component
        this.tooltipComponent.instance.cdr.detectChanges();

        this.isVisible = true;
    }

    private destroyTooltip(): void {
        if (this.positionSubscription) {
            this.positionSubscription.unsubscribe();
            this.positionSubscription = null;
        }

        if (this.tooltipComponent) {
            this.tooltipComponent.destroy();
            this.tooltipComponent = null;
        }

        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }

        this.isVisible = false;
    }

    private updateTooltipPositionClass(change: ConnectedOverlayPositionChange): void {
        if (!this.tooltipComponent) return;

        // Determine position based on connection pair
        let positionName = 'top';
        const { originY, overlayY, originX, overlayX } = change.connectionPair;

        // Tooltip above trigger: overlay bottom connects to origin top
        if (originY === 'top' && overlayY === 'bottom') {
            positionName = 'top';
        }
        // Tooltip below trigger: overlay top connects to origin bottom
        else if (originY === 'bottom' && overlayY === 'top') {
            positionName = 'bottom';
        }
        // Tooltip to the left: overlay end connects to origin start
        else if (originX === 'start' && overlayX === 'end') {
            positionName = 'left';
        }
        // Tooltip to the right: overlay start connects to origin end
        else if (originX === 'end' && overlayX === 'start') {
            positionName = 'right';
        }

        const positionClass = `amw-tooltip--${positionName}`;
        const combinedClass = this.currentCustomClass ? `${positionClass} ${this.currentCustomClass}` : positionClass;

        this.tooltipComponent.setInput('class', combinedClass);
        this.tooltipComponent.instance.cdr.detectChanges();
    }

    private getOverlayConfig(config: TooltipConfig): OverlayConfig {
        const position = config.position || this.tooltipPosition();

        if (position === 'auto') {
            return this.getAutoPositionConfig();
        }

        const positionStrategy = this.overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withPositions(this.getPositionConfigs(position))
            .withPush(false);

        return {
            positionStrategy,
            hasBackdrop: false,
            panelClass: ['amw-tooltip-panel', config.class || ''].filter(Boolean)
        };
    }

    private getAutoPositionConfig(): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withPositions([
                { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
                { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
                { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
                { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' }
            ])
            .withPush(true);

        return {
            positionStrategy,
            hasBackdrop: false,
            panelClass: ['amw-tooltip-panel']
        };
    }

    private getPositionConfigs(position: string): any[] {
        const configs: any[] = [];

        switch (position) {
            case 'top':
                configs.push({ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' });
                break;
            case 'bottom':
                configs.push({ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' });
                break;
            case 'left':
                configs.push({ originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' });
                break;
            case 'right':
                configs.push({ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' });
                break;
        }

        return configs;
    }
}
