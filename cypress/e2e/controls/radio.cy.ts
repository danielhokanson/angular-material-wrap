/// <reference types="cypress" />

describe('AMW Radio Component', () => {
  beforeEach(() => {
    cy.visit('/radio');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Radio demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Radio');
    });

    it('should have radio components on the page', () => {
      cy.get('amw-radio, amw-radio-group').should('exist');
    });
  });

  describe('Radio Interactions', () => {
    it('should select radio on click', () => {
      cy.get('amw-radio:not([disabled]) input:not(:checked)').first().then(($input) => {
        cy.wrap($input).parent().click();
        cy.wrap($input).should('be.checked');
      });
    });

    it('should only allow one selection in a group', () => {
      // Click first radio in group
      cy.get('amw-radio-group amw-radio:not([disabled])').first().click();
      cy.get('amw-radio-group amw-radio:not([disabled])').first().find('input').should('be.checked');

      // Click second radio in same group
      cy.get('amw-radio-group amw-radio:not([disabled])').eq(1).click();
      cy.get('amw-radio-group amw-radio:not([disabled])').eq(1).find('input').should('be.checked');

      // First should no longer be checked
      cy.get('amw-radio-group amw-radio:not([disabled])').first().find('input').should('not.be.checked');
    });
  });

  describe('Radio States', () => {
    it('should display disabled radio', () => {
      cy.get('amw-radio[disabled="true"], amw-radio .mat-mdc-radio-disabled').should('exist');
    });

    it('disabled radio should not be selectable', () => {
      cy.get('amw-radio[disabled="true"]').first().then(($radio) => {
        cy.wrap($radio).click({ force: true });
        cy.wrap($radio).find('input').should('not.be.checked');
      });
    });
  });

  describe('Radio Labels', () => {
    it('should display label text', () => {
      cy.get('amw-radio .mat-mdc-radio-label, amw-radio label').should('exist');
    });

    it('clicking label should select radio', () => {
      cy.get('amw-radio:not([disabled]) .mat-mdc-radio-label').first().click();
      cy.get('amw-radio:not([disabled])').first().find('input').should('be.checked');
    });
  });

  describe('Radio Colors', () => {
    it('should have primary color radio', () => {
      cy.get('amw-radio[color="primary"], amw-radio:not([color])').should('exist');
    });

    it('should have accent color radio', () => {
      cy.get('amw-radio[color="accent"]').should('exist');
    });

    it('should have warn color radio', () => {
      cy.get('amw-radio[color="warn"]').should('exist');
    });
  });

  describe('Radio Group', () => {
    it('should render radio buttons in a group', () => {
      cy.get('amw-radio-group').should('exist');
      cy.get('amw-radio-group amw-radio').should('have.length.greaterThan', 1);
    });

    it('radio group should have proper ARIA role', () => {
      cy.get('amw-radio-group').first().should('have.attr', 'role', 'radiogroup');
    });
  });

  describe('Accessibility', () => {
    it('radio should be keyboard accessible', () => {
      cy.get('amw-radio:not([disabled]) input').first()
        .focus()
        .should('have.focus');
    });

    it('should select with space key', () => {
      cy.get('amw-radio:not([disabled])').first().find('input')
        .focus()
        .type(' ');
      cy.get('amw-radio:not([disabled])').first().find('input').should('be.checked');
    });

    it('should navigate group with arrow keys', () => {
      cy.get('amw-radio-group amw-radio:not([disabled])').first().find('input')
        .focus()
        .type('{downarrow}');
      cy.get('amw-radio-group amw-radio:not([disabled])').eq(1).find('input').should('have.focus');
    });
  });
});
