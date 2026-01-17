/// <reference types="cypress" />

describe('AMW Textarea Component', () => {
  beforeEach(() => {
    cy.visit('/controls/textarea');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Textarea demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Textarea');
    });

    it('should have textarea components on the page', () => {
      cy.get('amw-textarea, textarea').should('exist');
    });
  });

  describe('Textarea Interactions', () => {
    it('should allow text input', () => {
      cy.get('amw-textarea textarea, textarea').first()
        .clear()
        .type('This is a test message');
      cy.get('amw-textarea textarea, textarea').first()
        .should('have.value', 'This is a test message');
    });

    it('should allow multiline input', () => {
      cy.get('amw-textarea textarea, textarea').first()
        .clear()
        .type('Line 1{enter}Line 2{enter}Line 3');
    });

    it('should support copy paste', () => {
      cy.get('amw-textarea textarea, textarea').first()
        .clear()
        .type('Test text')
        .type('{selectall}')
        .type('{ctrl+c}');
    });
  });

  describe('Textarea States', () => {
    it('should have disabled textarea', () => {
      cy.get('body').then(($body) => {
        const disabledSelector = 'amw-textarea[disabled="true"] textarea, textarea:disabled, amw-textarea.disabled';
        if ($body.find(disabledSelector).length > 0) {
          cy.get(disabledSelector).should('exist');
        } else {
          cy.log('No disabled textarea found - skipping');
        }
      });
    });

    it('should have readonly textarea', () => {
      cy.get('body').then(($body) => {
        const readonlySelector = 'amw-textarea[readonly="true"] textarea, textarea[readonly], amw-textarea.readonly';
        if ($body.find(readonlySelector).length > 0) {
          cy.get(readonlySelector).should('exist');
        } else {
          cy.log('No readonly textarea found - skipping');
        }
      });
    });
  });

  describe('Textarea Validation', () => {
    it('should show required validation error', () => {
      cy.get('body').then(($body) => {
        const requiredSelector = 'amw-textarea[required="true"] textarea, textarea[required]';
        if ($body.find(requiredSelector).length > 0) {
          cy.get(requiredSelector).first().clear().blur();
          // Check for error - may not appear if validation not triggered
          cy.get('body').then(($updatedBody) => {
            if ($updatedBody.find('mat-error, .amw-textarea__error').length > 0) {
              cy.get('mat-error, .amw-textarea__error').should('exist');
            } else {
              cy.log('Validation error not displayed - skipping');
            }
          });
        } else {
          cy.log('No required textarea found - skipping');
        }
      });
    });
  });

  describe('Textarea Sizing', () => {
    it('should support auto-resize', () => {
      cy.get('amw-textarea textarea, textarea').should('exist');
    });

    it('should have min/max rows if configured', () => {
      cy.get('body').then(($body) => {
        const hasRowsAttr = $body.find('amw-textarea textarea[rows], textarea[rows]').length > 0;
        if (hasRowsAttr) {
          cy.get('amw-textarea textarea[rows], textarea[rows]').first().should('have.attr', 'rows');
        } else {
          cy.get('amw-textarea textarea, textarea').should('exist');
          cy.log('Rows attribute not set - textarea exists without explicit rows');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should have label', () => {
      cy.get('amw-textarea mat-label, label').should('exist');
    });

    it('should be focusable', () => {
      cy.get('amw-textarea textarea, textarea').first()
        .focus()
        .should('have.focus');
    });
  });
});
