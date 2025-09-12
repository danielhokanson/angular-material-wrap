/**
 * Base interface for all calendar items
 */
export interface CalendarItemBase {
    id: string;
    title: string;
    description?: string;
    color?: string;
    editable?: boolean;
    deletable?: boolean;
    draggable?: boolean;
    cssClass?: string | string[];
    metadata?: Record<string, any>;
    completed?: boolean; // Optional completion status for items with just a start date
}

/**
 * Time pattern types for calendar items
 */
export type CalendarItemTimePattern =
    | 'date'                    // Single date (all day)
    | 'date-range'             // Start date and end date (all day range)
    | 'datetime'               // Single date and time
    | 'datetime-range';        // Start datetime and end datetime

/**
 * Calendar item with time information
 */
export interface CalendarItem<T = any> extends CalendarItemBase {
    data: T;
    start: Date;
    end?: Date;
    timePattern: CalendarItemTimePattern;
    allDay: boolean;
}

/**
 * Calendar item type definition for registration
 */
export interface CalendarItemType<T = any> {
    type: string;
    displayName: string;
    icon?: string;
    color?: string;
    timePatterns: CalendarItemTimePattern[];
    defaultTimePattern: CalendarItemTimePattern;
    createItem: (date: Date, timePattern: CalendarItemTimePattern) => CalendarItem<T>;
    validateItem: (item: CalendarItem<T>) => boolean;
}

/**
 * Calendar item type registry
 */
export interface CalendarItemTypeRegistry {
    [type: string]: CalendarItemType<any>;
}

/**
 * Calendar item change event
 */
export interface CalendarItemChangeEvent<T = any> {
    type: 'create' | 'update' | 'delete' | 'move';
    item: CalendarItem<T>;
    oldItem?: CalendarItem<T>;
    newStart?: Date;
    newEnd?: Date;
}

/**
 * Calendar item editor context
 */
export interface CalendarItemEditorContext<T = any> {
    item?: CalendarItem<T>;
    itemType: string;
    timePattern: CalendarItemTimePattern;
    startDate: Date;
    endDate?: Date;
    isEditing: boolean;
    triggerElement?: HTMLElement;
    position?: 'top' | 'bottom' | 'left' | 'right';
}
