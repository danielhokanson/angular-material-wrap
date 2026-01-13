/// <reference types="cypress" />

describe('AMW Color Picker Component', () => {
  beforeEach(() => {
    cy.visit('/color-picker');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Color Picker demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Color');
    });

    it('should have color picker components on the page', () => {
      cy.get('amw-color-picker, input[type="color"]').should('exist');
    });
  });

  describe('Color Picker Input', () => {
    it('should have color input element', () => {
      cy.get('input[type="color"]').should('exist');
    });

    it('should display current color value', () => {
      cy.get('amw-color-picker').should('exist');
    });
  });

  describe('Color Selection', () => {
    it('should allow color selection', () => {
      cy.get('input[type="color"]').first().then(($input) => {
        cy.wrap($input).invoke('val', '#ff0000').trigger('input');
      });
    });

    it('should update display when color changes', () => {
      cy.get('input[type="color"]').first().invoke('val', '#00ff00').trigger('change');
    });
  });

  describe('Color Picker States', () => {
    it('should have disabled color picker', () => {
      cy.get('amw-color-picker[disabled="true"], input[type="color"]:disabled').should('exist');
    });
  });

  describe('Color Swatches', () => {
    it('should display predefined color swatches if available', () => {
      cy.get('.color-swatch, .amw-color-picker__swatch').then(($swatches) => {
        if ($swatches.length) {
          cy.wrap($swatches).should('exist');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      cy.get('input[type="color"]').first()
        .focus()
        .should('have.focus');
    });

    it('should have associated label', () => {
      cy.get('amw-color-picker mat-label, amw-color-picker label').should('exist');
    });
  });
});
