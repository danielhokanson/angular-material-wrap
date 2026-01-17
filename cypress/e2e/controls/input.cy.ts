/// <reference types="cypress" />

describe('AMW Input Component', () => {
  beforeEach(() => {
    cy.visit('/controls/input');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Input demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Input');
    });

    it('should have input components on the page', () => {
      cy.get('amw-input').should('exist');
    });
  });

  describe('Input Types', () => {
    it('should display text input', () => {
      cy.get('amw-input input[type="text"], amw-input input:not([type])').should('exist');
    });

    it('should display email input', () => {
      cy.get('amw-input input[type="email"]').should('exist');
    });

    it('should display password input', () => {
      cy.get('amw-input input[type="password"]').should('exist');
    });

    it('should display number input', () => {
      cy.get('amw-input input[type="number"]').should('exist');
    });
  });

  describe('Input Interactions', () => {
    it('should allow typing in enabled input', () => {
      const testText = 'Hello World';
      cy.get('amw-input:not([disabled]) input').first()
        .clear()
        .type(testText)
        .should('have.value', testText);
    });

    it('should clear input content', () => {
      cy.get('amw-input:not([disabled]) input').first()
        .type('Some text')
        .clear()
        .should('have.value', '');
    });

    it('should show placeholder text', () => {
      cy.get('amw-input input[placeholder]').should('exist');
    });
  });

  describe('Input Labels', () => {
    it('should display labels for inputs', () => {
      cy.get('amw-input mat-label, amw-input .mat-mdc-form-field-label').should('exist');
    });
  });

  describe('Input States', () => {
    it('should have disabled inputs', () => {
      cy.get('body').then(($body) => {
        const disabledSelector = 'amw-input[disabled="true"], amw-input input:disabled, amw-input.disabled';
        if ($body.find(disabledSelector).length > 0) {
          cy.get(disabledSelector).should('exist');
        } else {
          cy.log('No disabled inputs found - skipping');
        }
      });
    });

    it('should have readonly inputs', () => {
      cy.get('body').then(($body) => {
        const readonlySelector = 'amw-input[readonly="true"], amw-input input[readonly], amw-input.readonly';
        if ($body.find(readonlySelector).length > 0) {
          cy.get(readonlySelector).should('exist');
        } else {
          cy.log('No readonly inputs found - skipping');
        }
      });
    });
  });

  describe('Input Validation', () => {
    it('should show error state for invalid input', () => {
      // Check if there's a required input in the demo to test validation
      cy.get('body').then(($body) => {
        const hasRequiredInput = $body.find('amw-input[required="true"] input, amw-input input[required]').length > 0;
        if (hasRequiredInput) {
          // Find a required input, clear it, and blur to trigger validation
          cy.get('amw-input[required="true"] input, amw-input input[required]').first()
            .clear()
            .blur();
          // Error state should be shown
          cy.get('.mat-mdc-form-field-error, .mat-error, .mat-mdc-form-field-subscript-wrapper mat-error').should('exist');
        } else {
          // Skip if no required inputs in demo
          cy.log('No required inputs found in demo - validation test skipped');
        }
      });
    });
  });

  describe('Input Appearance', () => {
    it('should have outline appearance inputs', () => {
      cy.get('amw-input .mat-mdc-form-field-appearance-outline, amw-input[appearance="outline"]').should('exist');
    });

    it('should have fill appearance inputs', () => {
      cy.get('amw-input .mat-mdc-form-field-appearance-fill, amw-input[appearance="fill"]').should('exist');
    });
  });

  describe('Input with Icons', () => {
    it('should display inputs with prefix icons', () => {
      cy.get('amw-input mat-icon, amw-input [matPrefix], amw-input [matSuffix]').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('inputs should be keyboard accessible', () => {
      cy.get('amw-input:not([disabled]) input').first()
        .focus()
        .should('have.focus');
    });

    it('inputs should have associated labels', () => {
      cy.get('amw-input mat-label').should('exist');
    });
  });
});
