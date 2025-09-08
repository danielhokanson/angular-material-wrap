import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'amw-demo-switch-api',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './switch-api.component.html',
    styleUrl: './switch-api.component.scss'
})
export class SwitchApiComponent {
    apiDocumentation = {
        inputs: [
            {
                property: 'checked',
                type: 'boolean',
                default: 'false',
                description: 'Whether the switch is checked (on) or unchecked (off)'
            },
            {
                property: 'size',
                type: 'SwitchSize',
                default: 'medium',
                description: 'Size of the switch (small, medium, large)'
            },
            {
                property: 'color',
                type: 'SwitchColor',
                default: 'primary',
                description: 'Color theme for the switch (primary, accent, warn)'
            },
            {
                property: 'labelPosition',
                type: "'before' | 'after'",
                default: 'after',
                description: 'Position of the label relative to the switch'
            },
            {
                property: 'indeterminate',
                type: 'boolean',
                default: 'false',
                description: 'Whether the switch is in an indeterminate state'
            },
            {
                property: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the switch is disabled'
            },
            {
                property: 'required',
                type: 'boolean',
                default: 'false',
                description: 'Whether the switch is required'
            },
            {
                property: 'label',
                type: 'string',
                default: '""',
                description: 'Label text for the switch'
            },
            {
                property: 'errorMessage',
                type: 'string',
                default: '""',
                description: 'Custom error message to display'
            },
            {
                property: 'hasError',
                type: 'boolean',
                default: 'false',
                description: 'Whether the switch is in an error state'
            }
        ],
        outputs: [
            {
                property: 'checkedChange',
                type: 'EventEmitter<boolean>',
                description: 'Emitted when the checked state changes'
            },
            {
                property: 'switchChange',
                type: 'EventEmitter<boolean>',
                description: 'Emitted when the switch state changes'
            },
            {
                property: 'valueChange',
                type: 'EventEmitter<boolean>',
                description: 'Emitted when the value changes (for form integration)'
            },
            {
                property: 'blur',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the switch loses focus'
            },
            {
                property: 'focus',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the switch gains focus'
            }
        ],
        methods: [
            {
                method: 'getConfig()',
                returns: 'SwitchConfig',
                description: 'Returns the current configuration object'
            }
        ],
        types: [
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
        ]
    };
}


