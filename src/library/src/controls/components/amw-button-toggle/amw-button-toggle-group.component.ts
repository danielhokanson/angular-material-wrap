import { Component, ViewEncapsulation, input, output, computed, model, forwardRef, contentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import { MatButtonToggleModule, MatButtonToggleChange } from '@angular/material/button-toggle';
import { AmwButtonToggleComponent } from './amw-button-toggle.component';

/** Button toggle group appearance type */
export type AmwButtonToggleAppearance = 'standard' | 'legacy';

/**
 * Angular Material Wrap Button Toggle Group Component
 *
 * A container for grouped toggle buttons that supports single or multiple selection.
 * Implements ControlValueAccessor for form integration.
 *
 * @example
 * Single selection:
 * ```html
 * <amw-button-toggle-group [(ngModel)]="viewMode">
 *   <amw-button-toggle value="list" icon="view_list">List</amw-button-toggle>
 *   <amw-button-toggle value="grid" icon="grid_view">Grid</amw-button-toggle>
 * </amw-button-toggle-group>
 * ```
 *
 * @example
 * Multiple selection:
 * ```html
 * <amw-button-toggle-group [(ngModel)]="selectedOptions" multiple>
 *   <amw-button-toggle value="bold" icon="format_bold"></amw-button-toggle>
 *   <amw-button-toggle value="italic" icon="format_italic"></amw-button-toggle>
 *   <amw-button-toggle value="underline" icon="format_underlined"></amw-button-toggle>
 * </amw-button-toggle-group>
 * ```
 *
 * @example
 * Vertical layout:
 * ```html
 * <amw-button-toggle-group [(ngModel)]="selected" vertical>
 *   <amw-button-toggle value="a">Option A</amw-button-toggle>
 *   <amw-button-toggle value="b">Option B</amw-button-toggle>
 * </amw-button-toggle-group>
 * ```
 */
@Component({
    selector: 'amw-button-toggle-group',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormField,
        MatButtonToggleModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-button-toggle-group.component.html',
    styleUrl: './amw-button-toggle.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AmwButtonToggleGroupComponent),
            multi: true
        }
    ]
})
export class AmwButtonToggleGroupComponent implements ControlValueAccessor {
    /**
     * Signal Forms field binding (experimental).
     * Use this for Angular Signal Forms API integration.
     * Mutually exclusive with ngModel and formControl/formControlName.
     * @experimental
     */
    readonly formField = input<any>(undefined);

    /** Current selected value(s) (two-way bindable) */
    readonly value = model<any>();

    /** Allow multiple selection */
    readonly multiple = input<boolean>(false);

    /** Whether the group is disabled */
    readonly disabled = input<boolean>(false);

    /** Vertical layout */
    readonly vertical = input<boolean>(false);

    /** Visual appearance style */
    readonly appearance = input<AmwButtonToggleAppearance>('standard');

    /** Group name for form identification */
    readonly name = input<string | undefined>();

    /** Custom CSS class */
    readonly groupClass = input<string | undefined>();

    /** Emitted when selection changes */
    readonly valueChange = output<any>();

    /** Child toggle buttons */
    readonly toggleButtons = contentChildren(AmwButtonToggleComponent);

    // CVA callbacks
    private onChange: (value: any) => void = () => {};
    private onTouched: () => void = () => {};
    private disabledFromCVA = false;

    /** Computed CSS classes */
    readonly groupClasses = computed(() => {
        const classes = ['amw-button-toggle-group'];
        const customClass = this.groupClass();
        const appearance = this.appearance();

        if (this.vertical()) {
            classes.push('amw-button-toggle-group--vertical');
        }

        if (appearance) {
            classes.push(`amw-button-toggle-group--${appearance}`);
        }

        if (this.isDisabled()) {
            classes.push('amw-button-toggle-group--disabled');
        }

        if (customClass) {
            classes.push(customClass);
        }

        return classes.join(' ');
    });

    /** Check if disabled (from input or CVA) */
    isDisabled(): boolean {
        return this.disabled() || this.disabledFromCVA;
    }

    /** Handle toggle change from mat-button-toggle-group */
    onToggleChange(event: MatButtonToggleChange): void {
        const newValue = event.value;
        this.value.set(newValue);
        this.valueChange.emit(newValue);
        this.onChange(newValue);
        this.onTouched();
    }

    // ControlValueAccessor implementation
    writeValue(value: any): void {
        this.value.set(value);
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabledFromCVA = isDisabled;
    }
}
