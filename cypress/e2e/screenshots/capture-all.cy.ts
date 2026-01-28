/// <reference types="cypress" />

/**
 * Cypress spec that captures screenshots of every AMW component demo page.
 *
 * Usage:
 *   npm run screenshots          (headless)
 *   npm run screenshots:open     (interactive)
 *
 * Output: cypress/screenshots/capture-all.cy.ts/
 *
 * Screenshots are named: {Category} - {component-name}.png
 * Feed them to Claude for aesthetic comparison and improvement suggestions.
 */

interface DemoRoute {
  name: string;
  path: string;
}

const CONTROLS: DemoRoute[] = [
  { name: 'autocomplete', path: '/controls/autocomplete' },
  { name: 'button', path: '/controls/button' },
  { name: 'button-toggle', path: '/controls/button-toggle' },
  { name: 'checkbox', path: '/controls/checkbox' },
  { name: 'chip', path: '/controls/chip' },
  { name: 'chip-input', path: '/controls/chip-input' },
  { name: 'chips', path: '/controls/chips' },
  { name: 'color-picker', path: '/controls/color-picker' },
  { name: 'data-table', path: '/controls/data-table' },
  { name: 'datepicker', path: '/controls/datepicker' },
  { name: 'file-input', path: '/controls/file-input' },
  { name: 'icon-button', path: '/controls/icon-button' },
  { name: 'input', path: '/controls/input' },
  { name: 'radio', path: '/controls/radio' },
  { name: 'radio-group', path: '/controls/radio-group' },
  { name: 'range-slider', path: '/controls/range-slider' },
  { name: 'select', path: '/controls/select' },
  { name: 'slider', path: '/controls/slider' },
  { name: 'switch', path: '/controls/switch' },
  { name: 'textarea', path: '/controls/textarea' },
  { name: 'timepicker', path: '/controls/timepicker' },
  { name: 'toggle', path: '/controls/toggle' },
];

const COMPONENTS: DemoRoute[] = [
  { name: 'accordion', path: '/components/accordion' },
  { name: 'badge', path: '/components/badge' },
  { name: 'calendar', path: '/components/calendar' },
  { name: 'card', path: '/components/card' },
  { name: 'dialog', path: '/components/dialog' },
  { name: 'inline-states', path: '/components/inline-states' },
  { name: 'list', path: '/components/list' },
  { name: 'paginator', path: '/components/paginator' },
  { name: 'popover', path: '/components/popover' },
  { name: 'sidenav', path: '/components/sidenav' },
  { name: 'stepper', path: '/components/stepper' },
  { name: 'tabs', path: '/components/tabs' },
];

const DIRECTIVES: DemoRoute[] = [
  { name: 'auto-focus', path: '/directives/auto-focus' },
  { name: 'click-outside', path: '/directives/click-outside' },
  { name: 'copy-to-clipboard', path: '/directives/copy-to-clipboard' },
  { name: 'tooltip', path: '/directives/tooltip' },
];

const SERVICES: DemoRoute[] = [
  { name: 'error-state', path: '/services/error-state' },
  { name: 'full-screen-loading', path: '/services/full-screen-loading' },
  { name: 'http-cache', path: '/services/http-cache' },
  { name: 'loading', path: '/services/loading' },
  { name: 'messaging', path: '/services/messaging' },
  { name: 'notification', path: '/services/notification' },
  { name: 'validation', path: '/services/validation' },
];

const PIPES: DemoRoute[] = [
  { name: 'currency', path: '/pipes/currency' },
  { name: 'date', path: '/pipes/date' },
  { name: 'text-transform', path: '/pipes/text-transform' },
];

const PAGES: DemoRoute[] = [
  { name: 'dashboard', path: '/pages/dashboard' },
  { name: 'dashboard-page', path: '/pages/dashboard-page' },
  { name: 'detail', path: '/pages/detail' },
  { name: 'form', path: '/pages/form' },
  { name: 'list', path: '/pages/list' },
  { name: 'master-detail', path: '/pages/master-detail' },
  { name: 'profile', path: '/pages/profile' },
  { name: 'report', path: '/pages/report' },
  { name: 'search', path: '/pages/search' },
  { name: 'settings', path: '/pages/settings' },
  { name: 'workflow', path: '/pages/workflow' },
];

const THEME: DemoRoute[] = [
  { name: 'theme', path: '/theme' },
];

function captureCategory(category: string, routes: DemoRoute[]) {
  describe(category, () => {
    routes.forEach((route) => {
      it(`${route.name}`, () => {
        cy.visit(route.path, { failOnStatusCode: false });
        cy.waitForAngular();

        // Allow lazy-loaded content and animations to settle
        cy.wait(1500);

        cy.screenshot(`${category} - ${route.name}`, {
          capture: 'fullPage',
          overwrite: true,
        });
      });
    });
  });
}

describe('AMW Screenshot Capture', () => {
  // Use a larger viewport for more complete captures
  beforeEach(() => {
    cy.viewport(3840, 2160);
  });

  // Prevent uncaught app exceptions from failing screenshot tests
  Cypress.on('uncaught:exception', () => false);

  captureCategory('Controls', CONTROLS);
  captureCategory('Components', COMPONENTS);
  captureCategory('Directives', DIRECTIVES);
  captureCategory('Services', SERVICES);
  captureCategory('Pipes', PIPES);
  captureCategory('Pages', PAGES);
  captureCategory('Theme', THEME);
});
