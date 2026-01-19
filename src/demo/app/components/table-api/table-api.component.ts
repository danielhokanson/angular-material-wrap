import { Component, ViewEncapsulation } from '@angular/core';
import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';

@Component({
    selector: 'amw-demo-table-api',
    standalone: true,
    imports: [],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './table-api.component.html',
    styleUrl: './table-api.component.scss'
})
export class TableApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'dataSource',
                type: 'T[] | Observable<T[]>',
                default: 'undefined',
                description: 'The data source for the table. Can be an array or Observable.'
            },
            {
                name: 'displayedColumns',
                type: 'string[]',
                default: '[]',
                description: 'Array of column names to display in the table.'
            },
            {
                name: 'trackBy',
                type: 'TrackByFunction<T>',
                default: 'undefined',
                description: 'TrackBy function for optimizing rendering performance.'
            }
        ],
        usageNotes: [
            'AmwTableComponent provides a simple table implementation for displaying tabular data.',
            'For complex tables with custom cell templates, use the directive-based API with amwColumnDef, amwCellDef, etc.',
            'Combine with AmwSortModule for sortable columns.',
            'Combine with AmwPaginatorComponent for pagination support.',
            'The table automatically renders headers based on displayedColumns.',
            'For Observable data sources, ensure proper subscription management.'
        ]
    };

    directivesDocumentation: ApiDocumentation = {
        inputs: [
            {
                name: 'amwColumnDef',
                type: 'string',
                default: 'required',
                description: 'Defines a column with the given name. Used with ng-container.'
            },
            {
                name: 'amwHeaderCellDef',
                type: 'directive',
                default: '-',
                description: 'Marks the template for the header cell of a column.'
            },
            {
                name: 'amwCellDef',
                type: 'directive',
                default: '-',
                description: 'Marks the template for the data cell of a column. Provides "let element" context.'
            },
            {
                name: 'amwHeaderRowDef',
                type: 'string[]',
                default: '[]',
                description: 'Defines which columns to display in the header row.'
            },
            {
                name: 'amwRowDef',
                type: 'directive',
                default: '-',
                description: 'Defines the template for data rows. Use with "columns" input.'
            }
        ]
    };

    constructor() {
        super();
    }
}
