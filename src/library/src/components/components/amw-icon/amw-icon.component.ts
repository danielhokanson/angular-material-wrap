import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

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
 * Sized icon:
 * ```html
 * <amw-icon name="settings" size="large"></amw-icon>
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
        'class': 'amw-icon'
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
        .amw-icon--small mat-icon {
            font-size: 18px;
            width: 18px;
            height: 18px;
        }
        .amw-icon--large mat-icon {
            font-size: 32px;
            width: 32px;
            height: 32px;
        }
        .amw-icon--primary { color: var(--mat-primary-color, #6750A4); }
        .amw-icon--accent { color: var(--mat-accent-color, #625B71); }
        .amw-icon--warn { color: var(--mat-warn-color, #B3261E); }
    `]
})
export class AmwIconComponent {
    /** The name of the icon to display (from Material Icons font) */
    readonly name = input('');

    /** The color theme of the icon */
    readonly color = input<'primary' | 'accent' | 'warn' | undefined>();

    /** The size of the icon */
    readonly size = input<'small' | 'medium' | 'large' | undefined>();

    /** The font set to use (default is 'material-icons') */
    readonly fontSet = input('');

    /** The CSS class for the font icon (when using icon fonts other than Material Icons) */
    readonly fontIcon = input('');

    /** Whether the icon should be inlined with text */
    readonly inline = input(false);

    /** Custom CSS class for the icon */
    readonly iconClass = input<string | undefined>();

    readonly iconClasses = computed(() => ({
        'amw-icon--small': this.size() === 'small',
        'amw-icon--large': this.size() === 'large',
        'amw-icon--primary': this.color() === 'primary',
        'amw-icon--accent': this.color() === 'accent',
        'amw-icon--warn': this.color() === 'warn',
        [this.iconClass() || '']: !!this.iconClass()
    }));
}
