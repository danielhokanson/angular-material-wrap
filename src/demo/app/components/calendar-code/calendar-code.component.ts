import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BaseCodeComponent } from '../base/base-code.component';

type CalendarExamples = 'basic' | 'range' | 'minMax' | 'filter' | 'customClass';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwAccordionComponent, AmwAccordionPanelComponent, AmwIconComponent, AmwCardComponent } from '../../../../library/src/components/components';
@Component({
  selector: 'amw-demo-calendar-code',
  standalone: true,
  imports: [FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
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
  selectedDate = new Date();
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2025, 11, 31);

  // Original code examples (for reset functionality)
  readonly codeExamples: Record<CalendarExamples, string> = {
    basic: `<amw-card headerTitle="Basic Calendar">
  <ng-template #cardContent>
    <mat-calendar [(selected)]="selectedDate"></mat-calendar>
  </ng-template>
</amw-card>`,

    range: `<amw-card headerTitle="Date Range Calendar">
  <ng-template #cardContent>
    <mat-calendar
      [(selected)]="selectedDate"
      [startView]="'month'">
    </mat-calendar>
  </ng-template>
</amw-card>`,

    minMax: `<amw-card headerTitle="Min/Max Date Calendar">
  <ng-template #cardContent>
    <mat-calendar
      [(selected)]="selectedDate"
      [minDate]="minDate"
      [maxDate]="maxDate">
    </mat-calendar>
  </ng-template>
</amw-card>`,

    filter: `<amw-card headerTitle="Filtered Calendar">
  <ng-template #cardContent>
    <mat-calendar
      [(selected)]="selectedDate"
      [dateFilter]="myFilter">
    </mat-calendar>
  </ng-template>
</amw-card>`,

    customClass: `<amw-card headerTitle="Custom Styled Calendar">
  <ng-template #cardContent>
    <mat-calendar
      [(selected)]="selectedDate"
      [dateClass]="dateClass">
    </mat-calendar>
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
