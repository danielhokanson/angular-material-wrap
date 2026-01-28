import { Component, input, output, signal, model, OnInit, OnDestroy, AfterContentInit, ViewEncapsulation, ChangeDetectorRef, contentChildren, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { AmwIconComponent } from '../amw-icon/amw-icon.component';
import { MatDividerModule } from '@angular/material/divider';
import { Subject } from 'rxjs';
import { BaseComponent } from '../../../controls/components/base/base.component';
import { TabsConfig, TabItem } from './interfaces';
import { AmwButtonComponent } from '../../../controls/components/amw-button/amw-button.component';
import { AmwTabComponent } from './amw-tab.component';

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
    AmwIconComponent,
    MatCardModule,
    MatDividerModule
],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './amw-tabs.component.html',
    styleUrl: './amw-tabs.component.scss'
})
export class AmwTabsComponent extends BaseComponent implements OnInit, OnDestroy, AfterContentInit {
    /** Query for projected AmwTabComponent children */
    tabChildren = contentChildren(AmwTabComponent);

    /** Tabs configuration */
    config = input<TabsConfig | undefined>(undefined);

    /** Array of tab items */
    tabs = model<TabItem[]>([]);

    /** Selected tab index (two-way binding support) */
    selectedIndex = model<number>(0);

    /** Whether component is using content projection */
    useContentProjection = signal<boolean>(false);

    /** Active tab index */
    activeTab = signal<number>(0);

    /** Whether the tabs are disabled */
    override disabled = input<boolean>(false);

    /** Whether to show tab icons */
    showIcons = input<boolean>(true);

    /** Whether to show tab badges */
    showBadges = input<boolean>(true);

    /** Whether to show close buttons */
    showCloseButtons = input<boolean>(false);

    /** Whether tabs are closable */
    closable = input<boolean>(false);

    /** Whether tabs are draggable */
    draggable = input<boolean>(false);

    /** Tab change event */
    tabChange = output<number>();

    /** Tab close event */
    tabClose = output<number>();

    /** Tab add event */
    tabAdd = output<void>();

    /** Tab reorder event */
    tabReorder = output<{ from: number; to: number }>();

    /** Current tabs configuration */
    currentConfig = signal<TabsConfig>({});

    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    /** Whether tabs are being reordered */
    isReordering = signal<boolean>(false);

    constructor(private cdr: ChangeDetectorRef) {
        super();
        // Watch for changes in tab children using effect
        effect(() => {
            const children = this.tabChildren();
            if (children.length > 0) {
                this.useContentProjection.set(true);
                this.syncTabsFromChildren();
            }
        });
    }

    ngOnInit(): void {
        this.initializeConfig();
        this.validateTabs();
    }

    ngAfterContentInit(): void {
        // Content projection detection is now handled by the effect in constructor
    }

    /**
     * Synchronizes the tabs array from projected AmwTabComponent children
     */
    private syncTabsFromChildren(): void {
        const children = this.tabChildren();
        if (children.length > 0) {
            this.tabs.set(children.map(child => ({
                label: child.label(),
                icon: child.icon(),
                isDisabled: child.disabled(),
                isClosable: child.closable(),
                badgeCount: child.badgeCount(),
                badgeColor: child.badgeColor(),
                content: '', // Content is handled via template projection
                contentTemplate: child.contentTemplate(),
                headerTemplate: child.headerTemplate()
            })));
            this.cdr.detectChanges();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Initializes the tabs configuration
     */
    private initializeConfig(): void {
        this.currentConfig.set({
            orientation: 'horizontal',
            alignment: 'start',
            showIcons: true,
            showBadges: true,
            showCloseButtons: false,
            showPanelHeaders: false,
            closable: false,
            draggable: false,
            animationDuration: 300,
            animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            ...this.config()
        });
    }

    /**
     * Validates all tabs
     */
    private validateTabs(): void {
        this.tabs().forEach((tab: TabItem, index: number) => {
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
            this.activeTab.set(tabIndex);
            this.selectedIndex.set(tabIndex);
            this.tabChange.emit(tabIndex);
            this.cdr.detectChanges();
        }
    }

    /**
     * Closes a tab
     */
    closeTab(tabIndex: number): void {
        if (this.isValidTabIndex(tabIndex) && this.canCloseTab(tabIndex)) {
            const currentTabs = [...this.tabs()];
            currentTabs.splice(tabIndex, 1);
            this.tabs.set(currentTabs);

            // Adjust active tab if necessary
            if (this.activeTab() >= this.tabs().length) {
                this.activeTab.set(Math.max(0, this.tabs().length - 1));
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
            label: `Tab ${this.tabs().length + 1}`,
            content: '',
            isDisabled: false,
            isClosable: true
        };

        this.tabs.update(tabs => [...tabs, newTab]);
        this.activeTab.set(this.tabs().length - 1);
        this.tabAdd.emit();
        this.cdr.detectChanges();
    }

    /**
     * Reorders tabs
     */
    reorderTabs(fromIndex: number, toIndex: number): void {
        if (this.isValidTabIndex(fromIndex) && this.isValidTabIndex(toIndex)) {
            const currentTabs = [...this.tabs()];
            const tab = currentTabs.splice(fromIndex, 1)[0];
            currentTabs.splice(toIndex, 0, tab);
            this.tabs.set(currentTabs);

            // Update active tab index
            if (this.activeTab() === fromIndex) {
                this.activeTab.set(toIndex);
            } else if (this.activeTab() > fromIndex && this.activeTab() <= toIndex) {
                this.activeTab.update(val => val - 1);
            } else if (this.activeTab() < fromIndex && this.activeTab() >= toIndex) {
                this.activeTab.update(val => val + 1);
            }

            this.tabReorder.emit({ from: fromIndex, to: toIndex });
            this.cdr.detectChanges();
        }
    }

    /**
     * Checks if tab index is valid
     */
    private isValidTabIndex(tabIndex: number): boolean {
        return tabIndex >= 0 && tabIndex < this.tabs().length;
    }

    /**
     * Checks if tab can be activated
     */
    private canActivateTab(tabIndex: number): boolean {
        const tab = this.tabs()[tabIndex];
        return tab && !tab.isDisabled;
    }

    /**
     * Checks if tab can be closed
     */
    private canCloseTab(tabIndex: number): boolean {
        const tab = this.tabs()[tabIndex];
        return tab && tab.isClosable !== false && this.tabs().length > 1;
    }

    /**
     * Gets the active tab
     */
    getActiveTab(): TabItem | undefined {
        return this.tabs()[this.activeTab()];
    }

    /**
     * Checks if tab is active
     */
    isTabActive(tabIndex: number): boolean {
        return tabIndex === this.activeTab();
    }

    /**
     * Checks if tab is disabled
     */
    isTabDisabled(tabIndex: number): boolean {
        return this.tabs()[tabIndex]?.isDisabled || false;
    }

    /**
     * Checks if tab is closable
     */
    isTabClosable(tabIndex: number): boolean {
        return this.tabs()[tabIndex]?.isClosable !== false;
    }

    /**
     * Gets tab badge count
     */
    getTabBadgeCount(tabIndex: number): number {
        return this.tabs()[tabIndex]?.badgeCount || 0;
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
        if (this.currentConfig().draggable) {
            event.dataTransfer?.setData('text/plain', tabIndex.toString());
            this.isReordering.set(true);
        }
    }

    /**
     * Handles drag over
     */
    onDragOver(event: DragEvent): void {
        if (this.currentConfig().draggable) {
            event.preventDefault();
        }
    }

    /**
     * Handles drop
     */
    onDrop(event: DragEvent, targetIndex: number): void {
        if (this.currentConfig().draggable) {
            event.preventDefault();
            const sourceIndex = parseInt(event.dataTransfer?.getData('text/plain') || '0');
            this.reorderTabs(sourceIndex, targetIndex);
            this.isReordering.set(false);
        }
    }

    /**
     * Handles drag end
     */
    onDragEnd(): void {
        this.isReordering.set(false);
    }
}
