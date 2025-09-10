/**
 * Data table action configuration interface
 */
export interface DataTableAction {
    /** Unique identifier for the action */
    id: string;
    
    /** Display label for the action */
    label: string;
    
    /** Material icon name */
    icon?: string;
    
    /** Action type */
    type: 'button' | 'menu' | 'custom';
    
    /** Action color theme */
    color?: 'primary' | 'accent' | 'warn' | 'basic';
    
    /** Whether the action is disabled */
    disabled?: boolean;
    
    /** Whether the action is visible */
    visible?: boolean;
    
    /** Custom CSS classes */
    cssClass?: string;
    
    /** Tooltip text */
    tooltip?: string;
    
    /** Confirmation message before execution */
    confirmMessage?: string;
    
    /** Custom visibility function */
    visibilityFn?: (row: any, index: number) => boolean;
    
    /** Custom disabled function */
    disabledFn?: (row: any, index: number) => boolean;
    
    /** Action handler function */
    handler?: (row: any, index: number) => void;
    
    /** Menu items for dropdown actions */
    menuItems?: DataTableAction[];
    
    /** Position of the action */
    position?: 'start' | 'end';
    
    /** Priority for ordering */
    priority?: number;
}
