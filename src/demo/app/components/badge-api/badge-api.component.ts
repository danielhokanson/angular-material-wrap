import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';

@Component({
    selector: 'amw-demo-badge-api',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './badge-api.component.html',
    styleUrl: './badge-api.component.scss'
})
export class BadgeApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'amwBadge',
                type: 'string | number',
                default: 'required',
                description: 'Badge content. Numbers greater than 99 display as "99+"'
            },
            {
                name: 'amwBadgeColor',
                type: 'AmwBadgeColor',
                default: 'primary',
                description: 'Badge color theme',
                options: ['primary', 'accent', 'warn']
            },
            {
                name: 'amwBadgePosition',
                type: 'AmwBadgePosition',
                default: 'above after',
                description: 'Badge position relative to the host element',
                options: ['above after', 'above before', 'below after', 'below before']
            },
            {
                name: 'amwBadgeSize',
                type: 'AmwBadgeSize',
                default: 'medium',
                description: 'Badge size (16px, 20px, 24px)',
                options: ['small', 'medium', 'large']
            },
            {
                name: 'amwBadgeHidden',
                type: 'boolean',
                default: 'false',
                description: 'Whether the badge is hidden'
            },
            {
                name: 'amwBadgeOverlap',
                type: 'boolean',
                default: 'true',
                description: 'Whether the badge should overlap the host element'
            }
        ],
        usageNotes: [
            'The amwBadge directive can be applied to any element',
            'Use amwBadgeHidden to conditionally hide the badge (e.g., when count is 0)',
            'Numbers greater than 99 are automatically formatted as "99+"',
            'The host element will be styled with position: relative and display: inline-flex'
        ]
    };

    constructor() {
        super();
    }
}
