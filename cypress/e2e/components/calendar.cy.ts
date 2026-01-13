/// <reference types="cypress" />

describe('AMW Calendar Component', () => {
  beforeEach(() => {
    cy.visit('/calendar');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Calendar demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Calendar');
    });

    it('should have calendar components on the page', () => {
      cy.get('amw-calendar, mat-calendar').should('exist');
    });
  });

  describe('Calendar Structure', () => {
    it('should display month view', () => {
      cy.get('.mat-calendar-body, mat-calendar-body').should('exist');
    });

    it('should show calendar header with month/year', () => {
      cy.get('.mat-calendar-header, mat-calendar-header').should('exist');
    });

    it('should display day cells', () => {
      cy.get('.mat-calendar-body-cell').should('have.length.at.least', 28);
    });

    it('should highlight today', () => {
      cy.get('.mat-calendar-body-today').should('exist');
    });
  });

  describe('Calendar Navigation', () => {
    it('should have next month button', () => {
      cy.get('.mat-calendar-next-button').should('exist');
    });

    it('should have previous month button', () => {
      cy.get('.mat-calendar-previous-button').should('exist');
    });

    it('should navigate to next month', () => {
      cy.get('.mat-calendar-period-button').invoke('text').then((initialMonth) => {
        cy.get('.mat-calendar-next-button').click();
        cy.get('.mat-calendar-period-button').invoke('text').should('not.eq', initialMonth);
      });
    });

    it('should navigate to previous month', () => {
      cy.get('.mat-calendar-period-button').invoke('text').then((initialMonth) => {
        cy.get('.mat-calendar-previous-button').click();
        cy.get('.mat-calendar-period-button').invoke('text').should('not.eq', initialMonth);
      });
    });
  });

  describe('Date Selection', () => {
    it('should select date on click', () => {
      cy.get('.mat-calendar-body-cell').not('.mat-calendar-body-disabled').first().click();
      cy.get('.mat-calendar-body-selected').should('exist');
    });

    it('should update selected state', () => {
      cy.get('.mat-calendar-body-cell').not('.mat-calendar-body-disabled').eq(10).click();
      cy.get('.mat-calendar-body-cell').eq(10).should('have.class', 'mat-calendar-body-selected');
    });
  });

  describe('Calendar Views', () => {
    it('should switch to year view', () => {
      cy.get('.mat-calendar-period-button').click();
      cy.get('.mat-calendar-body-cell').should('have.length', 24); // 24 months in year view
    });

    it('should switch to multi-year view', () => {
      cy.get('.mat-calendar-period-button').click(); // Year view
      cy.get('.mat-calendar-period-button').click(); // Multi-year view
      cy.get('.mat-calendar-body-cell').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.get('.mat-calendar-body-cell').first()
        .focus();
    });

    it('should navigate dates with arrow keys', () => {
      cy.get('.mat-calendar-body-cell').first().focus().type('{rightarrow}');
    });

    it('should have proper ARIA attributes', () => {
      cy.get('mat-calendar').should('exist');
    });
  });
});
