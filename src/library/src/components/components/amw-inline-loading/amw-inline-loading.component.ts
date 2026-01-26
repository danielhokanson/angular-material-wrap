import { Component, ViewEncapsulation, ChangeDetectionStrategy, input, computed } from '@angular/core';

/**
 * Inline Loading Component
 *
 * Displays a centered loading spinner with an optional message.
 * Uses the same geometric spinner style as the full-screen loading overlay.
 * Use within cards, sections, or containers to indicate loading state.
 *
 * @example
 * ```html
 * <amw-inline-loading />
 *
 * <amw-inline-loading message="Loading data..." />
 *
 * <amw-inline-loading [size]="48" message="Please wait..." />
 * ```
 */
@Component({
    selector: 'amw-inline-loading',
    standalone: true,
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="amw-inline-loading" role="status" aria-live="polite">
            <div class="amw-inline-spinner" [style.width.px]="size()" [style.height.px]="size()">
                <div class="amw-inline-spinner__ring amw-inline-spinner__ring--1"
                     [style.width.px]="size()"
                     [style.height.px]="size()"
                     [style.margin-left.px]="-size() / 2"
                     [style.margin-top.px]="-size() / 2"></div>
                <div class="amw-inline-spinner__ring amw-inline-spinner__ring--2"
                     [style.width.px]="innerRingSize()"
                     [style.height.px]="innerRingSize()"
                     [style.margin-left.px]="-innerRingSize() / 2"
                     [style.margin-top.px]="-innerRingSize() / 2"></div>
            </div>
            @if (message()) {
                <span class="amw-inline-loading__message">{{ message() }}</span>
            }
        </div>
    `,
    styles: [`
        .amw-inline-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
            padding: 24px;
            color: var(--md-sys-color-on-surface-variant, var(--mdc-theme-on-surface-variant, #49454f));

            &__message {
                font-size: 14px;
                line-height: 1.4;
            }
        }

        .amw-inline-spinner {
            position: relative;
            opacity: 0.8;

            &__ring {
                position: absolute;
                top: 50%;
                left: 50%;
                border-radius: 50%;
                box-sizing: border-box;

                &--1 {
                    background: conic-gradient(
                        var(--mdc-theme-primary, #6200ee) 0deg 100deg,
                        transparent 100deg 120deg,
                        var(--mdc-theme-primary, #6200ee) 120deg 220deg,
                        transparent 220deg 240deg,
                        var(--mdc-theme-primary, #6200ee) 240deg 340deg,
                        transparent 340deg 360deg
                    );
                    mask: radial-gradient(circle, transparent 49%, black 51%);
                    -webkit-mask: radial-gradient(circle, transparent 49%, black 51%);
                    filter: blur(0.3px);
                    animation: amw-inline-rotate-cw 6s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
                }

                &--2 {
                    background: conic-gradient(
                        var(--mdc-theme-secondary, #03dac6) 0deg 92deg,
                        transparent 92deg 120deg,
                        var(--mdc-theme-secondary, #03dac6) 120deg 212deg,
                        transparent 212deg 240deg,
                        var(--mdc-theme-secondary, #03dac6) 240deg 332deg,
                        transparent 332deg 360deg
                    );
                    mask: radial-gradient(circle, transparent 39%, black 41%);
                    -webkit-mask: radial-gradient(circle, transparent 39%, black 41%);
                    filter: blur(0.3px);
                    animation: amw-inline-rotate-ccw 5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
                }
            }
        }

        @keyframes amw-inline-rotate-cw {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(120deg); }
            50% { transform: rotate(180deg); }
            75% { transform: rotate(300deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes amw-inline-rotate-ccw {
            0% { transform: rotate(0deg); }
            20% { transform: rotate(-90deg); }
            40% { transform: rotate(-120deg); }
            60% { transform: rotate(-240deg); }
            80% { transform: rotate(-300deg); }
            100% { transform: rotate(-360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
            .amw-inline-spinner__ring {
                animation-duration: 10s !important;
                animation-timing-function: linear !important;

                &--1 { animation-name: amw-inline-rotate-simple-cw; }
                &--2 { animation-name: amw-inline-rotate-simple-ccw; }
            }

            @keyframes amw-inline-rotate-simple-cw {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            @keyframes amw-inline-rotate-simple-ccw {
                from { transform: rotate(0deg); }
                to { transform: rotate(-360deg); }
            }
        }
    `]
})
export class AmwInlineLoadingComponent {
    /**
     * Optional loading message to display below the spinner
     */
    readonly message = input<string>('');

    /**
     * Diameter of the spinner in pixels
     */
    readonly size = input<number>(64);

    /**
     * Computed inner ring size (70% of outer)
     */
    readonly innerRingSize = computed(() => Math.round(this.size() * 0.7));
}
