import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';

@Component({
    selector: 'amw-demo-data-table-api',
    standalone: true,
    imports: [AmwApiDocComponent],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './data-table-api.component.html',
    styleUrl: './data-table-api.component.scss'
})
export class DataTableApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            { name: 'data', type: 'any[]', default: '[]', description: 'Array of data objects to display in the table' },
            { name: 'columns', type: 'DataTableColumn[]', default: '[]', description: 'Column configuration array' },
            { name: 'config', type: 'DataTableConfig', default: '{}', description: 'Table configuration options' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading spinner when true' }
        ],
        outputs: [
            { name: 'rowClick', type: 'EventEmitter<any>', description: 'Emitted when a row is clicked' },
            { name: 'actionClick', type: 'EventEmitter<DataTableAction>', description: 'Emitted when an action button is clicked' },
            { name: 'rowUpdate', type: 'EventEmitter<any>', description: 'Emitted when a row is updated' },
            { name: 'rowDelete', type: 'EventEmitter<any>', description: 'Emitted when a row is deleted' }
        ]
    };

    interfaces: ApiInterface[] = [
        {
            name: 'DataTableColumn',
            description: 'Column configuration interface',
            properties: [
                { name: 'key', type: 'string', description: 'Column key (data property name)' },
                { name: 'title', type: 'string', description: 'Column header title' },
                { name: 'type', type: "'text' | 'number' | 'email' | 'date' | 'boolean' | 'select'", description: 'Column data type' },
                { name: 'sortable', type: 'boolean', description: 'Whether column is sortable' },
                { name: 'filterable', type: 'boolean', description: 'Whether column is filterable' },
                { name: 'editable', type: 'boolean', description: 'Whether column is editable' }
            ]
        },
        {
            name: 'DataTableConfig',
            description: 'Table configuration interface',
            properties: [
                { name: 'editable', type: 'boolean', description: 'Whether table is editable' },
                { name: 'showActions', type: 'boolean', description: 'Whether to show action buttons' },
                { name: 'showPagination', type: 'boolean', description: 'Whether to show pagination' },
                { name: 'selection', type: "'single' | 'multiple' | 'none'", description: 'Row selection mode' }
            ]
        }
    ];

    constructor() {
        super();
    }
}
