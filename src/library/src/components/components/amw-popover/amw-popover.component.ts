import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, TemplateRef, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { OverlayModule, Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject, takeUntil, fromEvent } from 'rxjs';
import { BaseComponent } from '../../../controls/components/base/base.component';
import { PopoverConfig } from './interfaces/popover-config.interface';
import { PopoverTrigger } from './interfaces/popover-trigger.interface';

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
 *   [opened]="true"
 *   (openedChange)="onPopoverToggle($event)"
 *   (beforeOpen)="onBeforeOpen()"
 *   (afterOpen)="onAfterOpen()"
 *   (beforeClose)="onBeforeClose()"
 *   (afterClose)="onAfterClose()">
 *   <ng-template #trigger>
 *     <button mat-button>Click me</button>
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
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatTooltipModule,
        MatRippleModule,
        OverlayModule
    ],
    templateUrl: './amw-popover.component.html',
    styleUrl: './amw-popover.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AmwPopoverComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    /** Configuration object for the popover */
    @Input() config: PopoverConfig = {};

    /** Trigger configuration for the popover */
    @Input() trigger: PopoverTrigger = {};

    /** Whether the popover is opened */
    @Input() opened: boolean = false;

    /** Custom trigger template */
    @Input() triggerTemplate?: TemplateRef<any>;

    /** Custom content template */
    @Input() contentTemplate?: TemplateRef<any>;

    /** Custom header template */
    @Input() headerTemplate?: TemplateRef<any>;

    /** Custom footer template */
    @Input() footerTemplate?: TemplateRef<any>;

    /** Popover content text */
    @Input() content: string = '';

    /** Popover size */
    @Input() size: 'small' | 'medium' | 'large' = 'medium';

    /** Whether to show arrow */
    @Input() showArrow: boolean = false;

    /** Whether to show header */
    @Input() showHeader: boolean = false;

    /** Whether to show footer */
    @Input() showFooter: boolean = false;

    /** Whether to show close button */
    @Input() showClose: boolean = true;

    /** Header title */
    @Input() headerTitle: string = '';

    /** Header subtitle */
    @Input() headerSubtitle: string = '';

    /** Footer text */
    @Input() footerText: string = '';

    /** Close button text */
    @Input() closeButtonText: string = 'Close';

    /** Close button icon */
    @Input() closeButtonIcon: string = 'close';

    /** Arrow size */
    @Input() arrowSize: 'small' | 'medium' | 'large' = 'medium';

    /** Arrow color */
    @Input() arrowColor: string = 'var(--mat-sys-surface)';

    /** Whether content is scrollable */
    @Input() scrollable: boolean = false;

    /** Z-index for the popover */
    @Input() zIndex: number = 1000;

    /** Popover position */
    @Input() position: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'bottom';

    /** Whether to show backdrop */
    @Input() backdrop: boolean = false;

    /** Trigger icon */
    @Input() triggerIcon: string = '';

    /** Trigger text */
    @Input() triggerText: string = 'Click me';

    /** Popover ID */
    @Input() popoverId: string = '';

    /** Event emitted when popover opened state changes */
    @Output() openedChange = new EventEmitter<boolean>();

    /** Event emitted before popover opens */
    @Output() beforeOpen = new EventEmitter<void>();

    /** Event emitted after popover opens */
    @Output() afterOpen = new EventEmitter<void>();

    /** Event emitted before popover closes */
    @Output() beforeClose = new EventEmitter<void>();

    /** Event emitted after popover closes */
    @Output() afterClose = new EventEmitter<void>();

    /** Event emitted when popover is toggled */
    @Output() toggle = new EventEmitter<boolean>();

    /** Event emitted when popover is closed */
    @Output() close = new EventEmitter<void>();

    /** Reference to the trigger element */
    @ViewChild('triggerRef', { static: true }) triggerRef?: ElementRef<HTMLElement>;

    /** Reference to the content template */
    @ViewChild('contentRef', { static: false }) contentRef?: TemplateRef<any>;

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

    /** Close timeout reference */
    private closeTimeout?: number;

    constructor(
        private overlay: Overlay,
        private cdr: ChangeDetectorRef,
        private viewContainerRef: ViewContainerRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.initializeConfig();
        this.setupGlobalEventListeners(); // Only global listeners, no trigger-specific ones

        // Generate unique ID if not provided
        if (!this.popoverId) {
            this.popoverId = `amw-popover-${Math.random().toString(36).substr(2, 9)}`;
        }
    }

    ngAfterViewInit(): void {
        this.initializeOverlay();
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
        this.currentConfig = {
            opened: false,
            size: 'medium',
            position: 'bottom',
            showArrow: true,
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
            zIndex: 1000,
            ...this.config
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
            scroll: false,
            resize: false,
            orientationChange: false,
            windowBlur: false,
            windowFocus: false,
            windowResize: false,
            windowScroll: false,
            windowOrientationChange: false,
            windowVisibilityChange: false,
            keyboardNavigation: true,
            focusManagement: true,
            ariaAttributes: true,
            ariaExpanded: false,
            ariaHasPopup: true,
            ...this.trigger
        };
    }

    /**
     * Sets up event listeners
     */
    private setupEventListeners(): void {
        if (this.currentTrigger.type === 'click') {
            this.setupClickTrigger();
        } else if (this.currentTrigger.type === 'hover') {
            this.setupHoverTrigger();
        } else if (this.currentTrigger.type === 'focus') {
            this.setupFocusTrigger();
        }

        this.setupGlobalEventListeners();
    }

    /**
     * Sets up click trigger
     */
    private setupClickTrigger(): void {
        if (this.triggerRef) {
            fromEvent(this.triggerRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                    if (this.currentTrigger.preventDefault) {
                        event.preventDefault();
                    }
                    if (this.currentTrigger.stopPropagation) {
                        event.stopPropagation();
                    }
                    this.togglePopover();
                });
        }
    }

    /**
     * Sets up hover trigger
     */
    private setupHoverTrigger(): void {
        if (this.triggerRef) {
            fromEvent(this.triggerRef.nativeElement, 'mouseenter')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.currentTrigger.delay) {
                        this.hoverTimeout = window.setTimeout(() => {
                            this.openPopover();
                        }, this.currentTrigger.delay);
                    } else {
                        this.openPopover();
                    }
                });

            fromEvent(this.triggerRef.nativeElement, 'mouseleave')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.hoverTimeout) {
                        clearTimeout(this.hoverTimeout);
                    }
                    if (this.currentTrigger.closeDelay) {
                        this.closeTimeout = window.setTimeout(() => {
                            this.closePopover();
                        }, this.currentTrigger.closeDelay);
                    } else {
                        this.closePopover();
                    }
                });
        }
    }

    /**
     * Sets up focus trigger
     */
    private setupFocusTrigger(): void {
        if (this.triggerRef) {
            fromEvent(this.triggerRef.nativeElement, 'focus')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.openPopover();
                });

            fromEvent(this.triggerRef.nativeElement, 'blur')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.closePopover();
                });
        }
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
                    if (keyboardEvent.key === 'Escape' && this.opened) {
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
                    if (this.opened && this.overlayRef && !this.overlayRef.overlayElement.contains(mouseEvent.target as Node)) {
                        this.closePopover();
                    }
                });
        }

        // Scroll
        if (this.currentTrigger.scroll) {
            fromEvent(window, 'scroll')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened) {
                        this.closePopover();
                    }
                });
        }

        // Resize
        if (this.currentTrigger.resize) {
            fromEvent(window, 'resize')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened) {
                        this.closePopover();
                    }
                });
        }

        // Orientation change
        if (this.currentTrigger.orientationChange) {
            fromEvent(window, 'orientationchange')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened) {
                        this.closePopover();
                    }
                });
        }

        // Window blur
        if (this.currentTrigger.windowBlur) {
            fromEvent(window, 'blur')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened) {
                        this.closePopover();
                    }
                });
        }

        // Window focus
        if (this.currentTrigger.windowFocus) {
            fromEvent(window, 'focus')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened) {
                        this.closePopover();
                    }
                });
        }

        // Window resize
        if (this.currentTrigger.windowResize) {
            fromEvent(window, 'resize')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened) {
                        this.closePopover();
                    }
                });
        }

        // Window scroll
        if (this.currentTrigger.windowScroll) {
            fromEvent(window, 'scroll')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened) {
                        this.closePopover();
                    }
                });
        }

        // Window orientation change
        if (this.currentTrigger.windowOrientationChange) {
            fromEvent(window, 'orientationchange')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened) {
                        this.closePopover();
                    }
                });
        }

        // Window visibility change
        if (this.currentTrigger.windowVisibilityChange) {
            fromEvent(document, 'visibilitychange')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    if (this.opened) {
                        this.closePopover();
                    }
                });
        }
    }

    /**
     * Initializes the overlay
     */
    private initializeOverlay(): void {
        if (!this.triggerRef) {
            console.warn('AmwPopover: triggerRef not available for overlay initialization');
            return;
        }

        console.log('AmwPopover: Initializing overlay with triggerRef:', this.triggerRef.nativeElement);

        const overlayConfig: OverlayConfig = {
            positionStrategy: this.overlay.position()
                .flexibleConnectedTo(this.triggerRef)
                .withPositions(this.getPositionConfig())
                .withPush(false),
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            hasBackdrop: this.currentConfig.showBackdrop,
            backdropClass: this.currentConfig.backdropClass || 'amw-popover__backdrop',
            panelClass: this.currentConfig.panelClass || 'amw-popover__panel',
            width: this.getPopoverWidth(),
            height: this.getPopoverHeight(),
            minWidth: this.currentConfig.minWidth,
            maxWidth: this.currentConfig.maxWidth,
            minHeight: this.currentConfig.minHeight,
            maxHeight: this.currentConfig.maxHeight,
            disposeOnNavigation: true
        };

        this.overlayRef = this.overlay.create(overlayConfig);
        console.log('AmwPopover: Overlay created:', this.overlayRef);
    }

    /**
     * Gets the position configuration
     */
    private getPositionConfig(): any[] {
        const positions = [];
        const position = this.currentConfig.position || 'bottom';
        const offsetX = this.currentConfig.offsetX || 0;
        const offsetY = this.currentConfig.offsetY || 0;

        switch (position) {
            case 'top':
                positions.push({
                    originX: 'center',
                    originY: 'top',
                    overlayX: 'center',
                    overlayY: 'bottom',
                    offsetX,
                    offsetY: -offsetY
                });
                break;
            case 'bottom':
                positions.push({
                    originX: 'center',
                    originY: 'bottom',
                    overlayX: 'center',
                    overlayY: 'top',
                    offsetX,
                    offsetY
                });
                break;
            case 'left':
                positions.push({
                    originX: 'start',
                    originY: 'center',
                    overlayX: 'end',
                    overlayY: 'center',
                    offsetX: -offsetX,
                    offsetY
                });
                break;
            case 'right':
                positions.push({
                    originX: 'end',
                    originY: 'center',
                    overlayX: 'start',
                    overlayY: 'center',
                    offsetX,
                    offsetY
                });
                break;
            case 'top-left':
                positions.push({
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                    offsetX,
                    offsetY: -offsetY
                });
                break;
            case 'top-right':
                positions.push({
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom',
                    offsetX: -offsetX,
                    offsetY: -offsetY
                });
                break;
            case 'bottom-left':
                positions.push({
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetX,
                    offsetY
                });
                break;
            case 'bottom-right':
                positions.push({
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top',
                    offsetX: -offsetX,
                    offsetY
                });
                break;
        }

        return positions;
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
            case 'medium':
            default:
                return '300px';
        }
    }

    /**
     * Gets the popover height
     */
    private getPopoverHeight(): string | number | undefined {
        if (this.currentConfig.height) {
            return this.currentConfig.height;
        }

        return 'auto';
    }

    /**
     * Opens the popover
     */
    openPopover(): void {
        if (this.isOpening || this.isClosing || this.opened || this.currentConfig.disabled) {
            return;
        }

        console.log('AmwPopover: Opening popover, overlayRef:', this.overlayRef, 'contentRef:', this.contentRef);

        this.isOpening = true;
        this.beforeOpen.emit();

        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            // Use TemplatePortal with the content template instead of ComponentPortal
            if (this.contentRef) {
                console.log('AmwPopover: Attaching portal to overlay');
                const portal = new TemplatePortal(this.contentRef, this.viewContainerRef);
                this.overlayRef.attach(portal);
            } else {
                console.warn('AmwPopover: contentRef not available for portal creation');
            }
        } else if (!this.overlayRef) {
            console.warn('AmwPopover: overlayRef not available for popover opening');
        } else if (this.overlayRef.hasAttached()) {
            console.log('AmwPopover: Overlay already has content attached');
        }

        this.opened = true;
        this.openedChange.emit(true);
        this.toggle.emit(true);
        this.afterOpen.emit();

        this.isOpening = false;
        // REMOVED: this.cdr.detectChanges(); - can cause infinite loops
    }

    /**
     * Closes the popover
     */
    closePopover(): void {
        if (this.isOpening || this.isClosing || !this.opened) {
            return;
        }

        this.isClosing = true;
        this.beforeClose.emit();

        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }

        this.opened = false;
        this.openedChange.emit(false);
        this.close.emit();
        this.afterClose.emit();

        this.isClosing = false;
        // REMOVED: this.cdr.detectChanges(); - can cause infinite loops
    }

    /**
     * Toggles the popover
     */
    togglePopover(): void {
        if (this.opened) {
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
        if (this.isDisabled || this.isOpening || this.isClosing) return;

        // Prevent event bubbling to avoid duplicate handling
        event.stopPropagation();

        if (this.currentTrigger.type === 'click') {
            this.togglePopover();
        }
    }

    /**
     * Handles trigger mouse enter event
     */
    onTriggerMouseEnter(event: Event): void {
        if (this.isDisabled || this.isOpening || this.isClosing || this.currentTrigger.type !== 'hover') return;

        // Clear any existing close timeout
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
        if (this.isDisabled || this.isOpening || this.isClosing || this.currentTrigger.type !== 'hover') return;

        // Clear any existing hover timeout
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
        if (this.isDisabled || this.isOpening || this.isClosing || this.currentTrigger.type !== 'focus') return;
        this.openPopover();
    }

    /**
     * Handles trigger blur event
     */
    onTriggerBlur(event: Event): void {
        if (this.isDisabled || this.isOpening || this.isClosing || this.currentTrigger.type !== 'focus') return;
        this.closePopover();
    }

    /**
     * Handles trigger keydown event
     */
    onTriggerKeyDown(event: KeyboardEvent): void {
        if (this.isDisabled || this.isOpening || this.isClosing) return;

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
            this.togglePopover();
        } else if (event.key === 'Escape' && this.opened) {
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

