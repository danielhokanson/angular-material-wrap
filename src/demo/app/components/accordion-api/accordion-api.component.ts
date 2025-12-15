import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';

@Component({
    selector: 'amw-demo-accordion-api',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './accordion-api.component.html',
    styleUrl: './accordion-api.component.scss'
})
export class AccordionApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'multi',
                type: 'boolean',
                default: 'false',
                description: 'Whether multiple panels can be open simultaneously',
                options: ['true', 'false']
            },
            {
                name: 'hideToggle',
                type: 'boolean',
                default: 'false',
                description: 'Whether the toggle indicator should be hidden',
                options: ['true', 'false']
            },
            {
                name: 'displayMode',
                type: 'MatAccordionDisplayMode',
                default: 'default',
                description: 'Display mode for expansion indicator',
                options: ['default', 'flat']
            },
            {
                name: 'togglePosition',
                type: 'MatAccordionTogglePosition',
                default: 'after',
                description: 'Position of the expansion indicator',
                options: ['before', 'after']
            },
            {
                name: 'expanded',
                type: 'boolean',
                default: 'false',
                description: 'Whether the panel is expanded (per panel)',
                options: ['true', 'false']
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the panel is disabled (per panel)',
                options: ['true', 'false']
            }
        ],
        outputs: [
            {
                name: 'opened', type: 'EventEmitter<void>', description: 'Emitted when the panel is opened'
            },
            {
                name: 'closed', type: 'EventEmitter<void>', description: 'Emitted when the panel is closed'
            },
            {
                name: 'expandedChange', type: 'EventEmitter<boolean>', description: 'Emitted when the expanded state changes'
            },
            {
                name: 'afterExpand', type: 'EventEmitter<void>', description: 'Emitted after the panel expansion animation completes'
            },
            {
                name: 'afterCollapse', type: 'EventEmitter<void>', description: 'Emitted after the panel collapse animation completes'
            }
        ],
        methods: [
            {
                name: 'open()',
                returns: 'void',
                description: 'Opens the expansion panel'
            },
            {
                name: 'close()',
                returns: 'void',
                description: 'Closes the expansion panel'
            },
            {
                name: 'toggle()',
                returns: 'void',
                description: 'Toggles the expansion panel state'
            }
        ],
        usageNotes: [
            'Multi-Expansion: Use multi="true" on mat-accordion to allow multiple panels open',
            'Programmatic Control: Access panel via ViewChild and use open(), close(), toggle() methods',
            'Lazy Content: Content inside panels is lazy-loaded until first expansion',
            'Accessibility: Accordion automatically manages ARIA attributes for screen readers',
            'Animation: Use afterExpand and afterCollapse events to respond after animations complete',
            'Nested Forms: Expansion panels work great for multi-step forms and progressive disclosure'
        ]
    };

    constructor() {
        super();
    }
}
