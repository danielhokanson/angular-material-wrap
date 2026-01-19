import { Directive, input, output, OnDestroy, OnInit, ElementRef, ViewContainerRef } from '@angular/core';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { Overlay } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subscription } from 'rxjs';
import { AmwMenuComponent } from './amw-menu.component';

/**
 * Directive that allows any element to trigger a mat-menu or amw-menu.
 *
 * This directive provides a simplified API for triggering menus, wrapping
 * Angular Material's MatMenuTrigger with a consistent AMW interface.
 *
 * @example
 * Basic usage with amw-button:
 * ```html
 * <amw-button [amwMenuTriggerFor]="menu">Options</amw-button>
 * <amw-menu #menu>
 *   <amw-menu-item icon="edit" (itemClick)="edit()">Edit</amw-menu-item>
 *   <amw-menu-item icon="delete" (itemClick)="delete()">Delete</amw-menu-item>
 * </amw-menu>
 * ```
 *
 * @example
 * Using with any element:
 * ```html
 * <span [amwMenuTriggerFor]="menu">Click me</span>
 * <mat-menu #menu="matMenu">
 *   <button mat-menu-item>Item 1</button>
 *   <button mat-menu-item>Item 2</button>
 * </mat-menu>
 * ```
 */
@Directive({
    selector: '[amwMenuTriggerFor]',
    standalone: true,
    exportAs: 'amwMenuTrigger',
    host: {
        'class': 'amw-menu-trigger',
        '(click)': 'handleClick($event)',
        '(keydown.enter)': 'handleClick($event)',
        '(keydown.space)': 'handleClick($event)',
        '[attr.aria-haspopup]': '"menu"',
        '[attr.aria-expanded]': 'isMenuOpen()',
        '[attr.aria-controls]': 'menuId'
    }
})
export class AmwMenuTriggerForDirective implements OnInit, OnDestroy {
    /**
     * The menu to trigger. Accepts either a MatMenu or an AmwMenuComponent.
     * When an AmwMenuComponent is provided, its internal MatMenu is used automatically.
     */
    readonly amwMenuTriggerFor = input.required<MatMenu | AmwMenuComponent>();

    /**
     * Data to be passed to the menu when opened.
     * Accessible via `let-data` in menu item templates.
     */
    readonly amwMenuTriggerData = input<any>();

    /**
     * Whether restoring focus to the trigger is disabled.
     */
    readonly amwMenuTriggerRestoreFocus = input<boolean>(true);

    /** Emitted when the associated menu is opened */
    readonly menuOpened = output<void>();

    /** Emitted when the associated menu is closed */
    readonly menuClosed = output<void>();

    /** The underlying MatMenuTrigger instance */
    private matTrigger: MatMenuTrigger | null = null;
    private subscriptions = new Subscription();
    menuId: string | null = null;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private viewContainerRef: ViewContainerRef,
        private overlay: Overlay,
        private dir: Directionality,
        private focusMonitor: FocusMonitor
    ) {}

    ngOnInit(): void {
        // Create the MatMenuTrigger dynamically
        this.matTrigger = new MatMenuTrigger(
            this.overlay,
            this.elementRef,
            this.viewContainerRef,
            { scrollStrategy: this.overlay.scrollStrategies.reposition() },
            undefined as any, // parentMenu - not nested
            undefined, // menuItemInstance
            this.dir,
            this.focusMonitor,
            undefined // ngZone
        );

        // Set up the menu - extract MatMenu from AmwMenuComponent if needed
        const menuInput = this.amwMenuTriggerFor();
        const matMenu = menuInput instanceof AmwMenuComponent ? menuInput.matMenu() : menuInput;
        this.matTrigger.menu = matMenu;
        this.menuId = this.matTrigger.menu?.panelId || null;

        // Subscribe to menu events
        this.subscriptions.add(
            this.matTrigger.menuOpened.subscribe(() => {
                this.menuOpened.emit();
            })
        );

        this.subscriptions.add(
            this.matTrigger.menuClosed.subscribe(() => {
                this.menuClosed.emit();
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        if (this.matTrigger) {
            this.matTrigger.ngOnDestroy();
        }
    }

    /** Opens the menu */
    openMenu(): void {
        this.matTrigger?.openMenu();
    }

    /** Closes the menu */
    closeMenu(): void {
        this.matTrigger?.closeMenu();
    }

    /** Toggles the menu */
    toggleMenu(): void {
        if (this.isMenuOpen()) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    /** Returns whether the menu is currently open */
    isMenuOpen(): boolean {
        return this.matTrigger?.menuOpen ?? false;
    }

    /** Handle click events on the trigger */
    handleClick(event: Event): void {
        event.preventDefault();
        this.toggleMenu();
    }

    /** Focus the trigger element */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }
}
