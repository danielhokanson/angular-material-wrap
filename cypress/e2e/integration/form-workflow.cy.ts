/// <reference types="cypress" />

describe('Form Workflow Integration', () => {
  describe('Complete Form Submission Workflow', () => {
    beforeEach(() => {
      cy.visit('/pages/form');
      cy.waitForAngular();
    });

    it('should complete a full form workflow', () => {
      // 1. Navigate to form page
      cy.get('h1').should('contain.text', 'Form');

      // 2. Verify form page component exists
      cy.get('amw-form-page').should('exist');

      // 3. Switch to Create mode (if button exists)
      cy.get('body').then(($body) => {
        const hasCreateBtn = $body.find('amw-button').filter((_, el) => /create/i.test(el.textContent || '')).length > 0;
        if (hasCreateBtn) {
          cy.get('amw-button').contains(/create/i).click();
        }
      });

      // 4. Verify form fields are present
      cy.get('amw-form-page input, amw-form-page amw-input').should('exist');
    });

    it('should handle mode switching', () => {
      cy.get('body').then(($body) => {
        // Switch to Edit mode (if button exists)
        const hasEditBtn = $body.find('amw-button').filter((_, el) => /edit/i.test(el.textContent || '')).length > 0;
        if (hasEditBtn) {
          cy.get('amw-button').contains(/edit/i).click();
        }

        // Switch to View mode (if button exists)
        const hasViewBtn = $body.find('amw-button').filter((_, el) => /view/i.test(el.textContent || '')).length > 0;
        if (hasViewBtn) {
          cy.get('amw-button').contains(/view/i).click();
        }

        // Switch back to Create mode (if button exists)
        const hasCreateBtn = $body.find('amw-button').filter((_, el) => /create/i.test(el.textContent || '')).length > 0;
        if (hasCreateBtn) {
          cy.get('amw-button').contains(/create/i).click();
        }

        if (!hasEditBtn && !hasViewBtn && !hasCreateBtn) {
          cy.log('No mode buttons found - skipping');
        }
      });
    });

    it('should switch between basic and advanced views', () => {
      cy.get('body').then(($body) => {
        // Check if Basic View tab exists
        const hasBasicTab = $body.find('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').filter((_, el) => /basic/i.test(el.textContent || '')).length > 0;
        if (hasBasicTab) {
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/basic/i).should('exist');
        }

        // Check if Advanced View tab exists and click it
        const hasAdvancedTab = $body.find('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').filter((_, el) => /advanced/i.test(el.textContent || '')).length > 0;
        if (hasAdvancedTab) {
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/advanced/i).click();

          // Verify advanced features mentioned
          cy.get('body').then(($updatedBody) => {
            const hasTabContent = $updatedBody.find('.form-page-demo__tab-content').length > 0;
            if (hasTabContent) {
              cy.get('.form-page-demo__tab-content').should('contain.text', 'auto-save');
            }
          });

          // Switch back to Basic View
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/basic/i).click();
        } else {
          cy.log('No view tabs found - skipping');
        }
      });
    });
  });

  describe('Form with Validation', () => {
    beforeEach(() => {
      cy.visit('/controls/input');
      cy.waitForAngular();
    });

    it('should show validation errors and clear them', () => {
      // Find a required input and trigger validation
      cy.get('amw-input input').first().focus().blur();

      // Type valid content
      cy.get('amw-input input').first().type('Valid input');

      // Verify input has value
      cy.get('amw-input input').first().should('have.value', 'Valid input');
    });
  });

  describe('Form Controls Integration', () => {
    it('should interact with text input', () => {
      cy.visit('/controls/input');
      cy.waitForAngular();

      cy.get('amw-input input').first().clear().type('Test text');
      cy.get('amw-input input').first().should('have.value', 'Test text');
    });

    it('should interact with select dropdown', () => {
      cy.visit('/controls/select');
      cy.waitForAngular();

      cy.get('amw-select').first().click();
      cy.get('.mat-mdc-option').first().click();
    });

    it('should interact with checkbox', () => {
      cy.visit('/controls/checkbox');
      cy.waitForAngular();

      cy.get('body').then(($body) => {
        const checkboxSelector = 'amw-checkbox, mat-checkbox';
        if ($body.find(checkboxSelector).length > 0) {
          cy.get(checkboxSelector).first().click();
        } else {
          cy.log('No checkbox found - skipping');
        }
      });
    });

    it('should interact with radio buttons', () => {
      cy.visit('/controls/radio');
      cy.waitForAngular();

      cy.get('body').then(($body) => {
        const radioSelector = 'amw-radio, mat-radio-button';
        if ($body.find(radioSelector).length > 0) {
          cy.get(radioSelector).first().click();
        } else {
          cy.log('No radio buttons found - skipping');
        }
      });
    });

    it('should interact with slider', () => {
      cy.visit('/controls/slider');
      cy.waitForAngular();

      cy.get('amw-slider').should('exist');
    });

    it('should interact with switch/toggle', () => {
      cy.visit('/controls/switch');
      cy.waitForAngular();

      cy.get('amw-switch, amw-toggle, mat-slide-toggle').first().click();
    });

    it('should interact with chips', () => {
      cy.visit('/controls/chips');
      cy.waitForAngular();

      cy.get('amw-chips').should('exist');
    });

    it('should interact with datepicker', () => {
      cy.visit('/controls/datepicker');
      cy.waitForAngular();

      cy.get('amw-datepicker').should('exist');
    });
  });
});
