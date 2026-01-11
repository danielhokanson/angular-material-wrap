import { Component, ViewEncapsulation } from '@angular/core';

import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';

@Component({
    selector: 'amw-demo-color-picker-api',
    standalone: true,
    imports: [
    AmwCardComponent,
    AmwIconComponent
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './color-picker-api.component.html',
    styleUrl: './color-picker-api.component.scss'
})
export class ColorPickerApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [],
        outputs: []
    };

    inputProperties = [
        { name: 'value', type: 'string', default: '', description: 'The current color value in hex format' },
        { name: 'config', type: 'ColorPickerConfig', default: '{}', description: 'Configuration object for the color picker' },
        { name: 'mode', type: 'ColorPickerMode', default: 'palette', description: 'Display mode of the color picker' },
        { name: 'size', type: 'ColorPickerSize', default: 'medium', description: 'Size variant of the color picker' },
        { name: 'showInput', type: 'boolean', default: 'true', description: 'Whether to show text input field' },
        { name: 'showPreview', type: 'boolean', default: 'true', description: 'Whether to show color preview' },
        { name: 'showPalette', type: 'boolean', default: 'true', description: 'Whether to show color palette' },
        { name: 'showCustom', type: 'boolean', default: 'true', description: 'Whether to show custom color input' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the color picker is disabled' },
        { name: 'required', type: 'boolean', default: 'false', description: 'Whether the color picker is required' },
        { name: 'placeholder', type: 'string', default: '', description: 'Placeholder text for the input' },
        { name: 'label', type: 'string', default: '', description: 'Label text for the color picker' },
        { name: 'errorMessage', type: 'string', default: '', description: 'Custom error message to display' },
        { name: 'hasError', type: 'boolean', default: 'false', description: 'Whether the color picker has an error state' }
    ];

    outputProperties = [
        { name: 'colorChange', returns: 'EventEmitter<string>', description: 'Emitted when the color value changes' },
        { name: 'colorPickerChange', returns: 'EventEmitter<string>', description: 'Emitted when the color picker value changes (alias for colorChange)' },
        { name: 'valueChange', returns: 'EventEmitter<any>', description: 'Emitted when the value changes (inherited from BaseComponent)' },
        { name: 'blur', returns: 'EventEmitter<FocusEvent>', description: 'Emitted when the color picker loses focus' },
        { name: 'focus', returns: 'EventEmitter<FocusEvent>', description: 'Emitted when the color picker gains focus' }
    ];

    configInterface = [
        { name: 'appearance', type: 'fill | outline', default: 'outline', description: 'Form field appearance style' },
        { name: 'placeholder', type: 'string', default: '', description: 'Placeholder text for the input' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the color picker is disabled' },
        { name: 'required', type: 'boolean', default: 'false', description: 'Whether the color picker is required' },
        { name: 'showInput', type: 'boolean', default: 'true', description: 'Whether to show text input field' },
        { name: 'showPreview', type: 'boolean', default: 'true', description: 'Whether to show color preview' },
        { name: 'showPalette', type: 'boolean', default: 'true', description: 'Whether to show color palette' },
        { name: 'showCustom', type: 'boolean', default: 'true', description: 'Whether to show custom color input' },
        { name: 'paletteColors', type: 'string[]', default: '[]', description: 'Custom array of palette colors' },
        { name: 'mode', type: 'ColorPickerMode', default: 'palette', description: 'Display mode of the color picker' }
    ];

    typeDefinitions = [
        { name: 'ColorPickerMode', returns: 'palette | custom | text | all', description: 'Available display modes' },
        { name: 'ColorPickerSize', returns: 'small | medium | large', description: 'Available size variants' }
    ];

    methods = [
        { name: 'writeValue(value: any)', description: 'Writes a new value to the element (ControlValueAccessor)' },
        { name: 'registerOnChange(fn: (value: any) => void)', description: 'Registers a callback function for value changes' },
        { name: 'registerOnTouched(fn: () => void)', description: 'Registers a callback function for touch events' },
        { name: 'setDisabledState(isDisabled: boolean)', description: 'Sets the disabled state of the control' },
        { name: 'toggleColorPicker()', description: 'Opens or closes the color picker dropdown' },
        { name: 'selectColor(color: string)', description: 'Programmatically select a color' },
        { name: 'onCustomColorChange()', description: 'Handle custom color input changes' },
        { name: 'onInputChange(event: Event)', description: 'Handle text input changes' },
        { name: 'isValidColor(color: string)', description: 'Validate if a color string is valid' }
    ];

    displayedColumns = ['name', 'type', 'default', 'description'];

    constructor() {
        super();
    }
}
