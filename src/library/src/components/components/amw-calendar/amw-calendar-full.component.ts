import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy, ChangeDetectorRef, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AmwCalendarBaseComponent } from './amw-calendar-base.component';
import { CalendarEvent, CalendarEventChangeEvent, CalendarConfig, CalendarView, CalendarNavigationEvent } from './interfaces';
import { CalendarItem, CalendarItemChangeEvent } from './interfaces/calendar-item.interface';
import { CalendarItemConfig } from './interfaces/calendar-item-config.interface';
import { CalendarItemRegistryService } from './services/calendar-item-registry.service';
import { CalendarItemPopoverService } from './services/calendar-item-popover.service';

/**
 * AMW Calendar Full Component
 * Full-screen calendar component for workspace display with month, week, and day views
 */
@Component({
    selector: 'amw-calendar-full',
    standalone: true,
    imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule
],
    templateUrl: './amw-calendar-full.component.html',
    styleUrl: './amw-calendar-full.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AmwCalendarFullComponent<T = any> extends AmwCalendarBaseComponent<T> implements OnInit, OnChanges, OnDestroy {
    // Additional input properties for full calendar
    @Input() showNavigation: boolean = true;
    @Input() showViewSwitcher: boolean = true;
    @Input() showTodayButton: boolean = true;
    @Input() showCreateButton: boolean = true;
    @Input() height: string = '600px';

    // Additional output events
    @Output() cellClick = new EventEmitter<{ date: Date; time?: Date }>();
    @Output() cellDoubleClick = new EventEmitter<{ date: Date; time?: Date }>();

    // View-specific properties
    monthDays: Date[] = [];
    weekDays: Date[] = [];
    dayHours: Date[] = [];
    currentWeekStart: Date = new Date();
    currentMonthStart: Date = new Date();

    // UI state

    constructor(
        cdr: ChangeDetectorRef,
        itemRegistry: CalendarItemRegistryService,
        popoverService: CalendarItemPopoverService,
        dialog: MatDialog
    ) {
        super(cdr, itemRegistry, popoverService, dialog);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.generateCalendarData();
    }

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        if (changes['selectedDate'] || changes['currentView']) {
            this.generateCalendarData();
        }
    }

    /**
     * Generate calendar data for current view
     */
    generateCalendarData(): void {
        switch (this.currentView) {
            case 'month':
                this.generateMonthData();
                break;
            case 'week':
                this.generateWeekData();
                break;
            case 'day':
                this.generateDayData();
                break;
        }
    }

    /**
     * Generate month view data
     */
    generateMonthData(): void {
        const year = this.selectedDate.getFullYear();
        const month = this.selectedDate.getMonth();

        // First day of the month
        const firstDay = new Date(year, month, 1);
        this.currentMonthStart = new Date(firstDay);

        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);

        // Start from the beginning of the week containing the first day
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        // End at the end of the week containing the last day
        const endDate = new Date(lastDay);
        endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

        this.monthDays = [];
        const current = new Date(startDate);

        while (current <= endDate) {
            this.monthDays.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
    }

    /**
     * Generate week view data
     */
    generateWeekData(): void {
        const startOfWeek = new Date(this.selectedDate);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day;
        startOfWeek.setDate(diff);

        this.currentWeekStart = new Date(startOfWeek);
        this.weekDays = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(date.getDate() + i);
            this.weekDays.push(date);
        }
    }

    /**
     * Generate day view data
     */
    generateDayData(): void {
        this.dayHours = [];
        const startHour = this.internalConfig.startHour || 6;
        const endHour = this.internalConfig.endHour || 22;

        for (let hour = startHour; hour <= endHour; hour++) {
            const date = new Date(this.selectedDate);
            date.setHours(hour, 0, 0, 0);
            this.dayHours.push(date);
        }
    }

    /**
     * Handle cell click
     */
    onCellClick(date: Date, time?: Date): void {
        this.cellClick.emit({ date, time });
    }

    /**
     * Handle cell double click
     */
    onCellDoubleClick(date: Date, time?: Date): void {
        this.cellDoubleClick.emit({ date, time });
    }


    /**
     * Handle drag start
     */
    onDragStart(event: DragEvent, calendarEvent: CalendarEvent<T>): void {
        if (!this.isEventDraggable(calendarEvent)) return;

        this.isDragging = true;
        this.dragStartEvent = calendarEvent;
        this.dragStartPosition = { x: event.clientX, y: event.clientY };

        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', calendarEvent.id);
        }
    }

    /**
     * Handle drag end
     */
    onDragEnd(): void {
        this.isDragging = false;
        this.dragStartEvent = null;
        this.dragStartPosition = null;
    }

    /**
     * Handle drop
     */
    onDrop(event: DragEvent, targetDate: Date, targetTime?: Date): void {
        event.preventDefault();

        if (!this.dragStartEvent) return;

        const newStart = targetTime || targetDate;
        const duration = this.dragStartEvent.end
            ? this.dragStartEvent.end.getTime() - this.dragStartEvent.start.getTime()
            : (this.internalConfig.defaultDuration || 60) * 60 * 1000;

        const newEnd = new Date(newStart.getTime() + duration);

        this.moveEvent(this.dragStartEvent, newStart, newEnd);
        this.onDragEnd();
    }

    /**
     * Handle drag over
     */
    onDragOver(event: DragEvent): void {
        event.preventDefault();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move';
        }
    }

    /**
     * Get events for a specific time slot
     */
    getEventsForTimeSlot(hour: number): CalendarEvent<T>[] {
        const start = new Date(this.selectedDate);
        start.setHours(hour, 0, 0, 0);

        const end = new Date(start);
        end.setHours(hour + 1, 0, 0, 0);

        return this.getEventsForTimeRange(start, end);
    }

    /**
     * Get all-day events for a specific date
     */
    getAllDayEventsForDate(date: Date): CalendarEvent<T>[] {
        const eventsForDate = this.getEventsForDate(date);
        return eventsForDate.filter(event => event.allDay);
    }

    /**
     * Get timed events for a specific time slot (excludes all-day events)
     */
    getTimedEventsForTimeSlot(hour: number): CalendarEvent<T>[] {
        const eventsForSlot = this.getEventsForTimeSlot(hour);
        return eventsForSlot.filter(event => !event.allDay);
    }

    /**
     * Get all timed events for the selected date (excludes all-day events)
     */
    getTimedEventsForDate(): CalendarEvent<T>[] {
        const eventsForDate = this.getEventsForDate(this.selectedDate);
        return eventsForDate.filter(event => !event.allDay);
    }

    /**
     * Get event position and size for day view
     */
    getEventPosition(event: CalendarEvent<T>): { top: string; height: string; left?: string; right?: string; width?: string; position?: string } {
        const startHour = this.internalConfig.startHour || 6;
        const slotHeight = 70; // Match exact CSS height

        const eventStart = new Date(event.start);
        const eventEnd = event.end ? new Date(event.end) : new Date(eventStart.getTime() + (this.internalConfig.defaultDuration || 60) * 60 * 1000);

        // Calculate minutes from start of day (6 AM)
        const startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
        const endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes();
        const startHourMinutes = startHour * 60;

        // Position relative to the first hour slot (6 AM)
        const top = ((startMinutes - startHourMinutes) / 60) * slotHeight;
        const height = ((endMinutes - startMinutes) / 60) * slotHeight;


        return {
            position: 'absolute',
            top: `${top}px`,
            height: `${height}px`,
            left: '104px', // 80px (hour label width) + 12px (padding) + 12px (gap)
            right: '4px',
            width: 'auto' // Let width be determined by left and right positioning
        };
    }

    /**
     * Get week day names
     */
    getWeekDayNames(): string[] {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }

    /**
     * Get month names
     */
    getMonthNames(): string[] {
        return [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
    }

    /**
     * Get current month name
     */
    getCurrentMonthName(): string {
        return this.getMonthNames()[this.selectedDate.getMonth()];
    }

    /**
     * Get current year
     */
    getCurrentYear(): number {
        return this.selectedDate.getFullYear();
    }

    /**
     * Get current week range
     */
    getCurrentWeekRange(): string {
        if (!this.weekDays || this.weekDays.length < 7) {
            return '';
        }

        const start = this.weekDays[0];
        const end = this.weekDays[6];

        if (!start || !end) {
            return '';
        }

        return `${this.getFormattedDate(start, 'short')} - ${this.getFormattedDate(end, 'short')}`;
    }

    /**
     * Check if date is weekend
     */
    isWeekend(date: Date): boolean {
        const day = date.getDay();
        return day === 0 || day === 6;
    }

    /**
     * Override changeView to regenerate calendar data
     */
    override changeView(view: CalendarView): void {
        super.changeView(view);
        this.generateCalendarData();
    }

    /**
     * Handle create button click
     */
    onCreateButtonClick(event: Event): void {
        event.stopPropagation();
        this.onAddButtonClickForItem(event.target as HTMLElement);
    }

    /**
     * Check if date is in current view
     */
    isInCurrentView(date: Date): boolean {
        switch (this.currentView) {
            case 'month':
                return this.isCurrentMonth(date);
            case 'week':
                return date >= this.weekDays[0] && date <= this.weekDays[6];
            case 'day':
                return this.isSameDay(date, this.selectedDate);
            default:
                return false;
        }
    }
}
