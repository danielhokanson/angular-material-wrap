import { Component, ViewEncapsulation, input, output, computed, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

/** Page event interface for AMW paginator */
export interface AmwPageEvent {
    /** Current page index (0-based) */
    pageIndex: number;
    /** Previous page index */
    previousPageIndex: number;
    /** Items per page */
    pageSize: number;
    /** Total number of items */
    length: number;
}

/**
 * Angular Material Wrap Paginator Component
 *
 * Navigation controls for paged data. Wraps Angular Material's mat-paginator
 * with a consistent AMW API.
 *
 * @example
 * Basic paginator:
 * ```html
 * <amw-paginator
 *   [length]="totalItems"
 *   [pageSize]="10"
 *   (page)="onPageChange($event)">
 * </amw-paginator>
 * ```
 *
 * @example
 * Paginator with page size options:
 * ```html
 * <amw-paginator
 *   [length]="totalItems"
 *   [pageSize]="25"
 *   [pageSizeOptions]="[10, 25, 50, 100]"
 *   [showFirstLastButtons]="true"
 *   (page)="onPageChange($event)">
 * </amw-paginator>
 * ```
 *
 * @example
 * Controlled paginator with two-way binding:
 * ```html
 * <amw-paginator
 *   [length]="100"
 *   [(pageIndex)]="currentPage"
 *   [(pageSize)]="itemsPerPage"
 *   (page)="onPageChange($event)">
 * </amw-paginator>
 * ```
 */
@Component({
    selector: 'amw-paginator',
    standalone: true,
    imports: [
        CommonModule,
        MatPaginatorModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-paginator.component.html',
    styleUrl: './amw-paginator.component.scss'
})
export class AmwPaginatorComponent {
    /** Total number of items */
    readonly length = input<number>(0);

    /** Items per page (two-way bindable) */
    readonly pageSize = model<number>(10);

    /** Available page size options */
    readonly pageSizeOptions = input<number[]>([5, 10, 25, 50]);

    /** Current page index (0-based, two-way bindable) */
    readonly pageIndex = model<number>(0);

    /** Whether to show first/last page buttons */
    readonly showFirstLastButtons = input<boolean>(false);

    /** Whether to hide the page size selector */
    readonly hidePageSize = input<boolean>(false);

    /** Whether the paginator is disabled */
    readonly disabled = input<boolean>(false);

    /** Custom CSS class for the paginator */
    readonly paginatorClass = input<string | undefined>();

    /** Emitted when page changes */
    readonly page = output<AmwPageEvent>();

    /** Computed total number of pages */
    readonly totalPages = computed(() => {
        const length = this.length();
        const pageSize = this.pageSize();
        return Math.ceil(length / pageSize);
    });

    /** Computed CSS classes */
    readonly paginatorClasses = computed(() => {
        const classes = ['amw-paginator'];
        const customClass = this.paginatorClass();

        if (this.disabled()) {
            classes.push('amw-paginator--disabled');
        }

        if (this.hidePageSize()) {
            classes.push('amw-paginator--hide-page-size');
        }

        if (customClass) {
            classes.push(customClass);
        }

        return classes.join(' ');
    });

    /** Handle page change from mat-paginator */
    onPageChange(event: PageEvent): void {
        const previousPageIndex = this.pageIndex();

        // Update models
        this.pageIndex.set(event.pageIndex);
        this.pageSize.set(event.pageSize);

        // Emit custom event
        this.page.emit({
            pageIndex: event.pageIndex,
            previousPageIndex: previousPageIndex,
            pageSize: event.pageSize,
            length: event.length
        });
    }
}
