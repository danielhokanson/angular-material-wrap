import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, TemplateRef, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { BaseComponent } from '../../../controls/components/base/base.component';
import { SidenavConfig } from './interfaces/sidenav-config.interface';
import { SidenavItem } from './interfaces/sidenav-item.interface';
import { AmwTooltipDirective } from '../../../directives';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';

/**
 * Angular Material Wrap Sidenav Component
 * 
 * A comprehensive sidenav component that provides navigation functionality with responsive behavior,
 * customizable appearance, and support for nested navigation items.
 * 
 * @example
 * ```html
 * <amw-sidenav
 *   [config]="sidenavConfig"
 *   [items]="navigationItems"
 *   [opened]="true"
 *   (openedChange)="onSidenavToggle($event)"
 *   (itemClick)="onItemClick($event)">
 * </amw-sidenav>
 * ```
 */
@Component({
    selector: 'amw-sidenav',
    standalone: true,
    imports: [
        CommonModule,
        MatSidenavModule,
        AmwButtonComponent,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatDividerModule,
        AmwTooltipDirective,
        MatRippleModule,
        MatBadgeModule,
        MatExpansionModule,
        RouterModule
    ],
    templateUrl: './amw-sidenav.component.html',
    styleUrl: './amw-sidenav.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AmwSidenavComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    /** Configuration object for the sidenav */
    @Input() config: SidenavConfig = {};

    /** Navigation items to display in the sidenav */
    @Input() items: SidenavItem[] = [];

    /** Whether the sidenav is opened */
    @Input() opened: boolean = false;

    /** Custom header template */
    @Input() headerTemplate?: TemplateRef<any>;

    /** Custom footer template */
    @Input() footerTemplate?: TemplateRef<any>;

    /** Custom item template */
    @Input() itemTemplate?: TemplateRef<any>;

    /** Whether to show the toggle button */
    @Input() showToggle: boolean = true;

    /** Whether to show the close button */
    @Input() showClose: boolean = true;

    /** Event emitted when sidenav opened state changes */
    @Output() openedChange = new EventEmitter<boolean>();

    /** Event emitted when a navigation item is clicked */
    @Output() itemClick = new EventEmitter<SidenavItem>();

    /** Event emitted when sidenav is toggled */
    @Output() toggle = new EventEmitter<boolean>();

    /** Event emitted when sidenav is closed */
    @Output() close = new EventEmitter<void>();

    /** Reference to the MatSidenav */
    @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

    /** Reference to the toggle button */
    @ViewChild('toggleButton', { static: false }) toggleButton?: ElementRef<HTMLButtonElement>;

    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    /** Whether the component is in mobile view */
    isMobile = false;

    /** Whether the component is in tablet view */
    isTablet = false;

    /** Whether the component is in desktop view */
    isDesktop = false;

    /** Current breakpoint */
    currentBreakpoint = '';

    /** Whether the sidenav is responsive */
    get isResponsive(): boolean {
        return this.config.responsive !== false;
    }

    /** Current sidenav mode */
    get sidenavMode(): 'over' | 'push' | 'side' {
        if (this.isMobile && this.isResponsive) {
            return 'over';
        }
        return this.config.mode || 'side';
    }

    /** Whether the sidenav should be opened by default */
    get defaultOpened(): boolean {
        if (this.isMobile && this.isResponsive) {
            return false;
        }
        return this.config.opened ?? true;
    }

    /** Sidenav width */
    get sidenavWidth(): string {
        if (this.config.width) {
            return typeof this.config.width === 'number' ? `${this.config.width}px` : this.config.width;
        }

        switch (this.config.size) {
            case 'small':
                return '200px';
            case 'large':
                return '320px';
            case 'medium':
            default:
                return '280px';
        }
    }

    /** Toggle button text */
    get toggleButtonText(): string {
        return this.config.toggleText || 'Toggle Menu';
    }

    /** Toggle button icon */
    get toggleButtonIcon(): string {
        return this.config.toggleIcon || 'menu';
    }

    /** Close button text */
    get closeButtonText(): string {
        return this.config.closeText || 'Close';
    }

    /** Close button icon */
    get closeButtonIcon(): string {
        return this.config.closeIcon || 'close';
    }

    /** Whether to show the backdrop */
    get showBackdrop(): boolean {
        return this.config.showBackdrop !== false;
    }

    /** Whether the sidenav is disabled */
    override get isDisabled(): boolean {
        return this.config.disabled || false;
    }

    /** Whether the sidenav can be closed when clicking outside */
    get disableClose(): boolean {
        return this.config.disableClose || false;
    }

    /** Whether the sidenav is fixed in viewport */
    get fixedInViewport(): boolean {
        return this.config.fixedInViewport || false;
    }

    /** Whether to auto focus */
    get autoFocus(): boolean {
        return this.config.autoFocus !== false;
    }

    /** Whether to restore focus */
    get restoreFocus(): boolean {
        return this.config.restoreFocus !== false;
    }

    /** Sidenav position */
    get position(): 'start' | 'end' {
        return this.config.position || 'start';
    }

    /** Panel class */
    get panelClass(): string {
        return this.config.panelClass || '';
    }

    /** Backdrop class */
    get backdropClass(): string {
        return this.config.backdropClass || '';
    }

    /** Responsive breakpoint */
    get responsiveBreakpoint(): string {
        return this.config.responsiveBreakpoint || '768px';
    }

    constructor(
        private breakpointObserver: BreakpointObserver,
        private cdr: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.setupBreakpointObserver();
        this.initializeSidenav();
    }

    ngAfterViewInit(): void {
        // REMOVED: Recursive subscription that could cause infinite loops
        // The parent component should handle openedChange directly via template binding
        // Example: <amw-sidenav (openedChange)="onSidenavToggle($event)"></amw-sidenav>
    }

    /**
     * Handles sidenav opened change event
     * @param opened Whether the sidenav is opened
     */
    onSidenavOpenedChange(opened: boolean): void {
        this.opened = opened;
        this.openedChange.emit(opened);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Sets up the breakpoint observer for responsive behavior
     */
    private setupBreakpointObserver(): void {
        this.breakpointObserver
            .observe([
                Breakpoints.Handset,
                Breakpoints.Tablet,
                Breakpoints.Web
            ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                this.isMobile = this.breakpointObserver.isMatched(Breakpoints.Handset);
                this.isTablet = this.breakpointObserver.isMatched(Breakpoints.Tablet);
                this.isDesktop = this.breakpointObserver.isMatched(Breakpoints.Web);

                this.currentBreakpoint = this.getCurrentBreakpoint();

                // Update sidenav behavior based on breakpoint
                this.updateSidenavBehavior();

                this.cdr.detectChanges();
            });
    }

    /**
     * Gets the current breakpoint name
     */
    private getCurrentBreakpoint(): string {
        if (this.isMobile) return 'mobile';
        if (this.isTablet) return 'tablet';
        if (this.isDesktop) return 'desktop';
        return 'unknown';
    }

    /**
     * Updates sidenav behavior based on current breakpoint
     */
    private updateSidenavBehavior(): void {
        if (this.sidenav) {
            // Update mode based on breakpoint
            this.sidenav.mode = this.sidenavMode;

            // Update opened state based on breakpoint
            if (this.isMobile && this.isResponsive) {
                this.sidenav.close();
            } else if (this.isDesktop && this.isResponsive) {
                this.sidenav.open();
            }
        }
    }

    /**
     * Initializes the sidenav with default configuration
     */
    private initializeSidenav(): void {
        // Set initial opened state
        this.opened = this.defaultOpened;
    }

    /**
     * Toggles the sidenav open/closed state
     */
    toggleSidenav(): void {
        if (this.sidenav && !this.isDisabled) {
            this.sidenav.toggle();
            this.toggle.emit(this.sidenav.opened);
        }
    }

    /**
     * Opens the sidenav
     */
    openSidenav(): void {
        if (this.sidenav && !this.isDisabled) {
            this.sidenav.open();
        }
    }

    /**
     * Closes the sidenav
     */
    closeSidenav(): void {
        if (this.sidenav && !this.isDisabled) {
            this.sidenav.close();
            this.close.emit();
        }
    }

    /**
     * Handles navigation item click
     * @param item The clicked navigation item
     * @param event The click event
     */
    onItemClick(item: SidenavItem, event?: Event): void {
        if (item.disabled) {
            event?.preventDefault();
            event?.stopPropagation();
            return;
        }

        // Update active state
        this.updateActiveItem(item);

        // Emit item click event
        this.itemClick.emit(item);

        // Close sidenav on mobile after item click
        if (this.isMobile && this.isResponsive) {
            this.closeSidenav();
        }
    }

    /**
     * Handles nested item toggle
     * @param item The item to toggle
     * @param event The click event
     */
    onNestedItemToggle(item: SidenavItem, event: Event): void {
        event.preventDefault();
        event.stopPropagation();

        if (item.children && item.children.length > 0) {
            item.expanded = !item.expanded;
        }
    }

    /**
     * Updates the active item in the navigation
     * @param activeItem The item to set as active
     */
    private updateActiveItem(activeItem: SidenavItem): void {
        this.items.forEach(item => {
            this.setItemActive(item, false);
            if (item.children) {
                item.children.forEach(child => this.setItemActive(child, false));
            }
        });

        this.setItemActive(activeItem, true);
    }

    /**
     * Sets the active state of an item
     * @param item The item to update
     * @param active Whether the item is active
     */
    private setItemActive(item: SidenavItem, active: boolean): void {
        item.active = active;
    }

    /**
     * Gets the CSS classes for a navigation item
     * @param item The navigation item
     * @returns CSS classes string
     */
    getItemClasses(item: SidenavItem): string {
        const classes = ['amw-sidenav__item'];

        if (item.active) {
            classes.push('amw-sidenav__item--active');
        }

        if (item.disabled) {
            classes.push('amw-sidenav__item--disabled');
        }

        if (item.children && item.children.length > 0) {
            classes.push('amw-sidenav__item--nested');
        }

        if (item.classes) {
            classes.push(item.classes);
        }

        return classes.join(' ');
    }

    /**
     * Gets the CSS classes for the sidenav container
     * @returns CSS classes string
     */
    getSidenavClasses(): string {
        const classes = ['amw-sidenav'];

        if (this.isMobile) {
            classes.push('amw-sidenav--mobile');
        } else if (this.isTablet) {
            classes.push('amw-sidenav--tablet');
        } else if (this.isDesktop) {
            classes.push('amw-sidenav--desktop');
        }

        if (this.isResponsive) {
            classes.push('amw-sidenav--responsive');
        }

        if (this.isDisabled) {
            classes.push('amw-sidenav--disabled');
        }

        return classes.join(' ');
    }

    /**
     * Gets the CSS classes for the sidenav content
     * @returns CSS classes string
     */
    getSidenavContentClasses(): string {
        const classes = ['amw-sidenav__content'];

        if (this.panelClass) {
            classes.push(this.panelClass);
        }

        return classes.join(' ');
    }

    /**
     * Gets the CSS classes for the backdrop
     * @returns CSS classes string
     */
    getBackdropClasses(): string {
        const classes = ['amw-sidenav__backdrop'];

        if (this.backdropClass) {
            classes.push(this.backdropClass);
        }

        return classes.join(' ');
    }

    /**
     * Gets the badge color for Material Design
     * @param badgeColor The badge color string
     * @returns Valid Material Design theme palette color
     */
    getBadgeColor(badgeColor?: string): 'primary' | 'accent' | 'warn' {
        if (badgeColor === 'primary' || badgeColor === 'accent' || badgeColor === 'warn') {
            return badgeColor;
        }
        return 'primary';
    }

    /**
     * Handles expansion panel change events
     * @param item The navigation item
     * @param event The expansion event
     */
    onExpansionChange(item: SidenavItem, event: any): void {
        item.expanded = event;
    }

    /**
     * Tracks navigation items for ngFor
     * @param index The item index
     * @param item The navigation item
     * @returns Unique identifier for the item
     */
    trackByItem(index: number, item: SidenavItem): string {
        return item.id || index.toString();
    }
}
