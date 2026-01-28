import {
  Component,
  input,
  output,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmwCardComponent } from '../../../components/components/amw-card/amw-card.component';
import { AmwIconComponent } from '../../../components/components/amw-icon/amw-icon.component';
import { MatChipsModule } from '@angular/material/chips';
import { AmwButtonToggleGroupComponent } from '../../../controls/components/amw-button-toggle/amw-button-toggle-group.component';
import { AmwButtonToggleComponent } from '../../../controls/components/amw-button-toggle/amw-button-toggle.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AmwAccordionPanelComponent } from '../../../components/components/amw-accordion/amw-accordion-panel.component';
import { MatMenuModule } from '@angular/material/menu';
import { Subject, takeUntil } from 'rxjs';

import { AmwTooltipDirective } from '../../../directives/amw-tooltip/amw-tooltip.directive';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';
import { AmwInputComponent } from '../../../controls/components/amw-input/amw-input.component';

import {
  DashboardConfig,
  DashboardDataSource,
  DashboardData,
  DashboardStat,
  DashboardAction
} from './interfaces';
import { DefaultDashboardDataSource } from './services';
import { AmwProgressSpinnerComponent } from '../../../components/components/amw-progress-spinner/amw-progress-spinner.component';

/**
 * Dashboard page component for Angular Material Wrap
 *
 * @description
 * Provides a comprehensive dashboard layout with stats pills, view mode toggles,
 * search/filter bar, and flexible content areas. Perfect for meal planning,
 * analytics, and data visualization dashboards.
 *
 * @example
 * ```typescript
 * // Component
 * config: DashboardConfig = {
 *   title: 'Meal Planning Dashboard',
 *   stats: [
 *     { id: 'total', label: 'Total Meals', value: 0, icon: 'restaurant' },
 *     { id: 'thisWeek', label: 'This Week', value: 0, icon: 'calendar_today' }
 *   ],
 *   viewModes: ['week', 'month', 'list'],
 *   defaultViewMode: 'week',
 *   showSearch: true,
 *   contentLayout: 'calendar'
 * };
 *
 * // Template
 * <amw-dashboard-page
 *   [config]="config"
 *   [dataSource]="dataSource"
 *   (viewModeChange)="onViewModeChange($event)"
 *   (statClick)="onStatClick($event)">
 * </amw-dashboard-page>
 * ```
 */
@Component({
  selector: 'amw-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmwCardComponent,
    AmwIconComponent,
    MatChipsModule,
    AmwProgressSpinnerComponent,
    AmwButtonComponent,
    AmwInputComponent,
    AmwButtonToggleGroupComponent,
    AmwButtonToggleComponent,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AmwAccordionPanelComponent,
    MatMenuModule,
    AmwTooltipDirective
  ],
  templateUrl: './amw-dashboard-page.component.html',
  styleUrl: './amw-dashboard-page.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [DefaultDashboardDataSource]
})
export class AmwDashboardPageComponent implements OnInit, OnDestroy {
  /**
   * Configuration for the dashboard
   */
  config = input.required<DashboardConfig>();

  /**
   * Data source for loading data
   */
  dataSource = input<DashboardDataSource | undefined>(undefined);

  /**
   * Initial view mode
   */
  initialViewMode = input<string | undefined>(undefined);

  /**
   * Whether to enable auto-refresh
   */
  autoRefresh = input<boolean>(false);

  /**
   * Auto-refresh interval in milliseconds
   */
  refreshInterval = input<number>(30000);

  /**
   * Emits when view mode changes
   */
  viewModeChange = output<string>();

  /**
   * Emits when a stat pill is clicked
   */
  statClick = output<DashboardStat>();

  /**
   * Emits when search query changes
   */
  searchChange = output<string>();

  /**
   * Emits when an item is clicked
   */
  itemClick = output<any>();

  /**
   * Emits when an action is clicked
   */
  actionClick = output<{ action: string }>();

  /**
   * Emits when data is loaded
   */
  dataLoad = output<DashboardData>();

  // Current state
  currentConfig!: DashboardConfig;
  currentViewMode = '';
  dashboardData: DashboardData | null = null;
  items: any[] = [];
  stats: DashboardStat[] = [];

  // UI state
  loading = false;
  error: string | null = null;
  searchQuery = '';
  dateRange?: { start: Date; end: Date };

  // Subject for component destruction
  private destroy$ = new Subject<void>();
  private refreshInterval$?: any;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeConfig();
    this.currentViewMode = this.initialViewMode() || this.currentConfig.defaultViewMode || this.currentConfig.viewModes[0];
    this.loadDashboardData();

    if (this.autoRefresh() || this.currentConfig.autoRefresh) {
      this.startAutoRefresh();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.refreshInterval$) {
      clearInterval(this.refreshInterval$);
    }
  }

  /**
   * Initialize configuration with defaults
   */
  private initializeConfig(): void {
    const configValue = this.config();
    this.currentConfig = {
      title: 'Dashboard',
      defaultViewMode: configValue.viewModes?.[0] || 'list',
      contentLayout: 'grid',
      showSearch: true,
      showFilters: false,
      showRefresh: true,
      showDateRange: false,
      statsPerRow: 4,
      gridColumns: 3,
      emptyMessage: 'No data available',
      autoRefresh: false,
      refreshInterval: 30000,
      density: 'comfortable',
      showTrends: true,
      ...configValue
    };

    // Initialize stats with config values
    this.stats = this.currentConfig.stats.map(stat => ({ ...stat }));
  }

  /**
   * Load dashboard data
   */
  loadDashboardData(): void {
    const source = this.dataSource() || new DefaultDashboardDataSource();

    this.loading = true;
    this.error = null;

    source
      .getDashboardData({
        viewMode: this.currentViewMode,
        searchQuery: this.searchQuery,
        dateRange: this.dateRange,
        pageIndex: 0,
        pageSize: 100
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.dashboardData = data;
          this.items = data.items;
          this.updateStats(data.stats);
          this.loading = false;
          this.dataLoad.emit(data);
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Failed to load dashboard data';
          this.loading = false;
          console.error('Dashboard data load error:', err);
          this.cdr.detectChanges();
        }
      });
  }

  /**
   * Update stat values from data
   */
  private updateStats(statValues?: { [key: string]: number | string }): void {
    if (!statValues) return;

    this.stats = this.stats.map(stat => {
      const value = statValues[stat.id];
      if (value !== undefined) {
        return {
          ...stat,
          value: stat.format ? stat.format(value) : value,
          loading: false
        };
      }
      return stat;
    });
  }

  /**
   * Change view mode
   */
  onViewModeChange(viewMode: string): void {
    this.currentViewMode = viewMode;
    this.viewModeChange.emit(viewMode);
    this.loadDashboardData();
  }

  /**
   * Handle search input change
   */
  onSearchChange(): void {
    this.searchChange.emit(this.searchQuery);
    this.loadDashboardData();
  }

  /**
   * Handle stat pill click
   */
  onStatClick(stat: DashboardStat): void {
    if (stat.onClick) {
      stat.onClick();
    }
    this.statClick.emit(stat);
  }

  /**
   * Handle item click
   */
  onItemClick(item: any): void {
    this.itemClick.emit(item);
  }

  /**
   * Handle action click
   */
  onActionClick(action: DashboardAction): void {
    this.actionClick.emit({ action: action.id });
  }

  /**
   * Refresh data
   */
  refresh(): void {
    this.loadDashboardData();
  }

  /**
   * Refresh stats only
   */
  refreshStatsOnly(): void {
    const source = this.dataSource();
    if (!source || !source.refreshStats) {
      this.refresh();
      return;
    }

    // Mark all stats as loading
    this.stats = this.stats.map(stat => ({ ...stat, loading: true }));
    this.cdr.detectChanges();

    source
      .refreshStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (statValues) => {
          this.updateStats(statValues);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Stats refresh error:', err);
          this.stats = this.stats.map(stat => ({ ...stat, loading: false }));
          this.cdr.detectChanges();
        }
      });
  }

  /**
   * Start auto-refresh
   */
  private startAutoRefresh(): void {
    const interval = this.currentConfig.refreshInterval || this.refreshInterval();
    this.refreshInterval$ = setInterval(() => {
      this.refreshStatsOnly();
    }, interval);
  }

  /**
   * Handle date range change
   */
  onDateRangeChange(dateRange: { start: Date; end: Date }): void {
    this.dateRange = dateRange;
    this.loadDashboardData();
  }

  /**
   * Get view mode label
   */
  getViewModeLabel(viewMode: string): string {
    if (this.currentConfig.viewModeLabels && this.currentConfig.viewModeLabels[viewMode]) {
      return this.currentConfig.viewModeLabels[viewMode];
    }
    return viewMode.charAt(0).toUpperCase() + viewMode.slice(1);
  }

  /**
   * Get view mode icon
   */
  getViewModeIcon(viewMode: string): string | undefined {
    if (this.currentConfig.viewModeIcons && this.currentConfig.viewModeIcons[viewMode]) {
      return this.currentConfig.viewModeIcons[viewMode];
    }
    return undefined;
  }

  /**
   * Get stat color class
   */
  getStatColorClass(stat: DashboardStat): string {
    if (stat.color) {
      return `amw-dashboard-page__stat--${stat.color}`;
    }
    return '';
  }

  /**
   * Get trend icon
   */
  getTrendIcon(direction: 'up' | 'down' | 'neutral'): string {
    switch (direction) {
      case 'up':
        return 'trending_up';
      case 'down':
        return 'trending_down';
      case 'neutral':
        return 'trending_flat';
      default:
        return 'trending_flat';
    }
  }

  /**
   * Get trend color class
   */
  getTrendColorClass(direction: 'up' | 'down' | 'neutral'): string {
    switch (direction) {
      case 'up':
        return 'amw-dashboard-page__trend--up';
      case 'down':
        return 'amw-dashboard-page__trend--down';
      case 'neutral':
        return 'amw-dashboard-page__trend--neutral';
      default:
        return '';
    }
  }
}
