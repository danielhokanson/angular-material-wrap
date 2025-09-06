import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AmwSliderComponent } from '../../../../library/src/controls/components/amw-slider/amw-slider.component';
// Note: SliderSize type doesn't exist, using string for now

@Component({
    selector: 'amw-demo-slider',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        AmwSliderComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './slider-demo.component.html',
    styleUrl: './slider-demo.component.scss'
})
export class SliderDemoComponent {
    // Slider variations for display
    sliderVariations = {
        sizes: [
            { size: 'small', label: 'Small' },
            { size: 'medium', label: 'Medium' },
            { size: 'large', label: 'Large' }
        ],
        orientations: [
            { vertical: false, label: 'Horizontal' },
            { vertical: true, label: 'Vertical' }
        ],
        states: [
            { disabled: false, label: 'Normal' },
            { disabled: true, label: 'Disabled' }
        ]
    };
}