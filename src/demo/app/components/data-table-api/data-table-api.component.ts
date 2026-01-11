import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseApiComponent, ApiDocumentation } from '../base/base-api.component';
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent } from '../../../../library/src/components/components';

@Component({
    selector: 'amw-demo-data-table-api',
    standalone: true,
    imports: [
        CommonModule,
        AmwTabsComponent,
        AmwTabComponent,
        AmwCardComponent,
    ],
    encapsulation: ViewEncapsulation.None,
    template: `
    <div class="data-table-api-demo">
      <h3>Data Table API Documentation</h3>
      <p>Complete API reference for the data table component.</p>

      <amw-tabs>
        <amw-tab label="Inputs">
          <div class="api-section">
            <h4>Component Inputs</h4>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>data</code></td>
                    <td><code>any[]</code></td>
                    <td><code>[]</code></td>
                    <td>Array of data objects to display in the table</td>
                  </tr>
                  <tr>
                    <td><code>columns</code></td>
                    <td><code>DataTableColumn[]</code></td>
                    <td><code>[]</code></td>
                    <td>Column configuration array</td>
                  </tr>
                  <tr>
                    <td><code>config</code></td>
                    <td><code>DataTableConfig</code></td>
                    <td><code>{{ '{}' }}</code></td>
                    <td>Table configuration options</td>
                  </tr>
                  <tr>
                    <td><code>loading</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Shows loading spinner when true</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </amw-tab>

        <amw-tab label="Outputs">
          <div class="api-section">
            <h4>Component Outputs</h4>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>rowClick</code></td>
                    <td><code>EventEmitter&lt;any&gt;</code></td>
                    <td>Emitted when a row is clicked</td>
                  </tr>
                  <tr>
                    <td><code>actionClick</code></td>
                    <td><code>EventEmitter&lt;DataTableAction&gt;</code></td>
                    <td>Emitted when an action button is clicked</td>
                  </tr>
                  <tr>
                    <td><code>rowUpdate</code></td>
                    <td><code>EventEmitter&lt;any&gt;</code></td>
                    <td>Emitted when a row is updated</td>
                  </tr>
                  <tr>
                    <td><code>rowDelete</code></td>
                    <td><code>EventEmitter&lt;any&gt;</code></td>
                    <td>Emitted when a row is deleted</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </amw-tab>

        <amw-tab label="Interfaces">
          <div class="api-section">
            <h4>DataTableColumn Interface</h4>
            <pre><code>{{ columnInterface }}</code></pre>

            <h4>DataTableConfig Interface</h4>
            <pre><code>{{ configInterface }}</code></pre>

            <h4>DataTableAction Interface</h4>
            <pre><code>{{ actionInterface }}</code></pre>
          </div>
        </amw-tab>

        <amw-tab label="Methods">
          <div class="api-section">
            <h4>Public Methods</h4>
            <div class="api-table">
              <table>
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Parameters</th>
                    <th>Return Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>refresh()</code></td>
                    <td>-</td>
                    <td><code>void</code></td>
                    <td>Refreshes the table data</td>
                  </tr>
                  <tr>
                    <td><code>getSelectedRows()</code></td>
                    <td>-</td>
                    <td><code>any[]</code></td>
                    <td>Returns currently selected rows</td>
                  </tr>
                  <tr>
                    <td><code>clearSelection()</code></td>
                    <td>-</td>
                    <td><code>void</code></td>
                    <td>Clears row selection</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </amw-tab>
      </amw-tabs>
    </div>
  `,
    styleUrl: './data-table-api.component.scss'
})
export class DataTableApiComponent extends BaseApiComponent {
    apiDocumentation: ApiDocumentation = {
        inputs: [],
        outputs: []
    };

    columnInterface = `interface DataTableColumn {{
  key: string;
  title: string;
  type: 'text' | 'number' | 'email' | 'date' | 'boolean' | 'select';
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  required?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  format?: string;
  options?: any[];
  validation?: ValidationRule;
}}`;

    configInterface = `interface DataTableConfig {{
  editable?: boolean;
  showActions?: boolean;
  showPagination?: boolean;
  showSorting?: boolean;
  showFiltering?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  actions?: DataTableAction[];
  selection?: 'single' | 'multiple' | 'none';
  stickyHeader?: boolean;
  height?: string;
  maxHeight?: string;
}}`;

    actionInterface = `interface DataTableAction {{
  id: string;
  label: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn';
  disabled?: boolean;
  visible?: (row: any) => boolean;
}}`;

    constructor() {
        super();
    }
}
