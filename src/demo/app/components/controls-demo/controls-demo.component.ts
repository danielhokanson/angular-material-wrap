import { Component, ViewEncapsulation, OnInit, ComponentRef, ViewContainerRef, Type } from '@angular/core';
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
import { RadioGroupDemoComponent } from '../radio-group-demo/radio-group-demo.component';
import { ToggleDemoComponent } from '../toggle-demo/toggle-demo.component';
import { TextareaDemoComponent } from '../textarea-demo/textarea-demo.component';
import { SliderDemoComponent } from '../slider-demo/slider-demo.component';
import { AutocompleteDemoComponent } from '../autocomplete-demo/autocomplete-demo.component';
import { DatepickerDemoComponent } from '../datepicker-demo/datepicker-demo.component';

// Tab components
import { ButtonValidationComponent } from '../button-validation/button-validation.component';
import { ButtonCodeComponent } from '../button-code/button-code.component';
import { ButtonApiComponent } from '../button-api/button-api.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { InputCodeComponent } from '../input-code/input-code.component';
import { InputApiComponent } from '../input-api/input-api.component';
import { SelectValidationComponent } from '../select-validation/select-validation.component';
import { SelectCodeComponent } from '../select-code/select-code.component';
import { SelectApiComponent } from '../select-api/select-api.component';
import { CheckboxValidationComponent } from '../checkbox-validation/checkbox-validation.component';
import { CheckboxCodeComponent } from '../checkbox-code/checkbox-code.component';
import { CheckboxApiComponent } from '../checkbox-api/checkbox-api.component';
import { RadioValidationComponent } from '../radio-validation/radio-validation.component';
import { RadioCodeComponent } from '../radio-code/radio-code.component';
import { RadioApiComponent } from '../radio-api/radio-api.component';
import { RadioGroupValidationComponent } from '../radio-group-validation/radio-group-validation.component';
import { RadioGroupCodeComponent } from '../radio-group-code/radio-group-code.component';
import { RadioGroupApiComponent } from '../radio-group-api/radio-group-api.component';
import { ChipsDemoComponent } from '../chips-demo/chips-demo.component';
import { ToggleValidationComponent } from '../toggle-validation/toggle-validation.component';
import { ToggleCodeComponent } from '../toggle-code/toggle-code.component';
import { ToggleApiComponent } from '../toggle-api/toggle-api.component';
import { TextareaValidationComponent } from '../textarea-validation/textarea-validation.component';
import { TextareaCodeComponent } from '../textarea-code/textarea-code.component';
import { TextareaApiComponent } from '../textarea-api/textarea-api.component';
import { SliderValidationComponent } from '../slider-validation/slider-validation.component';
import { SliderCodeComponent } from '../slider-code/slider-code.component';
import { SliderApiComponent } from '../slider-api/slider-api.component';
import { AutocompleteValidationComponent } from '../autocomplete-validation/autocomplete-validation.component';
import { AutocompleteCodeComponent } from '../autocomplete-code/autocomplete-code.component';
import { AutocompleteApiComponent } from '../autocomplete-api/autocomplete-api.component';
import { DatepickerValidationComponent } from '../datepicker-validation/datepicker-validation.component';
import { DatepickerCodeComponent } from '../datepicker-code/datepicker-code.component';
import { DatepickerApiComponent } from '../datepicker-api/datepicker-api.component';
import { RangeSliderDemoComponent } from '../range-slider-demo/range-slider-demo.component';
import { RangeSliderValidationComponent } from '../range-slider-validation/range-slider-validation.component';
import { RangeSliderCodeComponent } from '../range-slider-code/range-slider-code.component';
import { RangeSliderApiComponent } from '../range-slider-api/range-slider-api.component';
import { SwitchDemoComponent } from '../switch-demo/switch-demo.component';
import { SwitchValidationComponent } from '../switch-validation/switch-validation.component';
import { SwitchCodeComponent } from '../switch-code/switch-code.component';
import { SwitchApiComponent } from '../switch-api/switch-api.component';
import { FileInputDemoComponent } from '../file-input-demo/file-input-demo.component';
import { FileInputValidationComponent } from '../file-input-validation/file-input-validation.component';
import { FileInputCodeComponent } from '../file-input-code/file-input-code.component';
import { FileInputApiComponent } from '../file-input-api/file-input-api.component';
import { TimepickerDemoComponent } from '../timepicker-demo/timepicker-demo.component';
import { TimepickerValidationComponent } from '../timepicker-validation/timepicker-validation.component';
import { TimepickerCodeComponent } from '../timepicker-code/timepicker-code.component';
import { TimepickerApiComponent } from '../timepicker-api/timepicker-api.component';
import { ColorPickerDemoComponent } from '../color-picker-demo/color-picker-demo.component';
import { ColorPickerValidationComponent } from '../color-picker-validation/color-picker-validation.component';
import { ColorPickerCodeComponent } from '../color-picker-code/color-picker-code.component';
import { ColorPickerApiComponent } from '../color-picker-api/color-picker-api.component';
import { DataTableDemoComponent } from '../data-table-demo/data-table-demo.component';
import { DataTableValidationComponent } from '../data-table-validation/data-table-validation.component';
import { DataTableCodeComponent } from '../data-table-code/data-table-code.component';
import { DataTableApiComponent } from '../data-table-api/data-table-api.component';

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
        RadioGroupDemoComponent,
        ToggleDemoComponent,
        TextareaDemoComponent,
        SliderDemoComponent,
        AutocompleteDemoComponent,
        DatepickerDemoComponent,
        // Tab components
        ButtonValidationComponent,
        ButtonCodeComponent,
        ButtonApiComponent,
        InputValidationComponent,
        InputCodeComponent,
        InputApiComponent,
        SelectValidationComponent,
        SelectCodeComponent,
        SelectApiComponent,
        CheckboxValidationComponent,
        CheckboxCodeComponent,
        CheckboxApiComponent,
        RadioValidationComponent,
        RadioCodeComponent,
        RadioApiComponent,
        RadioGroupValidationComponent,
        RadioGroupCodeComponent,
        RadioGroupApiComponent,
        ChipsDemoComponent,
        ToggleValidationComponent,
        ToggleCodeComponent,
        ToggleApiComponent,
        TextareaValidationComponent,
        TextareaCodeComponent,
        TextareaApiComponent,
        SliderValidationComponent,
        SliderCodeComponent,
        SliderApiComponent,
        AutocompleteValidationComponent,
        AutocompleteCodeComponent,
        AutocompleteApiComponent,
        DatepickerValidationComponent,
        DatepickerCodeComponent,
        DatepickerApiComponent,
        RangeSliderDemoComponent,
        RangeSliderValidationComponent,
        RangeSliderCodeComponent,
        RangeSliderApiComponent,
        SwitchDemoComponent,
        SwitchValidationComponent,
        SwitchCodeComponent,
        SwitchApiComponent,
        FileInputDemoComponent,
        FileInputValidationComponent,
        FileInputCodeComponent,
        FileInputApiComponent,
        TimepickerDemoComponent,
        TimepickerValidationComponent,
        TimepickerCodeComponent,
        TimepickerApiComponent,
        ColorPickerDemoComponent,
        ColorPickerValidationComponent,
        ColorPickerCodeComponent,
        ColorPickerApiComponent,
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
        { id: 'radio-group', name: 'Radio Group' },
        { id: 'chips', name: 'Chips' },
        { id: 'slider', name: 'Slider' },
        { id: 'toggle', name: 'Toggle' },
        { id: 'textarea', name: 'Textarea' },
        { id: 'autocomplete', name: 'Autocomplete' },
        { id: 'datepicker', name: 'Datepicker' },
        { id: 'range-slider', name: 'Range Slider' },
        { id: 'switch', name: 'Switch' },
        { id: 'file-input', name: 'File Input' },
        { id: 'timepicker', name: 'Time Picker' },
        { id: 'color-picker', name: 'Color Picker' }
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
