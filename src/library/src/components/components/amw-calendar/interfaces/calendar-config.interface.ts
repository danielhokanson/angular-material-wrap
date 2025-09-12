import { CalendarEvent } from './calendar-event.interface';

/**
 * Calendar configuration interface
 */
export interface CalendarConfig<T = any> {
    /** Display property name for the event data object */
    displayProperty: keyof T;

    /** Whether events are editable */
    editable?: boolean;

    /** Whether events are deletable */
    deletable?: boolean;

    /** Whether events are draggable */
    draggable?: boolean;

    /** Default event duration in minutes (for new events) */
    defaultDuration?: number;

    /** Minimum event duration in minutes */
    minDuration?: number;

    /** Maximum event duration in minutes */
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

    /** Whether to allow creating new events */
    allowCreate?: boolean;

    /** Custom event renderer function */
    eventRenderer?: (event: CalendarEvent<T>) => string;

    /** Custom event color function */
    eventColor?: (event: CalendarEvent<T>) => string;

    /** Custom CSS classes for the calendar */
    cssClass?: string | string[];

    /** Additional configuration options */
    options?: Record<string, any>;
}

/**
 * Calendar view type
 */
export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

/**
 * Calendar navigation event interface
 */
export interface CalendarNavigationEvent {
    /** Current view */
    view: CalendarView;

    /** Current date */
    date: Date;

    /** Previous date (for navigation) */
    previousDate?: Date;
}
