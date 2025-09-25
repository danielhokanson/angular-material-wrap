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
    templateUrl: './services-demo.component.html',
    styleUrl: './services-demo.component.scss'
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