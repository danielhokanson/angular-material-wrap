import { CalendarItem, CalendarItemTimePattern } from './calendar-item.interface';

/**
 * Calendar configuration interface for generic items
 */
export interface CalendarItemConfig<T = any> {
    /** Display property name for the item data object */
    displayProperty: keyof T;

    /** Whether items are editable */
    editable?: boolean;

    /** Whether items are deletable */
    deletable?: boolean;

    /** Whether items are draggable */
    draggable?: boolean;

    /** Default item duration in minutes (for new items) */
    defaultDuration?: number;

    /** Minimum item duration in minutes */
    minDuration?: number;

    /** Maximum item duration in minutes */
    maxDuration?: number;

    /** Time slot interval in minutes */
    timeSlotInterval?: number;

    /** Start hour for the day view (0-23) */
    startHour?: number;

    /** End hour for the day view (0-23) */
    endHour?: number;

    /** Whether to show weekends */
    showWeekends?: boolean;

    /** Whether to show time in day view */
    showTime?: boolean;

    /** Whether to allow creating new items */
    allowCreate?: boolean;

    /** Allowed time patterns for new items */
    allowedTimePatterns?: CalendarItemTimePattern[];

    /** Default time pattern for new items */
    defaultTimePattern?: CalendarItemTimePattern;

    /** Custom item renderer function */
    itemRenderer?: (item: CalendarItem<T>) => string;

    /** Custom item color function */
    itemColor?: (item: CalendarItem<T>) => string;

    /** Custom CSS classes for the calendar */
    cssClass?: string | string[];

    /** Additional configuration options */
    options?: Record<string, any>;
}

// CalendarView and CalendarNavigationEvent are exported from calendar-config.interface.ts
