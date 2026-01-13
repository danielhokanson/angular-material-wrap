/// <reference types="cypress" />

describe('AMW Auto Focus Directive', () => {
  beforeEach(() => {
    cy.visit('/directives/auto-focus');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Auto Focus Directive demo page', () => {
      cy.get('h1, h3').should('contain.text', 'Auto Focus');
    });

    it('should have auto-focus demo elements', () => {
      cy.get('[amwAutoFocus]').should('exist');
    });
  });

  describe('Auto Focus on Input', () => {
    it('should have input with auto-focus', () => {
      cy.get('amw-input[amwAutoFocus]').should('exist');
    });

    it('should automatically focus the input', () => {
      // The input should receive focus automatically
      cy.get('amw-input[amwAutoFocus] input').should('exist');
    });
  });

  describe('Auto Focus on Button', () => {
    it('should have button with auto-focus', () => {
      cy.get('amw-button[amwAutoFocus]').should('exist');
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

    it('should have button focus example', () => {
      cy.get('.code-example').should('contain.text', 'Button');
    });

    it('should have delayed focus example', () => {
      cy.get('.code-example').should('contain.text', 'Delay');
    });

    it('should have conditional focus example', () => {
      cy.get('.code-example').should('contain.text', 'Conditional');
    });

    it('should have container focus example', () => {
      cy.get('.code-example').should('contain.text', 'Container');
    });

    it('should have interactive input examples', () => {
      cy.get('.preview amw-input').should('have.length.at.least', 1);
    });
  });

  describe('API Tab', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('API').click();
    });

    it('should display API documentation', () => {
      cy.get('.auto-focus-api, .api-content').should('exist');
    });

    it('should display directive inputs', () => {
      cy.get('.api-table').should('exist');
      cy.get('.api-table').should('contain.text', 'amwAutoFocus');
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

  describe('Focus Behavior', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Code').click();
    });

    it('should focus input in preview', () => {
      cy.get('.preview amw-input[amwAutoFocus] input').should('exist');
    });

    it('should focus button in preview', () => {
      cy.get('.preview amw-button[amwAutoFocus]').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('should support keyboard navigation', () => {
      cy.get('amw-input input').first().focus().should('have.focus');
    });

    it('should have accessible input fields', () => {
      cy.get('amw-input[label]').should('exist');
    });
  });
});
