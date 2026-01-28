import { Component, OnInit, OnDestroy, TemplateRef, viewChild, contentChild, ElementRef, AfterViewInit, AfterContentInit, ChangeDetectorRef, ViewContainerRef, ViewEncapsulation, input, output, model, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AmwIconComponent } from '../amw-icon/amw-icon.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { OverlayModule, Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject, takeUntil, fromEvent } from 'rxjs';
import { PopoverConfig } from './interfaces/popover-config.interface';
import { PopoverTrigger } from './interfaces/popover-trigger.interface';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';

/**
 * Angular Material Wrap Popover Component
 *
 * A flexible popover component that provides positioning, triggering, and content management
 * with comprehensive configuration options and accessibility support.
 *
 * @example
 * ```html
 * <amw-popover
 *   [config]="popoverConfig"
 *   [trigger]="popoverTrigger"
 *   [(opened)]="isOpen"
 *   (beforeOpen)="onBeforeOpen()"
 *   (afterOpen)="onAfterOpen()"
 *   (beforeClose)="onBeforeClose()"
 *   (afterClose)="onAfterClose()">
 *   <ng-template #trigger>
 *     <amw-button appearance="text">Click me</amw-button>
 *   </ng-template>
 *   <ng-template #content>
 *     <div>Popover content</div>
 *   </ng-template>
 * </amw-popover>
 * ```
 */
@Component({
    selector: 'amw-popover',
    standalone: true,
    imports: [
        CommonModule,
        AmwButtonComponent,
        AmwIconComponent,
        MatCardModule,
        MatDividerModule,
        MatRippleModule,
        OverlayModule
    ],
    templateUrl: './amw-popover.component.html',
    styleUrl: './amw-popover.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AmwPopoverComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
    // Signal-based inputs
    /** Configuration object for the popover */
    config = input<PopoverConfig>({});

    /** Trigger configuration for the popover */
    trigger = input<PopoverTrigger>({});

    /** Whether the popover is opened (two-way bindable) */
    opened = model<boolean>(false);

    /** Custom trigger template (via input) */
    triggerTemplate = input<TemplateRef<any> | undefined>(undefined);

    /** Custom content template (via input) */
    contentTemplate = input<TemplateRef<any> | undefined>(undefined);

    /** Custom header template */
    headerTemplate = input<TemplateRef<any> | undefined>(undefined);

    /** Custom footer template */
    footerTemplate = input<TemplateRef<any> | undefined>(undefined);

    /** Popover content text */
    content = input<string>('');

    /** Popover size */
    size = input<'small' | 'medium' | 'large' | 'extra-large'>('medium');

    /** Whether the popover is disabled */
    disabled = input<boolean>(false);

    /** Whether to show arrow */
    showArrow = input<boolean>(false);

    /** Whether to show header */
    showHeader = input<boolean>(false);

    /** Whether to show footer */
    showFooter = input<boolean>(false);

    /** Whether to show close button */
    showClose = input<boolean>(true);

    /** Header title */
    headerTitle = input<string>('');

    /** Header subtitle */
    headerSubtitle = input<string>('');

    /** Footer text */
    footerText = input<string>('');

    /** Close button text */
    closeButtonText = input<string>('Close');

    /** Close button icon */
    closeButtonIcon = input<string>('close');

    /** Arrow size */
    arrowSize = input<'small' | 'medium' | 'large'>('medium');

    /** Arrow color */
    arrowColor = input<string>('var(--mat-sys-surface)');

    /** Whether content is scrollable */
    scrollable = input<boolean>(false);

    /** Z-index for the popover */
    zIndex = input<number>(1000);

    /** Popover position */
    position = input<'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('bottom');

    /** Whether to show backdrop */
    backdrop = input<boolean>(false);

    /** Trigger icon */
    triggerIcon = input<string>('');

    /** Trigger text */
    triggerText = input<string>('Click me');

    /** Popover ID */
    popoverId = input<string>('');

    // Signal-based outputs
    /** Event emitted before popover opens */
    beforeOpen = output<void>();

    /** Event emitted after popover opens */
    afterOpen = output<void>();

    /** Event emitted before popover closes */
    beforeClose = output<void>();

    /** Event emitted after popover closes */
    afterClose = output<void>();

    /** Event emitted when popover is toggled */
    toggle = output<boolean>();

    /** Event emitted when popover is closed */
    close = output<void>();

    /** Custom trigger template (via content projection) */
    projectedTriggerTemplate = contentChild<TemplateRef<any>>('trigger');

    /** Custom content template (via content projection) */
    projectedContentTemplate = contentChild<TemplateRef<any>>('content');

    /** Reference to the trigger element */
    triggerRef = viewChild<ElementRef<HTMLElement>>('triggerRef');

    /** Reference to the content template */
    contentRef = viewChild<TemplateRef<any>>('contentRef');

    // Internal signals for resolved templates
    resolvedTriggerTemplate = signal<TemplateRef<any> | undefined>(undefined);
    resolvedContentTemplate = signal<TemplateRef<any> | undefined>(undefined);

    // Internal signal for generated popover ID
    private generatedPopoverId = signal<string>('');

    // Computed signal for actual popover ID
    actualPopoverId = computed(() => this.popoverId() || this.generatedPopoverId());

    /** Overlay reference */
    private overlayRef?: OverlayRef;

    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    /** Current popover configuration */
    currentConfig: PopoverConfig = {};

    /** Current trigger configuration */
    currentTrigger: PopoverTrigger = {};

    /** Whether the popover is currently opening */
    private isOpening = false;

    /** Whether the popover is currently closing */
    private isClosing = false;

    /** Hover timeout reference */
    private hoverTimeout?: number;

    /** Last zoom level for detecting zoom changes */
    private lastZoomLevel?: number;

    /** Close timeout reference */
    private closeTimeout?: number;

    constructor(
        private overlay: Overlay,
        private cdr: ChangeDetectorRef,
        private viewContainerRef: ViewContainerRef
    ) {}

    ngOnInit(): void {
        this.initializeConfig();

        // Generate unique ID if not provided
        if (!this.popoverId()) {
            this.generatedPopoverId.set(`amw-popover-${Math.random().toString(36).substr(2, 9)}`);
        }
    }

    ngAfterContentInit(): void {
        // Use projected templates if input templates are not provided
        this.resolvedTriggerTemplate.set(this.triggerTemplate() || this.projectedTriggerTemplate());
        this.resolvedContentTemplate.set(this.contentTemplate() || this.projectedContentTemplate());
    }

    ngAfterViewInit(): void {
        // Wait for the next tick to ensure the trigger element is properly rendered
        setTimeout(() => {
            this.initializeOverlay();
            this.setupEventListeners();
        }, 0);
    }

    ngOnDestroy(): void {
        // Clear any pending timeouts to prevent memory leaks
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = undefined;
        }
        if (this.closeTimeout) {
            clearTimeout(this.closeTimeout);
            this.closeTimeout = undefined;
        }

        this.destroy$.next();
        this.destroy$.complete();
        this.cleanup();
    }

    /**
     * Initializes the popover configuration
     */
    private initializeConfig(): void {
        // Start with defaults
        const defaults: PopoverConfig = {
            opened: false,
            size: 'medium',
            position: 'bottom',
            showArrow: false,
            showClose: true,
            showHeader: false,
            showFooter: false,
            showBackdrop: false,
            disableClose: false,
            autoFocus: true,
            restoreFocus: true,
            keyboardNavigation: true,
            escapeKeyClose: true,
            clickOutsideClose: true,
            hoverOpen: false,
            hoverClose: false,
            focusOpen: false,
            focusClose: false,
            scrollClose: false,
            resizeClose: false,
            orientationChangeClose: false,
            windowBlurClose: false,
            windowFocusClose: false,
            windowResizeClose: false,
            windowScrollClose: false,
            windowOrientationChangeClose: false,
            windowVisibilityChangeClose: false,
            animationDuration: 300,
            animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1000
        };

        // Individual inputs take precedence over config object and defaults
        const inputOverrides: PopoverConfig = {
            size: this.size(),
            position: this.position(),
            showArrow: this.showArrow(),
            showClose: this.showClose(),
            showHeader: this.showHeader(),
            showFooter: this.showFooter(),
            showBackdrop: this.backdrop(),
            disabled: this.disabled(),
            headerTitle: this.headerTitle(),
            headerSubtitle: this.headerSubtitle(),
            footerText: this.footerText(),
            closeText: this.closeButtonText(),
            closeIcon: this.closeButtonIcon(),
            arrowSize: this.arrowSize(),
            arrowColor: this.arrowColor(),
            zIndex: this.zIndex()
        };

        // Merge: defaults < config() < individual inputs
        this.currentConfig = {
            ...defaults,
            ...this.config(),
            ...inputOverrides
        };

        this.currentTrigger = {
            type: 'click',
            disabled: false,
            preventDefault: false,
            stopPropagation: false,
            delay: 0,
            closeDelay: 0,
            toggle: true,
            escapeKey: true,
            outsideClick: true,
            scroll: true,
            resize: true,
            orientationChange: false,
            windowBlur: false,
            windowFocus: false,
            windowResize: true,
            windowScroll: true,
            windowOrientationChange: false,
            windowVisibilityChange: false,
            keyboardNavigation: true,
            focusManagement: true,
            ariaAttributes: true,
            ariaExpanded: false,
            ariaHasPopup: true,
            ...this.trigger()
        };
    }

    /**
     * Sets up event listeners
     * Note: Click, hover, and focus triggers are handled via template bindings
     * in the HTML (onTriggerClick, onTriggerMouseEnter, etc.)
     * This method only sets up global event listeners.
     */
    private setupEventListeners(): void {
        this.setupGlobalEventListeners();
    }

    /**
     * Sets up global event listeners
     */
    private setupGlobalEventListeners(): void {
        // Escape key
        if (this.currentTrigger.escapeKey) {
            fromEvent(document, 'keydown')
                .pipe(takeUntil(this.destroy$))
                .subscribe((event: Event) => {
                    const keyboardEvent = event as KeyboardEvent;
                    if (keyboardEvent.key === 'Escape' && this.opened()) {
                        this.closePopover();
                    }
                });
        }

        // Outside click
        if (this.currentTrigger.outsideClick) {
            fromEvent(document, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe((event: Event) => {
                    const mouseEvent = event as MouseEvent;
                    const target = mouseEvent.target as Node;
                    const isInsideOverlay = this.overlayRef?.overlayElement?.contains(target);
                    const isInsideTrigger = this.triggerRef()?.nativeElement?.contains(target);

                    if (this.opened() && this.overlayRef && !isInsideOverlay && !isInsideTrigger) {
                        this.closePopover();
                    }
                });
        }

        // Scroll - only close if scroll happens outside the popover
        if (this.currentTrigger.scroll) {
            // Helper to check if scroll is inside popover
            const isScrollInsidePopover = (event: Event): boolean => {
                const target = event.target as Node | null;
                if (!target || !this.overlayRef?.overlayElement) return false;
                return this.overlayRef.overlayElement.contains(target);
            };

            fromEvent(window, 'scroll')
                .pipe(takeUntil(this.destroy$))
                .subscribe((event: Event) => {
                    if (this.opened() && !isScrollInsidePopover(event)) {
                        this.closePopover();
                    }
                });

            fromEvent(document, 'scroll', { capture: true })
                .pipe(takeUntil(this.destroy$))
                .subscribe((event: Event) => {
                    if (this.opened() && !isScrollInsidePopover(event)) {
                        this.closePopover();
                    }
                });
        }

        // Resize
        if (this.currentTrigger.resize) {
            fromEvent(window, 'resize')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened() && this.overlayRef) {
                        this.positionPopover();
                    }
                });
        }

        // Orientation change
        if (this.currentTrigger.orientationChange) {
            fromEvent(window, 'orientationchange')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened()) {
                        this.closePopover();
                    }
                });
        }

        // Window blur
        if (this.currentTrigger.windowBlur) {
            fromEvent(window, 'blur')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened()) {
                        this.closePopover();
                    }
                });
        }

        // Window focus
        if (this.currentTrigger.windowFocus) {
            fromEvent(window, 'focus')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened()) {
                        this.closePopover();
                    }
                });
        }

        // Window resize
        if (this.currentTrigger.windowResize) {
            fromEvent(window, 'resize')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened() && this.overlayRef) {
                        this.positionPopover();
                    }
                });
        }

        // Window scroll
        if (this.currentTrigger.windowScroll) {
            fromEvent(window, 'scroll')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened()) {
                        this.closePopover();
                    }
                });
        }

        // Zoom events (using resize as a proxy for zoom)
        fromEvent(window, 'resize')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                if (this.opened()) {
                    const currentZoom = window.innerWidth / window.outerWidth;
                    if (this.lastZoomLevel && Math.abs(currentZoom - this.lastZoomLevel) > 0.01) {
                        this.closePopover();
                    }
                    this.lastZoomLevel = currentZoom;
                }
            });

        // Window orientation change
        if (this.currentTrigger.windowOrientationChange) {
            fromEvent(window, 'orientationchange')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened()) {
                        this.closePopover();
                    }
                });
        }

        // Window visibility change
        if (this.currentTrigger.windowVisibilityChange) {
            fromEvent(document, 'visibilitychange')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened()) {
                        this.closePopover();
                    }
                });
        }
    }

    /**
     * Initializes the overlay
     */
    private initializeOverlay(): void {
        if (!this.triggerRef()) {
            console.warn('AmwPopover: triggerRef not available for overlay initialization');
            return;
        }

        const overlayConfig: OverlayConfig = {
            positionStrategy: this.overlay.position().global()
                .centerHorizontally()
                .centerVertically(),
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            hasBackdrop: this.currentConfig.showBackdrop || false,
            backdropClass: 'amw-popover__backdrop',
            panelClass: ['amw-popover__panel', 'cdk-overlay-pane'],
            width: this.getPopoverWidth(),
            height: 'auto',
            disposeOnNavigation: true
        };

        this.overlayRef = this.overlay.create(overlayConfig);

        this.overlayRef.attachments().subscribe(() => {
            // Overlay attached
        });

        this.overlayRef.detachments().subscribe(() => {
            // Overlay detached
        });

        this.overlayRef.backdropClick().subscribe(() => {
            if (this.currentConfig.clickOutsideClose) {
                this.closePopover();
            }
        });
    }

    /**
     * Gets the popover width
     */
    private getPopoverWidth(): string | number | undefined {
        if (this.currentConfig.width) {
            return this.currentConfig.width;
        }

        switch (this.currentConfig.size) {
            case 'small':
                return '200px';
            case 'large':
                return '400px';
            case 'extra-large':
                return '500px';
            case 'medium':
            default:
                return '300px';
        }
    }

    /**
     * Opens the popover
     */
    openPopover(): void {
        if (this.isOpening || this.isClosing || this.opened() || this.currentConfig.disabled) {
            return;
        }

        this.isOpening = true;
        this.beforeOpen.emit();

        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            const contentTemplate = this.contentRef();
            if (contentTemplate) {
                const portal = new TemplatePortal(contentTemplate, this.viewContainerRef);
                this.overlayRef.attach(portal);
            } else {
                this.createFallbackContent();
            }

            setTimeout(() => {
                this.positionPopover();
            }, 0);
        }

        this.opened.set(true);
        this.toggle.emit(true);
        this.afterOpen.emit();

        this.isOpening = false;
        this.cdr.detectChanges();
    }

    /**
     * Closes the popover
     */
    closePopover(): void {
        if (this.isOpening || this.isClosing || !this.opened()) {
            return;
        }

        this.isClosing = true;
        this.beforeClose.emit();

        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }

        this.opened.set(false);
        this.close.emit();
        this.afterClose.emit();

        this.isClosing = false;
    }

    /**
     * Toggles the popover
     */
    togglePopover(): void {
        if (this.opened()) {
            this.closePopover();
        } else {
            this.openPopover();
        }
    }

    /**
     * Handles close button click
     */
    onCloseClick(): void {
        this.closePopover();
    }

    /**
     * Handles trigger click event
     */
    onTriggerClick(event: Event): void {
        if (this.disabled() || this.isOpening || this.isClosing) return;

        event.stopPropagation();

        if (this.currentTrigger.type === 'click') {
            this.togglePopover();
        }
    }

    /**
     * Handles trigger mouse enter event
     */
    onTriggerMouseEnter(event: Event): void {
        if (this.disabled() || this.isOpening || this.isClosing || this.currentTrigger.type !== 'hover') return;

        if (this.closeTimeout) {
            clearTimeout(this.closeTimeout);
            this.closeTimeout = undefined;
        }

        if (this.currentTrigger.delay) {
            this.hoverTimeout = window.setTimeout(() => {
                this.openPopover();
            }, this.currentTrigger.delay);
        } else {
            this.openPopover();
        }
    }

    /**
     * Handles trigger mouse leave event
     */
    onTriggerMouseLeave(event: Event): void {
        if (this.disabled() || this.isOpening || this.isClosing || this.currentTrigger.type !== 'hover') return;

        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = undefined;
        }

        if (this.currentTrigger.closeDelay) {
            this.closeTimeout = window.setTimeout(() => {
                this.closePopover();
            }, this.currentTrigger.closeDelay);
        } else {
            this.closePopover();
        }
    }

    /**
     * Handles trigger focus event
     */
    onTriggerFocus(event: Event): void {
        if (this.disabled() || this.isOpening || this.isClosing || this.currentTrigger.type !== 'focus') return;
        this.openPopover();
    }

    /**
     * Handles trigger blur event
     */
    onTriggerBlur(event: Event): void {
        if (this.disabled() || this.isOpening || this.isClosing || this.currentTrigger.type !== 'focus') return;
        this.closePopover();
    }

    /**
     * Handles trigger keydown event
     */
    onTriggerKeyDown(event: KeyboardEvent): void {
        if (this.disabled() || this.isOpening || this.isClosing) return;

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
            this.togglePopover();
        } else if (event.key === 'Escape' && this.opened()) {
            event.preventDefault();
            event.stopPropagation();
            this.closePopover();
        }
    }

    /**
     * Handles backdrop click event
     */
    onBackdropClick(event: Event): void {
        if (this.currentConfig.clickOutsideClose && !this.isOpening && !this.isClosing) {
            this.closePopover();
        }
    }

    /**
     * Gets the CSS classes for the popover
     */
    getPopoverClasses(): string {
        const classes = ['amw-popover'];

        if (this.currentConfig.size) {
            classes.push(`amw-popover--${this.currentConfig.size}`);
        }

        if (this.currentConfig.position) {
            classes.push(`amw-popover--${this.currentConfig.position}`);
        }

        if (this.currentConfig.showArrow) {
            classes.push('amw-popover--with-arrow');
        }

        if (this.currentConfig.showHeader) {
            classes.push('amw-popover--with-header');
        }

        if (this.currentConfig.showFooter) {
            classes.push('amw-popover--with-footer');
        }

        if (this.currentConfig.showScrollbar) {
            classes.push('amw-popover--with-scrollbar');
        }

        if (this.currentConfig.disabled) {
            classes.push('amw-popover--disabled');
        }

        return classes.join(' ');
    }

    /**
     * Gets the CSS classes for the arrow
     */
    getArrowClasses(): string {
        const classes = ['amw-popover__arrow'];

        if (this.currentConfig.arrowSize) {
            classes.push(`amw-popover__arrow--${this.currentConfig.arrowSize}`);
        }

        if (this.currentConfig.position) {
            classes.push(`amw-popover__arrow--${this.currentConfig.position}`);
        }

        return classes.join(' ');
    }

    /**
     * Gets the arrow size
     */
    getArrowSize(): string {
        switch (this.currentConfig.arrowSize) {
            case 'small':
                return '8px';
            case 'large':
                return '16px';
            case 'medium':
            default:
                return '12px';
        }
    }

    /**
     * Gets the arrow color
     */
    getArrowColor(): string {
        return this.currentConfig.arrowColor || 'var(--mat-sys-surface)';
    }

    /**
     * Gets the close button text
     */
    getCloseButtonText(): string {
        return this.currentConfig.closeText || 'Close';
    }

    /**
     * Gets the close button icon
     */
    getCloseButtonIcon(): string {
        return this.currentConfig.closeIcon || 'close';
    }

    /**
     * Gets the header title
     */
    getHeaderTitle(): string {
        return this.currentConfig.headerTitle || '';
    }

    /**
     * Gets the header subtitle
     */
    getHeaderSubtitle(): string {
        return this.currentConfig.headerSubtitle || '';
    }

    /**
     * Gets the footer text
     */
    getFooterText(): string {
        return this.currentConfig.footerText || '';
    }

    /**
     * Gets the scrollbar class
     */
    getScrollbarClass(): string {
        return this.currentConfig.scrollbarClass || 'amw-popover__scrollbar';
    }

    /**
     * Gets the z-index
     */
    getZIndex(): number {
        return this.currentConfig.zIndex || 1000;
    }

    /**
     * Creates fallback content when template is not available
     */
    private createFallbackContent(): void {
        if (!this.overlayRef) return;

        const overlayElement = this.overlayRef.overlayElement;
        if (overlayElement) {
            overlayElement.innerHTML = `
                <div id="${this.actualPopoverId()}" class="amw-popover__popover amw-popover__popover--visible amw-popover__popover--medium" role="dialog" aria-hidden="false">
                    <div class="amw-popover__content" id="${this.actualPopoverId()}-content">
                        <div class="amw-popover__default-content">
                            <p>${this.content() || 'Popover content'}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Manually positions the popover relative to the trigger element.
     */
    private positionPopover(): void {
        const triggerEl = this.triggerRef();
        if (!this.overlayRef || !triggerEl) return;

        const triggerElement = triggerEl.nativeElement;
        const overlayElement = this.overlayRef.overlayElement;

        if (!overlayElement) return;

        const triggerRect = triggerElement.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const popoverRect = overlayElement.getBoundingClientRect();
        const popoverWidth = popoverRect.width || 300;
        const popoverHeight = popoverRect.height || 200;

        let left: number;
        let top: number;
        const gap = 8;

        switch (this.position()) {
            case 'right':
                left = triggerRect.right + gap;
                top = triggerRect.top + (triggerRect.height / 2) - (popoverHeight / 2);
                break;
            case 'left':
                left = triggerRect.left - popoverWidth - gap;
                top = triggerRect.top + (triggerRect.height / 2) - (popoverHeight / 2);
                break;
            case 'top':
                left = triggerRect.left + (triggerRect.width / 2) - (popoverWidth / 2);
                top = triggerRect.top - popoverHeight - gap;
                break;
            case 'bottom':
                left = triggerRect.left + (triggerRect.width / 2) - (popoverWidth / 2);
                top = triggerRect.bottom + gap;
                break;
            case 'top-left':
                left = triggerRect.left;
                top = triggerRect.top - popoverHeight - gap;
                break;
            case 'top-right':
                left = triggerRect.right - popoverWidth;
                top = triggerRect.top - popoverHeight - gap;
                break;
            case 'bottom-left':
                left = triggerRect.left;
                top = triggerRect.bottom + gap;
                break;
            case 'bottom-right':
                left = triggerRect.right - popoverWidth;
                top = triggerRect.bottom + gap;
                break;
            default:
                left = triggerRect.right + gap;
                top = triggerRect.top + (triggerRect.height / 2) - (popoverHeight / 2);
        }

        // Adjust if popover would go off screen
        if (left < gap) left = gap;
        if (left + popoverWidth > viewportWidth - gap) {
            left = viewportWidth - popoverWidth - gap;
        }
        if (top < gap) top = gap;
        if (top + popoverHeight > viewportHeight - gap) {
            top = viewportHeight - popoverHeight - gap;
        }

        overlayElement.style.position = 'fixed';
        overlayElement.style.left = `${left}px`;
        overlayElement.style.top = `${top}px`;
        overlayElement.style.transform = 'none';
    }

    /**
     * Cleans up resources
     */
    private cleanup(): void {
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
        }
        if (this.closeTimeout) {
            clearTimeout(this.closeTimeout);
        }
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
    }
}
