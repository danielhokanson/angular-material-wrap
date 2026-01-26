import { Component, OnDestroy, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AmwEventBusService, BusEvent } from '../../../../library/src/services/amw-event-bus/amw-event-bus.service';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwDemoDocComponent } from '../../shared/components/demo-doc/demo-doc.component';

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
        MatCardModule,
        AmwCardComponent,
        AmwButtonComponent,
        AmwInputComponent,
        AmwDemoDocComponent
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <amw-demo-doc
            title="Event Bus Service"
            description="A lightweight pub/sub event bus for decoupled component communication.">

            <h3>Interactive Demo</h3>
            <p>Publish events and see them being received by subscribers.</p>

            <div class="demo-grid">
                <amw-card class="demo-card">
                    <mat-card-header>
                        <h4>Publisher</h4>
                    </mat-card-header>
                    <mat-card-content>
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
                    </mat-card-content>
                </amw-card>

                <amw-card class="demo-card">
                    <mat-card-header>
                        <h4>Subscriber</h4>
                    </mat-card-header>
                    <mat-card-content>
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
                    </mat-card-content>
                </amw-card>
            </div>

            <amw-card class="demo-card">
                <mat-card-header>
                    <h4>Event Log</h4>
                    <amw-button
                        appearance="text"
                        (buttonClick)="clearLog()">
                        Clear
                    </amw-button>
                </mat-card-header>
                <mat-card-content>
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
                </mat-card-content>
            </amw-card>

            <amw-card class="demo-card">
                <mat-card-header>
                    <h4>Statistics</h4>
                </mat-card-header>
                <mat-card-content>
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
                </mat-card-content>
            </amw-card>

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

            <h3>API Reference</h3>
            <table class="api-table">
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>Returns</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>publish(event)</code></td>
                        <td>void</td>
                        <td>Publish an event with type and payload</td>
                    </tr>
                    <tr>
                        <td><code>emit(object)</code></td>
                        <td>void</td>
                        <td>Emit an object (uses constructor name as type)</td>
                    </tr>
                    <tr>
                        <td><code>on&lt;T&gt;(type)</code></td>
                        <td>Observable&lt;T&gt;</td>
                        <td>Subscribe to events of a specific type</td>
                    </tr>
                    <tr>
                        <td><code>all()</code></td>
                        <td>Observable&lt;BusEvent&gt;</td>
                        <td>Subscribe to all events</td>
                    </tr>
                    <tr>
                        <td><code>subscribe(type, handler)</code></td>
                        <td>() => void</td>
                        <td>Subscribe with callback, returns unsubscribe function</td>
                    </tr>
                    <tr>
                        <td><code>unsubscribe(type, handler)</code></td>
                        <td>void</td>
                        <td>Manually unsubscribe a handler</td>
                    </tr>
                    <tr>
                        <td><code>getSubscriberCount(type)</code></td>
                        <td>number</td>
                        <td>Get count of subscribers for an event type</td>
                    </tr>
                    <tr>
                        <td><code>hasSubscribers(type)</code></td>
                        <td>boolean</td>
                        <td>Check if event type has subscribers</td>
                    </tr>
                    <tr>
                        <td><code>getActiveEventTypes()</code></td>
                        <td>string[]</td>
                        <td>Get list of event types with subscribers</td>
                    </tr>
                    <tr>
                        <td><code>getStatistics()</code></td>
                        <td>EventBusStatistics</td>
                        <td>Get usage statistics</td>
                    </tr>
                    <tr>
                        <td><code>clearSubscribers(type)</code></td>
                        <td>void</td>
                        <td>Clear all subscribers for an event type</td>
                    </tr>
                    <tr>
                        <td><code>clearAllSubscribers()</code></td>
                        <td>void</td>
                        <td>Clear all subscribers</td>
                    </tr>
                </tbody>
            </table>

        </amw-demo-doc>
    `,
    styles: [`
        .demo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 24px;
            margin-bottom: 24px;
        }

        .demo-card {
            margin-bottom: 24px;

            mat-card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
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

        .api-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;

            th, td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid var(--md-sys-color-outline-variant, #cac4d0);
            }

            th {
                background: var(--md-sys-color-surface-container, #f3edf7);
                font-weight: 500;
            }

            code {
                background: var(--md-sys-color-surface-container-high, #ece6f0);
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 13px;
            }
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
