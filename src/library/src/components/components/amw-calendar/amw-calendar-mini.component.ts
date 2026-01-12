import { Component, input, output, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation, effect } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { AmwCalendarBaseComponent } from './amw-calendar-base.component';
import { CalendarEvent, CalendarView } from './interfaces';
import { CalendarItemRegistryService } from './services/calendar-item-registry.service';
import { CalendarItemPopoverService } from './services/calendar-item-popover.service';
import { AmwProgressSpinnerComponent } from '../amw-progress-spinner/amw-progress-spinner.component';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';
import { AmwTooltipDirective } from '../../../directives';

/**
 * AMW Calendar Mini Component
 * Small summary calendar component for single day/week view
 */
@Component({
    selector: 'amw-calendar-mini',
    standalone: true,
    imports: [
    FormsModule,
    AmwButtonComponent,
    MatIconModule,
    AmwTooltipDirective,
    MatCardModule,
    MatChipsModule,
    AmwProgressSpinnerComponent
],
    templateUrl: './amw-calendar-mini.component.html',
    styleUrl: './amw-calendar-mini.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: { 'data-amw-id': 'amw-calendar-mini' }
})
export class AmwCalendarMiniComponent<T = any> extends AmwCalendarBaseComponent<T> implements OnInit, OnDestroy {
    // Additional input properties for mini calendar
    showWeekView = input<boolean>(false);
    maxEventsPerDay = input<number>(3);
    showMoreButton = input<boolean>(true);
    compactMode = input<boolean>(false);
    showNavigation = input<boolean>(true);

    // Additional output events
    showMoreClick = output<Date>();
    weekViewToggle = output<boolean>();

    // View-specific properties
    weekDays: Date[] = [];
    currentWeekStart: Date = new Date();
    showWeekViewInternal: boolean = false;

    // UI state
    isExpanded = false;

    constructor(
        cdr: ChangeDetectorRef,
        itemRegistry: CalendarItemRegistryService,
        popoverService: CalendarItemPopoverService,
        dialog: MatDialog
    ) {
        super(cdr, itemRegistry, popoverService, dialog);

        // Effect to handle changes to showWeekView
        effect(() => {
            const showWeekViewValue = this.showWeekView();
            this.showWeekViewInternal = showWeekViewValue;
            this.generateWeekData();
        });
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.showWeekViewInternal = this.showWeekView();
        this.generateWeekData();
    }

    /**
     * Generate week data for mini calendar
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
     * Toggle week view
     */
    toggleWeekView(): void {
        this.showWeekViewInternal = !this.showWeekViewInternal;
        this.weekViewToggle.emit(this.showWeekViewInternal);

        if (this.showWeekViewInternal) {
            this.generateWeekData();
        }
    }

    /**
     * Navigate to previous day/week
     */
    override navigatePrevious(): void {
        if (this.showWeekViewInternal) {
            const previousWeek = new Date(this.currentWeekStart);
            previousWeek.setDate(previousWeek.getDate() - 7);
            this.navigateToDate(previousWeek);
        } else {
            super.navigatePrevious();
        }
    }

    /**
     * Navigate to next day/week
     */
    override navigateNext(): void {
        if (this.showWeekViewInternal) {
            const nextWeek = new Date(this.currentWeekStart);
            nextWeek.setDate(nextWeek.getDate() + 7);
            this.navigateToDate(nextWeek);
        } else {
            super.navigateNext();
        }
    }

    /**
     * Override changeView to regenerate calendar data
     */
    override changeView(view: CalendarView): void {
        super.changeView(view);
        if (this.showWeekViewInternal) {
            this.generateWeekData();
        }
    }

    /**
     * Get events for a specific date (limited by maxEventsPerDay)
     */
    getEventsForDateLimited(date: Date): CalendarEvent<T>[] {
        const events = this.getEventsForDate(date);
        return events.slice(0, this.maxEventsPerDay());
    }

    /**
     * Get remaining events count for a date
     */
    getRemainingEventsCount(date: Date): number {
        const totalEvents = this.getEventsForDate(date).length;
        return Math.max(0, totalEvents - this.maxEventsPerDay());
    }

    /**
     * Handle show more button click
     */
    onShowMoreClick(date: Date): void {
        this.showMoreClick.emit(date);
    }

    /**
     * Get day of week name
     */
    getDayOfWeekName(date: Date): string {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return dayNames[date.getDay()];
    }

    /**
     * Get month name
     */
    getMonthName(date: Date): string {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return monthNames[date.getMonth()];
    }

    /**
     * Get formatted date for mini display
     */
    getFormattedDateMini(date: Date): string {
        if (this.compactMode()) {
            return `${date.getDate()}`;
        }
        return `${this.getDayOfWeekName(date)} ${date.getDate()}`;
    }

    /**
     * Get current week range for display
     */
    getCurrentWeekRange(): string {
        const start = this.weekDays[0];
        const end = this.weekDays[6];

        if (this.compactMode()) {
            return `${start.getDate()}-${end.getDate()} ${this.getMonthName(start)}`;
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
     * Check if date is in current week
     */
    isInCurrentWeek(date: Date): boolean {
        return date >= this.weekDays[0] && date <= this.weekDays[6];
    }

    /**
     * Get event display text for mini view
     */
    getEventDisplayTextMini(event: CalendarEvent<T>): string {
        const text = this.getEventDisplayText(event);
        if (this.compactMode() && text.length > 20) {
            return text.substring(0, 17) + '...';
        }
        return text;
    }

    /**
     * Get CSS classes for mini event
     */
    getMiniEventClasses(event: CalendarEvent<T>): string[] {
        const classes = ['amw-calendar-mini__event'];

        if (event.allDay) {
            classes.push('amw-calendar-mini__event--all-day');
        }

        if (this.compactMode()) {
            classes.push('amw-calendar-mini__event--compact');
        }

        return classes;
    }

    /**
     * Get CSS classes for mini day
     */
    getMiniDayClasses(date: Date): string[] {
        const classes = ['amw-calendar-mini__day'];

        if (this.isToday(date)) {
            classes.push('amw-calendar-mini__day--today');
        }

        if (this.isWeekend(date)) {
            classes.push('amw-calendar-mini__day--weekend');
        }

        if (this.showWeekViewInternal && this.isInCurrentWeek(date)) {
            classes.push('amw-calendar-mini__day--current-week');
        }

        if (this.compactMode()) {
            classes.push('amw-calendar-mini__day--compact');
        }

        return classes;
    }

    /**
     * Handle day click
     */
    onDayClick(date: Date): void {
        if (!this.showWeekViewInternal) {
            this.navigateToDate(date);
        }
    }

    /**
     * Handle day double click
     */
    onDayDoubleClick(date: Date): void {
        this.onAddButtonClickForItem();
    }

    /**
     * Handle event click in mini view
     */
    onMiniEventClick(event: CalendarEvent<T>): void {
        this.onEventClick(event);
    }

    /**
     * Handle event double click in mini view
     */
    onMiniEventDoubleClick(event: CalendarEvent<T>): void {
        this.onEventDoubleClick(event);
    }

    /**
     * Get time display for mini event
     */
    getMiniEventTime(event: CalendarEvent<T>): string {
        if (event.allDay) {
            return 'All day';
        }

        if (this.compactMode()) {
            return this.getFormattedTime(event.start);
        }

        const startTime = this.getFormattedTime(event.start);
        const endTime = event.end ? this.getFormattedTime(event.end) : '';

        return endTime ? `${startTime} - ${endTime}` : startTime;
    }
}
