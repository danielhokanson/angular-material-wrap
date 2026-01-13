/// <reference types="cypress" />

describe('AMW Checkbox Component', () => {
  beforeEach(() => {
    cy.visit('/checkbox');
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
      cy.get('amw-checkbox[disabled="true"]').first().then(($checkbox) => {
        const wasChecked = $checkbox.find('input').prop('checked');
        cy.wrap($checkbox).click({ force: true });
        // State should not change
        cy.wrap($checkbox).find('input').should(wasChecked ? 'be.checked' : 'not.be.checked');
      });
    });

    it('should display indeterminate state', () => {
      cy.get('amw-checkbox[indeterminate="true"], amw-checkbox .mat-mdc-checkbox-indeterminate').should('exist');
    });
  });

  describe('Checkbox Labels', () => {
    it('should display label text', () => {
      cy.get('amw-checkbox .mat-mdc-checkbox-label, amw-checkbox label').should('exist');
    });

    it('clicking label should toggle checkbox', () => {
      cy.get('amw-checkbox:not([disabled]) .mat-mdc-checkbox-label').first().then(($label) => {
        const $input = $label.closest('amw-checkbox').find('input');
        const wasChecked = $input.prop('checked');

        cy.wrap($label).click();
        cy.wrap($input).should(wasChecked ? 'not.be.checked' : 'be.checked');
      });
    });
  });

  describe('Checkbox Colors', () => {
    it('should have primary color checkbox', () => {
      cy.get('amw-checkbox[color="primary"], amw-checkbox:not([color])').should('exist');
    });

    it('should have accent color checkbox', () => {
      cy.get('amw-checkbox[color="accent"]').should('exist');
    });

    it('should have warn color checkbox', () => {
      cy.get('amw-checkbox[color="warn"]').should('exist');
    });
  });

  describe('Checkbox Label Position', () => {
    it('should support label before checkbox', () => {
      cy.get('amw-checkbox[labelPosition="before"]').should('exist');
    });

    it('should support label after checkbox (default)', () => {
      cy.get('amw-checkbox:not([labelPosition]), amw-checkbox[labelPosition="after"]').should('exist');
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
      cy.get('amw-checkbox input[type="checkbox"]').first()
        .should('have.attr', 'role', 'checkbox');
    });
  });
});
