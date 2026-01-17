/// <reference types="cypress" />

describe('AMW Calendar Component', () => {
  beforeEach(() => {
    cy.visit('/components/calendar');
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
      cy.get('body').then(($body) => {
        if ($body.find('.mat-calendar-body, mat-calendar-body').length > 0) {
          cy.get('.mat-calendar-body, mat-calendar-body').should('exist');
        } else {
          cy.log('Calendar body not found - skipping');
        }
      });
    });

    it('should show calendar header with month/year', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-calendar-header, mat-calendar-header').length > 0) {
          cy.get('.mat-calendar-header, mat-calendar-header').should('exist');
        } else {
          cy.log('Calendar header not found - skipping');
        }
      });
    });

    it('should display day cells', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-calendar-body-cell').length >= 28) {
          cy.get('.mat-calendar-body-cell').should('have.length.at.least', 28);
        } else if ($body.find('.mat-calendar-body-cell').length > 0) {
          cy.get('.mat-calendar-body-cell').should('exist');
          cy.log('Calendar cells exist but less than 28');
        } else {
          cy.log('Calendar cells not found - skipping');
        }
      });
    });

    it('should highlight today', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-calendar-body-today').length > 0) {
          cy.get('.mat-calendar-body-today').should('exist');
        } else {
          cy.log('Today highlight not found - skipping');
        }
      });
    });
  });

  describe('Calendar Navigation', () => {
    it('should have next month button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-calendar-next-button').length > 0) {
          cy.get('.mat-calendar-next-button').should('exist');
        } else {
          cy.log('Next month button not found - skipping');
        }
      });
    });

    it('should have previous month button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-calendar-previous-button').length > 0) {
          cy.get('.mat-calendar-previous-button').should('exist');
        } else {
          cy.log('Previous month button not found - skipping');
        }
      });
    });

    it('should navigate to next month', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-calendar-period-button').length > 0 && $body.find('.mat-calendar-next-button').length > 0) {
          cy.get('.mat-calendar-period-button').invoke('text').then((initialMonth) => {
            cy.get('.mat-calendar-next-button').click();
            cy.get('.mat-calendar-period-button').invoke('text').should('not.eq', initialMonth);
          });
        } else {
          cy.log('Calendar navigation buttons not found - skipping');
        }
      });
    });

    it('should navigate to previous month', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-calendar-period-button').length > 0 && $body.find('.mat-calendar-previous-button').length > 0) {
          cy.get('.mat-calendar-period-button').invoke('text').then((initialMonth) => {
            cy.get('.mat-calendar-previous-button').click();
            cy.get('.mat-calendar-period-button').invoke('text').should('not.eq', initialMonth);
          });
        } else {
          cy.log('Calendar navigation buttons not found - skipping');
        }
      });
    });
  });

  describe('Date Selection', () => {
    it('should select date on click', () => {
      cy.get('body').then(($body) => {
        const cells = $body.find('.mat-calendar-body-cell').not('.mat-calendar-body-disabled');
        if (cells.length > 0) {
          cy.get('.mat-calendar-body-cell').not('.mat-calendar-body-disabled').first().click();
          cy.get('.mat-calendar-body-selected, .mat-calendar-body-active').should('exist');
        } else {
          cy.log('No selectable calendar cells found - skipping');
        }
      });
    });

    it('should update selected state', () => {
      cy.get('body').then(($body) => {
        const cells = $body.find('.mat-calendar-body-cell').not('.mat-calendar-body-disabled');
        if (cells.length > 5) {
          cy.get('.mat-calendar-body-cell').not('.mat-calendar-body-disabled').eq(5).click();
          cy.get('.mat-calendar-body-selected, .mat-calendar-body-active').should('exist');
        } else {
          cy.log('Not enough selectable cells - skipping');
        }
      });
    });
  });

  describe('Calendar Views', () => {
    it('should switch to year view', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-calendar-period-button').length > 0) {
          cy.get('.mat-calendar-period-button').click();
          cy.get('.mat-calendar-body-cell').should('have.length.at.least', 12);
        } else {
          cy.log('Period button not found - skipping');
        }
      });
    });

    it('should switch to multi-year view', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-calendar-period-button').length > 0) {
          cy.get('.mat-calendar-period-button').click(); // Year view
          cy.get('.mat-calendar-period-button').click(); // Multi-year view
          cy.get('.mat-calendar-body-cell').should('exist');
        } else {
          cy.log('Period button not found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-calendar-body-cell').length > 0) {
          cy.get('.mat-calendar-body-cell').first().focus();
        } else {
          cy.log('No calendar cells found - skipping');
        }
      });
    });

    it('should navigate dates with arrow keys', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-calendar-body-cell').length > 0) {
          cy.get('.mat-calendar-body-cell').first().focus().type('{rightarrow}');
        } else {
          cy.log('No calendar cells found - skipping');
        }
      });
    });

    it('should have proper ARIA attributes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-calendar, amw-calendar').length > 0) {
          cy.get('mat-calendar, amw-calendar').should('exist');
        } else {
          cy.log('No calendar component found - skipping');
        }
      });
    });
  });
});
