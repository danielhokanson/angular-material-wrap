import { Component, ViewEncapsulation, TemplateRef, input, output, viewChild, contentChildren, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatMenuModule, MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';
import { AmwMenuItemComponent } from './amw-menu-item.component';

export type MenuPosition = 'before' | 'after' | 'above' | 'below';

/**
 * Angular Material Wrap Menu Component
 *
 * A comprehensive menu component that wraps Angular Material's mat-menu
 * with additional features and Material 3 theming support.
 *
 * @example
 * ```html
 * <amw-menu [triggerLabel]="'Menu'" [triggerIcon]="'menu'">
 *   <amw-menu-item label="Option 1" icon="home" (itemClick)="onItem1()"></amw-menu-item>
 *   <amw-menu-item label="Option 2" icon="settings" (itemClick)="onItem2()"></amw-menu-item>
 *   <amw-menu-item label="Divider" [isDivider]="true"></amw-menu-item>
 *   <amw-menu-item label="Option 3" icon="logout" (itemClick)="onItem3()"></amw-menu-item>
 * </amw-menu>
 * ```
 */
@Component({
    selector: 'amw-menu',
    standalone: true,
    imports: [
        NgTemplateOutlet,
        MatMenuModule,
        AmwButtonComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-menu.component.html',
    styleUrl: './amw-menu.component.scss'
})
export class AmwMenuComponent {
    /** Label for the trigger button */
    readonly triggerLabel = input<string | undefined>();
    /** Icon for the trigger button */
    readonly triggerIcon = input<string | undefined>();
    /** Appearance of the trigger button */
    readonly triggerAppearance = input<'text' | 'elevated' | 'outlined' | 'filled' | 'tonal'>('text');
    /** Color of the trigger button */
    readonly triggerColor = input<'primary' | 'accent' | 'warn'>('primary');
    /** Position of the menu relative to trigger */
    readonly xPosition = input<'before' | 'after'>('after');
    /** Position of the menu relative to trigger */
    readonly yPosition = input<'above' | 'below'>('below');
    /** Whether to close menu on item click */
    readonly closeOnClick = input(true);
    /** Custom CSS class for the menu */
    readonly menuClass = input<string | undefined>();
    /** Whether the menu has a backdrop */
    readonly hasBackdrop = input(true);
    /** Whether the menu should overlap the trigger element */
    readonly overlapTrigger = input(false);
    /** Custom trigger template */
    readonly triggerTemplate = input<TemplateRef<any> | undefined>();
    /** Whether the menu is disabled */
    readonly disabled = input(false);

    /** Emitted when menu is opened */
    readonly menuOpened = output<void>();
    /** Emitted when menu is closed */
    readonly menuClosed = output<void>();

    readonly menuTrigger = viewChild(MatMenuTrigger);
    readonly menuItems = contentChildren(AmwMenuItemComponent);

    /**
     * The underlying MatMenu instance. Use this when passing the menu
     * to amwMenuTriggerFor from an external trigger element.
     *
     * @example
     * ```html
     * <amw-button [amwMenuTriggerFor]="menu.matMenu">Options</amw-button>
     * <amw-menu #menu>
     *   <amw-menu-item label="Edit" (itemClick)="edit()"></amw-menu-item>
     * </amw-menu>
     * ```
     */
    readonly matMenu = viewChild.required<MatMenu>('menu');

    /**
     * Opens the menu
     */
    openMenu() {
        this.menuTrigger()?.openMenu();
    }

    /**
     * Closes the menu
     */
    closeMenu() {
        this.menuTrigger()?.closeMenu();
    }

    /**
     * Toggles the menu
     */
    toggleMenu() {
        const trigger = this.menuTrigger();
        if (trigger?.menuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    onMenuOpened() {
        this.menuOpened.emit();
    }

    onMenuClosed() {
        this.menuClosed.emit();
    }

    readonly triggerButtonClasses = computed(() => {
        const classes = ['amw-menu__trigger'];
        const appearance = this.triggerAppearance();
        if (appearance) classes.push(`amw-menu__trigger--${appearance}`);
        return classes.join(' ');
    });

    readonly menuClasses = computed(() => {
        const classes = ['amw-menu'];
        const customClass = this.menuClass();
        if (customClass) classes.push(customClass);
        return classes.join(' ');
    });
}
