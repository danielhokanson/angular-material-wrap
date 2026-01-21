import { inject, Injectable } from '@angular/core';
import {
    HttpInterceptorFn,
    HttpResponse,
    HttpInterceptor,
    HttpRequest,
    HttpHandler
} from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap, switchMap, shareReplay } from 'rxjs/operators';
import { AmwHttpCacheService } from './amw-http-cache.service';
import { AmwCacheConfigService } from './amw-cache-config.service';

/**
 * Shared caching logic for both functional and class-based interceptors
 */
function processCacheRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cacheService: AmwHttpCacheService,
    configService: AmwCacheConfigService,
    debugPrefix: string = '[HTTP Cache]'
): Observable<any> {
    // Only cache GET requests
    if (req.method !== 'GET') {
        console.log(`${debugPrefix} Skipping non-GET request: ${req.method}`);
        return next.handle(req);
    }

    // Only cache requests to /api/ endpoints
    if (!req.url.includes('/api/')) {
        console.log(`${debugPrefix} Skipping non-API request: ${req.url}`);
        return next.handle(req);
    }

    // Check if this URL should be cached
    const timeout = configService.getTimeoutForUrl(req.url);
    console.log(`${debugPrefix} Timeout for ${req.url}: ${timeout}ms`);
    if (timeout === null) {
        console.log(`${debugPrefix} No cache timeout configured for: ${req.url}`);
        return next.handle(req);
    }

    // Try to get the response from cache (returns Observable)
    return cacheService.get(req.url).pipe(
        switchMap(cachedResponse => {
            if (cachedResponse) {
                console.log(`${debugPrefix} Serving cached response for: ${req.url}`);
                return of(cachedResponse.clone());
            }

            // Make the request and cache the response
            console.log(`${debugPrefix} Making HTTP request for: ${req.url} (timeout: ${timeout}ms)`);
            return next.handle(req).pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        console.log(`${debugPrefix} Caching response for: ${req.url}`);
                        // Subscribe to the put operation but don't block the response
                        cacheService.put(req.url, event, timeout).subscribe({
                            next: () => console.log(`${debugPrefix} Successfully cached: ${req.url}`),
                            error: (err) => console.error(`${debugPrefix} Failed to cache: ${req.url}`, err)
                        });
                    }
                }),
                shareReplay(1) // Prevent duplicate requests
            );
        })
    );
}

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
        private cacheService: AmwHttpCacheService,
        private configService: AmwCacheConfigService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return processCacheRequest(req, next, this.cacheService, this.configService);
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

    try {
        console.log(`[HTTP Cache Interceptor] Injecting services for: ${req.url}`);
        const cacheService = inject(AmwHttpCacheService);
        const configService = inject(AmwCacheConfigService);
        console.log(`[HTTP Cache Interceptor] Services injected successfully`);

        // Convert functional interceptor signature to class-based signature
        const nextHandler: HttpHandler = {
            handle: (req: HttpRequest<any>) => next(req)
        };

        return processCacheRequest(req, nextHandler, cacheService, configService, '[HTTP Cache Interceptor]');
    } catch (error) {
        console.warn('[HTTP Cache] Service injection failed, bypassing cache:', error);
        return next(req);
    }
};
