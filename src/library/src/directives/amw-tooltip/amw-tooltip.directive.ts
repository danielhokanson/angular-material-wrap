import { Directive, ElementRef, Input, OnDestroy, ComponentRef, HostListener, Injector } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
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
    @Input('amwTooltip') tooltipConfig: TooltipConfig | string = '';
    @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' | 'auto' = 'auto';
    @Input() tooltipDisabled: boolean = false;
    @Input() tooltipMaxWidth: string = '200px';
    @Input() tooltipClass: string = '';
    @Input() tooltipAllowHtml: boolean = false;

    private overlayRef: OverlayRef | null = null;
    private tooltipComponent: ComponentRef<AmwTooltipComponent> | null = null;
    private isVisible = false;

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
        if (this.tooltipDisabled || this.isVisible) {
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
        if (typeof this.tooltipConfig === 'string') {
            return {
                content: this.tooltipConfig,
                position: this.tooltipPosition,
                disabled: this.tooltipDisabled,
                maxWidth: this.tooltipMaxWidth,
                class: this.tooltipClass,
                allowHtml: this.tooltipAllowHtml
            };
        }
        return this.tooltipConfig;
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

        // Set tooltip content and configuration
        const position = config.position || this.tooltipPosition || 'top';
        const positionClass = `amw-tooltip--${position}`;
        const customClass = config.class || '';
        const combinedClass = customClass ? `${positionClass} ${customClass}` : positionClass;

        this.tooltipComponent.instance.content = config.content;
        this.tooltipComponent.instance.allowHtml = config.allowHtml || false;
        this.tooltipComponent.instance.maxWidth = config.maxWidth || '200px';
        this.tooltipComponent.instance.class = combinedClass;

        // Manually trigger change detection for dynamically created component
        this.tooltipComponent.instance.cdr.detectChanges();

        this.isVisible = true;
    }

    private destroyTooltip(): void {
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

    private getOverlayConfig(config: TooltipConfig): OverlayConfig {
        const position = config.position || this.tooltipPosition;

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
