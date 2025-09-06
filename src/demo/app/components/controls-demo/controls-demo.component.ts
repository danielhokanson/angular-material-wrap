import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { ButtonDemoComponent } from '../button-demo/button-demo.component';
import { InputDemoComponent } from '../input-demo/input-demo.component';
import { SelectDemoComponent } from '../select-demo/select-demo.component';
import { CheckboxDemoComponent } from '../checkbox-demo/checkbox-demo.component';
import { RadioDemoComponent } from '../radio-demo/radio-demo.component';
import { ToggleDemoComponent } from '../toggle-demo/toggle-demo.component';
import { TextareaDemoComponent } from '../textarea-demo/textarea-demo.component';
import { SliderDemoComponent } from '../slider-demo/slider-demo.component';
import { AutocompleteDemoComponent } from '../autocomplete-demo/autocomplete-demo.component';
import { DatepickerDemoComponent } from '../datepicker-demo/datepicker-demo.component';

@Component({
    selector: 'amw-demo-controls',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        ButtonDemoComponent,
        InputDemoComponent,
        SelectDemoComponent,
        CheckboxDemoComponent,
        RadioDemoComponent,
        ToggleDemoComponent,
        TextareaDemoComponent,
        SliderDemoComponent,
        AutocompleteDemoComponent,
        DatepickerDemoComponent
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './controls-demo.component.html',
    styleUrl: './controls-demo.component.scss'
})
export class ControlsDemoComponent implements OnInit {
    // Control definitions
    controls = [
        { id: 'button', name: 'Button' },
        { id: 'input', name: 'Input' },
        { id: 'select', name: 'Select' },
        { id: 'checkbox', name: 'Checkbox' },
        { id: 'radio', name: 'Radio Button' },
        { id: 'slider', name: 'Slider' },
        { id: 'toggle', name: 'Toggle' },
        { id: 'textarea', name: 'Textarea' },
        { id: 'autocomplete', name: 'Autocomplete' },
        { id: 'datepicker', name: 'Datepicker' }
    ];

    selectedControl = { id: 'button', name: 'Button' };
    selectedTab = 0; // 0 = Variations, 1 = Validation, 2 = Code, 3 = API

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        // Read the control from route data
        this.route.data.subscribe(data => {
            const controlId = data['control'];
            if (controlId) {
                const control = this.controls.find(c => c.id === controlId);
                if (control) {
                    this.selectedControl = control;
                }
            }
        });
    }
}
