import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface AmwCacheSyncMessage {
    type: 'put' | 'delete' | 'clear' | 'prune';
    url?: string;
    timestamp?: number;
}

@Injectable({
    providedIn: 'root'
})
export class AmwCacheSyncService {
    private channelName = 'http-cache-sync';
    private channel: BroadcastChannel | null = null;
    private messages$ = new Subject<AmwCacheSyncMessage>();

    constructor() {
        this.initBroadcastChannel();
    }

    /**
     * Initialize BroadcastChannel for cross-tab communication
     */
    private initBroadcastChannel(): void {
        if (typeof BroadcastChannel !== 'undefined') {
            try {
                this.channel = new BroadcastChannel(this.channelName);

                this.channel.onmessage = (event: MessageEvent<AmwCacheSyncMessage>) => {
                    // Notify subscribers about cache changes from other tabs
                    this.messages$.next(event.data);
                };

                this.channel.onmessageerror = (error) => {
                    console.error('BroadcastChannel error:', error);
                };
            } catch (error) {
                console.warn('BroadcastChannel not available:', error);
            }
        } else {
            console.warn('BroadcastChannel API not supported in this browser');
        }
    }

    /**
     * Broadcast a cache update to other tabs
     */
    broadcast(message: AmwCacheSyncMessage): void {
        if (this.channel) {
            try {
                this.channel.postMessage(message);
            } catch (error) {
                console.error('Error broadcasting message:', error);
            }
        }
    }

    /**
     * Get an observable of cache sync messages from other tabs
     */
    getMessages(): Observable<AmwCacheSyncMessage> {
        return this.messages$.asObservable();
    }

    /**
     * Notify other tabs that a cache entry was added
     */
    notifyPut(url: string): void {
        this.broadcast({
            type: 'put',
            url,
            timestamp: Date.now()
        });
    }

    /**
     * Notify other tabs that a cache entry was deleted
     */
    notifyDelete(url: string): void {
        this.broadcast({
            type: 'delete',
            url,
            timestamp: Date.now()
        });
    }

    /**
     * Notify other tabs that the cache was cleared
     */
    notifyClear(): void {
        this.broadcast({
            type: 'clear',
            timestamp: Date.now()
        });
    }

    /**
     * Notify other tabs that expired entries were pruned
     */
    notifyPrune(): void {
        this.broadcast({
            type: 'prune',
            timestamp: Date.now()
        });
    }

    /**
     * Close the BroadcastChannel
     */
    destroy(): void {
        if (this.channel) {
            this.channel.close();
            this.channel = null;
        }
    }
}



