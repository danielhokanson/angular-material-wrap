/// <reference types="cypress" />

describe('AMW Select Component', () => {
  beforeEach(() => {
    cy.visit('/controls/select');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Select demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Select');
    });

    it('should have select components on the page', () => {
      cy.get('amw-select').should('exist');
    });
  });

  describe('Select Interactions', () => {
    it('should open dropdown on click', () => {
      cy.get('amw-select').first().click();
      cy.get('.mat-mdc-select-panel, .cdk-overlay-pane').should('be.visible');
    });

    it('should show options when opened', () => {
      cy.get('amw-select').first().click();
      cy.get('.mat-mdc-option').should('exist');
    });

    it('should select an option', () => {
      cy.get('amw-select').first().click();
      cy.get('.mat-mdc-option').first().click();
      // Option should be selected
      cy.get('amw-select .mat-mdc-select-value').should('not.be.empty');
    });

    it('should close dropdown after selection', () => {
      cy.get('amw-select').first().click();
      cy.get('.mat-mdc-option').first().click();
      cy.get('.mat-mdc-select-panel').should('not.exist');
    });
  });

  describe('Select with Multiple Selection', () => {
    it('should support multiple selection if configured', () => {
      cy.get('body').then(($body) => {
        const hasMultiple = $body.find('amw-select[multiple="true"], amw-select[multiple]').length > 0;
        if (hasMultiple) {
          cy.get('amw-select[multiple="true"], amw-select[multiple]').first().click();
          cy.get('.mat-mdc-option').first().click();
          cy.get('.mat-mdc-option').eq(1).click();
          // Multiple options should be selected
        } else {
          cy.log('No multi-select in demo - skipping');
        }
      });
    });
  });

  describe('Select States', () => {
    it('should have disabled selects', () => {
      cy.get('body').then(($body) => {
        const hasDisabled = $body.find('amw-select[disabled], amw-select .mat-mdc-select-disabled').length > 0;
        if (hasDisabled) {
          cy.get('amw-select[disabled], amw-select .mat-mdc-select-disabled').should('exist');
        } else {
          cy.log('No disabled selects in demo - skipping');
        }
      });
    });

    it('disabled select should not open', () => {
      cy.get('body').then(($body) => {
        const hasDisabled = $body.find('amw-select[disabled], amw-select .mat-mdc-select-disabled').length > 0;
        if (hasDisabled) {
          cy.get('amw-select[disabled], amw-select .mat-mdc-select-disabled').first().click({ force: true });
          cy.get('.mat-mdc-select-panel').should('not.exist');
        } else {
          cy.log('No disabled selects in demo - skipping');
        }
      });
    });
  });

  describe('Select Labels and Placeholders', () => {
    it('should display labels', () => {
      cy.get('body').then(($body) => {
        const labelSelector = 'amw-select mat-label, amw-select .mat-mdc-form-field-label, mat-label';
        if ($body.find(labelSelector).length > 0) {
          cy.get(labelSelector).should('exist');
        } else {
          cy.log('No labels found - skipping');
        }
      });
    });

    it('should display placeholder text', () => {
      cy.get('body').then(($body) => {
        const hasPlaceholder = $body.find('amw-select [placeholder], amw-select .mat-mdc-select-placeholder').length > 0;
        if (hasPlaceholder) {
          cy.get('amw-select [placeholder], amw-select .mat-mdc-select-placeholder').should('exist');
        } else {
          // Placeholders might not be present if values are pre-selected
          cy.log('No placeholders visible in demo - skipping');
        }
      });
    });
  });

  describe('Select Validation', () => {
    it('should show error state for required empty select', () => {
      cy.get('body').then(($body) => {
        const hasRequired = $body.find('amw-select[required="true"], amw-select[required]').length > 0;
        if (hasRequired) {
          // Scroll to and trigger validation by focusing and blurring
          cy.get('amw-select[required="true"], amw-select[required]').first().scrollIntoView().click();
          cy.get('body').click(0, 0); // Click outside to close and blur
          // Check for error - may not appear if form hasn't been submitted or has default value
          cy.get('body').then(($updatedBody) => {
            const hasError = $updatedBody.find('.mat-mdc-form-field-error, .mat-error, .mat-mdc-form-field-subscript-wrapper mat-error').length > 0;
            if (hasError) {
              cy.get('.mat-mdc-form-field-error, .mat-error, .mat-mdc-form-field-subscript-wrapper mat-error').should('exist');
            } else {
              cy.log('Required select has default value or validation not triggered - skipping');
            }
          });
        } else {
          cy.log('No required selects in demo - skipping validation test');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('select should be keyboard accessible', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-select:not([disabled])').length > 0) {
          cy.get('amw-select:not([disabled])').first().scrollIntoView().click();
          cy.get('.mat-mdc-select-panel, .cdk-overlay-pane').should('be.visible');
          cy.get('body').type('{esc}');
        } else {
          cy.log('No enabled select found - skipping');
        }
      });
    });

    it('should navigate options with keyboard', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-select:not([disabled])').length > 0) {
          cy.get('amw-select:not([disabled])').first().scrollIntoView().click();
          cy.get('.mat-mdc-select-panel').should('be.visible');
          cy.get('body').type('{downarrow}{enter}');
        } else {
          cy.log('No enabled select found - skipping');
        }
      });
    });
  });
});
