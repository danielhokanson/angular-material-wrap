import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export interface CacheConfig {
    [key: string]: number;  // URL pattern -> timeout in milliseconds
}

@Injectable({
    providedIn: 'root'
})
export class CacheConfigService {
    private config$ = new BehaviorSubject<CacheConfig>({});
    private configLoaded = false;

    constructor(private http: HttpClient) {
        // Delay loading to avoid circular dependency issues
        setTimeout(() => this.loadConfig(), 0);
    }

    /**
     * Load the cache configuration from assets/cache-map.json
     */
    private loadConfig(): void {
        this.http.get<CacheConfig>('assets/cache-map.json')
            .pipe(
                catchError(error => {
                    console.warn('Failed to load cache-map.json, caching will be disabled', error);
                    return of({});
                }),
                tap(() => this.configLoaded = true)
            )
            .subscribe(config => this.config$.next(config));
    }

    /**
     * Get the cache configuration as an observable
     */
    getConfig(): Observable<CacheConfig> {
        return this.config$.asObservable();
    }

    /**
     * Get the cache configuration synchronously (may be empty if not loaded yet)
     */
    getConfigSync(): CacheConfig {
        return this.config$.value;
    }

    /**
     * Check if configuration has been loaded
     */
    isConfigLoaded(): boolean {
        return this.configLoaded;
    }

    /**
     * Get the timeout for a specific URL based on the configured patterns
     * @param url The URL to check
     * @returns The timeout in milliseconds or null if no match found
     */
    getTimeoutForUrl(url: string): number | null {
        const config = this.config$.value;

        // Remove query parameters and hash for matching
        const cleanUrl = url.split('?')[0].split('#')[0];

        // Try exact match first
        if (config[cleanUrl] !== undefined) {
            return config[cleanUrl];
        }

        // Try pattern matching with placeholders
        for (const pattern in config) {
            if (this.matchesPattern(cleanUrl, pattern)) {
                return config[pattern];
            }
        }

        return null;
    }

    /**
     * Check if a URL matches a pattern with placeholders
     * Placeholders can be:
     * - :id for numeric IDs
     * - :param for any path segment
     * - * for any sequence of characters
     * 
     * Examples:
     * - /api/users/:id matches /api/users/123
     * - /api/products/:id/reviews matches /api/products/456/reviews
     * - /api/search/* matches /api/search/anything/else
     * 
     * @param url The URL to test
     * @param pattern The pattern to match against
     * @returns True if the URL matches the pattern
     */
    private matchesPattern(url: string, pattern: string): boolean {
        // Escape special regex characters except for * and :
        let regexPattern = pattern
            .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
            .replace(/\*/g, '.*')
            .replace(/:id/g, '\\d+')
            .replace(/:param/g, '[^/]+')
            .replace(/:(\w+)/g, '[^/]+');

        // Add start and end anchors
        regexPattern = '^' + regexPattern + '$';

        const regex = new RegExp(regexPattern);
        return regex.test(url);
    }

    /**
     * Check if a URL should be cached
     * @param url The URL to check
     * @returns True if the URL should be cached
     */
    shouldCache(url: string): boolean {
        return this.getTimeoutForUrl(url) !== null;
    }
}



