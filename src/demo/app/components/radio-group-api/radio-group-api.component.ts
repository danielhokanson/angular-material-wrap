import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

/**
 * Radio Group API Documentation Component
 * Provides comprehensive API documentation for the AMW Radio Group component
 */
@Component({
    selector: 'app-radio-group-api',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTabsModule,
        MatChipsModule,
        MatIconModule
    ],
    templateUrl: './radio-group-api.component.html',
    styleUrl: './radio-group-api.component.scss'
})
export class RadioGroupApiComponent implements OnInit {
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
            name: 'valueChange',
            type: 'EventEmitter<any>',
            description: 'Emitted when the selected value changes',
            parameters: ['value: any - The new selected value']
        },
        {
            name: 'selectionChange',
            type: 'EventEmitter<RadioGroupOption>',
            description: 'Emitted when a radio button is selected',
            parameters: ['option: RadioGroupOption - The selected option object']
        }
    ];

    // Interface documentation
    readonly interfacesList = [
        {
            name: 'RadioGroupOption',
            description: 'Interface for radio group option objects',
            properties: [
                { name: 'value', type: 'any', description: 'The value of the option' },
                { name: 'label', type: 'string', description: 'Display label for the option' },
                { name: 'disabled?', type: 'boolean', description: 'Whether the option is disabled' },
                { name: 'icon?', type: 'string', description: 'Material icon name for the option' },
                { name: 'description?', type: 'string', description: 'Additional description text' }
            ]
        },
        {
            name: 'RadioGroupConfig',
            description: 'Interface for radio group configuration objects',
            properties: [
                { name: 'options', type: 'RadioGroupOption[]', description: 'Array of radio button options' },
                { name: 'size?', type: 'AmwSize', description: 'Size of the radio group' },
                { name: 'label?', type: 'string', description: 'Label text for the radio group' },
                { name: 'hint?', type: 'string', description: 'Hint text for the radio group' },
                { name: 'disabled?', type: 'boolean', description: 'Whether the radio group is disabled' },
                { name: 'required?', type: 'boolean', description: 'Whether the radio group is required' },
                { name: 'name?', type: 'string', description: 'Name attribute for the radio group' },
                { name: 'orientation?', type: "'horizontal' | 'vertical'", description: 'Layout orientation' },
                { name: 'color?', type: "'primary' | 'accent' | 'warn'", description: 'Color theme' }
            ]
        }
    ];

    // Method documentation
    readonly methods = [
        {
            name: 'onRadioChange(value: any)',
            type: 'void',
            description: 'Handles radio button selection change',
            parameters: ['value: any - The selected value']
        },
        {
            name: 'onFocus()',
            type: 'void',
            description: 'Handles focus events',
            parameters: []
        },
        {
            name: 'onBlur()',
            type: 'void',
            description: 'Handles blur events',
            parameters: []
        },
        {
            name: 'getRadioGroupClasses()',
            type: 'string',
            description: 'Returns CSS classes for the radio group',
            parameters: []
        },
        {
            name: 'getRadioButtonClasses(option: RadioGroupOption)',
            type: 'string',
            description: 'Returns CSS classes for individual radio buttons',
            parameters: ['option: RadioGroupOption - The option object']
        }
    ];

    // ControlValueAccessor methods
    readonly controlValueAccessorMethods = [
        {
            name: 'writeValue(value: any)',
            type: 'void',
            description: 'Writes a new value to the element',
            parameters: ['value: any - The new value']
        },
        {
            name: 'registerOnChange(fn: (value: any) => void)',
            type: 'void',
            description: 'Registers a callback function for value changes',
            parameters: ['fn: (value: any) => void - The callback function']
        },
        {
            name: 'registerOnTouched(fn: () => void)',
            type: 'void',
            description: 'Registers a callback function for touch events',
            parameters: ['fn: () => void - The callback function']
        },
        {
            name: 'setDisabledState(isDisabled: boolean)',
            type: 'void',
            description: 'Sets the disabled state of the element',
            parameters: ['isDisabled: boolean - Whether the element is disabled']
        }
    ];

    constructor() { }

    ngOnInit(): void { }
}
