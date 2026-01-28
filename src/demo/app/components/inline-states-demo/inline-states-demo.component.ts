import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwInlineLoadingComponent } from '../../../../library/src/components/components/amw-inline-loading/amw-inline-loading.component';
import { AmwInlineErrorComponent } from '../../../../library/src/components/components/amw-inline-error/amw-inline-error.component';
import { AmwInlineEmptyComponent } from '../../../../library/src/components/components/amw-inline-empty/amw-inline-empty.component';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwTabsComponent } from '../../../../library/src/components/components/amw-tabs/amw-tabs.component';
import { AmwTabComponent } from '../../../../library/src/components/components/amw-tabs/amw-tab.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

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
        AmwTabsComponent,
        AmwTabComponent,
        AmwApiDocComponent
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="inline-states-demo-page">
            <div class="inline-states-demo-page__header">
                <h1>Inline State Components</h1>
                <p>Standardized components for displaying loading, error, and empty states within cards and sections.</p>
            </div>

            <amw-card>
                <ng-template #cardContent>
                    <amw-tabs>
                        <amw-tab label="Demo" icon="play_arrow">
                            <h3>Interactive Demo</h3>
                            <p>Click the buttons below to see different states:</p>

                            <div class="demo-state-buttons">
                                <amw-button
                                    appearance="elevated"
                                    color="primary"
                                    (buttonClick)="setState('loading')">
                                    Loading
                                </amw-button>
                                <amw-button
                                    appearance="elevated"
                                    [color]="currentState() === 'error' ? 'warn' : 'primary'"
                                    (buttonClick)="setState('error')">
                                    Error
                                </amw-button>
                                <amw-button
                                    appearance="elevated"
                                    (buttonClick)="setState('empty')">
                                    Empty
                                </amw-button>
                                <amw-button
                                    appearance="elevated"
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
                        </amw-tab>

                        <amw-tab label="Code" icon="code">
                            <div class="code-content">
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
                            </div>
                        </amw-tab>

                        <amw-tab label="API" icon="description">
                            <div class="api-content">
                                <amw-api-doc
                                    componentName="Inline State Components"
                                    [apiDocumentation]="inlineStatesApiDoc"
                                    description="Components for displaying loading, error, and empty states inline within cards and sections.">
                                </amw-api-doc>
                            </div>
                        </amw-tab>
                    </amw-tabs>
                </ng-template>
            </amw-card>
        </div>
    `,
    styles: [`
        .inline-states-demo-page {
            padding: 24px;
            max-width: 1400px;
            margin: 0 auto;

            &__header {
                margin-bottom: 24px;

                h1 { margin: 0 0 8px 0; }
                p { margin: 0; }
            }
        }

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

    inlineStatesApiDoc: ApiDocumentation = {
        inputs: [
            { name: 'message', type: 'string', default: "''", description: 'Message to display below the state indicator' },
            { name: 'size', type: 'number', default: '32', description: 'Size of the loading spinner in pixels (loading only)' },
            { name: 'icon', type: 'string', default: "'inbox'", description: 'Material icon name (empty/error only)' },
            { name: 'showRetry', type: 'boolean', default: 'true', description: 'Show retry button (error only)' },
            { name: 'actionLabel', type: 'string', default: "''", description: 'Label for action button (empty only)' }
        ],
        outputs: [
            { name: 'retry', type: 'EventEmitter<void>', description: 'Emitted when retry button is clicked (error only)' },
            { name: 'action', type: 'EventEmitter<void>', description: 'Emitted when action button is clicked (empty only)' }
        ],
        usageNotes: [
            'Use amw-inline-loading for loading states within cards',
            'Use amw-inline-error for error states with optional retry',
            'Use amw-inline-empty for empty states with optional action button',
            'All components center their content and work well within amw-card'
        ]
    };

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
