import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { BaseCodeComponent } from '../base/base-code.component';

type CalendarExamples = 'basic' | 'range' | 'minMax' | 'filter' | 'customClass';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
@Component({
  selector: 'amw-demo-calendar-code',
  standalone: true,
  imports: [FormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    AmwButtonComponent],
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
    basic: `<mat-card>
  <mat-card-header>
    <mat-card-title>Basic Calendar</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <mat-calendar [(selected)]="selectedDate"></mat-calendar>
  </mat-card-content>
</mat-card>`,

    range: `<mat-card>
  <mat-card-header>
    <mat-card-title>Date Range Calendar</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <mat-calendar
      [(selected)]="selectedDate"
      [startView]="'month'">
    </mat-calendar>
  </mat-card-content>
</mat-card>`,

    minMax: `<mat-card>
  <mat-card-header>
    <mat-card-title>Min/Max Date Calendar</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <mat-calendar
      [(selected)]="selectedDate"
      [minDate]="minDate"
      [maxDate]="maxDate">
    </mat-calendar>
  </mat-card-content>
</mat-card>`,

    filter: `<mat-card>
  <mat-card-header>
    <mat-card-title>Filtered Calendar</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <mat-calendar
      [(selected)]="selectedDate"
      [dateFilter]="myFilter">
    </mat-calendar>
  </mat-card-content>
</mat-card>`,

    customClass: `<mat-card>
  <mat-card-header>
    <mat-card-title>Custom Styled Calendar</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <mat-calendar
      [(selected)]="selectedDate"
      [dateClass]="dateClass">
    </mat-calendar>
  </mat-card-content>
</mat-card>`
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
