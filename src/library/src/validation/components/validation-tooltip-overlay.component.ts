import { Component, inject, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AmwValidationTooltipService } from '../services/validation-tooltip.service';

/**
 * Global overlay component for displaying validation errors.
 *
 * Add this component once at the app root level (e.g., in app.component.html):
 *
 * @example
 * ```html
 * <!-- In app.component.html -->
 * <router-outlet />
 * <amw-validation-tooltip-overlay />
 * ```
 *
 * The overlay is automatically shown/hidden by the AmwValidationTooltipDirective
 * when users hover over disabled submit buttons.
 */
@Component({
    selector: 'amw-validation-tooltip-overlay',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        @if (tooltipService.isVisible()) {
            <div class="validation-tooltip validation-tooltip--visible"
                 [style.top.px]="tooltipService.position().top"
                 [style.left.px]="tooltipService.position().left"
                 role="tooltip"
                 aria-live="polite">
                <div class="validation-tooltip__arrow"></div>
                <div class="validation-tooltip__content">
                    <div class="validation-tooltip__header">
                        <span class="validation-tooltip__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                            </svg>
                        </span>
                        <span class="validation-tooltip__title">Validation Errors</span>
                        <span class="validation-tooltip__count">({{ tooltipService.getErrorCount() }})</span>
                    </div>
                    <ul class="validation-tooltip__errors">
                        @for (field of tooltipService.errors(); track field.fieldName) {
                            <li class="validation-tooltip__field">
                                <span class="validation-tooltip__field-name">{{ field.fieldLabel }}:</span>
                                <span class="validation-tooltip__field-errors">
                                    @for (error of field.errors; track error.key) {
                                        <span class="validation-tooltip__error-message">{{ error.message }}</span>
                                    }
                                </span>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        }
    `,
    styles: [`
        .validation-tooltip {
            position: fixed;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            visibility: hidden;
            transition: opacity 200ms ease, visibility 200ms ease;
            transform: translateX(-50%) translateY(-100%);

            &--visible {
                opacity: 1;
                visibility: visible;
            }

            &__arrow {
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid var(--md-sys-color-error-container, #ffdad6);
            }

            &__content {
                background-color: var(--md-sys-color-error-container, #ffdad6);
                color: var(--md-sys-color-on-error-container, #410002);
                border-radius: 8px;
                padding: 12px 16px;
                max-width: 320px;
                min-width: 200px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                font-size: 13px;
                line-height: 1.4;
            }

            &__header {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 8px;
                padding-bottom: 8px;
                border-bottom: 1px solid var(--md-sys-color-on-error-container, #410002);
                opacity: 0.8;
            }

            &__icon {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            &__title {
                font-weight: 500;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            &__count {
                font-size: 11px;
                opacity: 0.7;
            }

            &__errors {
                margin: 0;
                padding: 0;
                list-style: none;
            }

            &__field {
                margin-bottom: 6px;
                display: flex;
                flex-wrap: wrap;
                gap: 4px;

                &:last-child {
                    margin-bottom: 0;
                }
            }

            &__field-name {
                font-weight: 600;
            }

            &__field-errors {
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
            }

            &__error-message {
                &::before {
                    content: '\\2022 ';
                    opacity: 0.6;
                }
            }
        }

        /* Dark theme support */
        :host-context(.dark-theme),
        :host-context([data-theme="dark"]) {
            .validation-tooltip {
                &__arrow {
                    border-top-color: var(--md-sys-color-error-container, #93000a);
                }
                &__content {
                    background-color: var(--md-sys-color-error-container, #93000a);
                    color: var(--md-sys-color-on-error-container, #ffdad6);
                }
                &__header {
                    border-bottom-color: var(--md-sys-color-on-error-container, #ffdad6);
                }
            }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            .validation-tooltip {
                transition: none;
            }
        }
    `]
})
export class AmwValidationTooltipOverlayComponent {
    readonly tooltipService = inject(AmwValidationTooltipService);
}
