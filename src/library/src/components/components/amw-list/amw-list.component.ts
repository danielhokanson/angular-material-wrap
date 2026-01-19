import { Component, ViewEncapsulation, input, computed, contentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { AmwListItemComponent } from './amw-list-item.component';

/**
 * Angular Material Wrap List Component
 *
 * A vertical list container for displaying items with optional icons,
 * avatars, and actions. Works with amw-list-item children.
 *
 * @example
 * Basic list:
 * ```html
 * <amw-list>
 *   <amw-list-item>
 *     <span amwListItemTitle>Item 1</span>
 *   </amw-list-item>
 *   <amw-list-item>
 *     <span amwListItemTitle>Item 2</span>
 *   </amw-list-item>
 * </amw-list>
 * ```
 *
 * @example
 * Dense list with icons:
 * ```html
 * <amw-list dense>
 *   <amw-list-item>
 *     <amw-icon amwListItemIcon name="inbox"></amw-icon>
 *     <span amwListItemTitle>Inbox</span>
 *     <span amwListItemMeta>5</span>
 *   </amw-list-item>
 * </amw-list>
 * ```
 */
@Component({
    selector: 'amw-list',
    standalone: true,
    imports: [
        CommonModule,
        MatListModule
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <mat-list [class]="listClasses()" role="list">
            <ng-content></ng-content>
        </mat-list>
    `,
    styleUrl: './amw-list.component.scss'
})
export class AmwListComponent {
    /** Use compact spacing */
    readonly dense = input<boolean>(false);

    /** Disable ripple effect on all items */
    readonly disableRipple = input<boolean>(false);

    /** Custom CSS class for the list */
    readonly listClass = input<string | undefined>();

    /** Child list items */
    readonly listItems = contentChildren(AmwListItemComponent);

    /** Computed CSS classes */
    readonly listClasses = computed(() => {
        const classes = ['amw-list'];
        const customClass = this.listClass();

        if (this.dense()) {
            classes.push('amw-list--dense');
        }

        if (this.disableRipple()) {
            classes.push('amw-list--no-ripple');
        }

        if (customClass) {
            classes.push(customClass);
        }

        return classes.join(' ');
    });
}
