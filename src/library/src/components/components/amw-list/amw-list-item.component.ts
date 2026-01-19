import { Component, ViewEncapsulation, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

/**
 * Angular Material Wrap List Item Component
 *
 * A list item with support for icons, avatars, titles, subtitles, and meta content.
 * Uses content projection with special selectors for different content areas.
 *
 * Content Projection Slots:
 * - `[amwListItemIcon]` - Leading icon
 * - `[amwListItemAvatar]` - Leading avatar image
 * - `[amwListItemTitle]` - Primary text (required)
 * - `[amwListItemSubtitle]` - Secondary text
 * - `[amwListItemMeta]` - Trailing content (badges, buttons)
 *
 * @example
 * Basic item with icon:
 * ```html
 * <amw-list-item>
 *   <amw-icon amwListItemIcon name="inbox"></amw-icon>
 *   <span amwListItemTitle>Inbox</span>
 *   <span amwListItemMeta>5</span>
 * </amw-list-item>
 * ```
 *
 * @example
 * Item with avatar and subtitle:
 * ```html
 * <amw-list-item>
 *   <img amwListItemAvatar src="/avatar.jpg" alt="User">
 *   <span amwListItemTitle>John Doe</span>
 *   <span amwListItemSubtitle>Software Engineer</span>
 * </amw-list-item>
 * ```
 *
 * @example
 * Navigable item with routerLink:
 * ```html
 * <amw-list-item [routerLink]="['/settings']">
 *   <amw-icon amwListItemIcon name="settings"></amw-icon>
 *   <span amwListItemTitle>Settings</span>
 * </amw-list-item>
 * ```
 */
@Component({
    selector: 'amw-list-item',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatListModule,
        MatRippleModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-list-item.component.html',
    styleUrl: './amw-list.component.scss'
})
export class AmwListItemComponent {
    /** Whether the item is disabled */
    readonly disabled = input<boolean>(false);

    /** Whether the item is selected */
    readonly selected = input<boolean>(false);

    /**
     * Navigation link (makes item clickable and navigable)
     * Can be a string path or router link array
     */
    readonly routerLink = input<string | any[] | undefined>();

    /** Query parameters for router navigation */
    readonly queryParams = input<{ [key: string]: any } | undefined>();

    /** Fragment for router navigation */
    readonly fragment = input<string | undefined>();

    /** Custom CSS class for the item */
    readonly itemClass = input<string | undefined>();

    /** Disable ripple effect for this item */
    readonly disableRipple = input<boolean>(false);

    /** Emitted when the item is clicked */
    readonly itemClick = output<MouseEvent>();

    /** Whether this item is navigable (has routerLink) */
    readonly isNavigable = computed(() => {
        return this.routerLink() !== undefined;
    });

    /** Computed CSS classes */
    readonly itemClasses = computed(() => {
        const classes = ['amw-list-item'];
        const customClass = this.itemClass();

        if (this.disabled()) {
            classes.push('amw-list-item--disabled');
        }

        if (this.selected()) {
            classes.push('amw-list-item--selected');
        }

        if (this.isNavigable()) {
            classes.push('amw-list-item--navigable');
        }

        if (customClass) {
            classes.push(customClass);
        }

        return classes.join(' ');
    });

    /** Handle item click */
    onClick(event: MouseEvent): void {
        if (!this.disabled()) {
            this.itemClick.emit(event);
        }
    }
}
