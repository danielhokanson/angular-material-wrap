import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThemeMenuComponent } from '../theme-menu/theme-menu.component';

import { AmwButtonComponent } from '../../../../library/src/controls/components/amw-button/amw-button.component';
import { AmwIconComponent, AmwSidenavComponent, AmwToolbarComponent } from '../../../../library/src/components/components';
import { SidenavItem } from '../../../../library/src/components/components/amw-sidenav/interfaces/sidenav-item.interface';
import { SidenavConfig } from '../../../../library/src/components/components/amw-sidenav/interfaces/sidenav-config.interface';

@Component({
    selector: 'amw-demo-navigation',
    standalone: true,
    imports: [RouterModule,
    ThemeMenuComponent,
    AmwButtonComponent,
    AmwIconComponent,
    AmwSidenavComponent,
    AmwToolbarComponent],
    templateUrl: './demo-navigation.component.html',
    styleUrl: './demo-navigation.component.scss'
})
export class DemoNavigationComponent {
    sidenavConfig: SidenavConfig = {
        mode: 'side',
        opened: true,
        position: 'start',
        size: 'medium',
        responsive: true
    };

    navigationItems: SidenavItem[] = [
        {
            id: 'controls',
            label: 'Controls',
            icon: 'tune',
            route: '/controls',
            tooltip: '1:1 Angular Material control wrappers',
            expanded: false,
            children: [
                { id: 'button', label: 'Button', route: '/controls/button', icon: 'smart_button' },
                { id: 'input', label: 'Input', route: '/controls/input', icon: 'input' },
                { id: 'select', label: 'Select', route: '/controls/select', icon: 'arrow_drop_down' },
                { id: 'checkbox', label: 'Checkbox', route: '/controls/checkbox', icon: 'check_box' },
                { id: 'radio', label: 'Radio Button', route: '/controls/radio', icon: 'radio_button_checked' },
                { id: 'radio-group', label: 'Radio Group', route: '/controls/radio-group', icon: 'radio_button_checked' },
                { id: 'chips', label: 'Chips', route: '/controls/chips', icon: 'view_module' },
                { id: 'slider', label: 'Slider', route: '/controls/slider', icon: 'tune' },
                { id: 'toggle', label: 'Toggle', route: '/controls/toggle', icon: 'toggle_on' },
                { id: 'textarea', label: 'Textarea', route: '/controls/textarea', icon: 'text_fields' },
                { id: 'autocomplete', label: 'Autocomplete', route: '/controls/autocomplete', icon: 'search' },
                { id: 'datepicker', label: 'Datepicker', route: '/controls/datepicker', icon: 'event' },
                { id: 'range-slider', label: 'Range Slider', route: '/controls/range-slider', icon: 'linear_scale' },
                { id: 'switch', label: 'Switch', route: '/controls/switch', icon: 'switch_right' },
                { id: 'file-input', label: 'File Input', route: '/controls/file-input', icon: 'attach_file' },
                { id: 'timepicker', label: 'Time Picker', route: '/controls/timepicker', icon: 'access_time' },
                { id: 'color-picker', label: 'Color Picker', route: '/controls/color-picker', icon: 'palette' },
                { id: 'data-table-control', label: 'Data Table', route: '/controls/data-table', icon: 'table_view' }
            ]
        },
        {
            id: 'components',
            label: 'Components',
            icon: 'widgets',
            route: '/components',
            tooltip: 'Complex UI component combinations',
            expanded: false,
            children: [
                { id: 'card', label: 'Card', route: '/components/card', icon: 'view_module' },
                { id: 'dialog', label: 'Dialog', route: '/components/dialog', icon: 'open_in_new' },
                { id: 'sidenav', label: 'Sidenav', route: '/components/sidenav', icon: 'menu' },
                { id: 'popover', label: 'Popover', route: '/components/popover', icon: 'call_made' },
                { id: 'data-table', label: 'Data Table', route: '/components/data-table', icon: 'table_chart' },
                { id: 'calendar', label: 'Calendar', route: '/components/calendar', icon: 'calendar_month' },
                { id: 'stepper', label: 'Stepper', route: '/components/stepper', icon: 'view_list' },
                { id: 'tabs', label: 'Tabs', route: '/components/tabs', icon: 'tab' },
                { id: 'accordion', label: 'Accordion', route: '/components/accordion', icon: 'expand_more' }
            ]
        },
        {
            id: 'directives',
            label: 'Directives',
            icon: 'code',
            route: '/directives',
            tooltip: 'Reusable directive functionality',
            expanded: false,
            children: [
                { id: 'click-outside', label: 'Click Outside', route: '/directives/click-outside', icon: 'mouse' },
                { id: 'auto-focus', label: 'Auto Focus', route: '/directives/auto-focus', icon: 'center_focus_strong' },
                { id: 'copy-clipboard', label: 'Copy to Clipboard', route: '/directives/copy-to-clipboard', icon: 'content_copy' },
                { id: 'tooltip', label: 'Tooltip', route: '/directives/tooltip', icon: 'help_outline' }
            ]
        },
        {
            id: 'services',
            label: 'Services',
            icon: 'build',
            route: '/services',
            tooltip: 'Global services and utilities',
            expanded: false,
            children: [
                { id: 'messaging', label: 'Messaging Service', route: '/services/messaging', icon: 'message' },
                { id: 'loading', label: 'Loading Service', route: '/services/loading', icon: 'hourglass_empty' },
                { id: 'notification', label: 'Notification Service', route: '/services/notification', icon: 'notifications' },
                { id: 'http-cache', label: 'HTTP Cache', route: '/services/http-cache', icon: 'storage' }
            ]
        },
        {
            id: 'pipes',
            label: 'Pipes',
            icon: 'transform',
            route: '/pipes',
            tooltip: 'Data transformation pipes',
            expanded: false,
            children: [
                { id: 'currency', label: 'Currency Pipe', route: '/pipes/currency', icon: 'attach_money' },
                { id: 'date', label: 'Date Pipe', route: '/pipes/date', icon: 'event' },
                { id: 'text-transform', label: 'Text Transform', route: '/pipes/text-transform', icon: 'text_format' }
            ]
        },
        {
            id: 'pages',
            label: 'Pages',
            icon: 'pages',
            route: '/pages',
            tooltip: 'Complete page layouts',
            expanded: false,
            children: [
                { id: 'dashboard', label: 'Dashboard', route: '/pages/dashboard', icon: 'dashboard' },
                { id: 'profile', label: 'Profile', route: '/pages/profile', icon: 'person' },
                { id: 'settings', label: 'Settings', route: '/pages/settings', icon: 'settings' },
                { id: 'list', label: 'List/Table', route: '/pages/list', icon: 'list' },
                { id: 'detail', label: 'Detail/View', route: '/pages/detail', icon: 'visibility' },
                { id: 'form', label: 'Form/Create-Edit', route: '/pages/form', icon: 'edit' },
                { id: 'search', label: 'Search/Filter', route: '/pages/search', icon: 'search' },
                { id: 'workflow', label: 'Workflow/Process', route: '/pages/workflow', icon: 'account_tree' },
                { id: 'report', label: 'Report/Analytics', route: '/pages/report', icon: 'analytics' },
                { id: 'master-detail', label: 'Master-Detail', route: '/pages/master-detail', icon: 'view_agenda' },
                { id: 'dashboard-page', label: 'Dashboard Page', route: '/pages/dashboard-page', icon: 'grid_view' }
            ]
        },
        {
            id: 'theme',
            label: 'Theme Management',
            icon: 'palette',
            route: '/theme',
            tooltip: 'Switch and create custom themes',
            expanded: false,
            children: []
        }
    ];

    isSidenavOpen = true;

    toggleSidenav(): void {
        this.isSidenavOpen = !this.isSidenavOpen;
    }

    onItemClick(item: SidenavItem): void {
        // Handle navigation item click
        console.log('Navigated to:', item.route);
    }

    onSidenavToggle(opened: boolean): void {
        this.isSidenavOpen = opened;
    }
}
