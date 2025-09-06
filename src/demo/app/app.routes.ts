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
        path: 'components',
        loadComponent: () => import('./pages/components-demo/components-demo.component').then(m => m.ComponentsDemoComponent)
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