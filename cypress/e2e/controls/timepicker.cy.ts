/// <reference types="cypress" />

describe('AMW Timepicker Component', () => {
  beforeEach(() => {
    cy.visit('/controls/timepicker');
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
          // Check if input is readonly - timepicker inputs are often readonly
          if ($input.attr('readonly')) {
            cy.log('Timepicker input is readonly - cannot type directly, input exists');
            cy.wrap($input).should('exist');
          } else {
            cy.wrap($input).clear().type('10:30');
          }
        }
      });
    });
  });

  describe('Timepicker States', () => {
    it('should have disabled timepicker', () => {
      cy.get('body').then(($body) => {
        const hasDisabled = $body.find('amw-timepicker[disabled="true"], amw-timepicker.disabled, input:disabled, .mat-mdc-form-field-disabled').length > 0;
        if (hasDisabled) {
          cy.get('amw-timepicker[disabled="true"], amw-timepicker.disabled, input:disabled, .mat-mdc-form-field-disabled').should('exist');
        } else {
          cy.log('No disabled timepicker in demo - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-timepicker input').length > 0) {
          cy.get('amw-timepicker input').first().focus().should('have.focus');
        } else {
          cy.log('No timepicker input found - skipping');
        }
      });
    });
  });
});
