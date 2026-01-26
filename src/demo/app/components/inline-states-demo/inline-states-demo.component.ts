import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwInlineLoadingComponent } from '../../../../library/src/components/components/amw-inline-loading/amw-inline-loading.component';
import { AmwInlineErrorComponent } from '../../../../library/src/components/components/amw-inline-error/amw-inline-error.component';
import { AmwInlineEmptyComponent } from '../../../../library/src/components/components/amw-inline-empty/amw-inline-empty.component';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwDemoDocComponent } from '../../shared/components/demo-doc/demo-doc.component';

type DemoState = 'loading' | 'error' | 'empty' | 'data';

@Component({
    selector: 'amw-inline-states-demo',
    standalone: true,
    imports: [
        CommonModule,
        AmwInlineLoadingComponent,
        AmwInlineErrorComponent,
        AmwInlineEmptyComponent,
        AmwCardComponent,
        AmwButtonComponent,
        AmwDemoDocComponent
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <amw-demo-doc
            title="Inline State Components"
            description="Standardized components for displaying loading, error, and empty states within cards and sections.">

            <h3>Interactive Demo</h3>
            <p>Click the buttons below to see different states:</p>

            <div class="demo-state-buttons">
                <amw-button
                    appearance="outlined"
                    [color]="currentState() === 'loading' ? 'primary' : 'primary'"
                    (buttonClick)="setState('loading')">
                    Loading
                </amw-button>
                <amw-button
                    appearance="outlined"
                    [color]="currentState() === 'error' ? 'warn' : 'primary'"
                    (buttonClick)="setState('error')">
                    Error
                </amw-button>
                <amw-button
                    appearance="outlined"
                    (buttonClick)="setState('empty')">
                    Empty
                </amw-button>
                <amw-button
                    appearance="outlined"
                    (buttonClick)="setState('data')">
                    Data
                </amw-button>
            </div>

            <amw-card class="demo-card" headerTitle="Dynamic State Example">
                <ng-template #cardContent>
                    @switch (currentState()) {
                        @case ('loading') {
                            <amw-inline-loading message="Loading data..." [size]="32" />
                        }
                        @case ('error') {
                            <amw-inline-error
                                message="Failed to load data. Please try again."
                                [showRetry]="true"
                                (retry)="onRetry()" />
                        }
                        @case ('empty') {
                            <amw-inline-empty
                                message="No items found"
                                icon="inbox"
                                actionLabel="Create Item"
                                (action)="onCreateItem()" />
                        }
                        @case ('data') {
                            <div class="demo-data-content">
                                <p>This is the actual data content that would be displayed when data is available.</p>
                                <ul>
                                    <li>Item 1</li>
                                    <li>Item 2</li>
                                    <li>Item 3</li>
                                </ul>
                            </div>
                        }
                    }
                </ng-template>
            </amw-card>

            <h3>Inline Loading</h3>
            <p>Displays a centered loading spinner with an optional message.</p>

            <div class="demo-examples">
                <amw-card class="demo-example-card" headerTitle="Basic Loading">
                    <ng-template #cardContent>
                        <amw-inline-loading />
                    </ng-template>
                </amw-card>

                <amw-card class="demo-example-card" headerTitle="With Message">
                    <ng-template #cardContent>
                        <amw-inline-loading message="Loading data..." />
                    </ng-template>
                </amw-card>

                <amw-card class="demo-example-card" headerTitle="Custom Size">
                    <ng-template #cardContent>
                        <amw-inline-loading [size]="48" message="Please wait..." />
                    </ng-template>
                </amw-card>
            </div>

            <h3>Inline Error</h3>
            <p>Displays an error message with an icon and optional retry button.</p>

            <div class="demo-examples">
                <amw-card class="demo-example-card" headerTitle="With Retry">
                    <ng-template #cardContent>
                        <amw-inline-error
                            message="Failed to load data"
                            [showRetry]="true"
                            (retry)="onRetry()" />
                    </ng-template>
                </amw-card>

                <amw-card class="demo-example-card" headerTitle="Without Retry">
                    <ng-template #cardContent>
                        <amw-inline-error
                            message="Access denied"
                            icon="lock"
                            [showRetry]="false" />
                    </ng-template>
                </amw-card>

                <amw-card class="demo-example-card" headerTitle="Custom Icon">
                    <ng-template #cardContent>
                        <amw-inline-error
                            message="Network connection lost"
                            icon="wifi_off"
                            [showRetry]="true"
                            (retry)="onRetry()" />
                    </ng-template>
                </amw-card>
            </div>

            <h3>Inline Empty</h3>
            <p>Displays an empty state with an icon and optional action button.</p>

            <div class="demo-examples">
                <amw-card class="demo-example-card" headerTitle="Basic Empty">
                    <ng-template #cardContent>
                        <amw-inline-empty />
                    </ng-template>
                </amw-card>

                <amw-card class="demo-example-card" headerTitle="With Action">
                    <ng-template #cardContent>
                        <amw-inline-empty
                            message="No tasks yet"
                            icon="task_alt"
                            actionLabel="Add Task"
                            (action)="onCreateItem()" />
                    </ng-template>
                </amw-card>

                <amw-card class="demo-example-card" headerTitle="Search Results">
                    <ng-template #cardContent>
                        <amw-inline-empty
                            message="No results found for your search"
                            icon="search_off"
                            actionLabel="Clear Search"
                            (action)="onClearSearch()" />
                    </ng-template>
                </amw-card>
            </div>

            <h3>Code Examples</h3>
            <pre><code>// Loading State
&lt;amw-inline-loading message="Loading data..." /&gt;

// Error State with Retry
&lt;amw-inline-error
    message="Failed to load data"
    [showRetry]="true"
    (retry)="onRetry()" /&gt;

// Empty State with Action
&lt;amw-inline-empty
    message="No items found"
    icon="inbox"
    actionLabel="Create Item"
    (action)="onCreate()" /&gt;</code></pre>

        </amw-demo-doc>
    `,
    styles: [`
        .demo-state-buttons {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 24px;
        }

        .demo-card {
            margin-bottom: 32px;
        }

        .demo-examples {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }

        .demo-example-card {
            min-height: 200px;
        }

        .demo-data-content {
            padding: 16px;

            p {
                margin-bottom: 12px;
            }

            ul {
                margin: 0;
                padding-left: 20px;

                li {
                    margin-bottom: 4px;
                }
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
export class InlineStatesDemoComponent {
    currentState = signal<DemoState>('data');

    setState(state: DemoState): void {
        this.currentState.set(state);
    }

    onRetry(): void {
        this.currentState.set('loading');
        setTimeout(() => {
            this.currentState.set('data');
        }, 1500);
    }

    onCreateItem(): void {
        alert('Create item action triggered!');
    }

    onClearSearch(): void {
        alert('Clear search action triggered!');
    }
}
