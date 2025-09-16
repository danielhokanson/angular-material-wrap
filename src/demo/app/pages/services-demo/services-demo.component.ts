import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Subject, takeUntil } from 'rxjs';
import { AmwMessagingService, Message } from '../../../../library/src/services/amw-messaging/amw-messaging.service';
import { AmwLoadingService, LoadingState } from '../../../../library/src/services/amw-loading/amw-loading.service';
import { AmwNotificationService, Notification } from '../../../../library/src/services/amw-notification/amw-notification.service';

@Component({
    selector: 'amw-demo-services',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        FormsModule
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="services-demo">
            <div class="services-header">
                <h1>Angular Services</h1>
                <p>Global services and utilities for application-wide functionality</p>
            </div>

            <div class="services-content">
                <div class="services-main">
                    <mat-card class="service-demo">
                        <mat-card-header>
                            <mat-card-title>{{ selectedService.name }}</mat-card-title>
                            <mat-card-subtitle>Interactive demo and documentation</mat-card-subtitle>
                        </mat-card-header>
                        <mat-card-content>
                            <mat-tab-group [(selectedIndex)]="selectedTab" class="service-tabs">
                                <mat-tab label="Demo" icon="play_arrow">
                                    <ng-container [ngSwitch]="selectedService.id">
                                        <div *ngSwitchCase="'messaging'" class="demo-content">
                                            <h3>Messaging Service Demo</h3>
                                            <p>This service provides centralized messaging functionality.</p>
                                            
                                            <div class="demo-section">
                                                <h4>Send Message</h4>
                                                <mat-form-field appearance="outline">
                                                    <mat-label>Title</mat-label>
                                                    <input matInput [(ngModel)]="messageTitle" placeholder="Enter message title">
                                                </mat-form-field>
                                                <mat-form-field appearance="outline">
                                                    <mat-label>Content</mat-label>
                                                    <input matInput [(ngModel)]="messageContent" placeholder="Enter message content">
                                                </mat-form-field>
                                                <div class="button-group">
                                                    <button mat-raised-button color="primary" (click)="sendMessage()">
                                                        <mat-icon>info</mat-icon>
                                                        Info
                                                    </button>
                                                    <button mat-raised-button color="accent" (click)="sendSuccessMessage()">
                                                        <mat-icon>check_circle</mat-icon>
                                                        Success
                                                    </button>
                                                    <button mat-raised-button color="warn" (click)="sendWarningMessage()">
                                                        <mat-icon>warning</mat-icon>
                                                        Warning
                                                    </button>
                                                    <button mat-raised-button color="warn" (click)="sendErrorMessage()">
                                                        <mat-icon>error</mat-icon>
                                                        Error
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div class="demo-section">
                                                <h4>Message History</h4>
                                                <div class="message-list">
                                                    <div *ngFor="let message of messages" class="message-item" [class]="'message-' + message.type">
                                                        <div class="message-header">
                                                            <mat-icon>{{ getMessageIcon(message.type) }}</mat-icon>
                                                            <span class="message-title">{{ message.title }}</span>
                                                            <button mat-icon-button (click)="removeMessage(message.id)" *ngIf="message.dismissible">
                                                                <mat-icon>close</mat-icon>
                                                            </button>
                                                        </div>
                                                        <div class="message-content">{{ message.content }}</div>
                                                        <div class="message-time">{{ message.timestamp | date:'short' }}</div>
                                                    </div>
                                                </div>
                                                <button mat-button color="warn" (click)="clearMessages()">
                                                    <mat-icon>clear</mat-icon>
                                                    Clear Messages
                                                </button>
                                            </div>
                                        </div>

                                        <div *ngSwitchCase="'loading'" class="demo-content">
                                            <h3>Loading Service Demo</h3>
                                            <p>This service manages loading states throughout the application.</p>
                                            
                                            <div class="demo-section">
                                                <h4>Loading States</h4>
                                                <button mat-raised-button color="primary" (click)="startLoading()" [disabled]="loadingState.isLoading">
                                                    <mat-icon>play_arrow</mat-icon>
                                                    Start Loading
                                                </button>
                                                <button mat-button (click)="stopLoading()" [disabled]="!loadingState.isLoading">
                                                    <mat-icon>stop</mat-icon>
                                                    Stop Loading
                                                </button>
                                                
                                                <div *ngIf="loadingState.isLoading" class="loading-demo">
                                                    <mat-spinner diameter="40"></mat-spinner>
                                                    <p>Loading in progress...</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div *ngSwitchCase="'notification'" class="demo-content">
                                            <h3>Notification Service Demo</h3>
                                            <p>This service provides various types of notifications to users.</p>
                                            
                                            <div class="demo-section">
                                                <h4>Notification Types</h4>
                                                <button mat-raised-button color="primary" (click)="showSuccessNotification()">
                                                    <mat-icon>check_circle</mat-icon>
                                                    Success
                                                </button>
                                                <button mat-raised-button color="warn" (click)="showErrorNotification()">
                                                    <mat-icon>error</mat-icon>
                                                    Error
                                                </button>
                                                <button mat-raised-button color="accent" (click)="showInfoNotification()">
                                                    <mat-icon>info</mat-icon>
                                                    Info
                                                </button>
                                            </div>
                                        </div>
                                    </ng-container>
                                </mat-tab>
                                
                                <mat-tab label="Code" icon="code">
                                    <div class="code-content">
                                        <h3>{{ selectedService.name }} Service Code</h3>
                                        <p>Code examples will be available soon.</p>
                                    </div>
                                </mat-tab>
                                
                                <mat-tab label="API" icon="description">
                                    <div class="api-content">
                                        <h3>{{ selectedService.name }} Service API</h3>
                                        <p>API documentation will be available soon.</p>
                                    </div>
                                </mat-tab>
                            </mat-tab-group>
                        </mat-card-content>
                    </mat-card>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .services-demo {
            padding: 20px;
        }
        
        .services-header h1 {
            margin-bottom: 10px;
        }
        
        .services-header p {
            margin-bottom: 20px;
            color: #666;
        }
        
        .demo-content {
            padding: 20px 0;
        }
        
        .demo-section {
            margin-bottom: 30px;
        }
        
        .message-list {
            max-height: 200px;
            overflow-y: auto;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 16px;
            background: #f9f9f9;
        }
        
        .message-item {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        
        .message-item:last-child {
            border-bottom: none;
        }
        
        .timestamp {
            float: right;
            color: #666;
            font-size: 0.8em;
        }
        
        .loading-demo {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            margin: 20px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #f9f9f9;
        }
        
        .loading-demo p {
            margin-top: 16px;
            margin-bottom: 0;
        }
        
        mat-form-field {
            width: 100%;
            margin-bottom: 16px;
        }
        
        button {
            margin-right: 8px;
            margin-bottom: 8px;
        }
    `]
})
export class ServicesDemoComponent implements OnInit, OnDestroy {
    // Service definitions
    services = [
        { id: 'messaging', name: 'Messaging Service' },
        { id: 'loading', name: 'Loading Service' },
        { id: 'notification', name: 'Notification Service' }
    ];

    selectedService = { id: 'messaging', name: 'Messaging Service' };
    selectedTab = 0; // 0 = Demo, 1 = Code, 2 = API

    // Service data
    messages: Message[] = [];
    notifications: Notification[] = [];
    loadingState: LoadingState = { isLoading: false };
    private destroy$ = new Subject<void>();

    // Form data
    messageTitle = '';
    messageContent = '';
    notificationTitle = '';
    notificationMessage = '';
    loadingMessage = 'Loading...';
    loadingProgress = 0;

    constructor(
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private messagingService: AmwMessagingService,
        private loadingService: AmwLoadingService,
        private notificationService: AmwNotificationService
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            if (data['service']) {
                const service = this.services.find(s => s.id === data['service']);
                if (service) {
                    this.selectedService = service;
                }
            }
        });

        // Subscribe to services
        this.messagingService.messages$
            .pipe(takeUntil(this.destroy$))
            .subscribe(messages => this.messages = messages);

        this.notificationService.notifications$
            .pipe(takeUntil(this.destroy$))
            .subscribe(notifications => this.notifications = notifications);

        this.loadingService.loading$
            .pipe(takeUntil(this.destroy$))
            .subscribe(state => this.loadingState = state);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // Messaging service methods
    sendMessage(): void {
        if (this.messageTitle && this.messageContent) {
            this.messagingService.info(this.messageTitle, this.messageContent);
            this.messageTitle = '';
            this.messageContent = '';
        }
    }

    sendSuccessMessage(): void {
        if (this.messageTitle && this.messageContent) {
            this.messagingService.success(this.messageTitle, this.messageContent);
        }
    }

    sendWarningMessage(): void {
        if (this.messageTitle && this.messageContent) {
            this.messagingService.warning(this.messageTitle, this.messageContent);
        }
    }

    sendErrorMessage(): void {
        if (this.messageTitle && this.messageContent) {
            this.messagingService.error(this.messageTitle, this.messageContent);
        }
    }

    clearMessages(): void {
        this.messagingService.clearMessages();
    }

    removeMessage(id: string): void {
        this.messagingService.removeMessage(id);
    }

    // Loading service methods
    startLoading(): void {
        this.loadingService.show(this.loadingMessage, { progress: this.loadingProgress });
    }

    stopLoading(): void {
        this.loadingService.hide();
    }

    updateLoadingMessage(): void {
        this.loadingService.updateMessage(this.loadingMessage);
    }

    updateLoadingProgress(): void {
        this.loadingService.updateProgress(this.loadingProgress);
    }

    // Notification service methods
    showNotification(): void {
        if (this.notificationTitle && this.notificationMessage) {
            this.notificationService.info(this.notificationTitle, this.notificationMessage);
            this.notificationTitle = '';
            this.notificationMessage = '';
        }
    }

    showSuccessNotification(): void {
        if (this.notificationTitle && this.notificationMessage) {
            this.notificationService.success(this.notificationTitle, this.notificationMessage);
        }
    }

    showWarningNotification(): void {
        if (this.notificationTitle && this.notificationMessage) {
            this.notificationService.warning(this.notificationTitle, this.notificationMessage);
        }
    }

    showErrorNotification(): void {
        if (this.notificationTitle && this.notificationMessage) {
            this.notificationService.error(this.notificationTitle, this.notificationMessage);
        }
    }

    clearNotifications(): void {
        this.notificationService.clear();
    }

    dismissNotification(id: string): void {
        this.notificationService.dismiss(id);
    }

    showInfoNotification(): void {
        this.snackBar.open('Here is some information for you.', 'Close', { duration: 3000 });
    }

    // Helper methods
    getMessageIcon(type: string): string {
        const icons = {
            info: 'info',
            success: 'check_circle',
            warning: 'warning',
            error: 'error'
        };
        return icons[type as keyof typeof icons] || 'info';
    }
}