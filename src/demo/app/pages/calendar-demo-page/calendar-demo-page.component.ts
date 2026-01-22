import { Component, OnInit } from '@angular/core';

import { AmwNotificationService } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarConfig, CalendarEventChangeEvent, CalendarView } from '../../../../library/src/components/components/amw-calendar/interfaces';
import { AmwCalendarFullComponent } from '../../../../library/src/components/components/amw-calendar/amw-calendar-full.component';
import { AmwCalendarMiniComponent } from '../../../../library/src/components/components/amw-calendar/amw-calendar-mini.component';
import { AmwTabsComponent, AmwTabComponent, AmwDividerComponent, AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

// Sample event data interface
interface SampleEvent {
    id: string;
    title: string;
    description?: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
    attendees?: string[];
}

@Component({
    selector: 'amw-demo-calendar-page',
    standalone: true,
    imports: [
    AmwCalendarFullComponent,
    AmwCalendarMiniComponent,
    AmwTabsComponent,
    AmwTabComponent,
    AmwDividerComponent,
    AmwCardComponent,
    AmwIconComponent,
    AmwButtonComponent,
    AmwApiDocComponent,
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './calendar-demo-page.component.html',
    styleUrl: './calendar-demo-page.component.scss'
})
export class CalendarDemoPageComponent implements OnInit {
    selectedTab = 0;

    // Sample events data
    sampleEvents: CalendarEvent<SampleEvent>[] = [
        {
            id: '1',
            data: {
                id: '1',
                title: 'Team Meeting',
                description: 'Weekly team standup',
                category: 'meeting',
                priority: 'high',
                attendees: ['John', 'Jane', 'Bob']
            },
            start: new Date(2024, 0, 15, 10, 0),
            end: new Date(2024, 0, 15, 11, 0),
            title: 'Team Meeting',
            description: 'Weekly team standup',
            color: '#6750a4',
            allDay: false
        },
        {
            id: '2',
            data: {
                id: '2',
                title: 'Project Deadline',
                description: 'Final project submission',
                category: 'deadline',
                priority: 'high',
                attendees: []
            },
            start: new Date(2024, 0, 20, 0, 0),
            end: new Date(2024, 0, 20, 23, 59),
            title: 'Project Deadline',
            description: 'Final project submission',
            color: '#ba1a1a',
            allDay: true
        },
        {
            id: '3',
            data: {
                id: '3',
                title: 'Client Call',
                description: 'Discussion with client about requirements',
                category: 'meeting',
                priority: 'medium',
                attendees: ['John', 'Client']
            },
            start: new Date(2024, 0, 18, 14, 30),
            end: new Date(2024, 0, 18, 15, 30),
            title: 'Client Call',
            description: 'Discussion with client about requirements',
            color: '#1976d2',
            allDay: false
        },
        {
            id: '4',
            data: {
                id: '4',
                title: 'Code Review',
                description: 'Review pull requests',
                category: 'work',
                priority: 'low',
                attendees: ['Jane', 'Bob']
            },
            start: new Date(2024, 0, 16, 9, 0),
            end: new Date(2024, 0, 16, 10, 0),
            title: 'Code Review',
            description: 'Review pull requests',
            color: '#388e3c',
            allDay: false
        },
        {
            id: '5',
            data: {
                id: '5',
                title: 'Lunch Break',
                description: 'Team lunch',
                category: 'personal',
                priority: 'low',
                attendees: ['John', 'Jane', 'Bob']
            },
            start: new Date(2024, 0, 17, 12, 0),
            end: new Date(2024, 0, 17, 13, 0),
            title: 'Lunch Break',
            description: 'Team lunch',
            color: '#f57c00',
            allDay: false
        },
        {
            id: '6',
            data: {
                id: '6',
                title: 'Sprint Planning',
                description: 'Plan next sprint tasks',
                category: 'meeting',
                priority: 'medium',
                attendees: ['John', 'Jane', 'Bob', 'Alice']
            },
            start: new Date(2024, 0, 22, 9, 0),
            end: new Date(2024, 0, 22, 11, 0),
            title: 'Sprint Planning',
            description: 'Plan next sprint tasks',
            color: '#9c27b0',
            allDay: false
        },
        {
            id: '7',
            data: {
                id: '7',
                title: 'Documentation Review',
                description: 'Review technical documentation',
                category: 'work',
                priority: 'low',
                attendees: ['Jane']
            },
            start: new Date(2024, 0, 19, 14, 0),
            end: new Date(2024, 0, 19, 16, 0),
            title: 'Documentation Review',
            description: 'Review technical documentation',
            color: '#607d8b',
            allDay: false
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

    // Code examples for documentation
    codeExamples = {
        basicUsage: `<!-- Calendar Demo Page Structure -->
<div class="calendar-demo-page">
  <div class="demo-header">
    <h1>AMW Calendar Components</h1>
    <p>Comprehensive calendar components with event management</p>
  </div>

  <amw-tabs>
    <amw-tab label="Full Calendar">
      <amw-card>
        <ng-template #cardContent>
          <amw-calendar-full
            [events]="sampleEvents"
            [config]="calendarConfig"
            [currentDate]="currentDate"
            [height]="'600px'"
            (eventChange)="onEventChange($event)"
            (eventClick)="onEventClick($event)">
          </amw-calendar-full>
        </ng-template>
      </amw-card>
    </amw-tab>

    <amw-tab label="Mini Calendar">
      <amw-calendar-mini
        [events]="sampleEvents"
        [config]="miniConfig"
        [showWeekView]="true">
      </amw-calendar-mini>
    </amw-tab>
  </amw-tabs>
</div>`,

        fullCalendarPattern: `<!-- Full Calendar Component -->
<amw-calendar-full
  [events]="sampleEvents"
  [config]="fullCalendarConfig"
  [currentDate]="currentDate"
  [height]="'600px'"
  (eventChange)="onEventChange($event)"
  (eventClick)="onEventClick($event)"
  (eventDoubleClick)="onEventDoubleClick($event)"
  (eventEdit)="onEventEdit($event)"
  (eventDelete)="onEventDelete($event)"
  (eventMove)="onEventMove($event)"
  (navigationChange)="onNavigationChange($event)"
  (viewChange)="onViewChange($event)"
  (dateChange)="onDateChange($event)"
  (cellClick)="onCellClick($event)"
  (cellDoubleClick)="onCellDoubleClick($event)">
</amw-calendar-full>`,

        miniCalendarPattern: `<!-- Mini Calendar - Single Day View -->
<amw-calendar-mini
  [events]="sampleEvents"
  [config]="miniCalendarConfig"
  [currentDate]="currentDate"
  [showWeekView]="false"
  [maxEventsPerDay]="3"
  [showMoreButton]="true"
  [compactMode]="false"
  (eventChange)="onEventChange($event)"
  (eventClick)="onEventClick($event)">
</amw-calendar-mini>

<!-- Mini Calendar - Week View -->
<amw-calendar-mini
  [events]="sampleEvents"
  [config]="miniCalendarConfig"
  [showWeekView]="true"
  [compactMode]="true">
</amw-calendar-mini>`,

        componentCode: `import { Component } from '@angular/core';
import {
  CalendarEvent,
  CalendarConfig,
  CalendarEventChangeEvent,
  CalendarView
} from 'angular-material-wrap';
import {
  AmwCalendarFullComponent,
  AmwCalendarMiniComponent,
  AmwTabsComponent,
  AmwTabComponent,
  AmwCardComponent,
  AmwButtonComponent
} from 'angular-material-wrap';

interface MyEvent {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-calendar-demo',
  standalone: true,
  imports: [
    AmwCalendarFullComponent,
    AmwCalendarMiniComponent,
    AmwTabsComponent,
    AmwTabComponent,
    AmwCardComponent,
    AmwButtonComponent
  ],
  templateUrl: './calendar-demo.component.html'
})
export class CalendarDemoComponent {
  sampleEvents: CalendarEvent<MyEvent>[] = [
    {
      id: '1',
      data: { id: '1', title: 'Meeting', category: 'work', priority: 'high' },
      start: new Date(),
      end: new Date(Date.now() + 3600000),
      title: 'Meeting',
      color: '#6750a4'
    }
  ];

  calendarConfig: CalendarConfig<MyEvent> = {
    displayProperty: 'title',
    editable: true,
    deletable: true,
    draggable: true,
    allowCreate: true,
    eventColor: (event) => event.data.priority === 'high' ? '#ba1a1a' : '#388e3c'
  };

  onEventChange(event: CalendarEventChangeEvent<MyEvent>): void {
    switch (event.type) {
      case 'create':
        this.sampleEvents.push(event.event);
        break;
      case 'update':
        const index = this.sampleEvents.findIndex(e => e.id === event.event.id);
        if (index !== -1) this.sampleEvents[index] = event.event;
        break;
      case 'delete':
        this.sampleEvents = this.sampleEvents.filter(e => e.id !== event.event.id);
        break;
    }
  }
}`
    };

    // API documentation
    calendarPageApiDoc: ApiDocumentation = {
        inputs: [],
        outputs: [],
        usageNotes: [
            'The Calendar Demo Page showcases two calendar components: Full Calendar and Mini Calendar',
            'Full Calendar provides month, week, and day views with comprehensive event management',
            'Mini Calendar offers a compact view suitable for sidebars and dashboards',
            'Both calendars support drag-and-drop event moving and resizing',
            'Events are strongly typed using TypeScript generics for custom data structures',
            'Calendar configuration allows customizing appearance, behavior, and event colors',
            'Event handlers provide hooks for create, update, delete, and move operations',
            'This page demonstrates integration of: AmwCalendarFull, AmwCalendarMini, AmwTabs, AmwCard, AmwButton, AmwDivider, AmwIcon'
        ]
    };

    // Interfaces for documentation
    calendarPageInterfaces: ApiInterface[] = [
        {
            name: 'CalendarEvent<T>',
            description: 'Structure for calendar events with generic data type',
            properties: [
                { name: 'id', type: 'string', description: 'Unique event identifier' },
                { name: 'data', type: 'T', description: 'Custom event data of generic type' },
                { name: 'start', type: 'Date', description: 'Event start date and time' },
                { name: 'end', type: 'Date', description: 'Event end date and time (optional)' },
                { name: 'title', type: 'string', description: 'Event display title' },
                { name: 'description', type: 'string', description: 'Event description (optional)' },
                { name: 'color', type: 'string', description: 'Event color (optional)' },
                { name: 'allDay', type: 'boolean', description: 'Whether event spans all day' },
                { name: 'editable', type: 'boolean', description: 'Whether event can be edited' },
                { name: 'deletable', type: 'boolean', description: 'Whether event can be deleted' }
            ]
        },
        {
            name: 'CalendarConfig<T>',
            description: 'Configuration options for calendar components',
            properties: [
                { name: 'displayProperty', type: 'string', description: 'Property to display as event title' },
                { name: 'editable', type: 'boolean', description: 'Enable event editing' },
                { name: 'deletable', type: 'boolean', description: 'Enable event deletion' },
                { name: 'draggable', type: 'boolean', description: 'Enable drag-and-drop' },
                { name: 'allowCreate', type: 'boolean', description: 'Allow creating new events' },
                { name: 'defaultDuration', type: 'number', description: 'Default event duration in minutes' },
                { name: 'eventColor', type: '(event: CalendarEvent<T>) => string', description: 'Function to determine event color' }
            ]
        },
        {
            name: 'CalendarEventChangeEvent<T>',
            description: 'Event emitted when calendar events change',
            properties: [
                { name: 'type', type: "'create' | 'update' | 'delete' | 'move'", description: 'Type of change' },
                { name: 'event', type: 'CalendarEvent<T>', description: 'The affected event' },
                { name: 'previousEvent', type: 'CalendarEvent<T>', description: 'Previous event state (for updates)' }
            ]
        }
    ];

    constructor(
        private notification: AmwNotificationService
    ) { }

    ngOnInit(): void {
        // Set up sample events with current date
        this.updateEventDates();
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
    onEventMove(event: { event: CalendarEvent<SampleEvent>; newStart: Date; newEnd?: Date }): void {
        console.log('Move event:', event);
        this.notification.info('Info', `Move: ${event.event.data.title}`, { duration: 2000 });
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
     * Add sample event
     */
    addSampleEvent(): void {
        const newEvent: CalendarEvent<SampleEvent> = {
            id: Date.now().toString(),
            data: {
                id: Date.now().toString(),
                title: 'New Event',
                description: 'Sample event created from demo',
                category: 'demo',
                priority: 'medium',
                attendees: []
            },
            start: new Date(),
            end: new Date(Date.now() + 60 * 60 * 1000), // 1 hour later
            title: 'New Event',
            description: 'Sample event created from demo',
            color: '#9c27b0',
            allDay: false,
            editable: true,
            deletable: true
        };

        this.sampleEvents.push(newEvent);
        this.notification.info('Info', 'Sample event added', { duration: 2000 });
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
}
