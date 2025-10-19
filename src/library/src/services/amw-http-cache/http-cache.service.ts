import { Injectable, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, tap, shareReplay, takeUntil, catchError } from 'rxjs/operators';
import { IndexedDbStorageService } from './indexed-db-storage.service';
import { CacheSyncService } from './cache-sync.service';

export interface CacheEntry {
    response: HttpResponse<any>;
    timestamp: number;
    timeout: number;
}

@Injectable({
    providedIn: 'root'
})
export class HttpCacheService implements OnDestroy {
    // In-memory cache for fast access (L1 cache)
    private memoryCache = new Map<string, CacheEntry>();

    // Track ongoing operations to prevent race conditions
    private ongoingGets = new Map<string, Observable<HttpResponse<any> | null>>();

    private destroy$ = new Subject<void>();

    constructor(
        private indexedDbStorage: IndexedDbStorageService,
        private cacheSyncService: CacheSyncService
    ) {
        this.initCrossTabSync();
        this.loadMemoryCacheFromIndexedDB();
    }

    /**
     * Initialize cross-tab synchronization
     */
    private initCrossTabSync(): void {
        this.cacheSyncService.getMessages()
            .pipe(takeUntil(this.destroy$))
            .subscribe(message => {
                switch (message.type) {
                    case 'put':
                        if (message.url) {
                            // Refresh this entry from IndexedDB
                            this.indexedDbStorage.get(message.url)
                                .pipe(takeUntil(this.destroy$))
                                .subscribe(response => {
                                    if (response) {
                                        this.memoryCache.set(message.url!, {
                                            response,
                                            timestamp: Date.now(),
                                            timeout: 0 // Will be corrected from stored data
                                        });
                                    }
                                });
                        }
                        break;
                    case 'delete':
                        if (message.url) {
                            this.memoryCache.delete(message.url);
                        }
                        break;
                    case 'clear':
                        this.memoryCache.clear();
                        break;
                    case 'prune':
                        this.pruneMemoryCache();
                        break;
                }
            });
    }

    /**
     * Load frequently accessed items into memory cache on startup
     */
    private loadMemoryCacheFromIndexedDB(): void {
        this.indexedDbStorage.getAllKeys()
            .pipe(
                takeUntil(this.destroy$),
                tap(keys => {
                    // Load a limited number of recent entries into memory
                    const maxMemoryCacheSize = 50;
                    const keysToLoad = keys.slice(0, maxMemoryCacheSize);

                    keysToLoad.forEach(key => {
                        this.indexedDbStorage.get(key)
                            .pipe(takeUntil(this.destroy$))
                            .subscribe();
                    });
                })
            )
            .subscribe();
    }

    /**
     * Get a cached response as Observable (checks memory first, then IndexedDB)
     * @param url The URL to check in the cache
     * @returns Observable of the cached HttpResponse or null if not found/expired
     */
    get(url: string): Observable<HttpResponse<any> | null> {
        // Check if there's already an ongoing get for this URL
        const ongoing = this.ongoingGets.get(url);
        if (ongoing) {
            return ongoing;
        }

        // Create the get operation
        const get$ = this.getInternal(url).pipe(
            tap(() => this.ongoingGets.delete(url)),
            shareReplay(1)
        );

        this.ongoingGets.set(url, get$);
        return get$;
    }

    private getInternal(url: string): Observable<HttpResponse<any> | null> {
        // Check memory cache first (L1)
        const memoryEntry = this.memoryCache.get(url);
        if (memoryEntry) {
            const now = Date.now();
            const age = now - memoryEntry.timestamp;

            if (age <= memoryEntry.timeout) {
                return of(memoryEntry.response);
            } else {
                // Expired in memory, remove it
                this.memoryCache.delete(url);
            }
        }

        // Check IndexedDB (L2)
        return this.indexedDbStorage.get(url).pipe(
            tap(response => {
                // Add to memory cache for faster future access if found
                if (response) {
                    this.memoryCache.set(url, {
                        response,
                        timestamp: Date.now(),
                        timeout: 300000 // Default 5 min, will be overwritten on next put
                    });
                }
            })
        );
    }

    /**
     * Store a response in both memory and IndexedDB as Observable
     * @param url The URL to cache
     * @param response The HttpResponse to cache
     * @param timeout The timeout in milliseconds
     * @returns Observable that completes when caching is done
     */
    put(url: string, response: HttpResponse<any>, timeout: number): Observable<void> {
        const entry: CacheEntry = {
            response,
            timestamp: Date.now(),
            timeout
        };

        // Store in memory cache (L1) - synchronous
        this.memoryCache.set(url, entry);

        // Store in IndexedDB (L2) - asynchronous
        return this.indexedDbStorage.put(url, response, timeout).pipe(
            tap(() => {
                // Notify other tabs after successful storage
                this.cacheSyncService.notifyPut(url);
            }),
            catchError(error => {
                console.error('Error storing in cache:', error);
                return of(undefined);
            })
        );
    }

    /**
     * Delete a specific cached entry from both memory and IndexedDB as Observable
     * @param url The URL to clear from the cache
     * @returns Observable that completes when deletion is done
     */
    delete(url: string): Observable<void> {
        // Remove from memory cache
        this.memoryCache.delete(url);

        // Remove from IndexedDB
        return this.indexedDbStorage.delete(url).pipe(
            tap(() => {
                // Notify other tabs
                this.cacheSyncService.notifyDelete(url);
            }),
            catchError(error => {
                console.error('Error deleting from cache:', error);
                return of(undefined);
            })
        );
    }

    /**
     * Clear all cached entries from both memory and IndexedDB as Observable
     * @returns Observable that completes when clearing is done
     */
    clear(): Observable<void> {
        // Clear memory cache
        this.memoryCache.clear();

        // Clear IndexedDB
        return this.indexedDbStorage.clear().pipe(
            tap(() => {
                // Notify other tabs
                this.cacheSyncService.notifyClear();
            }),
            catchError(error => {
                console.error('Error clearing cache:', error);
                return of(undefined);
            })
        );
    }

    /**
     * Get the number of cached entries in memory
     * Note: This is the memory cache size, not IndexedDB
     */
    size(): number {
        return this.memoryCache.size;
    }

    /**
     * Get the total number of cached entries including IndexedDB as Observable
     * @returns Observable of the total number of entries
     */
    totalSize(): Observable<number> {
        return this.indexedDbStorage.count();
    }

    /**
     * Remove all expired entries from both memory and IndexedDB as Observable
     * @returns Observable of the number of deleted entries
     */
    pruneExpired(): Observable<number> {
        // Prune memory cache
        this.pruneMemoryCache();

        // Prune IndexedDB
        return this.indexedDbStorage.pruneExpired().pipe(
            tap(deletedCount => {
                // Notify other tabs
                this.cacheSyncService.notifyPrune();
                console.log(`Pruned ${deletedCount} expired entries from IndexedDB`);
            }),
            catchError(error => {
                console.error('Error pruning cache:', error);
                return of(0);
            })
        );
    }

    /**
     * Prune expired entries from memory cache only
     */
    private pruneMemoryCache(): void {
        const now = Date.now();
        const keysToDelete: string[] = [];

        this.memoryCache.forEach((entry, key) => {
            const age = now - entry.timestamp;
            if (age > entry.timeout) {
                keysToDelete.push(key);
            }
        });

        keysToDelete.forEach(key => this.memoryCache.delete(key));
    }

    /**
     * Get storage usage statistics as Observable
     * @returns Observable of storage statistics
     */
    getStorageStats(): Observable<{
        memorySize: number;
        indexedDbSize: number;
        storageEstimate: { usage: number; quota: number; percentage: number } | null;
    }> {
        return this.indexedDbStorage.count().pipe(
            switchMap(indexedDbSize =>
                this.indexedDbStorage.getStorageEstimate().pipe(
                    map(storageEstimate => ({
                        memorySize: this.memoryCache.size,
                        indexedDbSize,
                        storageEstimate
                    }))
                )
            ),
            catchError(error => {
                console.error('Error getting storage stats:', error);
                return of({
                    memorySize: this.memoryCache.size,
                    indexedDbSize: 0,
                    storageEstimate: null
                });
            })
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.cacheSyncService.destroy();
    }
}
