# HTTP Cache Interceptor

An Angular HTTP interceptor that provides configurable client-side caching for HTTP GET requests.

## Features

- **Automatic Caching**: Caches HTTP GET responses based on URL patterns
- **Configurable Timeouts**: Different cache timeouts for different endpoints
- **Pattern Matching**: Supports URL patterns with placeholders (`:id`, `:param`, `*`)
- **In-Flight Request Deduplication**: Prevents duplicate requests to the same endpoint
- **Automatic Expiration**: Cached responses expire after the configured timeout
- **Easy Configuration**: Configure caching via `assets/cache-map.json`

## Installation

### 1. Configure the Interceptor

Add the interceptor to your application's providers in `app.config.ts` or `main.ts`:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { HttpCacheInterceptor } from "angular-material-wrap";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(withInterceptors([HttpCacheInterceptor]))],
};
```

Or in a module-based application:

```typescript
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpCacheInterceptor } from "angular-material-wrap";

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCacheInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
```

### 2. Create Cache Configuration

Create a file `assets/cache-map.json` with your caching configuration:

```json
{
  "api/users": 60000,
  "api/users/:id": 300000,
  "api/products": 30000,
  "api/products/:id": 300000,
  "api/categories": 600000
}
```

## Configuration

### cache-map.json Format

The configuration file maps URL patterns to cache timeouts in milliseconds:

```json
{
  "exact/path": 60000, // Exact match
  "api/users/:id": 300000, // Numeric ID placeholder
  "api/posts/:param": 120000, // Any path segment
  "api/search/*": 60000 // Wildcard match
}
```

### Pattern Matching

The interceptor supports several types of URL patterns:

#### 1. Exact Match

```json
{
  "api/users": 60000
}
```

Matches: `api/users`  
Does not match: `api/users/123`, `api/users/list`

#### 2. Numeric ID Placeholder (`:id`)

```json
{
  "api/users/:id": 300000
}
```

Matches: `api/users/123`, `api/users/456`  
Does not match: `api/users/abc`, `api/users`

#### 3. Parameter Placeholder (`:param`)

```json
{
  "api/categories/:param": 120000
}
```

Matches: `api/categories/electronics`, `api/categories/123`  
Does not match: `api/categories/sub/items` (doesn't match multiple segments)

#### 4. Wildcard (`*`)

```json
{
  "api/search/*": 60000
}
```

Matches: `api/search/users`, `api/search/products/active`, `api/search/anything/else`

#### 5. Multiple Placeholders

```json
{
  "api/users/:id/posts/:param": 120000
}
```

Matches: `api/users/123/posts/456`, `api/users/789/posts/draft`

## Usage

### Basic Example

```typescript
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-user-list",
  template: `
    <div *ngFor="let user of users">
      {{ user.name }}
    </div>
  `,
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // First call: Makes HTTP request, caches response
    this.http.get("api/users").subscribe((users) => {
      this.users = users;
    });

    // Second call (within timeout): Returns cached response immediately
    this.http.get("api/users").subscribe((users) => {
      console.log("Cached response:", users);
    });
  }
}
```

### With URL Parameters

```typescript
// Assuming cache-map.json has: "api/users/:id": 300000

// First call: Makes HTTP request
this.http.get("api/users/123").subscribe((user) => {
  console.log("Fresh data:", user);
});

// Second call: Returns cached response
this.http.get("api/users/123").subscribe((user) => {
  console.log("Cached data:", user);
});

// Different ID: Makes new HTTP request
this.http.get("api/users/456").subscribe((user) => {
  console.log("Fresh data for different user:", user);
});
```

## API

### HttpCacheService

The cache service can be injected and used directly:

```typescript
import { HttpCacheService } from 'angular-material-wrap';

constructor(private cacheService: HttpCacheService) {}

// Clear specific entry - Returns Observable<void>
this.cacheService.delete('api/users').subscribe(() => {
  console.log('Entry deleted');
});

// Clear all cache - Returns Observable<void>
this.cacheService.clear().subscribe(() => {
  console.log('Cache cleared');
});

// Get cache size (synchronous) - Returns number
const size = this.cacheService.size();

// Remove expired entries - Returns Observable<number>
this.cacheService.pruneExpired().subscribe(count => {
  console.log(`Pruned ${count} entries`);
});
```

### CacheConfigService

The configuration service provides methods to check cache rules:

```typescript
import { CacheConfigService } from 'angular-material-wrap';

constructor(private configService: CacheConfigService) {}

// Check if URL should be cached
const shouldCache = this.configService.shouldCache('api/users');

// Get timeout for URL
const timeout = this.configService.getTimeoutForUrl('api/users/123');
```

## Best Practices

1. **Cache Immutable Data**: Best for reference data that doesn't change frequently
2. **Appropriate Timeouts**: Set shorter timeouts for frequently changing data
3. **Avoid Caching POST/PUT/DELETE**: The interceptor only caches GET requests
4. **Query Parameters**: Query parameters are removed before matching, so `api/users?page=1` and `api/users?page=2` will share the same cache entry
5. **Clear Cache on Mutations**: Clear relevant cache entries when data is modified

## Example Configuration

```json
{
  "api/users": 60000, // 1 minute - user list
  "api/users/:id": 300000, // 5 minutes - user details
  "api/products": 30000, // 30 seconds - product list
  "api/products/:id": 300000, // 5 minutes - product details
  "api/products/:id/reviews": 120000, // 2 minutes - product reviews
  "api/categories": 600000, // 10 minutes - category list
  "api/categories/:param": 600000, // 10 minutes - category details
  "api/settings": 300000, // 5 minutes - app settings
  "api/config/*": 600000 // 10 minutes - all config endpoints
}
```

## Troubleshooting

### Cache Not Working

1. **Check Configuration File**: Ensure `assets/cache-map.json` exists and is valid JSON
2. **Check HTTP Method**: Only GET requests are cached
3. **Check URL Pattern**: Verify the URL matches a pattern in the configuration
4. **Check Console**: The interceptor logs cache hits and misses when in development mode

### Clearing Cache

If you need to clear the cache programmatically:

```typescript
import { HttpCacheService } from 'angular-material-wrap';

constructor(private cacheService: HttpCacheService) {}

// After updating data
this.http.put('api/users/123', userData).subscribe(() => {
  // Clear the cached user data
  this.cacheService.delete('api/users/123').subscribe(() => {
    this.cacheService.delete('api/users').subscribe(); // Clear list too
  });
});
```

## Performance Considerations

- **Memory Usage**: Cached responses are stored in memory. Consider using `pruneExpired()` periodically
- **Cache Size**: Monitor cache size with `cacheService.size()`
- **In-Flight Requests**: The interceptor prevents duplicate requests, improving performance

## License

MIT
