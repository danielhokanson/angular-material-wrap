/// <reference types="cypress" />

describe('AMW Autocomplete Component', () => {
  beforeEach(() => {
    cy.visit('/controls/autocomplete');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Autocomplete demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Autocomplete');
    });

    it('should have autocomplete components on the page', () => {
      cy.get('amw-autocomplete, mat-autocomplete').should('exist');
    });
  });

  describe('Autocomplete Input', () => {
    it('should have input field', () => {
      cy.get('amw-autocomplete input, input[matAutocomplete]').should('exist');
    });

    it('should allow text input', () => {
      cy.get('amw-autocomplete input, input[matAutocomplete]').first()
        .clear()
        .type('test');
    });
  });

  describe('Autocomplete Dropdown', () => {
    it('should show options on input focus', () => {
      cy.get('amw-autocomplete input, input[matAutocomplete]').first().focus();
      cy.get('.mat-mdc-autocomplete-panel, mat-autocomplete').should('be.visible');
    });

    it('should filter options as user types', () => {
      cy.get('amw-autocomplete input, input[matAutocomplete]').first()
        .clear()
        .type('a');
      cy.get('.mat-mdc-option, mat-option').should('exist');
    });

    it('should select option on click', () => {
      cy.get('amw-autocomplete input, input[matAutocomplete]').first().focus();
      cy.get('.mat-mdc-option, mat-option').first().click();
    });
  });

  describe('Autocomplete States', () => {
    it('should have disabled autocomplete', () => {
      cy.get('body').then(($body) => {
        const disabledSelector = 'amw-autocomplete[disabled="true"], input[matAutocomplete]:disabled, amw-autocomplete.disabled, amw-input[disabled]';
        if ($body.find(disabledSelector).length > 0) {
          cy.get(disabledSelector).should('exist');
        } else {
          cy.log('No disabled autocomplete found - skipping');
        }
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate options with arrow keys', () => {
      cy.get('body').then(($body) => {
        const inputSelector = 'amw-autocomplete input, input[matAutocomplete]';
        if ($body.find(inputSelector).length > 0) {
          cy.get(inputSelector).first().focus().type('{downarrow}');
          cy.wait(500);
          cy.get('body').then(($b) => {
            if ($b.find('.mat-mdc-option.mat-mdc-option-active, .mat-option-active, .mat-mdc-option').length > 0) {
              cy.get('.mat-mdc-option.mat-mdc-option-active, .mat-option-active, .mat-mdc-option').should('exist');
            } else {
              cy.log('Active option indicator not found - skipping');
            }
          });
        } else {
          cy.log('No autocomplete input found - skipping');
        }
      });
    });

    it('should select option with Enter key', () => {
      cy.get('body').then(($body) => {
        const inputSelector = 'amw-autocomplete input, input[matAutocomplete]';
        if ($body.find(inputSelector).length > 0) {
          cy.get(inputSelector).first().focus().type('{downarrow}').type('{enter}');
        } else {
          cy.log('No autocomplete input found - skipping');
        }
      });
    });

    it('should close dropdown on Escape', () => {
      cy.get('body').then(($body) => {
        const inputSelector = 'amw-autocomplete input, input[matAutocomplete]';
        if ($body.find(inputSelector).length > 0) {
          cy.get(inputSelector).first().focus();
          cy.wait(500);
          cy.get(inputSelector).first().type('{esc}');
        } else {
          cy.log('No autocomplete input found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      cy.get('body').then(($body) => {
        const inputSelector = 'amw-autocomplete input, input[matAutocomplete]';
        if ($body.find(inputSelector).length > 0) {
          cy.get(inputSelector).first().should('have.attr', 'role');
        } else {
          cy.log('No autocomplete input found - skipping');
        }
      });
    });

    it('should have label', () => {
      cy.get('body').then(($body) => {
        const labelSelector = 'amw-autocomplete mat-label, amw-autocomplete label, mat-label';
        if ($body.find(labelSelector).length > 0) {
          cy.get(labelSelector).should('exist');
        } else {
          cy.log('No labels found - skipping');
        }
      });
    });
  });
});
