import { Component, ViewEncapsulation } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AmwTimepickerComponent } from '../../../../library/src/controls/components/amw-timepicker/amw-timepicker.component';

@Component({
    selector: 'amw-demo-timepicker',
    standalone: true,
    imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    AmwTimepickerComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './timepicker-demo.component.html',
    styleUrl: './timepicker-demo.component.scss'
})
export class TimepickerDemoComponent {
    timepickerVariations = [
        {
            title: 'Basic Timepicker',
            description: 'Default timepicker with 24-hour format',
            timepicker: { value: '14:30' }
        },
        {
            title: '12-Hour Format',
            description: 'Timepicker with AM/PM display',
            timepicker: { value: '02:30', format: '12h' as '12h' | '24h' }
        },
        {
            title: 'With Seconds',
            description: 'Timepicker showing seconds',
            timepicker: { value: '14:30:45', showSeconds: true }
        },
        {
            title: 'Small Size',
            description: 'Compact timepicker variant',
            timepicker: { value: '09:15', size: 'small' as 'small' | 'medium' | 'large' }
        },
        {
            title: 'Large Size',
            description: 'Larger timepicker variant',
            timepicker: { value: '16:45', size: 'large' as 'small' | 'medium' | 'large' }
        },
        {
            title: 'Primary Color',
            description: 'Timepicker with primary color theme',
            timepicker: { value: '11:20', color: 'primary' as 'primary' | 'accent' | 'warn' }
        },
        {
            title: 'Accent Color',
            description: 'Timepicker with accent color theme',
            timepicker: { value: '13:45', color: 'accent' as 'primary' | 'accent' | 'warn' }
        },
        {
            title: 'Warn Color',
            description: 'Timepicker with warn color theme',
            timepicker: { value: '18:00', color: 'warn' as 'primary' | 'accent' | 'warn' }
        },
        {
            title: 'Disabled State',
            description: 'Non-interactive timepicker',
            timepicker: { value: '12:00', disabled: true }
        },
        {
            title: 'Required Field',
            description: 'Timepicker with required validation',
            timepicker: { value: '', required: true, placeholder: 'Select time' }
        }
    ];

    onTimeChange(time: string, index: number) {
        console.log(`Timepicker ${index} changed to:`, time);
    }
}