import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BaseComponent } from '../../../controls/components/base/base.component';

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
        CommonModule,
        MatMenuModule,
        MatIconModule
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <button
            *ngIf="!isDivider"
            mat-menu-item
            [class]="itemClasses"
            [disabled]="disabled"
            (click)="onItemClick($event)">
            <mat-icon *ngIf="icon" [class]="iconClasses">{{ icon }}</mat-icon>
            <span [class]="labelClasses">{{ label }}</span>
        </button>
        <mat-divider *ngIf="isDivider"></mat-divider>
    `,
    styleUrl: './amw-menu-item.component.scss'
})
export class AmwMenuItemComponent extends BaseComponent {
    /** Label text for the menu item */
    @Input() label?: string;
    /** Icon name for the menu item */
    @Input() icon?: string;
    /** Whether this item is a divider */
    @Input() isDivider = false;
    /** Custom CSS class for the item */
    @Input() itemClass?: string;

    /** Emitted when the menu item is clicked */
    @Output() itemClick = new EventEmitter<MouseEvent>();

    onItemClick(event: MouseEvent) {
        if (!this.disabled) {
            this.itemClick.emit(event);
        }
    }

    get itemClasses(): string {
        const classes = ['amw-menu-item'];
        if (this.itemClass) classes.push(this.itemClass);
        if (this.disabled) classes.push('amw-menu-item--disabled');
        return classes.join(' ');
    }

    get iconClasses(): string {
        return 'amw-menu-item__icon';
    }

    get labelClasses(): string {
        return 'amw-menu-item__label';
    }
}
