import { Component, ViewEncapsulation, input, output, computed } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Angular Material Wrap Menu Item Component
 *
 * Represents a single item within an amw-menu.
 *
 * @example
 * ```html
 * <amw-menu-item
 *   label="Settings"
 *   icon="settings"
 *   (itemClick)="onSettings()">
 * </amw-menu-item>
 * ```
 */
@Component({
    selector: 'amw-menu-item',
    standalone: true,
    imports: [
        MatMenuModule,
        MatIconModule,
        MatDividerModule
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        @if (!isDivider()) {
            <button
                mat-menu-item
                [class]="itemClasses()"
                [disabled]="disabled()"
                (click)="onItemClick($event)">
                @if (icon()) {
                    <mat-icon [class]="iconClasses">{{ icon() }}</mat-icon>
                }
                <span [class]="labelClasses">{{ label() }}</span>
            </button>
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

    /** Emitted when the menu item is clicked */
    readonly itemClick = output<MouseEvent>();

    onItemClick(event: MouseEvent) {
        if (!this.disabled()) {
            this.itemClick.emit(event);
        }
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
