import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import {
    parseHttpError,
    parseHttpErrorDetailed,
    extractErrorMessage,
    isHttpError,
    isRetryableError,
    ParsedHttpError
} from '../../../../library/src/utilities/http-error-parser';
import { AmwCardComponent } from '../../../../library/src/components/components/amw-card/amw-card.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwDemoDocComponent } from '../../shared/components/demo-doc/demo-doc.component';
import { AmwInlineErrorComponent } from '../../../../library/src/components/components/amw-inline-error/amw-inline-error.component';

@Component({
    selector: 'amw-http-error-parser-demo',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        AmwCardComponent,
        AmwButtonComponent,
        AmwDemoDocComponent,
        AmwInlineErrorComponent
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <amw-demo-doc
            title="HTTP Error Parser"
            description="Utility functions for parsing and handling HTTP errors consistently.">

            <h3>Interactive Demo</h3>
            <p>Click buttons to simulate different HTTP errors and see how they're parsed.</p>

            <div class="demo-grid">
                <amw-card class="demo-card">
                    <mat-card-header>
                        <h4>Simulate HTTP Errors</h4>
                    </mat-card-header>
                    <mat-card-content>
                        <div class="error-buttons">
                            <amw-button
                                appearance="outlined"
                                (buttonClick)="simulateError(400, 'Bad Request', { message: 'Invalid input data' })">
                                400 Bad Request
                            </amw-button>
                            <amw-button
                                appearance="outlined"
                                (buttonClick)="simulateError(401, 'Unauthorized', { error: 'Token expired' })">
                                401 Unauthorized
                            </amw-button>
                            <amw-button
                                appearance="outlined"
                                (buttonClick)="simulateError(403, 'Forbidden', { message: 'Access denied' })">
                                403 Forbidden
                            </amw-button>
                            <amw-button
                                appearance="outlined"
                                (buttonClick)="simulateError(404, 'Not Found', null)">
                                404 Not Found
                            </amw-button>
                            <amw-button
                                appearance="outlined"
                                (buttonClick)="simulateError(422, 'Unprocessable Entity', { errors: { email: ['Invalid format'], name: ['Required'] } })">
                                422 Validation Error
                            </amw-button>
                            <amw-button
                                appearance="outlined"
                                color="warn"
                                (buttonClick)="simulateError(500, 'Internal Server Error', null)">
                                500 Server Error
                            </amw-button>
                            <amw-button
                                appearance="outlined"
                                color="warn"
                                (buttonClick)="simulateError(502, 'Bad Gateway', null)">
                                502 Bad Gateway
                            </amw-button>
                            <amw-button
                                appearance="outlined"
                                color="warn"
                                (buttonClick)="simulateError(503, 'Service Unavailable', null)">
                                503 Service Unavailable
                            </amw-button>
                            <amw-button
                                appearance="outlined"
                                (buttonClick)="simulateNetworkError()">
                                Network Error
                            </amw-button>
                            <amw-button
                                appearance="outlined"
                                (buttonClick)="simulateTimeout()">
                                Timeout
                            </amw-button>
                        </div>
                    </mat-card-content>
                </amw-card>

                <amw-card class="demo-card">
                    <mat-card-header>
                        <h4>Parsed Result</h4>
                    </mat-card-header>
                    <mat-card-content>
                        @if (parsedError()) {
                            <div class="parsed-result">
                                <div class="result-row">
                                    <span class="label">Simple Message:</span>
                                    <span class="value">{{ simpleMessage() }}</span>
                                </div>

                                <h5>Detailed Parse:</h5>
                                <div class="result-row">
                                    <span class="label">Message:</span>
                                    <span class="value">{{ parsedError()?.message }}</span>
                                </div>
                                <div class="result-row">
                                    <span class="label">Status:</span>
                                    <span class="value status-badge" [class]="getStatusClass(parsedError()?.status || 0)">
                                        {{ parsedError()?.status }} {{ parsedError()?.statusText }}
                                    </span>
                                </div>
                                <div class="result-row">
                                    <span class="label">Category:</span>
                                    <span class="value category-badge" [class]="parsedError()?.category">
                                        {{ parsedError()?.category }}
                                    </span>
                                </div>
                                <div class="result-row">
                                    <span class="label">Is Retryable:</span>
                                    <span class="value" [class.retryable]="parsedError()?.isRetryable">
                                        {{ parsedError()?.isRetryable ? 'Yes' : 'No' }}
                                    </span>
                                </div>
                                @if (hasFieldErrors()) {
                                    <div class="result-row">
                                        <span class="label">Field Errors:</span>
                                        <div class="field-errors">
                                            @for (field of getFieldErrorKeys(); track field) {
                                                <div class="field-error">
                                                    <strong>{{ field }}:</strong> {{ parsedError()?.fieldErrors?.[field]?.join(', ') }}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>

                            <h5>Display with Inline Error:</h5>
                            <amw-inline-error
                                [message]="simpleMessage()"
                                [showRetry]="parsedError()?.isRetryable || false"
                                (retry)="onRetry()" />
                        } @else {
                            <p class="empty-text">Click an error button to see the parsed result.</p>
                        }
                    </mat-card-content>
                </amw-card>
            </div>

            <h3>Utility Functions</h3>

            <amw-card class="demo-card">
                <mat-card-header>
                    <h4>Type Guards & Helpers</h4>
                </mat-card-header>
                <mat-card-content>
                    <div class="utility-demo">
                        <div class="utility-row">
                            <code>isHttpError(lastError)</code>
                            <span class="utility-result">{{ isHttpErrorResult() }}</span>
                        </div>
                        <div class="utility-row">
                            <code>isRetryableError(lastError)</code>
                            <span class="utility-result">{{ isRetryableResult() }}</span>
                        </div>
                        <div class="utility-row">
                            <code>extractErrorMessage(lastError)</code>
                            <span class="utility-result">{{ extractedMessage() }}</span>
                        </div>
                    </div>

                    <h5>Test with Different Error Types:</h5>
                    <div class="button-row">
                        <amw-button
                            appearance="outlined"
                            (buttonClick)="testWithString()">
                            String Error
                        </amw-button>
                        <amw-button
                            appearance="outlined"
                            (buttonClick)="testWithError()">
                            Error Object
                        </amw-button>
                        <amw-button
                            appearance="outlined"
                            (buttonClick)="testWithUnknown()">
                            Unknown Error
                        </amw-button>
                    </div>
                </mat-card-content>
            </amw-card>

            <h3>Code Examples</h3>
            <pre><code>import {{ '{' }}
  parseHttpError,
  parseHttpErrorDetailed,
  createErrorHandler,
  isHttpError,
  isRetryableError,
  extractErrorMessage
{{ '}' }} from '&#64;anthropic/angular-material-wrap';

// Simple error message extraction
this.http.get('/api/data').subscribe({{ '{' }}
  error: (err: HttpErrorResponse) => {{ '{' }}
    const message = parseHttpError(err);
    this.errorMessage = message; // "Not Found"
  {{ '}' }}
{{ '}' }});

// Detailed error parsing
this.http.post('/api/users', data).subscribe({{ '{' }}
  error: (err: HttpErrorResponse) => {{ '{' }}
    const parsed = parseHttpErrorDetailed(err);
    // parsed.message - User-friendly message
    // parsed.status - HTTP status code
    // parsed.statusText - HTTP status text
    // parsed.category - 'client' | 'server' | 'network' | 'unknown'
    // parsed.isRetryable - Whether retry might help
    // parsed.fieldErrors - Validation errors by field
    // parsed.originalError - Original HttpErrorResponse
  {{ '}' }}
{{ '}' }});

// Using error handler in RxJS pipe
this.http.get('/api/items')
  .pipe(
    catchError(createErrorHandler({{ '{' }}
      defaultMessage: 'Failed to load items',
      onError: (parsed) => this.showError(parsed.message)
    {{ '}' }}))
  )
  .subscribe();

// Type guard usage
if (isHttpError(error)) {{ '{' }}
  // TypeScript knows error is HttpErrorResponse
  console.log(error.status);
{{ '}' }}

// Check if error is retryable
if (isRetryableError(error)) {{ '{' }}
  // 5xx errors, network errors, timeouts
  this.scheduleRetry();
{{ '}' }}

// Extract message from any error type
const message = extractErrorMessage(unknownError, 'Something went wrong');</code></pre>

            <h3>API Reference</h3>
            <table class="api-table">
                <thead>
                    <tr>
                        <th>Function</th>
                        <th>Returns</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>parseHttpError(error)</code></td>
                        <td>string</td>
                        <td>Returns a user-friendly error message</td>
                    </tr>
                    <tr>
                        <td><code>parseHttpErrorDetailed(error)</code></td>
                        <td>ParsedHttpError</td>
                        <td>Returns detailed parsed error information</td>
                    </tr>
                    <tr>
                        <td><code>createErrorHandler(options?)</code></td>
                        <td>(error) => Observable&lt;never&gt;</td>
                        <td>Creates an error handler for RxJS catchError</td>
                    </tr>
                    <tr>
                        <td><code>isHttpError(error)</code></td>
                        <td>boolean</td>
                        <td>Type guard for HttpErrorResponse</td>
                    </tr>
                    <tr>
                        <td><code>isRetryableError(error)</code></td>
                        <td>boolean</td>
                        <td>Checks if error is worth retrying</td>
                    </tr>
                    <tr>
                        <td><code>extractErrorMessage(error, fallback?)</code></td>
                        <td>string</td>
                        <td>Extracts message from any error type</td>
                    </tr>
                </tbody>
            </table>

            <h3>ParsedHttpError Interface</h3>
            <pre><code>interface ParsedHttpError {{ '{' }}
  message: string;           // User-friendly message
  status: number;            // HTTP status code (0 for network errors)
  statusText: string;        // HTTP status text
  category: 'client' | 'server' | 'network' | 'unknown';
  isRetryable: boolean;      // True for 5xx, network, timeout
  fieldErrors?: Record&lt;string, string[]&gt;;  // Validation errors
  originalError: HttpErrorResponse;
{{ '}' }}</code></pre>

        </amw-demo-doc>
    `,
    styles: [`
        .demo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 24px;
            margin-bottom: 24px;
        }

        .demo-card {
            margin-bottom: 24px;
        }

        .error-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .parsed-result {
            h5 {
                margin: 16px 0 8px;
                color: var(--md-sys-color-on-surface-variant, #49454f);
            }
        }

        .result-row {
            display: flex;
            gap: 12px;
            padding: 8px 0;
            border-bottom: 1px solid var(--md-sys-color-outline-variant, #cac4d0);

            &:last-child {
                border-bottom: none;
            }
        }

        .label {
            font-weight: 500;
            min-width: 120px;
            color: var(--md-sys-color-on-surface-variant, #49454f);
        }

        .value {
            flex: 1;
        }

        .status-badge {
            padding: 2px 8px;
            border-radius: 4px;
            font-weight: 500;

            &.client-error {
                background: var(--md-sys-color-error-container, #ffdad6);
                color: var(--md-sys-color-on-error-container, #410002);
            }

            &.server-error {
                background: var(--md-sys-color-tertiary-container, #ffd8e4);
                color: var(--md-sys-color-on-tertiary-container, #31111d);
            }

            &.success {
                background: var(--md-sys-color-primary-container, #eaddff);
                color: var(--md-sys-color-on-primary-container, #21005d);
            }
        }

        .category-badge {
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            text-transform: uppercase;

            &.client {
                background: #fff3cd;
                color: #856404;
            }

            &.server {
                background: #f8d7da;
                color: #721c24;
            }

            &.network {
                background: #d1ecf1;
                color: #0c5460;
            }

            &.unknown {
                background: #e2e3e5;
                color: #383d41;
            }
        }

        .retryable {
            color: var(--md-sys-color-primary, #6750a4);
            font-weight: 500;
        }

        .field-errors {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .field-error {
            font-size: 13px;
            color: var(--md-sys-color-error, #ba1a1a);
        }

        .empty-text {
            color: var(--md-sys-color-on-surface-variant, #49454f);
            font-style: italic;
        }

        .utility-demo {
            margin-bottom: 16px;
        }

        .utility-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            background: var(--md-sys-color-surface-container, #f3edf7);
            border-radius: 8px;
            margin-bottom: 8px;

            code {
                font-family: 'Monaco', 'Consolas', monospace;
                font-size: 13px;
            }
        }

        .utility-result {
            font-weight: 500;
            color: var(--md-sys-color-primary, #6750a4);
        }

        .button-row {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
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
export class HttpErrorParserDemoComponent {
    parsedError = signal<ParsedHttpError | null>(null);
    simpleMessage = signal<string>('');
    lastError = signal<unknown>(null);

    simulateError(status: number, statusText: string, body: unknown): void {
        const error = new HttpErrorResponse({
            status,
            statusText,
            error: body,
            url: '/api/example'
        });

        this.lastError.set(error);
        this.simpleMessage.set(parseHttpError(error));
        this.parsedError.set(parseHttpErrorDetailed(error));
    }

    simulateNetworkError(): void {
        const error = new HttpErrorResponse({
            status: 0,
            statusText: 'Unknown Error',
            error: new ProgressEvent('error'),
            url: '/api/example'
        });

        this.lastError.set(error);
        this.simpleMessage.set(parseHttpError(error));
        this.parsedError.set(parseHttpErrorDetailed(error));
    }

    simulateTimeout(): void {
        const error = new HttpErrorResponse({
            status: 0,
            statusText: 'Unknown Error',
            error: new ProgressEvent('timeout'),
            url: '/api/example'
        });

        this.lastError.set(error);
        this.simpleMessage.set(parseHttpError(error));
        this.parsedError.set(parseHttpErrorDetailed(error));
    }

    testWithString(): void {
        this.lastError.set('Something went wrong');
        this.parsedError.set(null);
    }

    testWithError(): void {
        this.lastError.set(new Error('Custom error message'));
        this.parsedError.set(null);
    }

    testWithUnknown(): void {
        this.lastError.set({ code: 'ERR_001', details: 'Unknown format' });
        this.parsedError.set(null);
    }

    onRetry(): void {
        alert('Retry action triggered!');
    }

    getStatusClass(status: number): string {
        if (status >= 400 && status < 500) return 'client-error';
        if (status >= 500) return 'server-error';
        return 'success';
    }

    hasFieldErrors(): boolean {
        const fieldErrors = this.parsedError()?.fieldErrors;
        return !!fieldErrors && Object.keys(fieldErrors).length > 0;
    }

    getFieldErrorKeys(): string[] {
        return Object.keys(this.parsedError()?.fieldErrors || {});
    }

    isHttpErrorResult(): string {
        const error = this.lastError();
        return error ? String(isHttpError(error)) : 'N/A';
    }

    isRetryableResult(): string {
        const error = this.lastError();
        return error ? String(isRetryableError(error)) : 'N/A';
    }

    extractedMessage(): string {
        const error = this.lastError();
        return error ? extractErrorMessage(error, 'Default message') : 'N/A';
    }
}
