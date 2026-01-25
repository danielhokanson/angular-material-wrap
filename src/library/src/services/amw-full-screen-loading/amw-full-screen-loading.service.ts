import { Injectable, signal, computed } from '@angular/core';
import { Observable, MonoTypeOperatorFunction, tap, finalize } from 'rxjs';

/**
 * Represents a single loading item in the queue
 */
export interface LoadingItem {
    /** Unique identifier for this loading item */
    id: string;
    /** Message to display for this loading item */
    message: string;
    /** Whether this item is dismissing (for animation) */
    dismissing: boolean;
    /** Timestamp when this item was added */
    timestamp: number;
}

/**
 * Full Screen Loading Service
 *
 * Manages a queue of loading messages that can be driven by observables.
 * Each observable can add its own message, and when the observable completes
 * or emits a value, the message is dismissed with animation.
 *
 * @example
 * ```typescript
 * // Using the loading() operator
 * this.userService.getUser(id)
 *   .pipe(loading('Loading user...'))
 *   .subscribe(user => this.user = user);
 *
 * // Multiple simultaneous operations
 * forkJoin([
 *   this.service1.getData().pipe(loading('Loading data 1...')),
 *   this.service2.getData().pipe(loading('Loading data 2...'))
 * ]).subscribe(results => this.results = results);
 * ```
 */
@Injectable({
    providedIn: 'root'
})
export class AmwFullScreenLoadingService {
    /** Internal signal holding all loading items */
    private loadingItemsSignal = signal<LoadingItem[]>([]);

    /** Signal indicating whether the overlay is visible */
    private overlayVisibleSignal = signal<boolean>(false);

    /** Timeout for overlay dismiss animation */
    private overlayDismissTimeout: ReturnType<typeof setTimeout> | null = null;

    /** Animation duration for items dismissing (ms) */
    readonly itemDismissAnimationDuration = 300;

    /** Animation duration for overlay appearing/disappearing (ms) */
    readonly overlayAnimationDuration = 300;

    /** Read-only computed signal of loading items */
    readonly loadingItems = computed(() => this.loadingItemsSignal());

    /** Read-only computed signal of whether any loading is active */
    readonly isLoading = computed(() => this.loadingItemsSignal().length > 0);

    /** Read-only signal of whether overlay is visible (for animation timing) */
    readonly overlayVisible = computed(() => this.overlayVisibleSignal());

    /** Counter for generating unique IDs */
    private idCounter = 0;

    constructor() { }

    /**
     * Add a loading item to the queue
     * @param message The message to display
     * @returns The unique ID of the loading item
     */
    add(message: string): string {
        const id = this.generateId();
        const item: LoadingItem = {
            id,
            message,
            dismissing: false,
            timestamp: Date.now()
        };

        // Clear any pending overlay dismiss
        if (this.overlayDismissTimeout) {
            clearTimeout(this.overlayDismissTimeout);
            this.overlayDismissTimeout = null;
        }

        // Show overlay if this is the first item
        if (this.loadingItemsSignal().length === 0) {
            this.overlayVisibleSignal.set(true);
        }

        this.loadingItemsSignal.update(items => [...items, item]);
        return id;
    }

    /**
     * Dismiss a loading item from the queue with animation
     * @param id The ID of the loading item to dismiss
     */
    dismiss(id: string): void {
        // First, mark the item as dismissing to trigger animation
        this.loadingItemsSignal.update(items =>
            items.map(item =>
                item.id === id ? { ...item, dismissing: true } : item
            )
        );

        // After animation completes, remove the item
        setTimeout(() => {
            this.loadingItemsSignal.update(items =>
                items.filter(item => item.id !== id)
            );

            // If no more items, start overlay dismiss
            if (this.loadingItemsSignal().length === 0) {
                this.overlayDismissTimeout = setTimeout(() => {
                    this.overlayVisibleSignal.set(false);
                }, this.overlayAnimationDuration);
            }
        }, this.itemDismissAnimationDuration);
    }

    /**
     * Clear all loading items immediately
     */
    clear(): void {
        this.loadingItemsSignal.set([]);
        if (this.overlayDismissTimeout) {
            clearTimeout(this.overlayDismissTimeout);
        }
        this.overlayDismissTimeout = setTimeout(() => {
            this.overlayVisibleSignal.set(false);
        }, this.overlayAnimationDuration);
    }

    /**
     * Update the message for an existing loading item
     * @param id The ID of the loading item
     * @param message The new message
     */
    updateMessage(id: string, message: string): void {
        this.loadingItemsSignal.update(items =>
            items.map(item =>
                item.id === id ? { ...item, message } : item
            )
        );
    }

    /**
     * Generate a unique ID for a loading item
     */
    private generateId(): string {
        return `fsl_${Date.now()}_${++this.idCounter}`;
    }
}

/**
 * RxJS operator that adds a loading message while the observable is active.
 * The message is dismissed when the observable emits its first value (for single-emission observables)
 * or when it completes/errors.
 *
 * @param message The loading message to display
 * @param options Configuration options
 * @returns A MonoTypeOperatorFunction that can be used with .pipe()
 *
 * @example
 * ```typescript
 * // Basic usage
 * this.http.get('/api/data')
 *   .pipe(loading('Loading data...'))
 *   .subscribe(data => this.data = data);
 *
 * // With multiple operations
 * this.service.doAThing()
 *   .pipe(loading('Processing...'))
 *   .subscribe(result => console.log(result));
 * ```
 */
export function loading<T>(
    message: string,
    options?: {
        /**
         * If true, dismiss only on complete/error, not on next.
         * Useful for observables that emit multiple values.
         * Default: false (dismiss on first next)
         */
        dismissOnComplete?: boolean;
        /**
         * Service instance to use. If not provided, will be injected automatically.
         * This option is primarily for testing.
         */
        service?: AmwFullScreenLoadingService;
    }
): MonoTypeOperatorFunction<T> {
    const dismissOnComplete = options?.dismissOnComplete ?? false;

    return (source: Observable<T>): Observable<T> => {
        let loadingId: string | null = null;
        let dismissed = false;
        let service: AmwFullScreenLoadingService | null = options?.service ?? null;

        // Lazy inject the service if not provided
        const getService = (): AmwFullScreenLoadingService => {
            if (!service) {
                // Dynamic import to get the injector
                const injector = (globalThis as any).__amwFullScreenLoadingInjector;
                if (injector) {
                    service = injector.get(AmwFullScreenLoadingService);
                } else {
                    throw new Error(
                        'AmwFullScreenLoadingService not available. ' +
                        'Make sure AmwFullScreenLoadingComponent is included in your app.'
                    );
                }
            }
            return service!;
        };

        return new Observable<T>(subscriber => {
            // Add loading item when subscription starts
            try {
                loadingId = getService().add(message);
            } catch (e) {
                console.warn('Full screen loading service not available:', e);
            }

            const dismissLoading = () => {
                if (!dismissed && loadingId) {
                    dismissed = true;
                    try {
                        getService().dismiss(loadingId);
                    } catch (e) {
                        // Service may not be available
                    }
                }
            };

            const subscription = source.subscribe({
                next: (value) => {
                    if (!dismissOnComplete) {
                        dismissLoading();
                    }
                    subscriber.next(value);
                },
                error: (err) => {
                    dismissLoading();
                    subscriber.error(err);
                },
                complete: () => {
                    dismissLoading();
                    subscriber.complete();
                }
            });

            // Cleanup on unsubscribe
            return () => {
                dismissLoading();
                subscription.unsubscribe();
            };
        });
    };
}
