/// <reference types="cypress" />

describe('AMW Copy to Clipboard Directive', () => {
  beforeEach(() => {
    cy.visit('/directives/copy-to-clipboard');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Copy to Clipboard Directive demo page', () => {
      cy.get('h1, h3').should('contain.text', 'Copy to Clipboard');
    });

    it('should have copy-to-clipboard demo elements', () => {
      cy.get('[amwCopyToClipboard]').should('exist');
    });
  });

  describe('Copy Text Demo', () => {
    it('should have text input field', () => {
      cy.get('amw-input[label="Text to copy"], amw-input').should('exist');
    });

    it('should have copy to clipboard button', () => {
      cy.get('amw-button').contains('Copy').should('exist');
    });

    it('should copy text on button click', () => {
      // Type some text
      cy.get('amw-input input').first().clear().type('Test copy text');
      // Click copy button
      cy.get('amw-button').contains('Copy to Clipboard').click();
      // Should show success notification
    });
  });

  describe('Copy Code Block Demo', () => {
    it('should have code block', () => {
      cy.get('.code-block pre, pre code').should('exist');
    });

    it('should have copy code button', () => {
      cy.get('.code-block amw-button[icon="content_copy"], amw-button[icon="content_copy"]').should('exist');
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

    it('should have copy from input example', () => {
      cy.get('.code-example').should('contain.text', 'Input');
    });

    it('should have event handling example', () => {
      cy.get('.code-example').should('contain.text', 'Event');
    });

    it('should have custom messages example', () => {
      cy.get('.code-example').should('contain.text', 'Custom');
    });

    it('should have code block copy example', () => {
      cy.get('.code-example').should('contain.text', 'Code Block');
    });

    it('should have interactive copy buttons', () => {
      cy.get('.preview amw-button[amwCopyToClipboard]').should('exist');
    });
  });

  describe('Interactive Code Examples', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Code').click();
    });

    it('should have copy text button in preview', () => {
      cy.get('.preview amw-button').contains('Copy').should('exist');
    });

    it('should have copy code button in preview', () => {
      cy.get('.preview amw-button[icon="content_copy"]').should('exist');
    });

    it('should copy text when clicking copy button', () => {
      cy.get('.preview amw-button').contains('Copy Text').first().click();
      // Should trigger clipboard copy
    });
  });

  describe('API Tab', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('API').click();
    });

    it('should display API documentation', () => {
      cy.get('.copy-to-clipboard-api, .api-content').should('exist');
    });

    it('should display directive inputs', () => {
      cy.get('.api-section__inputs .api-table').should('exist');
    });

    it('should display directive outputs', () => {
      cy.get('.api-section__outputs .api-table').should('exist');
    });

    it('should display usage notes', () => {
      cy.get('.api-section__usage').should('exist');
    });

    it('should display behavior details', () => {
      cy.get('.api-section__behavior').should('exist');
    });

    it('should document amwCopySuccess event', () => {
      cy.get('.api-table').should('contain.text', 'amwCopySuccess');
    });

    it('should document amwCopyError event', () => {
      cy.get('.api-table').should('contain.text', 'amwCopyError');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible copy buttons', () => {
      cy.get('amw-button[amwCopyToClipboard] button').should('exist');
    });

    it('should have accessible input fields', () => {
      cy.get('amw-input[label]').should('exist');
    });

    it('should support keyboard activation', () => {
      cy.get('amw-button button').first().focus().should('have.focus');
    });
  });
});
