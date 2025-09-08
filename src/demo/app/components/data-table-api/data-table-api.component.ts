import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'amw-demo-data-table-api',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './data-table-api.component.html',
    styleUrl: './data-table-api.component.scss'
})
export class DataTableApiComponent {
    apiDocumentation = {
        inputs: [
            { name: 'value', type: 'any[]', default: '[]', description: 'Array of data objects to display in the table' },
            { name: 'columns', type: 'DataTableColumn[]', default: '[]', description: 'Configuration for table columns' },
            { name: 'actions', type: 'DataTableAction[]', default: '[]', description: 'Action buttons for each row' },
            { name: 'config', type: 'DataTableConfig', default: '{}', description: 'General table configuration options' },
            { name: 'selectable', type: 'boolean', default: 'false', description: 'Enable row selection' },
            { name: 'multiSelect', type: 'boolean', default: 'false', description: 'Allow multiple row selection' },
            { name: 'sortable', type: 'boolean', default: 'true', description: 'Enable column sorting' },
            { name: 'filterable', type: 'boolean', default: 'true', description: 'Enable search and filtering' },
            { name: 'pageable', type: 'boolean', default: 'true', description: 'Enable pagination' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading state' },
            { name: 'emptyMessage', type: 'string', default: "'No data available'", description: 'Message to show when no data' },
            { name: 'noDataIcon', type: 'string', default: "'inbox'", description: 'Icon to show when no data' }
        ],
        outputs: [
            { name: 'dataChange', type: 'EventEmitter<any[]>', description: 'Emitted when data changes' },
            { name: 'selectionChange', type: 'EventEmitter<any[]>', description: 'Emitted when selection changes' },
            { name: 'sortChange', type: 'EventEmitter<DataTableSort>', description: 'Emitted when sorting changes' },
            { name: 'pageChange', type: 'EventEmitter<DataTablePage>', description: 'Emitted when pagination changes' },
            { name: 'filterChange', type: 'EventEmitter<DataTableFilter[]>', description: 'Emitted when filters change' },
            { name: 'actionClick', type: 'EventEmitter<{action: DataTableAction; row: any; index: number}>', description: 'Emitted when action button is clicked' }
        ],
        interfaces: [
            {
                name: 'DataTableConfig',
                description: 'Configuration options for the data table',
                properties: [
                    { name: 'size', type: "'small' | 'medium' | 'large'", description: 'Size variant of the table' },
                    { name: 'theme', type: "'primary' | 'accent' | 'warn'", description: 'Theme variant of the table' },
                    { name: 'pageSize', type: 'number', description: 'Number of items per page' },
                    { name: 'pageSizeOptions', type: 'number[]', description: 'Available page size options' },
                    { name: 'showFirstLastButtons', type: 'boolean', description: 'Show first/last page buttons' },
                    { name: 'hidePageSize', type: 'boolean', description: 'Hide page size selector' },
                    { name: 'disabled', type: 'boolean', description: 'Disable the table' },
                    { name: 'loading', type: 'boolean', description: 'Show loading state' },
                    { name: 'emptyMessage', type: 'string', description: 'Message when no data' },
                    { name: 'noDataIcon', type: 'string', description: 'Icon when no data' },
                    { name: 'stickyHeader', type: 'boolean', description: 'Make header sticky' },
                    { name: 'stickyFooter', type: 'boolean', description: 'Make footer sticky' },
                    { name: 'striped', type: 'boolean', description: 'Alternating row colors' },
                    { name: 'hoverable', type: 'boolean', description: 'Row hover effects' }
                ]
            },
            {
                name: 'DataTableColumn',
                description: 'Configuration for table columns',
                properties: [
                    { name: 'key', type: 'string', description: 'Property key in data object' },
                    { name: 'label', type: 'string', description: 'Display label for column header' },
                    { name: 'type', type: "'text' | 'number' | 'currency' | 'date' | 'boolean' | 'custom'", description: 'Data type for formatting' },
                    { name: 'sortable', type: 'boolean', description: 'Enable sorting for this column' },
                    { name: 'filterable', type: 'boolean', description: 'Enable filtering for this column' },
                    { name: 'hidden', type: 'boolean', description: 'Hide this column' },
                    { name: 'width', type: 'string', description: 'Column width (CSS value)' },
                    { name: 'minWidth', type: 'string', description: 'Minimum column width' },
                    { name: 'maxWidth', type: 'string', description: 'Maximum column width' },
                    { name: 'align', type: "'left' | 'center' | 'right'", description: 'Text alignment' },
                    { name: 'currency', type: 'string', description: 'Currency code for currency type' },
                    { name: 'decimals', type: 'number', description: 'Decimal places for number type' },
                    { name: 'dateFormat', type: 'string', description: 'Date format string' },
                    { name: 'template', type: 'TemplateRef<any>', description: 'Custom template for cell content' },
                    { name: 'formatter', type: '(value: any, row: any) => string', description: 'Custom formatter function' }
                ]
            },
            {
                name: 'DataTableAction',
                description: 'Configuration for row action buttons',
                properties: [
                    { name: 'key', type: 'string', description: 'Unique identifier for the action' },
                    { name: 'label', type: 'string', description: 'Display label for the action' },
                    { name: 'icon', type: 'string', description: 'Material icon name' },
                    { name: 'color', type: "'primary' | 'accent' | 'warn'", description: 'Button color theme' },
                    { name: 'disabled', type: '(row: any, index: number) => boolean', description: 'Function to determine if action is disabled' },
                    { name: 'visible', type: '(row: any, index: number) => boolean', description: 'Function to determine if action is visible' },
                    { name: 'tooltip', type: 'string', description: 'Tooltip text for the action' }
                ]
            },
            {
                name: 'DataTableSort',
                description: 'Sort configuration',
                properties: [
                    { name: 'column', type: 'string', description: 'Column key being sorted' },
                    { name: 'direction', type: "'asc' | 'desc'", description: 'Sort direction' }
                ]
            },
            {
                name: 'DataTablePage',
                description: 'Pagination configuration',
                properties: [
                    { name: 'pageIndex', type: 'number', description: 'Current page index (0-based)' },
                    { name: 'pageSize', type: 'number', description: 'Number of items per page' },
                    { name: 'length', type: 'number', description: 'Total number of items' }
                ]
            },
            {
                name: 'DataTableFilter',
                description: 'Filter configuration',
                properties: [
                    { name: 'key', type: 'string', description: 'Column key to filter' },
                    { name: 'label', type: 'string', description: 'Display label for filter' },
                    { name: 'type', type: "'text' | 'select' | 'date' | 'number' | 'boolean'", description: 'Filter input type' },
                    { name: 'options', type: '{value: any; label: string}[]', description: 'Options for select filter' },
                    { name: 'placeholder', type: 'string', description: 'Placeholder text for filter input' },
                    { name: 'value', type: 'any', description: 'Current filter value' },
                    { name: 'operator', type: "'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between'", description: 'Filter operator' }
                ]
            }
        ]
    };

    getDisplayedColumns(section: string): any[] {
        const data = this.apiDocumentation[section as keyof typeof this.apiDocumentation];
        if (Array.isArray(data)) {
            return data;
        }
        return [];
    }

    getInterfaces(): any[] {
        const interfaces = this.apiDocumentation.interfaces;
        return Array.isArray(interfaces) ? interfaces : [];
    }
}
