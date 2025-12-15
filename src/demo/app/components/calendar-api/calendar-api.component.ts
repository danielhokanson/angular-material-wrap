import { Component, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';

@Component({
  selector: 'amw-demo-calendar-api',
  standalone: true,
  imports: [MatExpansionModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar-api.component.html',
  styleUrl: './calendar-api.component.scss'
})
export class CalendarApiComponent extends BaseApiComponent {
  apiDocumentation: ApiDocumentation = {
    inputs: [
      {
        name: 'selected',
        type: 'Date | null',
        default: 'null',
        description: 'The currently selected date'
      },
      {
        name: 'minDate',
        type: 'Date | null',
        default: 'null',
        description: 'The minimum selectable date'
      },
      {
        name: 'maxDate',
        type: 'Date | null',
        default: 'null',
        description: 'The maximum selectable date'
      },
      {
        name: 'startView',
        type: 'MatCalendarView',
        default: 'month',
        description: 'The view that the calendar should start in',
        options: ['month', 'year', 'multi-year']
      },
      {
        name: 'dateFilter',
        type: '(date: Date) => boolean',
        default: 'null',
        description: 'Function to filter which dates are selectable'
      },
      {
        name: 'dateClass',
        type: 'MatCalendarCellClassFunction',
        default: 'null',
        description: 'Function to add custom CSS classes to dates'
      },
      {
        name: 'startAt',
        type: 'Date | null',
        default: 'null',
        description: 'The date to open the calendar to initially'
      }
    ],
    outputs: [
      {
        name: 'selectedChange', type: 'EventEmitter<Date | null>', description: 'Emitted when the selected date changes'
      },
      {
        name: 'yearSelected', type: 'EventEmitter<Date>', description: 'Emitted when a year is selected in multi-year view'
      },
      {
        name: 'monthSelected', type: 'EventEmitter<Date>', description: 'Emitted when a month is selected in year view'
      },
      {
        name: 'viewChanged', type: 'EventEmitter<MatCalendarView>', description: 'Emitted when the calendar view changes'
      }
    ],
    methods: [
      {
        name: 'updateTodaysDate()',
        returns: 'void',
        description: 'Updates the current date to today'
      },
      {
        name: 'focusActiveCell()',
        returns: 'void',
        description: 'Focuses the active cell after the microtask queue is empty'
      }
    ]
  };


  constructor() {

      super();

  }

}
