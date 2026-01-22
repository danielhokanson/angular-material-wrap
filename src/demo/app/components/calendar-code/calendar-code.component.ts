import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmwCodeDocComponent, CodeExample } from '../../shared/components/code-doc/code-doc.component';
import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwIconComponent, AmwCardComponent, AmwCalendarPickerComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-calendar-code',
  standalone: true,
  imports: [
    FormsModule,
    AmwCodeDocComponent,
    AmwCalendarPickerComponent,
    AmwButtonComponent,
    AmwIconComponent,
    AmwCardComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar-code.component.html',
  styleUrl: './calendar-code.component.scss'
})
export class CalendarCodeComponent implements OnInit {
  // Example dates for previews
  selectedDate: Date | null = new Date();
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2025, 11, 31);

  // Editable code for the shared component
  editableCode: Record<string, string> = {};

  // Code examples data
  readonly examples: CodeExample[] = [
    {
      key: 'basic',
      title: 'Basic Calendar',
      description: 'Simple calendar with date selection',
      code: `<amw-card headerTitle="Basic Calendar">
  <ng-template #cardContent>
    <amw-calendar-picker [(selected)]="selectedDate"></amw-calendar-picker>
  </ng-template>
</amw-card>`
    },
    {
      key: 'range',
      title: 'Date Range Calendar',
      description: 'Calendar with start view configuration',
      code: `<amw-card headerTitle="Date Range Calendar">
  <ng-template #cardContent>
    <amw-calendar-picker
      [(selected)]="selectedDate"
      [startView]="'month'">
    </amw-calendar-picker>
  </ng-template>
</amw-card>`
    },
    {
      key: 'minMax',
      title: 'Min/Max Date Calendar',
      description: 'Calendar with date range restrictions',
      code: `<amw-card headerTitle="Min/Max Date Calendar">
  <ng-template #cardContent>
    <amw-calendar-picker
      [(selected)]="selectedDate"
      [minDate]="minDate"
      [maxDate]="maxDate">
    </amw-calendar-picker>
  </ng-template>
</amw-card>`
    },
    {
      key: 'filter',
      title: 'Filtered Calendar',
      description: 'Calendar with custom date filter',
      code: `<amw-card headerTitle="Filtered Calendar">
  <ng-template #cardContent>
    <amw-calendar-picker
      [(selected)]="selectedDate"
      [dateFilter]="myFilter">
    </amw-calendar-picker>
  </ng-template>
</amw-card>`
    },
    {
      key: 'customClass',
      title: 'Custom Styled Calendar',
      description: 'Calendar with custom date classes',
      code: `<amw-card headerTitle="Custom Styled Calendar">
  <ng-template #cardContent>
    <amw-calendar-picker
      [(selected)]="selectedDate"
      [dateClass]="dateClass">
    </amw-calendar-picker>
  </ng-template>
</amw-card>`
    }
  ];

  ngOnInit(): void {
    // Initialize editable code from examples
    this.examples.forEach(example => {
      this.editableCode[example.key] = example.code;
    });
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
