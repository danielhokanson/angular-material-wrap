import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';

@Component({
    selector: 'amw-demo-sort-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './sort-api.component.html',
    styleUrl: './sort-api.component.scss'
})
export class SortApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'amwSortActive',
                type: 'string',
                default: 'undefined',
                description: 'The currently active sort column identifier.'
            },
            {
                name: 'amwSortDirection',
                type: "'asc' | 'desc' | ''",
                default: "''",
                description: 'The current sort direction.',
                options: ['asc', 'desc', "'' (none)"]
            },
            {
                name: 'amwSortDisabled',
                type: 'boolean',
                default: 'false',
                description: 'Whether sorting is disabled for the entire container.'
            }
        ],
        outputs: [
            {
                name: 'amwSortChange',
                type: 'EventEmitter<AmwSort>',
                description: 'Emits when the sort state changes. AmwSort contains { active: string, direction: string }.'
            }
        ],
        usageNotes: [
            'Apply the amwSort directive to a container element that wraps sortable content.',
            'Use with amw-sort-header components on individual column headers for click-to-sort functionality.',
            'Sort direction cycles through: ascending → descending → no sort (unless disableClear is set).',
            'Combine with AmwTableModule for a complete sortable table solution.',
            'The actual data sorting must be implemented in your component - the directive only manages state.'
        ]
    };

    sortHeaderDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'id',
                type: 'string',
                default: 'required',
                description: 'The column identifier used for sorting. Set via amw-sort-header="columnId".'
            },
            {
                name: 'disableClear',
                type: 'boolean',
                default: 'false',
                description: 'When true, clicking only toggles between asc/desc without clearing sort.'
            },
            {
                name: 'arrowPosition',
                type: "'before' | 'after'",
                default: "'after'",
                description: 'Position of the sort indicator arrow relative to the header text.'
            }
        ]
    };

    interfaces: ApiInterface[] = [
        {
            name: 'AmwSort',
            description: 'Sort state emitted by the amwSortChange event',
            properties: [
                { name: 'active', type: 'string', description: 'The currently active sort column identifier' },
                { name: 'direction', type: "'asc' | 'desc' | ''", description: 'The current sort direction' }
            ]
        }
    ];

    constructor() {
        super();
    }
}
