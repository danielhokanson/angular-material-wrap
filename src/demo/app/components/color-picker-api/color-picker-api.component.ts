import { Component, ViewEncapsulation } from '@angular/core';

import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';

@Component({
    selector: 'amw-demo-color-picker-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './color-picker-api.component.html',
    styleUrl: './color-picker-api.component.scss'
})
export class ColorPickerApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            { name: 'value', type: 'string', default: "''", description: 'The current color value in hex format' },
            { name: 'config', type: 'ColorPickerConfig', default: '{}', description: 'Configuration object for the color picker' },
            { name: 'mode', type: 'ColorPickerMode', default: "'palette'", description: 'Display mode of the color picker' },
            { name: 'size', type: 'ColorPickerSize', default: "'medium'", description: 'Size variant of the color picker' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the color picker is disabled' },
            { name: 'required', type: 'boolean', default: 'false', description: 'Whether the color picker is required' }
        ],
        outputs: [
            { name: 'colorChange', type: 'EventEmitter<string>', description: 'Emitted when the color value changes' },
            { name: 'valueChange', type: 'EventEmitter<any>', description: 'Emitted when the value changes' },
            { name: 'blur', type: 'EventEmitter<FocusEvent>', description: 'Emitted when the color picker loses focus' },
            { name: 'focus', type: 'EventEmitter<FocusEvent>', description: 'Emitted when the color picker gains focus' }
        ]
    };

    interfaces: ApiInterface[] = [
        {
            name: 'ColorPickerConfig',
            description: 'Configuration interface for the color picker',
            properties: [
                { name: 'appearance', type: "'fill' | 'outline'", description: 'Form field appearance style' },
                { name: 'showInput', type: 'boolean', description: 'Whether to show text input field' },
                { name: 'showPreview', type: 'boolean', description: 'Whether to show color preview' },
                { name: 'showPalette', type: 'boolean', description: 'Whether to show color palette' },
                { name: 'paletteColors', type: 'string[]', description: 'Custom array of palette colors' }
            ]
        }
    ];

    constructor() {
        super();
    }
}
