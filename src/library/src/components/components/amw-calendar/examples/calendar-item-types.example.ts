import { CalendarItem, CalendarItemType, CalendarItemTimePattern } from '../interfaces/calendar-item.interface';

/**
 * Example: Event item type - supports all time patterns
 */
export interface EventData {
    id: string;
    title: string;
    description?: string;
    category: 'meeting' | 'deadline' | 'personal' | 'work';
    priority: 'low' | 'medium' | 'high';
    attendees?: string[];
    location?: string;
}

export const EventItemType: CalendarItemType<EventData> = {
    type: 'event',
    displayName: 'Event',
    icon: 'event',
    color: '#6750a4',
    timePatterns: ['date', 'date-range', 'datetime', 'datetime-range'],
    defaultTimePattern: 'datetime',
    createItem: (date: Date, timePattern: CalendarItemTimePattern): CalendarItem<EventData> => {
        const item: CalendarItem<EventData> = {
            id: Date.now().toString(),
            title: 'New Event',
            data: {
                id: Date.now().toString(),
                title: 'New Event',
                description: '',
                category: 'work',
                priority: 'medium',
                attendees: []
            },
            start: date,
            timePattern,
            allDay: timePattern === 'date' || timePattern === 'date-range'
        };

        if (timePattern === 'datetime' || timePattern === 'datetime-range') {
            const endDate = new Date(date);
            endDate.setHours(endDate.getHours() + 1);
            item.end = endDate;
        } else if (timePattern === 'date-range') {
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            item.end = endDate;
        }

        return item;
    },
    validateItem: (item: CalendarItem<EventData>): boolean => {
        return !!(item.data.title && item.data.title.trim().length > 0);
    }
};

/**
 * Example: Task item type - supports date and datetime patterns with completion
 */
export interface TaskData {
    id: string;
    title: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    assignee?: string;
    estimatedHours?: number;
}

export const TaskItemType: CalendarItemType<TaskData> = {
    type: 'task',
    displayName: 'Task',
    icon: 'task_alt',
    color: '#1976d2',
    timePatterns: ['date', 'datetime'],
    defaultTimePattern: 'date',
    createItem: (date: Date, timePattern: CalendarItemTimePattern): CalendarItem<TaskData> => {
        const item: CalendarItem<TaskData> = {
            id: Date.now().toString(),
            title: 'New Task',
            completed: false, // Can be marked as complete
            data: {
                id: Date.now().toString(),
                title: 'New Task',
                description: '',
                status: 'pending',
                priority: 'medium'
            },
            start: date,
            timePattern,
            allDay: timePattern === 'date'
        };

        if (timePattern === 'datetime') {
            const endDate = new Date(date);
            endDate.setHours(endDate.getHours() + 2); // Default 2-hour task
            item.end = endDate;
        }

        return item;
    },
    validateItem: (item: CalendarItem<TaskData>): boolean => {
        return !!(item.data.title && item.data.title.trim().length > 0);
    }
};

/**
 * Example: Meal item type - datetime only
 */
export interface MealData {
    id: string;
    title: string;
    description?: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    dietaryRestrictions?: string[];
    calories?: number;
    ingredients?: string[];
}

export const MealItemType: CalendarItemType<MealData> = {
    type: 'meal',
    displayName: 'Meal',
    icon: 'restaurant',
    color: '#f57c00',
    timePatterns: ['datetime'],
    defaultTimePattern: 'datetime',
    createItem: (date: Date, timePattern: CalendarItemTimePattern): CalendarItem<MealData> => {
        const item: CalendarItem<MealData> = {
            id: Date.now().toString(),
            title: 'New Meal',
            data: {
                id: Date.now().toString(),
                title: 'New Meal',
                description: '',
                mealType: 'lunch',
                dietaryRestrictions: [],
                ingredients: []
            },
            start: date,
            timePattern,
            allDay: false
        };

        // Meals typically last 30-60 minutes
        const endDate = new Date(date);
        endDate.setMinutes(endDate.getMinutes() + 30);
        item.end = endDate;

        return item;
    },
    validateItem: (item: CalendarItem<MealData>): boolean => {
        return !!(item.data.title && item.data.title.trim().length > 0);
    }
};

/**
 * Example: Vacation/Leave item type - date-range pattern
 */
export interface VacationData {
    id: string;
    title: string;
    description?: string;
    vacationType: 'personal' | 'sick' | 'holiday' | 'business';
    approved: boolean;
    approver?: string;
    notes?: string;
}

export const VacationItemType: CalendarItemType<VacationData> = {
    type: 'vacation',
    displayName: 'Vacation/Leave',
    icon: 'beach_access',
    color: '#ff9800',
    timePatterns: ['date-range'],
    defaultTimePattern: 'date-range',
    createItem: (date: Date, timePattern: CalendarItemTimePattern): CalendarItem<VacationData> => {
        const item: CalendarItem<VacationData> = {
            id: Date.now().toString(),
            title: 'New Vacation',
            data: {
                id: Date.now().toString(),
                title: 'New Vacation',
                description: '',
                vacationType: 'personal',
                approved: false
            },
            start: date,
            timePattern,
            allDay: true
        };

        // Default to 1 week vacation
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 7);
        item.end = endDate;

        return item;
    },
    validateItem: (item: CalendarItem<VacationData>): boolean => {
        return !!(item.data.title && item.data.title.trim().length > 0);
    }
};

/**
 * Example: Appointment item type - datetime and datetime-range patterns
 */
export interface AppointmentData {
    id: string;
    title: string;
    description?: string;
    appointmentType: 'medical' | 'dental' | 'beauty' | 'business' | 'personal';
    provider?: string;
    location?: string;
    contactInfo?: string;
    notes?: string;
}

export const AppointmentItemType: CalendarItemType<AppointmentData> = {
    type: 'appointment',
    displayName: 'Appointment',
    icon: 'schedule',
    color: '#388e3c',
    timePatterns: ['datetime', 'datetime-range'],
    defaultTimePattern: 'datetime',
    createItem: (date: Date, timePattern: CalendarItemTimePattern): CalendarItem<AppointmentData> => {
        const item: CalendarItem<AppointmentData> = {
            id: Date.now().toString(),
            title: 'New Appointment',
            data: {
                id: Date.now().toString(),
                title: 'New Appointment',
                description: '',
                appointmentType: 'business'
            },
            start: date,
            timePattern,
            allDay: false
        };

        if (timePattern === 'datetime') {
            const endDate = new Date(date);
            endDate.setHours(endDate.getHours() + 1);
            item.end = endDate;
        } else if (timePattern === 'datetime-range') {
            const endDate = new Date(date);
            endDate.setHours(endDate.getHours() + 2);
            item.end = endDate;
        }

        return item;
    },
    validateItem: (item: CalendarItem<AppointmentData>): boolean => {
        return !!(item.data.title && item.data.title.trim().length > 0);
    }
};

/**
 * Example: Meeting item type - datetime-range pattern with attendees
 */
export interface MeetingData {
    itemType: string;
    completed?: boolean;
    location: string;
    attendees: string[];
    meetingUrl?: string;
    notes?: string;
}

export const MeetingItemType: CalendarItemType<MeetingData> = {
    type: 'meeting',
    displayName: 'Meeting',
    icon: 'groups',
    color: '#6750a4',
    timePatterns: ['datetime', 'datetime-range'],
    defaultTimePattern: 'datetime-range',
    createItem: (date: Date, timePattern: CalendarItemTimePattern): CalendarItem<MeetingData> => {
        const item: CalendarItem<MeetingData> = {
            id: Date.now().toString(),
            title: 'New Meeting',
            data: {
                itemType: 'Meeting',
                location: '',
                attendees: []
            },
            start: date,
            timePattern,
            allDay: false
        };

        if (timePattern === 'datetime') {
            const endDate = new Date(date);
            endDate.setHours(endDate.getHours() + 1);
            item.end = endDate;
        } else if (timePattern === 'datetime-range') {
            const endDate = new Date(date);
            endDate.setHours(endDate.getHours() + 1);
            item.end = endDate;
        }

        return item;
    },
    validateItem: (item: CalendarItem<MeetingData>): boolean => {
        return !!(item.data && item.data.location && item.data.attendees && item.data.attendees.length > 0);
    }
};

/**
 * All example item types
 */
export const ExampleItemTypes: CalendarItemType<any>[] = [
    EventItemType,        // Supports: date, date-range, datetime, datetime-range
    TaskItemType,         // Supports: date, datetime (with completion)
    MealItemType,         // Supports: datetime
    VacationItemType,     // Supports: date-range
    AppointmentItemType,  // Supports: datetime, datetime-range
    MeetingItemType       // Supports: datetime, datetime-range (with custom fields)
];
