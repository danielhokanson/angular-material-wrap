import { Component, ViewEncapsulation } from '@angular/core';

import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';

@Component({
    selector: 'amw-demo-card-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './card-api.component.html',
    styleUrl: './card-api.component.scss'
})
export class CardApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            { name: 'config', type: 'CardConfig', default: '{}', description: 'Configuration object for the card' },
            { name: 'variant', type: 'CardVariant', default: "'elevated'", description: 'Visual variant of the card' },
            { name: 'size', type: 'AmwSize', default: "'medium'", description: 'Size variant of the card' },
            { name: 'elevation', type: 'CardElevation', default: '1', description: 'Elevation level for shadow' },
            { name: 'clickable', type: 'boolean', default: 'false', description: 'Whether the card is clickable' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the card is disabled' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Whether the card is in loading state' },
            { name: 'headerTitle', type: 'string', default: "''", description: 'Title text for the card header' },
            { name: 'headerSubtitle', type: 'string', default: "''", description: 'Subtitle text for the card header' },
            { name: 'headerIcon', type: 'string', default: "''", description: 'Material icon name for the header' },
            { name: 'headerImage', type: 'string', default: "''", description: 'Image URL for the header avatar' },
            { name: 'content', type: 'string', default: "''", description: 'Text content for the card body' },
            { name: 'actions', type: 'Array<{label: string; icon?: string; color?: string; disabled?: boolean}>', default: '[]', description: 'Action buttons for the card' },
            { name: 'showActions', type: 'boolean', default: 'true', description: 'Whether to show action buttons' },
            { name: 'showHeader', type: 'boolean', default: 'true', description: 'Whether to show the header' },
            { name: 'showContent', type: 'boolean', default: 'true', description: 'Whether to show the content' },
            { name: 'showFooter', type: 'boolean', default: 'false', description: 'Whether to show the footer' },
            { name: 'footerContent', type: 'string', default: "''", description: 'Text content for the card footer' },
            { name: 'image', type: 'string', default: "''", description: 'Image URL for the card image' },
            { name: 'imageAlt', type: 'string', default: "''", description: 'Alt text for the card image' },
            { name: 'imageHeight', type: 'string', default: "'200px'", description: 'Height of the card image' },
            { name: 'imagePosition', type: "'top' | 'bottom'", default: "'top'", description: 'Position of the card image' }
        ],
        outputs: [
            { name: 'cardClick', type: 'EventEmitter<void>', description: 'Emitted when the card is clicked' },
            { name: 'actionClick', type: 'EventEmitter<{action: any; index: number}>', description: 'Emitted when an action button is clicked' },
            { name: 'headerClick', type: 'EventEmitter<void>', description: 'Emitted when the header is clicked' },
            { name: 'imageClick', type: 'EventEmitter<void>', description: 'Emitted when the image is clicked' }
        ]
    };

    interfaces: ApiInterface[] = [
        {
            name: 'CardConfig',
            description: 'Configuration options for the card',
            properties: [
                { name: 'class', type: 'string', description: 'CSS class to apply to the card' },
                { name: 'disabled', type: 'boolean', description: 'Whether the card is disabled' },
                { name: 'loading', type: 'boolean', description: 'Whether the card is in loading state' },
                { name: 'clickable', type: 'boolean', description: 'Whether the card is clickable' },
                { name: 'elevation', type: 'number', description: 'Elevation level for shadow' },
                { name: 'variant', type: "'elevated' | 'outlined' | 'filled'", description: 'Visual variant of the card' },
                { name: 'size', type: "'small' | 'medium' | 'large'", description: 'Size variant of the card' }
            ]
        }
    ];

    constructor() {
        super();
    }
}
