import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/controls',
        pathMatch: 'full'
    },
    {
        path: 'controls',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent)
    },
    {
        path: 'controls/button',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'button' }
    },
    {
        path: 'controls/input',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'input' }
    },
    {
        path: 'controls/select',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'select' }
    },
    {
        path: 'controls/checkbox',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'checkbox' }
    },
    {
        path: 'controls/radio',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'radio' }
    },
    {
        path: 'controls/radio-group',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'radio-group' }
    },
    {
        path: 'controls/chips',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'chips' }
    },
    {
        path: 'controls/slider',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'slider' }
    },
    {
        path: 'controls/toggle',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'toggle' }
    },
    {
        path: 'controls/textarea',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'textarea' }
    },
    {
        path: 'controls/autocomplete',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'autocomplete' }
    },
    {
        path: 'controls/datepicker',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'datepicker' }
    },
    {
        path: 'controls/range-slider',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'range-slider' }
    },
    {
        path: 'controls/switch',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'switch' }
    },
    {
        path: 'controls/file-input',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'file-input' }
    },
    {
        path: 'controls/timepicker',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'timepicker' }
    },
    {
        path: 'controls/color-picker',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'color-picker' }
    },
    {
        path: 'controls/data-table',
        loadComponent: () => import('./components/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent),
        data: { control: 'data-table' }
    },
    {
        path: 'components',
        loadComponent: () => import('./pages/components-demo/components-demo.component').then(m => m.ComponentsDemoComponent)
    },
    {
        path: 'components/card',
        loadComponent: () => import('./pages/components-demo/components-demo.component').then(m => m.ComponentsDemoComponent),
        data: { component: 'card' }
    },
    {
        path: 'components/dialog',
        loadComponent: () => import('./pages/components-demo/components-demo.component').then(m => m.ComponentsDemoComponent),
        data: { component: 'dialog' }
    },
    {
        path: 'components/sidenav',
        loadComponent: () => import('./pages/components-demo/components-demo.component').then(m => m.ComponentsDemoComponent),
        data: { component: 'sidenav' }
    },
    {
        path: 'components/popover',
        loadComponent: () => import('./pages/components-demo/components-demo.component').then(m => m.ComponentsDemoComponent),
        data: { component: 'popover' }
    },
    {
        path: 'components/radio-group',
        loadComponent: () => import('./pages/components-demo/components-demo.component').then(m => m.ComponentsDemoComponent),
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
        loadComponent: () => import('./pages/components-demo/components-demo.component').then(m => m.ComponentsDemoComponent),
        data: { component: 'data-table' }
    },
    {
        path: 'components/data-table/demo',
        loadComponent: () => import('./components/data-table-demo/data-table-demo.component').then(m => m.DataTableDemoComponent)
    },
    {
        path: 'components/calendar',
        loadComponent: () => import('./pages/components-demo/components-demo.component').then(m => m.ComponentsDemoComponent),
        data: { component: 'calendar' }
    },
    {
        path: 'components/stepper',
        loadComponent: () => import('./pages/components-demo/components-demo.component').then(m => m.ComponentsDemoComponent),
        data: { component: 'stepper' }
    },
    {
        path: 'components/tabs',
        loadComponent: () => import('./pages/components-demo/components-demo.component').then(m => m.ComponentsDemoComponent),
        data: { component: 'tabs' }
    },
    {
        path: 'components/accordion',
        loadComponent: () => import('./pages/components-demo/components-demo.component').then(m => m.ComponentsDemoComponent),
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
        loadComponent: () => import('./pages/pages-demo/pages-demo.component').then(m => m.PagesDemoComponent),
        data: { page: 'dashboard' }
    },
    {
        path: 'pages/profile',
        loadComponent: () => import('./pages/pages-demo/pages-demo.component').then(m => m.PagesDemoComponent),
        data: { page: 'profile' }
    },
    {
        path: 'pages/settings',
        loadComponent: () => import('./pages/pages-demo/pages-demo.component').then(m => m.PagesDemoComponent),
        data: { page: 'settings' }
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