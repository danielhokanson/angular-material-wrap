import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';

@Component({
    selector: 'amw-demo-button-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './button-api.component.html',
    styleUrl: './button-api.component.scss'
})
export class ButtonApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'appearance',
                type: 'ButtonStyle',
                default: 'filled',
                description: 'The visual style of the button',
                options: ['text', 'elevated', 'outlined', 'filled', 'tonal']
            },
            {
                name: 'fab',
                type: 'FabType',
                default: 'false',
                description: 'FAB (Floating Action Button) configuration',
                options: ['false', 'true', '"standard"', '"mini"', '"extended"']
            },
            {
                name: 'color',
                type: 'AmwColor',
                default: 'primary',
                description: 'The color theme of the button',
                options: ['primary', 'accent', 'warn']
            },
            {
                name: 'size',
                type: 'AmwSize',
                default: 'medium',
                description: 'The size of the button',
                options: ['small', 'medium', 'large']
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the button is disabled',
                options: ['true', 'false']
            },
            {
                name: 'loading',
                type: 'boolean',
                default: 'false',
                description: 'Whether the button is in loading state',
                options: ['true', 'false']
            },
            {
                name: 'icon',
                type: 'string',
                default: 'undefined',
                description: 'Material icon name. Icon-only mode is inferred when set without text.',
                options: ['Any valid Material icon name']
            },
            {
                name: 'iconPosition',
                type: 'IconPosition',
                default: 'left',
                description: 'Position of the icon relative to text',
                options: ['left', 'right']
            },
            {
                name: 'text',
                type: 'string',
                default: 'undefined',
                description: 'Button text content (alternative to ng-content)',
                options: ['Any string']
            }
        ],
        outputs: [
            {
                name: 'buttonClick', type: 'EventEmitter<MouseEvent>', description: 'Emitted when the button is clicked'
            },
            {
                name: 'buttonFocus', type: 'EventEmitter<FocusEvent>', description: 'Emitted when the button receives focus'
            },
            {
                name: 'buttonBlur', type: 'EventEmitter<FocusEvent>', description: 'Emitted when the button loses focus'
            }
        ]
    };

    constructor() {
        super();
    }
}

