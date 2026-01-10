import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ViewEncapsulation } from '@angular/core';
import { HttpCacheService, CacheConfigService } from '../../../../library/src/services/amw-http-cache';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
@Component({
    selector: 'amw-demo-http-cache',
    standalone: true,
    imports: [CommonModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    AmwButtonComponent],
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

    constructor(
        private http: HttpClient,
        private cacheService: HttpCacheService,
        private configService: CacheConfigService
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

