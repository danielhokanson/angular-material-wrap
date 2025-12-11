import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'amw-demo-calendar-code',
  standalone: true,
  imports: [
    FormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar-code.component.html',
  styleUrl: './calendar-code.component.scss'
})
export class CalendarCodeComponent {
  editableCode = {
    basic: '',
    range: '',
    minMax: '',
    filter: '',
    customClass: ''
  };

  // Example dates for previews
  selectedDate = new Date();
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2025, 11, 31);

  constructor() {
    this.editableCode.basic = this.codeExamples.basic;
    this.editableCode.range = this.codeExamples.range;
    this.editableCode.minMax = this.codeExamples.minMax;
    this.editableCode.filter = this.codeExamples.filter;
    this.editableCode.customClass = this.codeExamples.customClass;
  }

  resetCode(exampleKey: keyof typeof this.codeExamples) {
    this.editableCode[exampleKey] = this.codeExamples[exampleKey];
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

  codeExamples = {
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
}
