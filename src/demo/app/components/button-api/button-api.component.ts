import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'amw-demo-button-api',
    standalone: true,
    imports: [
        CommonModule,
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './button-api.component.html',
    styleUrl: './button-api.component.scss'
})
export class ButtonApiComponent {
    apiDocumentation = {
        inputs: [
            {
                name: 'variant',
                type: 'ButtonVariant',
                default: 'elevated',
                description: 'The visual style variant of the button',
                options: ['text', 'elevated', 'outlined', 'filled', 'tonal', 'icon', 'fab', 'mini-fab', 'extended-fab']
            },
            {
                name: 'color',
                type: 'ButtonColor',
                default: 'primary',
                description: 'The color theme of the button',
                options: ['primary', 'accent', 'warn']
            },
            {
                name: 'size',
                type: 'ButtonSize',
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
                description: 'Material icon name to display',
                options: ['Any valid Material icon name']
            },
            {
                name: 'iconPosition',
                type: 'ButtonIconPosition',
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
                name: 'click',
                type: 'EventEmitter<MouseEvent>',
                description: 'Emitted when the button is clicked'
            },
            {
                name: 'focus',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the button receives focus'
            },
            {
                name: 'blur',
                type: 'EventEmitter<FocusEvent>',
                description: 'Emitted when the button loses focus'
            }
        ]
    };
}


