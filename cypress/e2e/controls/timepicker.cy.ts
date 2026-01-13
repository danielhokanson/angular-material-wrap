/// <reference types="cypress" />

describe('AMW Timepicker Component', () => {
  beforeEach(() => {
    cy.visit('/timepicker');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Timepicker demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Timepicker');
    });

    it('should have timepicker components on the page', () => {
      cy.get('amw-timepicker, mat-timepicker-toggle').should('exist');
    });
  });

  describe('Timepicker Trigger', () => {
    it('should have timepicker toggle button', () => {
      cy.get('mat-timepicker-toggle button, amw-timepicker button').then(($toggle) => {
        if ($toggle.length) {
          cy.wrap($toggle).should('exist');
        }
      });
    });
  });

  describe('Time Input', () => {
    it('should have time input field', () => {
      cy.get('amw-timepicker input, input[type="time"]').should('exist');
    });

    it('should accept typed time input', () => {
      cy.get('amw-timepicker input').first().then(($input) => {
        if ($input.length) {
          cy.wrap($input).clear().type('10:30');
        }
      });
    });
  });

  describe('Timepicker States', () => {
    it('should have disabled timepicker', () => {
      cy.get('amw-timepicker[disabled="true"], input:disabled').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      cy.get('amw-timepicker input').first()
        .focus()
        .should('have.focus');
    });
  });
});
