import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { AmwSidenavComponent } from '../../../../library/src/components/components/amw-sidenav/amw-sidenav.component';
import { SidenavConfig } from '../../../../library/src/components/components/amw-sidenav/interfaces/sidenav-config.interface';
import { SidenavItem } from '../../../../library/src/components/components/amw-sidenav/interfaces/sidenav-item.interface';
import { SidenavService } from '../../../../library/src/components/services/sidenav.service';

/**
 * API documentation component for sidenav
 * 
 * Shows comprehensive API documentation for the sidenav component and service
 */
@Component({
    selector: 'app-sidenav-api',
    standalone: true,
    imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSnackBarModule,
    AmwSidenavComponent
],
    templateUrl: './sidenav-api.component.html',
    styleUrl: './sidenav-api.component.scss'
})
export class SidenavApiComponent implements OnInit, OnDestroy {
    /** Subject for component destruction */
    private destroy$ = new Subject<void>();

    /** Current sidenav configuration */
    currentConfig: SidenavConfig = { opened: false };

    /** Navigation items */
    navigationItems: SidenavItem[] = [];

    /** Cached API documentation arrays */
    readonly componentInputs: any[];
    readonly componentOutputs: any[];
    readonly componentMethods: any[];
    readonly serviceMethods: any[];
    readonly serviceObservables: any[];
    readonly serviceProperties: any[];
    readonly sidenavConfigProperties: any[];
    readonly sidenavItemProperties: any[];
    readonly sidenavEventProperties: any[];

    constructor(
        private sidenavService: SidenavService,
        private snackBar: MatSnackBar
    ) {
        // Initialize cached arrays in constructor
        this.componentInputs = this.initComponentInputs();
        this.componentOutputs = this.initComponentOutputs();
        this.componentMethods = this.initComponentMethods();
        this.serviceMethods = this.initServiceMethods();
        this.serviceObservables = this.initServiceObservables();
        this.serviceProperties = this.initServiceProperties();
        this.sidenavConfigProperties = this.initSidenavConfigProperties();
        this.sidenavItemProperties = this.initSidenavItemProperties();
        this.sidenavEventProperties = this.initSidenavEventProperties();
    }

    ngOnInit(): void {
        this.loadSampleData();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Loads sample data
     */
    private loadSampleData(): void {
        this.navigationItems = [
            {
                id: 'dashboard',
                label: 'Dashboard',
                icon: 'dashboard',
                route: '/dashboard',
                tooltip: 'View dashboard overview'
            },
            {
                id: 'users',
                label: 'Users',
                icon: 'people',
                route: '/users',
                tooltip: 'Manage users',
                children: [
                    {
                        id: 'users-list',
                        label: 'All Users',
                        icon: 'list',
                        route: '/users/list',
                        tooltip: 'View all users'
                    },
                    {
                        id: 'users-add',
                        label: 'Add User',
                        icon: 'person_add',
                        route: '/users/add',
                        tooltip: 'Add new user'
                    }
                ]
            },
            {
                id: 'settings',
                label: 'Settings',
                icon: 'settings',
                route: '/settings',
                tooltip: 'Application settings'
            }
        ];

        this.sidenavService.setItems(this.navigationItems);
    }

    /**
     * Handles sidenav opened state change
     * @param opened Whether the sidenav is opened
     */
    onSidenavOpenedChange(opened: boolean): void {
        this.currentConfig.opened = opened;
    }

    /**
     * Handles navigation item click
     * @param item The clicked item
     */
    onItemClick(item: SidenavItem): void {
        this.snackBar.open(`Clicked: ${item.label}`, 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }

    /**
     * Gets the component inputs
     */
    initComponentInputs(): any[] {
        return [
            {
                name: 'config',
                type: 'SidenavConfig',
                description: 'Configuration object for the sidenav',
                default: '{}',
                required: false
            },
            {
                name: 'items',
                type: 'SidenavItem[]',
                description: 'Navigation items to display in the sidenav',
                default: '[]',
                required: false
            },
            {
                name: 'opened',
                type: 'boolean',
                description: 'Whether the sidenav is opened',
                default: 'false',
                required: false
            },
            {
                name: 'headerTemplate',
                type: 'TemplateRef<any>',
                description: 'Custom header template',
                default: 'undefined',
                required: false
            },
            {
                name: 'footerTemplate',
                type: 'TemplateRef<any>',
                description: 'Custom footer template',
                default: 'undefined',
                required: false
            },
            {
                name: 'itemTemplate',
                type: 'TemplateRef<any>',
                description: 'Custom item template',
                default: 'undefined',
                required: false
            },
            {
                name: 'showToggle',
                type: 'boolean',
                description: 'Whether to show the toggle button',
                default: 'true',
                required: false
            },
            {
                name: 'showClose',
                type: 'boolean',
                description: 'Whether to show the close button',
                default: 'true',
                required: false
            }
        ];
    }

    /**
     * Gets the component outputs
     */
    initComponentOutputs(): any[] {
        return [
            {
                name: 'openedChange',
                type: 'EventEmitter<boolean>',
                description: 'Event emitted when sidenav opened state changes',
                parameters: 'opened: boolean'
            },
            {
                name: 'itemClick',
                type: 'EventEmitter<SidenavItem>',
                description: 'Event emitted when a navigation item is clicked',
                parameters: 'item: SidenavItem'
            },
            {
                name: 'toggle',
                type: 'EventEmitter<boolean>',
                description: 'Event emitted when sidenav is toggled',
                parameters: 'opened: boolean'
            },
            {
                name: 'close',
                type: 'EventEmitter<void>',
                description: 'Event emitted when sidenav is closed',
                parameters: 'none'
            }
        ];
    }

    /**
     * Gets the component methods
     */
    initComponentMethods(): any[] {
        return [
            {
                name: 'toggleSidenav',
                description: 'Toggles the sidenav open/closed state',
                parameters: 'none',
                returns: 'void'
            },
            {
                name: 'openSidenav',
                description: 'Opens the sidenav',
                parameters: 'none',
                returns: 'void'
            },
            {
                name: 'closeSidenav',
                description: 'Closes the sidenav',
                parameters: 'none',
                returns: 'void'
            },
            {
                name: 'onItemClick',
                description: 'Handles navigation item click',
                parameters: 'item: SidenavItem, event?: Event',
                returns: 'void'
            },
            {
                name: 'onNestedItemToggle',
                description: 'Handles nested item toggle',
                parameters: 'item: SidenavItem, event: Event',
                returns: 'void'
            },
            {
                name: 'getItemClasses',
                description: 'Gets the CSS classes for a navigation item',
                parameters: 'item: SidenavItem',
                returns: 'string'
            },
            {
                name: 'getSidenavClasses',
                description: 'Gets the CSS classes for the sidenav container',
                parameters: 'none',
                returns: 'string'
            },
            {
                name: 'trackByItem',
                description: 'Tracks navigation items for ngFor',
                parameters: 'index: number, item: SidenavItem',
                returns: 'string'
            }
        ];
    }

    /**
     * Gets the service methods
     */
    initServiceMethods(): any[] {
        return [
            {
                name: 'open',
                description: 'Opens the sidenav',
                parameters: 'config?: Partial<SidenavConfig>',
                returns: 'void'
            },
            {
                name: 'close',
                description: 'Closes the sidenav',
                parameters: 'none',
                returns: 'void'
            },
            {
                name: 'toggle',
                description: 'Toggles the sidenav open/closed state',
                parameters: 'config?: Partial<SidenavConfig>',
                returns: 'void'
            },
            {
                name: 'setConfig',
                description: 'Sets the sidenav configuration',
                parameters: 'config: SidenavConfig',
                returns: 'void'
            },
            {
                name: 'updateConfig',
                description: 'Updates the sidenav configuration',
                parameters: 'config: Partial<SidenavConfig>',
                returns: 'void'
            },
            {
                name: 'setItems',
                description: 'Sets the navigation items',
                parameters: 'items: SidenavItem[]',
                returns: 'void'
            },
            {
                name: 'addItem',
                description: 'Adds a navigation item',
                parameters: 'item: SidenavItem, parentId?: string',
                returns: 'void'
            },
            {
                name: 'removeItem',
                description: 'Removes a navigation item',
                parameters: 'itemId: string',
                returns: 'void'
            },
            {
                name: 'updateItem',
                description: 'Updates a navigation item',
                parameters: 'itemId: string, updates: Partial<SidenavItem>',
                returns: 'void'
            },
            {
                name: 'setActiveItem',
                description: 'Sets the active navigation item',
                parameters: 'itemId: string',
                returns: 'void'
            },
            {
                name: 'clearActiveItem',
                description: 'Clears the active navigation item',
                parameters: 'none',
                returns: 'void'
            },
            {
                name: 'expandItem',
                description: 'Expands a nested navigation item',
                parameters: 'itemId: string',
                returns: 'void'
            },
            {
                name: 'collapseItem',
                description: 'Collapses a nested navigation item',
                parameters: 'itemId: string',
                returns: 'void'
            },
            {
                name: 'toggleItem',
                description: 'Toggles a nested navigation item',
                parameters: 'itemId: string',
                returns: 'void'
            },
            {
                name: 'findItemById',
                description: 'Finds a navigation item by ID',
                parameters: 'itemId: string',
                returns: 'SidenavItem | null'
            },
            {
                name: 'getAllItems',
                description: 'Gets all navigation items',
                parameters: 'none',
                returns: 'SidenavItem[]'
            },
            {
                name: 'getItemsByLevel',
                description: 'Gets navigation items by level',
                parameters: 'level: number',
                returns: 'SidenavItem[]'
            },
            {
                name: 'getActiveItems',
                description: 'Gets active navigation items',
                parameters: 'none',
                returns: 'SidenavItem[]'
            },
            {
                name: 'getItemsByParentId',
                description: 'Gets navigation items by parent ID',
                parameters: 'parentId: string',
                returns: 'SidenavItem[]'
            },
            {
                name: 'getItemsByLabel',
                description: 'Gets navigation items by label',
                parameters: 'label: string',
                returns: 'SidenavItem[]'
            },
            {
                name: 'getItemsByIcon',
                description: 'Gets navigation items by icon',
                parameters: 'icon: string',
                returns: 'SidenavItem[]'
            },
            {
                name: 'getItemsByRoute',
                description: 'Gets navigation items by route',
                parameters: 'route: string',
                returns: 'SidenavItem[]'
            },
            {
                name: 'getItemsByDisabledState',
                description: 'Gets navigation items by disabled state',
                parameters: 'disabled: boolean',
                returns: 'SidenavItem[]'
            },
            {
                name: 'reset',
                description: 'Resets the sidenav to default state',
                parameters: 'none',
                returns: 'void'
            }
        ];
    }

    /**
     * Gets the service observables
     */
    initServiceObservables(): any[] {
        return [
            {
                name: 'opened$',
                type: 'Observable<boolean>',
                description: 'Observable for sidenav opened state'
            },
            {
                name: 'config$',
                type: 'Observable<SidenavConfig>',
                description: 'Observable for sidenav configuration'
            },
            {
                name: 'items$',
                type: 'Observable<SidenavItem[]>',
                description: 'Observable for navigation items'
            },
            {
                name: 'activeItem$',
                type: 'Observable<SidenavItem | null>',
                description: 'Observable for active item'
            },
            {
                name: 'events$',
                type: 'Observable<SidenavEvent>',
                description: 'Observable for sidenav events'
            }
        ];
    }

    /**
     * Gets the service properties
     */
    initServiceProperties(): any[] {
        return [
            {
                name: 'opened',
                type: 'boolean',
                description: 'Current sidenav opened state'
            },
            {
                name: 'config',
                type: 'SidenavConfig',
                description: 'Current sidenav configuration'
            },
            {
                name: 'items',
                type: 'SidenavItem[]',
                description: 'Current navigation items'
            },
            {
                name: 'activeItem',
                type: 'SidenavItem | null',
                description: 'Current active item'
            }
        ];
    }

    /**
     * Gets the SidenavConfig interface properties
     */
    initSidenavConfigProperties(): any[] {
        return [
            {
                name: 'opened',
                type: 'boolean',
                description: 'Whether the sidenav is opened',
                default: 'undefined',
                required: false
            },
            {
                name: 'mode',
                type: "'over' | 'push' | 'side'",
                description: 'The mode of the sidenav',
                default: 'undefined',
                required: false
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'Whether the sidenav is disabled',
                default: 'undefined',
                required: false
            },
            {
                name: 'disableClose',
                type: 'boolean',
                description: 'Whether the sidenav can be closed when clicking outside',
                default: 'undefined',
                required: false
            },
            {
                name: 'fixedInViewport',
                type: 'boolean',
                description: 'Whether the sidenav is fixed in viewport',
                default: 'undefined',
                required: false
            },
            {
                name: 'size',
                type: 'AmwSize',
                description: 'The size of the sidenav',
                default: 'undefined',
                required: false
            },
            {
                name: 'width',
                type: 'string | number',
                description: 'The width of the sidenav',
                default: 'undefined',
                required: false
            },
            {
                name: 'minWidth',
                type: 'string | number',
                description: 'The minimum width of the sidenav',
                default: 'undefined',
                required: false
            },
            {
                name: 'maxWidth',
                type: 'string | number',
                description: 'The maximum width of the sidenav',
                default: 'undefined',
                required: false
            },
            {
                name: 'showBackdrop',
                type: 'boolean',
                description: 'Whether to show the backdrop',
                default: 'undefined',
                required: false
            },
            {
                name: 'backdropClass',
                type: 'string',
                description: 'The backdrop class',
                default: 'undefined',
                required: false
            },
            {
                name: 'panelClass',
                type: 'string',
                description: 'The panel class',
                default: 'undefined',
                required: false
            },
            {
                name: 'autoFocus',
                type: 'boolean',
                description: 'Whether the sidenav is auto focus',
                default: 'undefined',
                required: false
            },
            {
                name: 'restoreFocus',
                type: 'boolean',
                description: 'Whether to restore focus to the previously focused element',
                default: 'undefined',
                required: false
            },
            {
                name: 'position',
                type: "'start' | 'end'",
                description: 'The position of the sidenav',
                default: 'undefined',
                required: false
            },
            {
                name: 'responsive',
                type: 'boolean',
                description: 'Whether the sidenav is responsive',
                default: 'undefined',
                required: false
            },
            {
                name: 'responsiveBreakpoint',
                type: 'string',
                description: 'The breakpoint for responsive behavior',
                default: 'undefined',
                required: false
            },
            {
                name: 'showToggle',
                type: 'boolean',
                description: 'Whether to show the toggle button',
                default: 'undefined',
                required: false
            },
            {
                name: 'toggleText',
                type: 'string',
                description: 'The toggle button text',
                default: 'undefined',
                required: false
            },
            {
                name: 'toggleIcon',
                type: 'string',
                description: 'The toggle button icon',
                default: 'undefined',
                required: false
            },
            {
                name: 'showClose',
                type: 'boolean',
                description: 'Whether to show the close button',
                default: 'undefined',
                required: false
            },
            {
                name: 'closeText',
                type: 'string',
                description: 'The close button text',
                default: 'undefined',
                required: false
            },
            {
                name: 'closeIcon',
                type: 'string',
                description: 'The close button icon',
                default: 'undefined',
                required: false
            }
        ];
    }

    /**
     * Gets the SidenavItem interface properties
     */
    initSidenavItemProperties(): any[] {
        return [
            {
                name: 'id',
                type: 'string',
                description: 'Unique identifier for the item',
                required: true
            },
            {
                name: 'label',
                type: 'string',
                description: 'Display text for the item',
                required: true
            },
            {
                name: 'icon',
                type: 'string',
                description: 'Icon name for the item',
                required: false
            },
            {
                name: 'route',
                type: 'string',
                description: 'Route path for the item',
                required: false
            },
            {
                name: 'href',
                type: 'string',
                description: 'External URL for the item',
                required: false
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'Whether the item is disabled',
                required: false
            },
            {
                name: 'active',
                type: 'boolean',
                description: 'Whether the item is active',
                required: false
            },
            {
                name: 'classes',
                type: 'string',
                description: 'CSS classes for the item',
                required: false
            },
            {
                name: 'tooltip',
                type: 'string',
                description: 'Tooltip text for the item',
                required: false
            },
            {
                name: 'badge',
                type: 'string',
                description: 'Badge text for the item',
                required: false
            },
            {
                name: 'badgeColor',
                type: 'string',
                description: 'Badge color for the item',
                required: false
            },
            {
                name: 'children',
                type: 'SidenavItem[]',
                description: 'Child items for nested navigation',
                required: false
            },
            {
                name: 'expanded',
                type: 'boolean',
                description: 'Whether the item is expanded (for nested items)',
                required: false
            },
            {
                name: 'data',
                type: 'any',
                description: 'Custom data for the item',
                required: false
            }
        ];
    }

    /**
     * Gets the SidenavEvent interface properties
     */
    initSidenavEventProperties(): any[] {
        return [
            {
                name: 'type',
                type: 'string',
                description: 'The event type',
                required: true
            },
            {
                name: 'data',
                type: 'any',
                description: 'Optional event data',
                required: false
            },
            {
                name: 'timestamp',
                type: 'Date',
                description: 'Event timestamp',
                required: true
            }
        ];
    }

    /**
     * Copies code to clipboard
     * @param code The code to copy
     */
    copyCode(code: string): void {
        navigator.clipboard.writeText(code).then(() => {
            this.snackBar.open('Code copied to clipboard!', 'Close', {
                duration: 2000,
                horizontalPosition: 'end',
                verticalPosition: 'top'
            });
        });
    }
}
