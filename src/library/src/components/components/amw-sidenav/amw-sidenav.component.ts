import { Component, input, output, model, signal, computed, OnInit, OnDestroy, TemplateRef, viewChild, ElementRef, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AmwIconComponent } from '../amw-icon/amw-icon.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter } from 'rxjs/operators';
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
        AmwIconComponent,
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
    config = input<SidenavConfig>({});

    /** Navigation items to display in the sidenav */
    items = input<SidenavItem[]>([]);

    /** Whether the sidenav is opened (two-way binding) */
    opened = model<boolean>(false);

    /** Custom header template */
    headerTemplate = input<TemplateRef<any> | undefined>(undefined);

    /** Custom footer template */
    footerTemplate = input<TemplateRef<any> | undefined>(undefined);

    /** Custom item template */
    itemTemplate = input<TemplateRef<any> | undefined>(undefined);

    /** Whether to show the toggle button */
    showToggle = input<boolean>(true);

    /** Whether to show the close button */
    showClose = input<boolean>(true);

    /** Event emitted when a navigation item is clicked */
    itemClick = output<SidenavItem>();

    /** Event emitted when sidenav is toggled */
    toggleEvent = output<boolean>();

    /** Event emitted when sidenav is closed */
    closeEvent = output<void>();

    /** Reference to the MatSidenav */
    sidenav = viewChild.required<MatSidenav>('sidenav');

    /** Reference to the toggle button */
    toggleButton = viewChild<ElementRef<HTMLButtonElement>>('toggleButton');

    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    /** Whether the component is in mobile view */
    isMobile = signal<boolean>(false);

    /** Whether the component is in tablet view */
    isTablet = signal<boolean>(false);

    /** Whether the component is in desktop view */
    isDesktop = signal<boolean>(false);

    /** Current breakpoint */
    currentBreakpoint = signal<string>('');

    /** Whether the sidenav is responsive */
    isResponsive = computed(() => this.config().responsive !== false);

    /** Current sidenav mode */
    sidenavMode = computed<'over' | 'push' | 'side'>(() => {
        if (this.isMobile() && this.isResponsive()) {
            return 'over';
        }
        return this.config().mode || 'side';
    });

    /** Whether the sidenav should be opened by default */
    defaultOpened = computed(() => {
        if (this.isMobile() && this.isResponsive()) {
            return false;
        }
        return this.config().opened ?? true;
    });

    /** Sidenav width */
    sidenavWidth = computed(() => {
        const cfg = this.config();
        if (cfg.width) {
            return typeof cfg.width === 'number' ? `${cfg.width}px` : cfg.width;
        }

        switch (cfg.size) {
            case 'small':
                return '200px';
            case 'large':
                return '320px';
            case 'medium':
            default:
                return '280px';
        }
    });

    /** Toggle button text */
    toggleButtonText = computed(() => this.config().toggleText || 'Toggle Menu');

    /** Toggle button icon */
    toggleButtonIcon = computed(() => this.config().toggleIcon || 'menu');

    /** Close button text */
    closeButtonText = computed(() => this.config().closeText || 'Close');

    /** Close button icon */
    closeButtonIcon = computed(() => this.config().closeIcon || 'close');

    /** Whether to show the backdrop */
    showBackdrop = computed(() => this.config().showBackdrop !== false);

    /** Whether the sidenav is disabled */
    isDisabledComputed = computed(() => this.config().disabled || false);

    /** Whether the sidenav can be closed when clicking outside */
    disableClose = computed(() => this.config().disableClose || false);

    /** Whether the sidenav is fixed in viewport */
    fixedInViewport = computed(() => this.config().fixedInViewport || false);

    /** Whether to auto focus */
    autoFocus = computed(() => this.config().autoFocus !== false);

    /** Whether to restore focus */
    restoreFocus = computed(() => this.config().restoreFocus !== false);

    /** Sidenav position */
    position = computed<'start' | 'end'>(() => this.config().position || 'start');

    /** Panel class */
    panelClass = computed(() => this.config().panelClass || '');

    /** Backdrop class */
    backdropClass = computed(() => this.config().backdropClass || '');

    /** Responsive breakpoint */
    responsiveBreakpoint = computed(() => this.config().responsiveBreakpoint || '768px');

    constructor(
        private breakpointObserver: BreakpointObserver,
        private cdr: ChangeDetectorRef,
        private router: Router
    ) {
        super();
    }

    ngOnInit(): void {
        this.setupBreakpointObserver();
        this.initializeSidenav();
        this.syncWithCurrentRoute();
        this.subscribeToRouteChanges();
    }

    ngAfterViewInit(): void {
        // REMOVED: Recursive subscription that could cause infinite loops
        // The parent component should handle openedChange directly via template binding
        // Example: <amw-sidenav (openedChange)="onSidenavToggle($event)"></amw-sidenav>
    }

    /**
     * Handles sidenav opened change event
     * @param openedValue Whether the sidenav is opened
     */
    onSidenavOpenedChange(openedValue: boolean): void {
        this.opened.set(openedValue);
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
                this.isMobile.set(this.breakpointObserver.isMatched(Breakpoints.Handset));
                this.isTablet.set(this.breakpointObserver.isMatched(Breakpoints.Tablet));
                this.isDesktop.set(this.breakpointObserver.isMatched(Breakpoints.Web));

                this.currentBreakpoint.set(this.getCurrentBreakpoint());

                // Update sidenav behavior based on breakpoint
                this.updateSidenavBehavior();

                this.cdr.detectChanges();
            });
    }

    /**
     * Gets the current breakpoint name
     */
    private getCurrentBreakpoint(): string {
        if (this.isMobile()) return 'mobile';
        if (this.isTablet()) return 'tablet';
        if (this.isDesktop()) return 'desktop';
        return 'unknown';
    }

    /**
     * Updates sidenav behavior based on current breakpoint
     */
    private updateSidenavBehavior(): void {
        const sidenavEl = this.sidenav();
        // Update mode based on breakpoint
        sidenavEl.mode = this.sidenavMode();

        // Update opened state based on breakpoint
        if (this.isMobile() && this.isResponsive()) {
            sidenavEl.close();
        } else if (this.isDesktop() && this.isResponsive()) {
            sidenavEl.open();
        }
    }

    /**
     * Initializes the sidenav with default configuration
     */
    private initializeSidenav(): void {
        // Set initial opened state
        this.opened.set(this.defaultOpened());
    }

    /**
     * Syncs the active item with the current route
     */
    private syncWithCurrentRoute(): void {
        const currentUrl = this.router.url;
        this.activateItemByRoute(currentUrl);
    }

    /**
     * Subscribes to route changes to update active item
     */
    private subscribeToRouteChanges(): void {
        this.router.events
            .pipe(
                filter((event): event is NavigationEnd => event instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe((event: NavigationEnd) => {
                this.activateItemByRoute(event.urlAfterRedirects || event.url);
            });
    }

    /**
     * Finds and activates the item matching the given route
     * @param url The current URL to match
     */
    private activateItemByRoute(url: string): void {
        // Clear all active states first
        this.items().forEach(item => {
            this.setItemActive(item, false);
            if (item.children) {
                item.children.forEach(child => this.setItemActive(child, false));
            }
        });

        // Find and activate the matching item
        // Use exact match or segment-boundary match (url === route or url starts with route + '/')
        // This prevents '/controls/chip' from matching '/controls/chip-input'
        let foundItem: SidenavItem | null = null;
        let parentItem: SidenavItem | null = null;

        for (const item of this.items()) {
            // Check children first (more specific routes)
            if (item.children) {
                for (const child of item.children) {
                    if (child.route && this.isRouteMatch(url, child.route)) {
                        foundItem = child;
                        parentItem = item;
                        break;
                    }
                }
            }

            // If no child matched, check the parent item
            if (!foundItem && item.route && this.isRouteMatch(url, item.route)) {
                foundItem = item;
            }

            if (foundItem) break;
        }

        // Activate the found item and expand its parent
        if (foundItem) {
            this.setItemActive(foundItem, true);
            if (parentItem) {
                parentItem.expanded = true;
            }
            this.cdr.detectChanges();
        }
    }

    /**
     * Checks if a URL matches a route exactly or at a segment boundary.
     * Prevents '/controls/chip' from matching '/controls/chip-input'.
     */
    private isRouteMatch(url: string, route: string): boolean {
        return url === route || url.startsWith(route + '/');
    }

    /**
     * Toggles the sidenav open/closed state
     */
    toggleSidenav(): void {
        if (!this.isDisabledComputed()) {
            const sidenavEl = this.sidenav();
            sidenavEl.toggle();
            this.toggleEvent.emit(sidenavEl.opened);
        }
    }

    /**
     * Opens the sidenav
     */
    openSidenav(): void {
        if (!this.isDisabledComputed()) {
            this.sidenav().open();
        }
    }

    /**
     * Closes the sidenav
     */
    closeSidenav(): void {
        if (!this.isDisabledComputed()) {
            this.sidenav().close();
            this.closeEvent.emit();
        }
    }

    /**
     * Handles navigation item click
     * @param item The clicked navigation item
     * @param event The click event
     */
    onItemClickHandler(item: SidenavItem, event?: Event): void {
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
        if (this.isMobile() && this.isResponsive()) {
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
        this.items().forEach(item => {
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

        if (this.isMobile()) {
            classes.push('amw-sidenav--mobile');
        } else if (this.isTablet()) {
            classes.push('amw-sidenav--tablet');
        } else if (this.isDesktop()) {
            classes.push('amw-sidenav--desktop');
        }

        if (this.isResponsive()) {
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

        const panelClassValue = this.panelClass();
        if (panelClassValue) {
            classes.push(panelClassValue);
        }

        return classes.join(' ');
    }

    /**
     * Gets the CSS classes for the backdrop
     * @returns CSS classes string
     */
    getBackdropClasses(): string {
        const classes = ['amw-sidenav__backdrop'];

        const backdropClassValue = this.backdropClass();
        if (backdropClassValue) {
            classes.push(backdropClassValue);
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
