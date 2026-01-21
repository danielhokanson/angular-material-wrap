import { Injectable } from '@angular/core';
import { CalendarItemType, CalendarItemTypeRegistry, CalendarItem, CalendarItemTimePattern } from '../interfaces/calendar-item.interface';

/**
 * Service for managing calendar item type registrations
 */
@Injectable({
    providedIn: 'root'
})
export class AmwCalendarItemRegistryService {
    private registry: CalendarItemTypeRegistry = {};

    /**
     * Register a new calendar item type
     */
    registerItemType<T>(itemType: CalendarItemType<T>): void {
        this.registry[itemType.type] = itemType;
    }

    /**
     * Unregister a calendar item type
     */
    unregisterItemType(type: string): void {
        delete this.registry[type];
    }

    /**
     * Get all registered item types
     */
    getRegisteredTypes(): CalendarItemType<any>[] {
        return Object.values(this.registry);
    }

    /**
     * Get a specific item type
     */
    getItemType(type: string): CalendarItemType<any> | undefined {
        return this.registry[type];
    }

    /**
     * Check if a type is registered
     */
    isTypeRegistered(type: string): boolean {
        return type in this.registry;
    }

    /**
     * Get the number of registered types
     */
    getTypeCount(): number {
        return Object.keys(this.registry).length;
    }

    /**
     * Create a new item of the specified type
     */
    createItem<T>(type: string, date: Date, timePattern: CalendarItemTimePattern): CalendarItem<T> | null {
        const itemType = this.getItemType(type);
        if (!itemType) {
            console.warn(`Calendar item type '${type}' is not registered`);
            return null;
        }

        if (!itemType.timePatterns.includes(timePattern)) {
            console.warn(`Time pattern '${timePattern}' is not supported for type '${type}'`);
            return null;
        }

        return itemType.createItem(date, timePattern);
    }

    /**
     * Validate an item against its type definition
     */
    validateItem<T>(item: CalendarItem<T>): boolean {
        // For now, just validate that the item has required properties
        return !!(item.id && item.title && item.start);
    }

    /**
     * Get available time patterns for a type
     */
    getTimePatternsForType(type: string): CalendarItemTimePattern[] {
        const itemType = this.getItemType(type);
        return itemType?.timePatterns || [];
    }

    /**
     * Get default time pattern for a type
     */
    getDefaultTimePatternForType(type: string): CalendarItemTimePattern | null {
        const itemType = this.getItemType(type);
        return itemType?.defaultTimePattern || null;
    }
}
