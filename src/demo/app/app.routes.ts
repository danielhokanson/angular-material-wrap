import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/controls',
        pathMatch: 'full'
    },
    {
        path: 'controls',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent)
    },
    {
        path: 'controls/button',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'button' }
    },
    {
        path: 'controls/input',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'input' }
    },
    {
        path: 'controls/select',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'select' }
    },
    {
        path: 'controls/checkbox',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'checkbox' }
    },
    {
        path: 'controls/radio',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'radio' }
    },
    {
        path: 'controls/radio-group',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'radio-group' }
    },
    {
        path: 'controls/chips',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'chips' }
    },
    {
        path: 'controls/chip-input',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'chip-input' }
    },
    {
        path: 'controls/slider',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'slider' }
    },
    {
        path: 'controls/toggle',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'toggle' }
    },
    {
        path: 'controls/textarea',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'textarea' }
    },
    {
        path: 'controls/autocomplete',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'autocomplete' }
    },
    {
        path: 'controls/datepicker',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'datepicker' }
    },
    {
        path: 'controls/range-slider',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'range-slider' }
    },
    {
        path: 'controls/switch',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'switch' }
    },
    {
        path: 'controls/file-input',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'file-input' }
    },
    {
        path: 'controls/timepicker',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'timepicker' }
    },
    {
        path: 'controls/color-picker',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'color-picker' }
    },
    {
        path: 'controls/data-table',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { control: 'data-table' }
    },
    {
        path: 'components',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent)
    },
    {
        path: 'components/card',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { component: 'card' }
    },
    {
        path: 'components/dialog',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { component: 'dialog' }
    },
    {
        path: 'components/sidenav',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { component: 'sidenav' }
    },
    {
        path: 'components/popover',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { component: 'popover' }
    },
    {
        path: 'components/radio-group',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { component: 'radio-group' }
    },
    {
        path: 'components/radio-group/demo',
        loadComponent: () => import('./components/radio-group-demo/radio-group-demo.component').then(m => m.RadioGroupDemoComponent)
    },
    {
        path: 'components/radio-group/validation',
        loadComponent: () => import('./components/radio-group-validation/radio-group-validation.component').then(m => m.RadioGroupValidationComponent)
    },
    {
        path: 'components/radio-group/code',
        loadComponent: () => import('./components/radio-group-code/radio-group-code.component').then(m => m.RadioGroupCodeComponent)
    },
    {
        path: 'components/radio-group/api',
        loadComponent: () => import('./components/radio-group-api/radio-group-api.component').then(m => m.RadioGroupApiComponent)
    },
    {
        path: 'components/data-table',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { component: 'data-table' }
    },
    {
        path: 'components/data-table/demo',
        loadComponent: () => import('./components/data-table-demo/data-table-demo.component').then(m => m.DataTableDemoComponent)
    },
    {
        path: 'components/calendar',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { component: 'calendar' }
    },
    {
        path: 'components/stepper',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { component: 'stepper' }
    },
    {
        path: 'components/tabs',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { component: 'tabs' }
    },
    {
        path: 'components/accordion',
        loadComponent: () => import('./components/demo-container/demo-container.component').then(m => m.DemoContainerComponent),
        data: { component: 'accordion' }
    },
    {
        path: 'directives',
        loadComponent: () => import('./pages/directives-demo/directives-demo.component').then(m => m.DirectivesDemoComponent)
    },
    {
        path: 'directives/click-outside',
        loadComponent: () => import('./pages/directives-demo/directives-demo.component').then(m => m.DirectivesDemoComponent),
        data: { directive: 'click-outside' }
    },
    {
        path: 'directives/auto-focus',
        loadComponent: () => import('./pages/directives-demo/directives-demo.component').then(m => m.DirectivesDemoComponent),
        data: { directive: 'auto-focus' }
    },
    {
        path: 'directives/copy-to-clipboard',
        loadComponent: () => import('./pages/directives-demo/directives-demo.component').then(m => m.DirectivesDemoComponent),
        data: { directive: 'copy-to-clipboard' }
    },
    {
        path: 'directives/tooltip',
        loadComponent: () => import('./pages/directives-demo/directives-demo.component').then(m => m.DirectivesDemoComponent),
        data: { directive: 'tooltip' }
    },
    {
        path: 'services',
        loadComponent: () => import('./pages/services-demo/services-demo.component').then(m => m.ServicesDemoComponent)
    },
    {
        path: 'services/messaging',
        loadComponent: () => import('./pages/services-demo/services-demo.component').then(m => m.ServicesDemoComponent),
        data: { service: 'messaging' }
    },
    {
        path: 'services/loading',
        loadComponent: () => import('./pages/services-demo/services-demo.component').then(m => m.ServicesDemoComponent),
        data: { service: 'loading' }
    },
    {
        path: 'services/notification',
        loadComponent: () => import('./pages/services-demo/services-demo.component').then(m => m.ServicesDemoComponent),
        data: { service: 'notification' }
    },
    {
        path: 'services/http-cache',
        loadComponent: () => import('./pages/http-cache-demo/http-cache-demo.component').then(m => m.HttpCacheDemoComponent)
    },
    {
        path: 'pipes',
        loadComponent: () => import('./pages/pipes-demo/pipes-demo.component').then(m => m.PipesDemoComponent)
    },
    {
        path: 'pipes/currency',
        loadComponent: () => import('./pages/pipes-demo/pipes-demo.component').then(m => m.PipesDemoComponent),
        data: { pipe: 'currency' }
    },
    {
        path: 'pipes/date',
        loadComponent: () => import('./pages/pipes-demo/pipes-demo.component').then(m => m.PipesDemoComponent),
        data: { pipe: 'date' }
    },
    {
        path: 'pipes/text-transform',
        loadComponent: () => import('./pages/pipes-demo/pipes-demo.component').then(m => m.PipesDemoComponent),
        data: { pipe: 'text-transform' }
    },
    {
        path: 'pages',
        loadComponent: () => import('./pages/pages-demo/pages-demo.component').then(m => m.PagesDemoComponent)
    },
    {
        path: 'pages/dashboard',
        loadComponent: () => import('./pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)
    },
    {
        path: 'pages/profile',
        loadComponent: () => import('./pages/profile-page/profile-page.component').then(m => m.ProfilePageComponent)
    },
    {
        path: 'pages/settings',
        loadComponent: () => import('./pages/settings-page/settings-page.component').then(m => m.SettingsPageComponent)
    },
    {
        path: 'pages/list',
        loadComponent: () => import('./pages/list-page-demo/list-page-demo.component').then(m => m.ListPageDemoComponent)
    },
    {
        path: 'pages/detail',
        loadComponent: () => import('./pages/detail-page-demo/detail-page-demo.component').then(m => m.DetailPageDemoComponent)
    },
    {
        path: 'pages/form',
        loadComponent: () => import('./pages/form-page-demo/form-page-demo.component').then(m => m.FormPageDemoComponent)
    },
    {
        path: 'pages/search',
        loadComponent: () => import('./pages/search-page-demo/search-page-demo.component').then(m => m.SearchPageDemoComponent)
    },
    {
        path: 'pages/workflow',
        loadComponent: () => import('./pages/workflow-page-demo/workflow-page-demo.component').then(m => m.WorkflowPageDemoComponent)
    },
    {
        path: 'pages/report',
        loadComponent: () => import('./pages/report-page-demo/report-page-demo.component').then(m => m.ReportPageDemoComponent)
    },
    {
        path: 'pages/master-detail',
        loadComponent: () => import('./pages/master-detail-page-demo/master-detail-page-demo.component').then(m => m.MasterDetailPageDemoComponent)
    },
    {
        path: 'pages/dashboard-page',
        loadComponent: () => import('./pages/dashboard-page-demo/dashboard-page-demo.component').then(m => m.DashboardPageDemoComponent)
    },
    {
        path: 'components/calendar/demo',
        loadComponent: () => import('./components/calendar-demo/calendar-demo.component').then(m => m.CalendarDemoComponent)
    },
    {
        path: 'calendar-demo',
        loadComponent: () => import('./pages/calendar-demo-page/calendar-demo-page.component').then(m => m.CalendarDemoPageComponent)
    },
    {
        path: 'directives',
        loadComponent: () => import('./pages/directives-demo/directives-demo.component').then(m => m.DirectivesDemoComponent)
    },
    {
        path: 'services',
        loadComponent: () => import('./pages/services-demo/services-demo.component').then(m => m.ServicesDemoComponent)
    },
    {
        path: 'pipes',
        loadComponent: () => import('./pages/pipes-demo/pipes-demo.component').then(m => m.PipesDemoComponent)
    },
    {
        path: 'pages',
        loadComponent: () => import('./pages/pages-demo/pages-demo.component').then(m => m.PagesDemoComponent)
    },
    {
        path: 'theme',
        loadComponent: () => import('./components/theme-demo/theme-demo.component').then(m => m.ThemeDemoComponent)
    },
    {
        path: '**',
        redirectTo: '/controls'
    }
];