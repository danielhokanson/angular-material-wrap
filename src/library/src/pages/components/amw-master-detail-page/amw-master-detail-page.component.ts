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
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { Subject, takeUntil } from 'rxjs';

import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';
import { AmwTooltipDirective } from '../../../directives/amw-tooltip/amw-tooltip.directive';
import { AmwInputComponent } from '../../../controls/components/amw-input/amw-input.component';

import {
  MasterDetailConfig,
  MasterDetailDataSource,
  MasterDetailData,
  MasterDetailColumn,
  MasterDetailAction
} from './interfaces';
import { DefaultMasterDetailDataSource } from './services';
import { AmwProgressSpinnerComponent } from '../../../components/components/amw-progress-spinner/amw-progress-spinner.component';

/**
 * Master-Detail page component for Angular Material Wrap
 *
 * @description
 * Provides a split-pane layout with a master list on the left and detail panel on the right.
 * Features include selection management, keyboard navigation, responsive layout,
 * and contextual actions.
 *
 * @example
 * ```typescript
 * // Component
 * config: MasterDetailConfig = {
 *   masterTitle: 'Curation Queue',
 *   masterColumns: [
 *     { key: 'title', label: 'Title' },
 *     { key: 'status', label: 'Status', type: 'badge' }
 *   ],
 *   detailTitle: (item) => `Recipe: ${item.title}`,
 *   actions: [
 *     { id: 'approve', label: 'Approve', icon: 'check_circle' }
 *   ]
 * };
 *
 * // Template
 * <amw-master-detail-page
 *   [config]="config"
 *   [dataSource]="dataSource"
 *   (itemSelect)="onSelect($event)"
 *   (actionClick)="onAction($event)">
 * </amw-master-detail-page>
 * ```
 */
@Component({
  selector: 'amw-master-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    AmwProgressSpinnerComponent,
    MatExpansionModule,
    MatBadgeModule,
    MatChipsModule,
    AmwButtonComponent,
    AmwInputComponent,
    AmwTooltipDirective
  ],
  templateUrl: './amw-master-detail-page.component.html',
  styleUrl: './amw-master-detail-page.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [DefaultMasterDetailDataSource],
  host: {
    '(document:mousemove)': 'onMouseMove($event)',
    '(document:mouseup)': 'onMouseUp()',
    '(window:resize)': 'onResize()'
  }
})
export class AmwMasterDetailPageComponent implements OnInit, OnDestroy {
  /**
   * Configuration for the master-detail view
   */
  config = input.required<MasterDetailConfig>();

  /**
   * Data source for loading data
   */
  dataSource = input<MasterDetailDataSource | undefined>(undefined);

  /**
   * ID of item to select initially
   */
  selectedItemId = input<string | undefined>(undefined);

  /**
   * Whether to enable real-time updates
   */
  realTimeUpdates = input<boolean>(false);

  /**
   * Whether to auto-refresh data
   */
  autoRefresh = input<boolean>(false);

  /**
   * Auto-refresh interval in milliseconds
   */
  refreshInterval = input<number>(30000);

  /**
   * Emits when an item is selected
   */
  itemSelect = output<{ item: any; selected: boolean }>();

  /**
   * Emits when an item is double-clicked
   */
  itemDoubleClick = output<any>();

  /**
   * Emits when an action is clicked
   */
  actionClick = output<{ action: string; item: any }>();

  /**
   * Emits when a bulk action is clicked
   */
  bulkActionClick = output<{ action: string; items: any[] }>();

  /**
   * Emits when master data is loaded
   */
  masterDataLoad = output<MasterDetailData>();

  /**
   * Emits when detail data is loaded
   */
  detailDataLoad = output<any>();

  // Current state
  currentConfig!: MasterDetailConfig;
  masterItems: any[] = [];
  selectedItem: any = null;
  selectedItems: Set<any> = new Set();
  detailData: any = null;

  // UI state
  loading = false;
  loadingDetail = false;
  error: string | null = null;
  searchQuery = '';
  isResizing = false;
  masterPanelWidth = 350;
  isStacked = false;

  // Subject for component destruction
  private destroy$ = new Subject<void>();
  private refreshInterval$?: any;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeConfig();
    this.checkResponsive();
    this.loadMasterData();

    const selectedId = this.selectedItemId();
    if (selectedId) {
      this.selectItemById(selectedId);
    }

    if (this.autoRefresh()) {
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
    this.currentConfig = {
      masterTitle: 'Items',
      masterEmptyMessage: 'No items found',
      masterSearchPlaceholder: 'Search...',
      detailEmptyMessage: 'Select an item to view details',
      showSearch: true,
      showRefresh: true,
      multiSelect: false,
      keyboardNavigation: true,
      masterWidth: 350,
      splitMode: 'vertical',
      responsiveBreakpoint: 768,
      density: 'comfortable',
      ...this.config()
    };

    this.masterPanelWidth = this.currentConfig.masterWidth!;
  }

  /**
   * Load master panel data
   */
  loadMasterData(): void {
    const source = this.dataSource() || new DefaultMasterDetailDataSource();

    this.loading = true;
    this.error = null;

    source
      .getMasterData({
        searchQuery: this.searchQuery,
        pageIndex: 0,
        pageSize: 100
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: MasterDetailData) => {
          this.masterItems = data.items;
          this.loading = false;
          this.masterDataLoad.emit(data);
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.error = 'Failed to load data';
          this.loading = false;
          console.error('Master data load error:', err);
          this.cdr.detectChanges();
        }
      });
  }

  /**
   * Load detail data for selected item
   */
  private loadDetailData(itemId: string): void {
    const source = this.dataSource() || new DefaultMasterDetailDataSource();

    this.loadingDetail = true;

    source
      .getDetailData(itemId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.detailData = data;
          this.loadingDetail = false;
          this.detailDataLoad.emit(data);
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.loadingDetail = false;
          console.error('Detail data load error:', err);
          this.cdr.detectChanges();
        }
      });
  }

  /**
   * Select an item
   */
  selectItem(item: any): void {
    if (this.currentConfig.multiSelect) {
      if (this.selectedItems.has(item)) {
        this.selectedItems.delete(item);
      } else {
        this.selectedItems.add(item);
      }
    } else {
      this.selectedItem = item;
      this.selectedItems.clear();
      this.selectedItems.add(item);
      this.loadDetailData(item.id);
    }

    this.itemSelect.emit({ item, selected: this.selectedItems.has(item) });
  }

  /**
   * Select item by ID
   */
  private selectItemById(itemId: string): void {
    const item = this.masterItems.find(i => i.id === itemId);
    if (item) {
      this.selectItem(item);
    }
  }

  /**
   * Check if an item is selected
   */
  isSelected(item: any): boolean {
    return this.selectedItems.has(item);
  }

  /**
   * Handle item double-click
   */
  onItemDoubleClick(item: any): void {
    this.itemDoubleClick.emit(item);
  }

  /**
   * Handle search input change
   */
  onSearchChange(): void {
    this.loadMasterData();
  }

  /**
   * Refresh data
   */
  refresh(): void {
    this.loadMasterData();
    if (this.selectedItem) {
      this.loadDetailData(this.selectedItem.id);
    }
  }

  /**
   * Start auto-refresh
   */
  private startAutoRefresh(): void {
    this.refreshInterval$ = setInterval(() => {
      this.refresh();
    }, this.refreshInterval());
  }

  /**
   * Handle action click
   */
  onActionClick(action: MasterDetailAction): void {
    if (action.confirmMessage) {
      if (!confirm(action.confirmMessage)) {
        return;
      }
    }

    this.actionClick.emit({
      action: action.id,
      item: this.selectedItem
    });
  }

  /**
   * Check if action is disabled
   */
  isActionDisabled(action: MasterDetailAction): boolean {
    if (action.requiresSelection !== false && !this.selectedItem) {
      return true;
    }

    if (action.disabled && this.selectedItem) {
      return action.disabled(this.selectedItem);
    }

    return false;
  }

  /**
   * Check if action is visible
   */
  isActionVisible(action: MasterDetailAction): boolean {
    if (!action.visible) {
      return true;
    }

    if (this.selectedItem) {
      return action.visible(this.selectedItem);
    }

    return false;
  }

  /**
   * Get visible actions
   */
  get visibleActions(): MasterDetailAction[] {
    if (!this.currentConfig.actions) {
      return [];
    }

    return this.currentConfig.actions.filter(action => this.isActionVisible(action));
  }

  /**
   * Get detail title
   */
  getDetailTitle(): string {
    if (!this.currentConfig.detailTitle) {
      return 'Details';
    }

    if (typeof this.currentConfig.detailTitle === 'function') {
      return this.currentConfig.detailTitle(this.selectedItem);
    }

    return this.currentConfig.detailTitle;
  }

  /**
   * Navigate to next item (keyboard)
   */
  navigateNext(event: KeyboardEvent): void {
    event.preventDefault();
    if (!this.currentConfig.keyboardNavigation) return;

    const currentIndex = this.masterItems.indexOf(this.selectedItem);
    if (currentIndex < this.masterItems.length - 1) {
      this.selectItem(this.masterItems[currentIndex + 1]);
    }
  }

  /**
   * Navigate to previous item (keyboard)
   */
  navigatePrevious(event: KeyboardEvent): void {
    event.preventDefault();
    if (!this.currentConfig.keyboardNavigation) return;

    const currentIndex = this.masterItems.indexOf(this.selectedItem);
    if (currentIndex > 0) {
      this.selectItem(this.masterItems[currentIndex - 1]);
    }
  }

  /**
   * Get column value
   */
  getColumnValue(item: any, column: MasterDetailColumn): string {
    const value = item[column.key];

    if (column.format) {
      return column.format(value);
    }

    if (column.type === 'date' && value) {
      return new Date(value).toLocaleDateString();
    }

    return value?.toString() || '';
  }

  /**
   * Start resize
   */
  startResize(event: MouseEvent): void {
    this.isResizing = true;
    event.preventDefault();
  }

  /**
   * Handle mouse move for resize
   */
  onMouseMove(event: MouseEvent): void {
    if (this.isResizing) {
      this.masterPanelWidth = event.clientX;
      this.cdr.detectChanges();
    }
  }

  /**
   * Handle mouse up for resize
   */
  onMouseUp(): void {
    this.isResizing = false;
  }

  /**
   * Handle window resize
   */
  onResize(): void {
    this.checkResponsive();
  }

  /**
   * Check if layout should be stacked (responsive)
   */
  private checkResponsive(): void {
    const breakpoint = this.currentConfig.responsiveBreakpoint!;
    this.isStacked = window.innerWidth < breakpoint;
    this.cdr.detectChanges();
  }

  /**
   * Check if value is an array
   */
  isArray(value: any): boolean {
    return Array.isArray(value);
  }
}
