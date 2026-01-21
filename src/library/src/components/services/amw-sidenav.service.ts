import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SidenavConfig } from '../components/amw-sidenav/interfaces/sidenav-config.interface';
import { SidenavItem } from '../components/amw-sidenav/interfaces/sidenav-item.interface';

/**
 * Service for managing sidenav state and navigation
 * 
 * Provides programmatic control over sidenav components, including opening/closing,
 * configuration management, and navigation item handling.
 * 
 * @example
 * ```typescript
 * constructor(private sidenavService: SidenavService) {}
 * 
 * // Open sidenav
 * this.sidenavService.open();
 * 
 * // Close sidenav
 * this.sidenavService.close();
 * 
 * // Toggle sidenav
 * this.sidenavService.toggle();
 * 
 * // Set navigation items
 * this.sidenavService.setItems(navigationItems);
 * ```
 */
@Injectable({
    providedIn: 'root'
})
export class AmwSidenavService {
    /** Subject for sidenav opened state */
    private openedSubject = new BehaviorSubject<boolean>(false);

    /** Subject for sidenav configuration */
    private configSubject = new BehaviorSubject<SidenavConfig>({});

    /** Subject for navigation items */
    private itemsSubject = new BehaviorSubject<SidenavItem[]>([]);

    /** Subject for active item */
    private activeItemSubject = new BehaviorSubject<SidenavItem | null>(null);

    /** Subject for sidenav events */
    private eventsSubject = new Subject<AmwSidenavEvent>();

    /** Current sidenav configuration */
    private currentConfig: SidenavConfig = {};

    /** Current navigation items */
    private currentItems: SidenavItem[] = [];

    /** Current active item */
    private currentActiveItem: SidenavItem | null = null;

    /**
     * Observable for sidenav opened state
     */
    get opened$(): Observable<boolean> {
        return this.openedSubject.asObservable();
    }

    /**
     * Observable for sidenav configuration
     */
    get config$(): Observable<SidenavConfig> {
        return this.configSubject.asObservable();
    }

    /**
     * Observable for navigation items
     */
    get items$(): Observable<SidenavItem[]> {
        return this.itemsSubject.asObservable();
    }

    /**
     * Observable for active item
     */
    get activeItem$(): Observable<SidenavItem | null> {
        return this.activeItemSubject.asObservable();
    }

    /**
     * Observable for sidenav events
     */
    get events$(): Observable<AmwSidenavEvent> {
        return this.eventsSubject.asObservable();
    }

    /**
     * Current sidenav opened state
     */
    get opened(): boolean {
        return this.openedSubject.value;
    }

    /**
     * Current sidenav configuration
     */
    get config(): SidenavConfig {
        return this.currentConfig;
    }

    /**
     * Current navigation items
     */
    get items(): SidenavItem[] {
        return this.currentItems;
    }

    /**
     * Current active item
     */
    get activeItem(): SidenavItem | null {
        return this.currentActiveItem;
    }

    /**
     * Opens the sidenav
     * @param config Optional configuration to apply
     */
    open(config?: Partial<SidenavConfig>): void {
        if (config) {
            this.updateConfig(config);
        }

        this.openedSubject.next(true);
        this.emitEvent('opened');
    }

    /**
     * Closes the sidenav
     */
    close(): void {
        this.openedSubject.next(false);
        this.emitEvent('closed');
    }

    /**
     * Toggles the sidenav open/closed state
     * @param config Optional configuration to apply
     */
    toggle(config?: Partial<SidenavConfig>): void {
        if (this.opened) {
            this.close();
        } else {
            this.open(config);
        }
    }

    /**
     * Sets the sidenav configuration
     * @param config The configuration to set
     */
    setConfig(config: SidenavConfig): void {
        this.currentConfig = { ...config };
        this.configSubject.next(this.currentConfig);
        this.emitEvent('configChanged', { config: this.currentConfig });
    }

    /**
     * Updates the sidenav configuration
     * @param config Partial configuration to update
     */
    updateConfig(config: Partial<SidenavConfig>): void {
        this.currentConfig = { ...this.currentConfig, ...config };
        this.configSubject.next(this.currentConfig);
        this.emitEvent('configChanged', { config: this.currentConfig });
    }

    /**
     * Sets the navigation items
     * @param items The navigation items to set
     */
    setItems(items: SidenavItem[]): void {
        this.currentItems = [...items];
        this.itemsSubject.next(this.currentItems);
        this.emitEvent('itemsChanged', { items: this.currentItems });
    }

    /**
     * Adds a navigation item
     * @param item The item to add
     * @param parentId Optional parent ID for nested items
     */
    addItem(item: SidenavItem, parentId?: string): void {
        if (parentId) {
            this.addNestedItem(item, parentId);
        } else {
            this.currentItems.push(item);
            this.itemsSubject.next(this.currentItems);
            this.emitEvent('itemAdded', { item, parentId });
        }
    }

    /**
     * Removes a navigation item
     * @param itemId The ID of the item to remove
     */
    removeItem(itemId: string): void {
        const item = this.findItemById(itemId);
        if (item) {
            this.currentItems = this.currentItems.filter(i => i.id !== itemId);
            this.itemsSubject.next(this.currentItems);
            this.emitEvent('itemRemoved', { item });
        }
    }

    /**
     * Updates a navigation item
     * @param itemId The ID of the item to update
     * @param updates The updates to apply
     */
    updateItem(itemId: string, updates: Partial<SidenavItem>): void {
        const item = this.findItemById(itemId);
        if (item) {
            Object.assign(item, updates);
            this.itemsSubject.next(this.currentItems);
            this.emitEvent('itemUpdated', { item, updates });
        }
    }

    /**
     * Sets the active navigation item
     * @param itemId The ID of the item to set as active
     */
    setActiveItem(itemId: string): void {
        const item = this.findItemById(itemId);
        if (item) {
            // Clear previous active items
            this.clearActiveItems();

            // Set new active item
            item.active = true;
            this.currentActiveItem = item;
            this.activeItemSubject.next(item);
            this.emitEvent('activeItemChanged', { item });
        }
    }

    /**
     * Clears the active navigation item
     */
    clearActiveItem(): void {
        this.clearActiveItems();
        this.currentActiveItem = null;
        this.activeItemSubject.next(null);
        this.emitEvent('activeItemCleared');
    }

    /**
     * Expands a nested navigation item
     * @param itemId The ID of the item to expand
     */
    expandItem(itemId: string): void {
        const item = this.findItemById(itemId);
        if (item && item.children) {
            item.expanded = true;
            this.itemsSubject.next(this.currentItems);
            this.emitEvent('itemExpanded', { item });
        }
    }

    /**
     * Collapses a nested navigation item
     * @param itemId The ID of the item to collapse
     */
    collapseItem(itemId: string): void {
        const item = this.findItemById(itemId);
        if (item && item.children) {
            item.expanded = false;
            this.itemsSubject.next(this.currentItems);
            this.emitEvent('itemCollapsed', { item });
        }
    }

    /**
     * Toggles a nested navigation item
     * @param itemId The ID of the item to toggle
     */
    toggleItem(itemId: string): void {
        const item = this.findItemById(itemId);
        if (item && item.children) {
            item.expanded = !item.expanded;
            this.itemsSubject.next(this.currentItems);
            this.emitEvent('itemToggled', { item, expanded: item.expanded });
        }
    }

    /**
     * Finds a navigation item by ID
     * @param itemId The ID to search for
     * @returns The found item or null
     */
    findItemById(itemId: string): SidenavItem | null {
        return this.findItemInArray(this.currentItems, itemId);
    }

    /**
     * Gets all navigation items
     * @returns Array of all navigation items
     */
    getAllItems(): SidenavItem[] {
        return this.currentItems;
    }

    /**
     * Gets navigation items by level
     * @param level The level to get items from (0 = root, 1 = first nested level, etc.)
     * @returns Array of items at the specified level
     */
    getItemsByLevel(level: number): SidenavItem[] {
        if (level === 0) {
            return this.currentItems;
        }

        const items: SidenavItem[] = [];
        this.collectItemsByLevel(this.currentItems, level, 0, items);
        return items;
    }

    /**
     * Gets active navigation items
     * @returns Array of active navigation items
     */
    getActiveItems(): SidenavItem[] {
        const activeItems: SidenavItem[] = [];
        this.collectActiveItems(this.currentItems, activeItems);
        return activeItems;
    }

    /**
     * Gets navigation items by parent ID
     * @param parentId The parent ID to search for
     * @returns Array of child items
     */
    getItemsByParentId(parentId: string): SidenavItem[] {
        const parent = this.findItemById(parentId);
        return parent?.children || [];
    }

    /**
     * Gets navigation items by label
     * @param label The label to search for
     * @returns Array of matching items
     */
    getItemsByLabel(label: string): SidenavItem[] {
        const matchingItems: SidenavItem[] = [];
        this.collectItemsByLabel(this.currentItems, label, matchingItems);
        return matchingItems;
    }

    /**
     * Gets navigation items by icon
     * @param icon The icon to search for
     * @returns Array of matching items
     */
    getItemsByIcon(icon: string): SidenavItem[] {
        const matchingItems: SidenavItem[] = [];
        this.collectItemsByIcon(this.currentItems, icon, matchingItems);
        return matchingItems;
    }

    /**
     * Gets navigation items by route
     * @param route The route to search for
     * @returns Array of matching items
     */
    getItemsByRoute(route: string): SidenavItem[] {
        const matchingItems: SidenavItem[] = [];
        this.collectItemsByRoute(this.currentItems, route, matchingItems);
        return matchingItems;
    }

    /**
     * Gets navigation items by disabled state
     * @param disabled Whether to get disabled or enabled items
     * @returns Array of matching items
     */
    getItemsByDisabledState(disabled: boolean): SidenavItem[] {
        const matchingItems: SidenavItem[] = [];
        this.collectItemsByDisabledState(this.currentItems, disabled, matchingItems);
        return matchingItems;
    }

    /**
     * Resets the sidenav to default state
     */
    reset(): void {
        this.openedSubject.next(false);
        this.configSubject.next({});
        this.itemsSubject.next([]);
        this.activeItemSubject.next(null);
        this.currentConfig = {};
        this.currentItems = [];
        this.currentActiveItem = null;
        this.emitEvent('reset');
    }

    /**
     * Adds a nested item to a parent item
     * @param item The item to add
     * @param parentId The parent item ID
     */
    private addNestedItem(item: SidenavItem, parentId: string): void {
        const parent = this.findItemById(parentId);
        if (parent) {
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(item);
            this.itemsSubject.next(this.currentItems);
            this.emitEvent('itemAdded', { item, parentId });
        }
    }

    /**
     * Clears all active items
     */
    private clearActiveItems(): void {
        this.clearActiveItemsInArray(this.currentItems);
    }

    /**
     * Clears active items in an array
     * @param items The items array to clear
     */
    private clearActiveItemsInArray(items: SidenavItem[]): void {
        items.forEach(item => {
            item.active = false;
            if (item.children) {
                this.clearActiveItemsInArray(item.children);
            }
        });
    }

    /**
     * Finds an item by ID in an array
     * @param items The items array to search
     * @param itemId The ID to search for
     * @returns The found item or null
     */
    private findItemInArray(items: SidenavItem[], itemId: string): SidenavItem | null {
        for (const item of items) {
            if (item.id === itemId) {
                return item;
            }
            if (item.children) {
                const found = this.findItemInArray(item.children, itemId);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }

    /**
     * Collects items by level
     * @param items The items array to search
     * @param targetLevel The target level
     * @param currentLevel The current level
     * @param result The result array
     */
    private collectItemsByLevel(items: SidenavItem[], targetLevel: number, currentLevel: number, result: SidenavItem[]): void {
        if (currentLevel === targetLevel) {
            result.push(...items);
            return;
        }

        items.forEach(item => {
            if (item.children) {
                this.collectItemsByLevel(item.children, targetLevel, currentLevel + 1, result);
            }
        });
    }

    /**
     * Collects active items
     * @param items The items array to search
     * @param result The result array
     */
    private collectActiveItems(items: SidenavItem[], result: SidenavItem[]): void {
        items.forEach(item => {
            if (item.active) {
                result.push(item);
            }
            if (item.children) {
                this.collectActiveItems(item.children, result);
            }
        });
    }

    /**
     * Collects items by label
     * @param items The items array to search
     * @param label The label to search for
     * @param result The result array
     */
    private collectItemsByLabel(items: SidenavItem[], label: string, result: SidenavItem[]): void {
        items.forEach(item => {
            if (item.label.toLowerCase().includes(label.toLowerCase())) {
                result.push(item);
            }
            if (item.children) {
                this.collectItemsByLabel(item.children, label, result);
            }
        });
    }

    /**
     * Collects items by icon
     * @param items The items array to search
     * @param icon The icon to search for
     * @param result The result array
     */
    private collectItemsByIcon(items: SidenavItem[], icon: string, result: SidenavItem[]): void {
        items.forEach(item => {
            if (item.icon === icon) {
                result.push(item);
            }
            if (item.children) {
                this.collectItemsByIcon(item.children, icon, result);
            }
        });
    }

    /**
     * Collects items by route
     * @param items The items array to search
     * @param route The route to search for
     * @param result The result array
     */
    private collectItemsByRoute(items: SidenavItem[], route: string, result: SidenavItem[]): void {
        items.forEach(item => {
            if (item.route === route) {
                result.push(item);
            }
            if (item.children) {
                this.collectItemsByRoute(item.children, route, result);
            }
        });
    }

    /**
     * Collects items by disabled state
     * @param items The items array to search
     * @param disabled The disabled state to search for
     * @param result The result array
     */
    private collectItemsByDisabledState(items: SidenavItem[], disabled: boolean, result: SidenavItem[]): void {
        items.forEach(item => {
            if (item.disabled === disabled) {
                result.push(item);
            }
            if (item.children) {
                this.collectItemsByDisabledState(item.children, disabled, result);
            }
        });
    }

    /**
     * Emits a sidenav event
     * @param type The event type
     * @param data Optional event data
     */
    private emitEvent(type: string, data?: any): void {
        this.eventsSubject.next({ type, data, timestamp: new Date() });
    }
}

/**
 * Interface for sidenav events
 */
export interface AmwSidenavEvent {
    /** The event type */
    type: string;

    /** Optional event data */
    data?: any;

    /** Event timestamp */
    timestamp: Date;
}
