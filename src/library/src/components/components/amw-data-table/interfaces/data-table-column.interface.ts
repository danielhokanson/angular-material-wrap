/**
 * Data table column configuration interface
 */
export interface DataTableColumn {
    /** Unique identifier for the column */
    id: string;
    
    /** Display label for the column header */
    label: string;
    
    /** Property name in the data object */
    property: string;
    
    /** Column type for rendering and filtering */
    type: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'email' | 'url' | 'image' | 'custom';
    
    /** Whether the column is sortable */
    sortable?: boolean;
    
    /** Whether the column is filterable */
    filterable?: boolean;
    
    /** Whether the column is editable */
    editable?: boolean;
    
    /** Whether the column is visible */
    visible?: boolean;
    
    /** Column width (CSS value) */
    width?: string;
    
    /** Minimum column width */
    minWidth?: string;
    
    /** Maximum column width */
    maxWidth?: string;
    
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
    
    /** Custom CSS classes */
    cssClass?: string;
    
    /** Custom renderer function */
    renderer?: (value: any, row: any) => string;
    
    /** Custom formatter function */
    formatter?: (value: any) => string;
    
    /** Validation rules for editing */
    validation?: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
        pattern?: RegExp;
        custom?: (value: any) => boolean | string;
    };
    
    /** Custom editor component */
    editor?: {
        type: 'input' | 'select' | 'textarea' | 'datepicker' | 'checkbox' | 'custom';
        options?: any[];
        config?: any;
    };
    
    /** Tooltip text */
    tooltip?: string;
    
    /** Whether the column is resizable */
    resizable?: boolean;
    
    /** Whether the column is draggable for reordering */
    draggable?: boolean;
    
    /** Column priority for responsive hiding */
    priority?: number;
}
