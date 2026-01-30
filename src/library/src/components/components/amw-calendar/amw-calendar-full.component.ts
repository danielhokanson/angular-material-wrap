import { Component, input, output, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AmwCalendarBaseComponent } from './amw-calendar-base.component';
import { CalendarEvent, CalendarView } from './interfaces';
import { AmwCalendarItemRegistryService } from './services/amw-calendar-item-registry.service';
import { AmwCalendarItemPopoverService } from './services/amw-calendar-item-popover.service';
import { AmwProgressSpinnerComponent } from '../amw-progress-spinner/amw-progress-spinner.component';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';
import { AmwTooltipDirective } from '../../../directives';

/**
 * AMW Calendar Full Component
 * Full-screen calendar component for workspace display with month, week, and day views
 */
@Component({
    selector: 'amw-calendar-full',
    standalone: true,
    imports: [
    CommonModule,
    FormsModule,
    AmwButtonComponent,
    AmwTooltipDirective,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    AmwProgressSpinnerComponent
],
    templateUrl: './amw-calendar-full.component.html',
    styleUrl: './amw-calendar-full.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: { 'data-amw-id': 'amw-calendar-full' }
})
export class AmwCalendarFullComponent<T = any> extends AmwCalendarBaseComponent<T> implements OnInit, OnDestroy {
    // Additional input properties for full calendar
    showNavigation = input<boolean>(true);
    showViewSwitcher = input<boolean>(true);
    showTodayButton = input<boolean>(true);
    showCreateButton = input<boolean>(true);
    height = input<string>('600px');

    // Additional output events
    cellClick = output<{ date: Date; time?: Date }>();
    cellDoubleClick = output<{ date: Date; time?: Date }>();

    // View-specific properties
    monthDays: Date[] = [];
    weekDays: Date[] = [];
    dayHours: Date[] = [];
    currentWeekStart: Date = new Date();
    currentMonthStart: Date = new Date();

    // UI state
    dragOverTarget: string | null = null;

    constructor(
        cdr: ChangeDetectorRef,
        itemRegistry: AmwCalendarItemRegistryService,
        popoverService: AmwCalendarItemPopoverService,
        dialog: MatDialog
    ) {
        super(cdr, itemRegistry, popoverService, dialog);

        // Effect to handle view changes
        effect(() => {
            // Read signals to trigger effect when they change
            this.view();
            this.currentDate();
            this.generateCalendarData();
        });
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.generateCalendarData();
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

        // Generate hour slots for week view time grid
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
        this.dragOverTarget = null;
    }

    /**
     * Handle drop
     */
    onDrop(event: DragEvent, targetDate: Date, targetTime?: Date, isAllDay: boolean = false): void {
        event.preventDefault();

        if (!this.dragStartEvent) return;

        // Determine new start time and allDay status
        let newStart: Date;
        let newEnd: Date;
        let shouldBeAllDay = isAllDay;

        if (isAllDay) {
            // Dropping on all-day area - set to start of day
            newStart = new Date(targetDate);
            newStart.setHours(0, 0, 0, 0);
            newEnd = new Date(newStart);
            newEnd.setHours(23, 59, 59, 999);
        } else if (targetTime) {
            // Dropping on a specific time slot - combine date and time
            newStart = new Date(targetDate);
            newStart.setHours(targetTime.getHours(), targetTime.getMinutes(), 0, 0);

            const duration = this.dragStartEvent.end && !this.dragStartEvent.allDay
                ? this.dragStartEvent.end.getTime() - this.dragStartEvent.start.getTime()
                : (this.internalConfig.defaultDuration || 60) * 60 * 1000;

            newEnd = new Date(newStart.getTime() + duration);
        } else {
            // Month view - use target date
            newStart = new Date(targetDate);
            newStart.setHours(0, 0, 0, 0);
            newEnd = new Date(newStart);
            newEnd.setHours(23, 59, 59, 999);
            shouldBeAllDay = true;
        }

        this.moveEvent(this.dragStartEvent, newStart, newEnd, shouldBeAllDay);
        this.onDragEnd();
    }

    /**
     * Handle drag over
     */
    onDragOver(event: DragEvent, targetId?: string): void {
        event.preventDefault();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move';
        }
        if (targetId) {
            this.dragOverTarget = targetId;
        }
    }

    /**
     * Handle drag leave
     */
    onDragLeave(event: DragEvent, targetId?: string): void {
        if (targetId && this.dragOverTarget === targetId) {
            this.dragOverTarget = null;
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
    getTimedEventsForDate(date?: Date): CalendarEvent<T>[] {
        const targetDate = date || this.selectedDate;
        const eventsForDate = this.getEventsForDate(targetDate);
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
     * Get event position and size for week view
     */
    getEventPositionForWeek(event: CalendarEvent<T>): { top: string; height: string; position?: string } {
        const startHour = this.internalConfig.startHour || 6;
        const slotHeight = 70; // Match exact CSS height

        const eventStart = new Date(event.start);
        const eventEnd = event.end ? new Date(event.end) : new Date(eventStart.getTime() + (this.internalConfig.defaultDuration || 60) * 60 * 1000);

        // Calculate minutes from start of day
        const startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
        const endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes();
        const startHourMinutes = startHour * 60;

        // Position relative to the first hour slot
        const top = ((startMinutes - startHourMinutes) / 60) * slotHeight;
        const height = ((endMinutes - startMinutes) / 60) * slotHeight;

        return {
            position: 'absolute',
            top: `${top}px`,
            height: `${height}px`
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

    /**
     * Generate a unique ID for a drop target cell
     */
    getCellId(date: Date, hour?: Date, type: string = 'cell'): string {
        const dateStr = date.toISOString().split('T')[0];
        const hourStr = hour ? `-${hour.getHours()}` : '';
        return `${type}-${dateStr}${hourStr}`;
    }

    /**
     * Check if a cell is currently being hovered during drag
     */
    isCellDraggedOver(cellId: string): boolean {
        return this.dragOverTarget === cellId;
    }
}
