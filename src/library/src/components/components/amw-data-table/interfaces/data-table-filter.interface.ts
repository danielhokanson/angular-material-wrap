/**
 * Data table filter configuration interface
 */
export interface DataTableFilter {
    /** Column property to filter by */
    column: string;
    
    /** Filter value */
    value: any;
    
    /** Filter operator */
    operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'greaterThanOrEqual' | 'lessThanOrEqual' | 'between' | 'in' | 'notIn' | 'isNull' | 'isNotNull' | 'custom';
    
    /** Custom filter function */
    customFilter?: (value: any, filterValue: any) => boolean;
}

/**
 * Data table filter event interface
 */
export interface DataTableFilterEvent {
    /** Filter configuration */
    filter: DataTableFilter;
    
    /** All active filters */
    filters: DataTableFilter[];
    
    /** Filtered data */
    data: any[];
}

/**
 * Data table search configuration interface
 */
export interface DataTableSearch {
    /** Global search term */
    term: string;
    
    /** Columns to search in */
    columns: string[];
    
    /** Search case sensitivity */
    caseSensitive?: boolean;
    
    /** Search exact match */
    exactMatch?: boolean;
}
