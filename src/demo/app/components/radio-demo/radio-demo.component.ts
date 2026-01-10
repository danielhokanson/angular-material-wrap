import { Component, ViewEncapsulation } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { AmwRadioComponent } from '../../../../library/src/controls/components/amw-radio/amw-radio.component';
import { AmwSize, AmwColor } from '../../../../library/src/shared/types';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'amw-demo-radio',
    standalone: true,
    imports: [
    MatIconModule,
    AmwRadioComponent,
    AmwRadioComponent,
    MatRadioModule
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './radio-demo.component.html',
    styleUrl: './radio-demo.component.scss'
})
export class RadioDemoComponent {
    // Radio variations for display
    radioVariations = {
        colors: [
            { color: 'primary' as AmwColor, label: 'Primary' },
            { color: 'accent' as AmwColor, label: 'Accent' },
            { color: 'warn' as AmwColor, label: 'Warn' }
        ],
        sizes: [
            { size: 'small' as AmwSize, label: 'Small' },
            { size: 'medium' as AmwSize, label: 'Medium' },
            { size: 'large' as AmwSize, label: 'Large' }
        ],
        states: [
            { checked: false, disabled: false, label: 'Unchecked' },
            { checked: true, disabled: false, label: 'Checked' },
            { checked: false, disabled: true, label: 'Disabled' }
        ]
    };
}