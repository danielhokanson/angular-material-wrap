import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AmwIconComponent } from '../../../components/components/amw-icon/amw-icon.component';

/**
 * Angular Material Wrap Button Toggle Component
 *
 * An individual toggle button to be used within amw-button-toggle-group.
 * Can contain text, an icon, or both.
 *
 * @example
 * Text only:
 * ```html
 * <amw-button-toggle value="option1">Option 1</amw-button-toggle>
 * ```
 *
 * @example
 * Icon only:
 * ```html
 * <amw-button-toggle value="bold" icon="format_bold"></amw-button-toggle>
 * ```
 *
 * @example
 * Icon with text:
 * ```html
 * <amw-button-toggle value="list" icon="view_list">List View</amw-button-toggle>
 * ```
 */
@Component({
    selector: 'amw-button-toggle',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonToggleModule,
        AmwIconComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-button-toggle.component.html',
    styleUrl: './amw-button-toggle.component.scss'
})
export class AmwButtonToggleComponent {
    /** Toggle value (required) */
    readonly value = input.required<any>();

    /** Whether this toggle is disabled */
    readonly disabled = input<boolean>(false);

    /** Icon name (Material icon) */
    readonly icon = input<string | undefined>();

    /** Aria label for accessibility */
    readonly ariaLabel = input<string | undefined>();

    /** Custom CSS class */
    readonly toggleClass = input<string | undefined>();

    /** Computed CSS classes */
    readonly toggleClasses = computed(() => {
        const classes = ['amw-button-toggle'];
        const customClass = this.toggleClass();

        if (this.icon()) {
            classes.push('amw-button-toggle--has-icon');
        }

        if (this.disabled()) {
            classes.push('amw-button-toggle--disabled');
        }

        if (customClass) {
            classes.push(customClass);
        }

        return classes.join(' ');
    });
}
