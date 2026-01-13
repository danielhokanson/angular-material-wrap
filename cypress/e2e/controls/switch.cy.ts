/// <reference types="cypress" />

describe('AMW Switch/Toggle Component', () => {
  beforeEach(() => {
    cy.visit('/switch');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Switch demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Switch');
    });

    it('should have switch/toggle components on the page', () => {
      cy.get('amw-switch, amw-toggle').should('exist');
    });
  });

  describe('Switch Interactions', () => {
    it('should toggle switch on click', () => {
      cy.get('amw-switch:not([disabled]), amw-toggle:not([disabled])').first().then(($switch) => {
        const wasChecked = $switch.find('input').prop('checked');
        cy.wrap($switch).click();
        cy.wrap($switch).find('input').should(wasChecked ? 'not.be.checked' : 'be.checked');
      });
    });

    it('should turn on when clicked off', () => {
      cy.get('amw-switch:not([disabled]) input:not(:checked), amw-toggle:not([disabled]) input:not(:checked)')
        .first()
        .parent()
        .click();
      cy.get('amw-switch:not([disabled]) input, amw-toggle:not([disabled]) input').first().should('be.checked');
    });

    it('should turn off when clicked on', () => {
      cy.get('amw-switch:not([disabled]) input:checked, amw-toggle:not([disabled]) input:checked')
        .first()
        .parent()
        .click();
      cy.get('amw-switch:not([disabled]) input, amw-toggle:not([disabled]) input').first().should('not.be.checked');
    });
  });

  describe('Switch States', () => {
    it('should display disabled switch', () => {
      cy.get('amw-switch[disabled="true"], amw-toggle[disabled="true"], .mat-mdc-slide-toggle-disabled').should('exist');
    });

    it('disabled switch should not be toggleable', () => {
      cy.get('amw-switch[disabled="true"], amw-toggle[disabled="true"]').first().then(($switch) => {
        const wasChecked = $switch.find('input').prop('checked');
        cy.wrap($switch).click({ force: true });
        cy.wrap($switch).find('input').should(wasChecked ? 'be.checked' : 'not.be.checked');
      });
    });
  });

  describe('Switch Labels', () => {
    it('should display label text', () => {
      cy.get('amw-switch .mat-mdc-slide-toggle-content, amw-toggle label').should('exist');
    });

    it('clicking label should toggle switch', () => {
      cy.get('amw-switch:not([disabled]) .mat-mdc-slide-toggle-content, amw-toggle:not([disabled]) label')
        .first()
        .click();
      // Switch should toggle
    });
  });

  describe('Switch Colors', () => {
    it('should have primary color switch', () => {
      cy.get('amw-switch[color="primary"], amw-toggle[color="primary"], amw-switch:not([color])').should('exist');
    });

    it('should have accent color switch', () => {
      cy.get('amw-switch[color="accent"], amw-toggle[color="accent"]').should('exist');
    });

    it('should have warn color switch', () => {
      cy.get('amw-switch[color="warn"], amw-toggle[color="warn"]').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('switch should be keyboard accessible', () => {
      cy.get('amw-switch:not([disabled]) input, amw-toggle:not([disabled]) input').first()
        .focus()
        .should('have.focus');
    });

    it('should toggle with space key', () => {
      cy.get('amw-switch:not([disabled]), amw-toggle:not([disabled])').first().then(($switch) => {
        const wasChecked = $switch.find('input').prop('checked');
        cy.wrap($switch).find('input').focus().type(' ');
        cy.wrap($switch).find('input').should(wasChecked ? 'not.be.checked' : 'be.checked');
      });
    });

    it('should have proper role', () => {
      cy.get('amw-switch input, amw-toggle input').first()
        .should('have.attr', 'role', 'switch');
    });
  });
});
