import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent } from '../../shared/components/api-doc/api-doc.component';

@Component({
    selector: 'amw-demo-expansion-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './expansion-api.component.html',
    styleUrl: './expansion-api.component.scss'
})
export class ExpansionApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [],
        outputs: [],
        usageNotes: [
            'Use amw-accordion to group multiple expansion panels.',
            'Set multi="false" (default) for single-panel accordion behavior.',
            'Set multi="true" to allow multiple panels open simultaneously.',
            'Use disabled input on panels to prevent user interaction.',
            'The expanded input can be two-way bound with [(expanded)].'
        ]
    };

    accordionDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'multi',
                type: 'boolean',
                default: 'false',
                description: 'Whether multiple panels can be expanded at the same time.'
            },
            {
                name: 'displayMode',
                type: "'default' | 'flat'",
                default: "'default'",
                description: 'Display mode for the accordion. Flat removes elevation/shadows.'
            },
            {
                name: 'hideToggle',
                type: 'boolean',
                default: 'false',
                description: 'Whether to hide the expansion indicator for all panels.'
            }
        ]
    };

    panelDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'expanded',
                type: 'boolean',
                default: 'false',
                description: 'Whether the panel is currently expanded.'
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether the panel is disabled (cannot be toggled).'
            },
            {
                name: 'hideToggle',
                type: 'boolean',
                default: 'false',
                description: 'Whether to hide the expansion indicator for this panel.'
            }
        ],
        outputs: [
            {
                name: 'opened',
                type: 'EventEmitter<void>',
                description: 'Emits when the panel is opened.'
            },
            {
                name: 'closed',
                type: 'EventEmitter<void>',
                description: 'Emits when the panel is closed.'
            },
            {
                name: 'expandedChange',
                type: 'EventEmitter<boolean>',
                description: 'Emits when the expanded state changes.'
            }
        ],
        methods: [
            {
                name: 'open()',
                returns: 'void',
                description: 'Programmatically opens the panel.'
            },
            {
                name: 'close()',
                returns: 'void',
                description: 'Programmatically closes the panel.'
            },
            {
                name: 'toggle()',
                returns: 'void',
                description: 'Toggles the expanded state of the panel.'
            }
        ]
    };

    headerDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'collapsedHeight',
                type: 'string',
                default: "'48px'",
                description: 'Height of the header when the panel is collapsed.'
            },
            {
                name: 'expandedHeight',
                type: 'string',
                default: "'64px'",
                description: 'Height of the header when the panel is expanded.'
            }
        ]
    };

    constructor() {
        super();
    }
}
