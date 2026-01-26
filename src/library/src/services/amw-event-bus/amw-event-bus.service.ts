import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, filter, map } from 'rxjs';

/**
 * Event wrapper for the event bus
 */
export interface BusEvent<T = unknown> {
    /** The event type/name */
    type: string;
    /** The event payload */
    payload: T;
    /** Timestamp when the event was published */
    timestamp: Date;
}

/**
 * Event bus statistics
 */
export interface EventBusStatistics {
    /** Total number of events published */
    totalEvents: number;
    /** Total number of active subscribers */
    totalSubscribers: number;
    /** Map of event types to their publish counts */
    eventTypeCounts: Map<string, number>;
    /** Map of event types to their subscriber counts */
    subscriberCounts: Map<string, number>;
    /** Number of unique event types */
    activeEventTypes: number;
    /** Timestamp of last statistics update */
    lastUpdated: Date;
}

/**
 * AMW Event Bus Service
 *
 * A lightweight pub-sub event system for cross-component communication.
 * Use this when components need to communicate without direct references.
 *
 * @example
 * ```typescript
 * // Publishing an event
 * eventBus.publish({ type: 'USER_LOGGED_IN', payload: user });
 *
 * // Subscribing to events
 * eventBus.on<User>('USER_LOGGED_IN').subscribe(user => {
 *   console.log('User logged in:', user);
 * });
 *
 * // Using typed events
 * interface UserEvent {
 *   userId: string;
 *   action: 'login' | 'logout';
 * }
 * eventBus.on<UserEvent>('USER_EVENT').subscribe(event => {
 *   if (event.action === 'login') {
 *     // Handle login
 *   }
 * });
 * ```
 */
@Injectable({
    providedIn: 'root'
})
export class AmwEventBusService implements OnDestroy {
    /** Subject for all events */
    private eventSubject = new Subject<BusEvent>();

    /** Map of event types to subscriber counts for statistics */
    private subscriberCounts = new Map<string, number>();

    /** Map of event types to publish counts for statistics */
    private eventCounts = new Map<string, number>();

    /** Total events published */
    private totalEventsPublished = 0;

    /** Map of event handlers for simple subscribe/unsubscribe pattern */
    private handlerMap = new Map<string, Set<(event: unknown) => void>>();

    /**
     * Publishes an event to the bus.
     *
     * @param event The event to publish (with type and payload)
     *
     * @example
     * ```typescript
     * eventBus.publish({ type: 'ITEM_CREATED', payload: newItem });
     *
     * // Or with explicit typing
     * eventBus.publish<Item>({ type: 'ITEM_CREATED', payload: newItem });
     * ```
     */
    publish<T>(event: { type: string; payload: T }): void {
        const busEvent: BusEvent<T> = {
            type: event.type,
            payload: event.payload,
            timestamp: new Date()
        };

        // Update statistics
        this.totalEventsPublished++;
        const currentCount = this.eventCounts.get(event.type) || 0;
        this.eventCounts.set(event.type, currentCount + 1);

        // Emit event
        this.eventSubject.next(busEvent);

        // Call simple handlers
        const handlers = this.handlerMap.get(event.type);
        if (handlers) {
            handlers.forEach(handler => handler(event.payload));
        }
    }

    /**
     * Publishes an event using the event object's constructor name as the type.
     * Useful for class-based events.
     *
     * @param event The event object to publish
     *
     * @example
     * ```typescript
     * class UserLoggedInEvent {
     *   constructor(public user: User) {}
     * }
     * eventBus.emit(new UserLoggedInEvent(user));
     * ```
     */
    emit<T extends object>(event: T): void {
        const eventType = event.constructor.name;
        this.publish({ type: eventType, payload: event });
    }

    /**
     * Returns an observable that emits when events of the specified type are published.
     *
     * @param eventType The type of event to listen for
     * @returns Observable that emits the event payload
     *
     * @example
     * ```typescript
     * eventBus.on<User>('USER_LOGGED_IN').subscribe(user => {
     *   console.log('User:', user);
     * });
     * ```
     */
    on<T>(eventType: string): Observable<T> {
        // Track subscriber count
        const count = this.subscriberCounts.get(eventType) || 0;
        this.subscriberCounts.set(eventType, count + 1);

        return this.eventSubject.pipe(
            filter(event => event.type === eventType),
            map(event => event.payload as T)
        );
    }

    /**
     * Returns an observable that emits all events (regardless of type).
     *
     * @returns Observable that emits all events
     *
     * @example
     * ```typescript
     * eventBus.all().subscribe(event => {
     *   console.log(`Event ${event.type}:`, event.payload);
     * });
     * ```
     */
    all(): Observable<BusEvent> {
        return this.eventSubject.asObservable();
    }

    /**
     * Subscribes to an event type with a simple handler function.
     * Returns an unsubscribe function.
     *
     * @param eventType The event type to subscribe to
     * @param handler The handler function to call
     *
     * @example
     * ```typescript
     * const unsub = eventBus.subscribe('USER_LOGGED_IN', (user) => {
     *   console.log('User logged in:', user);
     * });
     *
     * // Later, to unsubscribe:
     * unsub();
     * ```
     */
    subscribe<T>(eventType: string, handler: (event: T) => void): () => void {
        if (!this.handlerMap.has(eventType)) {
            this.handlerMap.set(eventType, new Set());
        }

        const handlers = this.handlerMap.get(eventType)!;
        handlers.add(handler as (event: unknown) => void);

        // Update subscriber count
        const count = this.subscriberCounts.get(eventType) || 0;
        this.subscriberCounts.set(eventType, count + 1);

        // Return unsubscribe function
        return () => {
            handlers.delete(handler as (event: unknown) => void);
            const newCount = (this.subscriberCounts.get(eventType) || 1) - 1;
            if (newCount <= 0) {
                this.subscriberCounts.delete(eventType);
            } else {
                this.subscriberCounts.set(eventType, newCount);
            }
        };
    }

    /**
     * Unsubscribes a handler from an event type.
     *
     * @param eventType The event type
     * @param handler The handler to remove
     */
    unsubscribe<T>(eventType: string, handler: (event: T) => void): void {
        const handlers = this.handlerMap.get(eventType);
        if (handlers) {
            handlers.delete(handler as (event: unknown) => void);
            const newCount = (this.subscriberCounts.get(eventType) || 1) - 1;
            if (newCount <= 0) {
                this.subscriberCounts.delete(eventType);
            } else {
                this.subscriberCounts.set(eventType, newCount);
            }
        }
    }

    /**
     * Gets the subscriber count for an event type.
     *
     * @param eventType The event type
     * @returns Number of subscribers
     */
    getSubscriberCount(eventType: string): number {
        return this.subscriberCounts.get(eventType) || 0;
    }

    /**
     * Clears all subscribers for an event type.
     *
     * @param eventType The event type to clear
     */
    clearSubscribers(eventType: string): void {
        this.handlerMap.delete(eventType);
        this.subscriberCounts.delete(eventType);
    }

    /**
     * Clears all subscribers for all event types.
     */
    clearAllSubscribers(): void {
        this.handlerMap.clear();
        this.subscriberCounts.clear();
    }

    /**
     * Gets event bus statistics.
     *
     * @returns Statistics about event bus usage
     */
    getStatistics(): EventBusStatistics {
        return {
            totalEvents: this.totalEventsPublished,
            totalSubscribers: Array.from(this.subscriberCounts.values()).reduce((a, b) => a + b, 0),
            eventTypeCounts: new Map(this.eventCounts),
            subscriberCounts: new Map(this.subscriberCounts),
            activeEventTypes: this.eventCounts.size,
            lastUpdated: new Date()
        };
    }

    /**
     * Gets all active event types that have been published.
     *
     * @returns Array of event type names
     */
    getActiveEventTypes(): string[] {
        return Array.from(this.eventCounts.keys());
    }

    /**
     * Checks if there are any subscribers for an event type.
     *
     * @param eventType The event type to check
     * @returns True if there are subscribers
     */
    hasSubscribers(eventType: string): boolean {
        return (this.subscriberCounts.get(eventType) || 0) > 0;
    }

    /**
     * Resets all statistics (useful for testing).
     */
    resetStatistics(): void {
        this.totalEventsPublished = 0;
        this.eventCounts.clear();
    }

    ngOnDestroy(): void {
        this.eventSubject.complete();
        this.handlerMap.clear();
        this.subscriberCounts.clear();
    }
}
