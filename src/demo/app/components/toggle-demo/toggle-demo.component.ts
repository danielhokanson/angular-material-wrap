import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AmwToggleComponent } from '../../../../library/src/controls/components/amw-toggle/amw-toggle.component';
import { ToggleColor } from '../../../../library/src/controls/components/amw-toggle/interfaces/toggle-color.type';
// Note: ToggleSize type doesn't exist, using string for now

@Component({
    selector: 'amw-demo-toggle',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        AmwToggleComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './toggle-demo.component.html',
    styleUrl: './toggle-demo.component.scss'
})
export class ToggleDemoComponent {
    // Toggle variations for display
    toggleVariations = {
        colors: [
            { color: 'primary' as ToggleColor, label: 'Primary' },
            { color: 'accent' as ToggleColor, label: 'Accent' },
            { color: 'warn' as ToggleColor, label: 'Warn' }
        ],
        sizes: [
            { size: 'small', label: 'Small' },
            { size: 'medium', label: 'Medium' },
            { size: 'large', label: 'Large' }
        ],
        states: [
            { checked: false, disabled: false, label: 'Unchecked' },
            { checked: true, disabled: false, label: 'Checked' },
            { checked: false, disabled: true, label: 'Disabled' }
        ]
    };
}