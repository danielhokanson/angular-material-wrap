import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AmwMessagingService, Message } from '../../../../library/src/services/amw-messaging/amw-messaging.service';
import { AmwLoadingService, LoadingState } from '../../../../library/src/services/amw-loading/amw-loading.service';
import { AmwNotificationService, Notification } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwTabsComponent } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';

@Component({
    selector: 'amw-demo-services',
    standalone: true,
    imports: [CommonModule,
    MatIconModule,
    FormsModule,
    AmwTabsComponent,
    MatProgressSpinnerModule,
    AmwButtonComponent,
    AmwInputComponent],
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
        private notification: AmwNotificationService,
        public messagingService: AmwMessagingService,
        public loadingService: AmwLoadingService,
        public notificationService: AmwNotificationService
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
        this.notification.info('Info', 'Here is some information for you.', { duration: 3000 });
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

    // Messaging Service Code Examples
    messagingServiceCodeExamples = {
        basic: `<!-- Basic messaging with injection -->
import { Component } from '@angular/core';
import { AmwMessagingService } from '@angular-material-wrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AmwTabsComponent } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-my-component',
  template: \`
    <button (click)="showMessage()">Show Message</button>
  \`
})
export class MyComponent {
  constructor(private messagingService: AmwMessagingService) {}

  showMessage(): void {
    this.messagingService.info('Info', 'This is an information message');
  }
}`,

        types: `<!-- Different message types -->
export class MyComponent {
  constructor(private messagingService: AmwMessagingService) {}

  showInfo(): void {
    this.messagingService.info('Information', 'Here is some useful information');
  }

  showSuccess(): void {
    this.messagingService.success('Success', 'Operation completed successfully');
  }

  showWarning(): void {
    this.messagingService.warning('Warning', 'Please be careful with this action');
  }

  showError(): void {
    this.messagingService.error('Error', 'Something went wrong');
  }
}`,

        observable: `<!-- Subscribe to messages -->
import { OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

export class MyComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private destroy$ = new Subject<void>();

  constructor(private messagingService: AmwMessagingService) {}

  ngOnInit(): void {
    this.messagingService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = messages;
        console.log('Current messages:', messages);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,

        options: `<!-- Custom message options -->
export class MyComponent {
  constructor(private messagingService: AmwMessagingService) {}

  showCustomMessage(): void {
    const messageId = this.messagingService.info(
      'Custom Message',
      'This message has custom settings',
      {
        duration: 10000,        // 10 seconds
        dismissible: true,       // Can be manually dismissed
        actions: [
          {
            label: 'Action 1',
            action: () => console.log('Action 1 clicked'),
            style: 'primary'
          },
          {
            label: 'Cancel',
            action: () => this.messagingService.removeMessage(messageId),
            style: 'secondary'
          }
        ]
      }
    );
  }
}`,

        management: `<!-- Managing messages -->
export class MyComponent {
  constructor(private messagingService: AmwMessagingService) {}

  // Remove specific message
  removeMessage(messageId: string): void {
    this.messagingService.removeMessage(messageId);
  }

  // Clear all messages
  clearAll(): void {
    this.messagingService.clearMessages();
  }

  // Clear messages by type
  clearWarnings(): void {
    this.messagingService.clearMessagesByType('warning');
  }

  // Get current messages
  getCurrentMessages(): void {
    const messages = this.messagingService.getMessages();
    console.log('Current messages:', messages);
  }
}`,

        advanced: `<!-- Advanced usage with actions -->
export class MyComponent {
  constructor(
    private messagingService: AmwMessagingService,
    private router: Router
  ) {}

  showActionableMessage(): void {
    this.messagingService.warning(
      'Unsaved Changes',
      'You have unsaved changes. Would you like to save them?',
      {
        duration: 0, // Don't auto-dismiss
        dismissible: false, // Must use actions
        actions: [
          {
            label: 'Save',
            action: () => this.saveChanges(),
            style: 'primary'
          },
          {
            label: 'Discard',
            action: () => this.discardChanges(),
            style: 'danger'
          },
          {
            label: 'Cancel',
            action: () => this.messagingService.clearMessages(),
            style: 'secondary'
          }
        ]
      }
    );
  }

  private saveChanges(): void {
    // Save logic
    this.messagingService.clearMessages();
    this.messagingService.success('Saved', 'Changes saved successfully');
  }

  private discardChanges(): void {
    // Discard logic
    this.messagingService.clearMessages();
    this.router.navigate(['/']);
  }
}`
    };

    // Messaging Service API Documentation
    messagingServiceApiDocumentation = {
        methods: [
            {
                name: 'info(title: string, content: string, options?: Partial<Message>)',
                returns: 'string',
                description: 'Shows an info message and returns the message ID'
            },
            {
                name: 'success(title: string, content: string, options?: Partial<Message>)',
                returns: 'string',
                description: 'Shows a success message and returns the message ID'
            },
            {
                name: 'warning(title: string, content: string, options?: Partial<Message>)',
                returns: 'string',
                description: 'Shows a warning message and returns the message ID'
            },
            {
                name: 'error(title: string, content: string, options?: Partial<Message>)',
                returns: 'string',
                description: 'Shows an error message and returns the message ID'
            },
            {
                name: 'addMessage(message: Omit<Message, "id" | "timestamp">)',
                returns: 'string',
                description: 'Adds a custom message and returns the message ID'
            },
            {
                name: 'removeMessage(id: string)',
                returns: 'void',
                description: 'Removes a specific message by ID'
            },
            {
                name: 'clearMessages()',
                returns: 'void',
                description: 'Removes all messages from the queue'
            },
            {
                name: 'clearMessagesByType(type: "info" | "success" | "warning" | "error")',
                returns: 'void',
                description: 'Removes all messages of a specific type'
            },
            {
                name: 'getMessages()',
                returns: 'Message[]',
                description: 'Returns the current array of messages'
            }
        ],
        properties: [
            {
                name: 'messages$',
                type: 'Observable<Message[]>',
                description: 'Observable stream of all current messages. Subscribe to receive real-time updates when messages are added or removed.'
            }
        ]
    };

    // Loading Service Code Examples
    loadingServiceCodeExamples = {
        basic: `<!-- Basic loading state -->
import { Component } from '@angular/core';
import { AmwLoadingService } from '@angular-material-wrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AmwTabsComponent } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-my-component',
  template: \`
    <button (click)="loadData()">Load Data</button>
  \`
})
export class MyComponent {
  constructor(private loadingService: AmwLoadingService) {}

  loadData(): void {
    this.loadingService.show('Loading data...');

    // Simulate async operation
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
  }
}`,

        httpRequest: `<!-- With HTTP request -->
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

export class MyComponent {
  constructor(
    private http: HttpClient,
    private loadingService: AmwLoadingService
  ) {}

  fetchData(): void {
    const loadingId = this.loadingService.show('Fetching data...');

    this.http.get('/api/data')
      .pipe(finalize(() => this.loadingService.hide(loadingId)))
      .subscribe({
        next: (data) => console.log('Data loaded:', data),
        error: (error) => console.error('Error:', error)
      });
  }
}`,

        progress: `<!-- With progress indicator -->
export class MyComponent {
  constructor(private loadingService: AmwLoadingService) {}

  uploadFile(file: File): void {
    const loadingId = this.loadingService.show('Uploading file...', {
      progress: 0,
      overlay: true
    });

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      this.loadingService.updateProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        this.loadingService.hide(loadingId);
      }
    }, 500);
  }
}`,

        observable: `<!-- Subscribe to loading state -->
import { OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoadingState } from '@angular-material-wrap';

export class MyComponent implements OnInit, OnDestroy {
  loadingState: LoadingState = { isLoading: false };
  private destroy$ = new Subject<void>();

  constructor(private loadingService: AmwLoadingService) {}

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.loadingState = state;
        if (state.isLoading) {
          console.log('Loading:', state.message, state.progress);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,

        multiple: `<!-- Multiple concurrent loading states -->
export class MyComponent {
  constructor(private loadingService: AmwLoadingService) {}

  loadMultipleResources(): void {
    // Start multiple loading operations
    const userId = this.loadingService.show('Loading user...');
    const postsId = this.loadingService.show('Loading posts...');
    const commentsId = this.loadingService.show('Loading comments...');

    // Hide specific loading when complete
    this.fetchUser().subscribe(() => {
      this.loadingService.hide(userId);
    });

    this.fetchPosts().subscribe(() => {
      this.loadingService.hide(postsId);
    });

    this.fetchComments().subscribe(() => {
      this.loadingService.hide(commentsId);
    });
  }
}`,

        dynamic: `<!-- Dynamic message updates -->
export class MyComponent {
  constructor(private loadingService: AmwLoadingService) {}

  processData(): void {
    const loadingId = this.loadingService.show('Starting process...', {
      progress: 0
    });

    // Step 1
    this.loadingService.updateMessage('Validating data...');
    this.loadingService.updateProgress(25);

    setTimeout(() => {
      // Step 2
      this.loadingService.updateMessage('Processing records...');
      this.loadingService.updateProgress(50);

      setTimeout(() => {
        // Step 3
        this.loadingService.updateMessage('Saving results...');
        this.loadingService.updateProgress(75);

        setTimeout(() => {
          // Complete
          this.loadingService.updateProgress(100);
          this.loadingService.hide(loadingId);
        }, 1000);
      }, 1000);
    }, 1000);
  }
}`
    };

    // Loading Service API Documentation
    loadingServiceApiDocumentation = {
        methods: [
            {
                name: 'show(message?: string, options?: { progress?: number; overlay?: boolean })',
                returns: 'string',
                description: 'Shows loading state with optional message and progress. Returns a unique loading ID.'
            },
            {
                name: 'hide(id?: string)',
                returns: 'void',
                description: 'Hides loading state. If ID is provided, only hides that specific loading instance. If no ID, clears all loading states.'
            },
            {
                name: 'updateMessage(message: string)',
                returns: 'void',
                description: 'Updates the loading message while loading is active'
            },
            {
                name: 'updateProgress(progress: number)',
                returns: 'void',
                description: 'Updates the loading progress (0-100). Value is automatically clamped to valid range.'
            },
            {
                name: 'isLoading()',
                returns: 'boolean',
                description: 'Returns true if currently in a loading state'
            },
            {
                name: 'getCurrentState()',
                returns: 'LoadingState',
                description: 'Returns the current loading state object with all properties'
            },
            {
                name: 'clear()',
                returns: 'void',
                description: 'Clears all loading states immediately, regardless of IDs'
            }
        ],
        properties: [
            {
                name: 'loading$',
                type: 'Observable<LoadingState>',
                description: 'Observable stream of the current loading state. Subscribe to receive updates when loading state changes.'
            }
        ]
    };

    // Notification Service Code Examples
    notificationServiceCodeExamples = {
        basic: `<!-- Basic notification -->
import { Component } from '@angular/core';
import { AmwNotificationService } from '@angular-material-wrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AmwTabsComponent } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-my-component',
  template: \`
    <button (click)="showNotification()">Show Notification</button>
  \`
})
export class MyComponent {
  constructor(private notificationService: AmwNotificationService) {}

  showNotification(): void {
    this.notificationService.info(
      'Notification',
      'This is a basic notification'
    );
  }
}`,

        types: `<!-- Different notification types -->
export class MyComponent {
  constructor(private notificationService: AmwNotificationService) {}

  showInfo(): void {
    this.notificationService.info(
      'Information',
      'Here is some information for you'
    );
  }

  showSuccess(): void {
    this.notificationService.success(
      'Success!',
      'Your operation completed successfully'
    );
  }

  showWarning(): void {
    this.notificationService.warning(
      'Warning',
      'Please review this important information'
    );
  }

  showError(): void {
    this.notificationService.error(
      'Error',
      'An error occurred. Please try again.'
    );
  }
}`,

        options: `<!-- Custom notification options -->
export class MyComponent {
  constructor(private notificationService: AmwNotificationService) {}

  showCustomNotification(): void {
    this.notificationService.info(
      'Custom Notification',
      'This notification has custom settings',
      {
        duration: 10000,     // 10 seconds
        persistent: false,   // Auto-dismiss
        sound: true,         // Play sound
        icon: 'notifications',
        actions: [
          {
            label: 'View Details',
            action: () => this.viewDetails(),
            style: 'primary'
          },
          {
            label: 'Dismiss',
            action: () => {},
            style: 'secondary'
          }
        ]
      }
    );
  }

  viewDetails(): void {
    console.log('View details clicked');
  }
}`,

        persistent: `<!-- Persistent notification (requires manual dismissal) -->
export class MyComponent {
  constructor(private notificationService: AmwNotificationService) {}

  showPersistentNotification(): void {
    const notifId = this.notificationService.warning(
      'Important Update',
      'A new version is available. Please save your work and refresh.',
      {
        persistent: true,    // Won't auto-dismiss
        duration: 0,         // No timeout
        sound: true,
        actions: [
          {
            label: 'Refresh Now',
            action: () => window.location.reload(),
            style: 'primary'
          },
          {
            label: 'Later',
            action: () => this.notificationService.dismiss(notifId),
            style: 'secondary'
          }
        ]
      }
    );
  }
}`,

        observable: `<!-- Subscribe to notifications -->
import { OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Notification } from '@angular-material-wrap';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
export class MyComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private destroy$ = new Subject<void>();

  constructor(private notificationService: AmwNotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe(notifications => {
        this.notifications = notifications;
        console.log('Active notifications:', notifications.length);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,

        browser: `<!-- Browser notifications (native) -->
export class MyComponent {
  constructor(private notificationService: AmwNotificationService) {}

  async enableBrowserNotifications(): Promise<void> {
    // Request permission
    const permission = await this.notificationService.requestPermission();

    if (permission === 'granted') {
      // Show browser notification
      await this.notificationService.showBrowserNotification(
        'Hello!',
        'This is a native browser notification',
        {
          icon: '/assets/icon.png',
          duration: 5000
        }
      );
    }
  }

  showAppAndBrowserNotification(): void {
    // Show in-app notification
    this.notificationService.success(
      'Message Sent',
      'Your message was sent successfully'
    );

    // Also show browser notification if permitted
    this.notificationService.showBrowserNotification(
      'Message Sent',
      'Your message was sent successfully'
    );
  }
}`
    };

    // Notification Service API Documentation
    notificationServiceApiDocumentation = {
        methods: [
            {
                name: 'info(title: string, message: string, options?: NotificationOptions)',
                returns: 'string',
                description: 'Shows an info notification and returns the notification ID'
            },
            {
                name: 'success(title: string, message: string, options?: NotificationOptions)',
                returns: 'string',
                description: 'Shows a success notification and returns the notification ID'
            },
            {
                name: 'warning(title: string, message: string, options?: NotificationOptions)',
                returns: 'string',
                description: 'Shows a warning notification and returns the notification ID'
            },
            {
                name: 'error(title: string, message: string, options?: NotificationOptions)',
                returns: 'string',
                description: 'Shows an error notification and returns the notification ID'
            },
            {
                name: 'show(type: "info" | "success" | "warning" | "error", title: string, message: string, options?: NotificationOptions)',
                returns: 'string',
                description: 'Shows a notification of specified type and returns the notification ID'
            },
            {
                name: 'dismiss(id: string)',
                returns: 'void',
                description: 'Dismisses a specific notification by ID'
            },
            {
                name: 'clear()',
                returns: 'void',
                description: 'Clears all notifications'
            },
            {
                name: 'clearByType(type: "info" | "success" | "warning" | "error")',
                returns: 'void',
                description: 'Clears all notifications of a specific type'
            },
            {
                name: 'getNotifications()',
                returns: 'Notification[]',
                description: 'Returns the current array of notifications'
            },
            {
                name: 'requestPermission()',
                returns: 'Promise<NotificationPermission>',
                description: 'Requests browser notification permission. Returns "granted", "denied", or "default".'
            },
            {
                name: 'showBrowserNotification(title: string, message?: string, options?: NotificationOptions)',
                returns: 'Promise<void>',
                description: 'Shows a native browser notification (requires permission)'
            }
        ],
        properties: [
            {
                name: 'notifications$',
                type: 'Observable<Notification[]>',
                description: 'Observable stream of all active notifications. Subscribe to receive real-time updates.'
            }
        ]
    };
}