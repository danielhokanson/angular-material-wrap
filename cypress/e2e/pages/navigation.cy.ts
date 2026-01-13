/// <reference types="cypress" />

describe('Demo Application Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForAngular();
  });

  describe('Application Layout', () => {
    it('should display application title', () => {
      cy.get('.mat-toolbar, header').should('contain.text', 'Angular Material Wrap');
    });

    it('should have sidenav navigation', () => {
      cy.get('mat-sidenav, amw-sidenav, .mat-drawer').should('exist');
    });

    it('should have main content area', () => {
      cy.get('mat-sidenav-content, .mat-drawer-content, main').should('exist');
    });
  });

  describe('Navigation Menu', () => {
    it('should have Controls section', () => {
      cy.get('mat-nav-list, nav').contains('Controls').should('exist');
    });

    it('should have Components section', () => {
      cy.get('mat-nav-list, nav').contains('Components').should('exist');
    });

    it('should have Pages section', () => {
      cy.get('mat-nav-list, nav').contains('Pages').should('exist');
    });
  });

  describe('Controls Navigation', () => {
    it('should navigate to Button page', () => {
      cy.get('mat-nav-list a, nav a').contains('Button').click();
      cy.url().should('include', '/button');
    });

    it('should navigate to Input page', () => {
      cy.get('mat-nav-list a, nav a').contains('Input').click();
      cy.url().should('include', '/input');
    });

    it('should navigate to Select page', () => {
      cy.get('mat-nav-list a, nav a').contains('Select').click();
      cy.url().should('include', '/select');
    });

    it('should navigate to Checkbox page', () => {
      cy.get('mat-nav-list a, nav a').contains('Checkbox').click();
      cy.url().should('include', '/checkbox');
    });

    it('should navigate to Radio page', () => {
      cy.get('mat-nav-list a, nav a').contains('Radio').click();
      cy.url().should('include', '/radio');
    });

    it('should navigate to Slider page', () => {
      cy.get('mat-nav-list a, nav a').contains('Slider').click();
      cy.url().should('include', '/slider');
    });

    it('should navigate to Switch page', () => {
      cy.get('mat-nav-list a, nav a').contains('Switch').click();
      cy.url().should('include', '/switch');
    });

    it('should navigate to Datepicker page', () => {
      cy.get('mat-nav-list a, nav a').contains('Datepicker').click();
      cy.url().should('include', '/datepicker');
    });

    it('should navigate to Autocomplete page', () => {
      cy.get('mat-nav-list a, nav a').contains('Autocomplete').click();
      cy.url().should('include', '/autocomplete');
    });
  });

  describe('Components Navigation', () => {
    it('should navigate to Card page', () => {
      cy.get('mat-nav-list a, nav a').contains('Card').click();
      cy.url().should('include', '/card');
    });

    it('should navigate to Tabs page', () => {
      cy.get('mat-nav-list a, nav a').contains('Tabs').click();
      cy.url().should('include', '/tabs');
    });

    it('should navigate to Dialog page', () => {
      cy.get('mat-nav-list a, nav a').contains('Dialog').click();
      cy.url().should('include', '/dialog');
    });

    it('should navigate to Popover page', () => {
      cy.get('mat-nav-list a, nav a').contains('Popover').click();
      cy.url().should('include', '/popover');
    });

    it('should navigate to Accordion page', () => {
      cy.get('mat-nav-list a, nav a').contains('Accordion').click();
      cy.url().should('include', '/accordion');
    });

    it('should navigate to Sidenav page', () => {
      cy.get('mat-nav-list a, nav a').contains('Sidenav').click();
      cy.url().should('include', '/sidenav');
    });
  });

  describe('Pages Navigation', () => {
    it('should navigate to Dashboard page', () => {
      cy.get('mat-nav-list a, nav a').contains('Dashboard').click();
      cy.url().should('include', '/dashboard');
    });

    it('should navigate to Profile page', () => {
      cy.get('mat-nav-list a, nav a').contains('Profile').click();
      cy.url().should('include', '/profile');
    });

    it('should navigate to Settings page', () => {
      cy.get('mat-nav-list a, nav a').contains('Settings').click();
      cy.url().should('include', '/settings');
    });

    it('should navigate to Theme page', () => {
      cy.get('mat-nav-list a, nav a').contains('Theme').click();
      cy.url().should('include', '/theme');
    });
  });

  describe('Responsive Navigation', () => {
    it('should show sidenav on desktop', () => {
      cy.viewport(1280, 720);
      cy.get('mat-sidenav, amw-sidenav').should('be.visible');
    });

    it('should collapse sidenav on mobile', () => {
      cy.viewport(375, 667);
      cy.get('mat-sidenav.mat-drawer-opened, amw-sidenav.mat-drawer-opened').should('not.exist');
    });

    it('should show menu button on mobile', () => {
      cy.viewport(375, 667);
      cy.get('button[aria-label*="menu"], .menu-button').should('be.visible');
    });
  });
});
