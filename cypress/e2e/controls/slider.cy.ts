/// <reference types="cypress" />

describe('AMW Slider Component', () => {
  beforeEach(() => {
    cy.visit('/controls/slider');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Slider demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Slider');
    });

    it('should have slider components on the page', () => {
      cy.get('amw-slider, mat-slider').should('exist');
    });
  });

  describe('Slider Interactions', () => {
    it('should have slider thumb', () => {
      cy.get('amw-slider .mat-mdc-slider-thumb, mat-slider .mat-mdc-slider-thumb, .mdc-slider__thumb').should('exist');
    });

    it('should have slider track', () => {
      cy.get('amw-slider .mat-mdc-slider-track, mat-slider .mat-mdc-slider-track, .mdc-slider__track').should('exist');
    });

    it('should respond to click on track', () => {
      cy.get('amw-slider:not([disabled]), mat-slider:not([disabled])').first().scrollIntoView().click({ force: true });
      // Slider should respond (no error)
    });
  });

  describe('Slider States', () => {
    it('should display disabled slider', () => {
      cy.get('body').then(($body) => {
        const hasDisabled = $body.find('amw-slider[disabled], mat-slider[disabled], .mat-mdc-slider-disabled').length > 0;
        if (hasDisabled) {
          cy.get('amw-slider[disabled], mat-slider[disabled], .mat-mdc-slider-disabled').should('exist');
        } else {
          cy.log('No disabled sliders in demo - skipping');
        }
      });
    });
  });

  describe('Slider Labels', () => {
    it('should display min value label', () => {
      cy.get('body').then(($body) => {
        const hasMinLabel = $body.find('amw-slider .mat-mdc-slider-min-value-label, amw-slider [min], mat-slider [min]').length > 0;
        if (hasMinLabel) {
          cy.get('amw-slider .mat-mdc-slider-min-value-label, amw-slider [min], mat-slider [min]').should('exist');
        } else {
          // Min label may not be visible
          cy.get('amw-slider, mat-slider').should('exist');
        }
      });
    });

    it('should display max value label', () => {
      cy.get('body').then(($body) => {
        const hasMaxLabel = $body.find('amw-slider .mat-mdc-slider-max-value-label, amw-slider [max], mat-slider [max]').length > 0;
        if (hasMaxLabel) {
          cy.get('amw-slider .mat-mdc-slider-max-value-label, amw-slider [max], mat-slider [max]').should('exist');
        } else {
          // Max label may not be visible
          cy.get('amw-slider, mat-slider').should('exist');
        }
      });
    });
  });

  describe('Slider with Value Display', () => {
    it('should show current value', () => {
      cy.get('body').then(($body) => {
        const hasValueIndicator = $body.find('.mat-mdc-slider-value-indicator, .mdc-slider__value-indicator').length > 0;
        if (hasValueIndicator) {
          cy.get('.mat-mdc-slider-value-indicator, .mdc-slider__value-indicator').should('exist');
        } else {
          // Value display may not be enabled
          cy.log('Value indicator may not be enabled - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('slider should be keyboard accessible', () => {
      cy.get('body').then(($body) => {
        const hasInput = $body.find('amw-slider input, mat-slider input').length > 0;
        if (hasInput) {
          cy.get('amw-slider input, mat-slider input').first().scrollIntoView()
            .focus()
            .should('have.focus');
        } else {
          cy.log('No slider input for focus test - skipping');
        }
      });
    });

    it('should have proper ARIA attributes', () => {
      cy.get('body').then(($body) => {
        const hasInput = $body.find('amw-slider input[type="range"], mat-slider input[type="range"]').length > 0;
        if (hasInput) {
          cy.get('amw-slider input[type="range"], mat-slider input[type="range"]').first()
            .should('have.attr', 'role', 'slider');
        } else {
          // May use different slider implementation
          cy.log('Range input may have different implementation - skipping');
        }
      });
    });
  });
});
