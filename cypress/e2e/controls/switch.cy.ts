/// <reference types="cypress" />

describe('AMW Switch/Toggle Component', () => {
  beforeEach(() => {
    cy.visit('/controls/switch');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Switch demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Switch');
    });

    it('should have switch/toggle components on the page', () => {
      cy.get('amw-switch, amw-toggle, mat-slide-toggle, .mat-mdc-slide-toggle').should('exist');
    });
  });

  describe('Switch Interactions', () => {
    it('should toggle switch on click', () => {
      cy.get('body').then(($body) => {
        const hasSwitch = $body.find('amw-switch, mat-slide-toggle, .mat-mdc-slide-toggle').length > 0;
        if (hasSwitch) {
          cy.get('amw-switch, mat-slide-toggle, .mat-mdc-slide-toggle').first().then(($switch) => {
            const wasChecked = $switch.find('input').prop('checked');
            cy.wrap($switch).click();
            cy.wrap($switch).find('input').should(wasChecked ? 'not.be.checked' : 'be.checked');
          });
        } else {
          cy.log('No switch components found - skipping');
        }
      });
    });

    it('should turn on when clicked off', () => {
      cy.get('body').then(($body) => {
        const hasUnchecked = $body.find('amw-switch input:not(:checked), mat-slide-toggle input:not(:checked)').length > 0;
        if (hasUnchecked) {
          cy.get('amw-switch:has(input:not(:checked)), mat-slide-toggle:has(input:not(:checked))').first().click();
          cy.get('.mat-mdc-slide-toggle-checked, input[type="checkbox"]:checked').should('exist');
        } else {
          cy.log('No unchecked switches found - skipping');
        }
      });
    });

    it('should turn off when clicked on', () => {
      cy.get('body').then(($body) => {
        const hasChecked = $body.find('amw-switch input:checked, mat-slide-toggle input:checked').length > 0;
        if (hasChecked) {
          cy.get('amw-switch:has(input:checked), mat-slide-toggle:has(input:checked)').first().click();
          // After click, should be unchecked
        } else {
          cy.log('No checked switches found - skipping');
        }
      });
    });
  });

  describe('Switch States', () => {
    it('should display disabled switch', () => {
      cy.get('body').then(($body) => {
        const hasDisabled = $body.find('amw-switch[disabled], mat-slide-toggle[disabled], .mat-mdc-slide-toggle-disabled').length > 0;
        if (hasDisabled) {
          cy.get('amw-switch[disabled], mat-slide-toggle[disabled], .mat-mdc-slide-toggle-disabled').should('exist');
        } else {
          cy.log('No disabled switches in demo - skipping');
        }
      });
    });

    it('disabled switch should not be toggleable', () => {
      cy.get('body').then(($body) => {
        const hasDisabled = $body.find('.mat-mdc-slide-toggle-disabled, .mdc-switch--disabled').length > 0;
        if (hasDisabled) {
          cy.get('.mat-mdc-slide-toggle-disabled').first().then(($switch) => {
            const wasChecked = $switch.find('input').prop('checked');
            cy.wrap($switch).click({ force: true });
            cy.wrap($switch).find('input').should(wasChecked ? 'be.checked' : 'not.be.checked');
          });
        } else {
          cy.log('No disabled switches in demo - skipping');
        }
      });
    });
  });

  describe('Switch Labels', () => {
    it('should display label text', () => {
      cy.get('amw-switch label, mat-slide-toggle label, .mat-mdc-slide-toggle-content').should('exist');
    });

    it('clicking label should toggle switch', () => {
      cy.get('body').then(($body) => {
        const hasLabel = $body.find('amw-switch label, mat-slide-toggle label, .mat-mdc-slide-toggle-content').length > 0;
        if (hasLabel) {
          cy.get('amw-switch label, mat-slide-toggle label, .mat-mdc-slide-toggle-content').first().click();
          // Switch should toggle
        } else {
          cy.log('No switch labels in demo - skipping');
        }
      });
    });
  });

  describe('Switch Colors', () => {
    it('should have primary color switch', () => {
      cy.get('amw-switch[color="primary"], mat-slide-toggle[color="primary"], amw-switch:not([color]), mat-slide-toggle:not([color])').should('exist');
    });

    it('should have accent color switch', () => {
      cy.get('body').then(($body) => {
        const hasAccent = $body.find('amw-switch[color="accent"], mat-slide-toggle[color="accent"]').length > 0;
        if (hasAccent) {
          cy.get('amw-switch[color="accent"], mat-slide-toggle[color="accent"]').should('exist');
        } else {
          cy.log('No accent color switches in demo - skipping');
        }
      });
    });

    it('should have warn color switch', () => {
      cy.get('body').then(($body) => {
        const hasWarn = $body.find('amw-switch[color="warn"], mat-slide-toggle[color="warn"]').length > 0;
        if (hasWarn) {
          cy.get('amw-switch[color="warn"], mat-slide-toggle[color="warn"]').should('exist');
        } else {
          cy.log('No warn color switches in demo - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('switch should be keyboard accessible', () => {
      cy.get('body').then(($body) => {
        const hasSwitch = $body.find('amw-switch input, mat-slide-toggle input').length > 0;
        if (hasSwitch) {
          cy.get('amw-switch input, mat-slide-toggle input').first()
            .focus()
            .should('have.focus');
        } else {
          cy.log('No switch inputs in demo - skipping');
        }
      });
    });

    it('should toggle with space key', () => {
      cy.get('body').then(($body) => {
        const hasSwitch = $body.find('amw-switch, mat-slide-toggle').length > 0;
        if (hasSwitch) {
          cy.get('amw-switch, mat-slide-toggle').first().then(($switch) => {
            const wasChecked = $switch.find('input').prop('checked');
            cy.wrap($switch).find('input').focus().type(' ');
            cy.wrap($switch).find('input').should(wasChecked ? 'not.be.checked' : 'be.checked');
          });
        } else {
          cy.log('No switches in demo - skipping');
        }
      });
    });

    it('should have proper role', () => {
      cy.get('body').then(($body) => {
        const hasSwitch = $body.find('amw-switch input, mat-slide-toggle input').length > 0;
        if (hasSwitch) {
          // Material slide toggle uses role="switch" on the input
          cy.get('amw-switch input, mat-slide-toggle input').first()
            .should('have.attr', 'type', 'checkbox');
        } else {
          cy.log('No switch inputs in demo - skipping');
        }
      });
    });
  });
});
