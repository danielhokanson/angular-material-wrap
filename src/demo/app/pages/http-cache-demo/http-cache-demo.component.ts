import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { AmwHttpCacheService, AmwCacheConfigService } from '../../../../library/src/services/amw-http-cache';
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent, AmwIconComponent, AmwProgressSpinnerComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

@Component({
    selector: 'amw-demo-http-cache',
    standalone: true,
    imports: [
    CommonModule,
    AmwTabsComponent,
    AmwTabComponent,
    AmwCardComponent,
    AmwIconComponent,
    AmwProgressSpinnerComponent,
    AmwButtonComponent,
    AmwApiDocComponent,
],
    templateUrl: './http-cache-demo.component.html',
    styleUrl: './http-cache-demo.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class HttpCacheDemoComponent implements OnInit {
    loading = false;
    lastRequestTime: number | null = null;
    cacheSize = 0;
    totalCacheSize = 0;
    storageUsage: string = 'Calculating...';
    cacheConfig: any = {};
    responseData: any = null;
    errorMessage: string | null = null;

    testEndpoints = [
        { url: '/api/users', label: 'Users List (60s cache)' },
        { url: '/api/users/12', label: 'User Detail (5min cache)' },
        { url: '/api/products', label: 'Products List (30s cache)' },
        { url: '/api/products/34', label: 'Product Detail (5min cache)' }
    ];

    // Code examples for the Code tab
    codeExamples = {
        basic: `// app.config.ts - Register the HTTP cache interceptor
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { amwHttpCacheInterceptor } from '@anthropic/angular-material-wrap';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([amwHttpCacheInterceptor]))
  ]
};`,

        cacheMap: `// assets/cache-map.json - Configure URL patterns and timeouts
{
  "/api/users": 60000,
  "/api/users/:id": 300000,
  "/api/products": 30000,
  "/api/products/:id": 300000,
  "/api/search/*": 120000
}`,

        serviceUsage: `// Using AmwHttpCacheService directly
import { AmwHttpCacheService } from '@anthropic/angular-material-wrap';

@Component({...})
export class MyComponent {
  constructor(private cacheService: AmwHttpCacheService) {}

  clearUserCache(): void {
    this.cacheService.delete('/api/users').subscribe(() => {
      console.log('User cache cleared');
    });
  }

  clearAllCache(): void {
    this.cacheService.clear().subscribe(() => {
      console.log('All cache cleared');
    });
  }

  getStats(): void {
    this.cacheService.getStorageStats().subscribe(stats => {
      console.log('Memory entries:', stats.memorySize);
      console.log('IndexedDB entries:', stats.indexedDbSize);
    });
  }
}`,

        configUsage: `// Using AmwCacheConfigService
import { AmwCacheConfigService } from '@anthropic/angular-material-wrap';

@Component({...})
export class MyComponent {
  constructor(private configService: AmwCacheConfigService) {}

  checkCacheability(url: string): void {
    const timeout = this.configService.getTimeoutForUrl(url);
    if (timeout !== null) {
      console.log(\`URL will be cached for \${timeout}ms\`);
    } else {
      console.log('URL will not be cached');
    }
  }

  viewConfig(): void {
    const config = this.configService.getConfigSync();
    console.log('Cache configuration:', config);
  }
}`,

        patternMatching: `// URL Pattern Examples
// Exact match
"/api/users": 60000                  // Matches /api/users exactly

// Numeric ID placeholder
"/api/users/:id": 300000             // Matches /api/users/123, /api/users/456

// Generic parameter placeholder
"/api/products/:param": 300000       // Matches /api/products/abc, /api/products/xyz

// Wildcard matching
"/api/search/*": 120000              // Matches /api/search/anything/here

// Partial path matching (without leading /)
"SomeController/Thing": 60000        // Matches /api/SomeController/Thing`
    };

    // AmwHttpCacheService API documentation
    httpCacheServiceApiDoc: ApiDocumentation = {
        methods: [
            {
                name: 'get',
                parameters: 'url: string',
                returns: 'Observable<HttpResponse<any> | null>',
                description: 'Get a cached response. Checks memory cache first (L1), then IndexedDB (L2). Returns null if not found or expired.'
            },
            {
                name: 'put',
                parameters: 'url: string, response: HttpResponse<any>, timeout: number',
                returns: 'Observable<void>',
                description: 'Store a response in both memory and IndexedDB cache. The timeout is in milliseconds.'
            },
            {
                name: 'delete',
                parameters: 'url: string',
                returns: 'Observable<void>',
                description: 'Delete a specific cached entry from both memory and IndexedDB.'
            },
            {
                name: 'clear',
                returns: 'Observable<void>',
                description: 'Clear all cached entries from both memory and IndexedDB. Notifies other tabs via BroadcastChannel.'
            },
            {
                name: 'size',
                returns: 'number',
                description: 'Get the number of entries in the memory cache (L1). This is synchronous and returns immediately.'
            },
            {
                name: 'totalSize',
                returns: 'Observable<number>',
                description: 'Get the total number of entries in IndexedDB (L2). Returns an Observable since IndexedDB access is async.'
            },
            {
                name: 'getStorageStats',
                returns: 'Observable<StorageStats>',
                description: 'Get comprehensive storage statistics including memory cache size, IndexedDB count, and browser storage quota usage.'
            },
            {
                name: 'pruneExpired',
                returns: 'Observable<number>',
                description: 'Remove all expired entries from both memory and IndexedDB. Returns the count of deleted entries.'
            }
        ],
        usageNotes: [
            'Two-tier caching: Memory (L1) for fast access + IndexedDB (L2) for persistence.',
            'Cross-tab synchronization via BroadcastChannel API keeps all tabs in sync.',
            'Cache survives browser restarts using IndexedDB storage.',
            'Automatic expiration based on configured timeouts per URL pattern.',
            'In-flight request deduplication prevents duplicate network calls.',
            'Supports 10,000+ records efficiently with IndexedDB.'
        ]
    };

    // AmwCacheConfigService API documentation
    cacheConfigServiceApiDoc: ApiDocumentation = {
        methods: [
            {
                name: 'getConfig',
                returns: 'Observable<AmwCacheConfig>',
                description: 'Get the cache configuration as an Observable. Emits whenever the configuration changes.'
            },
            {
                name: 'getConfigSync',
                returns: 'AmwCacheConfig',
                description: 'Get the cache configuration synchronously. May return empty object if config has not loaded yet.'
            },
            {
                name: 'getTimeoutForUrl',
                parameters: 'url: string',
                returns: 'number | null',
                description: 'Get the cache timeout for a specific URL based on configured patterns. Returns null if no matching pattern found.'
            },
            {
                name: 'shouldCache',
                parameters: 'url: string',
                returns: 'boolean',
                description: 'Check if a URL should be cached based on the configuration. Returns true if a matching pattern exists.'
            }
        ],
        usageNotes: [
            'Configuration is loaded from assets/cache-map.json on application startup.',
            'Supports exact URL matching, placeholder patterns (:id, :param), and wildcards (*).',
            'Pattern matching is case-sensitive for paths but API prefix normalization is case-insensitive.',
            'Partial path patterns (without leading /) can match URLs with /api/ prefix.',
            'Query parameters and hash fragments are stripped before pattern matching.'
        ]
    };

    constructor(
        private http: HttpClient,
        private cacheService: AmwHttpCacheService,
        private configService: AmwCacheConfigService
    ) { }

    ngOnInit(): void {
        this.cacheSize = this.cacheService.size();
        this.cacheConfig = this.configService.getConfigSync();

        // Defer Observable subscriptions to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            // Update IndexedDB size and storage stats
            this.cacheService.totalSize().subscribe(size => {
                this.totalCacheSize = size;
            });

            this.updateStorageStats();
        }, 0);
    }

    makeRequest(url: string): void {
        this.loading = true;
        this.errorMessage = null;
        const startTime = performance.now();

        this.http.get(url).subscribe({
            next: (response) => {
                const endTime = performance.now();
                this.lastRequestTime = endTime - startTime;
                this.responseData = response;
                this.loading = false;
                this.updateCacheInfo();
            },
            error: (error) => {
                this.errorMessage = `Error: ${error.message}. This is expected if you don't have a backend running.`;
                this.loading = false;
                this.lastRequestTime = null;
            }
        });
    }

    clearCache(): void {
        this.cacheService.clear().subscribe(() => {
            this.updateCacheInfo();
            this.responseData = null;
            this.lastRequestTime = null;
        });
    }

    pruneExpired(): void {
        this.cacheService.pruneExpired().subscribe(deletedCount => {
            console.log(`Pruned ${deletedCount} expired entries`);
            this.updateCacheInfo();
        });
    }

    updateCacheInfo(): void {
        this.cacheSize = this.cacheService.size();

        this.cacheService.totalSize().subscribe(size => {
            this.totalCacheSize = size;
        });

        this.updateStorageStats();
    }

    updateStorageStats(): void {
        this.cacheService.getStorageStats().subscribe(stats => {
            if (stats.storageEstimate) {
                const usageMB = (stats.storageEstimate.usage / 1024 / 1024).toFixed(2);
                const quotaMB = (stats.storageEstimate.quota / 1024 / 1024).toFixed(2);
                const percentage = stats.storageEstimate.percentage.toFixed(2);
                this.storageUsage = `${usageMB}MB / ${quotaMB}MB (${percentage}%)`;
            } else {
                this.storageUsage = 'Not available';
            }
        });
    }

    getCacheTimeout(url: string): number | null {
        return this.configService.getTimeoutForUrl(url);
    }

    formatTimeout(ms: number): string {
        if (ms < 1000) return `${ms}ms`;
        if (ms < 60000) return `${ms / 1000}s`;
        return `${ms / 60000}min`;
    }
}
