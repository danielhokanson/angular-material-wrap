import { Directive, input, computed, ElementRef, Renderer2, OnInit, OnDestroy, effect } from '@angular/core';

/** Badge color type */
export type AmwBadgeColor = 'primary' | 'accent' | 'warn';

/** Badge position type */
export type AmwBadgePosition = 'above after' | 'above before' | 'below after' | 'below before';

/** Badge size type */
export type AmwBadgeSize = 'small' | 'medium' | 'large';

/**
 * Angular Material Wrap Badge Directive
 *
 * A small status indicator that can be attached to any element.
 * Displays as a small circle with text or number content.
 *
 * @example
 * Basic badge:
 * ```html
 * <amw-icon-button icon="notifications" [amwBadge]="5"></amw-icon-button>
 * ```
 *
 * @example
 * Badge with color and position:
 * ```html
 * <amw-icon-button
 *   icon="mail"
 *   [amwBadge]="unreadCount"
 *   amwBadgeColor="warn"
 *   amwBadgePosition="above before">
 * </amw-icon-button>
 * ```
 *
 * @example
 * Text badge:
 * ```html
 * <span [amwBadge]="'New'" amwBadgePosition="above after">Feature</span>
 * ```
 *
 * @example
 * Hidden badge (conditionally):
 * ```html
 * <amw-icon-button
 *   icon="inbox"
 *   [amwBadge]="count"
 *   [amwBadgeHidden]="count === 0">
 * </amw-icon-button>
 * ```
 */
@Directive({
    selector: '[amwBadge]',
    standalone: true,
    host: {
        'class': 'amw-badge-host',
        '[class.amw-badge-host--overlap]': 'amwBadgeOverlap()'
    }
})
export class AmwBadgeDirective implements OnInit, OnDestroy {
    /** Badge content (string or number) */
    readonly amwBadge = input.required<string | number>();

    /** Badge color */
    readonly amwBadgeColor = input<AmwBadgeColor>('primary');

    /** Badge position relative to host element */
    readonly amwBadgePosition = input<AmwBadgePosition>('above after');

    /** Badge size */
    readonly amwBadgeSize = input<AmwBadgeSize>('medium');

    /** Whether to hide the badge */
    readonly amwBadgeHidden = input<boolean>(false);

    /** Whether the badge should overlap the host element */
    readonly amwBadgeOverlap = input<boolean>(true);

    /** Custom CSS class for the badge */
    readonly amwBadgeClass = input<string | undefined>();

    private badgeElement: HTMLElement | null = null;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {
        // Effect to update badge when inputs change
        effect(() => {
            this.updateBadge();
        });
    }

    ngOnInit(): void {
        this.createBadge();
        this.updateBadge();
    }

    ngOnDestroy(): void {
        this.removeBadge();
    }

    /** Get display content (formats numbers > 99 as "99+") */
    private getDisplayContent(): string {
        const content = this.amwBadge();
        if (typeof content === 'number') {
            return content > 99 ? '99+' : content.toString();
        }
        return content;
    }

    /** Create the badge element */
    private createBadge(): void {
        if (this.badgeElement) {
            return;
        }

        // Ensure global styles are injected
        this.injectGlobalStyles();

        // Create badge container
        this.badgeElement = this.renderer.createElement('span');
        this.renderer.addClass(this.badgeElement, 'amw-badge');

        // Add position to host
        const host = this.elementRef.nativeElement;
        this.renderer.setStyle(host, 'position', 'relative');
        this.renderer.setStyle(host, 'display', 'inline-flex');

        // Append badge to host
        this.renderer.appendChild(host, this.badgeElement);
    }

    /** Inject global badge styles (only once) */
    private injectGlobalStyles(): void {
        const styleId = 'amw-badge-styles';
        if (document.getElementById(styleId)) {
            return;
        }

        const styles = `
            .amw-badge {
                position: absolute;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-family: var(--mdc-typography-caption-font-family, Roboto, sans-serif);
                font-weight: 600;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                white-space: nowrap;
            }
            .amw-badge--small { font-size: 9px; min-width: 16px; height: 16px; padding: 0 4px; }
            .amw-badge--medium { font-size: 11px; min-width: 20px; height: 20px; padding: 0 6px; }
            .amw-badge--large { font-size: 13px; min-width: 24px; height: 24px; padding: 0 8px; }
            .amw-badge--primary { background-color: var(--mat-primary-color, #6750A4); color: #fff; }
            .amw-badge--accent { background-color: var(--mat-accent-color, #625B71); color: #fff; }
            .amw-badge--warn { background-color: var(--mat-warn-color, #B3261E); color: #fff; }
            .amw-badge--above { top: 0; }
            .amw-badge--below { bottom: 0; }
            .amw-badge--after { right: 0; }
            .amw-badge--before { left: 0; }
            .amw-badge--overlap.amw-badge--above.amw-badge--after { transform: translate(50%, -50%); }
            .amw-badge--overlap.amw-badge--above.amw-badge--before { transform: translate(-50%, -50%); }
            .amw-badge--overlap.amw-badge--below.amw-badge--after { transform: translate(50%, 50%); }
            .amw-badge--overlap.amw-badge--below.amw-badge--before { transform: translate(-50%, 50%); }
        `;

        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    /** Update badge appearance based on inputs */
    private updateBadge(): void {
        if (!this.badgeElement) {
            return;
        }

        const content = this.getDisplayContent();
        const color = this.amwBadgeColor();
        const position = this.amwBadgePosition();
        const size = this.amwBadgeSize();
        const hidden = this.amwBadgeHidden();
        const overlap = this.amwBadgeOverlap();
        const customClass = this.amwBadgeClass();

        // Update content
        this.badgeElement.textContent = content;

        // Reset classes
        this.badgeElement.className = 'amw-badge';

        // Add color class
        this.renderer.addClass(this.badgeElement, `amw-badge--${color}`);

        // Add size class
        this.renderer.addClass(this.badgeElement, `amw-badge--${size}`);

        // Add position classes
        const [vertical, horizontal] = position.split(' ') as ['above' | 'below', 'after' | 'before'];
        this.renderer.addClass(this.badgeElement, `amw-badge--${vertical}`);
        this.renderer.addClass(this.badgeElement, `amw-badge--${horizontal}`);

        // Add overlap class
        if (overlap) {
            this.renderer.addClass(this.badgeElement, 'amw-badge--overlap');
        }

        // Add custom class
        if (customClass) {
            this.renderer.addClass(this.badgeElement, customClass);
        }

        // Handle visibility
        if (hidden || content === '') {
            this.renderer.setStyle(this.badgeElement, 'display', 'none');
        } else {
            this.renderer.removeStyle(this.badgeElement, 'display');
        }
    }

    /** Remove the badge element */
    private removeBadge(): void {
        if (this.badgeElement) {
            this.renderer.removeChild(this.elementRef.nativeElement, this.badgeElement);
            this.badgeElement = null;
        }
    }
}
