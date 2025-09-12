import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

import { ThemeMenuComponent } from '../theme-menu/theme-menu.component';

@Component({
    selector: 'amw-demo-navigation',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        ThemeMenuComponent
    ],
    templateUrl: './demo-navigation.component.html',
    styleUrl: './demo-navigation.component.scss'
})
export class DemoNavigationComponent {
    navigationItems = [
        {
            title: 'Controls',
            icon: 'tune',
            route: '/controls',
            description: '1:1 Angular Material control wrappers',
            expanded: false,
            children: [
                { title: 'Button', route: '/controls/button', icon: 'smart_button' },
                { title: 'Input', route: '/controls/input', icon: 'input' },
                { title: 'Select', route: '/controls/select', icon: 'arrow_drop_down' },
                { title: 'Checkbox', route: '/controls/checkbox', icon: 'check_box' },
                { title: 'Radio Button', route: '/controls/radio', icon: 'radio_button_checked' },
                { title: 'Radio Group', route: '/controls/radio-group', icon: 'radio_button_checked' },
                { title: 'Chips', route: '/controls/chips', icon: 'view_module' },
                { title: 'Slider', route: '/controls/slider', icon: 'tune' },
                { title: 'Toggle', route: '/controls/toggle', icon: 'toggle_on' },
                { title: 'Textarea', route: '/controls/textarea', icon: 'text_fields' },
                { title: 'Autocomplete', route: '/controls/autocomplete', icon: 'search' },
                { title: 'Datepicker', route: '/controls/datepicker', icon: 'event' },
                { title: 'Range Slider', route: '/controls/range-slider', icon: 'linear_scale' },
                { title: 'Switch', route: '/controls/switch', icon: 'switch_right' },
                { title: 'File Input', route: '/controls/file-input', icon: 'attach_file' },
                { title: 'Time Picker', route: '/controls/timepicker', icon: 'access_time' },
                { title: 'Color Picker', route: '/controls/color-picker', icon: 'palette' }
            ]
        },
        {
            title: 'Components',
            icon: 'widgets',
            route: '/components',
            description: 'Complex UI component combinations',
            expanded: false,
            children: [
                { title: 'Card', route: '/components/card', icon: 'view_module' },
                { title: 'Dialog', route: '/components/dialog', icon: 'open_in_new' },
                { title: 'Sidenav', route: '/components/sidenav', icon: 'menu' },
                { title: 'Popover', route: '/components/popover', icon: 'call_made' },
                { title: 'Validation Popover', route: '/components/validation-popover', icon: 'error_outline' },
                { title: 'Loading Indicator', route: '/components/loading-indicator', icon: 'hourglass_empty' },
                { title: 'Context Menu', route: '/components/context-menu', icon: 'more_vert' },
                { title: 'Confirmation Dialog', route: '/components/confirmation-dialog', icon: 'help_outline' },
                { title: 'Data Table', route: '/components/data-table', icon: 'table_chart' },
                { title: 'Calendar', route: '/components/calendar', icon: 'calendar_month' },
                { title: 'Stepper', route: '/components/stepper', icon: 'view_list' },
                { title: 'Tabs', route: '/components/tabs', icon: 'tab' },
                { title: 'Accordion', route: '/components/accordion', icon: 'expand_more' },
                { title: 'Toolbar', route: '/components/toolbar', icon: 'construction' },
                { title: 'Breadcrumb', route: '/components/breadcrumb', icon: 'chevron_right' },
                { title: 'Pagination', route: '/components/pagination', icon: 'last_page' }
            ]
        },
        {
            title: 'Directives',
            icon: 'code',
            route: '/directives',
            description: 'Reusable directive functionality',
            expanded: false,
            children: [
                { title: 'Click Outside', route: '/directives/click-outside', icon: 'mouse' },
                { title: 'Auto Focus', route: '/directives/auto-focus', icon: 'center_focus_strong' },
                { title: 'Lazy Load', route: '/directives/lazy-load', icon: 'cloud_download' },
                { title: 'Infinite Scroll', route: '/directives/infinite-scroll', icon: 'vertical_align_bottom' },
                { title: 'Tooltip', route: '/directives/tooltip', icon: 'info' },
                { title: 'Copy to Clipboard', route: '/directives/copy-to-clipboard', icon: 'content_copy' },
                { title: 'Debounce', route: '/directives/debounce', icon: 'schedule' },
                { title: 'Throttle', route: '/directives/throttle', icon: 'speed' },
                { title: 'Resize', route: '/directives/resize', icon: 'open_with' },
                { title: 'Intersection Observer', route: '/directives/intersection-observer', icon: 'visibility' }
            ]
        },
        {
            title: 'Services',
            icon: 'build',
            route: '/services',
            description: 'Global services and utilities',
            expanded: false,
            children: [
                { title: 'Messaging Service', route: '/services/messaging', icon: 'message' },
                { title: 'Loading Service', route: '/services/loading', icon: 'hourglass_empty' },
                { title: 'Notification Service', route: '/services/notification', icon: 'notifications' },
                { title: 'Storage Service', route: '/services/storage', icon: 'storage' },
                { title: 'Theme Service', route: '/services/theme', icon: 'palette' },
                { title: 'Validation Service', route: '/services/validation', icon: 'verified' },
                { title: 'Http Interceptor', route: '/services/http-interceptor', icon: 'http' },
                { title: 'Error Handler', route: '/services/error-handler', icon: 'error' },
                { title: 'Analytics Service', route: '/services/analytics', icon: 'analytics' },
                { title: 'Logging Service', route: '/services/logging', icon: 'description' }
            ]
        },
        {
            title: 'Pipes',
            icon: 'transform',
            route: '/pipes',
            description: 'Data transformation pipes',
            expanded: false,
            children: [
                { title: 'Currency Pipe', route: '/pipes/currency', icon: 'attach_money' },
                { title: 'Date Pipe', route: '/pipes/date', icon: 'event' },
                { title: 'Number Pipe', route: '/pipes/number', icon: 'numbers' },
                { title: 'Percent Pipe', route: '/pipes/percent', icon: 'percent' },
                { title: 'Text Transform', route: '/pipes/text-transform', icon: 'text_format' },
                { title: 'Truncate', route: '/pipes/truncate', icon: 'more_horiz' },
                { title: 'Pluralize', route: '/pipes/pluralize', icon: 'format_list_numbered' },
                { title: 'Safe HTML', route: '/pipes/safe-html', icon: 'code' },
                { title: 'File Size', route: '/pipes/file-size', icon: 'folder' },
                { title: 'Time Ago', route: '/pipes/time-ago', icon: 'schedule' }
            ]
        },
        {
            title: 'Pages',
            icon: 'pages',
            route: '/pages',
            description: 'Complete page layouts',
            expanded: false,
            children: [
                { title: 'Dashboard', route: '/pages/dashboard', icon: 'dashboard' },
                { title: 'Profile', route: '/pages/profile', icon: 'person' },
                { title: 'Settings', route: '/pages/settings', icon: 'settings' },
                { title: 'Login', route: '/pages/login', icon: 'login' },
                { title: 'Register', route: '/pages/register', icon: 'person_add' },
                { title: 'Forgot Password', route: '/pages/forgot-password', icon: 'lock_reset' },
                { title: '404 Error', route: '/pages/404', icon: 'error' },
                { title: '500 Error', route: '/pages/500', icon: 'error_outline' },
                { title: 'Maintenance', route: '/pages/maintenance', icon: 'build' },
                { title: 'Coming Soon', route: '/pages/coming-soon', icon: 'schedule' }
            ]
        },
        {
            title: 'Theme Management',
            icon: 'palette',
            route: '/theme',
            description: 'Switch and create custom themes',
            expanded: false,
            children: []
        }
    ];

    isSidenavOpen = true;

    toggleSidenav(): void {
        this.isSidenavOpen = !this.isSidenavOpen;
    }

    toggleExpansion(item: any): void {
        item.expanded = !item.expanded;
    }
}
