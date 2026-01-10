import { Component, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, TemplateRef, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';
import { BaseComponent } from '../../../controls/components/base/base.component';
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
        CommonModule,
        MatMenuModule,
        AmwButtonComponent,
        MatIconModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-menu.component.html',
    styleUrl: './amw-menu.component.scss'
})
export class AmwMenuComponent extends BaseComponent {
    /** Label for the trigger button */
    @Input() triggerLabel?: string;
    /** Icon for the trigger button */
    @Input() triggerIcon?: string;
    /** Variant of the trigger button */
    @Input() triggerVariant: 'text' | 'raised' | 'stroked' | 'flat' | 'icon' = 'text';
    /** Color of the trigger button */
    @Input() triggerColor: 'primary' | 'accent' | 'warn' = 'primary';
    /** Position of the menu relative to trigger */
    @Input() xPosition: 'before' | 'after' = 'after';
    /** Position of the menu relative to trigger */
    @Input() yPosition: 'above' | 'below' = 'below';
    /** Whether to close menu on item click */
    @Input() closeOnClick = true;
    /** Custom CSS class for the menu */
    @Input() menuClass?: string;
    /** Whether the menu has a backdrop */
    @Input() hasBackdrop = true;
    /** Custom trigger template */
    @Input() triggerTemplate?: TemplateRef<any>;

    /** Emitted when menu is opened */
    @Output() menuOpened = new EventEmitter<void>();
    /** Emitted when menu is closed */
    @Output() menuClosed = new EventEmitter<void>();

    @ViewChild(MatMenuTrigger) menuTrigger?: MatMenuTrigger;
    @ContentChildren(AmwMenuItemComponent) menuItems?: QueryList<AmwMenuItemComponent>;

    /**
     * Opens the menu
     */
    openMenu() {
        this.menuTrigger?.openMenu();
    }

    /**
     * Closes the menu
     */
    closeMenu() {
        this.menuTrigger?.closeMenu();
    }

    /**
     * Toggles the menu
     */
    toggleMenu() {
        if (this.menuTrigger?.menuOpen) {
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

    get triggerButtonClasses(): string {
        const classes = ['amw-menu__trigger'];
        if (this.triggerVariant) classes.push(`amw-menu__trigger--${this.triggerVariant}`);
        return classes.join(' ');
    }

    get menuClasses(): string {
        const classes = ['amw-menu'];
        if (this.menuClass) classes.push(this.menuClass);
        return classes.join(' ');
    }

    /**
     * Maps Material button variant to AmwButton variant
     */
    getButtonVariant(): 'text' | 'elevated' | 'outlined' | 'filled' | 'icon' {
        const variantMap: Record<string, 'text' | 'elevated' | 'outlined' | 'filled' | 'icon'> = {
            'text': 'text',
            'raised': 'elevated',
            'stroked': 'outlined',
            'flat': 'filled',
            'icon': 'icon'
        };
        return variantMap[this.triggerVariant] || 'text';
    }
}
