/// <reference types="cypress" />

describe('Form Workflow Integration', () => {
  describe('Complete Form Submission Workflow', () => {
    beforeEach(() => {
      cy.visit('/pages/form');
      cy.waitForAngular();
    });

    it('should complete a full form workflow', () => {
      // 1. Navigate to form page
      cy.get('h1').should('contain.text', 'Form');

      // 2. Verify form page component exists
      cy.get('amw-form-page').should('exist');

      // 3. Switch to Create mode
      cy.get('amw-button').contains('Create').click();

      // 4. Verify form fields are present
      cy.get('amw-form-page input, amw-form-page amw-input').should('exist');
    });

    it('should handle mode switching', () => {
      // Switch to Edit mode
      cy.get('amw-button').contains('Edit').click();

      // Switch to View mode
      cy.get('amw-button').contains('View').click();

      // Switch back to Create mode
      cy.get('amw-button').contains('Create').click();
    });

    it('should switch between basic and advanced views', () => {
      // Start in Basic View
      cy.get('amw-tab').contains('Basic View').should('exist');

      // Switch to Advanced View
      cy.get('.amw-tabs__tab, amw-tab').contains('Advanced View').click();

      // Verify advanced features mentioned
      cy.get('.form-page-demo__tab-content').should('contain.text', 'auto-save');

      // Switch back to Basic View
      cy.get('.amw-tabs__tab, amw-tab').contains('Basic View').click();
    });
  });

  describe('Form with Validation', () => {
    beforeEach(() => {
      cy.visit('/controls/input');
      cy.waitForAngular();
    });

    it('should show validation errors and clear them', () => {
      // Find a required input and trigger validation
      cy.get('amw-input input').first().focus().blur();

      // Type valid content
      cy.get('amw-input input').first().type('Valid input');

      // Verify input has value
      cy.get('amw-input input').first().should('have.value', 'Valid input');
    });
  });

  describe('Form Controls Integration', () => {
    it('should interact with text input', () => {
      cy.visit('/controls/input');
      cy.waitForAngular();

      cy.get('amw-input input').first().clear().type('Test text');
      cy.get('amw-input input').first().should('have.value', 'Test text');
    });

    it('should interact with select dropdown', () => {
      cy.visit('/controls/select');
      cy.waitForAngular();

      cy.get('amw-select').first().click();
      cy.get('.mat-mdc-option').first().click();
    });

    it('should interact with checkbox', () => {
      cy.visit('/controls/checkbox');
      cy.waitForAngular();

      cy.get('amw-checkbox').first().click();
    });

    it('should interact with radio buttons', () => {
      cy.visit('/controls/radio');
      cy.waitForAngular();

      cy.get('amw-radio').first().click();
    });

    it('should interact with slider', () => {
      cy.visit('/controls/slider');
      cy.waitForAngular();

      cy.get('amw-slider').should('exist');
    });

    it('should interact with switch/toggle', () => {
      cy.visit('/controls/switch');
      cy.waitForAngular();

      cy.get('amw-switch, amw-toggle, mat-slide-toggle').first().click();
    });

    it('should interact with chips', () => {
      cy.visit('/controls/chips');
      cy.waitForAngular();

      cy.get('amw-chips').should('exist');
    });

    it('should interact with datepicker', () => {
      cy.visit('/controls/datepicker');
      cy.waitForAngular();

      cy.get('amw-datepicker').should('exist');
    });
  });
});
