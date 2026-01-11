import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AmwDatepickerComponent } from '../../../../library/src/controls/components/amw-datepicker/amw-datepicker.component';
import { AmwSize, AmwAppearance } from '../../../../library/src/shared/types';
import { AmwIconComponent } from '../../../../library/src/components/components';

@Component({
    selector: 'amw-demo-datepicker',
    standalone: true,
    imports: [
    CommonModule,
    FormsModule,
    AmwDatepickerComponent,
    AmwIconComponent
],
    templateUrl: './datepicker-demo.component.html',
    styleUrl: './datepicker-demo.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class DatepickerDemoComponent {
    datepickerVariations = {
        sizes: [
            { size: 'small' as AmwSize, label: 'Small' },
            { size: 'medium' as AmwSize, label: 'Medium' },
            { size: 'large' as AmwSize, label: 'Large' }
        ],
        appearances: [
            { appearance: 'outline' as AmwAppearance, label: 'Outline' },
            { appearance: 'fill' as AmwAppearance, label: 'Fill' }
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
