# HTTP Cache Persistence & Cross-Tab Synchronization

## Overview

The HTTP Cache Interceptor now features **persistent storage** using IndexedDB and **cross-tab synchronization** using BroadcastChannel API. This means your cache:

- ✅ **Survives browser restarts** - Cache persists even after closing/reopening the browser
- ✅ **Shared across tabs** - All browser tabs/windows share the same cache in real-time
- ✅ **Handles large datasets** - IndexedDB can efficiently store 10,000+ records
- ✅ **Two-tier architecture** - Fast in-memory (L1) + persistent IndexedDB (L2)
- ✅ **Storage monitoring** - Track usage and quota to prevent limits

## Architecture

### Two-Tier Caching

```
┌─────────────────────────────────────────────────────────────┐
│                     HTTP Request                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
         ┌─────────────────────────────┐
         │   L1: Memory Cache (Map)    │  ◄── Fast (< 1ms)
         │   - 50 most recent entries  │
         │   - Instant access          │
         └─────────────┬───────────────┘
                       │ Miss
                       ▼
         ┌─────────────────────────────┐
         │   L2: IndexedDB Storage     │  ◄── Persistent (< 10ms)
         │   - All cached entries      │
         │   - Survives restarts       │
         │   - Cross-tab shared        │
         └─────────────┬───────────────┘
                       │ Miss
                       ▼
         ┌─────────────────────────────┐
         │   HTTP Request to Server    │  ◄── Slow (100-1000ms+)
         └─────────────┬───────────────┘
                       │
                       ▼
         ┌─────────────────────────────┐
         │   Cache Response            │
         │   Memory + IndexedDB        │
         └─────────────────────────────┘
```

### Cross-Tab Synchronization

```
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│   Tab 1      │        │   Tab 2      │        │   Tab 3      │
│              │        │              │        │              │
│  Cache PUT   │───────>│ BroadcastCh. │───────>│  Update      │
│              │        │              │        │  Cache       │
└──────────────┘        └──────────────┘        └──────────────┘
       │                                                │
       │                                                │
       └────────────────────────────────────────────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   IndexedDB     │
                 │   (Shared)      │
                 └─────────────────┘
```

When one tab updates the cache:

1. Update is written to IndexedDB
2. BroadcastChannel notifies all other tabs
3. Other tabs update their memory cache
4. All tabs stay in sync instantly

## Storage Capacity

### IndexedDB Limits

| Browser | Typical Limit           | Notes                          |
| ------- | ----------------------- | ------------------------------ |
| Chrome  | ~60% of free disk space | Up to 80% on some systems      |
| Firefox | ~50% of free disk space | Can be larger with permissions |
| Safari  | ~1GB                    | More restrictive than others   |
| Edge    | ~60% of free disk space | Similar to Chrome              |

**For 10,000+ records:**

- Typical record (1KB): ~10MB total
- Large record (10KB): ~100MB total
- IndexedDB can easily handle this!

### Storage Monitoring

The service provides real-time storage monitoring:

```typescript
cacheService.getStorageStats().subscribe((stats) => {
  console.log(stats);
  // {
  //   memorySize: 50,
  //   indexedDbSize: 1234,
  //   storageEstimate: {
  //     usage: 52428800,      // bytes
  //     quota: 299977728,     // bytes
  //     percentage: 17.48     // percent
  //   }
  // }
});
```

## API Changes

### HttpCacheService

All methods now return RxJS Observables (consistent with Angular patterns):

```typescript
// Returns Observable<HttpResponse | null>
cacheService.get(url).subscribe((response) => {
  if (response) {
    console.log("Cached response:", response);
  }
});

// Returns Observable<void>
cacheService.put(url, response, timeout).subscribe(() => {
  console.log("Cached successfully");
});

// Returns Observable<void>
cacheService.clear().subscribe(() => {
  console.log("Cache cleared");
});

// Synchronous method for memory-only access
const memorySize = cacheService.size(); // Returns number
```

### New Observable Methods

```typescript
// Get total cache size (memory + IndexedDB) - Returns Observable<number>
cacheService.totalSize().subscribe((total) => {
  console.log(`Total entries: ${total}`);
});

// Get detailed storage statistics - Returns Observable<{...}>
cacheService.getStorageStats().subscribe((stats) => {
  console.log("Memory:", stats.memorySize);
  console.log("IndexedDB:", stats.indexedDbSize);
  console.log("Storage:", stats.storageEstimate);
});

// Prune expired entries - Returns Observable<number>
cacheService.pruneExpired().subscribe((deletedCount) => {
  console.log(`Deleted ${deletedCount} expired entries`);
});
```

## Performance Optimizations

### 1. Memory Cache (L1)

- **Size Limit**: Stores up to 50 most recently accessed entries
- **Access Time**: < 1ms
- **Purpose**: Ultra-fast repeated access to frequently used data

### 2. IndexedDB Cache (L2)

- **Size Limit**: Browser-dependent (typically GBs)
- **Access Time**: < 10ms
- **Purpose**: Persistence and large dataset storage

### 3. In-Flight Request Deduplication

Prevents duplicate simultaneous requests:

```typescript
// Even if called 10 times simultaneously
Promise.all([
  http.get("api/users"),
  http.get("api/users"),
  http.get("api/users"),
  // ... 7 more
]);

// Only ONE actual HTTP request is made
// All 10 callers get the same response
```

## Cross-Tab Behavior

### Scenario 1: Cache Hit in Another Tab

```
Tab 1: Makes request to /api/users
       ↓
       HTTP request sent
       ↓
       Response cached in IndexedDB
       ↓
       BroadcastChannel notifies other tabs

Tab 2: Immediately sees the cache update
       ↓
       Makes request to /api/users
       ↓
       Returns cached response (< 10ms)
```

### Scenario 2: Cache Cleared in One Tab

```
Tab 1: Calls cacheService.clear()
       ↓
       Clears IndexedDB
       ↓
       BroadcastChannel notifies other tabs

Tab 2: Receives clear message
       ↓
       Clears memory cache
       ↓
       Next request will fetch fresh data
```

## Best Practices for Large Datasets

### 1. Appropriate Cache Timeouts

```json
{
  "api/reference/countries": 86400000, // 24 hours - rarely changes
  "api/products/catalog": 3600000, // 1 hour - moderate changes
  "api/users/active": 300000, // 5 minutes - frequent changes
  "api/search/results": 60000 // 1 minute - very dynamic
}
```

### 2. Paginated Data

For large datasets, use pagination and cache each page:

```json
{
  "api/products": 60000, // List (first page)
  "api/products?page=:param": 60000 // Paginated results
}
```

Note: Query parameters are removed before caching, so all pages share the same cache. If you need per-page caching, include the page in the URL path instead.

### 3. Memory Management

```typescript
// Periodically clean up expired entries
setInterval(() => {
  cacheService.pruneExpired().subscribe((deleted) => {
    console.log(`Pruned ${deleted} expired entries`);
  });
}, 3600000); // Every hour

// Monitor storage usage
cacheService.getStorageStats().subscribe((stats) => {
  if (stats.storageEstimate && stats.storageEstimate.percentage > 80) {
    console.warn("Storage usage high, consider clearing old cache");
    cacheService.pruneExpired().subscribe();
  }
});
```

### 4. Selective Caching for Large Responses

For very large datasets, consider selective caching:

```json
{
  "api/products": 30000, // List view (small)
  "api/products/:id": 300000, // Individual (medium)
  "api/products/:id/full": null // Detailed (large) - NOT CACHED
}
```

## Storage Quota Management

### Checking Available Space

```typescript
import { HttpCacheService } from 'angular-material-wrap';

constructor(private cacheService: HttpCacheService) {}

checkStorage() {
  this.cacheService.getStorageStats().subscribe(stats => {
    if (stats.storageEstimate) {
      const { usage, quota, percentage } = stats.storageEstimate;

      console.log(`Using ${usage} of ${quota} bytes (${percentage}%)`);

      if (percentage > 90) {
        console.warn('Storage nearly full!');
        this.cacheService.pruneExpired().subscribe();
      }
    }
  });
}
```

### Requesting Persistent Storage

For critical applications, request persistent storage to prevent automatic cleanup:

```typescript
if (navigator.storage && navigator.storage.persist) {
  const isPersisted = await navigator.storage.persist();
  console.log(`Persistent storage ${isPersisted ? "granted" : "denied"}`);
}
```

## Browser Compatibility

| Feature          | Chrome | Firefox | Safari     | Edge |
| ---------------- | ------ | ------- | ---------- | ---- |
| IndexedDB        | ✅     | ✅      | ✅         | ✅   |
| BroadcastChannel | ✅     | ✅      | ✅ 15.4+   | ✅   |
| Storage API      | ✅     | ✅      | ⚠️ Limited | ✅   |

**Graceful Degradation:**

- If IndexedDB fails: Falls back to memory-only caching
- If BroadcastChannel unavailable: Each tab has independent cache
- If Storage API unavailable: Storage stats show "Not available"

## Troubleshooting

### Cache Not Persisting

1. **Check Browser Settings**: Ensure cookies/storage are not cleared on exit
2. **Check IndexedDB**: Open DevTools → Application → IndexedDB → HttpCacheDB
3. **Check Console**: Look for IndexedDB errors
4. **Check Quota**: Storage might be full

### Cross-Tab Sync Not Working

1. **Check Browser Support**: BroadcastChannel supported in modern browsers
2. **Check Console**: Look for BroadcastChannel errors
3. **Test Manually**: Make a change in tab 1, switch to tab 2

### Storage Quota Exceeded

```typescript
// Clear old cache
cacheService.clear().subscribe(() => {
  console.log("Cache cleared");
});

// Or just prune expired
cacheService.pruneExpired().subscribe((count) => {
  console.log(`Pruned ${count} entries`);
});

// Or clear specific endpoints
cacheService.delete("api/large-dataset").subscribe(() => {
  console.log("Specific entry deleted");
});
```

## Testing

### Test Persistence

1. Load data in the application
2. Close the browser completely
3. Reopen the browser
4. Navigate to the same page
5. Data should load instantly from cache

### Test Cross-Tab Sync

1. Open two browser tabs with your app
2. In Tab 1: Load some data (watch Network tab - request made)
3. In Tab 2: Load the same data (watch Network tab - NO request, instant!)
4. In Tab 1: Clear cache
5. In Tab 2: Try to load data (should make new request)

### Monitor Storage

```typescript
// Get real-time storage stats
setInterval(async () => {
  const stats = await cacheService.getStorageStats();
  console.log("Cache Stats:", stats);
}, 5000); // Every 5 seconds
```

## Performance Benchmarks

### Typical Response Times

| Scenario                  | Time        |
| ------------------------- | ----------- |
| Memory Cache Hit (L1)     | < 1ms       |
| IndexedDB Hit (L2)        | 2-10ms      |
| HTTP Request (Cache Miss) | 100-1000ms+ |

### Large Dataset Performance

For a 10,000 record dataset (10MB):

| Operation           | Time         |
| ------------------- | ------------ |
| Initial Load (HTTP) | ~2-5 seconds |
| Memory Cache Hit    | < 1ms        |
| IndexedDB Hit       | ~50-100ms    |
| Save to IndexedDB   | ~100-200ms   |

**Speed Improvement**: 20-50x faster than HTTP requests!

## Security Considerations

1. **No Sensitive Data**: Don't cache sensitive data (tokens, passwords, PII)
2. **HTTPS Only**: Use HTTPS to prevent cache poisoning
3. **Validation**: Validate cached data before use
4. **Expiration**: Use appropriate timeouts for security-sensitive data

```json
{
  "api/public/products": 300000, // OK to cache
  "api/user/profile": 60000, // Short timeout
  "api/auth/token": null, // NEVER cache
  "api/sensitive/data": null // NEVER cache
}
```

## Example: Caching Large Select Options

```typescript
// Component
@Component({
  selector: "app-product-form",
  template: `
    <mat-form-field>
      <mat-label>Category</mat-label>
      <mat-select [(ngModel)]="selectedCategory">
        <mat-option *ngFor="let category of categories" [value]="category.id">
          {{ category.name }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class ProductFormComponent implements OnInit {
  categories: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // First load: HTTP request (~500ms for 10,000 records)
    // Subsequent loads: Cached (< 10ms)
    // After browser restart: Still cached! (< 10ms)
    this.http.get<any[]>("api/reference/categories").subscribe((categories) => (this.categories = categories));
  }
}
```

```json
// cache-map.json
{
  "api/reference/categories": 86400000 // 24 hours - reference data rarely changes
}
```

**Result**:

- Initial load: 500ms
- Subsequent loads: < 10ms (50x faster!)
- Survives browser restart
- Shared across all tabs

## Migration from Memory-Only Cache

If upgrading from the memory-only version:

### Before (Synchronous)

```typescript
const response = cacheService.get(url);
if (response) {
  return of(response);
}
```

### After (Asynchronous)

```typescript
const response = await cacheService.get(url);
if (response) {
  return of(response);
}

// Or use the sync method for memory-only access
const response = cacheService.getSync(url); // Only checks L1
```

## Advanced Configuration

### Selective Persistence

By default, all cached entries are persisted. For memory-only caching of specific endpoints, set very short timeouts:

```json
{
  "api/realtime/updates": 5000, // 5 seconds - essentially memory-only
  "api/reference/data": 86400000 // 24 hours - persistent
}
```

### Storage Limits for Large Datasets

When caching very large datasets, monitor storage:

```typescript
import { HttpCacheService } from "angular-material-wrap";

@Injectable()
export class DataService {
  constructor(private cacheService: HttpCacheService) {
    this.monitorStorage();
  }

  private monitorStorage() {
    this.cacheService.getStorageStats().subscribe((stats) => {
      if (stats.storageEstimate) {
        const percentUsed = stats.storageEstimate.percentage;

        if (percentUsed > 80) {
          console.warn("Storage > 80%, pruning expired entries");
          this.cacheService.pruneExpired().subscribe();
        }

        if (percentUsed > 95) {
          console.error("Storage > 95%, clearing all cache");
          this.cacheService.clear().subscribe();
        }
      }
    });
  }
}
```

## Summary

The enhanced HTTP cache interceptor provides:

✅ **Persistence** - Cache survives browser restarts  
✅ **Cross-Tab Sharing** - All tabs share the same cache  
✅ **Large Dataset Support** - 10,000+ records efficiently cached  
✅ **Two-Tier Performance** - Memory + IndexedDB for optimal speed  
✅ **Storage Monitoring** - Track and manage storage usage  
✅ **Automatic Cleanup** - Expired entries are automatically removed  
✅ **Graceful Degradation** - Falls back if features unavailable

This makes it ideal for caching large reference datasets like:

- Product catalogs
- Category hierarchies
- Country/state/city lists
- Configuration data
- User directories
- And more!
