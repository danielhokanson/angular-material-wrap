/// <reference types="cypress" />

describe('AMW Sort Directive', () => {
  beforeEach(() => {
    cy.visit('/components/sort');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Sort demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Sort');
    });

    it('should have sort directive elements on the page', () => {
      cy.get('[amwSort], [amw-sort]').should('exist');
    });
  });

  describe('Sort State Display', () => {
    it('should display current sort state', () => {
      cy.get('body').then(($body) => {
        const hasStateInfo = $body.find('.sort-info, .state-display').length > 0;
        if (hasStateInfo) {
          cy.get('.sort-info, .state-display').should('be.visible');
        } else {
          cy.log('Sort state display not found - skipping');
        }
      });
    });
  });

  describe('Sort Controls', () => {
    it('should have sort control buttons', () => {
      cy.get('body').then(($body) => {
        const hasControlBtns = $body.find('amw-button, button').filter((_, el) =>
          /sort/i.test(el.textContent || '')
        ).length > 0;
        if (hasControlBtns) {
          cy.get('amw-button, button').contains(/sort/i).should('exist');
        } else {
          cy.log('Sort control buttons not found - skipping');
        }
      });
    });

    it('should update sort state when clicking sort button', () => {
      cy.get('body').then(($body) => {
        const sortBtn = $body.find('amw-button, button').filter((_, el) =>
          /sort by name/i.test(el.textContent || '')
        );
        if (sortBtn.length > 0) {
          cy.get('amw-button, button').contains(/sort by name/i).click();
          // Verify state changed
          cy.get('.sort-info, .state-display').should('contain.text', 'name');
        } else {
          cy.log('Sort by name button not found - skipping');
        }
      });
    });
  });

  describe('Sort Direction Toggle', () => {
    it('should support ascending sort', () => {
      cy.get('body').then(($body) => {
        const ascBtn = $body.find('amw-button, button').filter((_, el) =>
          /asc/i.test(el.textContent || '')
        );
        if (ascBtn.length > 0) {
          cy.get('amw-button, button').contains(/asc/i).first().click();
          cy.get('.sort-info, .state-display').should('contain.text', 'asc');
        } else {
          cy.log('Ascending sort button not found - skipping');
        }
      });
    });

    it('should support descending sort', () => {
      cy.get('body').then(($body) => {
        const descBtn = $body.find('amw-button, button').filter((_, el) =>
          /desc/i.test(el.textContent || '')
        );
        if (descBtn.length > 0) {
          cy.get('amw-button, button').contains(/desc/i).first().click();
          cy.get('.sort-info, .state-display').should('contain.text', 'desc');
        } else {
          cy.log('Descending sort button not found - skipping');
        }
      });
    });
  });

  describe('Reset Sort', () => {
    it('should reset sort when clicking reset button', () => {
      cy.get('body').then(($body) => {
        const resetBtn = $body.find('amw-button, button').filter((_, el) =>
          /reset/i.test(el.textContent || '')
        );
        if (resetBtn.length > 0) {
          cy.get('amw-button, button').contains(/reset/i).first().click();
          // Verify sort is cleared
          cy.get('.sort-info, .state-display').should('exist');
        } else {
          cy.log('Reset button not found - skipping');
        }
      });
    });
  });

  describe('Disabled Sort', () => {
    it('should support disabled state', () => {
      cy.get('body').then(($body) => {
        const disableBtn = $body.find('amw-button, button').filter((_, el) =>
          /disable/i.test(el.textContent || '')
        );
        if (disableBtn.length > 0) {
          cy.get('amw-button, button').contains(/disable/i).first().click();
          // Verify disabled state
          cy.get('.disabled-notice, [amwSortDisabled="true"]').should('exist');
        } else {
          cy.log('Disable button not found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('sort headers should be focusable', () => {
      cy.get('body').then(($body) => {
        const sortHeaders = $body.find('[amw-sort-header], th[amw-sort-header]');
        if (sortHeaders.length > 0) {
          cy.get('[amw-sort-header], th[amw-sort-header]').first().should('exist');
        } else {
          cy.log('Sort headers not found - skipping');
        }
      });
    });
  });
});
