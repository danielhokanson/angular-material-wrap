import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwCalendarFullComponent } from '../../../../library/src/components/components/amw-calendar/amw-calendar-full.component';
import { AmwCalendarMiniComponent } from '../../../../library/src/components/components/amw-calendar/amw-calendar-mini.component';
import { ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarConfig, CalendarEventChangeEvent, CalendarView } from '../../../../library/src/components/components/amw-calendar/interfaces';
import { CalendarItem, CalendarItemChangeEvent } from '../../../../library/src/components/components/amw-calendar/interfaces/calendar-item.interface';
import { CalendarItemConfig } from '../../../../library/src/components/components/amw-calendar/interfaces/calendar-item-config.interface';
import { CalendarItemRegistryService } from '../../../../library/src/components/components/amw-calendar/services/calendar-item-registry.service';
import { ExampleItemTypes } from '../../../../library/src/components/components/amw-calendar/examples/calendar-item-types.example';

// Sample event data interface
interface SampleEvent {
    id: string;
    title: string;
    description?: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
    attendees?: string[];
}

// Extended meeting event interface with custom fields
interface MeetingEvent {
    itemType: string;
    completed?: boolean;
    location: string;
    attendees: string[];
    meetingUrl?: string;
    notes?: string;
}
import { AmwTabsComponent } from '../../../../library/src/components/components/amw-tabs/amw-tabs.component';
import { AmwDividerComponent } from '../../../../library/src/components/components/amw-divider/amw-divider.component';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { AmwTabComponent } from '../../../../library/src/components/components/amw-tabs/amw-tab.component';
import { AmwIconComponent } from '../../../../library/src/components/components';
@Component({
    selector: 'amw-demo-calendar',
    standalone: true,
    imports: [CommonModule,
        FormsModule,
        AmwCalendarFullComponent,
        AmwCalendarMiniComponent,
        AmwTabsComponent,
        AmwTabComponent,
        AmwCardComponent,
        AmwDividerComponent,
        AmwButtonComponent,
        AmwIconComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './calendar-demo.component.html',
    styleUrl: './calendar-demo.component.scss'
})
export class CalendarDemoComponent implements OnInit {
    selectedTab = 0;

    // New item system properties
    useNewItemSystem = true;
    sampleItems: CalendarItem<any>[] = [];
    itemConfig: CalendarItemConfig<any> = {
        displayProperty: 'title',
        editable: true,
        deletable: true,
        draggable: true,
        defaultDuration: 60,
        allowCreate: true,
        allowedTimePatterns: ['date', 'date-range', 'datetime', 'datetime-range'],
        defaultTimePattern: 'datetime'
    };

    // Sample meeting items with custom fields
    meetingItems: CalendarItem<MeetingEvent>[] = [
        {
            id: 'm1',
            title: 'Team Standup',
            description: 'Daily team standup meeting',
            start: new Date(2024, 0, 15, 9, 0),
            end: new Date(2024, 0, 15, 9, 30),
            allDay: false,
            timePattern: 'datetime-range',
            color: '#6750a4',
            editable: true,
            deletable: true,
            draggable: true,
            data: {
                itemType: 'Meeting',
                location: 'Conference Room A',
                attendees: ['john@example.com', 'jane@example.com', 'bob@example.com'],
                meetingUrl: 'https://meet.google.com/abc-defg-hij',
                notes: 'Bring your status updates'
            }
        },
        {
            id: 'm2',
            title: 'Client Presentation',
            description: 'Q1 results presentation to client',
            start: new Date(2024, 0, 16, 14, 0),
            end: new Date(2024, 0, 16, 15, 30),
            allDay: false,
            timePattern: 'datetime-range',
            color: '#1976d2',
            editable: true,
            deletable: true,
            draggable: true,
            data: {
                itemType: 'Meeting',
                location: 'Virtual',
                attendees: ['client@company.com', 'sales@example.com'],
                meetingUrl: 'https://zoom.us/j/123456789',
                notes: 'Share slides beforehand'
            }
        },
        {
            id: 'm3',
            title: 'Project Planning',
            description: 'Planning session for new feature',
            start: new Date(2024, 0, 18, 10, 0),
            end: new Date(2024, 0, 18, 12, 0),
            allDay: false,
            timePattern: 'datetime-range',
            color: '#388e3c',
            editable: true,
            deletable: true,
            draggable: true,
            data: {
                itemType: 'Meeting',
                location: 'Office - Room 301',
                attendees: ['team@example.com'],
                notes: 'Review requirements document'
            }
        }
    ];

    // Sample events data - demonstrating both date-only and date+time events
    sampleEvents: CalendarEvent<SampleEvent>[] = [
        // DATE + TIME EVENTS (specific times)
        {
            id: '1',
            data: {
                id: '1',
                title: 'Team Meeting',
                description: 'Weekly team standup - 1 hour meeting',
                category: 'meeting',
                priority: 'high',
                attendees: ['John', 'Jane', 'Bob']
            },
            start: new Date(2024, 0, 15, 10, 0),
            end: new Date(2024, 0, 15, 11, 0),
            title: 'Team Meeting',
            description: 'Weekly team standup - 1 hour meeting',
            color: '#6750a4',
            allDay: false,
            editable: true,
            deletable: true
        },
        {
            id: '3',
            data: {
                id: '3',
                title: 'Client Call',
                description: 'Discussion with client about requirements - 1 hour call',
                category: 'meeting',
                priority: 'medium',
                attendees: ['John', 'Client']
            },
            start: new Date(2024, 0, 18, 14, 30),
            end: new Date(2024, 0, 18, 15, 30),
            title: 'Client Call',
            description: 'Discussion with client about requirements - 1 hour call',
            color: '#1976d2',
            allDay: false,
            editable: true,
            deletable: true
        },
        {
            id: '4',
            data: {
                id: '4',
                title: 'Code Review',
                description: 'Review pull requests - 1 hour session',
                category: 'work',
                priority: 'low',
                attendees: ['Jane', 'Bob']
            },
            start: new Date(2024, 0, 16, 9, 0),
            end: new Date(2024, 0, 16, 10, 0),
            title: 'Code Review',
            description: 'Review pull requests - 1 hour session',
            color: '#388e3c',
            allDay: false,
            editable: true,
            deletable: true
        },
        {
            id: '5',
            data: {
                id: '5',
                title: 'Lunch Break',
                description: 'Team lunch - 1 hour break',
                category: 'personal',
                priority: 'low',
                attendees: ['John', 'Jane', 'Bob']
            },
            start: new Date(2024, 0, 17, 12, 0),
            end: new Date(2024, 0, 17, 13, 0),
            title: 'Lunch Break',
            description: 'Team lunch - 1 hour break',
            color: '#f57c00',
            allDay: false,
            editable: true,
            deletable: true
        },
        // DATE-ONLY EVENTS (all day events)
        {
            id: '2',
            data: {
                id: '2',
                title: 'Project Deadline',
                description: 'Final project submission - all day deadline',
                category: 'deadline',
                priority: 'high',
                attendees: []
            },
            start: new Date(2024, 0, 20, 0, 0),
            end: new Date(2024, 0, 20, 23, 59),
            title: 'Project Deadline',
            description: 'Final project submission - all day deadline',
            color: '#ba1a1a',
            allDay: true,
            editable: true,
            deletable: true
        },
        {
            id: '6',
            data: {
                id: '6',
                title: 'Company Holiday',
                description: 'Martin Luther King Jr. Day - office closed',
                category: 'holiday',
                priority: 'low',
                attendees: []
            },
            start: new Date(2024, 0, 15, 0, 0),
            end: new Date(2024, 0, 15, 23, 59),
            title: 'Company Holiday',
            description: 'Martin Luther King Jr. Day - office closed',
            color: '#9c27b0',
            allDay: true,
            editable: true,
            deletable: true
        },
        {
            id: '7',
            data: {
                id: '7',
                title: 'Conference Day',
                description: 'Tech conference attendance - all day event',
                category: 'conference',
                priority: 'medium',
                attendees: ['John', 'Jane']
            },
            start: new Date(2024, 0, 22, 0, 0),
            end: new Date(2024, 0, 22, 23, 59),
            title: 'Conference Day',
            description: 'Tech conference attendance - all day event',
            color: '#ff9800',
            allDay: true,
            editable: true,
            deletable: true
        },
        // MULTI-DAY EVENTS
        {
            id: '8',
            data: {
                id: '8',
                title: 'Sprint Planning',
                description: '2-day sprint planning session',
                category: 'planning',
                priority: 'high',
                attendees: ['John', 'Jane', 'Bob', 'Alice']
            },
            start: new Date(2024, 0, 25, 9, 0),
            end: new Date(2024, 0, 26, 17, 0),
            title: 'Sprint Planning',
            description: '2-day sprint planning session',
            color: '#4caf50',
            allDay: false,
            editable: true,
            deletable: true
        }
    ];

    // Calendar configurations
    fullCalendarConfig: CalendarConfig<SampleEvent> = {
        displayProperty: 'title',
        editable: true,
        deletable: true,
        draggable: true,
        defaultDuration: 60,
        minDuration: 15,
        maxDuration: 480,
        timeSlotInterval: 30,
        startHour: 6,
        endHour: 22,
        showWeekends: true,
        showTime: true,
        allowCreate: true,
        eventColor: (event) => event.data.priority === 'high' ? '#ba1a1a' :
            event.data.priority === 'medium' ? '#f57c00' : '#388e3c'
    };

    miniCalendarConfig: CalendarConfig<SampleEvent> = {
        displayProperty: 'title',
        editable: true,
        deletable: true,
        draggable: true,
        defaultDuration: 60,
        allowCreate: true,
        eventColor: (event) => event.data.priority === 'high' ? '#ba1a1a' :
            event.data.priority === 'medium' ? '#f57c00' : '#388e3c'
    };

    // Current date for calendars
    currentDate = new Date(2024, 0, 15); // January 15, 2024

    constructor(
        private notification: AmwNotificationService,
        private itemRegistry: CalendarItemRegistryService
    ) { }

    ngOnInit(): void {
        // Register item types for new system
        this.registerItemTypes();
    }

    /**
     * Register calendar item types
     */
    registerItemTypes(): void {
        ExampleItemTypes.forEach(itemType => {
            this.itemRegistry.registerItemType(itemType);
        });
    }

    /**
     * Update event dates to be relative to current date
     */
    updateEventDates(): void {
        const today = new Date();
        this.sampleEvents.forEach((event, index) => {
            const newStart = new Date(today);
            newStart.setDate(today.getDate() + index);
            newStart.setHours(event.start.getHours(), event.start.getMinutes());

            const newEnd = event.end ? new Date(newStart) : null;
            if (newEnd) {
                newEnd.setHours(event.end!.getHours(), event.end!.getMinutes());
            }

            event.start = newStart;
            if (newEnd) {
                event.end = newEnd;
            }
        });
    }

    /**
     * Handle event change
     */
    onEventChange(event: CalendarEventChangeEvent<SampleEvent>): void {
        console.log('Event changed:', event);

        switch (event.type) {
            case 'create':
            case 'add':
                // Add new event to the events array
                this.sampleEvents.push(event.event);
                this.notification.success('Success', 'Event created', { duration: 3000 });
                break;
            case 'update':
                // Update existing event in the events array
                const updateIndex = this.sampleEvents.findIndex(e => e.id === event.event.id);
                if (updateIndex !== -1) {
                    this.sampleEvents[updateIndex] = event.event;
                }
                this.notification.success('Success', 'Event updated', { duration: 3000 });
                break;
            case 'delete':
                // Remove event from the events array
                this.sampleEvents = this.sampleEvents.filter(e => e.id !== event.event.id);
                this.notification.success('Success', 'Event deleted', { duration: 3000 });
                break;
            case 'move':
                // Update event position in the events array
                const moveIndex = this.sampleEvents.findIndex(e => e.id === event.event.id);
                if (moveIndex !== -1) {
                    this.sampleEvents[moveIndex] = event.event;
                }
                this.notification.info('Info', 'Event moved', { duration: 3000 });
                break;
        }
    }

    /**
     * Handle event click
     */
    onEventClick(event: CalendarEvent<SampleEvent>): void {
        console.log('Event clicked:', event);
        this.notification.info('Info', `Clicked: ${event.data.title}`, { duration: 2000 });
    }

    /**
     * Handle event double click
     */
    onEventDoubleClick(event: CalendarEvent<SampleEvent>): void {
        console.log('Event double clicked:', event);
        this.notification.info('Info', `Double clicked: ${event.data.title}`, { duration: 2000 });
    }

    /**
     * Handle event create
     */

    /**
     * Handle event edit
     */
    onEventEdit(event: CalendarEvent<SampleEvent>): void {
        console.log('Edit event:', event);
        this.notification.info('Info', `Edit: ${event.data.title}`, { duration: 2000 });
    }

    /**
     * Handle event delete
     */
    onEventDelete(event: CalendarEvent<SampleEvent>): void {
        console.log('Delete event:', event);
        this.notification.info('Info', `Delete: ${event.data.title}`, { duration: 2000 });
    }

    /**
     * Handle event move
     */
    onEventMove(event: { event: CalendarEvent<SampleEvent>; newStart: Date; newEnd?: Date; allDay?: boolean }): void {
        console.log('Move event:', event);
        console.log('New start:', event.newStart);
        console.log('New end:', event.newEnd);
        console.log('All day:', event.allDay);

        // Find and update the event in the events array
        const moveIndex = this.sampleEvents.findIndex(e => e.id === event.event.id);
        if (moveIndex !== -1) {
            const oldEvent = this.sampleEvents[moveIndex];
            console.log('Old event:', { start: oldEvent.start, end: oldEvent.end, allDay: oldEvent.allDay });

            // Create a new array to trigger change detection
            this.sampleEvents = this.sampleEvents.map((e, i) =>
                i === moveIndex
                    ? {
                        ...e,
                        start: new Date(event.newStart),
                        end: event.newEnd ? new Date(event.newEnd) : new Date(event.newStart),
                        allDay: event.allDay !== undefined ? event.allDay : e.allDay
                    }
                    : e
            );

            console.log('Updated events array:', this.sampleEvents.map(e => ({ id: e.id, start: e.start, end: e.end, allDay: e.allDay })));

            const allDayText = event.allDay ? ' (all day)' : '';
            this.notification.info(
                'Event Moved',
                `Moved "${event.event.data.title}" to ${event.newStart.toLocaleString()}${allDayText}`,
                { duration: 3000 }
            );
        } else {
            console.error('Event not found in array:', event.event.id);
        }
    }

    /**
     * Handle navigation change
     */
    onNavigationChange(event: any): void {
        console.log('Navigation changed:', event);
    }

    /**
     * Handle view change
     */
    onViewChange(view: CalendarView): void {
        console.log('View changed:', view);
        this.notification.info('Info', `View changed to: ${view}`, { duration: 2000 });
    }

    /**
     * Handle date change
     */
    onDateChange(date: Date): void {
        console.log('Date changed:', date);
        this.currentDate = new Date(date);
    }

    /**
     * Handle cell click
     */
    onCellClick(event: { date: Date; time?: Date }): void {
        console.log('Cell clicked:', event);
    }

    /**
     * Handle cell double click
     */
    onCellDoubleClick(event: { date: Date; time?: Date }): void {
        console.log('Cell double clicked:', event);
        this.notification.info('Info', 'Create new event', { duration: 2000 });
    }

    /**
     * Handle show more click
     */
    onShowMoreClick(date: Date): void {
        console.log('Show more clicked:', date);
        this.notification.info('Info', `Show more events for ${date.toLocaleDateString()}`, { duration: 2000 });
    }

    /**
     * Handle week view toggle
     */
    onWeekViewToggle(showWeek: boolean): void {
        console.log('Week view toggle:', showWeek);
        this.notification.info('Info', `Week view: ${showWeek ? 'enabled' : 'disabled'}`, { duration: 2000 });
    }

    /**
     * Add sample event with specific time (date + time)
     */
    addSampleEventWithTime(): void {
        const now = new Date();
        const startTime = new Date(now);
        startTime.setHours(14, 0, 0, 0); // 2:00 PM

        const endTime = new Date(startTime);
        endTime.setHours(15, 0, 0, 0); // 3:00 PM

        const newEvent: CalendarEvent<SampleEvent> = {
            id: Date.now().toString(),
            data: {
                id: Date.now().toString(),
                title: 'Scheduled Meeting',
                description: 'Sample event with specific time - 1 hour duration',
                category: 'meeting',
                priority: 'medium',
                attendees: ['Demo User']
            },
            start: startTime,
            end: endTime,
            title: 'Scheduled Meeting',
            description: 'Sample event with specific time - 1 hour duration',
            color: '#9c27b0',
            allDay: false,
            editable: true,
            deletable: true
        };

        this.sampleEvents.push(newEvent);
        this.notification.info('Info', 'Time-based event added (2:00 PM - 3:00 PM)', { duration: 3000 });
    }

    /**
     * Add sample event for date only (all day)
     */
    addSampleEventDateOnly(): void {
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const newEvent: CalendarEvent<SampleEvent> = {
            id: (Date.now() + 1).toString(),
            data: {
                id: (Date.now() + 1).toString(),
                title: 'All Day Event',
                description: 'Sample all-day event - no specific time',
                category: 'event',
                priority: 'low',
                attendees: []
            },
            start: startOfDay,
            end: endOfDay,
            title: 'All Day Event',
            description: 'Sample all-day event - no specific time',
            color: '#ff5722',
            allDay: true,
            editable: true,
            deletable: true
        };

        this.sampleEvents.push(newEvent);
        this.notification.info('Info', 'All-day event added', { duration: 3000 });
    }

    /**
     * Add sample event (legacy method for backward compatibility)
     */
    addSampleEvent(): void {
        this.addSampleEventWithTime();
    }

    /**
     * Clear all events
     */
    clearAllEvents(): void {
        this.sampleEvents = [];
        this.notification.info('Info', 'All events cleared', { duration: 2000 });
    }

    /**
     * Reset to sample events
     */
    resetSampleEvents(): void {
        this.updateEventDates();
        this.notification.info('Info', 'Sample events reset', { duration: 2000 });
    }

    // ==========================================================================
    // NEW ITEM SYSTEM EVENT HANDLERS
    // ==========================================================================

    /**
     * Handle item change
     */
    onItemChange(event: CalendarItemChangeEvent<any>): void {
        console.log('Item changed:', event);
        this.notification.info('Info', `Item ${event.type}`, { duration: 2000 });
    }

    /**
     * Handle item click
     */
    onItemClick(item: CalendarItem<any>): void {
        console.log('Item clicked:', item);
        this.notification.info('Info', `Clicked: ${item.title}`, { duration: 2000 });
    }

    /**
     * Handle item double click
     */
    onItemDoubleClick(item: CalendarItem<any>): void {
        console.log('Item double clicked:', item);
        this.notification.info('Info', `Double clicked: ${item.title}`, { duration: 2000 });
    }

    /**
     * Handle item create
     */
    onItemCreate(event: { date: Date; time?: Date }): void {
        console.log('Create item:', event);
        this.notification.info('Info', 'Create item clicked', { duration: 2000 });
    }

    /**
     * Handle item edit
     */
    onItemEdit(item: CalendarItem<any>): void {
        console.log('Edit item:', item);
        this.notification.info('Info', `Edit: ${item.title}`, { duration: 2000 });
    }

    /**
     * Handle item delete
     */
    onItemDelete(item: CalendarItem<any>): void {
        console.log('Delete item:', item);
        this.notification.info('Info', `Delete: ${item.title}`, { duration: 2000 });
    }

    /**
     * Handle item move
     */
    onItemMove(event: { item: CalendarItem<any>; newStart: Date; newEnd?: Date }): void {
        console.log('Move item:', event);
        this.notification.info('Info', `Move: ${event.item.title}`, { duration: 2000 });
    }

    /**
     * Validate custom meeting fields
     */
    validateMeetingFields = (data: MeetingEvent): boolean => {
        if (!data.location?.trim()) {
            this.notification.info('Info', 'Location is required for meetings', { duration: 3000 });
            return false;
        }
        if (!data.attendees || data.attendees.length === 0) {
            this.notification.info('Info', 'At least one attendee is required', { duration: 3000 });
            return false;
        }
        // Validate email format for attendees
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        for (const email of data.attendees) {
            if (!emailRegex.test(email.trim())) {
                this.notification.success('Success', `Invalid email format: ${email}`, { duration: 3000 });
                return false;
            }
        }
        return true;
    };

    /**
     * Handle meeting item change
     */
    onMeetingItemChange(event: CalendarItemChangeEvent<MeetingEvent>): void {
        console.log('[Demo] Meeting item changed:', event.type, event.item.title, event.item.id);
        console.log('[Demo] meetingItems before change:', this.meetingItems.map(m => ({ id: m.id, title: m.title })));

        switch (event.type) {
            case 'create':
                this.meetingItems.push(event.item);
                console.log('[Demo] meetingItems after create:', this.meetingItems.map(m => ({ id: m.id, title: m.title })));
                this.notification.success('Success', 'Meeting created successfully', { duration: 3000 });
                break;
            case 'update':
                const updateIndex = this.meetingItems.findIndex(m => m.id === event.item.id);
                console.log('[Demo] Update index found:', updateIndex);
                if (updateIndex !== -1) {
                    this.meetingItems[updateIndex] = event.item;
                }
                console.log('[Demo] meetingItems after update:', this.meetingItems.map(m => ({ id: m.id, title: m.title })));
                this.notification.success('Success', 'Meeting updated successfully', { duration: 3000 });
                break;
            case 'delete':
                this.meetingItems = this.meetingItems.filter(m => m.id !== event.item.id);
                console.log('[Demo] meetingItems after delete:', this.meetingItems.map(m => ({ id: m.id, title: m.title })));
                this.notification.success('Success', 'Meeting deleted successfully', { duration: 3000 });
                break;
        }
    }

    /**
     * Convert attendees array to comma-separated string
     */
    attendeesToString(attendees: string[] | undefined): string {
        return attendees?.join(', ') || '';
    }

    /**
     * Convert comma-separated string to attendees array
     */
    stringToAttendees(value: string): string[] {
        return value.split(',').map(e => e.trim()).filter(e => e.length > 0);
    }
}
