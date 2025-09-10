/**
 * Data table selection event interface
 */
export interface DataTableSelectionEvent {
    /** Selected rows */
    selected: any[];
    
    /** Selection mode */
    mode: 'single' | 'multiple' | 'none';
    
    /** Whether all rows are selected */
    allSelected: boolean;
    
    /** Whether some rows are selected */
    someSelected: boolean;
    
    /** Number of selected rows */
    count: number;
}

/**
 * Data table row selection interface
 */
export interface DataTableRowSelection {
    /** Row data */
    row: any;
    
    /** Row index */
    index: number;
    
    /** Whether the row is selected */
    selected: boolean;
}
