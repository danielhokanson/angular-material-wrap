import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';

@Component({
    selector: 'amw-demo-divider-api',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './divider-api.component.html',
    styleUrl: './divider-api.component.scss'
})
export class DividerApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'vertical',
                type: 'boolean',
                default: 'false',
                description: 'Whether the divider is vertical. When true, displays as a vertical line for separating horizontally arranged content.'
            },
            {
                name: 'inset',
                type: 'boolean',
                default: 'false',
                description: 'Whether the divider is inset. Adds left margin (72px) to align with content after icons/avatars in lists.'
            }
        ],
        usageNotes: [
            'The divider component renders a simple <hr> element with appropriate styling.',
            'Use horizontal dividers (default) to separate vertically stacked content.',
            'Use vertical dividers to separate horizontally arranged content (e.g., toolbar items).',
            'For vertical dividers, ensure the container has a defined height.',
            'Use inset dividers in lists with leading icons or avatars to maintain alignment.',
            'Avoid using too many dividers - rely on whitespace and visual hierarchy when possible.'
        ]
    };

    constructor() {
        super();
    }
}
