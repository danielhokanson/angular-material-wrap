/**
 * Data table edit event interface
 */
export interface DataTableEditEvent {
    /** Row being edited */
    row: any;

    /** Row index */
    index: number;

    /** Column being edited */
    column: string;

    /** New value */
    value: any;

    /** Original value */
    originalValue: any;

    /** Whether the edit is valid */
    valid: boolean;

    /** Validation errors */
    errors: string[];
}

/**
 * Data table edit state interface
 */
export interface DataTableEditState {
    /** Row being edited */
    row: any;

    /** Row index */
    index: number;

    /** Edited values */
    values: { [key: string]: any };

    /** Original values */
    originalValues: { [key: string]: any };

    /** Validation errors */
    errors: { [key: string]: string[] };

    /** Whether the row is being edited */
    isEditing: boolean;

    /** Whether the row has changes */
    hasChanges: boolean;
}
