/// <reference types="cypress" />

describe('AMW Dashboard Page', () => {
  beforeEach(() => {
    cy.visit('/pages/dashboard');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Dashboard page', () => {
      cy.get('h1').should('contain.text', 'Dashboard');
    });

    it('should display welcome message', () => {
      cy.get('.dashboard-header p').should('contain.text', 'Welcome');
    });

    it('should have dashboard content grid', () => {
      cy.get('.dashboard-grid').should('exist');
    });
  });

  describe('Stats Cards Row', () => {
    it('should display stats cards', () => {
      cy.get('.stat-card').should('have.length', 5);
    });

    it('should display Components stat card', () => {
      cy.get('.stat-card').should('contain.text', 'Components');
      cy.get('.stat-card').should('contain.text', '19');
    });

    it('should display Directives stat card', () => {
      cy.get('.stat-card').should('contain.text', 'Directives');
    });

    it('should display Pipes stat card', () => {
      cy.get('.stat-card').should('contain.text', 'Pipes');
    });

    it('should display Services stat card', () => {
      cy.get('.stat-card').should('contain.text', 'Services');
    });

    it('should display Pages stat card', () => {
      cy.get('.stat-card').should('contain.text', 'Pages');
    });

    it('should have icons in stat cards', () => {
      cy.get('.stat-card amw-icon, .stat-card mat-icon').should('have.length', 5);
    });
  });

  describe('Quick Actions Card', () => {
    it('should display Quick Actions card', () => {
      cy.get('.actions-card').should('exist');
      cy.get('.actions-card h2').should('contain.text', 'Quick Actions');
    });

    it('should have subtitle', () => {
      cy.get('.actions-card .subtitle').should('contain.text', 'Common tasks');
    });

    it('should have action buttons', () => {
      cy.get('.actions-card amw-button').should('have.length', 3);
    });

    it('should have New Component button', () => {
      cy.get('.actions-card amw-button').contains('New Component').should('exist');
    });

    it('should have View Documentation button', () => {
      cy.get('.actions-card amw-button').contains('View Documentation').should('exist');
    });

    it('should have Report Issue button', () => {
      cy.get('.actions-card amw-button').contains('Report Issue').should('exist');
    });

    it('should have icons on action buttons', () => {
      cy.get('.actions-card amw-button[icon]').should('have.length', 3);
    });
  });

  describe('Library Progress Card', () => {
    it('should display Library Progress card', () => {
      cy.get('.progress-card').should('exist');
      cy.get('.progress-card h2').should('contain.text', 'Library Progress');
    });

    it('should display progress items', () => {
      cy.get('.progress-item').should('have.length', 5);
    });

    it('should show Controls progress at 100%', () => {
      cy.get('.progress-item').contains('Controls').parent().should('contain.text', '100%');
    });

    it('should show Components progress at 85%', () => {
      cy.get('.progress-item').contains('Components').parent().should('contain.text', '85%');
    });

    it('should show Directives progress at 75%', () => {
      cy.get('.progress-item').contains('Directives').parent().should('contain.text', '75%');
    });

    it('should show Services progress at 90%', () => {
      cy.get('.progress-item').contains('Services').parent().should('contain.text', '90%');
    });

    it('should show Pages progress at 100%', () => {
      cy.get('.progress-item').contains('Pages').parent().should('contain.text', '100%');
    });

    it('should have progress bars', () => {
      cy.get('.progress-bar').should('have.length', 5);
    });

    it('should have progress bar fills', () => {
      cy.get('.progress-bar-fill').should('have.length', 5);
    });
  });

  describe('Card Components', () => {
    it('should use amw-card components', () => {
      cy.get('amw-card').should('have.length.at.least', 5);
    });

    it('should have card headers', () => {
      cy.get('amw-card h2').should('have.length.at.least', 2);
    });

    it('should have card content', () => {
      cy.get('amw-card .mat-mdc-card-content, amw-card ng-template').should('exist');
    });
  });

  describe('Icons', () => {
    it('should display widgets icon', () => {
      cy.get('amw-icon[name="widgets"], mat-icon').contains('widgets').should('exist');
    });

    it('should display extension icon', () => {
      cy.get('amw-icon[name="extension"], mat-icon').contains('extension').should('exist');
    });

    it('should display transform icon', () => {
      cy.get('amw-icon[name="transform"], mat-icon').contains('transform').should('exist');
    });

    it('should display settings icon', () => {
      cy.get('amw-icon[name="settings"], mat-icon').contains('settings').should('exist');
    });

    it('should display pages icon', () => {
      cy.get('amw-icon[name="pages"], mat-icon').contains('pages').should('exist');
    });
  });

  describe('Button Interactions', () => {
    it('should be clickable - New Component', () => {
      cy.get('.actions-card amw-button').contains('New Component').click();
    });

    it('should be clickable - View Documentation', () => {
      cy.get('.actions-card amw-button').contains('View Documentation').click();
    });

    it('should be clickable - Report Issue', () => {
      cy.get('.actions-card amw-button').contains('Report Issue').click();
    });
  });

  describe('Layout and Responsiveness', () => {
    it('should have dashboard grid layout', () => {
      cy.get('.dashboard-grid').should('exist');
    });

    it('should have stats row', () => {
      cy.get('.stats-row').should('exist');
    });

    it('should have bottom row', () => {
      cy.get('.bottom-row').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('exist');
      cy.get('h2').should('have.length.at.least', 2);
      cy.get('h3').should('have.length.at.least', 1);
    });

    it('should have accessible buttons', () => {
      cy.get('amw-button button').should('have.length.at.least', 3);
    });

    it('should have descriptive stat labels', () => {
      cy.get('.stat-content p').should('have.length', 5);
    });

    it('should have accessible progress labels', () => {
      cy.get('.progress-label').should('have.length', 5);
    });
  });
});
