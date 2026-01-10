import { Component } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';

import { MatIconModule } from '@angular/material/icon';

/**
 * Radio Group API Documentation Component
 * Provides comprehensive API documentation for the AMW Radio Group component
 */import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-radio-group-api',
    standalone: true,
    imports: [
    MatIconModule,
    MatTabsModule,
    MatCardModule
],
    templateUrl: './radio-group-api.component.html',
    styleUrl: './radio-group-api.component.scss'
})
export class RadioGroupApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [],
        outputs: []
    };

    // Input properties documentation
    readonly inputProperties = [
        {
            name: 'size',
            type: 'AmwSize',
            default: "'medium'",
            description: 'Size of the radio group component',
            options: ['small', 'medium', 'large']
        },
        {
            name: 'label',
            type: 'string',
            default: "''",
            description: 'Label text displayed above the radio group',
            options: ['Any string']
        },
        {
            name: 'hint',
            type: 'string',
            default: "''",
            description: 'Hint text displayed below the radio group',
            options: ['Any string']
        },
        {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Whether the radio group is disabled',
            options: ['true', 'false']
        },
        {
            name: 'required',
            type: 'boolean',
            default: 'false',
            description: 'Whether the radio group is required',
            options: ['true', 'false']
        },
        {
            name: 'name',
            type: 'string',
            default: "''",
            description: 'Name attribute for the radio group',
            options: ['Any string']
        },
        {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            default: "'vertical'",
            description: 'Layout orientation of the radio buttons',
            options: ['horizontal', 'vertical']
        },
        {
            name: 'color',
            type: "'primary' | 'accent' | 'warn'",
            default: "'primary'",
            description: 'Color theme for the radio buttons',
            options: ['primary', 'accent', 'warn']
        },
        {
            name: 'options',
            type: 'RadioGroupOption[]',
            default: '[]',
            description: 'Array of radio button options',
            options: ['Array of RadioGroupOption objects']
        },
        {
            name: 'config',
            type: 'RadioGroupConfig | null',
            default: 'null',
            description: 'Configuration object for the radio group',
            options: ['RadioGroupConfig object or null']
        },
        {
            name: 'value',
            type: 'any',
            default: 'null',
            description: 'Current selected value',
            options: ['Any value matching option values']
        }
    ];

    // Output properties documentation
    readonly outputProperties = [
        {
            name: 'valueChange', returns: 'EventEmitter<any>', description: 'Emitted when the selected value changes',
            parameters: ['value: any - The new selected value']
        },
        {
            name: 'selectionChange', returns: 'EventEmitter<RadioGroupOption>', description: 'Emitted when a radio button is selected',
            parameters: ['option: RadioGroupOption - The selected option object']
        }
    ];

    // Interface documentation
    readonly interfacesList = [
        {
            name: 'RadioGroupOption',
            description: 'Interface for radio group option objects',
            properties: [
                { name: 'value', returns: 'any', description: 'The value of the option' },
                { name: 'label', returns: 'string', description: 'Display label for the option' },
                { name: 'disabled?', returns: 'boolean', description: 'Whether the option is disabled' },
                { name: 'icon?', returns: 'string', description: 'Material icon name for the option' },
                { name: 'description?', returns: 'string', description: 'Additional description text' }
            ]
        },
        {
            name: 'RadioGroupConfig',
            description: 'Interface for radio group configuration objects',
            properties: [
                { name: 'options', returns: 'RadioGroupOption[]', description: 'Array of radio button options' },
                { name: 'size?', returns: 'AmwSize', description: 'Size of the radio group' },
                { name: 'label?', returns: 'string', description: 'Label text for the radio group' },
                { name: 'hint?', returns: 'string', description: 'Hint text for the radio group' },
                { name: 'disabled?', returns: 'boolean', description: 'Whether the radio group is disabled' },
                { name: 'required?', returns: 'boolean', description: 'Whether the radio group is required' },
                { name: 'name?', returns: 'string', description: 'Name attribute for the radio group' },
                { name: 'orientation?', type: "'horizontal' | 'vertical'", description: 'Layout orientation' },
                { name: 'color?', type: "'primary' | 'accent' | 'warn'", description: 'Color theme' }
            ]
        }
    ];

    // Method documentation
    readonly methods = [
        {
            name: 'onRadioChange(value: any)', returns: 'void', description: 'Handles radio button selection change',
            parameters: ['value: any - The selected value']
        },
        {
            name: 'onFocus()', returns: 'void', description: 'Handles focus events',
            parameters: []
        },
        {
            name: 'onBlur()', returns: 'void', description: 'Handles blur events',
            parameters: []
        },
        {
            name: 'getRadioGroupClasses()', returns: 'string', description: 'Returns CSS classes for the radio group',
            parameters: []
        },
        {
            name: 'getRadioButtonClasses(option: RadioGroupOption)', returns: 'string', description: 'Returns CSS classes for individual radio buttons',
            parameters: ['option: RadioGroupOption - The option object']
        }
    ];

    // ControlValueAccessor methods
    readonly controlValueAccessorMethods = [
        {
            name: 'writeValue(value: any)', returns: 'void', description: 'Writes a new value to the element',
            parameters: ['value: any - The new value']
        },
        {
            name: 'registerOnChange(fn: (value: any) => void)', returns: 'void', description: 'Registers a callback function for value changes',
            parameters: ['fn: (value: any) => void - The callback function']
        },
        {
            name: 'registerOnTouched(fn: () => void)', returns: 'void', description: 'Registers a callback function for touch events',
            parameters: ['fn: () => void - The callback function']
        },
        {
            name: 'setDisabledState(isDisabled: boolean)', returns: 'void', description: 'Sets the disabled state of the element',
            parameters: ['isDisabled: boolean - Whether the element is disabled']
        }
    ];

    constructor() {
        super();
    }
}
