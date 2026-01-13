/// <reference types="cypress" />

describe('AMW Select Component', () => {
  beforeEach(() => {
    cy.visit('/select');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Select demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Select');
    });

    it('should have select components on the page', () => {
      cy.get('amw-select').should('exist');
    });
  });

  describe('Select Interactions', () => {
    it('should open dropdown on click', () => {
      cy.get('amw-select').first().click();
      cy.get('.mat-mdc-select-panel, .cdk-overlay-pane').should('be.visible');
    });

    it('should show options when opened', () => {
      cy.get('amw-select').first().click();
      cy.get('.mat-mdc-option').should('exist');
    });

    it('should select an option', () => {
      cy.get('amw-select').first().click();
      cy.get('.mat-mdc-option').first().click();
      // Option should be selected
      cy.get('amw-select .mat-mdc-select-value').should('not.be.empty');
    });

    it('should close dropdown after selection', () => {
      cy.get('amw-select').first().click();
      cy.get('.mat-mdc-option').first().click();
      cy.get('.mat-mdc-select-panel').should('not.exist');
    });
  });

  describe('Select with Multiple Selection', () => {
    it('should support multiple selection if configured', () => {
      cy.get('amw-select[multiple="true"]').then(($el) => {
        if ($el.length > 0) {
          cy.wrap($el).first().click();
          cy.get('.mat-mdc-option').first().click();
          cy.get('.mat-mdc-option').eq(1).click();
          // Multiple options should be selected
        }
      });
    });
  });

  describe('Select States', () => {
    it('should have disabled selects', () => {
      cy.get('amw-select[disabled="true"], amw-select .mat-mdc-select-disabled').should('exist');
    });

    it('disabled select should not open', () => {
      cy.get('amw-select[disabled="true"]').first().click({ force: true });
      cy.get('.mat-mdc-select-panel').should('not.exist');
    });
  });

  describe('Select Labels and Placeholders', () => {
    it('should display labels', () => {
      cy.get('amw-select mat-label, amw-select .mat-mdc-form-field-label').should('exist');
    });

    it('should display placeholder text', () => {
      cy.get('amw-select [placeholder], amw-select .mat-mdc-select-placeholder').should('exist');
    });
  });

  describe('Select Validation', () => {
    it('should show error state for required empty select', () => {
      cy.get('amw-select[required="true"]').then(($el) => {
        if ($el.length > 0) {
          // Trigger validation by focusing and blurring
          cy.wrap($el).first().click();
          cy.get('body').click(0, 0); // Click outside to close and blur
          cy.get('.mat-mdc-form-field-error, .mat-error').should('exist');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('select should be keyboard accessible', () => {
      cy.get('amw-select:not([disabled])').first()
        .find('.mat-mdc-select-trigger')
        .focus()
        .type('{enter}');
      cy.get('.mat-mdc-select-panel').should('be.visible');
    });

    it('should navigate options with keyboard', () => {
      cy.get('amw-select:not([disabled])').first()
        .find('.mat-mdc-select-trigger')
        .focus()
        .type('{enter}')
        .type('{downarrow}')
        .type('{enter}');
      cy.get('.mat-mdc-select-panel').should('not.exist');
    });
  });
});
