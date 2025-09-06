import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AmwSelectComponent } from '../../../../library/src/controls/components/amw-select/amw-select.component';
import { SelectSize } from '../../../../library/src/controls/components/amw-select/interfaces/select-size.type';
import { SelectOption } from '../../../../library/src/controls/components/amw-select/interfaces/select.interface';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
    selector: 'amw-demo-select',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        AmwSelectComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './select-demo.component.html',
    styleUrl: './select-demo.component.scss'
})
export class SelectDemoComponent {
    // Select variations for display
    selectVariations = {
        appearances: [
            { appearance: 'outline' as MatFormFieldAppearance, label: 'Outline' },
            { appearance: 'fill' as MatFormFieldAppearance, label: 'Fill' },
            { appearance: 'outline' as MatFormFieldAppearance, label: 'Outline' }
        ],
        sizes: [
            { size: 'small' as SelectSize, label: 'Small' },
            { size: 'medium' as SelectSize, label: 'Medium' },
            { size: 'large' as SelectSize, label: 'Large' }
        ],
        states: [
            { disabled: false, required: false, multiple: false, label: 'Normal' },
            { disabled: true, required: false, multiple: false, label: 'Disabled' },
            { disabled: false, required: true, multiple: false, label: 'Required' },
            { disabled: false, required: false, multiple: true, label: 'Multiple' }
        ]
    };

    // Sample options
    sampleOptions: SelectOption[] = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3', disabled: true },
        { value: 'option4', label: 'Option 4' },
        { value: 'option5', label: 'Option 5' }
    ];

    groupedOptions: SelectOption[] = [
        { value: 'fruit1', label: 'Apple', group: 'Fruits' },
        { value: 'fruit2', label: 'Banana', group: 'Fruits' },
        { value: 'fruit3', label: 'Orange', group: 'Fruits' },
        { value: 'veg1', label: 'Carrot', group: 'Vegetables' },
        { value: 'veg2', label: 'Broccoli', group: 'Vegetables' },
        { value: 'veg3', label: 'Spinach', group: 'Vegetables' }
    ];
}
