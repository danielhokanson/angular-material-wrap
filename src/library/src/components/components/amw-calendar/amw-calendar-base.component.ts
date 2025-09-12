import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy, ChangeDetectorRef, SimpleChanges, ViewEncapsulation, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CalendarEvent, CalendarEventChangeEvent, CalendarConfig, CalendarView, CalendarNavigationEvent } from './interfaces';
import { CalendarItem, CalendarItemChangeEvent, CalendarItemEditorContext, CalendarItemTimePattern } from './interfaces/calendar-item.interface';
import { CalendarItemConfig } from './interfaces/calendar-item-config.interface';
import { CalendarItemRegistryService } from './services/calendar-item-registry.service';
import { CalendarItemPopoverService } from './services/calendar-item-popover.service';
import { AmwCalendarItemDialogComponent, CalendarItemDialogData } from './amw-calendar-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Base calendar component with shared logic
 * This component contains the common TypeScript logic for both calendar variants
 */
@Component({
    selector: 'amw-calendar-base',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: '<div>Base calendar component - not meant to be used directly</div>',
    encapsulation: ViewEncapsulation.None
})
export abstract class AmwCalendarBaseComponent<T = any> implements OnInit, OnChanges, OnDestroy {
    // Input properties
    @Input() events: CalendarEvent<T>[] = [];
    @Input() config: CalendarConfig<T> | null = null;
    @Input() currentDate: Date = new Date();
    @Input() view: CalendarView = 'month';
    @Input() loading: boolean = false;
    @Input() disabled: boolean = false;

    // New item system properties
    @Input() items: CalendarItem<T>[] = [];
    @Input() itemConfig: CalendarItemConfig<T> | null = null;
    @Input() useNewItemSystem: boolean = false;

    // Output events (legacy)
    @Output() eventChange = new EventEmitter<CalendarEventChangeEvent<T>>();
    @Output() eventClick = new EventEmitter<CalendarEvent<T>>();
    @Output() eventDoubleClick = new EventEmitter<CalendarEvent<T>>();
    @Output() eventEdit = new EventEmitter<CalendarEvent<T>>();
    @Output() eventDelete = new EventEmitter<CalendarEvent<T>>();
    @Output() eventMove = new EventEmitter<{ event: CalendarEvent<T>; newStart: Date; newEnd?: Date }>();
    @Output() navigationChange = new EventEmitter<CalendarNavigationEvent>();
    @Output() viewChange = new EventEmitter<CalendarView>();
    @Output() dateChange = new EventEmitter<Date>();

    // New item system output events
    @Output() itemChange = new EventEmitter<CalendarItemChangeEvent<T>>();
    @Output() itemClick = new EventEmitter<CalendarItem<T>>();
    @Output() itemDoubleClick = new EventEmitter<CalendarItem<T>>();
    @Output() itemCreate = new EventEmitter<{ date: Date; time?: Date }>();
    @Output() itemEdit = new EventEmitter<CalendarItem<T>>();
    @Output() itemDelete = new EventEmitter<CalendarItem<T>>();
    @Output() itemMove = new EventEmitter<{ item: CalendarItem<T>; newStart: Date; newEnd?: Date }>();

    // Internal properties
    protected internalEvents: CalendarEvent<T>[] = [];
    protected internalConfig: CalendarConfig<T>;
    protected internalItems: CalendarItem<T>[] = [];
    protected internalItemConfig: CalendarItemConfig<T>;
    protected destroy$ = new Subject<void>();

    // View properties
    currentView: CalendarView = 'month';
    selectedDate: Date = new Date();
    isDragging = false;
    dragStartEvent: CalendarEvent<T> | null = null;
    dragStartPosition: { x: number; y: number } | null = null;

    // Editor state
    private editorRef: ComponentRef<any> | null = null;


    constructor(
        protected cdr: ChangeDetectorRef,
        protected itemRegistry: CalendarItemRegistryService,
        protected popoverService: CalendarItemPopoverService,
        protected dialog: MatDialog
    ) {
        this.internalConfig = this.getDefaultConfig();
        this.internalItemConfig = this.getDefaultItemConfig();
    }

    ngOnInit(): void {
        this.initializeComponent();
        if (this.useNewItemSystem) {
            this.initializeItemComponent();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['events']) {
            this.internalEvents = [...(this.events || [])];
        }
        if (changes['config'] && this.config) {
            this.applyConfig();
        }
        if (changes['items']) {
            this.internalItems = [...(this.items || [])];
        }
        if (changes['itemConfig'] && this.itemConfig) {
            this.applyItemConfig();
        }
        if (changes['useNewItemSystem']) {
            if (this.useNewItemSystem) {
                this.initializeItemComponent();
            }
        }
        if (changes['currentDate']) {
            this.selectedDate = new Date(this.currentDate);
        }
        if (changes['view']) {
            this.currentView = this.view;
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Initialize component with default values
     */
    protected initializeComponent(): void {
        this.internalEvents = [...(this.events || [])];
        this.selectedDate = new Date(this.currentDate);
        this.currentView = this.view;
        this.applyConfig();
    }

    /**
     * Apply configuration to component properties
     */
    protected applyConfig(): void {
        if (!this.config) return;

        this.internalConfig = {
            ...this.getDefaultConfig(),
            ...this.config
        };
    }

    /**
     * Get default configuration
     */
    protected getDefaultConfig(): CalendarConfig<T> {
        return {
            displayProperty: 'title' as keyof T,
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
            allowCreate: true
        };
    }

    /**
     * Get events for a specific date
     */
    getEventsForDate(date: Date): CalendarEvent<T>[] {
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);

        const events = this.internalEvents.filter(event => {
            const eventDate = new Date(event.start);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate.getTime() === targetDate.getTime();
        });

        // If using new item system, also include items
        if (this.useNewItemSystem) {
            const items = this.getItemsForDate(date);
            // Convert items to events for display compatibility
            const itemEvents = items.map(item => this.convertItemToEvent(item));
            events.push(...itemEvents);
        }

        return events;
    }

    /**
     * Get events for a specific time range
     */
    getEventsForTimeRange(start: Date, end: Date): CalendarEvent<T>[] {
        const events = this.internalEvents.filter(event => {
            const eventStart = new Date(event.start);
            const eventEnd = event.end ? new Date(event.end) : eventStart;

            return (eventStart >= start && eventStart < end) ||
                (eventEnd > start && eventEnd <= end) ||
                (eventStart <= start && eventEnd >= end);
        });

        // If using new item system, also include items
        if (this.useNewItemSystem) {
            const items = this.getItemsForDateRange(start, end);
            // Convert items to events for display compatibility
            const itemEvents = items.map(item => this.convertItemToEvent(item));
            events.push(...itemEvents);
        }

        return events;
    }

    /**
     * Get display text for an event
     */
    getEventDisplayText(event: CalendarEvent<T>): string {
        if (event.title) {
            return event.title;
        }

        if (this.internalConfig.displayProperty && event.data) {
            const value = event.data[this.internalConfig.displayProperty];
            return value ? String(value) : 'Untitled';
        }

        return 'Untitled';
    }

    /**
     * Get event color
     */
    getEventColor(event: CalendarEvent<T>): string {
        if (event.color) {
            return event.color;
        }

        if (this.internalConfig.eventColor) {
            return this.internalConfig.eventColor(event);
        }

        return '#6750a4'; // Default Material Design primary color
    }

    /**
     * Check if event is editable
     */
    isEventEditable(event: CalendarEvent<T>): boolean {
        return event.editable !== false && this.internalConfig.editable !== false;
    }

    /**
     * Check if event is deletable
     */
    isEventDeletable(event: CalendarEvent<T>): boolean {
        return event.deletable !== false && this.internalConfig.deletable !== false;
    }

    /**
     * Check if event is draggable
     */
    isEventDraggable(event: CalendarEvent<T>): boolean {
        return event.draggable !== false && this.internalConfig.draggable !== false;
    }


    /**
     * Edit an event
     */
    editEvent(event: CalendarEvent<T>): void {
        if (!this.isEventEditable(event)) return;

        this.eventEdit.emit(event);
    }

    /**
     * Delete an event
     */
    deleteEvent(event: CalendarEvent<T>): void {
        if (!this.isEventDeletable(event)) return;

        this.eventDelete.emit(event);
    }

    /**
     * Move an event
     */
    moveEvent(event: CalendarEvent<T>, newStart: Date, newEnd?: Date): void {
        if (!this.isEventDraggable(event)) return;

        this.eventMove.emit({ event, newStart, newEnd });
    }

    /**
     * Handle event click
     */
    onEventClick(event: CalendarEvent<T>, clickEvent?: Event): void {
        console.log('onEventClick called with event:', event);
        console.log('Event editable:', event.editable);

        if (clickEvent) {
            clickEvent.stopPropagation();
        }

        // Open popover editor in edit mode
        this.openEventEditor(event, clickEvent?.target as HTMLElement);

        this.eventClick.emit(event);
    }





    /**
     * Open event editor in edit mode
     */
    private openEventEditor(event: CalendarEvent<T>, triggerElement?: HTMLElement): void {
        console.log('openEventEditor called with event:', event);
        console.log('this.disabled:', this.disabled);
        console.log('event.editable:', event.editable);

        if (this.disabled || !event.editable) {
            console.log('openEventEditor returning early - disabled or not editable');
            return;
        }

        // Convert CalendarEvent to CalendarItem for editing
        const item: CalendarItem<T> = {
            id: event.id,
            title: event.title || '',
            description: event.description || '',
            start: event.start,
            end: event.end,
            allDay: event.allDay || false,
            color: event.color,
            timePattern: event.allDay ? 'date' : 'datetime',
            editable: event.editable,
            deletable: event.deletable,
            draggable: event.draggable,
            data: event.data
        };

        // Get item type from event data
        const itemType = (event.data as any)?.itemType || 'Event';

        console.log('openEventEditor calling openItemEditor with:', {
            itemType,
            startDate: event.start,
            triggerElement,
            existingItem: item
        });

        // Open the popover editor with the existing item
        this.openItemEditor(
            itemType,
            event.start,
            undefined,
            triggerElement,
            item
        );
    }

    /**
     * Add new event
     */
    private addEvent(event: CalendarEvent<T>): void {
        this.eventChange.emit({
            type: 'add',
            event: event
        });
    }

    /**
     * Update event
     */
    private updateEvent(event: CalendarEvent<T>): void {
        this.eventChange.emit({
            type: 'update',
            event: event
        });
    }


    /**
     * Handle event double click
     */
    onEventDoubleClick(event: CalendarEvent<T>): void {
        this.eventDoubleClick.emit(event);
    }

    /**
     * Mark event as complete
     */
    markEventComplete(event: CalendarEvent<T>): void {
        if (event.data && typeof event.data === 'object') {
            (event.data as any).completed = true;
            this.eventChange.emit({
                type: 'update',
                event: event
            });
        }
    }

    /**
     * Mark event as incomplete
     */
    markEventIncomplete(event: CalendarEvent<T>): void {
        if (event.data && typeof event.data === 'object') {
            (event.data as any).completed = false;
            this.eventChange.emit({
                type: 'update',
                event: event
            });
        }
    }

    /**
     * Handle event details button click
     */
    onEventDetails(event: CalendarEvent<T>): void {
        this.eventDoubleClick.emit(event);
    }

    /**
     * Navigate to previous period
     */
    navigatePrevious(): void {
        const previousDate = new Date(this.selectedDate);

        switch (this.currentView) {
            case 'month':
                previousDate.setMonth(previousDate.getMonth() - 1);
                break;
            case 'week':
                previousDate.setDate(previousDate.getDate() - 7);
                break;
            case 'day':
                previousDate.setDate(previousDate.getDate() - 1);
                break;
        }

        this.navigateToDate(previousDate);
    }

    /**
     * Navigate to next period
     */
    navigateNext(): void {
        const nextDate = new Date(this.selectedDate);

        switch (this.currentView) {
            case 'month':
                nextDate.setMonth(nextDate.getMonth() + 1);
                break;
            case 'week':
                nextDate.setDate(nextDate.getDate() + 7);
                break;
            case 'day':
                nextDate.setDate(nextDate.getDate() + 1);
                break;
        }

        this.navigateToDate(nextDate);
    }

    /**
     * Navigate to today
     */
    navigateToday(): void {
        this.navigateToDate(new Date());
    }

    /**
     * Navigate to specific date
     */
    navigateToDate(date: Date): void {
        const previousDate = new Date(this.selectedDate);
        this.selectedDate = new Date(date);

        this.navigationChange.emit({
            view: this.currentView,
            date: this.selectedDate,
            previousDate
        });

        this.dateChange.emit(this.selectedDate);
    }

    /**
     * Change view
     */
    changeView(view: CalendarView): void {
        this.currentView = view;
        this.viewChange.emit(view);
    }

    /**
     * Get formatted date string for display
     */
    getFormattedDate(date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string {
        if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
            return '';
        }

        return date.toLocaleDateString('en-US', {
            weekday: format === 'short' ? 'short' : 'long',
            year: 'numeric',
            month: format === 'short' ? 'short' : 'long',
            day: 'numeric'
        });
    }

    /**
     * Get formatted time string for display
     */
    getFormattedTime(date: Date): string {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    /**
     * Check if two dates are the same day
     */
    isSameDay(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }

    /**
     * Check if date is today
     */
    isToday(date: Date): boolean {
        return this.isSameDay(date, new Date());
    }

    /**
     * Check if date is in current month
     */
    isCurrentMonth(date: Date): boolean {
        return date.getMonth() === this.selectedDate.getMonth() &&
            date.getFullYear() === this.selectedDate.getFullYear();
    }

    /**
     * Get CSS classes for an event
     */
    getEventClasses(event: CalendarEvent<T>): string[] {
        const classes = ['amw-calendar__event'];

        if (event.cssClass) {
            if (Array.isArray(event.cssClass)) {
                classes.push(...event.cssClass);
            } else {
                classes.push(event.cssClass);
            }
        }

        if (event.allDay) {
            classes.push('amw-calendar__event--all-day');
        }

        if (this.isEventEditable(event)) {
            classes.push('amw-calendar__event--editable');
        }

        if (this.isEventDraggable(event)) {
            classes.push('amw-calendar__event--draggable');
        }

        return classes;
    }

    // ==========================================================================
    // NEW ITEM SYSTEM METHODS
    // ==========================================================================

    /**
     * Get default item configuration
     */
    protected getDefaultItemConfig(): CalendarItemConfig<T> {
        return {
            displayProperty: 'title' as keyof T,
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
            allowedTimePatterns: ['date', 'date-range', 'datetime', 'datetime-range'],
            defaultTimePattern: 'datetime'
        };
    }

    /**
     * Initialize component with new item system
     */
    protected initializeItemComponent(): void {
        this.internalItems = [...(this.items || [])];
        this.selectedDate = new Date(this.currentDate);
        this.currentView = this.view;
        this.applyItemConfig();
    }

    /**
     * Apply item configuration
     */
    protected applyItemConfig(): void {
        if (!this.itemConfig) return;

        this.internalItemConfig = {
            ...this.getDefaultItemConfig(),
            ...this.itemConfig
        };
    }

    /**
     * Handle cell click for item creation
     */
    onCellClickForItem(date: Date, time?: Date, triggerElement?: HTMLElement): void {
        console.log('onCellClickForItem called:', { date, time, triggerElement, useNewItemSystem: this.useNewItemSystem });

        if (this.disabled || !this.internalItemConfig.allowCreate) {
            console.log('Item creation disabled or not allowed');
            return;
        }

        const availableTypes = this.itemRegistry.getRegisteredTypes();
        console.log('Available types:', availableTypes);

        if (availableTypes.length === 0) {
            console.warn('No calendar item types registered');
            return;
        }

        // If only one type, use it directly
        if (availableTypes.length === 1) {
            console.log('Using single type:', availableTypes[0].type);
            this.openItemEditor(availableTypes[0].type, date, time, triggerElement);
        } else {
            // Show type selection (for now, just use the first type)
            // TODO: Implement type selection UI
            console.log('Using first type from multiple:', availableTypes[0].type);
            this.openItemEditor(availableTypes[0].type, date, time, triggerElement);
        }
    }

    /**
     * Handle add button click for item creation
     */
    onAddButtonClickForItem(triggerElement?: HTMLElement): void {
        if (this.disabled || !this.internalItemConfig.allowCreate) return;

        const availableTypes = this.itemRegistry.getRegisteredTypes();
        if (availableTypes.length === 0) {
            console.warn('No calendar item types registered');
            return;
        }

        // If only one type, use it directly
        if (availableTypes.length === 1) {
            this.openItemEditor(availableTypes[0].type, this.selectedDate, undefined, triggerElement);
        } else {
            // Show type selection (for now, just use the first type)
            // TODO: Implement type selection UI
            this.openItemEditor(availableTypes[0].type, this.selectedDate, undefined, triggerElement);
        }
    }

    /**
     * Open item editor popover
     */
    private openItemEditor(
        itemType: string,
        date: Date,
        time?: Date,
        triggerElement?: HTMLElement,
        existingItem?: CalendarItem<T>
    ): void {
        console.log('openItemEditor called:', { itemType, date, time, triggerElement, existingItem });

        const itemTypeDef = this.itemRegistry.getItemType(itemType);
        if (!itemTypeDef) {
            console.warn(`Item type '${itemType}' not found`);
            return;
        }

        const context: CalendarItemEditorContext<T> = {
            itemType,
            timePattern: existingItem?.timePattern || itemTypeDef.defaultTimePattern,
            startDate: date,
            endDate: time ? new Date(time) : undefined,
            isEditing: !!existingItem,
            item: existingItem,
            triggerElement,
            position: 'bottom'
        };

        console.log('Creating editor with context:', context);

        this.editorRef = this.popoverService.openEditor(context, triggerElement, 'bottom');

        if (this.editorRef) {
            console.log('Editor created successfully');
            this.editorRef.instance.save.subscribe((item: CalendarItem<T>) => {
                if (existingItem) {
                    this.onItemUpdate(item);
                } else {
                    this.onItemSave(item);
                }
            });

            this.editorRef.instance.cancel.subscribe(() => {
                this.onItemEditorCancel();
            });
        } else {
            console.error('Failed to create editor');
        }
    }

    /**
     * Handle item save
     */
    private onItemSave(item: CalendarItem<T>): void {
        this.internalItems.push(item);
        this.itemChange.emit({
            type: 'create',
            item
        });
        this.popoverService.closeEditor();
        this.editorRef = null;
        this.cdr.detectChanges();
    }

    /**
     * Handle item update
     */
    private onItemUpdate(item: CalendarItem<T>): void {
        const index = this.internalItems.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.internalItems[index] = item;
            this.itemChange.emit({
                type: 'update',
                item
            });
            this.popoverService.closeEditor();
            this.editorRef = null;
            this.cdr.detectChanges();
        }
    }

    /**
     * Handle item editor cancel
     */
    private onItemEditorCancel(): void {
        this.popoverService.closeEditor();
        this.editorRef = null;
    }



    /**
     * Get items for a specific date
     */
    getItemsForDate(date: Date): CalendarItem<T>[] {
        return this.internalItems.filter(item => {
            const itemDate = new Date(item.start);
            return this.isSameDay(itemDate, date);
        });
    }

    /**
     * Get items for a specific date range
     */
    getItemsForDateRange(startDate: Date, endDate: Date): CalendarItem<T>[] {
        return this.internalItems.filter(item => {
            const itemStart = new Date(item.start);
            const itemEnd = item.end ? new Date(item.end) : itemStart;

            return (itemStart >= startDate && itemStart <= endDate) ||
                (itemEnd >= startDate && itemEnd <= endDate) ||
                (itemStart <= startDate && itemEnd >= endDate);
        });
    }

    /**
     * Convert calendar item to event for display compatibility
     */
    private convertItemToEvent(item: CalendarItem<T>): CalendarEvent<T> {
        return {
            id: item.id,
            title: item.title,
            description: item.description,
            start: item.start,
            end: item.end,
            allDay: item.allDay,
            color: item.color,
            data: item.data
        };
    }

    /**
     * Check if item is editable
     */
    isItemEditable(item: CalendarItem<T>): boolean {
        return !!(this.internalItemConfig.editable && (item as any).editable !== false);
    }

    /**
     * Check if item is deletable
     */
    isItemDeletable(item: CalendarItem<T>): boolean {
        return !!(this.internalItemConfig.deletable && (item as any).deletable !== false);
    }

    /**
     * Check if item is draggable
     */
    isItemDraggable(item: CalendarItem<T>): boolean {
        return !!(this.internalItemConfig.draggable && (item as any).draggable !== false);
    }
}
