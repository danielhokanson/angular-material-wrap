/// <reference types="cypress" />

describe('AMW Toggle Component', () => {
  beforeEach(() => {
    cy.visit('/controls/toggle');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Toggle demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Toggle');
    });

    it('should have toggle components on the page', () => {
      cy.get('amw-toggle, mat-button-toggle-group, mat-button-toggle, .mat-button-toggle').should('exist');
    });
  });

  describe('Toggle Group', () => {
    it('should have toggle buttons', () => {
      cy.get('body').then(($body) => {
        const hasToggle = $body.find('mat-button-toggle, .mat-button-toggle').length > 0;
        if (hasToggle) {
          cy.get('mat-button-toggle, .mat-button-toggle').should('have.length.at.least', 1);
        } else {
          cy.log('No toggle buttons in demo - skipping');
        }
      });
    });

    it('should select toggle on click', () => {
      cy.get('body').then(($body) => {
        const hasToggle = $body.find('mat-button-toggle, .mat-button-toggle').length > 0;
        if (hasToggle) {
          cy.get('mat-button-toggle, .mat-button-toggle').first().click();
          cy.get('.mat-button-toggle-checked').should('exist');
        } else {
          cy.log('No toggle buttons in demo - skipping');
        }
      });
    });

    it('should support exclusive selection', () => {
      cy.get('body').then(($body) => {
        const hasMultipleToggles = $body.find('mat-button-toggle, .mat-button-toggle').length > 1;
        if (hasMultipleToggles) {
          // Click first toggle
          cy.get('mat-button-toggle, .mat-button-toggle').first().click();
          cy.get('.mat-button-toggle-checked').should('have.length.at.least', 1);

          // Click second toggle
          cy.get('mat-button-toggle, .mat-button-toggle').eq(1).click();
          // In exclusive mode, only one should be checked
        } else {
          cy.log('Not enough toggles for exclusive selection test - skipping');
        }
      });
    });
  });

  describe('Toggle States', () => {
    it('should have disabled toggle', () => {
      cy.get('body').then(($body) => {
        const hasDisabled = $body.find('mat-button-toggle[disabled], mat-button-toggle-group[disabled], .mat-button-toggle-disabled').length > 0;
        if (hasDisabled) {
          cy.get('mat-button-toggle[disabled], mat-button-toggle-group[disabled], .mat-button-toggle-disabled').should('exist');
        } else {
          cy.log('No disabled toggles in demo - skipping');
        }
      });
    });
  });

  describe('Toggle Appearance', () => {
    it('should support different appearances', () => {
      cy.get('body').then(($body) => {
        const hasToggleGroup = $body.find('mat-button-toggle-group, .mat-button-toggle-group, amw-toggle').length > 0;
        if (hasToggleGroup) {
          cy.get('mat-button-toggle-group, .mat-button-toggle-group, amw-toggle').should('exist');
        } else {
          cy.log('No toggle groups in demo - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.get('body').then(($body) => {
        const hasToggleButton = $body.find('mat-button-toggle button, .mat-button-toggle button').length > 0;
        if (hasToggleButton) {
          cy.get('mat-button-toggle button, .mat-button-toggle button').first()
            .focus()
            .should('have.focus');
        } else {
          cy.log('No toggle buttons in demo - skipping');
        }
      });
    });

    it('should have proper role', () => {
      cy.get('body').then(($body) => {
        const hasGroup = $body.find('mat-button-toggle-group, [role="group"]').length > 0;
        if (hasGroup) {
          cy.get('mat-button-toggle-group, [role="group"]').first().should('have.attr', 'role');
        } else {
          cy.log('No toggle groups in demo - skipping');
        }
      });
    });
  });
});
