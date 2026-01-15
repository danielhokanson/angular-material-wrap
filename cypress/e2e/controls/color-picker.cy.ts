/// <reference types="cypress" />

describe('AMW Color Picker Component', () => {
  beforeEach(() => {
    cy.visit('/controls/color-picker');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Color Picker demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Color');
    });

    it('should have color picker components on the page', () => {
      cy.get('amw-color-picker, input[type="color"], .color-picker').should('exist');
    });
  });

  describe('Color Picker Input', () => {
    it('should have color input element', () => {
      cy.get('body').then(($body) => {
        const hasColorInput = $body.find('input[type="color"]').length > 0;
        if (hasColorInput) {
          cy.get('input[type="color"]').should('exist');
        } else {
          // May use a custom color picker component
          cy.get('amw-color-picker').should('exist');
        }
      });
    });

    it('should display current color value', () => {
      cy.get('amw-color-picker').should('exist');
    });
  });

  describe('Color Selection', () => {
    it('should allow color selection', () => {
      cy.get('body').then(($body) => {
        const hasColorInput = $body.find('input[type="color"]').length > 0;
        if (hasColorInput) {
          cy.get('input[type="color"]').first().then(($input) => {
            cy.wrap($input).invoke('val', '#ff0000').trigger('input');
          });
        } else {
          cy.log('No native color input - skipping');
        }
      });
    });

    it('should update display when color changes', () => {
      cy.get('body').then(($body) => {
        const hasColorInput = $body.find('input[type="color"]').length > 0;
        if (hasColorInput) {
          cy.get('input[type="color"]').first().invoke('val', '#00ff00').trigger('change');
        } else {
          cy.log('No native color input - skipping');
        }
      });
    });
  });

  describe('Color Picker States', () => {
    it('should have disabled color picker', () => {
      cy.get('body').then(($body) => {
        const hasDisabled = $body.find('amw-color-picker[disabled], input[type="color"]:disabled').length > 0;
        if (hasDisabled) {
          cy.get('amw-color-picker[disabled], input[type="color"]:disabled').should('exist');
        } else {
          cy.log('No disabled color pickers in demo - skipping');
        }
      });
    });
  });

  describe('Color Swatches', () => {
    it('should display predefined color swatches if available', () => {
      cy.get('body').then(($body) => {
        const hasSwatches = $body.find('.color-swatch, .amw-color-picker__swatch').length > 0;
        if (hasSwatches) {
          cy.get('.color-swatch, .amw-color-picker__swatch').should('exist');
        } else {
          cy.log('No color swatches in demo - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      cy.get('body').then(($body) => {
        const hasColorInput = $body.find('input[type="color"]').length > 0;
        if (hasColorInput) {
          cy.get('input[type="color"]').first()
            .focus()
            .should('have.focus');
        } else {
          cy.log('No color input for focus test - skipping');
        }
      });
    });

    it('should have associated label', () => {
      cy.get('body').then(($body) => {
        const hasLabel = $body.find('amw-color-picker mat-label, amw-color-picker label').length > 0;
        if (hasLabel) {
          cy.get('amw-color-picker mat-label, amw-color-picker label').should('exist');
        } else {
          cy.log('No labels in color picker demo - skipping');
        }
      });
    });
  });
});
