import { Component, ViewEncapsulation, ChangeDetectionStrategy, input, output } from '@angular/core';
import { AmwIconComponent } from '../amw-icon/amw-icon.component';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';

/**
 * Inline Empty Component
 *
 * Displays an empty state message with an icon and optional action button.
 * Use within cards, sections, or containers when there's no data to display.
 *
 * @example
 * ```html
 * <amw-inline-empty />
 *
 * <amw-inline-empty message="No items in your cart" />
 *
 * <amw-inline-empty
 *   message="No results found"
 *   icon="search_off"
 *   actionLabel="Clear filters"
 *   (action)="clearFilters()" />
 *
 * <amw-inline-empty
 *   message="Get started by creating your first item"
 *   icon="add_circle_outline"
 *   actionLabel="Create Item"
 *   (action)="openCreateDialog()" />
 * ```
 */
@Component({
    selector: 'amw-inline-empty',
    standalone: true,
    imports: [AmwIconComponent, AmwButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="amw-inline-empty" role="status">
            <amw-icon [name]="icon()" size="xl" />
            <span class="amw-inline-empty__message">{{ message() }}</span>
            @if (actionLabel()) {
                <amw-button
                    appearance="outlined"
                    color="primary"
                    (buttonClick)="action.emit()">
                    {{ actionLabel() }}
                </amw-button>
            }
        </div>
    `,
    styles: [`
        .amw-inline-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
            padding: 48px 24px;
            color: var(--md-sys-color-on-surface-variant, var(--mdc-theme-on-surface-variant, #49454f));
            text-align: center;

            amw-icon {
                opacity: 0.5;
            }

            &__message {
                font-size: 16px;
                line-height: 1.4;
                max-width: 320px;
            }
        }
    `]
})
export class AmwInlineEmptyComponent {
    /**
     * The message to display
     */
    readonly message = input<string>('No items found');

    /**
     * The icon to display
     */
    readonly icon = input<string>('inbox');

    /**
     * Label for the action button (if empty, no button is shown)
     */
    readonly actionLabel = input<string>('');

    /**
     * Emitted when the action button is clicked
     */
    readonly action = output<void>();
}
