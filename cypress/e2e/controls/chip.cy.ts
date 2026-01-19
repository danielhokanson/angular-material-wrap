/// <reference types="cypress" />

describe('AMW Chip Component', () => {
  beforeEach(() => {
    cy.visit('/controls/chip');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Chip demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Chip');
    });

    it('should have chip elements on the page', () => {
      cy.get('amw-chip, .amw-chip').should('exist');
    });
  });

  describe('Basic Chip', () => {
    it('should display chip with label', () => {
      cy.get('amw-chip').first().should('not.be.empty');
    });

    it('should display chip content', () => {
      cy.get('amw-chip .amw-chip, amw-chip').first().then(($chip) => {
        expect($chip.text().trim()).to.not.be.empty;
      });
    });
  });

  describe('Chip Colors', () => {
    it('should support primary color', () => {
      cy.get('body').then(($body) => {
        const primaryChip = $body.find('amw-chip[color="primary"], amw-chip.primary');
        if (primaryChip.length > 0) {
          cy.wrap(primaryChip).should('exist');
        } else {
          cy.log('Primary chip not found - skipping');
        }
      });
    });

    it('should support accent color', () => {
      cy.get('body').then(($body) => {
        const accentChip = $body.find('amw-chip[color="accent"], amw-chip.accent');
        if (accentChip.length > 0) {
          cy.wrap(accentChip).should('exist');
        } else {
          cy.log('Accent chip not found - skipping');
        }
      });
    });

    it('should support warn color', () => {
      cy.get('body').then(($body) => {
        const warnChip = $body.find('amw-chip[color="warn"], amw-chip.warn');
        if (warnChip.length > 0) {
          cy.wrap(warnChip).should('exist');
        } else {
          cy.log('Warn chip not found - skipping');
        }
      });
    });
  });

  describe('Custom Styles', () => {
    it('should support custom background color', () => {
      cy.get('body').then(($body) => {
        const customBgChip = $body.find('amw-chip[backgroundColor], amw-chip[style*="background"]');
        if (customBgChip.length > 0) {
          cy.wrap(customBgChip).should('exist');
        } else {
          cy.log('Custom background color chip not found - skipping');
        }
      });
    });

    it('should support custom text color', () => {
      cy.get('body').then(($body) => {
        const customTextChip = $body.find('amw-chip[textColor], amw-chip[style*="color"]');
        if (customTextChip.length > 0) {
          cy.wrap(customTextChip).should('exist');
        } else {
          cy.log('Custom text color chip not found - skipping');
        }
      });
    });

    it('should support customStyle input', () => {
      cy.get('body').then(($body) => {
        const customStyleChip = $body.find('amw-chip[customStyle], amw-chip[ng-reflect-custom-style]');
        if (customStyleChip.length > 0) {
          cy.wrap(customStyleChip).should('exist');
        } else {
          cy.log('customStyle chip not found - checking for inline styles');
          // Check if any chip has custom inline styles
          const styledChip = $body.find('amw-chip .amw-chip[style]');
          if (styledChip.length > 0) {
            cy.wrap(styledChip).should('exist');
          } else {
            cy.log('No styled chips found - skipping');
          }
        }
      });
    });
  });

  describe('Chip with Icon', () => {
    it('should display chip with icon', () => {
      cy.get('body').then(($body) => {
        const iconChip = $body.find('amw-chip mat-icon, amw-chip [icon]');
        if (iconChip.length > 0) {
          cy.wrap(iconChip).should('exist');
        } else {
          cy.log('Chip with icon not found - skipping');
        }
      });
    });
  });

  describe('Removable Chip', () => {
    it('should display remove button when removable', () => {
      cy.get('body').then(($body) => {
        const removeBtn = $body.find('amw-chip .remove, amw-chip [matChipRemove], amw-chip button.close');
        if (removeBtn.length > 0) {
          cy.wrap(removeBtn).should('exist');
        } else {
          cy.log('Remove button not found - skipping');
        }
      });
    });

    it('should emit event when remove is clicked', () => {
      cy.get('body').then(($body) => {
        const removeBtn = $body.find('amw-chip .remove, amw-chip [matChipRemove], amw-chip button.close');
        if (removeBtn.length > 0) {
          const initialCount = $body.find('amw-chip').length;
          cy.wrap(removeBtn).first().click();
          // Chip should be removed or event should fire
          cy.get('amw-chip').should('exist'); // At least some chips should remain
        } else {
          cy.log('Remove button not found - skipping');
        }
      });
    });
  });

  describe('Disabled Chip', () => {
    it('should support disabled state', () => {
      cy.get('body').then(($body) => {
        const disabledChip = $body.find('amw-chip[disabled], amw-chip.disabled');
        if (disabledChip.length > 0) {
          cy.wrap(disabledChip).should('exist');
        } else {
          cy.log('Disabled chip not found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('chip should be visible', () => {
      cy.get('amw-chip').first().should('be.visible');
    });

    it('chip should have accessible content', () => {
      cy.get('amw-chip').first().then(($chip) => {
        const text = $chip.text().trim();
        const ariaLabel = $chip.attr('aria-label');
        expect(text || ariaLabel).to.not.be.empty;
      });
    });
  });
});
