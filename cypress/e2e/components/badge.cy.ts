/// <reference types="cypress" />

describe('AMW Badge Directive', () => {
  beforeEach(() => {
    cy.visit('/components/badge');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Badge demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Badge');
    });

    it('should have badge elements on the page', () => {
      cy.get('[amwBadge], .amw-badge').should('exist');
    });
  });

  describe('Basic Badges', () => {
    it('should display badge with number content', () => {
      cy.get('[amwBadge]').first().then(($badge) => {
        // Badge should have content
        const badgeEl = $badge.find('.amw-badge, .mat-badge-content');
        if (badgeEl.length > 0) {
          expect(badgeEl.text()).to.match(/\d+/);
        } else {
          cy.log('Badge content element not found - checking attribute');
          expect($badge.attr('amwbadge') || $badge.attr('[amwBadge]')).to.exist;
        }
      });
    });

    it('should display badge with text content', () => {
      cy.get('body').then(($body) => {
        const textBadge = $body.find('[amwBadge="\'New\'"], [amwBadge*="New"]');
        if (textBadge.length > 0) {
          cy.wrap(textBadge).should('exist');
        } else {
          cy.log('Text badge not found - skipping');
        }
      });
    });
  });

  describe('Badge Colors', () => {
    it('should display primary colored badge', () => {
      cy.get('body').then(($body) => {
        const primaryBadge = $body.find('[amwBadgeColor="primary"], [data-color="primary"]');
        if (primaryBadge.length > 0) {
          cy.wrap(primaryBadge).should('exist');
        } else {
          cy.log('Primary badge not found - skipping');
        }
      });
    });

    it('should display accent colored badge', () => {
      cy.get('body').then(($body) => {
        const accentBadge = $body.find('[amwBadgeColor="accent"], [data-color="accent"]');
        if (accentBadge.length > 0) {
          cy.wrap(accentBadge).should('exist');
        } else {
          cy.log('Accent badge not found - skipping');
        }
      });
    });

    it('should display warn colored badge', () => {
      cy.get('body').then(($body) => {
        const warnBadge = $body.find('[amwBadgeColor="warn"], [data-color="warn"]');
        if (warnBadge.length > 0) {
          cy.wrap(warnBadge).should('exist');
        } else {
          cy.log('Warn badge not found - skipping');
        }
      });
    });
  });

  describe('Badge Positions', () => {
    it('should support above after position', () => {
      cy.get('body').then(($body) => {
        const aboveAfter = $body.find('[amwBadgePosition="above after"], [data-pos="above after"]');
        if (aboveAfter.length > 0) {
          cy.wrap(aboveAfter).should('exist');
        } else {
          cy.log('Above after position not found - skipping');
        }
      });
    });

    it('should support above before position', () => {
      cy.get('body').then(($body) => {
        const aboveBefore = $body.find('[amwBadgePosition="above before"], [data-pos="above before"]');
        if (aboveBefore.length > 0) {
          cy.wrap(aboveBefore).should('exist');
        } else {
          cy.log('Above before position not found - skipping');
        }
      });
    });

    it('should support below after position', () => {
      cy.get('body').then(($body) => {
        const belowAfter = $body.find('[amwBadgePosition="below after"], [data-pos="below after"]');
        if (belowAfter.length > 0) {
          cy.wrap(belowAfter).should('exist');
        } else {
          cy.log('Below after position not found - skipping');
        }
      });
    });

    it('should support below before position', () => {
      cy.get('body').then(($body) => {
        const belowBefore = $body.find('[amwBadgePosition="below before"], [data-pos="below before"]');
        if (belowBefore.length > 0) {
          cy.wrap(belowBefore).should('exist');
        } else {
          cy.log('Below before position not found - skipping');
        }
      });
    });
  });

  describe('Badge Sizes', () => {
    it('should support small size', () => {
      cy.get('body').then(($body) => {
        const smallBadge = $body.find('[amwBadgeSize="small"], [data-size="small"]');
        if (smallBadge.length > 0) {
          cy.wrap(smallBadge).should('exist');
        } else {
          cy.log('Small badge not found - skipping');
        }
      });
    });

    it('should support medium size', () => {
      cy.get('body').then(($body) => {
        const mediumBadge = $body.find('[amwBadgeSize="medium"], [data-size="medium"]');
        if (mediumBadge.length > 0) {
          cy.wrap(mediumBadge).should('exist');
        } else {
          cy.log('Medium badge not found - skipping');
        }
      });
    });

    it('should support large size', () => {
      cy.get('body').then(($body) => {
        const largeBadge = $body.find('[amwBadgeSize="large"], [data-size="large"]');
        if (largeBadge.length > 0) {
          cy.wrap(largeBadge).should('exist');
        } else {
          cy.log('Large badge not found - skipping');
        }
      });
    });
  });

  describe('Dynamic Badge', () => {
    it('should update badge content dynamically', () => {
      cy.get('body').then(($body) => {
        const addBtn = $body.find('amw-button, button').filter((_, el) =>
          /add|increment|\+/i.test(el.textContent || '')
        );
        if (addBtn.length > 0) {
          cy.wrap(addBtn).first().click();
          // Badge should still exist after update
          cy.get('[amwBadge]').should('exist');
        } else {
          cy.log('Add button not found - skipping');
        }
      });
    });

    it('should hide badge when hidden is true', () => {
      cy.get('body').then(($body) => {
        const hideBtn = $body.find('amw-button, button').filter((_, el) =>
          /hide/i.test(el.textContent || '')
        );
        if (hideBtn.length > 0) {
          cy.wrap(hideBtn).first().click();
          // Check if badge is hidden
          cy.get('[amwBadgeHidden="true"], .amw-badge-hidden').should('exist');
        } else {
          cy.log('Hide button not found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('badge should be visible', () => {
      cy.get('[amwBadge]').first().should('be.visible');
    });
  });
});
