import { Component, ViewEncapsulation, input, computed, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmwErrorStateService, ErrorContext, ErrorItem } from '../../../services/amw-error-state/amw-error-state.service';
import { AmwIconComponent } from '../amw-icon/amw-icon.component';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';

/**
 * AMW Error Display Component
 *
 * Displays errors from an error context in a consistent, user-friendly manner.
 * Supports different display modes, severity icons, dismiss/retry actions.
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <amw-error-display [context]="errorContext"></amw-error-display>
 *
 * <!-- With custom configuration -->
 * <amw-error-display
 *   [context]="errorContext"
 *   mode="inline"
 *   [showDismiss]="true"
 *   [showRetry]="true"
 *   [maxVisible]="5">
 * </amw-error-display>
 * ```
 */
@Component({
    selector: 'amw-error-display',
    standalone: true,
    imports: [CommonModule, AmwIconComponent, AmwButtonComponent],
    templateUrl: './amw-error-display.component.html',
    styleUrl: './amw-error-display.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AmwErrorDisplayComponent {
    private errorStateService = inject(AmwErrorStateService);

    /**
     * The error context to display errors from
     */
    context = input.required<ErrorContext | string>();

    /**
     * Display mode
     * - 'banner': Full-width banner at top/bottom
     * - 'inline': Inline within content
     * - 'toast': Floating toast-style
     * - 'list': Simple list of errors
     */
    mode = input<'banner' | 'inline' | 'toast' | 'list'>('inline');

    /**
     * Position for banner/toast modes
     */
    position = input<'top' | 'bottom'>('top');

    /**
     * Whether to show dismiss buttons
     */
    showDismiss = input<boolean>(true);

    /**
     * Whether to show retry buttons (for errors with retry actions)
     */
    showRetry = input<boolean>(true);

    /**
     * Maximum number of errors to show (-1 for unlimited)
     */
    maxVisible = input<number>(-1);

    /**
     * Whether to show only active (non-dismissed) errors
     */
    activeOnly = input<boolean>(true);

    /**
     * Filter by severity
     */
    severityFilter = input<'all' | 'error' | 'warning' | 'info'>('all');

    /**
     * Emitted when an error is dismissed
     */
    errorDismissed = output<ErrorItem>();

    /**
     * Emitted when retry is clicked
     */
    errorRetried = output<ErrorItem>();

    /**
     * Get the resolved error context
     */
    protected resolvedContext = computed(() => {
        const ctx = this.context();
        if (typeof ctx === 'string') {
            return this.errorStateService.getContext(ctx);
        }
        return ctx;
    });

    /**
     * Get filtered errors to display
     */
    protected displayErrors = computed(() => {
        const ctx = this.resolvedContext();
        if (!ctx) return [];

        let errors = ctx.errors();

        // Filter active only
        if (this.activeOnly()) {
            errors = errors.filter(e => !e.dismissed);
        }

        // Filter by severity
        const severity = this.severityFilter();
        if (severity !== 'all') {
            errors = errors.filter(e => e.severity === severity);
        }

        // Limit visible
        const max = this.maxVisible();
        if (max > 0 && errors.length > max) {
            errors = errors.slice(-max);
        }

        return errors;
    });

    /**
     * Whether there are any errors to display
     */
    protected hasErrors = computed(() => this.displayErrors().length > 0);

    /**
     * Get hidden error count
     */
    protected hiddenCount = computed(() => {
        const ctx = this.resolvedContext();
        if (!ctx) return 0;

        let totalErrors = ctx.errors();
        if (this.activeOnly()) {
            totalErrors = totalErrors.filter(e => !e.dismissed);
        }

        const max = this.maxVisible();
        if (max > 0 && totalErrors.length > max) {
            return totalErrors.length - max;
        }
        return 0;
    });

    /**
     * Get icon for severity
     */
    getIcon(severity: 'error' | 'warning' | 'info'): string {
        const icons = {
            error: 'error',
            warning: 'warning',
            info: 'info'
        };
        return icons[severity];
    }

    /**
     * Dismiss an error
     */
    onDismiss(error: ErrorItem): void {
        const ctx = this.resolvedContext();
        if (ctx) {
            this.errorStateService.dismissError(ctx.id, error.id);
            this.errorDismissed.emit(error);
        }
    }

    /**
     * Retry an error's action
     */
    onRetry(error: ErrorItem): void {
        const ctx = this.resolvedContext();
        if (ctx) {
            this.errorStateService.retryError(ctx.id, error.id);
            this.errorRetried.emit(error);
        }
    }

    /**
     * Clear all errors
     */
    clearAll(): void {
        const ctx = this.resolvedContext();
        if (ctx) {
            this.errorStateService.clearErrors(ctx.id);
        }
    }

    /**
     * Track by function
     */
    trackByError(index: number, error: ErrorItem): string {
        return error.id;
    }
}
