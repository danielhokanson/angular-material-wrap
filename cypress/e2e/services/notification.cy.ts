/// <reference types="cypress" />

describe('AMW Notification Service', () => {
  beforeEach(() => {
    cy.visit('/services/notification');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Notification Service demo page', () => {
      cy.get('h1, h3').should('contain.text', 'Notification');
    });

    it('should have notification type buttons', () => {
      cy.get('amw-button').contains('Success').should('exist');
      cy.get('amw-button').contains('Error').should('exist');
      cy.get('amw-button').contains('Info').should('exist');
    });
  });

  describe('Notification Types', () => {
    it('should show success notification', () => {
      cy.get('.demo-section amw-button').contains('Success').click();
      cy.waitForNotification();
    });

    it('should show error notification', () => {
      cy.get('.demo-section amw-button').contains('Error').click();
      cy.waitForNotification();
    });

    it('should show info notification', () => {
      cy.get('.demo-section amw-button').contains('Info').click();
      cy.waitForNotification();
    });
  });

  describe('Code Tab', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Code').click();
    });

    it('should display code examples', () => {
      cy.get('pre code, .code-example').should('exist');
    });

    it('should have basic usage example', () => {
      cy.get('.code-example').should('contain.text', 'Basic');
    });

    it('should have notification types example', () => {
      cy.get('.code-example').contains('Notification Types').should('exist');
    });

    it('should have interactive info button', () => {
      cy.get('.code-example amw-button[icon="info"]').should('exist');
    });

    it('should have interactive success button', () => {
      cy.get('.code-example amw-button[icon="check_circle"]').should('exist');
    });

    it('should have interactive warning button', () => {
      cy.get('.code-example amw-button[icon="warning"]').should('exist');
    });

    it('should have interactive error button', () => {
      cy.get('.code-example amw-button[icon="error"]').should('exist');
    });

    it('should show custom options example', () => {
      cy.get('.code-example').should('contain.text', 'Custom');
    });

    it('should show persistent notification example', () => {
      cy.get('.code-example').should('contain.text', 'Persistent');
    });

    it('should show notification count', () => {
      cy.get('.preview').should('contain.text', 'notifications');
    });

    it('should have clear all button', () => {
      cy.get('amw-button').contains('Clear All').should('exist');
    });
  });

  describe('Interactive Code Examples', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Code').click();
    });

    it('should trigger info notification from code example', () => {
      cy.get('.code-example amw-button[icon="info"]').first().click();
      cy.waitForNotification();
    });

    it('should trigger success notification from code example', () => {
      cy.get('.code-example amw-button[icon="check_circle"]').first().click();
      cy.waitForNotification();
    });

    it('should trigger warning notification from code example', () => {
      cy.get('.code-example amw-button[icon="warning"]').first().click();
      cy.waitForNotification();
    });

    it('should trigger error notification from code example', () => {
      cy.get('.code-example amw-button[icon="error"]').first().click();
      cy.waitForNotification();
    });

    it('should show custom duration notification', () => {
      cy.get('.code-example').contains('Show Custom').click();
      cy.waitForNotification();
    });

    it('should show persistent notification', () => {
      cy.get('.code-example').contains('Show Persistent').click();
      cy.waitForNotification();
    });
  });

  describe('API Tab', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('API').click();
    });

    it('should display API documentation', () => {
      cy.get('.notification-api, .api-content').should('exist');
    });

    it('should display service methods', () => {
      cy.get('.api-table').should('exist');
      cy.get('.api-table').should('contain.text', 'info');
      cy.get('.api-table').should('contain.text', 'success');
      cy.get('.api-table').should('contain.text', 'warning');
      cy.get('.api-table').should('contain.text', 'error');
    });

    it('should display service properties', () => {
      cy.get('.api-section__properties').should('exist');
    });

    it('should display usage notes', () => {
      cy.get('.api-section__usage').should('exist');
    });

    it('should display behavior details', () => {
      cy.get('.api-section__behavior').should('exist');
    });

    it('should have quick examples section', () => {
      cy.get('.api-section__examples').should('exist');
    });
  });

  describe('Notification Display', () => {
    it('should display notification in snackbar container', () => {
      cy.get('.demo-section amw-button').contains('Success').click();
      cy.get('.mat-mdc-snack-bar-container, .mat-snack-bar-container, .amw-notification', { timeout: 5000 }).should('exist');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible notification buttons', () => {
      cy.get('amw-button button').should('have.length.at.least', 3);
    });

    it('should be keyboard navigable', () => {
      cy.get('amw-button button').first().focus().should('have.focus');
    });

    it('should announce notifications to screen readers', () => {
      // Snackbars have aria-live attributes for screen readers
      cy.get('.demo-section amw-button').contains('Info').click();
      cy.get('[aria-live], [role="status"], .mat-mdc-snack-bar-container', { timeout: 5000 }).should('exist');
    });
  });
});
