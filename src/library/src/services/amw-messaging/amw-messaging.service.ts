import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface Message {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    content: string;
    timestamp: Date;
    duration?: number;
    dismissible?: boolean;
    actions?: MessageAction[];
}

export interface MessageAction {
    label: string;
    action: () => void;
    style?: 'primary' | 'secondary' | 'danger';
}

@Injectable({
    providedIn: 'root'
})
export class AmwMessagingService {
    private messagesSubject = new BehaviorSubject<Message[]>([]);
    private messageIdCounter = 0;

    public messages$: Observable<Message[]> = this.messagesSubject.asObservable();

    constructor() { }

    /**
     * Add a new message to the message queue
     */
    addMessage(message: Omit<Message, 'id' | 'timestamp'>): string {
        const id = this.generateMessageId();
        const fullMessage: Message = {
            ...message,
            id,
            timestamp: new Date(),
            dismissible: message.dismissible !== false,
            duration: message.duration || this.getDefaultDuration(message.type)
        };

        const currentMessages = this.messagesSubject.value;
        this.messagesSubject.next([...currentMessages, fullMessage]);

        // Auto-dismiss if duration is specified
        if (fullMessage.duration && fullMessage.duration > 0) {
            setTimeout(() => {
                this.removeMessage(id);
            }, fullMessage.duration);
        }

        return id;
    }

    /**
     * Remove a message by ID
     */
    removeMessage(id: string): void {
        const currentMessages = this.messagesSubject.value;
        const filteredMessages = currentMessages.filter(msg => msg.id !== id);
        this.messagesSubject.next(filteredMessages);
    }

    /**
     * Clear all messages
     */
    clearMessages(): void {
        this.messagesSubject.next([]);
    }

    /**
     * Clear messages by type
     */
    clearMessagesByType(type: Message['type']): void {
        const currentMessages = this.messagesSubject.value;
        const filteredMessages = currentMessages.filter(msg => msg.type !== type);
        this.messagesSubject.next(filteredMessages);
    }

    /**
     * Get current messages
     */
    getMessages(): Message[] {
        return this.messagesSubject.value;
    }

    /**
     * Convenience methods for different message types
     */
    info(title: string, content: string, options?: Partial<Message>): string {
        return this.addMessage({ type: 'info', title, content, ...options });
    }

    success(title: string, content: string, options?: Partial<Message>): string {
        return this.addMessage({ type: 'success', title, content, ...options });
    }

    warning(title: string, content: string, options?: Partial<Message>): string {
        return this.addMessage({ type: 'warning', title, content, ...options });
    }

    error(title: string, content: string, options?: Partial<Message>): string {
        return this.addMessage({ type: 'error', title, content, ...options });
    }

    private generateMessageId(): string {
        return `msg_${++this.messageIdCounter}_${Date.now()}`;
    }

    private getDefaultDuration(type: Message['type']): number {
        const durations = {
            info: 5000,
            success: 3000,
            warning: 7000,
            error: 10000
        };
        return durations[type];
    }
}
