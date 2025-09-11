/**
 * Data table pagination configuration interface
 */
export interface DataTablePagination {
    /** Current page number (0-based) */
    pageIndex: number;

    /** Number of items per page */
    pageSize: number;

    /** Total number of items */
    length: number;

    /** Page size options */
    pageSizeOptions: number[];

    /** Whether to show first/last page buttons */
    showFirstLastButtons: boolean;

    /** Whether to hide page size selector */
    hidePageSize: boolean;
}

/**
 * Data table pagination event interface
 */
export interface DataTablePaginationEvent {
    /** Current page index */
    pageIndex: number;

    /** Current page size */
    pageSize: number;

    /** Total length */
    length: number;

    /** Previous page index */
    previousPageIndex: number;
}
