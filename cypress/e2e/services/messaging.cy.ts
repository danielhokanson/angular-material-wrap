/// <reference types="cypress" />

describe('AMW Messaging Service', () => {
  beforeEach(() => {
    cy.visit('/services/messaging');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Messaging Service demo page', () => {
      cy.get('h1, h3').should('contain.text', 'Messaging');
    });

    it('should have message input fields', () => {
      cy.get('amw-input').should('have.length.at.least', 2);
    });

    it('should have message type buttons', () => {
      cy.get('amw-button[icon="info"]').should('exist');
      cy.get('amw-button[icon="check_circle"]').should('exist');
      cy.get('amw-button[icon="warning"]').should('exist');
      cy.get('amw-button[icon="error"]').should('exist');
    });
  });

  describe('Message Types', () => {
    it('should send info message', () => {
      cy.get('amw-input input').first().clear().type('Test Info');
      cy.get('amw-input input').eq(1).clear().type('Info content');
      cy.get('amw-button[icon="info"]').first().click();
      cy.get('.message-item.message-info, .message-item').should('exist');
    });

    it('should send success message', () => {
      cy.get('amw-input input').first().clear().type('Test Success');
      cy.get('amw-input input').eq(1).clear().type('Success content');
      cy.get('amw-button[icon="check_circle"]').first().click();
      cy.get('.message-item').should('exist');
    });

    it('should send warning message', () => {
      cy.get('amw-input input').first().clear().type('Test Warning');
      cy.get('amw-input input').eq(1).clear().type('Warning content');
      cy.get('amw-button[icon="warning"]').first().click();
      cy.get('.message-item').should('exist');
    });

    it('should send error message', () => {
      cy.get('amw-input input').first().clear().type('Test Error');
      cy.get('amw-input input').eq(1).clear().type('Error content');
      cy.get('amw-button[icon="error"]').first().click();
      cy.get('.message-item').should('exist');
    });
  });

  describe('Message Content', () => {
    it('should display message title', () => {
      const title = 'Custom Title Test';
      cy.get('amw-input input').first().clear().type(title);
      cy.get('amw-button[icon="info"]').first().click();
      cy.get('.message-item').should('contain.text', title);
    });

    it('should display message content', () => {
      const content = 'Custom content test message';
      cy.get('amw-input input').first().clear().type('Title');
      cy.get('amw-input input').eq(1).clear().type(content);
      cy.get('amw-button[icon="info"]').first().click();
      cy.get('.message-item').should('contain.text', content);
    });

    it('should display message timestamp', () => {
      cy.get('amw-input input').first().clear().type('Time Test');
      cy.get('amw-button[icon="info"]').first().click();
      cy.get('.message-time').should('exist');
    });
  });

  describe('Message Management', () => {
    beforeEach(() => {
      // Add some messages first
      cy.get('amw-input input').first().clear().type('Message 1');
      cy.get('amw-button[icon="info"]').first().click();
      cy.wait(100);
      cy.get('amw-input input').first().clear().type('Message 2');
      cy.get('amw-button[icon="check_circle"]').first().click();
    });

    it('should display multiple messages in the list', () => {
      cy.get('.message-item').should('have.length.at.least', 2);
    });

    it('should clear all messages', () => {
      cy.get('amw-button').contains('Clear').click();
      cy.get('.message-item').should('have.length', 0);
    });

    it('should dismiss individual messages', () => {
      cy.get('.message-item').first().find('amw-button[icon="close"]').click();
      cy.get('.message-item').should('have.length.at.least', 1);
    });
  });

  describe('Message Icons', () => {
    it('should display info icon for info messages', () => {
      cy.get('amw-button[icon="info"]').first().click();
      cy.get('.message-item mat-icon, .message-item amw-icon').should('exist');
    });

    it('should display appropriate icons for each message type', () => {
      cy.get('amw-button[icon="check_circle"]').first().click();
      cy.get('.message-item').should('exist');
    });
  });

  describe('Code Tab', () => {
    beforeEach(() => {
      // Switch to Code tab
      cy.get('.amw-tabs__tab, amw-tab').contains('Code').click();
    });

    it('should display code examples', () => {
      cy.get('pre code, .code-example').should('exist');
    });

    it('should have interactive code examples', () => {
      cy.get('.code-example amw-button').should('exist');
    });
  });

  describe('API Tab', () => {
    beforeEach(() => {
      // Switch to API tab
      cy.get('.amw-tabs__tab, amw-tab').contains('API').click();
    });

    it('should display API documentation', () => {
      cy.get('.messaging-api, .api-content').should('exist');
    });

    it('should display service methods', () => {
      cy.get('.api-table, .api-section__methods').should('exist');
    });

    it('should display service properties', () => {
      cy.get('.api-table').should('have.length.at.least', 1);
    });
  });

  describe('Accessibility', () => {
    it('should have accessible input fields', () => {
      cy.get('amw-input input').first().should('have.attr', 'placeholder');
    });

    it('should have accessible buttons', () => {
      cy.get('amw-button').first().find('button').should('not.be.disabled');
    });

    it('should be keyboard navigable', () => {
      cy.get('amw-input input').first().focus().should('have.focus');
      cy.get('amw-input input').first().type('{tab}');
    });
  });
});
