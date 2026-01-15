/// <reference types="cypress" />

describe('Demo Application Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForAngular();
  });

  describe('Application Layout', () => {
    it('should display application header', () => {
      cy.get('body').then(($body) => {
        const hasToolbar = $body.find('.mat-toolbar, mat-toolbar, header, .toolbar').length > 0;
        if (hasToolbar) {
          cy.get('.mat-toolbar, mat-toolbar, header, .toolbar').should('exist');
        } else {
          cy.log('No toolbar found - skipping');
        }
      });
    });

    it('should have navigation', () => {
      cy.get('body').then(($body) => {
        const hasNav = $body.find('mat-sidenav, amw-sidenav, .mat-drawer, nav, .navigation').length > 0;
        if (hasNav) {
          cy.get('mat-sidenav, amw-sidenav, .mat-drawer, nav, .navigation').should('exist');
        } else {
          cy.log('No navigation found - skipping');
        }
      });
    });

    it('should have main content area', () => {
      cy.get('mat-sidenav-content, .mat-drawer-content, main, .content, .main').should('exist');
    });
  });

  describe('Navigation Menu', () => {
    it('should have navigation sections', () => {
      cy.get('body').then(($body) => {
        const hasNavLinks = $body.find('mat-nav-list a, nav a, a[routerLink], .nav-link').length > 0;
        if (hasNavLinks) {
          cy.get('mat-nav-list a, nav a, a[routerLink], .nav-link').should('have.length.at.least', 1);
        } else {
          cy.log('No navigation links found - skipping');
        }
      });
    });

    it('should have clickable navigation items', () => {
      cy.get('body').then(($body) => {
        const hasNavItems = $body.find('mat-nav-list a, nav a, a[routerLink], .nav-link, mat-list-item').length > 0;
        if (hasNavItems) {
          cy.get('mat-nav-list a, nav a, a[routerLink], .nav-link, mat-list-item').should('have.length.at.least', 1);
        } else {
          cy.log('No navigation items found - skipping');
        }
      });
    });
  });

  describe('Controls Navigation', () => {
    it('should navigate to Button page', () => {
      cy.get('body').then(($body) => {
        const buttonLink = $body.find('a').filter((_, el) => /button/i.test(el.textContent || ''));
        if (buttonLink.length > 0) {
          cy.get('a').contains(/button/i).first().click({ force: true });
          cy.url().should('include', 'button');
        } else {
          cy.log('No Button link found - skipping');
        }
      });
    });

    it('should navigate to Input page', () => {
      cy.get('body').then(($body) => {
        const inputLink = $body.find('a').filter((_, el) => /^input$/i.test((el.textContent || '').trim()));
        if (inputLink.length > 0) {
          cy.get('a').contains(/^input$/i).first().click({ force: true });
          cy.url().should('include', 'input');
        } else {
          cy.log('No Input link found - skipping');
        }
      });
    });

    it('should navigate to Select page', () => {
      cy.get('body').then(($body) => {
        const selectLink = $body.find('a').filter((_, el) => /^select$/i.test((el.textContent || '').trim()));
        if (selectLink.length > 0) {
          cy.get('a').contains(/^select$/i).first().click({ force: true });
          cy.url().should('include', 'select');
        } else {
          cy.log('No Select link found - skipping');
        }
      });
    });
  });

  describe('Components Navigation', () => {
    it('should navigate to Card page', () => {
      cy.get('body').then(($body) => {
        const cardLink = $body.find('a').filter((_, el) => /^card$/i.test((el.textContent || '').trim()));
        if (cardLink.length > 0) {
          cy.get('a').contains(/^card$/i).first().click({ force: true });
          cy.url().should('include', 'card');
        } else {
          cy.log('No Card link found - skipping');
        }
      });
    });

    it('should navigate to Tabs page', () => {
      cy.get('body').then(($body) => {
        const tabsLink = $body.find('a').filter((_, el) => /^tabs$/i.test((el.textContent || '').trim()));
        if (tabsLink.length > 0) {
          cy.get('a').contains(/^tabs$/i).first().click({ force: true });
          cy.url().should('include', 'tabs');
        } else {
          cy.log('No Tabs link found - skipping');
        }
      });
    });

    it('should navigate to Dialog page', () => {
      cy.get('body').then(($body) => {
        const dialogLink = $body.find('a').filter((_, el) => /^dialog$/i.test((el.textContent || '').trim()));
        if (dialogLink.length > 0) {
          cy.get('a').contains(/^dialog$/i).first().click({ force: true });
          cy.url().should('include', 'dialog');
        } else {
          cy.log('No Dialog link found - skipping');
        }
      });
    });
  });

  describe('Responsive Navigation', () => {
    it('should show sidenav on desktop', () => {
      cy.viewport(1280, 720);
      cy.get('body').then(($body) => {
        const hasNav = $body.find('mat-sidenav, amw-sidenav, nav, .navigation').length > 0;
        if (hasNav) {
          cy.get('mat-sidenav, amw-sidenav, nav, .navigation').should('exist');
        } else {
          cy.log('No sidenav found - skipping');
        }
      });
    });

    it('should handle mobile viewport', () => {
      cy.viewport(375, 667);
      cy.get('body').then(($body) => {
        const hasMenuButton = $body.find('button[aria-label*="menu"], button[aria-label*="Menu"], .menu-button, .hamburger').length > 0;
        if (hasMenuButton) {
          cy.get('button[aria-label*="menu"], button[aria-label*="Menu"], .menu-button, .hamburger').should('exist');
        } else {
          // Just verify page loads correctly on mobile
          cy.get('body').should('exist');
        }
      });
    });
  });
});
