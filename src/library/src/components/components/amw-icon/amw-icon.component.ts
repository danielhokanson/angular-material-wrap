import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/** Icon size type - supports both short and long form aliases */
export type AmwIconSize = 'sm' | 'md' | 'lg' | 'xl' | 'small' | 'medium' | 'large';

/** Icon color type - includes 'inherit' for parent color inheritance */
export type AmwIconColor = 'primary' | 'accent' | 'warn' | 'inherit';

/**
 * Angular Material Wrap Icon Component
 *
 * A wrapper around Angular Material's mat-icon that provides a consistent
 * API and theming support for icons throughout the application.
 *
 * @example
 * Simple icon usage:
 * ```html
 * <amw-icon name="home"></amw-icon>
 * ```
 *
 * @example
 * Colored icon:
 * ```html
 * <amw-icon name="favorite" color="primary"></amw-icon>
 * ```
 *
 * @example
 * Sized icon with new size values:
 * ```html
 * <amw-icon name="settings" size="lg"></amw-icon>
 * <amw-icon name="home" size="xl" color="primary"></amw-icon>
 * ```
 *
 * @example
 * Accessible icon with aria-label:
 * ```html
 * <amw-icon name="delete" color="warn" ariaLabel="Delete item"></amw-icon>
 * ```
 *
 * @example
 * Icon that inherits color from parent:
 * ```html
 * <amw-icon name="check" color="inherit"></amw-icon>
 * ```
 */
@Component({
    selector: 'amw-icon',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule
    ],
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'amw-icon',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-hidden]': '!ariaLabel() ? "true" : null',
        '[attr.role]': 'ariaLabel() ? "img" : null'
    },
    template: `
        <mat-icon
            [fontSet]="fontSet()"
            [fontIcon]="fontIcon()"
            [inline]="inline()"
            [ngClass]="iconClasses()">
            {{ name() }}
        </mat-icon>
    `,
    styles: [`
        :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        /* Short form size classes */
        .amw-icon--sm mat-icon {
            font-size: 16px;
            width: 16px;
            height: 16px;
        }
        .amw-icon--md mat-icon {
            font-size: 24px;
            width: 24px;
            height: 24px;
        }
        .amw-icon--lg mat-icon {
            font-size: 32px;
            width: 32px;
            height: 32px;
        }
        .amw-icon--xl mat-icon {
            font-size: 48px;
            width: 48px;
            height: 48px;
        }
        /* Legacy size classes (aliases) */
        .amw-icon--small mat-icon {
            font-size: 16px;
            width: 16px;
            height: 16px;
        }
        .amw-icon--large mat-icon {
            font-size: 32px;
            width: 32px;
            height: 32px;
        }
        /* Color classes */
        .amw-icon--primary { color: var(--mat-primary-color, #6750A4); }
        .amw-icon--accent { color: var(--mat-accent-color, #625B71); }
        .amw-icon--warn { color: var(--mat-warn-color, #B3261E); }
        .amw-icon--inherit { color: inherit; }
    `]
})
export class AmwIconComponent {
    /** The name of the icon to display (from Material Icons font) */
    readonly name = input('');

    /**
     * The color theme of the icon
     * - 'primary' | 'accent' | 'warn': Theme colors
     * - 'inherit': Inherits color from parent element
     */
    readonly color = input<AmwIconColor | undefined>();

    /**
     * The size of the icon
     * - 'sm' | 'small': 16px
     * - 'md' | 'medium': 24px (default)
     * - 'lg' | 'large': 32px
     * - 'xl': 48px
     */
    readonly size = input<AmwIconSize>('md');

    /** The font set to use (default is 'material-icons') */
    readonly fontSet = input('');

    /** The CSS class for the font icon (when using icon fonts other than Material Icons) */
    readonly fontIcon = input('');

    /** Whether the icon should be inlined with text */
    readonly inline = input(false);

    /** Custom CSS class for the icon */
    readonly iconClass = input<string | undefined>();

    /**
     * Accessibility label for the icon.
     * When provided, the icon has role="img" and aria-label set.
     * When not provided (decorative icon), aria-hidden="true" is set.
     */
    readonly ariaLabel = input<string | undefined>();

    /** Computed normalized size (maps legacy values to new values) */
    readonly normalizedSize = computed(() => {
        const size = this.size();
        // Map legacy values to new short form
        switch (size) {
            case 'small': return 'sm';
            case 'medium': return 'md';
            case 'large': return 'lg';
            default: return size;
        }
    });

    readonly iconClasses = computed(() => {
        const size = this.size();
        const color = this.color();
        return {
            // Size classes - support both forms
            'amw-icon--sm': size === 'sm' || size === 'small',
            'amw-icon--md': size === 'md' || size === 'medium' || !size,
            'amw-icon--lg': size === 'lg' || size === 'large',
            'amw-icon--xl': size === 'xl',
            // Legacy size classes for backwards compatibility
            'amw-icon--small': size === 'small',
            'amw-icon--large': size === 'large',
            // Color classes
            'amw-icon--primary': color === 'primary',
            'amw-icon--accent': color === 'accent',
            'amw-icon--warn': color === 'warn',
            'amw-icon--inherit': color === 'inherit',
            // Custom class
            [this.iconClass() || '']: !!this.iconClass()
        };
    });
}
