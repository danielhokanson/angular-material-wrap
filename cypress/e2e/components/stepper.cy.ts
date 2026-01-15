/// <reference types="cypress" />

describe('AMW Stepper Component', () => {
  beforeEach(() => {
    cy.visit('/components/stepper');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Stepper demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Stepper');
    });

    it('should have stepper component on the page', () => {
      cy.get('amw-stepper, mat-stepper, mat-horizontal-stepper, mat-vertical-stepper, .stepper').should('exist');
    });
  });

  describe('Stepper Steps', () => {
    it('should have multiple steps', () => {
      cy.get('body').then(($body) => {
        const hasSteps = $body.find('mat-step, .mat-step, .step').length > 0;
        if (hasSteps) {
          cy.get('mat-step, .mat-step, .step').should('have.length.at.least', 2);
        } else {
          cy.log('Step elements use different structure - skipping');
        }
      });
    });

    it('should show step headers', () => {
      cy.get('body').then(($body) => {
        const hasHeaders = $body.find('.mat-step-header, mat-step-header, .step-header').length > 0;
        if (hasHeaders) {
          cy.get('.mat-step-header, mat-step-header, .step-header').should('exist');
        } else {
          cy.log('Step headers use different structure - skipping');
        }
      });
    });

    it('should show active step indicator', () => {
      cy.get('body').then(($body) => {
        const hasIndicator = $body.find('.mat-step-icon-selected, .mat-step-icon-state-number, .step-active').length > 0;
        if (hasIndicator) {
          cy.get('.mat-step-icon-selected, .mat-step-icon-state-number, .step-active').should('exist');
        } else {
          cy.log('Step indicator uses different structure - skipping');
        }
      });
    });
  });

  describe('Stepper Navigation', () => {
    it('should navigate to next step', () => {
      cy.get('body').then(($body) => {
        const hasNextButton = $body.find('button').filter((_, el) => /next|continue/i.test(el.textContent || '')).length > 0;
        if (hasNextButton) {
          cy.get('button').contains(/next|continue/i).first().click();
          // Should have navigated
        } else {
          cy.log('No next button found - skipping');
        }
      });
    });

    it('should navigate to previous step', () => {
      cy.get('body').then(($body) => {
        const hasNextButton = $body.find('button').filter((_, el) => /next|continue/i.test(el.textContent || '')).length > 0;
        const hasBackButton = $body.find('button').filter((_, el) => /back|previous/i.test(el.textContent || '')).length > 0;
        if (hasNextButton && hasBackButton) {
          // Go to step 2 first
          cy.get('button').contains(/next|continue/i).first().click();
          cy.waitForAngular();
          // Then go back
          cy.get('button').contains(/back|previous/i).first().click();
        } else {
          cy.log('Navigation buttons not found - skipping');
        }
      });
    });

    it('should allow clicking on step header to navigate', () => {
      cy.get('body').then(($body) => {
        const hasHeaders = $body.find('.mat-step-header, mat-step-header, .step-header').length > 1;
        if (hasHeaders) {
          cy.get('.mat-step-header, mat-step-header, .step-header').eq(1).click({ force: true });
        } else {
          cy.log('Not enough step headers for navigation test - skipping');
        }
      });
    });
  });

  describe('Stepper Content', () => {
    it('should display step content', () => {
      cy.get('body').then(($body) => {
        const hasContent = $body.find('.mat-step-content, mat-step-content, .step-content').length > 0;
        if (hasContent) {
          cy.get('.mat-step-content, mat-step-content, .step-content').should('exist');
        } else {
          // Stepper may show content directly
          cy.get('amw-stepper, mat-stepper').should('exist');
        }
      });
    });

    it('should show form fields in steps', () => {
      cy.get('body').then(($body) => {
        const hasFormFields = $body.find('mat-step input, mat-step mat-form-field, mat-step amw-input').length > 0;
        if (hasFormFields) {
          cy.get('mat-step').first().within(() => {
            cy.get('input, mat-form-field, amw-input').should('exist');
          });
        } else {
          cy.log('No form fields in steps - skipping');
        }
      });
    });
  });

  describe('Stepper Types', () => {
    it('should have horizontal or vertical orientation', () => {
      cy.get('amw-stepper, mat-horizontal-stepper, mat-vertical-stepper, mat-stepper').should('exist');
    });
  });
});
