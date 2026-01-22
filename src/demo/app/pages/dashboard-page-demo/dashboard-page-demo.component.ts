import { Component } from '@angular/core';
import {
  AmwDashboardPageComponent,
  DashboardConfig,
  DashboardDataSource,
  DashboardData
} from 'angular-material-wrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AmwTabsComponent, AmwTabComponent, AmwCardComponent } from '../../../../library/src/components/components';
import { AmwApiDocComponent, ApiInterface } from '../../shared/components/api-doc/api-doc.component';
import { ApiDocumentation } from '../../components/base/base-api.component';

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
    AmwDashboardPageComponent,
    AmwTabsComponent,
    AmwTabComponent,
    AmwCardComponent,
    AmwApiDocComponent
  ],
  templateUrl: './dashboard-page-demo.component.html',
  styleUrl: './dashboard-page-demo.component.scss'
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

  // Code Examples
  codeExamples = {
    basic: `import { Component } from '@angular/core';
import { AmwDashboardPageComponent, DashboardConfig } from 'angular-material-wrap';

@Component({
  selector: 'app-my-dashboard',
  template: \`
    <amw-dashboard-page
      [config]="config"
      [dataSource]="dataSource"
      (viewModeChange)="onViewModeChange($event)"
      (statClick)="onStatClick($event)">
    </amw-dashboard-page>
  \`
})
export class MyDashboardComponent {
  config: DashboardConfig = {
    title: 'My Dashboard',
    stats: [
      { id: 'total', label: 'Total Items', value: 0, icon: 'inventory' }
    ],
    viewModes: ['list', 'grid'],
    defaultViewMode: 'list'
  };

  dataSource = new MyDataSource();

  onViewModeChange(viewMode: string): void {
    console.log('View mode changed:', viewMode);
  }

  onStatClick(stat: any): void {
    console.log('Stat clicked:', stat);
  }
}`,

    config: `// DashboardConfig with all options
const config: DashboardConfig = {
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
};`,

    dataSource: `import { Observable, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DashboardDataSource, DashboardData } from 'angular-material-wrap';

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
    // ... more items
  ];

  getDashboardData(params: any): Observable<DashboardData> {
    const stats = {
      totalMeals: this.mockItems.length,
      thisWeek: 18,
      upcoming: 12,
      avgCalories: Math.round(
        this.mockItems.reduce((sum, item) => sum + item.calories, 0) /
        this.mockItems.length
      )
    };

    return new BehaviorSubject({
      stats,
      items: this.mockItems,
      totalCount: this.mockItems.length,
      viewMode: params.viewMode
    }).pipe(delay(500));
  }
}`,

    events: `// Handling dashboard events
@Component({
  selector: 'app-my-dashboard',
  template: \`
    <amw-dashboard-page
      [config]="config"
      [dataSource]="dataSource"
      (viewModeChange)="onViewModeChange($event)"
      (statClick)="onStatClick($event)"
      (searchChange)="onSearchChange($event)"
      (itemClick)="onItemClick($event)"
      (actionClick)="onActionClick($event)"
      (dataLoad)="onDataLoad($event)">
    </amw-dashboard-page>
  \`
})
export class MyDashboardComponent {
  onViewModeChange(viewMode: string): void {
    console.log('View mode changed:', viewMode);
  }

  onStatClick(stat: DashboardStat): void {
    console.log('Stat clicked:', stat);
    // Navigate to detail view or filter data
  }

  onSearchChange(query: string): void {
    console.log('Search query:', query);
  }

  onItemClick(item: any): void {
    console.log('Item clicked:', item);
    // Navigate to item detail
  }

  onActionClick(event: { action: string }): void {
    if (event.action === 'add') {
      // Open add dialog
    } else if (event.action === 'export') {
      // Export data
    }
  }

  onDataLoad(data: DashboardData): void {
    console.log('Data loaded:', data);
  }
}`,

    statsTrends: `// Stats with trend indicators
const stats: DashboardStat[] = [
  {
    id: 'revenue',
    label: 'Revenue',
    value: 125000,
    icon: 'attach_money',
    color: 'primary',
    trend: {
      value: 15,
      direction: 'up',
      label: 'vs last month'
    }
  },
  {
    id: 'orders',
    label: 'Orders',
    value: 342,
    icon: 'shopping_cart',
    color: 'accent',
    trend: {
      value: 8,
      direction: 'down',
      label: 'vs last month'
    }
  },
  {
    id: 'customers',
    label: 'New Customers',
    value: 56,
    icon: 'person_add',
    color: 'success',
    subtitle: 'This week'
  }
];`
  };

  // API Documentation
  dashboardPageApiDoc: ApiDocumentation = {
    inputs: [
      {
        name: 'config',
        type: 'DashboardConfig',
        default: '{}',
        description: 'Configuration object for the dashboard including title, stats, view modes, and layout options'
      },
      {
        name: 'dataSource',
        type: 'DashboardDataSource',
        default: 'undefined',
        description: 'Data source for loading dashboard data asynchronously'
      },
      {
        name: 'initialViewMode',
        type: 'string',
        default: 'undefined',
        description: 'Initial view mode to display (overrides config.defaultViewMode)'
      },
      {
        name: 'autoRefresh',
        type: 'boolean',
        default: 'false',
        description: 'Enable automatic data refresh at specified interval'
      },
      {
        name: 'refreshInterval',
        type: 'number',
        default: '30000',
        description: 'Refresh interval in milliseconds when autoRefresh is enabled'
      }
    ],
    outputs: [
      {
        name: 'viewModeChange',
        type: 'EventEmitter<string>',
        description: 'Emits when the view mode is changed by the user'
      },
      {
        name: 'statClick',
        type: 'EventEmitter<DashboardStat>',
        description: 'Emits when a stat pill is clicked'
      },
      {
        name: 'searchChange',
        type: 'EventEmitter<string>',
        description: 'Emits when the search query changes'
      },
      {
        name: 'itemClick',
        type: 'EventEmitter<any>',
        description: 'Emits when a dashboard item is clicked'
      },
      {
        name: 'actionClick',
        type: 'EventEmitter<{ action: string }>',
        description: 'Emits when an action button is clicked'
      },
      {
        name: 'dataLoad',
        type: 'EventEmitter<DashboardData>',
        description: 'Emits when dashboard data is loaded from the data source'
      }
    ],
    methods: [
      {
        name: 'refresh()',
        returns: 'void',
        description: 'Manually triggers a data refresh from the data source'
      },
      {
        name: 'setViewMode(mode: string)',
        returns: 'void',
        description: 'Programmatically sets the current view mode'
      }
    ],
    usageNotes: [
      'Import AmwDashboardPageComponent from angular-material-wrap',
      'Implement DashboardDataSource interface for custom data loading',
      'Stats are displayed as clickable pills with optional trend indicators',
      'View modes can be customized with labels and icons',
      'Content layouts include grid, list, calendar, widgets, and custom',
      'Use actions array to add custom buttons to the header',
      'Enable autoRefresh for real-time dashboard updates',
      'Responsive grid adapts to screen size automatically'
    ]
  };

  // Interface Documentation
  dashboardPageInterfaces: ApiInterface[] = [
    {
      name: 'DashboardConfig',
      description: 'Configuration object for the dashboard page layout and behavior',
      properties: [
        { name: 'title', type: 'string', description: 'Optional title for the dashboard' },
        { name: 'stats', type: 'DashboardStat[]', description: 'Array of stat configurations to display' },
        { name: 'viewModes', type: 'string[]', description: 'Available view modes for the dashboard' },
        { name: 'defaultViewMode', type: 'string', description: 'Default view mode to display on load' },
        { name: 'viewModeLabels', type: '{ [key: string]: string }', description: 'Labels for each view mode' },
        { name: 'viewModeIcons', type: '{ [key: string]: string }', description: 'Icons for each view mode' },
        { name: 'contentLayout', type: "'grid' | 'list' | 'calendar' | 'widgets' | 'custom'", description: 'Layout type for the content area' },
        { name: 'widgets', type: 'DashboardWidget[]', description: 'Widget configurations for widgets layout' },
        { name: 'showSearch', type: 'boolean', description: 'Whether to show the search input' },
        { name: 'searchPlaceholder', type: 'string', description: 'Placeholder text for the search input' },
        { name: 'showFilters', type: 'boolean', description: 'Whether to show filter controls' },
        { name: 'showRefresh', type: 'boolean', description: 'Whether to show the refresh button' },
        { name: 'showDateRange', type: 'boolean', description: 'Whether to show date range picker' },
        { name: 'statsPerRow', type: 'number', description: 'Number of stats to display per row' },
        { name: 'gridColumns', type: 'number', description: 'Number of columns for grid layout' },
        { name: 'emptyMessage', type: 'string', description: 'Message to display when no data' },
        { name: 'autoRefresh', type: 'boolean', description: 'Whether to enable auto-refresh' },
        { name: 'refreshInterval', type: 'number', description: 'Interval in ms for auto-refresh' },
        { name: 'actions', type: 'DashboardAction[]', description: 'Action buttons to display in header' },
        { name: 'density', type: "'compact' | 'comfortable' | 'spacious'", description: 'Visual density of the dashboard' },
        { name: 'showTrends', type: 'boolean', description: 'Whether to show trend indicators on stats' }
      ]
    },
    {
      name: 'DashboardStat',
      description: 'Configuration for individual stat pills displayed in the dashboard',
      properties: [
        { name: 'id', type: 'string', description: 'Unique identifier for the stat' },
        { name: 'label', type: 'string', description: 'Display label for the stat' },
        { name: 'value', type: 'number | string', description: 'The stat value to display' },
        { name: 'icon', type: 'string', description: 'Material icon name to display' },
        { name: 'color', type: "'primary' | 'accent' | 'warn' | 'success'", description: 'Color theme for the stat' },
        { name: 'subtitle', type: 'string', description: 'Optional subtitle text' },
        { name: 'trend', type: '{ value: number; direction: "up" | "down" | "neutral"; label?: string }', description: 'Trend indicator configuration' }
      ]
    },
    {
      name: 'DashboardDataSource',
      description: 'Interface for providing data to the dashboard component',
      properties: [
        { name: 'getDashboardData(params)', type: 'Observable<DashboardData>', description: 'Method that returns dashboard data based on view mode, search query, filters, and date range' }
      ]
    },
    {
      name: 'DashboardData',
      description: 'Data structure returned by the data source',
      properties: [
        { name: 'stats', type: '{ [key: string]: number }', description: 'Stat values keyed by stat id' },
        { name: 'items', type: 'any[]', description: 'Array of items to display in the content area' },
        { name: 'totalCount', type: 'number', description: 'Total count of items available' },
        { name: 'viewMode', type: 'string', description: 'Current view mode' }
      ]
    }
  ];

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
