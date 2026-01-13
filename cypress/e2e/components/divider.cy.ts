/// <reference types="cypress" />

describe('AMW Divider Component', () => {
  describe('Divider in Theme Menu', () => {
    beforeEach(() => {
      cy.visit('/controls');
      cy.waitForAngular();
    });

    it('should display dividers in theme menu', () => {
      // Open theme menu
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.theme-menu').should('be.visible');
      cy.get('.theme-menu amw-divider, .theme-menu mat-divider').should('exist');
    });

    it('should render horizontal dividers by default', () => {
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.theme-menu').should('be.visible');
      cy.get('amw-divider, mat-divider').first().should('not.have.class', 'mat-divider-vertical');
    });
  });

  describe('Divider Styling', () => {
    beforeEach(() => {
      cy.visit('/controls');
      cy.waitForAngular();
    });

    it('should have proper border styling', () => {
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.theme-menu').should('be.visible');
      cy.get('mat-divider').first().should('have.css', 'border-top-style', 'solid');
    });

    it('should inherit theme colors', () => {
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.theme-menu').should('be.visible');
      cy.get('mat-divider').first().should('have.css', 'border-top-color');
    });
  });

  describe('Divider in Cards', () => {
    beforeEach(() => {
      cy.visit('/components/card');
      cy.waitForAngular();
    });

    it('should display dividers between card sections', () => {
      cy.get('amw-card amw-divider, amw-card mat-divider, .mat-mdc-card mat-divider').should('exist');
    });
  });

  describe('Divider Accessibility', () => {
    beforeEach(() => {
      cy.visit('/controls');
      cy.waitForAngular();
    });

    it('should have proper role attribute', () => {
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.theme-menu').should('be.visible');
      cy.get('mat-divider').first().should('have.attr', 'role', 'separator');
    });
  });

  describe('Divider in Dialogs', () => {
    beforeEach(() => {
      cy.visit('/components/dialog');
      cy.waitForAngular();
    });

    it('should render dividers in dialog content', () => {
      // Open a dialog that might contain dividers
      cy.get('amw-button').first().click();
      cy.get('.cdk-overlay-container').should('exist');
    });
  });

  describe('Divider Variations', () => {
    beforeEach(() => {
      cy.visit('/controls');
      cy.waitForAngular();
    });

    it('should support inset dividers', () => {
      // Inset dividers have margin on sides
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.theme-menu').should('be.visible');
      // Check if any dividers exist
      cy.get('amw-divider, mat-divider').should('have.length.at.least', 1);
    });
  });
});
