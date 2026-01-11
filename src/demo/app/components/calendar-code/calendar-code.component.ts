import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseCodeComponent } from '../base/base-code.component';

type CalendarExamples = 'basic' | 'range' | 'minMax' | 'filter' | 'customClass';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent, AmwCardComponent, AmwCalendarPickerComponent } from '../../../../library/src/components/components';
@Component({
  selector: 'amw-demo-calendar-code',
  standalone: true,
  imports: [FormsModule,
    AmwCalendarPickerComponent,
    AmwButtonComponent,
    AmwAccordionComponent,
    AmwAccordionPanelComponent,
    AmwIconComponent,
    AmwCardComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar-code.component.html',
  styleUrl: './calendar-code.component.scss'
})
export class CalendarCodeComponent extends BaseCodeComponent<CalendarExamples> {
  // Example dates for previews
  selectedDate: Date | null = new Date();
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2025, 11, 31);

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<CalendarExamples, string> = {
    basic: `<amw-card headerTitle="Basic Calendar">
  <ng-template #cardContent>
    <amw-calendar-picker [(selected)]="selectedDate"></amw-calendar-picker>
  </ng-template>
</amw-card>`,

    range: `<amw-card headerTitle="Date Range Calendar">
  <ng-template #cardContent>
    <amw-calendar-picker
      [(selected)]="selectedDate"
      [startView]="'month'">
    </amw-calendar-picker>
  </ng-template>
</amw-card>`,

    minMax: `<amw-card headerTitle="Min/Max Date Calendar">
  <ng-template #cardContent>
    <amw-calendar-picker
      [(selected)]="selectedDate"
      [minDate]="minDate"
      [maxDate]="maxDate">
    </amw-calendar-picker>
  </ng-template>
</amw-card>`,

    filter: `<amw-card headerTitle="Filtered Calendar">
  <ng-template #cardContent>
    <amw-calendar-picker
      [(selected)]="selectedDate"
      [dateFilter]="myFilter">
    </amw-calendar-picker>
  </ng-template>
</amw-card>`,

    customClass: `<amw-card headerTitle="Custom Styled Calendar">
  <ng-template #cardContent>
    <amw-calendar-picker
      [(selected)]="selectedDate"
      [dateClass]="dateClass">
    </amw-calendar-picker>
  </ng-template>
</amw-card>`
  };

  constructor() {
    super();
  }

  // Date filter function for filtered calendar example
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected
    return day !== 0 && day !== 6;
  };

  // Custom date class function
  dateClass = (d: Date): string => {
    const date = d.getDate();
    // Highlight dates that are multiples of 5
    return date % 5 === 0 ? 'special-date' : '';
  };
}
