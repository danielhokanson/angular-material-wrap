/// <reference types="cypress" />

describe('AMW Accordion Component', () => {
  beforeEach(() => {
    cy.visit('/components/accordion');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Accordion demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Accordion');
    });

    it('should have accordion components on the page', () => {
      cy.get('amw-accordion, mat-accordion').should('exist');
    });
  });

  describe('Accordion Panels', () => {
    it('should have expandable panels', () => {
      cy.get('mat-expansion-panel, .amw-accordion__panel').should('exist');
    });

    it('should expand panel on header click', () => {
      cy.get('mat-expansion-panel-header, .amw-accordion__panel-header').first().click();
      cy.get('mat-expansion-panel.mat-expanded, .amw-accordion__panel--expanded').should('exist');
    });

    it('should collapse panel when clicking expanded header', () => {
      // First expand
      cy.get('mat-expansion-panel-header').first().click();
      cy.get('mat-expansion-panel.mat-expanded').should('exist');

      // Then collapse
      cy.get('mat-expansion-panel-header').first().click();
      cy.get('mat-expansion-panel').first().should('not.have.class', 'mat-expanded');
    });

    it('should show panel content when expanded', () => {
      cy.get('mat-expansion-panel-header').first().click();
      cy.get('.mat-expansion-panel-body, mat-expansion-panel-content').should('be.visible');
    });
  });

  describe('Accordion Types', () => {
    it('should have multiple accordion panels', () => {
      cy.get('mat-expansion-panel, .amw-accordion__panel').should('have.length.at.least', 1);
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.get('mat-expansion-panel-header').first()
        .focus()
        .should('have.focus');
    });

    it('should expand on Enter key', () => {
      cy.get('mat-expansion-panel-header').first()
        .focus()
        .type('{enter}');
      cy.get('mat-expansion-panel.mat-expanded').should('exist');
    });

    it('should have proper aria attributes', () => {
      cy.get('mat-expansion-panel-header').first()
        .should('have.attr', 'aria-expanded');
    });
  });
});
