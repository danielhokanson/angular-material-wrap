import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent, AmwIconComponent } from '../../../../library/src/components/components';

@Component({
  selector: 'amw-demo-pages',
  standalone: true,
  imports: [
    AmwTabsComponent,
    AmwTabComponent,
    AmwCardComponent,
    AmwIconComponent
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="pages-demo">
      <h1>Page Layouts</h1>
      <p>Complete page layouts and common UI patterns</p>

      <amw-card>
        <ng-template #cardHeader>
          <h2>{{ selectedPage.name }}</h2>
        </ng-template>
        <ng-template #cardContent>
          <amw-tabs>
            <amw-tab label="Demo">
              @if (selectedPage.id === 'dashboard') {
                <div>
                  <h3>Dashboard Page</h3>
                  <p>Complete dashboard layout with cards and stats.</p>
                  <amw-card>
                    <ng-template #cardContent>
                      <h4>Dashboard Content</h4>
                      <p>This is a sample dashboard layout.</p>
                    </ng-template>
                  </amw-card>
                </div>
              }
              @if (selectedPage.id === 'profile') {
                <div>
                  <h3>Profile Page</h3>
                  <p>User profile page with personal information.</p>
                  <amw-card>
                    <ng-template #cardContent>
                      <h4>Profile Content</h4>
                      <p>This is a sample profile layout.</p>
                    </ng-template>
                  </amw-card>
                </div>
              }
              @if (selectedPage.id === 'settings') {
                <div>
                  <h3>Settings Page</h3>
                  <p>Application settings page with configuration options.</p>
                  <amw-card>
                    <ng-template #cardContent>
                      <h4>Settings Content</h4>
                      <p>This is a sample settings layout.</p>
                    </ng-template>
                  </amw-card>
                </div>
              }
            </amw-tab>
            <amw-tab label="Code">
              <div class="code-section">
                <h3>{{ selectedPage.name }} Page Code</h3>
                <p>The library provides 6 page stereotypes for common application layouts:</p>

                <amw-card class="code-example">
                  <ng-template #cardHeader>
                    <h3>Available Page Components</h3>
                  </ng-template>
                  <ng-template #cardContent>
                    <pre><code>// List Page - Data tables with filtering and pagination
import &#123; AmwListPageComponent &#125; from '@angular-material-wrap/pages';

// Detail Page - Display detailed information
import &#123; AmwDetailPageComponent &#125; from '@angular-material-wrap/pages';

// Form Page - Data entry and editing
import &#123; AmwFormPageComponent &#125; from '@angular-material-wrap/pages';

// Search Page - Advanced search interfaces
import &#123; AmwSearchPageComponent &#125; from '@angular-material-wrap/pages';

// Workflow Page - Multi-step processes
import &#123; AmwWorkflowPageComponent &#125; from '@angular-material-wrap/pages';

// Report Page - Data visualization and reports
import &#123; AmwReportPageComponent &#125; from '@angular-material-wrap/pages';</code></pre>
                  </ng-template>
                </amw-card>

                <amw-card class="code-example">
                  <ng-template #cardHeader>
                    <h3>Basic Usage</h3>
                  </ng-template>
                  <ng-template #cardContent>
                    <pre><code>// Example: Using the List Page component
&lt;amw-list-page
  [config]="listConfig"
  [dataSource]="dataSource"
  (actionTriggered)="handleAction($event)"&gt;
&lt;/amw-list-page&gt;

// Configuration
listConfig: ListPageConfig = &#123;
  title: 'Users',
  columns: [...],
  actions: [...],
  filters: [...]
&#125;;</code></pre>
                  </ng-template>
                </amw-card>

                <p>For detailed examples, see the individual page demos in the navigation menu.</p>
              </div>
            </amw-tab>
            <amw-tab label="API">
              <div class="api-section">
                <h3>{{ selectedPage.name }} Page API</h3>

                <amw-card class="api-reference">
                  <ng-template #cardHeader>
                    <h3>Page Stereotype Components</h3>
                  </ng-template>
                  <ng-template #cardContent>
                    <h4>AmwListPageComponent</h4>
                    <p>Displays data in tabular format with built-in filtering, sorting, and pagination.</p>
                    <ul>
                      <li><code>&#64;Input() config: ListPageConfig</code> - Page configuration</li>
                      <li><code>&#64;Input() dataSource: ListPageDataSource</code> - Data provider</li>
                      <li><code>&#64;Output() actionTriggered: EventEmitter&lt;ListPageAction&gt;</code> - Action events</li>
                    </ul>

                    <h4>AmwDetailPageComponent</h4>
                    <p>Shows detailed information in a structured layout with optional actions.</p>
                    <ul>
                      <li><code>&#64;Input() config: DetailPageConfig</code> - Page configuration</li>
                      <li><code>&#64;Input() data: DetailPageData</code> - Data to display</li>
                      <li><code>&#64;Output() actionTriggered: EventEmitter&lt;DetailPageAction&gt;</code> - Action events</li>
                    </ul>

                    <h4>AmwFormPageComponent</h4>
                    <p>Provides a form layout with validation, submit, and cancel actions.</p>
                    <ul>
                      <li><code>&#64;Input() config: FormPageConfig</code> - Page configuration</li>
                      <li><code>&#64;Input() formGroup: FormGroup</code> - Reactive form</li>
                      <li><code>&#64;Output() formSubmit: EventEmitter&lt;any&gt;</code> - Form submission events</li>
                    </ul>

                    <h4>AmwSearchPageComponent</h4>
                    <p>Advanced search interface with filters and results display.</p>
                    <ul>
                      <li><code>&#64;Input() config: SearchPageConfig</code> - Page configuration</li>
                      <li><code>&#64;Input() searchCriteria: SearchCriteria</code> - Search parameters</li>
                      <li><code>&#64;Output() searchTriggered: EventEmitter&lt;SearchCriteria&gt;</code> - Search events</li>
                    </ul>

                    <h4>AmwWorkflowPageComponent</h4>
                    <p>Multi-step workflow with navigation and state management.</p>
                    <ul>
                      <li><code>&#64;Input() config: WorkflowPageConfig</code> - Page configuration</li>
                      <li><code>&#64;Input() steps: WorkflowStep[]</code> - Workflow steps</li>
                      <li><code>&#64;Output() stepChanged: EventEmitter&lt;number&gt;</code> - Step change events</li>
                    </ul>

                    <h4>AmwReportPageComponent</h4>
                    <p>Report display with charts, tables, and export capabilities.</p>
                    <ul>
                      <li><code>&#64;Input() config: ReportPageConfig</code> - Page configuration</li>
                      <li><code>&#64;Input() reportData: ReportData</code> - Report data</li>
                      <li><code>&#64;Output() exportTriggered: EventEmitter&lt;string&gt;</code> - Export events</li>
                    </ul>
                  </ng-template>
                </amw-card>

                <p>For complete API documentation and advanced usage, refer to the library documentation.</p>
              </div>
            </amw-tab>
          </amw-tabs>
        </ng-template>
      </amw-card>
    </div>
  `,
  styles: [`
    .pages-demo {
      padding: 20px;
    }
    .code-section, .api-section {
      padding: 20px;
    }
    .code-example, .api-reference {
      margin: 16px 0;
    }
    pre {
      background-color: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      overflow-x: auto;
    }
    code {
      font-family: 'Courier New', monospace;
      font-size: 14px;
    }
    .api-reference h4 {
      margin-top: 16px;
      margin-bottom: 8px;
      color: #1976d2;
    }
    .api-reference ul {
      margin: 8px 0;
    }
    .api-reference li {
      margin: 4px 0;
    }
  `]
})
export class PagesDemoComponent implements OnInit {
  pages = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'profile', name: 'Profile' },
    { id: 'settings', name: 'Settings' }
  ];

  selectedPage = { id: 'dashboard', name: 'Dashboard' };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['page']) {
        const page = this.pages.find(p => p.id === data['page']);
        if (page) {
          this.selectedPage = page;
        }
      }
    });
  }
}
