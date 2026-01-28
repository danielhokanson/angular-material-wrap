import { Component, ViewEncapsulation, input, output, computed } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AmwIconComponent } from '../amw-icon/amw-icon.component';
import { RouterModule, IsActiveMatchOptions } from '@angular/router';

/**
 * Angular Material Wrap Menu Item Component
 *
 * Represents a single item within an amw-menu. Supports both click-based actions
 * and Angular Router navigation.
 *
 * @example Click-based action
 * ```html
 * <amw-menu-item
 *   label="Settings"
 *   icon="settings"
 *   (itemClick)="onSettings()">
 * </amw-menu-item>
 * ```
 *
 * @example Router navigation
 * ```html
 * <amw-menu-item
 *   label="Dashboard"
 *   icon="dashboard"
 *   routerLink="/dashboard">
 * </amw-menu-item>
 * ```
 *
 * @example Router navigation with query params
 * ```html
 * <amw-menu-item
 *   label="User Profile"
 *   icon="person"
 *   [routerLink]="['/users', userId]"
 *   [queryParams]="{ tab: 'settings' }"
 *   [routerLinkActiveOptions]="{ exact: true }">
 * </amw-menu-item>
 * ```
 */
@Component({
    selector: 'amw-menu-item',
    standalone: true,
    imports: [
        MatMenuModule,
        AmwIconComponent,
        MatDividerModule,
        RouterModule
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        @if (!isDivider()) {
            @if (routerLink()) {
                <a
                    mat-menu-item
                    [class]="itemClasses()"
                    [routerLink]="routerLink()"
                    [queryParams]="queryParams()"
                    [fragment]="fragment()"
                    [target]="target()"
                    routerLinkActive="amw-menu-item--active"
                    [routerLinkActiveOptions]="routerLinkActiveOptions()"
                    [attr.aria-disabled]="disabled() || null"
                    [class.amw-menu-item--disabled]="disabled()"
                    (click)="onLinkClick($event)">
                    @if (icon()) {
                        <amw-icon [name]="icon()" [class]="iconClasses"></amw-icon>
                    }
                    <span [class]="labelClasses">{{ label() }}</span>
                </a>
            } @else {
                <button
                    mat-menu-item
                    [class]="itemClasses()"
                    [disabled]="disabled()"
                    (click)="onItemClick($event)">
                    @if (icon()) {
                        <amw-icon [name]="icon()" [class]="iconClasses"></amw-icon>
                    }
                    <span [class]="labelClasses">{{ label() }}</span>
                </button>
            }
        } @else {
            <mat-divider></mat-divider>
        }
    `,
    styleUrl: './amw-menu-item.component.scss'
})
export class AmwMenuItemComponent {
    /** Label text for the menu item */
    readonly label = input('');
    /** Icon name for the menu item */
    readonly icon = input<string | undefined>();
    /** Whether this item is a divider */
    readonly isDivider = input(false);
    /** Custom CSS class for the item */
    readonly itemClass = input<string | undefined>();
    /** Whether the menu item is disabled */
    readonly disabled = input(false);

    // Router navigation inputs
    /** Route path for navigation. When provided, renders as an anchor element. */
    readonly routerLink = input<string | any[] | undefined>();
    /** Query parameters for the route */
    readonly queryParams = input<Record<string, any> | undefined>();
    /** URL fragment (hash) for the route */
    readonly fragment = input<string | undefined>();
    /** Link target for navigation behavior */
    readonly target = input<'_self' | '_blank' | undefined>();
    /** Options to determine if the router link is active */
    readonly routerLinkActiveOptions = input<IsActiveMatchOptions | { exact: boolean }>({ exact: false });

    /** Emitted when the menu item is clicked */
    readonly itemClick = output<MouseEvent>();

    onItemClick(event: MouseEvent) {
        if (!this.disabled()) {
            this.itemClick.emit(event);
        }
    }

    onLinkClick(event: MouseEvent) {
        if (this.disabled()) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        this.itemClick.emit(event);
    }

    readonly itemClasses = computed(() => {
        const classes = ['amw-menu-item'];
        const customClass = this.itemClass();
        if (customClass) classes.push(customClass);
        if (this.disabled()) classes.push('amw-menu-item--disabled');
        return classes.join(' ');
    });

    readonly iconClasses = 'amw-menu-item__icon';
    readonly labelClasses = 'amw-menu-item__label';
}
