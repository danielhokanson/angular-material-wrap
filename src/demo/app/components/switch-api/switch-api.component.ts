import { Component, ViewEncapsulation } from '@angular/core';

import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';

@Component({
    selector: 'amw-demo-switch-api',
    standalone: true,
    imports: [
    
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './switch-api.component.html',
    styleUrl: './switch-api.component.scss'
})
export class SwitchApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'checked',
                type: 'boolean',
                default: 'false',
                description: 'Whether the switch is checked (on) or unchecked (off)'
            },
            {
                name: 'size',
                type: 'SwitchSize',
                default: 'medium',
                description: 'Size of the switch (small, medium, large)'
            },
            {
                name: 'color',
                type: 'SwitchColor',
                default: 'primary',
                description: 'Color theme for the switch (primary, accent, warn)'
            },
            {
                name: 'labelPosition',
                type: "'before' | 'after'",
                default: 'after',
                description: 'Position of the label relative to the switch'
            },
            {
                name: 'indeterminate',
                type: 'boolean',
                default: 'false',
                description: 'Whether the switch is in an indeterminate state'
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the switch is disabled'
            },
            {
                name: 'required',
                type: 'boolean',
                default: 'false',
                description: 'Whether the switch is required'
            },
            {
                name: 'label',
                type: 'string',
                default: '""',
                description: 'Label text for the switch'
            },
            {
                name: 'errorMessage',
                type: 'string',
                default: '""',
                description: 'Custom error message to display'
            },
            {
                name: 'hasError',
                type: 'boolean',
                default: 'false',
                description: 'Whether the switch is in an error state'
            }
        ],
        outputs: [
            {
                name: 'checkedChange',
                type: 'EventEmitter<boolean>',
                description: 'Emitted when the checked state changes'
            },
            {
                name: 'switchChange',
                type: 'EventEmitter<boolean>',
                description: 'Emitted when the switch state changes'
            },
            {
                name: 'valueChange',
                type: 'EventEmitter<boolean>',
                description: 'Emitted when the value changes (for form integration)'
            },
            {
                name: 'blur',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the switch loses focus'
            },
            {
                name: 'focus',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the switch gains focus'
            }
        ],
        methods: [
            {
                name: 'getConfig()',
                returns: 'SwitchConfig',
                description: 'Returns the current configuration object'
            }
        ]
    };

    types = [
        {
            type: 'SwitchColor',
            definition: "'primary' | 'accent' | 'warn'",
            description: 'Available color themes for the switch'
        },
        {
            type: 'SwitchSize',
            definition: "'small' | 'medium' | 'large'",
            description: 'Available sizes for the switch'
        },
        {
            type: 'SwitchConfig',
            definition: 'interface SwitchConfig { checked: boolean; disabled: boolean; size: SwitchSize; color: SwitchColor; labelPosition: "before" | "after"; indeterminate: boolean; required: boolean; }',
            description: 'Configuration interface for the switch'
        }
    ];
    constructor() {

        super();

    }

}

