/// <reference types="cypress" />

describe('AMW Toggle Component', () => {
  beforeEach(() => {
    cy.visit('/toggle');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Toggle demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Toggle');
    });

    it('should have toggle components on the page', () => {
      cy.get('amw-toggle, mat-button-toggle-group').should('exist');
    });
  });

  describe('Toggle Group', () => {
    it('should have toggle buttons', () => {
      cy.get('mat-button-toggle, .mat-button-toggle').should('have.length.at.least', 1);
    });

    it('should select toggle on click', () => {
      cy.get('mat-button-toggle').first().click();
      cy.get('mat-button-toggle.mat-button-toggle-checked').should('exist');
    });

    it('should support exclusive selection', () => {
      // Click first toggle
      cy.get('mat-button-toggle').first().click();
      cy.get('mat-button-toggle.mat-button-toggle-checked').should('have.length', 1);

      // Click second toggle
      cy.get('mat-button-toggle').eq(1).click();
      cy.get('mat-button-toggle.mat-button-toggle-checked').should('have.length', 1);
    });
  });

  describe('Toggle States', () => {
    it('should have disabled toggle', () => {
      cy.get('mat-button-toggle[disabled], mat-button-toggle-group[disabled]').should('exist');
    });
  });

  describe('Toggle Appearance', () => {
    it('should support different appearances', () => {
      cy.get('mat-button-toggle-group').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.get('mat-button-toggle button').first()
        .focus()
        .should('have.focus');
    });

    it('should have proper role', () => {
      cy.get('mat-button-toggle-group').should('have.attr', 'role');
    });
  });
});
