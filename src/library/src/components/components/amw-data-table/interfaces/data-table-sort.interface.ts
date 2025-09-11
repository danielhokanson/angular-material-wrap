/**
 * Data table sort configuration interface
 */
export interface DataTableSort {
    /** Column property to sort by */
    column: string;

    /** Sort direction */
    direction: 'asc' | 'desc';

    /** Sort priority (for multi-column sorting) */
    priority?: number;
}

/**
 * Data table sort event interface
 */
export interface DataTableSortEvent {
    /** Sort configuration */
    sort: DataTableSort;

    /** All active sorts (for multi-column sorting) */
    sorts: DataTableSort[];

    /** Sorted data */
    data: any[];
}
