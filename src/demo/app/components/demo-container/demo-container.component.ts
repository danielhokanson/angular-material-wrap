import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DEMO_CONFIGS, DemoItem } from './demo-registry';
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent } from '../../../../library/src/components/components';

// Import all child components
import { ButtonDemoComponent } from '../button-demo/button-demo.component';
import { ButtonValidationComponent } from '../button-validation/button-validation.component';
import { ButtonCodeComponent } from '../button-code/button-code.component';
import { ButtonApiComponent } from '../button-api/button-api.component';
import { InputDemoComponent } from '../input-demo/input-demo.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { InputCodeComponent } from '../input-code/input-code.component';
import { InputApiComponent } from '../input-api/input-api.component';
import { SelectDemoComponent } from '../select-demo/select-demo.component';
import { SelectValidationComponent } from '../select-validation/select-validation.component';
import { SelectCodeComponent } from '../select-code/select-code.component';
import { SelectApiComponent } from '../select-api/select-api.component';
import { CheckboxDemoComponent } from '../checkbox-demo/checkbox-demo.component';
import { CheckboxValidationComponent } from '../checkbox-validation/checkbox-validation.component';
import { CheckboxCodeComponent } from '../checkbox-code/checkbox-code.component';
import { CheckboxApiComponent } from '../checkbox-api/checkbox-api.component';
import { RadioDemoComponent } from '../radio-demo/radio-demo.component';
import { RadioValidationComponent } from '../radio-validation/radio-validation.component';
import { RadioCodeComponent } from '../radio-code/radio-code.component';
import { RadioApiComponent } from '../radio-api/radio-api.component';
import { RadioGroupDemoComponent } from '../radio-group-demo/radio-group-demo.component';
import { RadioGroupValidationComponent } from '../radio-group-validation/radio-group-validation.component';
import { RadioGroupCodeComponent } from '../radio-group-code/radio-group-code.component';
import { RadioGroupApiComponent } from '../radio-group-api/radio-group-api.component';
import { ChipsDemoComponent } from '../chips-demo/chips-demo.component';
import { ToggleDemoComponent } from '../toggle-demo/toggle-demo.component';
import { ToggleValidationComponent } from '../toggle-validation/toggle-validation.component';
import { ToggleCodeComponent } from '../toggle-code/toggle-code.component';
import { ToggleApiComponent } from '../toggle-api/toggle-api.component';
import { TextareaDemoComponent } from '../textarea-demo/textarea-demo.component';
import { TextareaValidationComponent } from '../textarea-validation/textarea-validation.component';
import { TextareaCodeComponent } from '../textarea-code/textarea-code.component';
import { TextareaApiComponent } from '../textarea-api/textarea-api.component';
import { SliderDemoComponent } from '../slider-demo/slider-demo.component';
import { SliderValidationComponent } from '../slider-validation/slider-validation.component';
import { SliderCodeComponent } from '../slider-code/slider-code.component';
import { SliderApiComponent } from '../slider-api/slider-api.component';
import { AutocompleteDemoComponent } from '../autocomplete-demo/autocomplete-demo.component';
import { AutocompleteValidationComponent } from '../autocomplete-validation/autocomplete-validation.component';
import { AutocompleteCodeComponent } from '../autocomplete-code/autocomplete-code.component';
import { AutocompleteApiComponent } from '../autocomplete-api/autocomplete-api.component';
import { DatepickerDemoComponent } from '../datepicker-demo/datepicker-demo.component';
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
import { CardDemoComponent } from '../card-demo/card-demo.component';
import { CardValidationComponent } from '../card-validation/card-validation.component';
import { CardCodeComponent } from '../card-code/card-code.component';
import { CardApiComponent } from '../card-api/card-api.component';
import { DialogDemoComponent } from '../dialog-demo/dialog-demo.component';
import { DialogValidationComponent } from '../dialog-validation/dialog-validation.component';
import { DialogCodeComponent } from '../dialog-code/dialog-code.component';
import { DialogApiComponent } from '../dialog-api/dialog-api.component';
import { SidenavDemoComponent } from '../sidenav-demo/sidenav-demo.component';
import { SidenavValidationComponent } from '../sidenav-validation/sidenav-validation.component';
import { SidenavCodeComponent } from '../sidenav-code/sidenav-code.component';
import { SidenavApiComponent } from '../sidenav-api/sidenav-api.component';
import { PopoverDemoComponent } from '../popover-demo/popover-demo.component';
import { PopoverValidationComponent } from '../popover-validation/popover-validation.component';
import { PopoverCodeComponent } from '../popover-code/popover-code.component';
import { PopoverApiComponent } from '../popover-api/popover-api.component';
import { DataTableDemoComponent } from '../data-table-demo/data-table-demo.component';
import { DataTableValidationComponent } from '../data-table-validation/data-table-validation.component';
import { DataTableCodeComponent } from '../data-table-code/data-table-code.component';
import { DataTableApiComponent } from '../data-table-api/data-table-api.component';
import { CalendarDemoComponent } from '../calendar-demo/calendar-demo.component';
import { CalendarValidationComponent } from '../calendar-validation/calendar-validation.component';
import { CalendarCodeComponent } from '../calendar-code/calendar-code.component';
import { CalendarApiComponent } from '../calendar-api/calendar-api.component';
import { StepperDemoComponent } from '../stepper-demo/stepper-demo.component';
import { StepperValidationComponent } from '../stepper-validation/stepper-validation.component';
import { StepperCodeComponent } from '../stepper-code/stepper-code.component';
import { StepperApiComponent } from '../stepper-api/stepper-api.component';
import { TabsDemoComponent } from '../tabs-demo/tabs-demo.component';
import { TabsValidationComponent } from '../tabs-validation/tabs-validation.component';
import { TabsCodeComponent } from '../tabs-code/tabs-code.component';
import { TabsApiComponent } from '../tabs-api/tabs-api.component';
import { AccordionDemoComponent } from '../accordion-demo/accordion-demo.component';
import { AccordionValidationComponent } from '../accordion-validation/accordion-validation.component';
import { AccordionCodeComponent } from '../accordion-code/accordion-code.component';
import { AccordionApiComponent } from '../accordion-api/accordion-api.component';
import { ChipsValidationComponent } from '../chips-validation/chips-validation.component';
import { ChipsCodeComponent } from '../chips-code/chips-code.component';
import { ChipsApiComponent } from '../chips-api/chips-api.component';
import { ThemeDemoComponent } from '../theme-demo/theme-demo.component';
import { ThemeValidationComponent } from '../theme-validation/theme-validation.component';
import { ThemeCodeComponent } from '../theme-code/theme-code.component';
import { ThemeApiComponent } from '../theme-api/theme-api.component';

@Component({
    selector: 'amw-demo-container',
    standalone: true,
    imports: [
    AmwTabsComponent,
    AmwTabComponent,
    AmwCardComponent,
    ButtonDemoComponent,
    ButtonValidationComponent,
    ButtonCodeComponent,
    ButtonApiComponent,
    InputDemoComponent,
    InputValidationComponent,
    InputCodeComponent,
    InputApiComponent,
    SelectDemoComponent,
    SelectValidationComponent,
    SelectCodeComponent,
    SelectApiComponent,
    CheckboxDemoComponent,
    CheckboxValidationComponent,
    CheckboxCodeComponent,
    CheckboxApiComponent,
    RadioDemoComponent,
    RadioValidationComponent,
    RadioCodeComponent,
    RadioApiComponent,
    RadioGroupDemoComponent,
    RadioGroupValidationComponent,
    RadioGroupCodeComponent,
    RadioGroupApiComponent,
    ChipsDemoComponent,
    ToggleDemoComponent,
    ToggleValidationComponent,
    ToggleCodeComponent,
    ToggleApiComponent,
    TextareaDemoComponent,
    TextareaValidationComponent,
    TextareaCodeComponent,
    TextareaApiComponent,
    SliderDemoComponent,
    SliderValidationComponent,
    SliderCodeComponent,
    SliderApiComponent,
    AutocompleteDemoComponent,
    AutocompleteValidationComponent,
    AutocompleteCodeComponent,
    AutocompleteApiComponent,
    DatepickerDemoComponent,
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
    CardDemoComponent,
    CardValidationComponent,
    CardCodeComponent,
    CardApiComponent,
    DialogDemoComponent,
    DialogValidationComponent,
    DialogCodeComponent,
    DialogApiComponent,
    SidenavDemoComponent,
    SidenavValidationComponent,
    SidenavCodeComponent,
    SidenavApiComponent,
    PopoverDemoComponent,
    PopoverValidationComponent,
    PopoverCodeComponent,
    PopoverApiComponent,
    DataTableDemoComponent,
    DataTableValidationComponent,
    DataTableCodeComponent,
    DataTableApiComponent,
    CalendarDemoComponent,
    CalendarValidationComponent,
    CalendarCodeComponent,
    CalendarApiComponent,
    StepperDemoComponent,
    StepperValidationComponent,
    StepperCodeComponent,
    StepperApiComponent,
    TabsDemoComponent,
    TabsValidationComponent,
    TabsCodeComponent,
    TabsApiComponent,
    AccordionDemoComponent,
    AccordionValidationComponent,
    AccordionCodeComponent,
    AccordionApiComponent,
    ChipsValidationComponent,
    ChipsCodeComponent,
    ChipsApiComponent,
    ThemeDemoComponent,
    ThemeValidationComponent,
    ThemeCodeComponent,
    ThemeApiComponent
  ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './demo-container.component.html',
    styleUrl: './demo-container.component.scss'
})
export class DemoContainerComponent implements OnInit {
    // Configuration
    title = '';
    subtitle = '';
    items: DemoItem[] = [];
    selectedItem: DemoItem = { id: '', name: '' };
    selectedTab = 0; // 0 = Variations, 1 = Validation, 2 = Code, 3 = API

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            // Support both old format (control/component) and new format (demoType/demoId)
            const demoType = data['demoType'] || (data['control'] ? 'controls' : 'components');
            const demoId = data['demoId'] || data['control'] || data['component'];

            // Load configuration for demo type
            const config = DEMO_CONFIGS[demoType];
            if (config) {
                this.title = config.title;
                this.subtitle = config.subtitle;
                this.items = config.items;

                // Find and select the specified item
                if (demoId) {
                    const item = this.items.find(i => i.id === demoId);
                    if (item) {
                        this.selectedItem = item;
                    }
                } else {
                    // Default to first item if no specific demo selected
                    if (this.items.length > 0) {
                        this.selectedItem = this.items[0];
                    }
                }
            }
        });
    }
}
