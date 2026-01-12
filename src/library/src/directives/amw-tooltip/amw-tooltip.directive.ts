import { Directive, ElementRef, input, OnDestroy, ComponentRef, HostListener, Injector } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { AmwTooltipComponent } from './amw-tooltip.component';

export interface TooltipConfig {
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
    disabled?: boolean;
    maxWidth?: string;
    class?: string;
    allowHtml?: boolean;
}

@Directive({
    selector: '[amwTooltip]',
    standalone: true
})
export class AmwTooltipDirective implements OnDestroy {
    tooltipConfig = input<TooltipConfig | string>('', { alias: 'amwTooltip' });
    tooltipPosition = input<'top' | 'bottom' | 'left' | 'right' | 'auto'>('auto');
    tooltipDisabled = input<boolean>(false);
    tooltipMaxWidth = input<string>('200px');
    tooltipClass = input<string>('');
    tooltipAllowHtml = input<boolean>(false);

    private overlayRef: OverlayRef | null = null;
    private tooltipComponent: ComponentRef<AmwTooltipComponent> | null = null;
    private isVisible = false;
    private positionSubscription: Subscription | null = null;
    private currentCustomClass = '';

    constructor(
        private elementRef: ElementRef,
        private overlay: Overlay,
        private injector: Injector
    ) { }

    ngOnDestroy(): void {
        this.destroyTooltip();
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
    }

    @HostListener('mouseenter')
    onMouseEnter(): void {
        this.show();
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.hide();
    }

    @HostListener('focus')
    onFocus(): void {
        this.show();
    }

    @HostListener('blur')
    onBlur(): void {
        this.hide();
    }

    private show(): void {
        if (this.tooltipDisabled() || this.isVisible) {
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
                position: this.tooltipPosition(),
                disabled: this.tooltipDisabled(),
                maxWidth: this.tooltipMaxWidth(),
                class: this.tooltipClass(),
                allowHtml: this.tooltipAllowHtml()
            };
        }
        return config;
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
