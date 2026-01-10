import { Component, ViewEncapsulation } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AmwRangeSliderComponent } from '../../../../library/src/controls/components/amw-range-slider/amw-range-slider.component';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../../library/src/controls/components/amw-input/amw-input.component';
import { AmwCheckboxComponent } from '../../../../library/src/controls/components/amw-checkbox/amw-checkbox.component';
@Component({
    selector: 'amw-demo-range-slider',
    standalone: true,
    imports: [FormsModule,
    MatIconModule,
    MatButtonToggleModule,
    AmwRangeSliderComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwCheckboxComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './range-slider-demo.component.html',
    styleUrl: './range-slider-demo.component.scss'
})
export class RangeSliderDemoComponent {
    // Basic range slider
    basicRange = { start: 20, end: 80 };

    // Configuration options
    minValue = 0;
    maxValue = 100;
    stepValue = 1;
    showTicks = false;
    showLabels = false;
    vertical = false;
    invert = false;
    thumbLabel = false;
    tickInterval = 1;
    startThumbLabel = 'Start';
    endThumbLabel = 'End';
    color: 'primary' | 'accent' | 'warn' = 'primary';

    // Real-world examples
    priceRange = { start: 50, end: 500 };
    ageRange = { start: 18, end: 65 };
    temperatureRange = { start: 20, end: 30 };

    onRangeChange(range: { start: number; end: number }): void {
        console.log('Range changed:', range);
    }

    onPriceRangeChange(range: { start: number; end: number }): void {
        console.log('Price range changed:', range);
    }

    onAgeRangeChange(range: { start: number; end: number }): void {
        console.log('Age range changed:', range);
    }

    onTemperatureRangeChange(range: { start: number; end: number }): void {
        console.log('Temperature range changed:', range);
    }
}
