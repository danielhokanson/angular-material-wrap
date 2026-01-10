import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ViewEncapsulation } from '@angular/core';
import { AmwTabsComponent } from '@angular/material/tabs';

@Component({
  selector: 'amw-demo-pages',
  standalone: true,
  imports: [
    MatIconModule,
    AmwTabsComponent
],
  encapsulation: ViewEncapsulation.None,
  template: `
        <div class="pages-demo">
          <h1>Page Layouts</h1>
          <p>Complete page layouts and common UI patterns</p>
        
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ selectedPage.name }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <mat-tab-group>
                <mat-tab label="Demo">
                  @if (selectedPage.id === 'dashboard') {
                    <div>
                      <h3>Dashboard Page</h3>
                      <p>Complete dashboard layout with cards and stats.</p>
                      <mat-card>
                        <mat-card-content>
                          <h4>Dashboard Content</h4>
                          <p>This is a sample dashboard layout.</p>
                        </mat-card-content>
                      </mat-card>
                    </div>
                  }
                  @if (selectedPage.id === 'profile') {
                    <div>
                      <h3>Profile Page</h3>
                      <p>User profile page with personal information.</p>
                      <mat-card>
                        <mat-card-content>
                          <h4>Profile Content</h4>
                          <p>This is a sample profile layout.</p>
                        </mat-card-content>
                      </mat-card>
                    </div>
                  }
                  @if (selectedPage.id === 'settings') {
                    <div>
                      <h3>Settings Page</h3>
                      <p>Application settings page with configuration options.</p>
                      <mat-card>
                        <mat-card-content>
                          <h4>Settings Content</h4>
                          <p>This is a sample settings layout.</p>
                        </mat-card-content>
                      </mat-card>
                    </div>
                  }
                </mat-tab>
                <mat-tab label="Code">
                  <div class="code-section">
                    <h3>{{ selectedPage.name }} Page Code</h3>
                    <p>The library provides 6 page stereotypes for common application layouts:</p>

                    <mat-card class="code-example">
                      <mat-card-header>
                        <mat-card-title>Available Page Components</mat-card-title>
                      </mat-card-header>
                      <mat-card-content>
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
                      </mat-card-content>
                    </mat-card>

                    <mat-card class="code-example">
                      <mat-card-header>
                        <mat-card-title>Basic Usage</mat-card-title>
                      </mat-card-header>
                      <mat-card-content>
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
                      </mat-card-content>
                    </mat-card>

                    <p>For detailed examples, see the individual page demos in the navigation menu.</p>
                  </div>
                </mat-tab>
                <mat-tab label="API">
                  <div class="api-section">
                    <h3>{{ selectedPage.name }} Page API</h3>

                    <mat-card class="api-reference">
                      <mat-card-header>
                        <mat-card-title>Page Stereotype Components</mat-card-title>
                      </mat-card-header>
                      <mat-card-content>
                        <h4>AmwListPageComponent</h4>
                        <p>Displays data in tabular format with built-in filtering, sorting, and pagination.</p>
                        <ul>
                          <li><code>@Input() config: ListPageConfig</code> - Page configuration</li>
                          <li><code>@Input() dataSource: ListPageDataSource</code> - Data provider</li>
                          <li><code>@Output() actionTriggered: EventEmitter&lt;ListPageAction&gt;</code> - Action events</li>
                        </ul>

                        <h4>AmwDetailPageComponent</h4>
                        <p>Shows detailed information in a structured layout with optional actions.</p>
                        <ul>
                          <li><code>@Input() config: DetailPageConfig</code> - Page configuration</li>
                          <li><code>@Input() data: DetailPageData</code> - Data to display</li>
                          <li><code>@Output() actionTriggered: EventEmitter&lt;DetailPageAction&gt;</code> - Action events</li>
                        </ul>

                        <h4>AmwFormPageComponent</h4>
                        <p>Provides a form layout with validation, submit, and cancel actions.</p>
                        <ul>
                          <li><code>@Input() config: FormPageConfig</code> - Page configuration</li>
                          <li><code>@Input() formGroup: FormGroup</code> - Reactive form</li>
                          <li><code>@Output() formSubmit: EventEmitter&lt;any&gt;</code> - Form submission events</li>
                        </ul>

                        <h4>AmwSearchPageComponent</h4>
                        <p>Advanced search interface with filters and results display.</p>
                        <ul>
                          <li><code>@Input() config: SearchPageConfig</code> - Page configuration</li>
                          <li><code>@Input() searchCriteria: SearchCriteria</code> - Search parameters</li>
                          <li><code>@Output() searchTriggered: EventEmitter&lt;SearchCriteria&gt;</code> - Search events</li>
                        </ul>

                        <h4>AmwWorkflowPageComponent</h4>
                        <p>Multi-step workflow with navigation and state management.</p>
                        <ul>
                          <li><code>@Input() config: WorkflowPageConfig</code> - Page configuration</li>
                          <li><code>@Input() steps: WorkflowStep[]</code> - Workflow steps</li>
                          <li><code>@Output() stepChanged: EventEmitter&lt;number&gt;</code> - Step change events</li>
                        </ul>

                        <h4>AmwReportPageComponent</h4>
                        <p>Report display with charts, tables, and export capabilities.</p>
                        <ul>
                          <li><code>@Input() config: ReportPageConfig</code> - Page configuration</li>
                          <li><code>@Input() reportData: ReportData</code> - Report data</li>
                          <li><code>@Output() exportTriggered: EventEmitter&lt;string&gt;</code> - Export events</li>
                        </ul>
                      </mat-card-content>
                    </mat-card>

                    <p>For complete API documentation and advanced usage, refer to the library documentation.</p>
                  </div>
                </mat-tab>
              </mat-tab-group>
            </mat-card-content>
          </mat-card>
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