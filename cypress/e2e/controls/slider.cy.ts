/// <reference types="cypress" />

describe('AMW Slider Component', () => {
  beforeEach(() => {
    cy.visit('/slider');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Slider demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Slider');
    });

    it('should have slider components on the page', () => {
      cy.get('amw-slider').should('exist');
    });
  });

  describe('Slider Interactions', () => {
    it('should have slider thumb', () => {
      cy.get('amw-slider .mat-mdc-slider-thumb, amw-slider .mdc-slider__thumb').should('exist');
    });

    it('should have slider track', () => {
      cy.get('amw-slider .mat-mdc-slider-track, amw-slider .mdc-slider__track').should('exist');
    });

    it('should respond to click on track', () => {
      cy.get('amw-slider:not([disabled])').first().click();
      // Slider should respond (no error)
    });
  });

  describe('Slider States', () => {
    it('should display disabled slider', () => {
      cy.get('amw-slider[disabled="true"], amw-slider .mat-mdc-slider-disabled').should('exist');
    });
  });

  describe('Slider Labels', () => {
    it('should display min value label', () => {
      cy.get('amw-slider .mat-mdc-slider-min-value-label, amw-slider [min]').should('exist');
    });

    it('should display max value label', () => {
      cy.get('amw-slider .mat-mdc-slider-max-value-label, amw-slider [max]').should('exist');
    });
  });

  describe('Slider with Value Display', () => {
    it('should show current value', () => {
      cy.get('amw-slider .mat-mdc-slider-value-indicator, amw-slider .mdc-slider__value-indicator').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('slider should be keyboard accessible', () => {
      cy.get('amw-slider:not([disabled]) input').first()
        .focus()
        .should('have.focus');
    });

    it('should have proper ARIA attributes', () => {
      cy.get('amw-slider input[type="range"]').first()
        .should('have.attr', 'role', 'slider');
    });
  });
});
