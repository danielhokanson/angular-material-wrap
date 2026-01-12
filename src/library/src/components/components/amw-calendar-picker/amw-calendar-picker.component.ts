import { Component, ViewEncapsulation, input, output, model, computed } from '@angular/core';
import { MatDatepickerModule, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

export type CalendarStartView = 'month' | 'year' | 'multi-year';

/**
 * Angular Material Wrap Calendar Picker Component
 *
 * A standalone calendar component for date selection that wraps Angular Material's mat-calendar.
 * Unlike amw-datepicker (which is an input field with popup), this displays the calendar directly.
 *
 * @example
 * ```html
 * <amw-calendar-picker
 *   [(selected)]="selectedDate"
 *   [minDate]="minDate"
 *   [maxDate]="maxDate">
 * </amw-calendar-picker>
 * ```
 *
 * @example
 * ```html
 * <!-- With date filter -->
 * <amw-calendar-picker
 *   [(selected)]="selectedDate"
 *   [dateFilter]="weekdaysOnly">
 * </amw-calendar-picker>
 * ```
 */
@Component({
    selector: 'amw-calendar-picker',
    standalone: true,
    imports: [
        MatDatepickerModule,
        MatNativeDateModule
    ],
    encapsulation: ViewEncapsulation.None,
    host: { 'data-amw-id': 'amw-calendar-picker' },
    template: `
        <mat-calendar
            [selected]="selected()"
            [startAt]="startAt()"
            [startView]="startView()"
            [minDate]="minDate()"
            [maxDate]="maxDate()"
            [dateFilter]="dateFilter()"
            [dateClass]="effectiveDateClass()"
            [class]="calendarClasses()"
            (selectedChange)="onSelectedChange($event)">
        </mat-calendar>
    `,
    styleUrl: './amw-calendar-picker.component.scss'
})
export class AmwCalendarPickerComponent {
    /** The currently selected date (supports two-way binding) */
    readonly selected = model<Date | null>(null);

    /** The date to open the calendar to initially */
    readonly startAt = input<Date | null>(null);

    /** Whether the calendar should start in month, year, or multi-year view */
    readonly startView = input<CalendarStartView>('month');

    /** The minimum selectable date */
    readonly minDate = input<Date | null>(null);

    /** The maximum selectable date */
    readonly maxDate = input<Date | null>(null);

    /** Function to filter which dates are selectable */
    readonly dateFilter = input<((date: Date | null) => boolean) | undefined>();

    /** Function to add custom CSS classes to dates */
    readonly dateClass = input<((date: Date) => string) | undefined>();

    /** Custom CSS class for the calendar */
    readonly calendarClass = input<string | undefined>();

    /** Emitted when the selected date changes */
    readonly selectedChange = output<Date | null>();

    readonly calendarClasses = computed(() => {
        const classes = ['amw-calendar-picker'];
        const customClass = this.calendarClass();
        if (customClass) classes.push(customClass);
        return classes.join(' ');
    });

    /** Effective dateClass function with default fallback */
    readonly effectiveDateClass = computed((): MatCalendarCellClassFunction<Date> => {
        const fn = this.dateClass();
        return fn ? fn : () => '';
    });

    onSelectedChange(date: Date | null): void {
        this.selected.set(date);
        this.selectedChange.emit(date);
    }
}
