import { Component, OnDestroy, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmwEventBusService, BusEvent } from '../../../../library/src/services/amw-event-bus/amw-event-bus.service';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwTabsComponent } from '../../../../library/src/components/components/amw-tabs/amw-tabs.component';
import { AmwTabComponent } from '../../../../library/src/components/components/amw-tabs/amw-tab.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

interface EventLogEntry {
    timestamp: Date;
    type: string;
    payload: unknown;
}

@Component({
    selector: 'amw-event-bus-demo',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        AmwCardComponent,
        AmwButtonComponent,
        AmwInputComponent,
        AmwTabsComponent,
        AmwTabComponent,
        AmwApiDocComponent
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="event-bus-demo-page">
            <div class="event-bus-demo-page__header">
                <h1>Event Bus Service</h1>
                <p>A lightweight pub/sub event bus for decoupled component communication.</p>
            </div>

            <amw-card>
                <ng-template #cardContent>
                    <amw-tabs>
                        <amw-tab label="Demo" icon="play_arrow">
                            <h3>Interactive Demo</h3>
                            <p>Publish events and see them being received by subscribers.</p>

                            <div class="demo-grid">
                                <amw-card headerTitle="Publisher" class="demo-card">
                                    <ng-template #cardContent>
                                        <div class="publisher-form">
                                            <amw-input
                                                label="Event Type"
                                                [(ngModel)]="eventType"
                                                hint="e.g., user:login, cart:updated" />

                                            <amw-input
                                                label="Payload (JSON)"
                                                [(ngModel)]="eventPayload"
                                                hint='e.g., {"user": "john"}' />

                                            <div class="button-row">
                                                <amw-button
                                                    appearance="filled"
                                                    (buttonClick)="publishEvent()">
                                                    Publish Event
                                                </amw-button>
                                                <amw-button
                                                    appearance="outlined"
                                                    (buttonClick)="emitObject()">
                                                    Emit Object
                                                </amw-button>
                                            </div>
                                        </div>

                                        <h5>Quick Events</h5>
                                        <div class="quick-events">
                                            <amw-button
                                                appearance="outlined"
                                                color="primary"
                                                (buttonClick)="publishQuickEvent('user:login', { username: 'john_doe' })">
                                                User Login
                                            </amw-button>
                                            <amw-button
                                                appearance="outlined"
                                                color="accent"
                                                (buttonClick)="publishQuickEvent('cart:updated', { items: 3, total: 99.99 })">
                                                Cart Updated
                                            </amw-button>
                                            <amw-button
                                                appearance="outlined"
                                                color="warn"
                                                (buttonClick)="publishQuickEvent('notification:error', { message: 'Something went wrong' })">
                                                Error Event
                                            </amw-button>
                                        </div>
                                    </ng-template>
                                </amw-card>

                                <amw-card headerTitle="Subscriber" class="demo-card">
                                    <ng-template #cardContent>
                                        <div class="subscriber-controls">
                                            <amw-input
                                                label="Subscribe to Event Type"
                                                [(ngModel)]="subscribeType"
                                                hint="Leave empty to subscribe to all" />

                                            <div class="button-row">
                                                <amw-button
                                                    appearance="filled"
                                                    (buttonClick)="subscribe()">
                                                    Subscribe
                                                </amw-button>
                                                <amw-button
                                                    appearance="outlined"
                                                    (buttonClick)="unsubscribeAll()">
                                                    Unsubscribe All
                                                </amw-button>
                                            </div>
                                        </div>

                                        <h5>Active Subscriptions</h5>
                                        <div class="subscriptions-list">
                                            @if (subscriptions().length === 0) {
                                                <p class="empty-text">No active subscriptions</p>
                                            }
                                            @for (sub of subscriptions(); track sub) {
                                                <div class="subscription-item">
                                                    <span>{{ sub || 'All Events' }}</span>
                                                    <button class="remove-btn" (click)="unsubscribe(sub)">x</button>
                                                </div>
                                            }
                                        </div>
                                    </ng-template>
                                </amw-card>
                            </div>

                            <amw-card headerTitle="Event Log" class="demo-card">
                                <ng-template #cardContent>
                                    <div style="display: flex; justify-content: flex-end; margin-bottom: 8px;">
                                        <amw-button
                                            appearance="text"
                                            (buttonClick)="clearLog()">
                                            Clear
                                        </amw-button>
                                    </div>
                                    <div class="event-log">
                                        @if (eventLog().length === 0) {
                                            <p class="empty-text">No events received yet. Subscribe to an event type and publish events to see them here.</p>
                                        }
                                        @for (entry of eventLog(); track entry.timestamp) {
                                            <div class="log-entry">
                                                <span class="log-time">{{ entry.timestamp | date:'HH:mm:ss.SSS' }}</span>
                                                <span class="log-type">{{ entry.type }}</span>
                                                <span class="log-payload">{{ entry.payload | json }}</span>
                                            </div>
                                        }
                                    </div>
                                </ng-template>
                            </amw-card>

                            <amw-card headerTitle="Statistics" class="demo-card">
                                <ng-template #cardContent>
                                    <div class="stats-grid">
                                        <div class="stat-item">
                                            <span class="stat-value">{{ statistics().totalEvents }}</span>
                                            <span class="stat-label">Events Published</span>
                                        </div>
                                        <div class="stat-item">
                                            <span class="stat-value">{{ statistics().activeEventTypes }}</span>
                                            <span class="stat-label">Event Types</span>
                                        </div>
                                        <div class="stat-item">
                                            <span class="stat-value">{{ statistics().totalSubscribers }}</span>
                                            <span class="stat-label">Active Subscribers</span>
                                        </div>
                                        <div class="stat-item">
                                            <span class="stat-value">{{ activeEventTypes().length }}</span>
                                            <span class="stat-label">Event Types</span>
                                        </div>
                                    </div>
                                    <div class="event-types">
                                        <h5>Active Event Types:</h5>
                                        @if (activeEventTypes().length === 0) {
                                            <p class="empty-text">No active event types</p>
                                        } @else {
                                            <div class="type-list">
                                                @for (type of activeEventTypes(); track type) {
                                                    <span class="type-badge">
                                                        {{ type }} ({{ eventBus.getSubscriberCount(type) }})
                                                    </span>
                                                }
                                            </div>
                                        }
                                    </div>
                                </ng-template>
                            </amw-card>
                        </amw-tab>

                        <amw-tab label="Code" icon="code">
                            <div class="code-content">
                                <h3>Code Examples</h3>
                                <pre><code>import {{ '{' }} AmwEventBusService {{ '}' }} from '&#64;anthropic/angular-material-wrap';

&#64;Component({{ '{' }}...{{ '}' }})
export class MyComponent implements OnDestroy {{ '{' }}
  private unsubscribe?: () => void;

  constructor(private eventBus: AmwEventBusService) {{ '{' }}{{ '}' }}

  ngOnInit() {{ '{' }}
    // Subscribe to specific event type
    this.unsubscribe = this.eventBus.subscribe('user:login', (user) => {{ '{' }}
      console.log('User logged in:', user);
    {{ '}' }});

    // Or use Observable API
    this.eventBus.on&lt;User&gt;('user:login')
      .pipe(takeUntilDestroyed())
      .subscribe(user => console.log(user));

    // Subscribe to all events
    this.eventBus.all()
      .subscribe(event => console.log(event.type, event.payload));
  {{ '}' }}

  ngOnDestroy() {{ '{' }}
    // Clean up subscription
    this.unsubscribe?.();
  {{ '}' }}

  // Publishing events
  onLogin(user: User) {{ '{' }}
    this.eventBus.publish({{ '{' }}
      type: 'user:login',
      payload: user
    {{ '}' }});
  {{ '}' }}

  // Alternative: emit object directly
  onCartUpdate(cart: Cart) {{ '{' }}
    this.eventBus.emit(cart);
  {{ '}' }}
{{ '}' }}</code></pre>
                            </div>
                        </amw-tab>

                        <amw-tab label="API" icon="description">
                            <div class="api-content">
                                <amw-api-doc
                                    componentName="Event Bus Service"
                                    [apiDocumentation]="eventBusApiDoc"
                                    description="A lightweight pub/sub event bus for decoupled component communication.">
                                </amw-api-doc>
                            </div>
                        </amw-tab>
                    </amw-tabs>
                </ng-template>
            </amw-card>
        </div>
    `,
    styles: [`
        .event-bus-demo-page {
            padding: 24px;
            max-width: 1400px;
            margin: 0 auto;

            &__header {
                margin-bottom: 24px;
                h1 { margin: 0 0 8px 0; }
                p { margin: 0; }
            }
        }

        .code-content {
            padding: 20px 0;

            h3 { margin-top: 0; }
        }

        .api-content {
            padding: 20px 0;
        }

        .demo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 24px;
            margin-bottom: 24px;
        }

        .demo-card {
            margin-bottom: 24px;
        }

        .publisher-form,
        .subscriber-controls {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .button-row {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        .quick-events {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 8px;
        }

        .subscriptions-list {
            margin-top: 8px;
        }

        .subscription-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            background: var(--md-sys-color-surface-container, #f3edf7);
            border-radius: 8px;
            margin-bottom: 8px;
        }

        .remove-btn {
            background: none;
            border: none;
            color: var(--md-sys-color-error, #ba1a1a);
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;

            &:hover {
                background: var(--md-sys-color-error-container, #ffdad6);
            }
        }

        .event-log {
            max-height: 300px;
            overflow-y: auto;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 13px;
        }

        .log-entry {
            display: flex;
            gap: 12px;
            padding: 8px;
            border-bottom: 1px solid var(--md-sys-color-outline-variant, #cac4d0);

            &:last-child {
                border-bottom: none;
            }
        }

        .log-time {
            color: var(--md-sys-color-on-surface-variant, #49454f);
            min-width: 100px;
        }

        .log-type {
            color: var(--md-sys-color-primary, #6750a4);
            font-weight: 500;
            min-width: 150px;
        }

        .log-payload {
            color: var(--md-sys-color-on-surface, #1d1b20);
            flex: 1;
            word-break: break-all;
        }

        .empty-text {
            color: var(--md-sys-color-on-surface-variant, #49454f);
            font-style: italic;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }

        .stat-item {
            text-align: center;
            padding: 16px;
            background: var(--md-sys-color-surface-container, #f3edf7);
            border-radius: 12px;
        }

        .stat-value {
            display: block;
            font-size: 32px;
            font-weight: 500;
            color: var(--md-sys-color-primary, #6750a4);
        }

        .stat-label {
            display: block;
            font-size: 12px;
            color: var(--md-sys-color-on-surface-variant, #49454f);
            margin-top: 4px;
        }

        .event-types {
            h5 {
                margin-bottom: 8px;
            }
        }

        .type-list {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }

        .type-badge {
            padding: 4px 12px;
            background: var(--md-sys-color-secondary-container, #e8def8);
            color: var(--md-sys-color-on-secondary-container, #1d192b);
            border-radius: 16px;
            font-size: 13px;
        }

        pre {
            background: var(--md-sys-color-surface-container, #f3edf7);
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;

            code {
                font-family: 'Monaco', 'Consolas', monospace;
                font-size: 13px;
            }
        }
    `]
})
export class EventBusDemoComponent implements OnDestroy {
    eventType = 'user:action';
    eventPayload = '{"action": "click", "target": "button"}';
    subscribeType = '';

    subscriptions = signal<string[]>([]);
    eventLog = signal<EventLogEntry[]>([]);

    private unsubscribeFunctions: Map<string, () => void> = new Map();
    private allEventsUnsubscribe?: () => void;

    eventBusApiDoc: ApiDocumentation = {
        methods: [
            { name: 'publish(event: BusEvent)', returns: 'void', description: 'Publish an event with type and payload' },
            { name: 'emit(object: any)', returns: 'void', description: 'Emit an object (uses constructor name as type)' },
            { name: 'on<T>(type: string)', returns: 'Observable<T>', description: 'Subscribe to events of a specific type' },
            { name: 'all()', returns: 'Observable<BusEvent>', description: 'Subscribe to all events' },
            { name: 'subscribe(type: string, handler: Function)', returns: '() => void', description: 'Subscribe with callback, returns unsubscribe function' },
            { name: 'unsubscribe(type: string, handler: Function)', returns: 'void', description: 'Manually unsubscribe a handler' },
            { name: 'getSubscriberCount(type: string)', returns: 'number', description: 'Get count of subscribers for an event type' },
            { name: 'hasSubscribers(type: string)', returns: 'boolean', description: 'Check if event type has subscribers' },
            { name: 'getActiveEventTypes()', returns: 'string[]', description: 'Get list of event types with subscribers' },
            { name: 'getStatistics()', returns: 'EventBusStatistics', description: 'Get usage statistics' },
            { name: 'clearSubscribers(type: string)', returns: 'void', description: 'Clear all subscribers for an event type' },
            { name: 'clearAllSubscribers()', returns: 'void', description: 'Clear all subscribers' }
        ],
        usageNotes: [
            'Inject the service: constructor(public eventBus: AmwEventBusService)',
            'Use publish() to emit typed events with payloads',
            'Use on<T>() for RxJS Observable-based subscriptions',
            'Use subscribe() for callback-based subscriptions (returns unsubscribe function)',
            'Remember to unsubscribe in ngOnDestroy to avoid memory leaks',
            'Use emit() to emit plain objects using their constructor name as the event type'
        ]
    };

    constructor(public eventBus: AmwEventBusService) {}

    ngOnDestroy(): void {
        this.unsubscribeFunctions.forEach(unsub => unsub());
        this.allEventsUnsubscribe?.();
    }

    publishEvent(): void {
        try {
            const payload = JSON.parse(this.eventPayload);
            this.eventBus.publish({
                type: this.eventType,
                payload
            });
        } catch {
            this.eventBus.publish({
                type: this.eventType,
                payload: this.eventPayload
            });
        }
    }

    publishQuickEvent(type: string, payload: unknown): void {
        this.eventBus.publish({ type, payload });
    }

    emitObject(): void {
        try {
            const obj = JSON.parse(this.eventPayload);
            this.eventBus.emit(obj);
        } catch {
            alert('Invalid JSON for object emit');
        }
    }

    subscribe(): void {
        const type = this.subscribeType.trim();

        if (type) {
            if (this.unsubscribeFunctions.has(type)) {
                return; // Already subscribed
            }

            const unsub = this.eventBus.subscribe(type, (payload) => {
                this.addToLog(type, payload);
            });

            this.unsubscribeFunctions.set(type, unsub);
            this.subscriptions.update(subs => [...subs, type]);
        } else {
            // Subscribe to all events
            if (this.allEventsUnsubscribe) {
                return; // Already subscribed to all
            }

            const subscription = this.eventBus.all().subscribe((event: BusEvent) => {
                this.addToLog(event.type, event.payload);
            });

            this.allEventsUnsubscribe = () => subscription.unsubscribe();
            this.subscriptions.update(subs => [...subs, '']);
        }

        this.subscribeType = '';
    }

    unsubscribe(type: string): void {
        if (type === '') {
            this.allEventsUnsubscribe?.();
            this.allEventsUnsubscribe = undefined;
        } else {
            const unsub = this.unsubscribeFunctions.get(type);
            unsub?.();
            this.unsubscribeFunctions.delete(type);
        }

        this.subscriptions.update(subs => subs.filter(s => s !== type));
    }

    unsubscribeAll(): void {
        this.unsubscribeFunctions.forEach(unsub => unsub());
        this.unsubscribeFunctions.clear();
        this.allEventsUnsubscribe?.();
        this.allEventsUnsubscribe = undefined;
        this.subscriptions.set([]);
    }

    clearLog(): void {
        this.eventLog.set([]);
    }

    statistics() {
        return this.eventBus.getStatistics();
    }

    activeEventTypes() {
        return this.eventBus.getActiveEventTypes();
    }

    private addToLog(type: string, payload: unknown): void {
        this.eventLog.update(log => [{
            timestamp: new Date(),
            type,
            payload
        }, ...log.slice(0, 49)]); // Keep last 50 entries
    }
}
