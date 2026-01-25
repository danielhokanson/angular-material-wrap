import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil, delay, of, debounceTime } from 'rxjs';
import { AmwMessagingService, Message } from '../../../../library/src/services/amw-messaging/amw-messaging.service';
import { AmwLoadingService, LoadingState } from '../../../../library/src/services/amw-loading/amw-loading.service';
import { AmwNotificationService, Notification } from '../../../../library/src/services/amw-notification/amw-notification.service';
import { AmwFullScreenLoadingService, loading, LoadingItem } from '../../../../library/src/services/amw-full-screen-loading/amw-full-screen-loading.service';
import { AmwValidationService, ValidationContext, ValidationViolation } from '../../../../library/src/services/amw-validation/amw-validation.service';
import { AmwErrorStateService, ErrorContext, ErrorItem } from '../../../../library/src/services/amw-error-state/amw-error-state.service';
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent, AmwIconComponent, AmwFullScreenLoadingComponent, AmwErrorDisplayComponent } from '../../../../library/src/components/components';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwValidationTooltipDirective } from '../../../../library/src/directives/amw-validation-tooltip/amw-validation-tooltip.directive';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

@Component({
    selector: 'amw-demo-services',
    standalone: true,
    imports: [
    CommonModule,
    FormsModule,
    AmwTabsComponent,
    AmwTabComponent,
    AmwCardComponent,
    AmwIconComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwApiDocComponent,
    AmwFullScreenLoadingComponent,
    AmwValidationTooltipDirective,
    AmwErrorDisplayComponent,
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
        { id: 'notification', name: 'Notification Service' },
        { id: 'full-screen-loading', name: 'Full Screen Loading' },
        { id: 'validation', name: 'Validation Service' },
        { id: 'error-state', name: 'Error State Service' }
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

    // Validation demo data
    validationContext!: ValidationContext;
    validationName = '';
    validationEmail = '';
    private validationInput$ = new Subject<void>();

    // Error state demo data
    errorContext!: ErrorContext;

    constructor(
        private route: ActivatedRoute,
        private notification: AmwNotificationService,
        public messagingService: AmwMessagingService,
        public loadingService: AmwLoadingService,
        public notificationService: AmwNotificationService,
        public fullScreenLoadingService: AmwFullScreenLoadingService,
        public validationService: AmwValidationService,
        public errorStateService: AmwErrorStateService
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

        // Initialize validation context
        this.validationContext = this.validationService.createContext({
            disableOnErrors: true,
            disableOnWarnings: false
        });

        // Validate on load to disable submit initially
        this.validateAll();

        // Set up debounced validation on input
        this.validationInput$
            .pipe(
                debounceTime(300),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.validateAll());

        // Initialize error context
        this.errorContext = this.errorStateService.createContext({
            autoDismissAfter: 0,
            logToConsole: true
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();

        // Clean up validation context
        if (this.validationContext) {
            this.validationService.destroyContext(this.validationContext.id);
        }

        // Clean up error context
        if (this.errorContext) {
            this.errorStateService.destroyContext(this.errorContext.id);
        }
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

    // Full Screen Loading service methods
    triggerSingleLoading(): void {
        of('result').pipe(
            delay(2000),
            loading('Loading single item...')
        ).subscribe(() => {
            this.notification.success('Complete', 'Single loading completed!', { duration: 2000 });
        });
    }

    triggerMultipleLoading(): void {
        // Trigger multiple simultaneous loading operations
        of('user').pipe(
            delay(1500),
            loading('Loading user profile...')
        ).subscribe();

        of('posts').pipe(
            delay(2500),
            loading('Loading recent posts...')
        ).subscribe();

        of('comments').pipe(
            delay(3500),
            loading('Loading comments...')
        ).subscribe(() => {
            this.notification.success('Complete', 'All data loaded!', { duration: 2000 });
        });
    }

    triggerSequentialLoading(): void {
        of('step1').pipe(
            delay(1000),
            loading('Step 1: Validating data...')
        ).subscribe(() => {
            of('step2').pipe(
                delay(1000),
                loading('Step 2: Processing records...')
            ).subscribe(() => {
                of('step3').pipe(
                    delay(1000),
                    loading('Step 3: Saving results...')
                ).subscribe(() => {
                    this.notification.success('Complete', 'All steps completed!', { duration: 2000 });
                });
            });
        });
    }

    // Validation service methods
    addNameValidation(): void {
        if (!this.validationName.trim()) {
            this.validationService.addViolation(this.validationContext.id, {
                id: 'name-required',
                message: 'Name is required',
                severity: 'error',
                field: 'name',
                validator: () => !!this.validationName.trim()
            });
        }
    }

    addEmailValidation(): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.validationEmail.trim()) {
            this.validationService.addViolation(this.validationContext.id, {
                id: 'email-required',
                message: 'Email is required',
                severity: 'error',
                field: 'email',
                validator: () => !!this.validationEmail.trim()
            });
        } else if (!emailRegex.test(this.validationEmail)) {
            this.validationService.addViolation(this.validationContext.id, {
                id: 'email-invalid',
                message: 'Please enter a valid email address',
                severity: 'error',
                field: 'email',
                validator: () => emailRegex.test(this.validationEmail)
            });
        }
    }

    addWarningValidation(): void {
        this.validationService.addViolation(this.validationContext.id, {
            id: 'name-warning',
            message: 'Name should be at least 3 characters',
            severity: 'warning',
            field: 'name',
            validator: () => this.validationName.length >= 3
        });
    }

    validateAll(): void {
        this.clearValidations();
        this.addNameValidation();
        this.addEmailValidation();
        if (this.validationName.length > 0 && this.validationName.length < 3) {
            this.addWarningValidation();
        }
    }

    onValidationInput(): void {
        this.validationInput$.next();
    }

    clearValidations(): void {
        this.validationService.clearViolations(this.validationContext.id);
    }

    submitValidationForm(): void {
        this.validateAll();
        if (!this.validationContext.hasErrors()) {
            this.notification.success('Success', 'Form submitted successfully!', { duration: 2000 });
            this.validationName = '';
            this.validationEmail = '';
            this.clearValidations();
        }
    }

    // Error State service methods
    addNetworkError(): void {
        this.errorStateService.addError(this.errorContext.id, {
            message: 'Network connection failed. Please check your internet connection.',
            code: 'ERR_NETWORK',
            severity: 'error',
            source: 'Network',
            retryAction: () => {
                this.notification.info('Retrying...', 'Attempting to reconnect', { duration: 2000 });
            }
        });
    }

    addApiError(): void {
        this.errorStateService.addError(this.errorContext.id, {
            message: 'API returned status 500: Internal Server Error',
            code: '500',
            severity: 'error',
            source: 'API',
            retryAction: () => {
                this.notification.info('Retrying...', 'Retrying API request', { duration: 2000 });
            }
        });
    }

    addValidationError(): void {
        this.errorStateService.addError(this.errorContext.id, {
            message: 'Invalid data format in response',
            code: 'VALIDATION_ERR',
            severity: 'warning',
            source: 'Validation'
        });
    }

    addInfoError(): void {
        this.errorStateService.addError(this.errorContext.id, {
            message: 'Session will expire in 5 minutes',
            code: 'SESSION_WARN',
            severity: 'info',
            source: 'Session'
        });
    }

    addExceptionError(): void {
        try {
            throw new Error('Something unexpected happened!');
        } catch (e) {
            this.errorStateService.addFromException(this.errorContext.id, e, {
                source: 'Exception',
                retryAction: () => {
                    this.notification.info('Retrying...', 'Attempting operation again', { duration: 2000 });
                }
            });
        }
    }

    clearAllErrors(): void {
        this.errorStateService.clearErrors(this.errorContext.id);
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
import { AmwTabsComponent } from '../../../../library/src/components/components/amw-tabs/amw-tabs.component';
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
    messagingServiceApiDoc: ApiDocumentation = {
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
        ],
        usageNotes: [
            'Inject the service using Angular\'s DI: constructor(private messagingService: AmwMessagingService)',
            'Four message types available: info, success, warning, and error',
            'Messages auto-dismiss based on type (info: 5s, success: 3s, warning: 7s, error: 10s)',
            'Override default duration with options parameter',
            'Subscribe to messages$ to track all active messages',
            'Add custom action buttons to messages for user interaction',
            'Set dismissible: false to prevent user from closing without action',
            'Clear specific message types while keeping others'
        ]
    };

    // Loading Service Code Examples
    loadingServiceCodeExamples = {
        basic: `<!-- Basic loading state -->
import { Component } from '@angular/core';
import { AmwLoadingService } from '@angular-material-wrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AmwTabsComponent } from '../../../../library/src/components/components/amw-tabs/amw-tabs.component';
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
    loadingServiceApiDoc: ApiDocumentation = {
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
        ],
        usageNotes: [
            'Inject the service: constructor(private loadingService: AmwLoadingService)',
            'Service maintains a stack of loading states for concurrent operations',
            'Each show() call returns a unique ID for targeted hide() operations',
            'Update progress from 0-100 for long-running operations',
            'Update loading message while operation is in progress',
            'Subscribe to loading$ to react to state changes in UI',
            'Use with RxJS finalize() operator for automatic cleanup',
            'Show overlay to prevent user interaction during loading'
        ]
    };

    // Notification Service Code Examples
    notificationServiceCodeExamples = {
        basic: `<!-- Basic notification -->
import { Component } from '@angular/core';
import { AmwNotificationService } from '@angular-material-wrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AmwTabsComponent } from '../../../../library/src/components/components/amw-tabs/amw-tabs.component';
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
    notificationServiceApiDoc: ApiDocumentation = {
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
        ],
        usageNotes: [
            'Inject the service: constructor(private notificationService: AmwNotificationService)',
            'Four types available: info, success, warning, and error',
            'Notifications auto-dismiss based on type (info: 5s, success: 3s, warning: 7s, error: 10s)',
            'Set persistent: true to require manual dismissal',
            'Optional sound plays when notification appears (enabled by default)',
            'Add action buttons for user interaction',
            'Request permission and show native browser notifications',
            'Subscribe to notifications$ to track active notifications'
        ]
    };

    // Full Screen Loading Service Code Examples
    fullScreenLoadingServiceCodeExamples = {
        basic: `// Basic usage with the loading() operator
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loading } from '@anthropic/angular-material-wrap';

@Component({
  selector: 'app-my-component',
  template: \`
    <button (click)="loadData()">Load Data</button>
    <amw-full-screen-loading></amw-full-screen-loading>
  \`
})
export class MyComponent {
  constructor(private http: HttpClient) {}

  loadData(): void {
    this.http.get('/api/data')
      .pipe(loading('Loading data...'))
      .subscribe(data => console.log('Data loaded:', data));
  }
}`,

        multiple: `// Multiple simultaneous loading operations
export class MyComponent {
  loadAllData(): void {
    // Each operation shows its own message
    this.userService.getUser(id)
      .pipe(loading('Loading user profile...'))
      .subscribe();

    this.postService.getPosts()
      .pipe(loading('Loading recent posts...'))
      .subscribe();

    this.commentService.getComments()
      .pipe(loading('Loading comments...'))
      .subscribe();

    // Messages dismiss individually as each completes
  }
}`,

        sequential: `// Sequential operations
export class MyComponent {
  processWorkflow(): void {
    this.validateData()
      .pipe(loading('Step 1: Validating data...'))
      .subscribe(() => {
        this.processRecords()
          .pipe(loading('Step 2: Processing records...'))
          .subscribe(() => {
            this.saveResults()
              .pipe(loading('Step 3: Saving results...'))
              .subscribe(() => {
                console.log('Workflow complete!');
              });
          });
      });
  }
}`,

        service: `// Direct service usage (advanced)
import { AmwFullScreenLoadingService } from '@anthropic/angular-material-wrap';

export class MyComponent {
  constructor(private fslService: AmwFullScreenLoadingService) {}

  manualLoading(): void {
    // Add loading item manually
    const id = this.fslService.add('Processing...');

    // Do some work...
    setTimeout(() => {
      // Update message
      this.fslService.updateMessage(id, 'Almost done...');

      setTimeout(() => {
        // Dismiss when complete
        this.fslService.dismiss(id);
      }, 1000);
    }, 1000);
  }

  clearAll(): void {
    // Clear all loading items immediately
    this.fslService.clear();
  }
}`,

        setup: `// App setup - add component once at root level
// app.component.html
<router-outlet></router-outlet>
<amw-full-screen-loading></amw-full-screen-loading>

// The component automatically registers itself
// and the loading() operator works anywhere in your app`
    };

    // Full Screen Loading Service API Documentation
    fullScreenLoadingServiceApiDoc: ApiDocumentation = {
        methods: [
            {
                name: 'add(message: string)',
                returns: 'string',
                description: 'Adds a loading item to the queue and returns its unique ID'
            },
            {
                name: 'dismiss(id: string)',
                returns: 'void',
                description: 'Dismisses a loading item with animation (slides right and fades)'
            },
            {
                name: 'updateMessage(id: string, message: string)',
                returns: 'void',
                description: 'Updates the message for an existing loading item'
            },
            {
                name: 'clear()',
                returns: 'void',
                description: 'Clears all loading items immediately'
            }
        ],
        properties: [
            {
                name: 'loadingItems',
                type: 'Signal<LoadingItem[]>',
                description: 'Read-only signal containing all current loading items'
            },
            {
                name: 'isLoading',
                type: 'Signal<boolean>',
                description: 'Read-only signal indicating whether any loading is active'
            },
            {
                name: 'overlayVisible',
                type: 'Signal<boolean>',
                description: 'Read-only signal for overlay visibility (for animation timing)'
            }
        ],
        usageNotes: [
            'Add <amw-full-screen-loading> once at the root of your app (e.g., app.component.html)',
            'Use the loading() operator in .pipe() for automatic loading management',
            'Multiple loading items can display simultaneously',
            'Each item dismisses individually with a smooth animation',
            'Overlay has 300ms transition for appearing/disappearing',
            'Messages slide right and fade when dismissing',
            'Supports reduced motion preferences automatically'
        ]
    };

    // Validation Service Code Examples
    validationServiceCodeExamples = {
        basic: `// Basic validation setup
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AmwValidationService, ValidationContext } from '@anthropic/angular-material-wrap';

@Component({
  selector: 'app-my-form',
  template: \`
    <input [(ngModel)]="name" (blur)="validateName()">
    <button
      [amwValidationTooltip]="validationContext"
      [disabled]="validationContext.isSubmitDisabled()"
      (click)="submit()">
      Submit
    </button>
  \`
})
export class MyFormComponent implements OnInit, OnDestroy {
  validationContext!: ValidationContext;
  name = '';

  constructor(private validationService: AmwValidationService) {}

  ngOnInit() {
    this.validationContext = this.validationService.createContext({
      disableOnErrors: true
    });
  }

  ngOnDestroy() {
    this.validationService.destroyContext(this.validationContext.id);
  }

  validateName() {
    if (!this.name.trim()) {
      this.validationService.addViolation(this.validationContext.id, {
        id: 'name-required',
        message: 'Name is required',
        severity: 'error',
        field: 'name',
        validator: () => !!this.name.trim()
      });
    }
  }

  submit() {
    if (!this.validationContext.hasErrors()) {
      // Form is valid, proceed with submission
    }
  }
}`,

        autoReevaluate: `// Auto-reevaluation with form controls
import { FormControl } from '@angular/forms';

export class MyFormComponent implements OnInit {
  nameControl = new FormControl('');

  ngOnInit() {
    this.validationContext = this.validationService.createContext({
      autoReevaluate: true,
      debounceTime: 300
    });

    // Violation will auto-clear when nameControl becomes valid
    this.validationService.addViolation(this.validationContext.id, {
      id: 'name-required',
      message: 'Name is required',
      severity: 'error',
      field: 'name',
      control: this.nameControl,  // Link to form control
      validator: () => !!this.nameControl.value?.trim()
    });
  }
}`,

        severityLevels: `// Different severity levels
export class MyFormComponent {
  validate() {
    // Error - blocks submission
    this.validationService.addViolation(this.validationContext.id, {
      id: 'email-invalid',
      message: 'Please enter a valid email',
      severity: 'error',
      field: 'email'
    });

    // Warning - shown but may not block submission
    this.validationService.addViolation(this.validationContext.id, {
      id: 'password-weak',
      message: 'Password could be stronger',
      severity: 'warning',
      field: 'password'
    });

    // Info - informational, never blocks
    this.validationService.addViolation(this.validationContext.id, {
      id: 'name-hint',
      message: 'Use your legal name for official documents',
      severity: 'info',
      field: 'name'
    });
  }
}`,

        tooltip: `// Validation tooltip directive
// Shows violations on hover when button is disabled

<button
  [amwValidationTooltip]="validationContext"
  [tooltipPosition]="'top'"
  [autoDisable]="true">
  Submit
</button>

// The tooltip will show all errors, warnings, and info messages
// grouped by severity when the user hovers over the disabled button`,

        mixin: `// Using the ValidationMixin for cleaner code
import { ValidationMixin, AmwValidationService } from '@anthropic/angular-material-wrap';

export class MyFormComponent extends ValidationMixin implements OnInit, OnDestroy {
  constructor(private validationSvc: AmwValidationService) {
    super();
  }

  ngOnInit() {
    this.initializeValidation(this.validationSvc, { disableOnErrors: true });
  }

  ngOnDestroy() {
    this.destroyValidation();
  }

  validate() {
    // Use inherited methods
    this.addViolation({
      id: 'name-required',
      message: 'Name is required',
      severity: 'error'
    });

    // Access inherited getters
    if (this.hasErrors) {
      console.log('Form has errors:', this.violations);
    }
  }
}`
    };

    // Validation Service API Documentation
    validationServiceApiDoc: ApiDocumentation = {
        methods: [
            {
                name: 'createContext(config?: Partial<ValidationConfig>)',
                returns: 'ValidationContext',
                description: 'Creates a new validation context for a component'
            },
            {
                name: 'destroyContext(contextId: string)',
                returns: 'void',
                description: 'Destroys a validation context and cleans up subscriptions'
            },
            {
                name: 'addViolation(contextId: string, violation: Omit<ValidationViolation, "id">)',
                returns: 'string',
                description: 'Adds a violation to a context and returns the violation ID'
            },
            {
                name: 'removeViolation(contextId: string, violationId: string)',
                returns: 'void',
                description: 'Removes a specific violation from a context'
            },
            {
                name: 'clearViolations(contextId: string)',
                returns: 'void',
                description: 'Clears all violations from a context'
            },
            {
                name: 'getViolations(contextId: string)',
                returns: 'ValidationViolation[]',
                description: 'Gets all violations for a context'
            },
            {
                name: 'getFieldViolations(contextId: string, field: string)',
                returns: 'ValidationViolation[]',
                description: 'Gets violations for a specific field'
            },
            {
                name: 'reevaluate(contextId: string)',
                returns: 'void',
                description: 'Reevaluates all violations using their validators'
            }
        ],
        properties: [
            {
                name: 'ValidationContext.violations',
                type: 'Signal<ValidationViolation[]>',
                description: 'Signal containing all current violations'
            },
            {
                name: 'ValidationContext.hasErrors',
                type: 'Signal<boolean>',
                description: 'Signal indicating whether any error violations exist'
            },
            {
                name: 'ValidationContext.hasWarnings',
                type: 'Signal<boolean>',
                description: 'Signal indicating whether any warning violations exist'
            },
            {
                name: 'ValidationContext.isSubmitDisabled',
                type: 'Signal<boolean>',
                description: 'Signal indicating whether submit should be disabled based on config'
            }
        ],
        usageNotes: [
            'Create a context in ngOnInit and destroy it in ngOnDestroy',
            'Each violation has a unique ID for targeted removal',
            'Violations can be linked to form controls for auto-reevaluation',
            'Custom validator functions allow complex validation logic',
            'Use the amwValidationTooltip directive to show violations on disabled buttons',
            'Three severity levels: error, warning, info',
            'Configure disableOnErrors/disableOnWarnings to control submit button state'
        ]
    };

    // Error State Service Code Examples
    errorStateServiceCodeExamples = {
        basic: `// Basic error state setup
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AmwErrorStateService, ErrorContext } from '@anthropic/angular-material-wrap';

@Component({
  selector: 'app-my-component',
  template: \`
    <amw-error-display [context]="errorContext"></amw-error-display>
    <button (click)="loadData()">Load Data</button>
  \`
})
export class MyComponent implements OnInit, OnDestroy {
  errorContext!: ErrorContext;

  constructor(private errorStateService: AmwErrorStateService) {}

  ngOnInit() {
    this.errorContext = this.errorStateService.createContext({
      autoDismissAfter: 5000,  // Auto-dismiss after 5 seconds
      logToConsole: true
    });
  }

  ngOnDestroy() {
    this.errorStateService.destroyContext(this.errorContext.id);
  }

  loadData() {
    this.http.get('/api/data').subscribe({
      error: (err) => this.handleError(err)
    });
  }

  handleError(error: HttpErrorResponse) {
    this.errorStateService.addError(this.errorContext.id, {
      message: error.message,
      code: error.status.toString(),
      severity: 'error',
      source: 'API'
    });
  }
}`,

        exception: `// Handle caught exceptions
export class MyComponent {
  processData() {
    try {
      // Some operation that might fail
      riskyOperation();
    } catch (e) {
      this.errorStateService.addFromException(this.errorContext.id, e, {
        source: 'Data Processing',
        severity: 'error',
        retryAction: () => this.processData()
      });
    }
  }
}`,

        severityLevels: `// Different error severity levels
export class MyComponent {
  showErrors() {
    // Critical error
    this.errorStateService.addError(this.errorContext.id, {
      message: 'Database connection failed',
      severity: 'error',
      source: 'Database'
    });

    // Warning
    this.errorStateService.addError(this.errorContext.id, {
      message: 'Cache is nearly full (90%)',
      severity: 'warning',
      source: 'Cache'
    });

    // Informational
    this.errorStateService.addError(this.errorContext.id, {
      message: 'New version available',
      severity: 'info',
      source: 'Update'
    });
  }
}`,

        retryAction: `// Errors with retry actions
export class MyComponent {
  fetchUser(userId: string) {
    this.http.get(\`/api/users/\${userId}\`).subscribe({
      next: (user) => this.user = user,
      error: (err) => {
        this.errorStateService.addError(this.errorContext.id, {
          message: \`Failed to load user: \${err.message}\`,
          code: err.status,
          severity: 'error',
          source: 'User API',
          // Retry action - called when user clicks "Retry" button
          retryAction: () => this.fetchUser(userId)
        });
      }
    });
  }
}`,

        displayComponent: `// Using the error display component
<amw-error-display
  [context]="errorContext"
  mode="inline"
  position="top"
  [showDismiss]="true"
  [showRetry]="true"
  [maxVisible]="5"
  severityFilter="all"
  (errorDismissed)="onErrorDismissed($event)"
  (errorRetried)="onErrorRetried($event)">
</amw-error-display>

// Display modes: 'banner', 'inline', 'toast', 'list'
// Position: 'top', 'bottom' (for banner/toast modes)`
    };

    // Error State Service API Documentation
    errorStateServiceApiDoc: ApiDocumentation = {
        methods: [
            {
                name: 'createContext(config?: Partial<ErrorStateConfig>)',
                returns: 'ErrorContext',
                description: 'Creates a new error context for a component'
            },
            {
                name: 'destroyContext(contextId: string)',
                returns: 'void',
                description: 'Destroys an error context and cleans up timers'
            },
            {
                name: 'addError(contextId: string, error: Partial<ErrorItem>)',
                returns: 'string',
                description: 'Adds an error to a context and returns the error ID'
            },
            {
                name: 'addFromException(contextId: string, error: Error | unknown, options?)',
                returns: 'string',
                description: 'Adds an error from a caught exception'
            },
            {
                name: 'dismissError(contextId: string, errorId: string)',
                returns: 'void',
                description: 'Dismisses an error (marks it as dismissed but keeps in list)'
            },
            {
                name: 'removeError(contextId: string, errorId: string)',
                returns: 'void',
                description: 'Removes an error completely from the context'
            },
            {
                name: 'clearErrors(contextId: string)',
                returns: 'void',
                description: 'Clears all errors from a context'
            },
            {
                name: 'getErrors(contextId: string)',
                returns: 'ErrorItem[]',
                description: 'Gets all errors for a context'
            },
            {
                name: 'getActiveErrors(contextId: string)',
                returns: 'ErrorItem[]',
                description: 'Gets only non-dismissed errors'
            },
            {
                name: 'retryError(contextId: string, errorId: string)',
                returns: 'void',
                description: 'Executes the retry action for an error if available'
            }
        ],
        properties: [
            {
                name: 'ErrorContext.errors',
                type: 'Signal<ErrorItem[]>',
                description: 'Signal containing all errors in the context'
            },
            {
                name: 'ErrorContext.hasErrors',
                type: 'Signal<boolean>',
                description: 'Signal indicating whether any error-severity items exist'
            },
            {
                name: 'ErrorContext.hasWarnings',
                type: 'Signal<boolean>',
                description: 'Signal indicating whether any warning-severity items exist'
            },
            {
                name: 'ErrorContext.errorCount',
                type: 'Signal<number>',
                description: 'Signal with count of active (non-dismissed) errors'
            },
            {
                name: 'errors$',
                type: 'Observable<ErrorItem>',
                description: 'Observable that emits when new errors are added'
            }
        ],
        usageNotes: [
            'Create a context in ngOnInit and destroy it in ngOnDestroy',
            'Use addFromException() for caught errors to auto-extract message and code',
            'Configure autoDismissAfter to auto-dismiss errors after a duration',
            'Add retryAction to errors that can be retried by the user',
            'Use AmwErrorDisplayComponent for consistent error UI',
            'Three severity levels: error, warning, info',
            'Error history is tracked globally for debugging'
        ]
    };
}
