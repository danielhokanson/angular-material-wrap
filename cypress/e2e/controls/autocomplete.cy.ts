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
      cy.get('amw-autocomplete[disabled="true"], input[matAutocomplete]:disabled').should('exist');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate options with arrow keys', () => {
      cy.get('amw-autocomplete input, input[matAutocomplete]').first()
        .focus()
        .type('{downarrow}');
      cy.get('.mat-mdc-option.mat-mdc-option-active, .mat-option-active').should('exist');
    });

    it('should select option with Enter key', () => {
      cy.get('amw-autocomplete input, input[matAutocomplete]').first()
        .focus()
        .type('{downarrow}')
        .type('{enter}');
    });

    it('should close dropdown on Escape', () => {
      cy.get('amw-autocomplete input, input[matAutocomplete]').first().focus();
      cy.get('.mat-mdc-autocomplete-panel').should('be.visible');
      cy.get('amw-autocomplete input').first().type('{esc}');
      cy.get('.mat-mdc-autocomplete-panel').should('not.be.visible');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      cy.get('amw-autocomplete input, input[matAutocomplete]').first()
        .should('have.attr', 'aria-autocomplete', 'list');
    });

    it('should have label', () => {
      cy.get('amw-autocomplete mat-label, amw-autocomplete label').should('exist');
    });
  });
});
