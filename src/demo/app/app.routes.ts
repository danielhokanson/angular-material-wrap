import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/controls',
        pathMatch: 'full'
    },
    {
        path: 'controls',
        loadComponent: () => import('./pages/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent)
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
        path: '**',
        redirectTo: '/controls'
    }
];