import { Component, ViewEncapsulation, ChangeDetectionStrategy, input, output } from '@angular/core';
import { AmwIconComponent } from '../amw-icon/amw-icon.component';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';

/**
 * Inline Error Component
 *
 * Displays an error message with an icon and optional retry button.
 * Use within cards, sections, or containers to show error states.
 *
 * @example
 * ```html
 * <amw-inline-error message="Failed to load data" />
 *
 * <amw-inline-error
 *   message="Network error occurred"
 *   [showRetry]="true"
 *   (retry)="loadData()" />
 *
 * <amw-inline-error
 *   message="Item not found"
 *   icon="search_off"
 *   [showRetry]="false" />
 * ```
 */
@Component({
    selector: 'amw-inline-error',
    standalone: true,
    imports: [AmwIconComponent, AmwButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="amw-inline-error" role="alert">
            <amw-icon [name]="icon()" size="lg" />
            <span class="amw-inline-error__message">{{ message() }}</span>
            @if (showRetry()) {
                <amw-button
                    appearance="text"
                    color="primary"
                    (buttonClick)="retry.emit()">
                    {{ retryLabel() }}
                </amw-button>
            }
        </div>
    `,
    styles: [`
        .amw-inline-error {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 12px;
            padding: 24px;
            color: var(--md-sys-color-error, var(--mdc-theme-error, #ba1a1a));
            background-color: var(--md-sys-color-error-container, var(--mdc-theme-error-container, #ffdad6));
            border-radius: 8px;

            amw-icon {
                color: var(--md-sys-color-on-error-container, var(--mdc-theme-on-error-container, #410002));
            }

            &__message {
                font-size: 14px;
                line-height: 1.4;
                color: var(--md-sys-color-on-error-container, var(--mdc-theme-on-error-container, #410002));
            }
        }
    `]
})
export class AmwInlineErrorComponent {
    /**
     * The error message to display (required)
     */
    readonly message = input.required<string>();

    /**
     * The icon to display
     */
    readonly icon = input<string>('error_outline');

    /**
     * Whether to show the retry button
     */
    readonly showRetry = input<boolean>(true);

    /**
     * Label for the retry button
     */
    readonly retryLabel = input<string>('Retry');

    /**
     * Emitted when the retry button is clicked
     */
    readonly retry = output<void>();
}
