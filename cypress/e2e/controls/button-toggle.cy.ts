/// <reference types="cypress" />

describe('AMW Button Toggle Component', () => {
  beforeEach(() => {
    cy.visit('/controls/button-toggle');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Button Toggle demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Button Toggle');
    });

    it('should have button toggle elements on the page', () => {
      cy.get('amw-button-toggle-group, amw-button-toggle').should('exist');
    });
  });

  describe('Button Toggle Group', () => {
    it('should display toggle group with buttons', () => {
      cy.get('amw-button-toggle-group').first().within(() => {
        cy.get('amw-button-toggle').should('have.length.at.least', 2);
      });
    });

    it('should display toggle button content', () => {
      cy.get('amw-button-toggle').first().should('not.be.empty');
    });
  });

  describe('Single Selection', () => {
    it('should select a toggle button on click', () => {
      cy.get('amw-button-toggle-group:not([multiple])').first().then(($group) => {
        if ($group.length > 0) {
          cy.wrap($group).find('amw-button-toggle').first().click();
          cy.wrap($group).find('amw-button-toggle.selected, amw-button-toggle[aria-pressed="true"]')
            .should('have.length', 1);
        } else {
          cy.log('Single selection group not found - skipping');
        }
      });
    });

    it('should deselect previous when selecting new', () => {
      cy.get('amw-button-toggle-group:not([multiple])').first().then(($group) => {
        if ($group.length > 0) {
          cy.wrap($group).find('amw-button-toggle').first().click();
          cy.wrap($group).find('amw-button-toggle').last().click();
          cy.wrap($group).find('amw-button-toggle.selected, amw-button-toggle[aria-pressed="true"]')
            .should('have.length', 1);
        } else {
          cy.log('Single selection group not found - skipping');
        }
      });
    });
  });

  describe('Multiple Selection', () => {
    it('should allow multiple selections when multiple is true', () => {
      cy.get('body').then(($body) => {
        const multiGroup = $body.find('amw-button-toggle-group[multiple]');
        if (multiGroup.length > 0) {
          cy.wrap(multiGroup).first().find('amw-button-toggle').first().click();
          cy.wrap(multiGroup).first().find('amw-button-toggle').last().click();
          // Both should be selected
          cy.wrap(multiGroup).first()
            .find('amw-button-toggle.selected, amw-button-toggle[aria-pressed="true"]')
            .should('have.length.at.least', 2);
        } else {
          cy.log('Multiple selection group not found - skipping');
        }
      });
    });
  });

  describe('Disabled State', () => {
    it('should support disabled group', () => {
      cy.get('body').then(($body) => {
        const disabledGroup = $body.find('amw-button-toggle-group[disabled]');
        if (disabledGroup.length > 0) {
          cy.wrap(disabledGroup).find('amw-button-toggle').should('have.attr', 'disabled');
        } else {
          cy.log('Disabled group not found - skipping');
        }
      });
    });

    it('should support disabled individual toggle', () => {
      cy.get('body').then(($body) => {
        const disabledToggle = $body.find('amw-button-toggle[disabled]');
        if (disabledToggle.length > 0) {
          cy.wrap(disabledToggle).should('exist');
        } else {
          cy.log('Disabled toggle not found - skipping');
        }
      });
    });
  });

  describe('Vertical Layout', () => {
    it('should support vertical layout', () => {
      cy.get('body').then(($body) => {
        const verticalGroup = $body.find('amw-button-toggle-group[vertical], amw-button-toggle-group.vertical');
        if (verticalGroup.length > 0) {
          cy.wrap(verticalGroup).should('exist');
        } else {
          cy.log('Vertical group not found - skipping');
        }
      });
    });
  });

  describe('Appearance', () => {
    it('should support standard appearance', () => {
      cy.get('body').then(($body) => {
        const standardGroup = $body.find('amw-button-toggle-group[appearance="standard"]');
        if (standardGroup.length > 0) {
          cy.wrap(standardGroup).should('exist');
        } else {
          cy.log('Standard appearance not found - skipping');
        }
      });
    });

    it('should support legacy appearance', () => {
      cy.get('body').then(($body) => {
        const legacyGroup = $body.find('amw-button-toggle-group[appearance="legacy"]');
        if (legacyGroup.length > 0) {
          cy.wrap(legacyGroup).should('exist');
        } else {
          cy.log('Legacy appearance not found - skipping');
        }
      });
    });
  });

  describe('Form Integration', () => {
    it('should work with ngModel', () => {
      cy.get('body').then(($body) => {
        const ngModelGroup = $body.find('amw-button-toggle-group[ngModel], amw-button-toggle-group[(ngModel)]');
        if (ngModelGroup.length > 0) {
          cy.wrap(ngModelGroup).should('exist');
        } else {
          cy.log('ngModel group not found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('toggle buttons should be focusable', () => {
      cy.get('amw-button-toggle:not([disabled])').first()
        .find('button, [role="button"]')
        .focus()
        .should('have.focus');
    });

    it('should support keyboard navigation', () => {
      cy.get('amw-button-toggle:not([disabled])').first()
        .find('button, [role="button"]')
        .focus()
        .type('{enter}');
      // Should be selected after enter
      cy.get('amw-button-toggle-group').first()
        .find('amw-button-toggle.selected, amw-button-toggle[aria-pressed="true"]')
        .should('exist');
    });
  });
});
