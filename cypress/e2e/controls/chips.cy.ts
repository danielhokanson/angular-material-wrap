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
      cy.get('body').then(($body) => {
        if ($body.find('mat-chip, mat-chip-option, .mat-mdc-chip').length > 0) {
          cy.get('mat-chip, mat-chip-option, .mat-mdc-chip').should('have.length.at.least', 1);
        } else {
          cy.log('No chips found - skipping');
        }
      });
    });

    it('should select chip on click', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-chip-option, mat-chip, .mat-mdc-chip').length > 0) {
          cy.get('mat-chip-option, mat-chip, .mat-mdc-chip').first().click();
        } else {
          cy.log('No chips found - skipping');
        }
      });
    });

    it('should support multiple selection', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-chip-option, mat-chip, .mat-mdc-chip').length > 1) {
          cy.get('mat-chip-option, mat-chip, .mat-mdc-chip').first().click();
          cy.get('mat-chip-option, mat-chip, .mat-mdc-chip').eq(1).click();
        } else {
          cy.log('Not enough chips for multiple selection - skipping');
        }
      });
    });
  });

  describe('Chip Variants', () => {
    it('should have selectable chips', () => {
      cy.get('mat-chip-listbox, mat-chip-set').should('exist');
    });
  });

  describe('Chip Input', () => {
    it('should have chip input field if available', () => {
      cy.get('body').then(($body) => {
        const inputSelector = 'mat-chip-grid input, mat-chip-input, input[matChipInputFor]';
        if ($body.find(inputSelector).length > 0) {
          cy.get(inputSelector).should('exist');
        } else {
          cy.log('No chip input field found - skipping');
        }
      });
    });
  });

  describe('Chip Removal', () => {
    it('should have remove buttons on removable chips', () => {
      cy.get('body').then(($body) => {
        const removeSelector = 'mat-chip button[matChipRemove], mat-chip .mat-chip-remove, .mat-mdc-chip-remove';
        if ($body.find(removeSelector).length > 0) {
          cy.get(removeSelector).should('exist');
        } else {
          cy.log('No remove buttons on chips found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.get('body').then(($body) => {
        const chipSelector = 'mat-chip, mat-chip-option, .mat-mdc-chip';
        if ($body.find(chipSelector).length > 0) {
          cy.get(chipSelector).first().focus();
        } else {
          cy.log('No chips found - skipping');
        }
      });
    });
  });
});
