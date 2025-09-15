import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2, TemplateRef, ViewContainerRef, ComponentRef, HostListener, Injector } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig, FlexibleConnectedPositionStrategy, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { AmwTooltipComponent } from './amw-tooltip.component';

export interface TooltipConfig {
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
    delay?: number;
    showDelay?: number;
    hideDelay?: number;
    disabled?: boolean;
    maxWidth?: string;
    class?: string;
    allowHtml?: boolean;
}

@Directive({
    selector: '[amwTooltip]',
    standalone: true
})
export class AmwTooltipDirective implements OnInit, OnDestroy {
    @Input('amwTooltip') tooltipConfig: TooltipConfig | string = '';
    @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' | 'auto' = 'auto';
    @Input() tooltipDelay: number = 0;
    @Input() tooltipShowDelay: number = 0;
    @Input() tooltipHideDelay: number = 0;
    @Input() tooltipDisabled: boolean = false;
    @Input() tooltipMaxWidth: string = '200px';
    @Input() tooltipClass: string = '';
    @Input() tooltipAllowHtml: boolean = false;

    private overlayRef: OverlayRef | null = null;
    private tooltipComponent: ComponentRef<AmwTooltipComponent> | null = null;
    private showTimeout: any;
    private hideTimeout: any;
    private isVisible = false;

    constructor(
        private elementRef: ElementRef,
        private overlay: Overlay,
        private renderer: Renderer2,
        private injector: Injector
    ) { }

    ngOnInit(): void {
        // Set up event listeners
        this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', () => this.show());
        this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', () => this.hide());
        this.renderer.listen(this.elementRef.nativeElement, 'focus', () => this.show());
        this.renderer.listen(this.elementRef.nativeElement, 'blur', () => this.hide());
    }

    ngOnDestroy(): void {
        this.hide();
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

        // Clear any existing timeout
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        // Set show delay
        this.showTimeout = setTimeout(() => {
            this.createTooltip(config);
        }, config.showDelay || this.tooltipShowDelay);
    }

    private hide(): void {
        // Clear any existing timeout
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }

        // Set hide delay
        this.hideTimeout = setTimeout(() => {
            this.destroyTooltip();
        }, this.getConfig().hideDelay || this.tooltipHideDelay);
    }

    private getConfig(): TooltipConfig {
        if (typeof this.tooltipConfig === 'string') {
            return {
                content: this.tooltipConfig,
                position: this.tooltipPosition,
                delay: this.tooltipDelay,
                showDelay: this.tooltipShowDelay,
                hideDelay: this.tooltipHideDelay,
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
        this.tooltipComponent.instance.content = config.content;
        this.tooltipComponent.instance.allowHtml = config.allowHtml || false;
        this.tooltipComponent.instance.maxWidth = config.maxWidth || '200px';
        this.tooltipComponent.instance.class = config.class || '';

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
