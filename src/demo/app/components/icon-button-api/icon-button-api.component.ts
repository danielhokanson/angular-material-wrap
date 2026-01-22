import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';

@Component({
    selector: 'amw-demo-icon-button-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './icon-button-api.component.html',
    styleUrl: './icon-button-api.component.scss'
})
export class IconButtonApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'icon',
                type: 'string',
                default: 'required',
                description: 'Material icon name',
                options: ['Any valid Material icon name']
            },
            {
                name: 'ariaLabel',
                type: 'string',
                default: 'required',
                description: 'Accessible label for the button'
            },
            {
                name: 'color',
                type: 'AmwIconButtonColor',
                default: 'undefined',
                description: 'Button color theme',
                options: ['primary', 'accent', 'warn']
            },
            {
                name: 'size',
                type: 'AmwIconButtonSize',
                default: 'md',
                description: 'Button size (32px, 40px, 48px)',
                options: ['sm', 'md', 'lg']
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the button is disabled'
            },
            {
                name: 'loading',
                type: 'boolean',
                default: 'false',
                description: 'Whether the button shows a loading spinner'
            },
            {
                name: 'type',
                type: 'string',
                default: 'button',
                description: 'HTML button type',
                options: ['button', 'submit', 'reset']
            }
        ],
        outputs: [
            {
                name: 'buttonClick',
                type: 'EventEmitter<MouseEvent>',
                description: 'Emitted when the button is clicked'
            }
        ]
    };

    constructor() {
        super();
    }
}
