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
                { title: 'Color Picker', route: '/controls/color-picker', icon: 'palette' },
                { title: 'Data Table', route: '/controls/data-table', icon: 'table_view' }
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
                { title: 'Data Table', route: '/components/data-table', icon: 'table_chart' },
                { title: 'Calendar', route: '/components/calendar', icon: 'calendar_month' },
                { title: 'Stepper', route: '/components/stepper', icon: 'view_list' },
                { title: 'Tabs', route: '/components/tabs', icon: 'tab' },
                { title: 'Accordion', route: '/components/accordion', icon: 'expand_more' }
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
                { title: 'Copy to Clipboard', route: '/directives/copy-to-clipboard', icon: 'content_copy' },
                { title: 'Tooltip', route: '/directives/tooltip', icon: 'help_outline' }
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
                { title: 'Notification Service', route: '/services/notification', icon: 'notifications' }
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
                { title: 'Text Transform', route: '/pipes/text-transform', icon: 'text_format' }
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
                { title: 'Settings', route: '/pages/settings', icon: 'settings' }
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
