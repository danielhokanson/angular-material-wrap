import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: Date;
    duration?: number;
    persistent?: boolean;
    actions?: NotificationAction[];
    icon?: string;
    sound?: boolean;
}

export interface NotificationAction {
    label: string;
    action: () => void;
    style?: 'primary' | 'secondary' | 'danger';
}

export interface NotificationOptions {
    duration?: number;
    persistent?: boolean;
    sound?: boolean;
    icon?: string;
    actions?: NotificationAction[];
}

@Injectable({
    providedIn: 'root'
})
export class AmwNotificationService {
    private notificationsSubject = new BehaviorSubject<Notification[]>([]);
    private notificationIdCounter = 0;

    public notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();

    constructor() { }

    /**
     * Show a notification
     */
    show(
        type: Notification['type'],
        title: string,
        message: string,
        options?: NotificationOptions
    ): string {
        const id = this.generateNotificationId();
        const notification: Notification = {
            id,
            type,
            title,
            message,
            timestamp: new Date(),
            duration: options?.duration || this.getDefaultDuration(type),
            persistent: options?.persistent || false,
            sound: options?.sound !== false,
            icon: options?.icon || this.getDefaultIcon(type),
            actions: options?.actions
        };

        const currentNotifications = this.notificationsSubject.value;
        this.notificationsSubject.next([...currentNotifications, notification]);

        // Play sound if enabled
        if (notification.sound) {
            this.playNotificationSound(type);
        }

        // Auto-dismiss if not persistent and duration is specified
        if (!notification.persistent && notification.duration && notification.duration > 0) {
            setTimeout(() => {
                this.dismiss(id);
            }, notification.duration);
        }

        return id;
    }

    /**
     * Dismiss a notification by ID
     */
    dismiss(id: string): void {
        const currentNotifications = this.notificationsSubject.value;
        const filteredNotifications = currentNotifications.filter(notif => notif.id !== id);
        this.notificationsSubject.next(filteredNotifications);
    }

    /**
     * Clear all notifications
     */
    clear(): void {
        this.notificationsSubject.next([]);
    }

    /**
     * Clear notifications by type
     */
    clearByType(type: Notification['type']): void {
        const currentNotifications = this.notificationsSubject.value;
        const filteredNotifications = currentNotifications.filter(notif => notif.type !== type);
        this.notificationsSubject.next(filteredNotifications);
    }

    /**
     * Get current notifications
     */
    getNotifications(): Notification[] {
        return this.notificationsSubject.value;
    }

    /**
     * Convenience methods for different notification types
     */
    info(title: string, message: string, options?: NotificationOptions): string {
        return this.show('info', title, message, options);
    }

    success(title: string, message: string, options?: NotificationOptions): string {
        return this.show('success', title, message, options);
    }

    warning(title: string, message: string, options?: NotificationOptions): string {
        return this.show('warning', title, message, options);
    }

    error(title: string, message: string, options?: NotificationOptions): string {
        return this.show('error', title, message, options);
    }

    /**
     * Request browser notification permission
     */
    async requestPermission(): Promise<NotificationPermission> {
        if ('Notification' in window) {
            return await Notification.requestPermission();
        }
        return 'denied';
    }

    /**
     * Show browser notification
     */
    async showBrowserNotification(
        title: string,
        message?: string,
        options?: NotificationOptions
    ): Promise<void> {
        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification(title, {
                body: message,
                icon: options?.icon,
                badge: options?.icon
            });

            if (options?.duration) {
                setTimeout(() => notification.close(), options.duration);
            }
        }
    }

    private generateNotificationId(): string {
        return `notif_${++this.notificationIdCounter}_${Date.now()}`;
    }

    private getDefaultDuration(type: Notification['type']): number {
        const durations = {
            info: 5000,
            success: 3000,
            warning: 7000,
            error: 10000
        };
        return durations[type];
    }

    private getDefaultIcon(type: Notification['type']): string {
        const icons = {
            info: 'info',
            success: 'check_circle',
            warning: 'warning',
            error: 'error'
        };
        return icons[type];
    }

    private playNotificationSound(type: Notification['type']): void {
        // Simple sound implementation - in a real app, you might use audio files
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        const frequencies = {
            info: 440,
            success: 523,
            warning: 659,
            error: 330
        };

        oscillator.frequency.setValueAtTime(frequencies[type], audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }
}
