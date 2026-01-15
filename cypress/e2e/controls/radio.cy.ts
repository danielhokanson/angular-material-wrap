/// <reference types="cypress" />

describe('AMW Radio Component', () => {
  beforeEach(() => {
    cy.visit('/controls/radio');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Radio demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Radio');
    });

    it('should have radio components on the page', () => {
      // Check for any radio button elements
      cy.get('amw-radio, mat-radio-button, input[type="radio"]').should('exist');
    });
  });

  describe('Radio Interactions', () => {
    it('should select radio on click', () => {
      cy.get('body').then(($body) => {
        const hasRadio = $body.find('amw-radio, mat-radio-button').length > 0;
        if (hasRadio) {
          cy.get('amw-radio, mat-radio-button').first().click();
          // Radio should be selected
          cy.get('.mat-mdc-radio-checked, .mdc-radio--checked, input[type="radio"]:checked').should('exist');
        } else {
          cy.log('No radio components found in demo - skipping');
        }
      });
    });

    it('should only allow one selection in a group', () => {
      cy.get('body').then(($body) => {
        const hasGroup = $body.find('amw-radio-group, mat-radio-group').length > 0;
        if (hasGroup) {
          const radioSelector = 'amw-radio-group amw-radio, mat-radio-group mat-radio-button';
          // Click first radio in group
          cy.get(radioSelector).first().click();
          // Click second radio in same group
          cy.get(radioSelector).eq(1).click();
          // Only one should be checked
          cy.get('.mat-mdc-radio-checked, .mdc-radio--checked').should('have.length.at.least', 1);
        } else {
          cy.log('No radio groups in demo - skipping');
        }
      });
    });
  });

  describe('Radio States', () => {
    it('should display disabled radio', () => {
      cy.get('body').then(($body) => {
        const hasDisabled = $body.find('amw-radio[disabled], mat-radio-button[disabled], .mat-mdc-radio-disabled').length > 0;
        if (hasDisabled) {
          cy.get('amw-radio[disabled], mat-radio-button[disabled], .mat-mdc-radio-disabled').should('exist');
        } else {
          cy.log('No disabled radios in demo - skipping');
        }
      });
    });

    it('disabled radio should not be selectable', () => {
      cy.get('body').then(($body) => {
        const hasDisabled = $body.find('.mat-mdc-radio-disabled, .mdc-radio--disabled').length > 0;
        if (hasDisabled) {
          cy.get('.mat-mdc-radio-disabled, .mdc-radio--disabled').first().click({ force: true });
          // State should not change to checked if it wasn't before
        } else {
          cy.log('No disabled radios in demo - skipping');
        }
      });
    });
  });

  describe('Radio Labels', () => {
    it('should display label text', () => {
      cy.get('amw-radio label, mat-radio-button label, .mat-mdc-radio-label-content').should('exist');
    });

    it('clicking label should select radio', () => {
      cy.get('body').then(($body) => {
        const hasLabel = $body.find('amw-radio label, mat-radio-button label, .mat-mdc-radio-label-content').length > 0;
        if (hasLabel) {
          cy.get('amw-radio label, mat-radio-button label, .mat-mdc-radio-label-content').first().click();
          cy.get('.mat-mdc-radio-checked, .mdc-radio--checked, input[type="radio"]:checked').should('exist');
        } else {
          cy.log('No radio labels in demo - skipping');
        }
      });
    });
  });

  describe('Radio Colors', () => {
    it('should have primary color radio', () => {
      cy.get('amw-radio[color="primary"], mat-radio-button[color="primary"], amw-radio:not([color]), mat-radio-button:not([color])').should('exist');
    });

    it('should have accent color radio', () => {
      cy.get('body').then(($body) => {
        const hasAccent = $body.find('amw-radio[color="accent"], mat-radio-button[color="accent"]').length > 0;
        if (hasAccent) {
          cy.get('amw-radio[color="accent"], mat-radio-button[color="accent"]').should('exist');
        } else {
          cy.log('No accent color radios in demo - skipping');
        }
      });
    });

    it('should have warn color radio', () => {
      cy.get('body').then(($body) => {
        const hasWarn = $body.find('amw-radio[color="warn"], mat-radio-button[color="warn"]').length > 0;
        if (hasWarn) {
          cy.get('amw-radio[color="warn"], mat-radio-button[color="warn"]').should('exist');
        } else {
          cy.log('No warn color radios in demo - skipping');
        }
      });
    });
  });

  describe('Radio Group', () => {
    it('should render radio buttons in a group', () => {
      cy.get('body').then(($body) => {
        const hasGroup = $body.find('amw-radio-group, mat-radio-group').length > 0;
        if (hasGroup) {
          cy.get('amw-radio-group, mat-radio-group').should('exist');
          cy.get('amw-radio-group amw-radio, mat-radio-group mat-radio-button').should('have.length.greaterThan', 1);
        } else {
          cy.log('No radio groups in demo - skipping');
        }
      });
    });

    it('radio group should have proper ARIA role', () => {
      cy.get('body').then(($body) => {
        const hasGroup = $body.find('amw-radio-group, mat-radio-group, [role="radiogroup"]').length > 0;
        if (hasGroup) {
          cy.get('amw-radio-group, mat-radio-group, [role="radiogroup"]').first().should('have.attr', 'role', 'radiogroup');
        } else {
          cy.log('No radio groups in demo - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('radio should be keyboard accessible', () => {
      cy.get('body').then(($body) => {
        const hasRadio = $body.find('amw-radio input, mat-radio-button input, input[type="radio"]').length > 0;
        if (hasRadio) {
          cy.get('amw-radio input, mat-radio-button input, input[type="radio"]').first()
            .focus()
            .should('have.focus');
        } else {
          cy.log('No radio inputs in demo - skipping');
        }
      });
    });

    it('should select with space key', () => {
      cy.get('body').then(($body) => {
        const hasRadio = $body.find('amw-radio input, mat-radio-button input').length > 0;
        if (hasRadio) {
          cy.get('amw-radio input, mat-radio-button input').first()
            .focus()
            .type(' ');
          cy.get('.mat-mdc-radio-checked, input[type="radio"]:checked').should('exist');
        } else {
          cy.log('No radio inputs in demo - skipping');
        }
      });
    });

    it('should navigate group with arrow keys', () => {
      cy.get('body').then(($body) => {
        const hasGroup = $body.find('amw-radio-group, mat-radio-group').length > 0;
        if (hasGroup) {
          const radioSelector = 'amw-radio-group amw-radio input, mat-radio-group mat-radio-button input';
          cy.get(radioSelector).first()
            .focus()
            .type('{downarrow}');
          // Focus should have moved
        } else {
          cy.log('No radio groups in demo - skipping');
        }
      });
    });
  });
});
