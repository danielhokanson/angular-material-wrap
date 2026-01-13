/// <reference types="cypress" />

describe('AMW Range Slider Component', () => {
  beforeEach(() => {
    cy.visit('/range-slider');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Range Slider demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Range Slider');
    });

    it('should have range slider components on the page', () => {
      cy.get('amw-range-slider, mat-slider').should('exist');
    });
  });

  describe('Range Slider Structure', () => {
    it('should have two thumbs for range selection', () => {
      cy.get('mat-slider input').should('have.length.at.least', 2);
    });

    it('should display min value thumb', () => {
      cy.get('mat-slider input').first().should('exist');
    });

    it('should display max value thumb', () => {
      cy.get('mat-slider input').last().should('exist');
    });
  });

  describe('Range Slider Interactions', () => {
    it('should change start value with keyboard', () => {
      cy.get('mat-slider input').first()
        .focus()
        .type('{rightarrow}');
    });

    it('should change end value with keyboard', () => {
      cy.get('mat-slider input').last()
        .focus()
        .type('{leftarrow}');
    });
  });

  describe('Range Slider States', () => {
    it('should have disabled range slider', () => {
      cy.get('amw-range-slider[disabled="true"], mat-slider[disabled]').should('exist');
    });
  });

  describe('Range Slider Configuration', () => {
    it('should have min and max attributes', () => {
      cy.get('mat-slider').should('have.attr', 'min');
      cy.get('mat-slider').should('have.attr', 'max');
    });

    it('should have step attribute if configured', () => {
      cy.get('mat-slider[step]').then(($slider) => {
        if ($slider.length) {
          cy.wrap($slider).should('have.attr', 'step');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      cy.get('mat-slider input').first()
        .focus()
        .should('have.focus');
    });

    it('should have proper role', () => {
      cy.get('mat-slider input').first()
        .should('have.attr', 'role', 'slider');
    });
  });
});
