import { inject, Injectable } from '@angular/core';
import {
    HttpInterceptorFn,
    HttpResponse,
    HttpInterceptor,
    HttpRequest,
    HttpHandler
} from '@angular/common/http';
import { of } from 'rxjs';
import { tap, switchMap, shareReplay } from 'rxjs/operators';
import { HttpCacheService } from './http-cache.service';
import { CacheConfigService } from './cache-config.service';

/**
 * Class-based HTTP Cache Interceptor
 * 
 * This interceptor caches HTTP GET responses based on URL patterns
 * configured in assets/cache-map.json
 * 
 * Features:
 * - Persistent storage using IndexedDB
 * - Cross-tab synchronization using BroadcastChannel
 * - Two-tier caching (memory + IndexedDB)
 * - In-flight request deduplication
 * - Automatic expiration based on configured timeouts
 */
@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
    constructor(
        private cacheService: HttpCacheService,
        private configService: CacheConfigService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next.handle(req);
        }

        // Only cache requests to /api/ endpoints
        if (!req.url.includes('/api/')) {
            return next.handle(req);
        }

        // Check if this URL should be cached
        const timeout = this.configService.getTimeoutForUrl(req.url);
        if (timeout === null) {
            return next.handle(req);
        }

        // Try to get the response from cache (returns Observable)
        return this.cacheService.get(req.url).pipe(
            switchMap(cachedResponse => {
                if (cachedResponse) {
                    console.log(`[HTTP Cache] Serving cached response for: ${req.url}`);
                    return of(cachedResponse.clone());
                }

                // Make the request and cache the response
                console.log(`[HTTP Cache] Making HTTP request for: ${req.url} (timeout: ${timeout}ms)`);
                return next.handle(req).pipe(
                    tap(event => {
                        if (event instanceof HttpResponse) {
                            console.log(`[HTTP Cache] Caching response for: ${req.url}`);
                            // Subscribe to the put operation but don't block the response
                            this.cacheService.put(req.url, event, timeout).subscribe({
                                next: () => console.log(`[HTTP Cache] Successfully cached: ${req.url}`),
                                error: (err) => console.error(`[HTTP Cache] Failed to cache: ${req.url}`, err)
                            });
                        }
                    }),
                    shareReplay(1) // Prevent duplicate requests
                );
            })
        );
    }
}

/**
 * Functional HTTP Cache Interceptor
 * 
 * Usage:
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(withInterceptors([httpCacheInterceptor]))
 *   ]
 * };
 * ```
 */
export const httpCacheInterceptor: HttpInterceptorFn = (req, next) => {
    console.log(`[HTTP Cache Interceptor] Intercepting: ${req.method} ${req.url}`);

    // Only cache GET requests
    if (req.method !== 'GET') {
        console.log(`[HTTP Cache Interceptor] Skipping non-GET request: ${req.method}`);
        return next(req);
    }

    // Only cache requests to /api/ endpoints
    if (!req.url.includes('/api/')) {
        console.log(`[HTTP Cache Interceptor] Skipping non-API request: ${req.url}`);
        return next(req);
    }

    try {
        console.log(`[HTTP Cache Interceptor] Injecting services for: ${req.url}`);
        const cacheService = inject(HttpCacheService);
        const configService = inject(CacheConfigService);
        console.log(`[HTTP Cache Interceptor] Services injected successfully`);

        // Check if this URL should be cached
        const timeout = configService.getTimeoutForUrl(req.url);
        console.log(`[HTTP Cache Interceptor] Timeout for ${req.url}: ${timeout}ms`);
        if (timeout === null) {
            console.log(`[HTTP Cache Interceptor] No cache timeout configured for: ${req.url}`);
            return next(req);
        }

        // Try to get the response from cache (returns Observable)
        return cacheService.get(req.url).pipe(
            switchMap(cachedResponse => {
                if (cachedResponse) {
                    console.log(`[HTTP Cache] Serving cached response for: ${req.url}`);
                    return of(cachedResponse.clone());
                }

                // Make the request and cache the response
                console.log(`[HTTP Cache] Making HTTP request for: ${req.url} (timeout: ${timeout}ms)`);
                return next(req).pipe(
                    tap(event => {
                        if (event instanceof HttpResponse) {
                            console.log(`[HTTP Cache] Caching response for: ${req.url}`);
                            // Subscribe to the put operation but don't block the response
                            cacheService.put(req.url, event, timeout).subscribe({
                                next: () => console.log(`[HTTP Cache] Successfully cached: ${req.url}`),
                                error: (err) => console.error(`[HTTP Cache] Failed to cache: ${req.url}`, err)
                            });
                        }
                    }),
                    shareReplay(1) // Prevent duplicate requests
                );
            })
        );
    } catch (error) {
        console.warn('[HTTP Cache] Service injection failed, bypassing cache:', error);
        return next(req);
    }
};
