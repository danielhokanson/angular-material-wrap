import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';
import { CheckboxColor } from '../../../../library/src/controls/components/amw-checkbox/interfaces/checkbox-color.type';
import { CheckboxSize } from '../../../../library/src/controls/components/amw-checkbox/interfaces/checkbox-size.type';

@Component({
    selector: 'amw-demo-checkbox',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        AmwCheckboxComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './checkbox-demo.component.html',
    styleUrl: './checkbox-demo.component.scss'
})
export class CheckboxDemoComponent {
    // Checkbox variations for display
    checkboxVariations = {
        colors: [
            { color: 'primary' as CheckboxColor, label: 'Primary' },
            { color: 'accent' as CheckboxColor, label: 'Accent' },
            { color: 'warn' as CheckboxColor, label: 'Warn' }
        ],
        sizes: [
            { size: 'small' as CheckboxSize, label: 'Small' },
            { size: 'medium' as CheckboxSize, label: 'Medium' },
            { size: 'large' as CheckboxSize, label: 'Large' }
        ],
        states: [
            { checked: false, disabled: false, indeterminate: false, label: 'Unchecked' },
            { checked: true, disabled: false, indeterminate: false, label: 'Checked' },
            { checked: false, disabled: true, indeterminate: false, label: 'Disabled' },
            { checked: false, disabled: false, indeterminate: true, label: 'Indeterminate' }
        ]
    };
}