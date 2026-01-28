import { Component, ViewEncapsulation, input, output, computed, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { AmwIconComponent } from '../../../components/components/amw-icon/amw-icon.component';

/** Chip color type */
export type AmwChipColor = 'primary' | 'accent' | 'warn';

/**
 * Angular Material Wrap Chip Component
 *
 * A standalone chip component for displaying compact elements representing
 * inputs, attributes, or actions. This is a simpler alternative to the
 * full-featured amw-chips component for basic chip use cases.
 *
 * @example
 * Basic usage:
 * ```html
 * <amw-chip label="Angular"></amw-chip>
 * ```
 *
 * @example
 * Removable chip:
 * ```html
 * <amw-chip label="Tag" removable (removed)="onRemove()"></amw-chip>
 * ```
 *
 * @example
 * Selectable chip:
 * ```html
 * <amw-chip
 *   label="Option"
 *   selectable
 *   [(selected)]="isSelected"
 *   (selectionChange)="onSelect($event)">
 * </amw-chip>
 * ```
 *
 * @example
 * Chip with icon and avatar:
 * ```html
 * <amw-chip label="User" icon="person" avatar="/path/to/avatar.jpg"></amw-chip>
 * ```
 */
@Component({
    selector: 'amw-chip',
    standalone: true,
    imports: [
        CommonModule,
        MatChipsModule,
        AmwIconComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-chip.component.html',
    styleUrl: './amw-chip.component.scss'
})
export class AmwChipComponent {
    /** Chip text (required) */
    readonly label = input.required<string>();

    /** Shows remove button when true */
    readonly removable = input<boolean>(false);

    /** Chip can be selected when true */
    readonly selectable = input<boolean>(false);

    /** Selection state (two-way bindable) */
    readonly selected = model<boolean>(false);

    /** Whether the chip is disabled */
    readonly disabled = input<boolean>(false);

    /** Chip color from theme */
    readonly color = input<AmwChipColor | undefined>();

    /** Leading icon name (Material icon) */
    readonly icon = input<string | undefined>();

    /** Avatar image URL */
    readonly avatar = input<string | undefined>();

    /** Custom CSS class */
    readonly chipClass = input<string | undefined>();

    /** Emitted when remove button is clicked */
    readonly removed = output<void>();

    /** Emitted when selection state changes */
    readonly selectionChange = output<boolean>();

    /** Computed CSS classes for the chip */
    readonly chipClasses = computed(() => {
        const classes = ['amw-chip'];
        const color = this.color();
        const customClass = this.chipClass();

        if (color) {
            classes.push(`amw-chip--${color}`);
        }

        if (this.selected()) {
            classes.push('amw-chip--selected');
        }

        if (this.disabled()) {
            classes.push('amw-chip--disabled');
        }

        if (this.selectable()) {
            classes.push('amw-chip--selectable');
        }

        if (this.removable()) {
            classes.push('amw-chip--removable');
        }

        if (this.avatar()) {
            classes.push('amw-chip--has-avatar');
        }

        if (customClass) {
            classes.push(customClass);
        }

        return classes.join(' ');
    });

    /** Handle chip click for selection */
    onChipClick(): void {
        if (this.selectable() && !this.disabled()) {
            const newValue = !this.selected();
            this.selected.set(newValue);
            this.selectionChange.emit(newValue);
        }
    }

    /** Handle remove button click */
    onRemove(event: Event): void {
        event.stopPropagation();
        if (!this.disabled()) {
            this.removed.emit();
        }
    }

    /** Handle chip removed event from mat-chip */
    onChipRemoved(): void {
        if (!this.disabled()) {
            this.removed.emit();
        }
    }

    /** Handle keyboard events for accessibility */
    onKeydown(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.onChipClick();
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
            if (this.removable() && !this.disabled()) {
                event.preventDefault();
                this.removed.emit();
            }
        }
    }
}
