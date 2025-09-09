import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, TemplateRef, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { OverlayModule, Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
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
    viewEncapsulation: ViewEncapsulation.None
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
    private currentConfig: PopoverConfig = {};

    /** Current trigger configuration */
    private currentTrigger: PopoverTrigger = {};

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
        this.setupEventListeners();
    }

    ngAfterViewInit(): void {
        this.initializeOverlay();
    }

    ngOnDestroy(): void {
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
                .subscribe((event: KeyboardEvent) => {
                    if (event.key === 'Escape' && this.opened) {
                        this.closePopover();
                    }
                });
        }

        // Outside click
        if (this.currentTrigger.outsideClick) {
            fromEvent(document, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe((event: MouseEvent) => {
                    if (this.opened && this.overlayRef && !this.overlayRef.overlayElement.contains(event.target as Node)) {
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
            return;
        }

        const overlayConfig: OverlayConfig = {
            positionStrategy: this.overlay.position()
                .flexibleConnectedTo(this.triggerRef)
                .withPositions(this.getPositionConfig()),
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

        this.isOpening = true;
        this.beforeOpen.emit();

        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            const portal = this.contentRef ? new TemplatePortal(this.contentRef, this.viewContainerRef) : new ComponentPortal(PopoverContentComponent);
            this.overlayRef.attach(portal);
        }

        this.opened = true;
        this.openedChange.emit(true);
        this.toggle.emit(true);
        this.afterOpen.emit();

        this.isOpening = false;
        this.cdr.detectChanges();
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
        this.cdr.detectChanges();
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

/**
 * Popover content component
 */
@Component({
    selector: 'amw-popover-content',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatTooltipModule,
        MatRippleModule
    ],
    template: `
    <div [class]="getPopoverClasses()" [style.z-index]="getZIndex()">
      <!-- Arrow -->
      <div
        *ngIf="showArrow"
        [class]="getArrowClasses()"
        [style.width]="getArrowSize()"
        [style.height]="getArrowSize()"
        [style.border-color]="getArrowColor()">
      </div>
      
      <!-- Header -->
      <div *ngIf="showHeader" class="amw-popover__header">
        <div class="amw-popover__header-content">
          <div class="amw-popover__header-text">
            <h3 *ngIf="headerTitle" class="amw-popover__header-title">{{ headerTitle }}</h3>
            <p *ngIf="headerSubtitle" class="amw-popover__header-subtitle">{{ headerSubtitle }}</p>
          </div>
          
          <button
            *ngIf="showClose"
            mat-icon-button
            class="amw-popover__close"
            [attr.aria-label]="closeButtonText"
            (click)="onCloseClick()">
            <mat-icon>{{ closeButtonIcon }}</mat-icon>
          </button>
        </div>
      </div>
      
      <!-- Content -->
      <div class="amw-popover__content" [class]="getScrollbarClass()">
        <ng-content></ng-content>
      </div>
      
      <!-- Footer -->
      <div *ngIf="showFooter" class="amw-popover__footer">
        <p class="amw-popover__footer-text">{{ footerText }}</p>
      </div>
    </div>
  `,
    styles: [`
    .amw-popover {
      background: var(--mat-sys-surface);
      border-radius: 8px;
      box-shadow: var(--mat-sys-elevation-3);
      overflow: hidden;
      max-width: 100%;
      max-height: 100%;
    }
    
    .amw-popover__arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }
    
    .amw-popover__header {
      padding: 16px;
      border-bottom: 1px solid var(--mat-sys-outline-variant);
      background: var(--mat-sys-surface-container);
    }
    
    .amw-popover__header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .amw-popover__header-text {
      flex: 1;
    }
    
    .amw-popover__header-title {
      margin: 0 0 4px 0;
      font-size: 1.125rem;
      font-weight: 500;
      color: var(--mat-sys-on-surface);
    }
    
    .amw-popover__header-subtitle {
      margin: 0;
      font-size: 0.875rem;
      color: var(--mat-sys-on-surface-variant);
    }
    
    .amw-popover__close {
      color: var(--mat-sys-on-surface-variant);
    }
    
    .amw-popover__content {
      padding: 16px;
      max-height: 300px;
      overflow-y: auto;
    }
    
    .amw-popover__footer {
      padding: 16px;
      border-top: 1px solid var(--mat-sys-outline-variant);
      background: var(--mat-sys-surface-container);
    }
    
    .amw-popover__footer-text {
      margin: 0;
      font-size: 0.875rem;
      color: var(--mat-sys-on-surface-variant);
    }
  `]
})
export class PopoverContentComponent {
    @Input() showArrow = false;
    @Input() showHeader = false;
    @Input() showFooter = false;
    @Input() showClose = true;
    @Input() headerTitle = '';
    @Input() headerSubtitle = '';
    @Input() footerText = '';
    @Input() closeButtonText = 'Close';
    @Input() closeButtonIcon = 'close';
    @Input() arrowSize = '12px';
    @Input() arrowColor = 'var(--mat-sys-surface)';
    @Input() scrollbarClass = 'amw-popover__scrollbar';
    @Input() zIndex = 1000;

    @Output() closeClick = new EventEmitter<void>();

    onCloseClick(): void {
        this.closeClick.emit();
    }

    getPopoverClasses(): string {
        return 'amw-popover';
    }

    getArrowClasses(): string {
        return 'amw-popover__arrow';
    }

    getArrowSize(): string {
        return this.arrowSize;
    }

    getArrowColor(): string {
        return this.arrowColor;
    }

    getScrollbarClass(): string {
        return this.scrollbarClass;
    }

    getZIndex(): number {
        return this.zIndex;
    }
}
