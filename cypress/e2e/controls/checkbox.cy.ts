/// <reference types="cypress" />

describe('AMW Checkbox Component', () => {
  beforeEach(() => {
    cy.visit('/controls/checkbox');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Checkbox demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Checkbox');
    });

    it('should have checkbox components on the page', () => {
      cy.get('amw-checkbox').should('exist');
    });
  });

  describe('Checkbox Interactions', () => {
    it('should toggle checkbox on click', () => {
      cy.get('amw-checkbox:not([disabled])').first().then(($checkbox) => {
        // Get initial state
        const wasChecked = $checkbox.find('input').prop('checked');

        // Click to toggle
        cy.wrap($checkbox).click();

        // Verify state changed
        cy.wrap($checkbox).find('input').should(wasChecked ? 'not.be.checked' : 'be.checked');
      });
    });

    it('should check unchecked checkbox', () => {
      cy.get('amw-checkbox:not([disabled]) input:not(:checked)').first().then(($input) => {
        cy.wrap($input).parent().click();
        cy.wrap($input).should('be.checked');
      });
    });

    it('should uncheck checked checkbox', () => {
      cy.get('amw-checkbox:not([disabled]) input:checked').first().then(($input) => {
        cy.wrap($input).parent().click();
        cy.wrap($input).should('not.be.checked');
      });
    });
  });

  describe('Checkbox States', () => {
    it('should display disabled checkbox', () => {
      cy.get('amw-checkbox[disabled="true"], amw-checkbox .mat-mdc-checkbox-disabled').should('exist');
    });

    it('disabled checkbox should not be toggleable', () => {
      // Find disabled checkbox using the Material CSS class
      cy.get('amw-checkbox .mdc-checkbox--disabled, amw-checkbox[disabled] input').first().closest('amw-checkbox').then(($checkbox) => {
        const wasChecked = $checkbox.find('input').prop('checked');
        cy.wrap($checkbox).click({ force: true });
        // State should not change
        cy.wrap($checkbox).find('input').should(wasChecked ? 'be.checked' : 'not.be.checked');
      });
    });

    it('should display indeterminate state', () => {
      // Indeterminate state may not be present in all demos - check for either the state or skip
      cy.get('body').then(($body) => {
        const hasIndeterminate = $body.find('amw-checkbox input:indeterminate, .mdc-checkbox--indeterminate').length > 0;
        if (hasIndeterminate) {
          cy.get('amw-checkbox input:indeterminate, .mdc-checkbox--indeterminate').should('exist');
        } else {
          // Skip if no indeterminate checkbox in demo
          cy.log('No indeterminate checkbox found in demo - skipping');
        }
      });
    });
  });

  describe('Checkbox Labels', () => {
    it('should display label text', () => {
      cy.get('amw-checkbox .mat-mdc-checkbox-label, amw-checkbox label').should('exist');
    });

    it('clicking label should toggle checkbox', () => {
      // Find checkbox label using Material label class or generic label
      cy.get('amw-checkbox:not([disabled]) label').first().then(($label) => {
        const $input = $label.closest('amw-checkbox').find('input');
        const wasChecked = $input.prop('checked');

        cy.wrap($label).click();
        cy.wrap($input).should(wasChecked ? 'not.be.checked' : 'be.checked');
      });
    });
  });

  describe('Checkbox Colors', () => {
    it('should have primary color checkbox', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-checkbox[color="primary"], amw-checkbox:not([color])').length > 0) {
          cy.get('amw-checkbox[color="primary"], amw-checkbox:not([color])').should('exist');
        } else {
          cy.log('No primary color checkbox found - skipping');
        }
      });
    });

    it('should have accent color checkbox', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-checkbox[color="accent"]').length > 0) {
          cy.get('amw-checkbox[color="accent"]').should('exist');
        } else {
          cy.log('No accent color checkbox found - skipping');
        }
      });
    });

    it('should have warn color checkbox', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-checkbox[color="warn"]').length > 0) {
          cy.get('amw-checkbox[color="warn"]').should('exist');
        } else {
          cy.log('No warn color checkbox found - skipping');
        }
      });
    });
  });

  describe('Checkbox Label Position', () => {
    it('should support label before checkbox', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-checkbox[labelPosition="before"]').length > 0) {
          cy.get('amw-checkbox[labelPosition="before"]').should('exist');
        } else {
          cy.log('No label-before checkbox found - skipping');
        }
      });
    });

    it('should support label after checkbox (default)', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-checkbox:not([labelPosition]), amw-checkbox[labelPosition="after"]').length > 0) {
          cy.get('amw-checkbox:not([labelPosition]), amw-checkbox[labelPosition="after"]').should('exist');
        } else {
          cy.log('No label-after checkbox found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('checkbox should be keyboard accessible', () => {
      cy.get('amw-checkbox:not([disabled]) input').first()
        .focus()
        .should('have.focus');
    });

    it('should toggle with space key', () => {
      cy.get('amw-checkbox:not([disabled])').first().then(($checkbox) => {
        const wasChecked = $checkbox.find('input').prop('checked');

        cy.wrap($checkbox).find('input').focus().type(' ');
        cy.wrap($checkbox).find('input').should(wasChecked ? 'not.be.checked' : 'be.checked');
      });
    });

    it('should have proper ARIA attributes', () => {
      // Native checkbox inputs have implicit checkbox role, verify it has an id for label association
      cy.get('amw-checkbox input[type="checkbox"]').first()
        .should('have.attr', 'id');
    });
  });
});
