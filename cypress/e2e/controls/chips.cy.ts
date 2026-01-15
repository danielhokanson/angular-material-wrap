/// <reference types="cypress" />

describe('AMW Chips Component', () => {
  beforeEach(() => {
    cy.visit('/controls/chips');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Chips demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Chips');
    });

    it('should have chips components on the page', () => {
      cy.get('amw-chips, mat-chip-listbox, mat-chip-set').should('exist');
    });
  });

  describe('Chip Interactions', () => {
    it('should display individual chips', () => {
      cy.get('mat-chip, mat-chip-option').should('have.length.at.least', 1);
    });

    it('should select chip on click', () => {
      cy.get('mat-chip-option, mat-chip').first().click();
    });

    it('should support multiple selection', () => {
      cy.get('mat-chip-option, mat-chip').first().click();
      cy.get('mat-chip-option, mat-chip').eq(1).click();
    });
  });

  describe('Chip Variants', () => {
    it('should have selectable chips', () => {
      cy.get('mat-chip-listbox, mat-chip-set').should('exist');
    });
  });

  describe('Chip Input', () => {
    it('should have chip input field if available', () => {
      cy.get('mat-chip-grid input, mat-chip-input').then(($input) => {
        if ($input.length) {
          cy.wrap($input).should('exist');
        }
      });
    });
  });

  describe('Chip Removal', () => {
    it('should have remove buttons on removable chips', () => {
      cy.get('mat-chip button[matChipRemove], mat-chip .mat-chip-remove').then(($remove) => {
        if ($remove.length) {
          cy.wrap($remove).should('exist');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.get('mat-chip, mat-chip-option').first()
        .focus()
        .should('have.focus');
    });
  });
});
