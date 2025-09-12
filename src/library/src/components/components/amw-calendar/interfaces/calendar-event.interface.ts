/**
 * Calendar event interface
 * Generic interface for calendar items that can be assigned to dates/times
 * @deprecated Use CalendarItem from calendar-item.interface.ts for new implementations
 */
export interface CalendarEvent<T = any> {
    /** Unique identifier for the event */
    id: string;

    /** The data object associated with this event */
    data: T;

    /** Start date/time of the event */
    start: Date;

    /** End date/time of the event (optional for all-day events) */
    end?: Date;

    /** Whether this is an all-day event */
    allDay?: boolean;

    /** Display title for the event (if not using data property) */
    title?: string;

    /** Display description for the event */
    description?: string;

    /** Color for the event display */
    color?: string;

    /** Whether the event is editable */
    editable?: boolean;

    /** Whether the event is deletable */
    deletable?: boolean;

    /** Whether the event is draggable */
    draggable?: boolean;

    /** Custom CSS classes for the event */
    cssClass?: string | string[];

    /** Additional metadata */
    metadata?: Record<string, any>;
}

/**
 * Calendar event change event interface
 */
export interface CalendarEventChangeEvent<T = any> {
    /** The event that changed */
    event: CalendarEvent<T>;

    /** Type of change */
    type: 'create' | 'add' | 'update' | 'delete' | 'move';

    /** Previous position (for move operations) */
    previousStart?: Date;
    previousEnd?: Date;

    /** New position (for move operations) */
    newStart?: Date;
    newEnd?: Date;
}
