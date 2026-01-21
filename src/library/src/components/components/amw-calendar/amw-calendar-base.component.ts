import { Component, input, output, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation, ComponentRef, contentChild, TemplateRef, effect } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventChangeEvent, CalendarConfig, CalendarView, CalendarNavigationEvent } from './interfaces';
import { CalendarItem, CalendarItemChangeEvent, CalendarItemEditorContext, CalendarItemTimePattern, CalendarItemTemplateContext } from './interfaces/calendar-item.interface';
import { CalendarItemConfig } from './interfaces/calendar-item-config.interface';
import { AmwCalendarItemRegistryService } from './services/amw-calendar-item-registry.service';
import { AmwCalendarItemPopoverService } from './services/amw-calendar-item-popover.service';
import { AmwCalendarItemDialogComponent, CalendarItemDialogData } from './amw-calendar-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Base calendar component with shared logic
 * This component contains the common TypeScript logic for both calendar variants
 */
@Component({
    selector: 'amw-calendar-base',
    standalone: true,
    imports: [FormsModule],
    template: '<div>Base calendar component - not meant to be used directly</div>',
    encapsulation: ViewEncapsulation.None,
    host: { 'data-amw-id': 'amw-calendar-base' }
})
export abstract class AmwCalendarBaseComponent<T = any> implements OnInit, OnDestroy {
    // Input properties
    events = input<CalendarEvent<T>[]>([]);
    config = input<CalendarConfig<T> | null>(null);
    currentDate = input<Date>(new Date());
    view = input<CalendarView>('month');
    loading = input<boolean>(false);
    disabled = input<boolean>(false);

    // New item system properties
    items = input<CalendarItem<T>[]>([]);
    itemConfig = input<CalendarItemConfig<T> | null>(null);
    useNewItemSystem = input<boolean>(false);

    // Output events (legacy)
    eventChange = output<CalendarEventChangeEvent<T>>();
    eventClick = output<CalendarEvent<T>>();
    eventDoubleClick = output<CalendarEvent<T>>();
    eventEdit = output<CalendarEvent<T>>();
    eventDelete = output<CalendarEvent<T>>();
    eventMove = output<{ event: CalendarEvent<T>; newStart: Date; newEnd?: Date; allDay?: boolean }>();
    navigationChange = output<CalendarNavigationEvent>();
    viewChange = output<CalendarView>();
    dateChange = output<Date>();

    // New item system output events
    itemChange = output<CalendarItemChangeEvent<T>>();
    itemClick = output<CalendarItem<T>>();
    itemDoubleClick = output<CalendarItem<T>>();
    itemCreate = output<{ date: Date; time?: Date }>();
    itemEdit = output<CalendarItem<T>>();
    itemDelete = output<CalendarItem<T>>();
    itemMove = output<{ item: CalendarItem<T>; newStart: Date; newEnd?: Date }>();

    // Custom field templates
    customFieldsTemplate = contentChild<TemplateRef<CalendarItemTemplateContext<T>>>('customFieldsTemplate');
    customReadonlyFieldsTemplate = contentChild<TemplateRef<CalendarItemTemplateContext<T>>>('customReadonlyFieldsTemplate');
    validateCustomFields = input<((data: T) => boolean | Promise<boolean>) | undefined>(undefined);

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
        protected itemRegistry: AmwCalendarItemRegistryService,
        protected popoverService: AmwCalendarItemPopoverService,
        protected dialog: MatDialog
    ) {
        this.internalConfig = this.getDefaultConfig();
        this.internalItemConfig = this.getDefaultItemConfig();

        // Effect to handle input signal changes
        effect(() => {
            // Apply config first so it's available for event processing
            const configValue = this.config();
            if (configValue) {
                this.applyConfig();
            }

            // Process events
            const eventsValue = this.events();
            this.internalEvents = this.processEvents(eventsValue || []);

            // Process items
            const itemsValue = this.items();
            this.internalItems = [...(itemsValue || [])];

            // Apply item config
            const itemConfigValue = this.itemConfig();
            if (itemConfigValue) {
                this.applyItemConfig();
            }

            // Handle new item system
            const useNewItemSystemValue = this.useNewItemSystem();
            if (useNewItemSystemValue) {
                this.initializeItemComponent();
            }

            // Update selected date
            const currentDateValue = this.currentDate();
            this.selectedDate = new Date(currentDateValue);

            // Update current view
            const viewValue = this.view();
            this.currentView = viewValue;

            // Manually trigger change detection
            setTimeout(() => this.cdr.detectChanges(), 0);
        });
    }

    ngOnInit(): void {
        this.initializeComponent();
        if (this.useNewItemSystem()) {
            this.initializeItemComponent();
        }
    }

    /**
     * Process events and compute derived properties to avoid change detection issues
     */
    private processEvents(events: CalendarEvent<T>[]): CalendarEvent<T>[] {
        return events.map(event => {
            // Create a copy and add computed color to avoid change detection issues
            const processedEvent = { ...event };

            // Pre-compute the color
            if (!processedEvent.color) {
                if (this.internalConfig.eventColor) {
                    processedEvent.color = this.internalConfig.eventColor(event);
                } else {
                    processedEvent.color = '#6750a4'; // Default color
                }
            }

            return processedEvent;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Initialize component with default values
     */
    protected initializeComponent(): void {
        this.internalEvents = [...(this.events() || [])];
        this.selectedDate = new Date(this.currentDate());
        this.currentView = this.view();
        this.applyConfig();
    }

    /**
     * Apply configuration to component properties
     */
    protected applyConfig(): void {
        const configValue = this.config();
        if (!configValue) return;

        this.internalConfig = {
            ...this.getDefaultConfig(),
            ...configValue
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
     * Track events by ID for ngFor performance
     */
    trackByEventId(index: number, event: CalendarEvent<T>): string {
        return event.id || `event-${index}`;
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
        if (this.useNewItemSystem()) {
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
        if (this.useNewItemSystem()) {
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
     * Get event color (pre-computed during event processing)
     */
    getEventColor(event: CalendarEvent<T>): string {
        // Color is pre-computed in processEvents() to avoid change detection issues
        return event.color || '#6750a4';
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
    moveEvent(event: CalendarEvent<T>, newStart: Date, newEnd?: Date, allDay?: boolean): void {
        if (!this.isEventDraggable(event)) return;

        this.eventMove.emit({ event, newStart, newEnd, allDay });
    }

    /**
     * Handle event click
     */
    onEventClick(event: CalendarEvent<T>, clickEvent?: Event): void {
        console.log('[Calendar] Event clicked:', event.title, event.id);

        if (clickEvent) {
            clickEvent.stopPropagation();
        }

        // Get the actual event container element for positioning
        const eventElement = clickEvent?.currentTarget as HTMLElement;

        // Open popover editor in read-only mode
        this.openEventEditor(event, eventElement);

        this.eventClick.emit(event);
    }





    /**
     * Open event editor in edit mode
     */
    private openEventEditor(event: CalendarEvent<T>, triggerElement?: HTMLElement): void {
        if (this.disabled() || !event.editable) {
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

        // Get item type from event data and normalize case
        const rawItemType = (event.data as any)?.itemType || 'Event';
        const itemType = rawItemType.toLowerCase();


        // Open the popover editor in read-only mode
        this.openItemEditorReadOnly(
            itemType,
            event.start,
            triggerElement,
            item
        );
    }

    /**
     * Open item editor in read-only mode
     */
    private openItemEditorReadOnly(
        itemType: string,
        date: Date,
        triggerElement?: HTMLElement,
        existingItem?: CalendarItem<T>
    ): void {
        console.log('[Calendar] Opening readonly editor for:', existingItem?.title, existingItem?.id);

        const itemTypeDef = this.itemRegistry.getItemType(itemType);
        if (!itemTypeDef) {
            console.warn(`Item type '${itemType}' not found`);
            return;
        }

        // Calculate position based on viewport midpoint
        // Top 50% = bottom, Bottom 50% = top
        // Left 50% = right, Right 50% = left
        let preferredPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

        if (triggerElement) {
            const rect = triggerElement.getBoundingClientRect();
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            // Calculate element center point
            const elementCenterY = rect.top + (rect.height / 2);
            const elementCenterX = rect.left + (rect.width / 2);

            // Calculate viewport midpoints
            const viewportMidY = viewportHeight / 2;
            const viewportMidX = viewportWidth / 2;

            // Determine vertical position (top 50% = show below, bottom 50% = show above)
            const isInTopHalf = elementCenterY < viewportMidY;

            // Determine horizontal position (left 50% = show right, right 50% = show left)
            const isInLeftHalf = elementCenterX < viewportMidX;

            // Combine vertical and horizontal positioning
            // Prefer vertical positioning, use horizontal only if there's more horizontal space
            const verticalSpace = isInTopHalf ?
                (viewportHeight - rect.bottom) : rect.top;
            const horizontalSpace = isInLeftHalf ?
                (viewportWidth - rect.right) : rect.left;

            if (horizontalSpace > verticalSpace * 1.5) {
                // Use horizontal positioning
                preferredPosition = isInLeftHalf ? 'right' : 'left';
            } else {
                // Use vertical positioning
                preferredPosition = isInTopHalf ? 'bottom' : 'top';
            }
        }

        const context: CalendarItemEditorContext<T> = {
            itemType,
            timePattern: existingItem?.timePattern || itemTypeDef.defaultTimePattern,
            startDate: date,
            endDate: undefined,
            isEditing: false, // Read-only mode
            item: existingItem,
            triggerElement,
            position: preferredPosition,
            customFieldsTemplate: this.customFieldsTemplate(),
            customReadonlyFieldsTemplate: this.customReadonlyFieldsTemplate(),
            validateCustomFields: this.validateCustomFields()
        };


        this.editorRef = this.popoverService.openEditor(context, triggerElement, preferredPosition);
        if (this.editorRef) {
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
            this.editorRef.instance.delete.subscribe((item: CalendarItem<T>) => {
                this.onItemDelete(item);
            });
        }
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
        this.internalItems = [...(this.items() || [])];
        this.selectedDate = new Date(this.currentDate());
        this.currentView = this.view();
        this.applyItemConfig();
    }

    /**
     * Apply item configuration
     */
    protected applyItemConfig(): void {
        const itemConfigValue = this.itemConfig();
        if (!itemConfigValue) return;

        this.internalItemConfig = {
            ...this.getDefaultItemConfig(),
            ...itemConfigValue
        };
    }

    /**
     * Handle cell click for item creation
     */
    onCellClickForItem(date: Date, time?: Date, triggerElement?: HTMLElement): void {
        if (this.disabled() || !this.internalItemConfig.allowCreate) {
            return;
        }

        const availableTypes = this.itemRegistry.getRegisteredTypes();
        if (availableTypes.length === 0) {
            console.warn('No calendar item types registered');
            return;
        }

        // If only one type, use it directly
        if (availableTypes.length === 1) {
            this.openItemEditor(availableTypes[0].type, date, time, triggerElement);
        } else {
            // Show type selection (for now, just use the first type)
            // TODO: Implement type selection UI
            this.openItemEditor(availableTypes[0].type, date, time, triggerElement);
        }
    }

    /**
     * Handle add button click for item creation
     */
    onAddButtonClickForItem(triggerElement?: HTMLElement): void {
        if (this.disabled() || !this.internalItemConfig.allowCreate) return;

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

        const itemTypeDef = this.itemRegistry.getItemType(itemType);
        if (!itemTypeDef) {
            console.warn(`Item type '${itemType}' not found`);
            return;
        }

        // Calculate position based on viewport midpoint
        // Top 50% = bottom, Bottom 50% = top
        // Left 50% = right, Right 50% = left
        let preferredPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

        if (triggerElement) {
            const rect = triggerElement.getBoundingClientRect();
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            // Calculate element center point
            const elementCenterY = rect.top + (rect.height / 2);
            const elementCenterX = rect.left + (rect.width / 2);

            // Calculate viewport midpoints
            const viewportMidY = viewportHeight / 2;
            const viewportMidX = viewportWidth / 2;

            // Determine vertical position (top 50% = show below, bottom 50% = show above)
            const isInTopHalf = elementCenterY < viewportMidY;

            // Determine horizontal position (left 50% = show right, right 50% = show left)
            const isInLeftHalf = elementCenterX < viewportMidX;

            // Combine vertical and horizontal positioning
            // Prefer vertical positioning, use horizontal only if there's more horizontal space
            const verticalSpace = isInTopHalf ?
                (viewportHeight - rect.bottom) : rect.top;
            const horizontalSpace = isInLeftHalf ?
                (viewportWidth - rect.right) : rect.left;

            if (horizontalSpace > verticalSpace * 1.5) {
                // Use horizontal positioning
                preferredPosition = isInLeftHalf ? 'right' : 'left';
            } else {
                // Use vertical positioning
                preferredPosition = isInTopHalf ? 'bottom' : 'top';
            }
        }

        const context: CalendarItemEditorContext<T> = {
            itemType,
            timePattern: existingItem?.timePattern || itemTypeDef.defaultTimePattern,
            startDate: date,
            endDate: time ? new Date(time) : undefined,
            isEditing: true, // Always start in editing mode (create or edit)
            item: existingItem,
            triggerElement,
            position: preferredPosition,
            customFieldsTemplate: this.customFieldsTemplate(),
            customReadonlyFieldsTemplate: this.customReadonlyFieldsTemplate(),
            validateCustomFields: this.validateCustomFields()
        };

        this.editorRef = this.popoverService.openEditor(context, triggerElement, preferredPosition);

        if (this.editorRef) {
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

            this.editorRef.instance.delete.subscribe((item: CalendarItem<T>) => {
                this.onItemDelete(item);
            });
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

        // Also emit eventChange for calendar display
        const event = this.convertItemToEvent(item);
        this.eventChange.emit({
            type: 'add',
            event
        });

        this.popoverService.closeEditor();
        this.editorRef = null;
        this.cdr.detectChanges();
    }

    /**
     * Handle item update
     */
    private onItemUpdate(item: CalendarItem<T>): void {
        console.log('[Calendar] Updating item:', item.title, item.id);
        console.log('[Calendar] internalItems before update:', this.internalItems.map(i => ({ id: i.id, title: i.title })));

        const index = this.internalItems.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.internalItems[index] = item;
            console.log('[Calendar] internalItems after update:', this.internalItems.map(i => ({ id: i.id, title: i.title })));

            this.itemChange.emit({
                type: 'update',
                item
            });

            // Also emit eventChange for calendar display
            const event = this.convertItemToEvent(item);
            this.eventChange.emit({
                type: 'update',
                event
            });

            this.popoverService.closeEditor();
            this.editorRef = null;
            this.cdr.detectChanges();
        }
    }

    /**
     * Handle item delete
     */
    private onItemDelete(item: CalendarItem<T>): void {
        const index = this.internalItems.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.internalItems.splice(index, 1);
            this.itemChange.emit({
                type: 'delete',
                item
            });

            // Also emit eventChange for calendar display
            const event = this.convertItemToEvent(item);
            this.eventChange.emit({
                type: 'delete',
                event
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
        console.log('[Calendar] Editor canceled');
        console.log('[Calendar] internalItems on cancel:', this.internalItems.map(i => ({ id: i.id, title: i.title })));
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
        // Ensure color is always set to avoid change detection issues
        let eventColor = item.color;
        if (!eventColor) {
            if (this.internalConfig?.eventColor) {
                eventColor = this.internalConfig.eventColor({ ...item, data: item.data } as CalendarEvent<T>);
            } else {
                eventColor = '#6750a4'; // Default color
            }
        }

        return {
            id: item.id,
            title: item.title,
            description: item.description,
            start: item.start,
            end: item.end,
            allDay: item.allDay,
            color: eventColor,
            editable: item.editable,
            deletable: item.deletable,
            draggable: item.draggable,
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
