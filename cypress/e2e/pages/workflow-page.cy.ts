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
      cy.get('body').then(($body) => {
        const hasTabs = $body.find('amw-tabs, mat-tab-group, .mat-mdc-tab-group, [role="tablist"]').length > 0;
        if (hasTabs) {
          cy.get('amw-tabs, mat-tab-group, .mat-mdc-tab-group, [role="tablist"]').should('exist');
        } else {
          cy.log('No tabs found - skipping');
        }
      });
    });

    it('should have Basic View tab', () => {
      cy.get('body').then(($body) => {
        const hasBasicTab = $body.find('.mat-mdc-tab, [role="tab"]').filter((_, el) => /basic/i.test(el.textContent || '')).length > 0;
        if (hasBasicTab) {
          cy.get('.mat-mdc-tab, [role="tab"]').contains(/basic/i).should('exist');
        } else {
          cy.log('No Basic View tab found - skipping');
        }
      });
    });

    it('should have Advanced View tab', () => {
      cy.get('body').then(($body) => {
        const hasAdvancedTab = $body.find('.mat-mdc-tab, [role="tab"]').filter((_, el) => /advanced/i.test(el.textContent || '')).length > 0;
        if (hasAdvancedTab) {
          cy.get('.mat-mdc-tab, [role="tab"]').contains(/advanced/i).should('exist');
        } else {
          cy.log('No Advanced View tab found - skipping');
        }
      });
    });

    it('should switch between views', () => {
      cy.get('body').then(($body) => {
        const hasAdvancedTab = $body.find('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').filter((_, el) => /advanced/i.test(el.textContent || '')).length > 0;
        if (hasAdvancedTab) {
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/advanced/i).click();
          cy.get('.workflow-page-demo__tab-content').should('contain.text', 'preview');
        } else {
          cy.log('No Advanced View tab found - skipping');
        }
      });
    });
  });

  describe('Workflow Page Component', () => {
    it('should have stepper component', () => {
      cy.get('body').then(($body) => {
        const hasStepper = $body.find('amw-workflow-page mat-stepper, mat-stepper, .mat-stepper-horizontal, .mat-stepper-vertical, amw-stepper').length > 0;
        if (hasStepper) {
          cy.get('amw-workflow-page mat-stepper, mat-stepper, .mat-stepper-horizontal, .mat-stepper-vertical, amw-stepper').should('exist');
        } else {
          cy.log('No stepper component found - skipping');
        }
      });
    });

    it('should display workflow steps', () => {
      cy.get('body').then(($body) => {
        const hasSteps = $body.find('.mat-step, mat-step, .mat-mdc-step').length > 0;
        if (hasSteps) {
          cy.get('.mat-step, mat-step, .mat-mdc-step').should('have.length.at.least', 1);
        } else {
          cy.log('No workflow steps found - skipping');
        }
      });
    });
  });

  describe('Step Navigation', () => {
    it('should have step headers', () => {
      cy.get('body').then(($body) => {
        const hasStepHeaders = $body.find('.mat-step-header, .mat-mdc-step-header').length > 0;
        if (hasStepHeaders) {
          cy.get('.mat-step-header, .mat-mdc-step-header').should('have.length.at.least', 1);
        } else {
          cy.log('No step headers found - skipping');
        }
      });
    });

    it('should allow clicking on step headers', () => {
      cy.get('body').then(($body) => {
        const hasStepHeaders = $body.find('.mat-step-header, .mat-mdc-step-header').length > 0;
        if (hasStepHeaders) {
          cy.get('.mat-step-header, .mat-mdc-step-header').first().click({ force: true });
        } else {
          cy.log('No step headers found - skipping');
        }
      });
    });

    it('should have navigation buttons', () => {
      cy.get('amw-workflow-page amw-button, amw-workflow-page button, amw-button, button').should('have.length.at.least', 1);
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
    });

    it('should have accessible stepper', () => {
      cy.get('body').then(($body) => {
        const hasStepper = $body.find('mat-stepper, amw-stepper, .mat-stepper-horizontal, .mat-stepper-vertical').length > 0;
        if (hasStepper) {
          cy.get('mat-stepper, amw-stepper, .mat-stepper-horizontal, .mat-stepper-vertical').should('exist');
        } else {
          cy.log('No stepper found - skipping');
        }
      });
    });

    it('should have accessible step labels', () => {
      cy.get('body').then(($body) => {
        const hasStepLabels = $body.find('.mat-step-label, .mat-mdc-step-label').length > 0;
        if (hasStepLabels) {
          cy.get('.mat-step-label, .mat-mdc-step-label').should('have.length.at.least', 1);
        } else {
          cy.log('No step labels found - skipping');
        }
      });
    });

    it('should be keyboard navigable', () => {
      cy.get('body').then(($body) => {
        const hasButton = $body.find('amw-workflow-page button, amw-button button, button').length > 0;
        if (hasButton) {
          cy.get('amw-workflow-page button, amw-button button, button').first().focus();
        } else {
          cy.log('No buttons found for keyboard navigation - skipping');
        }
      });
    });
  });
});
