/// <reference types="cypress" />

describe('AMW Stepper Component', () => {
  beforeEach(() => {
    cy.visit('/stepper');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Stepper demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Stepper');
    });

    it('should have stepper component on the page', () => {
      cy.get('mat-stepper, mat-horizontal-stepper, mat-vertical-stepper').should('exist');
    });
  });

  describe('Stepper Steps', () => {
    it('should have multiple steps', () => {
      cy.get('mat-step').should('have.length.at.least', 2);
    });

    it('should show step headers', () => {
      cy.get('.mat-step-header, mat-step-header').should('exist');
    });

    it('should show active step indicator', () => {
      cy.get('.mat-step-icon-selected, .mat-step-icon-state-number').should('exist');
    });
  });

  describe('Stepper Navigation', () => {
    it('should navigate to next step', () => {
      cy.get('button').contains(/next|continue/i).first().click();
      cy.get('.mat-step-header[aria-selected="true"]').should('exist');
    });

    it('should navigate to previous step', () => {
      // Go to step 2 first
      cy.get('button').contains(/next|continue/i).first().click();
      cy.waitForAngular();

      // Then go back
      cy.get('button').contains(/back|previous/i).first().click();
    });

    it('should allow clicking on step header to navigate', () => {
      cy.get('.mat-step-header').eq(1).click();
    });
  });

  describe('Stepper Content', () => {
    it('should display step content', () => {
      cy.get('.mat-step-content, mat-step-content').should('exist');
    });

    it('should show form fields in steps', () => {
      cy.get('mat-step').first().within(() => {
        cy.get('input, mat-form-field, amw-input').should('exist');
      });
    });
  });

  describe('Stepper Types', () => {
    it('should have horizontal or vertical orientation', () => {
      cy.get('mat-horizontal-stepper, mat-vertical-stepper, mat-stepper').should('exist');
    });
  });
});
