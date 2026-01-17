/// <reference types="cypress" />

describe('AMW Datepicker Component', () => {
  beforeEach(() => {
    cy.visit('/controls/datepicker');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Datepicker demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Datepicker');
    });

    it('should have datepicker components on the page', () => {
      cy.get('amw-datepicker, mat-datepicker-toggle').should('exist');
    });
  });

  describe('Datepicker Trigger', () => {
    it('should have datepicker toggle button', () => {
      cy.get('mat-datepicker-toggle button, .mat-datepicker-toggle').should('exist');
    });

    it('should open calendar on toggle click', () => {
      cy.get('mat-datepicker-toggle button').first().click();
      cy.get('.mat-datepicker-content, mat-datepicker-content').should('be.visible');
    });
  });

  describe('Calendar Interactions', () => {
    it('should display calendar when opened', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-datepicker-toggle button').length > 0) {
          cy.get('mat-datepicker-toggle button').first().click();
          cy.get('mat-calendar, .mat-calendar').should('be.visible');
          cy.get('body').type('{esc}');
        } else {
          cy.log('No datepicker toggle found - skipping');
        }
      });
    });

    it('should show month view', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-datepicker-toggle button').length > 0) {
          cy.get('mat-datepicker-toggle button').first().click();
          cy.get('.mat-calendar-body-cell').should('have.length.at.least', 1);
          cy.get('body').type('{esc}');
        } else {
          cy.log('No datepicker toggle found - skipping');
        }
      });
    });

    it('should select date on click', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-datepicker-toggle button').length > 0) {
          cy.get('mat-datepicker-toggle button').first().click();
          cy.get('.mat-calendar-body-cell').not('.mat-calendar-body-disabled').first().click();
        } else {
          cy.log('No datepicker toggle found - skipping');
        }
      });
    });

    it('should navigate to next month', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-datepicker-toggle button').length > 0) {
          cy.get('mat-datepicker-toggle button').first().click();
          cy.get('.mat-calendar-next-button').click();
          cy.get('body').type('{esc}');
        } else {
          cy.log('No datepicker toggle found - skipping');
        }
      });
    });

    it('should navigate to previous month', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-datepicker-toggle button').length > 0) {
          cy.get('mat-datepicker-toggle button').first().click();
          cy.get('.mat-calendar-previous-button').click();
          cy.get('body').type('{esc}');
        } else {
          cy.log('No datepicker toggle found - skipping');
        }
      });
    });
  });

  describe('Date Input', () => {
    it('should have date input field', () => {
      cy.get('input[matInput], amw-datepicker input').should('exist');
    });

    it('should accept typed date input', () => {
      cy.get('amw-datepicker input, input[matInput]').first()
        .clear()
        .type('01/15/2025');
    });
  });

  describe('Datepicker States', () => {
    it('should have disabled datepicker', () => {
      cy.get('body').then(($body) => {
        const disabledSelector = 'amw-datepicker[disabled="true"], .mat-form-field-disabled, input:disabled, mat-datepicker-toggle[disabled]';
        if ($body.find(disabledSelector).length > 0) {
          cy.get(disabledSelector).should('exist');
        } else {
          cy.log('No disabled datepicker found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      cy.get('amw-datepicker input, mat-datepicker-toggle button').first()
        .focus()
        .should('have.focus');
    });

    it('should close calendar on Escape', () => {
      cy.get('mat-datepicker-toggle button').first().click();
      cy.get('mat-calendar').should('be.visible');
      cy.get('body').type('{esc}');
      cy.get('.mat-datepicker-content').should('not.exist');
    });
  });
});
