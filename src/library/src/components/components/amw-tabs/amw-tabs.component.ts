import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Subject, takeUntil } from 'rxjs';
import { BaseComponent } from '../../../controls/components/base/base.component';
import { TabsConfig, TabItem } from './interfaces';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';

/**
 * Angular Material Wrap Tabs Component
 * 
 * A flexible tabs component that provides tabbed navigation
 * with comprehensive configuration options and accessibility support.
 * 
 * @example
 * ```html
 * <amw-tabs
 *   [config]="tabsConfig"
 *   [tabs]="tabItems"
 *   [activeTab]="0"
 *   (tabChange)="onTabChange($event)"
 *   (tabClose)="onTabClose($event)">
 * </amw-tabs>
 * ```
 */
@Component({
    selector: 'amw-tabs',
    standalone: true,
    imports: [
    CommonModule,
    MatTabsModule,
    AmwButtonComponent,
    MatIconModule,
    MatCardModule,
    MatDividerModule
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-tabs.component.html',
    styleUrl: './amw-tabs.component.scss'
})
export class AmwTabsComponent extends BaseComponent implements OnInit, OnDestroy {
    /** Tabs configuration */
    @Input() config?: TabsConfig;

    /** Array of tab items */
    @Input() tabs: TabItem[] = [];

    /** Active tab index */
    @Input() activeTab: number = 0;

    /** Whether the tabs are disabled */
    @Input() override disabled: boolean = false;

    /** Whether to show tab icons */
    @Input() showIcons: boolean = true;

    /** Whether to show tab badges */
    @Input() showBadges: boolean = true;

    /** Whether to show close buttons */
    @Input() showCloseButtons: boolean = false;

    /** Whether tabs are closable */
    @Input() closable: boolean = false;

    /** Whether tabs are draggable */
    @Input() draggable: boolean = false;

    /** Tab change event */
    @Output() tabChange = new EventEmitter<number>();

    /** Tab close event */
    @Output() tabClose = new EventEmitter<number>();

    /** Tab add event */
    @Output() tabAdd = new EventEmitter<void>();

    /** Tab reorder event */
    @Output() tabReorder = new EventEmitter<{ from: number; to: number }>();

    /** Current tabs configuration */
    currentConfig: TabsConfig = {};

    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    /** Whether tabs are being reordered */
    isReordering = false;

    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        this.initializeConfig();
        this.validateTabs();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Initializes the tabs configuration
     */
    private initializeConfig(): void {
        this.currentConfig = {
            orientation: 'horizontal',
            alignment: 'start',
            showIcons: true,
            showBadges: true,
            showCloseButtons: false,
            closable: false,
            draggable: false,
            animationDuration: 300,
            animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            ...this.config
        };
    }

    /**
     * Validates all tabs
     */
    private validateTabs(): void {
        this.tabs.forEach((tab, index) => {
            if (tab.validator) {
                const isValid = tab.validator(tab);
                tab.isValid = isValid;
            }
        });
    }

    /**
     * Changes the active tab
     */
    changeTab(tabIndex: number): void {
        if (this.isValidTabIndex(tabIndex) && this.canActivateTab(tabIndex)) {
            this.activeTab = tabIndex;
            this.tabChange.emit(tabIndex);
            this.cdr.detectChanges();
        }
    }

    /**
     * Closes a tab
     */
    closeTab(tabIndex: number): void {
        if (this.isValidTabIndex(tabIndex) && this.canCloseTab(tabIndex)) {
            this.tabs.splice(tabIndex, 1);

            // Adjust active tab if necessary
            if (this.activeTab >= this.tabs.length) {
                this.activeTab = Math.max(0, this.tabs.length - 1);
            }

            this.tabClose.emit(tabIndex);
            this.cdr.detectChanges();
        }
    }

    /**
     * Adds a new tab
     */
    addTab(): void {
        const newTab: TabItem = {
            label: `Tab ${this.tabs.length + 1}`,
            content: '',
            isDisabled: false,
            isClosable: true
        };

        this.tabs.push(newTab);
        this.activeTab = this.tabs.length - 1;
        this.tabAdd.emit();
        this.cdr.detectChanges();
    }

    /**
     * Reorders tabs
     */
    reorderTabs(fromIndex: number, toIndex: number): void {
        if (this.isValidTabIndex(fromIndex) && this.isValidTabIndex(toIndex)) {
            const tab = this.tabs.splice(fromIndex, 1)[0];
            this.tabs.splice(toIndex, 0, tab);

            // Update active tab index
            if (this.activeTab === fromIndex) {
                this.activeTab = toIndex;
            } else if (this.activeTab > fromIndex && this.activeTab <= toIndex) {
                this.activeTab--;
            } else if (this.activeTab < fromIndex && this.activeTab >= toIndex) {
                this.activeTab++;
            }

            this.tabReorder.emit({ from: fromIndex, to: toIndex });
            this.cdr.detectChanges();
        }
    }

    /**
     * Checks if tab index is valid
     */
    private isValidTabIndex(tabIndex: number): boolean {
        return tabIndex >= 0 && tabIndex < this.tabs.length;
    }

    /**
     * Checks if tab can be activated
     */
    private canActivateTab(tabIndex: number): boolean {
        const tab = this.tabs[tabIndex];
        return tab && !tab.isDisabled;
    }

    /**
     * Checks if tab can be closed
     */
    private canCloseTab(tabIndex: number): boolean {
        const tab = this.tabs[tabIndex];
        return tab && tab.isClosable !== false && this.tabs.length > 1;
    }

    /**
     * Gets the active tab
     */
    getActiveTab(): TabItem | undefined {
        return this.tabs[this.activeTab];
    }

    /**
     * Checks if tab is active
     */
    isTabActive(tabIndex: number): boolean {
        return tabIndex === this.activeTab;
    }

    /**
     * Checks if tab is disabled
     */
    isTabDisabled(tabIndex: number): boolean {
        return this.tabs[tabIndex]?.isDisabled || false;
    }

    /**
     * Checks if tab is closable
     */
    isTabClosable(tabIndex: number): boolean {
        return this.tabs[tabIndex]?.isClosable !== false;
    }

    /**
     * Gets tab badge count
     */
    getTabBadgeCount(tabIndex: number): number {
        return this.tabs[tabIndex]?.badgeCount || 0;
    }

    /**
     * Checks if tab has badge
     */
    hasTabBadge(tabIndex: number): boolean {
        return this.getTabBadgeCount(tabIndex) > 0;
    }

    /**
     * Handles drag start
     */
    onDragStart(event: DragEvent, tabIndex: number): void {
        if (this.currentConfig.draggable) {
            event.dataTransfer?.setData('text/plain', tabIndex.toString());
            this.isReordering = true;
        }
    }

    /**
     * Handles drag over
     */
    onDragOver(event: DragEvent): void {
        if (this.currentConfig.draggable) {
            event.preventDefault();
        }
    }

    /**
     * Handles drop
     */
    onDrop(event: DragEvent, targetIndex: number): void {
        if (this.currentConfig.draggable) {
            event.preventDefault();
            const sourceIndex = parseInt(event.dataTransfer?.getData('text/plain') || '0');
            this.reorderTabs(sourceIndex, targetIndex);
            this.isReordering = false;
        }
    }

    /**
     * Handles drag end
     */
    onDragEnd(): void {
        this.isReordering = false;
    }
}
