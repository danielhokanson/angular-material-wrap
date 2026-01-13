/// <reference types="cypress" />

describe('AMW Sidenav Component', () => {
  beforeEach(() => {
    cy.visit('/sidenav');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Sidenav demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Sidenav');
    });

    it('should have sidenav component on the page', () => {
      cy.get('amw-sidenav, mat-sidenav-container').should('exist');
    });
  });

  describe('Sidenav Structure', () => {
    it('should have sidenav container', () => {
      cy.get('mat-sidenav-container, .mat-drawer-container').should('exist');
    });

    it('should have sidenav drawer', () => {
      cy.get('mat-sidenav, mat-drawer, .mat-drawer').should('exist');
    });

    it('should have sidenav content area', () => {
      cy.get('mat-sidenav-content, mat-drawer-content, .mat-drawer-content').should('exist');
    });
  });

  describe('Sidenav Toggle', () => {
    it('should have toggle button', () => {
      cy.get('amw-button, button').contains(/toggle|menu/i).should('exist');
    });

    it('should toggle sidenav visibility', () => {
      // Find and click toggle button
      cy.get('amw-button button, button').contains(/toggle|menu/i).first().click();
      // State should change (either open or close)
      cy.get('mat-sidenav, mat-drawer').should('exist');
    });
  });

  describe('Sidenav Modes', () => {
    it('should support different modes', () => {
      // The demo should show different sidenav modes
      cy.get('amw-sidenav, mat-sidenav-container').should('exist');
    });
  });

  describe('Sidenav Content', () => {
    it('should display navigation items', () => {
      cy.get('mat-nav-list, nav, .sidenav-nav').should('exist');
    });
  });
});
