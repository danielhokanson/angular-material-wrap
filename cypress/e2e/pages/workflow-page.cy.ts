/// <reference types="cypress" />

describe('AMW Workflow Page', () => {
  beforeEach(() => {
    cy.visit('/pages/workflow');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Workflow Page demo', () => {
      cy.get('h1').should('contain.text', 'Workflow');
    });

    it('should display page description', () => {
      cy.get('.workflow-page-demo__header p').should('contain.text', 'AMW Workflow Page');
    });

    it('should have workflow page component', () => {
      cy.get('amw-workflow-page').should('exist');
    });
  });

  describe('View Tabs', () => {
    it('should have view tabs', () => {
      cy.get('amw-tabs').should('exist');
    });

    it('should have Basic View tab', () => {
      cy.get('amw-tab').contains('Basic View').should('exist');
    });

    it('should have Advanced View tab', () => {
      cy.get('amw-tab').contains('Advanced View').should('exist');
    });

    it('should switch between views', () => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Advanced View').click();
      cy.get('.workflow-page-demo__tab-content').should('contain.text', 'preview');
    });
  });

  describe('Workflow Page Component', () => {
    it('should have stepper component', () => {
      cy.get('amw-workflow-page mat-stepper, amw-workflow-page .mat-stepper-horizontal, amw-workflow-page .mat-stepper-vertical').should('exist');
    });

    it('should display workflow steps', () => {
      cy.get('amw-workflow-page .mat-step, amw-workflow-page mat-step').should('have.length.at.least', 1);
    });
  });

  describe('Step Navigation', () => {
    it('should have step headers', () => {
      cy.get('amw-workflow-page .mat-step-header').should('have.length.at.least', 1);
    });

    it('should allow clicking on step headers', () => {
      cy.get('amw-workflow-page .mat-step-header').first().click();
    });

    it('should have navigation buttons', () => {
      cy.get('amw-workflow-page amw-button, amw-workflow-page button').should('have.length.at.least', 1);
    });
  });

  describe('Demo Information Card', () => {
    it('should display info card', () => {
      cy.get('.workflow-page-demo__info-card').should('exist');
    });

    it('should display features list', () => {
      cy.get('.workflow-page-demo__info-content ul li').should('have.length.at.least', 5);
    });

    it('should mention step navigation', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'Step-by-step');
    });

    it('should mention validation', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'validation');
    });

    it('should mention skip functionality', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'Skip');
    });

    it('should mention state management', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'state management');
    });

    it('should mention auto-save', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'Auto-save');
    });
  });

  describe('Workflow Steps Description', () => {
    it('should describe workflow steps', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'Workflow Steps');
    });

    it('should list Personal Information step', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'Personal Information');
    });

    it('should list Employment Details step', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'Employment Details');
    });

    it('should list Document Upload step', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'Document Upload');
    });

    it('should list Benefits Selection step', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'Benefits Selection');
    });

    it('should list Equipment & Access step', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'Equipment');
    });

    it('should list Orientation & Training step', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'Orientation');
    });

    it('should list Review & Approval step', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'Review');
    });
  });

  describe('Validation Rules', () => {
    it('should describe validation rules', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'Validation Rules');
    });

    it('should mention required fields', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'required');
    });

    it('should mention optional steps', () => {
      cy.get('.workflow-page-demo__info-content').should('contain.text', 'optional');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('exist');
      cy.get('h2').should('exist');
      cy.get('h4').should('have.length.at.least', 2);
    });

    it('should have accessible stepper', () => {
      cy.get('mat-stepper').should('exist');
    });

    it('should have accessible step labels', () => {
      cy.get('.mat-step-label').should('have.length.at.least', 1);
    });

    it('should be keyboard navigable', () => {
      cy.get('amw-workflow-page button, amw-workflow-page amw-button button').first().focus();
    });
  });
});
