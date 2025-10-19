import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Mock Backend Interceptor
 * 
 * Simulates API responses for demo purposes without requiring a real backend.
 * This interceptor intercepts HTTP requests and returns mock data.
 */

// Mock data
const mockUsers = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'User', 'Manager'][i % 3],
    status: ['Active', 'Inactive'][i % 2],
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
}));

const mockProducts = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    description: `Description for product ${i + 1}`,
    price: Math.floor(Math.random() * 10000) / 100,
    category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4],
    inStock: Math.random() > 0.3,
    rating: Math.floor(Math.random() * 5) + 1
}));

const mockCategories = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Category ${i + 1}`,
    slug: `category-${i + 1}`,
    productCount: Math.floor(Math.random() * 500),
    description: `Description for category ${i + 1}`
}));

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
    const { url, method } = req;

    // Only intercept requests to our mock API paths
    if (!url.includes('/api/')) {
        return next(req);
    }

    // Extract the path (remove domain and query params)
    const urlObj = new URL(url, 'http://localhost');
    const path = urlObj.pathname;

    // Simulate network delay
    const networkDelay = Math.floor(Math.random() * 300) + 100; // 100-400ms

    // Handle different endpoints
    if (method === 'GET') {
        // Users list
        if (path === '/api/users' || path.startsWith('/api/users?')) {
            return of(new HttpResponse({
                status: 200,
                body: mockUsers,
                url: url
            })).pipe(delay(networkDelay));
        }

        // Single user
        const userMatch = path.match(/^\/api\/users\/(\d+)$/);
        if (userMatch) {
            const userId = parseInt(userMatch[1]);
            const user = mockUsers.find(u => u.id === userId);

            if (user) {
                return of(new HttpResponse({
                    status: 200,
                    body: user,
                    url: url
                })).pipe(delay(networkDelay));
            } else {
                return throwError(() => new HttpErrorResponse({
                    error: { message: 'User not found' },
                    status: 404,
                    statusText: 'Not Found',
                    url: url
                })).pipe(delay(networkDelay));
            }
        }

        // Products list
        if (path === '/api/products' || path.startsWith('/api/products?')) {
            return of(new HttpResponse({
                status: 200,
                body: mockProducts,
                url: url
            })).pipe(delay(networkDelay));
        }

        // Single product
        const productMatch = path.match(/^\/api\/products\/(\d+)$/);
        if (productMatch) {
            const productId = parseInt(productMatch[1]);
            const product = mockProducts.find(p => p.id === productId);

            if (product) {
                return of(new HttpResponse({
                    status: 200,
                    body: product,
                    url: url
                })).pipe(delay(networkDelay));
            } else {
                return throwError(() => new HttpErrorResponse({
                    error: { message: 'Product not found' },
                    status: 404,
                    statusText: 'Not Found',
                    url: url
                })).pipe(delay(networkDelay));
            }
        }

        // Product reviews
        const reviewsMatch = path.match(/^\/api\/products\/(\d+)\/reviews$/);
        if (reviewsMatch) {
            const productId = parseInt(reviewsMatch[1]);
            const reviews = Array.from({ length: 10 }, (_, i) => ({
                id: i + 1,
                productId: productId,
                author: `Reviewer ${i + 1}`,
                rating: Math.floor(Math.random() * 5) + 1,
                comment: `This is a review comment for product ${productId}`,
                date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
            }));

            return of(new HttpResponse({
                status: 200,
                body: reviews,
                url: url
            })).pipe(delay(networkDelay));
        }

        // Categories
        if (path === '/api/categories' || path.startsWith('/api/categories?')) {
            return of(new HttpResponse({
                status: 200,
                body: mockCategories,
                url: url
            })).pipe(delay(networkDelay));
        }

        // Single category
        const categoryMatch = path.match(/^\/api\/categories\/(.+)$/);
        if (categoryMatch) {
            const categorySlug = categoryMatch[1];
            const category = mockCategories.find(c => c.slug === categorySlug || c.id === parseInt(categorySlug));

            if (category) {
                return of(new HttpResponse({
                    status: 200,
                    body: category,
                    url: url
                })).pipe(delay(networkDelay));
            }
        }

        // Settings
        if (path === '/api/settings') {
            return of(new HttpResponse({
                status: 200,
                body: {
                    theme: 'light',
                    language: 'en',
                    notifications: true,
                    apiBaseUrl: 'https://api.example.com'
                },
                url: url
            })).pipe(delay(networkDelay));
        }

        // Config wildcard
        if (path.startsWith('/api/config/')) {
            const configKey = path.split('/api/config/')[1];
            return of(new HttpResponse({
                status: 200,
                body: {
                    key: configKey,
                    value: `Mock config value for ${configKey}`,
                    timestamp: new Date().toISOString()
                },
                url: url
            })).pipe(delay(networkDelay));
        }
    }

    // If no mock matched, pass through to real backend
    return next(req);
};


