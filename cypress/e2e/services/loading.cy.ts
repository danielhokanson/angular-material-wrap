/// <reference types="cypress" />

describe('AMW Loading Service', () => {
  beforeEach(() => {
    cy.visit('/services/loading');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Loading Service demo page', () => {
      cy.get('h1, h3').should('contain.text', 'Loading');
    });

    it('should have start loading button', () => {
      cy.get('amw-button').contains('Start Loading').should('exist');
    });

    it('should have stop loading button', () => {
      cy.get('amw-button').contains('Stop').should('exist');
    });
  });

  describe('Loading State Controls', () => {
    it('should start loading on button click', () => {
      cy.get('amw-button').contains('Start Loading').click();
      cy.get('.loading-demo, .spinner').should('be.visible');
    });

    it('should stop loading on button click', () => {
      // Start loading first
      cy.get('amw-button').contains('Start Loading').click();
      cy.get('.loading-demo').should('be.visible');

      // Stop loading
      cy.get('amw-button').contains('Stop').click();
      cy.get('.loading-demo').should('not.exist');
    });

    it('should disable start button while loading', () => {
      cy.get('amw-button').contains('Start Loading').click();
      cy.get('amw-button').contains('Start Loading').find('button').should('be.disabled');
    });

    it('should disable stop button when not loading', () => {
      cy.get('amw-button').contains('Stop').find('button').should('be.disabled');
    });
  });

  describe('Loading Indicator Display', () => {
    beforeEach(() => {
      cy.get('amw-button').contains('Start Loading').click();
    });

    afterEach(() => {
      cy.get('amw-button').contains('Stop').click({ force: true });
    });

    it('should display loading spinner', () => {
      cy.get('.spinner, .loading-demo').should('be.visible');
    });

    it('should display loading message', () => {
      cy.get('.loading-demo').should('contain.text', 'Loading');
    });
  });

  describe('Code Tab', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Code').click();
    });

    it('should display code examples', () => {
      cy.get('pre code, .code-example').should('exist');
    });

    it('should have progress indicator example', () => {
      cy.get('.code-example').should('contain.text', 'Progress');
    });

    it('should have HTTP request pattern example', () => {
      cy.get('.code-example').should('contain.text', 'HTTP');
    });

    it('should have progress input field', () => {
      cy.get('amw-input[type="number"], amw-input input[type="number"]').should('exist');
    });

    it('should have update progress button', () => {
      cy.get('amw-button').contains('Update Progress').should('exist');
    });

    it('should have loading message input', () => {
      cy.get('amw-input').should('have.length.at.least', 1);
    });
  });

  describe('Progress Updates', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Code').click();
    });

    it('should update progress value', () => {
      // Start loading first
      cy.get('amw-button').contains('Start Loading').first().click();

      // Find and update progress input
      cy.get('amw-input[type="number"] input, amw-input input[type="number"]').clear().type('50');
      cy.get('amw-button').contains('Update Progress').click();

      // Should show progress
      cy.get('body').should('contain.text', '50');

      // Cleanup
      cy.get('amw-button').contains('Stop').first().click({ force: true });
    });
  });

  describe('Dynamic Message Updates', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Code').click();
    });

    it('should update loading message', () => {
      // Start loading
      cy.get('amw-button').contains('Start Loading').first().click();

      // Update message
      cy.get('amw-input').contains('Loading Message').parent().find('input').clear().type('Custom Message');
      cy.get('amw-button').contains('Update Message').click();

      // Cleanup
      cy.get('amw-button').contains('Stop').first().click({ force: true });
    });
  });

  describe('API Tab', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('API').click();
    });

    it('should display API documentation', () => {
      cy.get('.loading-api, .api-content').should('exist');
    });

    it('should display service methods', () => {
      cy.get('.api-table').should('exist');
      cy.get('.api-table').should('contain.text', 'show');
      cy.get('.api-table').should('contain.text', 'hide');
    });

    it('should display service properties', () => {
      cy.get('.api-section__properties, .api-table').should('exist');
    });

    it('should display usage notes', () => {
      cy.get('.api-section__usage, ul').should('exist');
    });

    it('should display behavior details', () => {
      cy.get('.api-section__behavior').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible buttons', () => {
      cy.get('amw-button button').should('exist');
    });

    it('should indicate loading state to screen readers', () => {
      cy.get('amw-button').contains('Start Loading').click();
      // Loading content should be visible
      cy.get('.loading-demo').should('be.visible');
      cy.get('amw-button').contains('Stop').click();
    });

    it('should be keyboard navigable', () => {
      cy.get('amw-button button').first().focus().should('have.focus');
    });
  });
});
