import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AmwDatepickerComponent, DatepickerSize, DatepickerAppearance } from '../../../../library/src/controls/components/amw-datepicker/amw-datepicker.component';

@Component({
    selector: 'amw-demo-datepicker',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        AmwDatepickerComponent
    ],
    templateUrl: './datepicker-demo.component.html',
    styleUrl: './datepicker-demo.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class DatepickerDemoComponent {
    datepickerVariations = {
        sizes: [
            { size: 'small' as DatepickerSize, label: 'Small' },
            { size: 'medium' as DatepickerSize, label: 'Medium' },
            { size: 'large' as DatepickerSize, label: 'Large' }
        ],
        appearances: [
            { appearance: 'outline' as DatepickerAppearance, label: 'Outline' },
            { appearance: 'fill' as DatepickerAppearance, label: 'Fill' }
        ],
        states: [
            { disabled: false, required: false, label: 'Default' },
            { disabled: false, required: true, label: 'Required' },
            { disabled: true, required: false, label: 'Disabled' }
        ]
    };

    selectedDate: Date | null = null;
    selectedBirthDate: Date | null = null;
    selectedRangeStart: Date | null = null;
    selectedRangeEnd: Date | null = null;

    minDate = new Date(2020, 0, 1);
    maxDate = new Date(2030, 11, 31);
    startAt = new Date(2024, 0, 1);
}
