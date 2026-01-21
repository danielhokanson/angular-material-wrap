import { Injectable } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, from, of, defer } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export interface AmwStoredCacheEntry {
    url: string;
    response: {
        body: any;
        status: number;
        statusText: string;
        headers: { [key: string]: string };
        url: string;
    };
    timestamp: number;
    timeout: number;
}

@Injectable({
    providedIn: 'root'
})
export class AmwIndexedDbStorageService {
    private dbName = 'HttpCacheDB';
    private storeName = 'cache';
    private version = 1;
    private db$: Observable<IDBDatabase>;

    constructor() {
        this.db$ = this.initDB();
    }

    /**
     * Initialize IndexedDB and return as Observable
     */
    private initDB(): Observable<IDBDatabase> {
        return defer(() => from(new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => {
                console.error('IndexedDB failed to open:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // Create object store if it doesn't exist
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const objectStore = db.createObjectStore(this.storeName, { keyPath: 'url' });
                    objectStore.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
        })));
    }

    /**
     * Get a cached entry from IndexedDB as Observable
     */
    get(url: string): Observable<HttpResponse<any> | null> {
        return this.db$.pipe(
            map(db => from(new Promise<HttpResponse<any> | null>((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                const request = store.get(url);

                request.onsuccess = () => {
                    const entry: AmwStoredCacheEntry | undefined = request.result;

                    if (!entry) {
                        resolve(null);
                        return;
                    }

                    // Check if expired
                    const now = Date.now();
                    const age = now - entry.timestamp;
                    if (age > entry.timeout) {
                        // Delete expired entry (don't wait for completion)
                        this.delete(url).subscribe();
                        resolve(null);
                        return;
                    }

                    // Reconstruct HttpResponse
                    const headers = new HttpHeaders(entry.response.headers);
                    const response = new HttpResponse({
                        body: entry.response.body,
                        status: entry.response.status,
                        statusText: entry.response.statusText,
                        headers: headers,
                        url: entry.response.url
                    });

                    resolve(response);
                };

                request.onerror = () => {
                    console.error('Error reading from IndexedDB:', request.error);
                    resolve(null);
                };
            }))),
            switchMap(promise => promise),
            catchError(error => {
                console.error('IndexedDB get error:', error);
                return of(null);
            })
        );
    }

    /**
     * Store a cached entry in IndexedDB as Observable
     */
    put(url: string, response: HttpResponse<any>, timeout: number): Observable<void> {
        return this.db$.pipe(
            map(db => from(new Promise<void>((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);

                // Serialize HttpResponse for storage
                const entry: AmwStoredCacheEntry = {
                    url,
                    response: {
                        body: response.body,
                        status: response.status,
                        statusText: response.statusText,
                        headers: this.extractHeaders(response),
                        url: response.url || url
                    },
                    timestamp: Date.now(),
                    timeout
                };

                const request = store.put(entry);

                request.onsuccess = () => resolve();
                request.onerror = () => {
                    console.error('Error writing to IndexedDB:', request.error);
                    reject(request.error);
                };
            }))),
            switchMap(promise => promise),
            catchError(error => {
                console.error('IndexedDB put error:', error);
                return of(undefined);
            })
        );
    }

    /**
     * Delete a specific cached entry as Observable
     */
    delete(url: string): Observable<void> {
        return this.db$.pipe(
            map(db => from(new Promise<void>((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.delete(url);

                request.onsuccess = () => resolve();
                request.onerror = () => {
                    console.error('Error deleting from IndexedDB:', request.error);
                    reject(request.error);
                };
            }))),
            switchMap(promise => promise),
            catchError(error => {
                console.error('IndexedDB delete error:', error);
                return of(undefined);
            })
        );
    }

    /**
     * Clear all cached entries as Observable
     */
    clear(): Observable<void> {
        return this.db$.pipe(
            map(db => from(new Promise<void>((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.clear();

                request.onsuccess = () => resolve();
                request.onerror = () => {
                    console.error('Error clearing IndexedDB:', request.error);
                    reject(request.error);
                };
            }))),
            switchMap(promise => promise),
            catchError(error => {
                console.error('IndexedDB clear error:', error);
                return of(undefined);
            })
        );
    }

    /**
     * Get all URLs in the cache as Observable
     */
    getAllKeys(): Observable<string[]> {
        return this.db$.pipe(
            map(db => from(new Promise<string[]>((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                const request = store.getAllKeys();

                request.onsuccess = () => resolve(request.result as string[]);
                request.onerror = () => {
                    console.error('Error getting keys from IndexedDB:', request.error);
                    resolve([]);
                };
            }))),
            switchMap(promise => promise),
            catchError(error => {
                console.error('IndexedDB getAllKeys error:', error);
                return of([]);
            })
        );
    }

    /**
     * Get the number of cached entries as Observable
     */
    count(): Observable<number> {
        return this.db$.pipe(
            map(db => from(new Promise<number>((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                const request = store.count();

                request.onsuccess = () => resolve(request.result);
                request.onerror = () => {
                    console.error('Error counting IndexedDB entries:', request.error);
                    resolve(0);
                };
            }))),
            switchMap(promise => promise),
            catchError(error => {
                console.error('IndexedDB count error:', error);
                return of(0);
            })
        );
    }

    /**
     * Remove all expired entries as Observable
     */
    pruneExpired(): Observable<number> {
        return this.db$.pipe(
            map(db => from(new Promise<number>((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.openCursor();
                const now = Date.now();
                let deletedCount = 0;

                request.onsuccess = (event) => {
                    const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
                    if (cursor) {
                        const entry: AmwStoredCacheEntry = cursor.value;
                        const age = now - entry.timestamp;
                        if (age > entry.timeout) {
                            cursor.delete();
                            deletedCount++;
                        }
                        cursor.continue();
                    } else {
                        resolve(deletedCount);
                    }
                };

                request.onerror = () => {
                    console.error('Error pruning IndexedDB:', request.error);
                    resolve(0);
                };
            }))),
            switchMap(promise => promise),
            catchError(error => {
                console.error('IndexedDB pruneExpired error:', error);
                return of(0);
            })
        );
    }

    /**
     * Extract headers from HttpResponse
     */
    private extractHeaders(response: HttpResponse<any>): { [key: string]: string } {
        const headers: { [key: string]: string } = {};
        if (response.headers) {
            response.headers.keys().forEach(key => {
                const value = response.headers.get(key);
                if (value) {
                    headers[key] = value;
                }
            });
        }
        return headers;
    }

    /**
     * Get estimated storage usage as Observable
     */
    getStorageEstimate(): Observable<{ usage: number; quota: number; percentage: number } | null> {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            return from(navigator.storage.estimate()).pipe(
                map(estimate => ({
                    usage: estimate.usage || 0,
                    quota: estimate.quota || 0,
                    percentage: estimate.quota ? ((estimate.usage || 0) / estimate.quota) * 100 : 0
                })),
                catchError(error => {
                    console.error('Error getting storage estimate:', error);
                    return of(null);
                })
            );
        }
        return of(null);
    }
}
