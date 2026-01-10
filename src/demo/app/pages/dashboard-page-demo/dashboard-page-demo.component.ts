import { Component } from '@angular/core';
import {
  AmwDashboardPageComponent,
  DashboardConfig,
  DashboardDataSource,
  DashboardData
} from 'angular-material-wrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

// Custom data source
class MealPlanDataSource implements DashboardDataSource {
  private mockItems = [
    {
      id: '1',
      title: 'Monday - Breakfast',
      subtitle: 'Banana Pancakes',
      date: new Date('2024-01-15T08:00:00'),
      badge: 'Breakfast',
      calories: 350
    },
    {
      id: '2',
      title: 'Monday - Lunch',
      subtitle: 'Caesar Salad',
      date: new Date('2024-01-15T12:00:00'),
      badge: 'Lunch',
      calories: 280
    },
    {
      id: '3',
      title: 'Monday - Dinner',
      subtitle: 'Spaghetti Carbonara',
      date: new Date('2024-01-15T18:00:00'),
      badge: 'Dinner',
      calories: 520
    },
    {
      id: '4',
      title: 'Tuesday - Breakfast',
      subtitle: 'Greek Yogurt Bowl',
      date: new Date('2024-01-16T08:00:00'),
      badge: 'Breakfast',
      calories: 220
    },
    {
      id: '5',
      title: 'Tuesday - Lunch',
      subtitle: 'Chicken Wrap',
      date: new Date('2024-01-16T12:00:00'),
      badge: 'Lunch',
      calories: 380
    },
    {
      id: '6',
      title: 'Tuesday - Dinner',
      subtitle: 'Thai Green Curry',
      date: new Date('2024-01-16T18:00:00'),
      badge: 'Dinner',
      calories: 480
    }
  ];

  getDashboardData(params: any): Observable<DashboardData> {
    const stats = {
      totalMeals: this.mockItems.length,
      thisWeek: 18,
      upcoming: 12,
      avgCalories: Math.round(
        this.mockItems.reduce((sum, item) => sum + item.calories, 0) / this.mockItems.length
      )
    };

    return new BehaviorSubject({
      stats,
      items: this.mockItems,
      totalCount: this.mockItems.length,
      viewMode: params.viewMode
    }).pipe(delay(500));
  }
}

@Component({
  selector: 'app-dashboard-page-demo',
  standalone: true,
  imports: [
    AmwDashboardPageComponent
],
  template: `
    <div class="demo-page">
      <h1>Dashboard Page Component</h1>
      <p>A comprehensive dashboard layout with stats pills, view mode toggles, and flexible content areas for analytics and data visualization.</p>

      <mat-tab-group>
        <mat-tab label="Demo">
          <div class="demo-container">
            <amw-dashboard-page
              [config]="config"
              [dataSource]="dataSource"
              (viewModeChange)="onViewModeChange($event)"
              (statClick)="onStatClick($event)"
              (itemClick)="onItemClick($event)">
            </amw-dashboard-page>
          </div>
        </mat-tab>

        <mat-tab label="Code">
          <mat-card>
            <mat-card-content>
              <h3>Component Usage</h3>
              <pre><code>import &#123; AmwDashboardPageComponent, DashboardConfig &#125; from 'angular-material-wrap';

const config: DashboardConfig = &#123;
  title: 'Meal Planning Dashboard',
  stats: [
    &#123; id: 'total', label: 'Total Meals', value: 0, icon: 'restaurant' &#125;,
    &#123; id: 'thisWeek', label: 'This Week', value: 0, icon: 'calendar_today' &#125;,
    &#123; id: 'upcoming', label: 'Upcoming', value: 0, icon: 'schedule' &#125;,
    &#123; id: 'avgCal', label: 'Avg Calories', value: 0, icon: 'local_fire_department' &#125;
  ],
  viewModes: ['week', 'month', 'list'],
  defaultViewMode: 'week',
  showSearch: true,
  contentLayout: 'list'
&#125;;

&lt;amw-dashboard-page
  [config]="config"
  [dataSource]="dataSource"
  (viewModeChange)="onViewModeChange($event)"
  (statClick)="onStatClick($event)"&gt;
&lt;/amw-dashboard-page&gt;</code></pre>

              <h3>Features</h3>
              <ul>
                <li>Stat pills with trend indicators and icons</li>
                <li>View mode toggles (week, month, list, grid)</li>
                <li>Search and filter toolbar</li>
                <li>Multiple content layouts (grid, list, calendar, widgets)</li>
                <li>Auto-refresh capability</li>
                <li>Responsive grid layouts</li>
                <li>Action buttons in header</li>
                <li>Customizable stats per row</li>
                <li>Loading and empty states</li>
              </ul>
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <mat-tab label="API">
          <mat-card>
            <mat-card-content>
              <h3>Inputs</h3>
              <ul>
                <li><code>@Input() config: DashboardConfig</code> - Configuration object</li>
                <li><code>@Input() dataSource?: DashboardDataSource</code> - Data source for loading data</li>
                <li><code>@Input() initialViewMode?: string</code> - Initial view mode</li>
                <li><code>@Input() autoRefresh?: boolean</code> - Enable auto-refresh</li>
                <li><code>@Input() refreshInterval?: number</code> - Refresh interval in ms</li>
              </ul>

              <h3>Outputs</h3>
              <ul>
                <li><code>@Output() viewModeChange: EventEmitter&lt;string&gt;</code> - Emits when view mode changes</li>
                <li><code>@Output() statClick: EventEmitter&lt;DashboardStat&gt;</code> - Emits when stat pill is clicked</li>
                <li><code>@Output() searchChange: EventEmitter&lt;string&gt;</code> - Emits when search changes</li>
                <li><code>@Output() itemClick: EventEmitter&lt;any&gt;</code> - Emits when item is clicked</li>
                <li><code>@Output() actionClick: EventEmitter&lt;&#123;action: string&#125;&gt;</code> - Emits when action is clicked</li>
                <li><code>@Output() dataLoad: EventEmitter&lt;DashboardData&gt;</code> - Emits when data loads</li>
              </ul>

              <h3>DashboardConfig Interface</h3>
              <pre><code>interface DashboardConfig &#123;
  title?: string;
  stats: DashboardStat[];
  viewModes: string[];
  defaultViewMode?: string;
  viewModeLabels?: &#123; [key: string]: string &#125;;
  viewModeIcons?: &#123; [key: string]: string &#125;;
  contentLayout?: 'grid' | 'list' | 'calendar' | 'widgets' | 'custom';
  widgets?: DashboardWidget[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  showFilters?: boolean;
  showRefresh?: boolean;
  showDateRange?: boolean;
  statsPerRow?: number;
  gridColumns?: number;
  emptyMessage?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
  actions?: DashboardAction[];
  density?: 'compact' | 'comfortable' | 'spacious';
  showTrends?: boolean;
&#125;</code></pre>
            </mat-card-content>
          </mat-card>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .demo-page {
      padding: 20px;
    }

    .demo-container {
      height: 700px;
      margin-top: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }

    mat-card {
      margin-top: 20px;
    }

    pre {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      overflow-x: auto;
    }

    code {
      font-family: 'Courier New', monospace;
      font-size: 13px;
    }

    h3 {
      margin-top: 24px;
      margin-bottom: 12px;
    }

    ul {
      line-height: 1.8;
    }
  `]
})
export class DashboardPageDemoComponent {
  dataSource = new MealPlanDataSource();

  config: DashboardConfig = {
    title: 'Meal Planning Dashboard',
    stats: [
      {
        id: 'totalMeals',
        label: 'Total Meals',
        value: 0,
        icon: 'restaurant',
        color: 'primary',
        trend: {
          value: 12,
          direction: 'up',
          label: 'vs last week'
        }
      },
      {
        id: 'thisWeek',
        label: 'This Week',
        value: 0,
        icon: 'calendar_today',
        color: 'accent',
        subtitle: 'Planned meals'
      },
      {
        id: 'upcoming',
        label: 'Upcoming',
        value: 0,
        icon: 'schedule',
        color: 'success'
      },
      {
        id: 'avgCalories',
        label: 'Avg Calories',
        value: 0,
        icon: 'local_fire_department',
        color: 'warn',
        trend: {
          value: 5,
          direction: 'down',
          label: 'vs last week'
        }
      }
    ],
    viewModes: ['week', 'month', 'list'],
    defaultViewMode: 'week',
    viewModeLabels: {
      week: 'Week View',
      month: 'Month View',
      list: 'List View'
    },
    viewModeIcons: {
      week: 'view_week',
      month: 'calendar_month',
      list: 'view_list'
    },
    contentLayout: 'list',
    showSearch: true,
    searchPlaceholder: 'Search meals...',
    showRefresh: true,
    showFilters: false,
    statsPerRow: 4,
    gridColumns: 3,
    emptyMessage: 'No meals planned yet',
    density: 'comfortable',
    showTrends: true,
    actions: [
      { id: 'add', label: 'Add Meal', icon: 'add', color: 'primary' },
      { id: 'export', label: 'Export', icon: 'download' }
    ]
  };

  onViewModeChange(viewMode: string): void {
    console.log('View mode changed:', viewMode);
  }

  onStatClick(stat: any): void {
    console.log('Stat clicked:', stat);
  }

  onItemClick(item: any): void {
    console.log('Item clicked:', item);
  }
}
