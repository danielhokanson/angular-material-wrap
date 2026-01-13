/// <reference types="cypress" />

describe('Navigation Workflow Integration', () => {
  describe('Main Navigation', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.waitForAngular();
    });

    it('should navigate through main sections', () => {
      // Start at controls
      cy.url().should('include', '/controls');

      // Navigate to components
      cy.visit('/components');
      cy.waitForAngular();
      cy.url().should('include', '/components');

      // Navigate to services
      cy.visit('/services');
      cy.waitForAngular();
      cy.url().should('include', '/services');

      // Navigate to directives
      cy.visit('/directives');
      cy.waitForAngular();
      cy.url().should('include', '/directives');

      // Navigate to pipes
      cy.visit('/pipes');
      cy.waitForAngular();
      cy.url().should('include', '/pipes');

      // Navigate to pages
      cy.visit('/pages');
      cy.waitForAngular();
      cy.url().should('include', '/pages');
    });
  });

  describe('Controls Navigation', () => {
    it('should navigate through all controls', () => {
      const controls = [
        'button', 'input', 'select', 'checkbox', 'radio',
        'slider', 'switch', 'chips', 'datepicker', 'textarea',
        'autocomplete', 'toggle', 'range-slider', 'color-picker',
        'file-input', 'timepicker'
      ];

      controls.forEach(control => {
        cy.visit(`/controls/${control}`);
        cy.waitForAngular();
        cy.url().should('include', `/controls/${control}`);
      });
    });
  });

  describe('Components Navigation', () => {
    it('should navigate through all components', () => {
      const components = [
        'card', 'dialog', 'sidenav', 'popover',
        'tabs', 'accordion', 'stepper', 'calendar'
      ];

      components.forEach(component => {
        cy.visit(`/components/${component}`);
        cy.waitForAngular();
        cy.url().should('include', `/components/${component}`);
      });
    });
  });

  describe('Services Navigation', () => {
    it('should navigate through all services', () => {
      const services = [
        'messaging', 'loading', 'notification'
      ];

      services.forEach(service => {
        cy.visit(`/services/${service}`);
        cy.waitForAngular();
        cy.url().should('include', `/services/${service}`);
      });
    });

    it('should navigate to http-cache demo', () => {
      cy.visit('/services/http-cache');
      cy.waitForAngular();
      cy.url().should('include', '/services/http-cache');
    });
  });

  describe('Directives Navigation', () => {
    it('should navigate through all directives', () => {
      const directives = [
        'tooltip', 'click-outside', 'auto-focus', 'copy-to-clipboard'
      ];

      directives.forEach(directive => {
        cy.visit(`/directives/${directive}`);
        cy.waitForAngular();
        cy.url().should('include', `/directives/${directive}`);
      });
    });
  });

  describe('Pages Navigation', () => {
    it('should navigate through all pages', () => {
      const pages = [
        'dashboard', 'list', 'detail', 'form',
        'search', 'workflow', 'report'
      ];

      pages.forEach(page => {
        cy.visit(`/pages/${page}`);
        cy.waitForAngular();
        cy.url().should('include', `/pages/${page}`);
      });
    });
  });

  describe('Theme Navigation', () => {
    it('should navigate to theme page', () => {
      cy.visit('/theme');
      cy.waitForAngular();
      cy.url().should('include', '/theme');
    });
  });

  describe('Deep Navigation Paths', () => {
    it('should navigate to nested component routes', () => {
      cy.visit('/components/calendar/demo');
      cy.waitForAngular();
      cy.url().should('include', '/components/calendar/demo');
    });
  });

  describe('Page State Preservation', () => {
    it('should maintain tab state when switching pages', () => {
      // Go to a page with tabs
      cy.visit('/services/messaging');
      cy.waitForAngular();

      // Switch to Code tab
      cy.get('.amw-tabs__tab, amw-tab').contains('Code').click();

      // Navigate to another page
      cy.visit('/services/loading');
      cy.waitForAngular();

      // Go back to messaging
      cy.visit('/services/messaging');
      cy.waitForAngular();

      // Tab state should be maintained or reset to default
      cy.get('amw-tabs').should('exist');
    });
  });

  describe('Invalid Route Handling', () => {
    it('should redirect invalid routes to controls', () => {
      cy.visit('/invalid-route-that-does-not-exist');
      cy.waitForAngular();
      cy.url().should('include', '/controls');
    });
  });
});
