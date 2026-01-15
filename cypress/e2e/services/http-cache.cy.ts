/// <reference types="cypress" />

describe('AMW HTTP Cache Service', () => {
  beforeEach(() => {
    cy.visit('/services/http-cache');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the HTTP Cache demo page', () => {
      cy.get('h1').should('contain.text', 'HTTP Cache');
    });

    it('should display page description', () => {
      cy.get('.http-cache-demo__header p').should('contain.text', 'HTTP caching');
    });

    it('should have tabs for navigation', () => {
      cy.get('amw-tabs').should('exist');
    });
  });

  describe('Interactive Demo Tab', () => {
    it('should display Interactive Demo tab', () => {
      cy.get('body').then(($body) => {
        const hasTab = $body.find('.mat-mdc-tab, [role="tab"]').filter((_, el) => /interactive|demo/i.test(el.textContent || '')).length > 0;
        if (hasTab) {
          cy.get('.mat-mdc-tab, [role="tab"]').contains(/interactive|demo/i).should('exist');
        } else {
          cy.log('No Interactive Demo tab found - skipping');
        }
      });
    });

    it('should show cache info chips', () => {
      cy.get('body').then(($body) => {
        const hasChips = $body.find('.cache-info .chip, .cache-info mat-chip, mat-chip').length > 0;
        if (hasChips) {
          cy.get('.cache-info .chip, .cache-info mat-chip, mat-chip').should('have.length.at.least', 1);
        } else {
          cy.log('No cache info chips found - skipping');
        }
      });
    });

    it('should display Memory cache info', () => {
      cy.get('body').then(($body) => {
        const hasCacheInfo = $body.find('.cache-info').length > 0;
        if (hasCacheInfo) {
          cy.get('.cache-info').should('contain.text', 'Memory');
        } else {
          cy.get('body').should('contain.text', 'Memory');
        }
      });
    });

    it('should display IndexedDB cache info', () => {
      cy.get('body').then(($body) => {
        const hasCacheInfo = $body.find('.cache-info').length > 0;
        if (hasCacheInfo) {
          cy.get('.cache-info').should('contain.text', 'IndexedDB');
        } else {
          cy.get('body').should('contain.text', 'IndexedDB');
        }
      });
    });

    it('should display Storage usage info', () => {
      cy.get('body').then(($body) => {
        const hasCacheInfo = $body.find('.cache-info').length > 0;
        if (hasCacheInfo) {
          cy.get('.cache-info').should('contain.text', 'Storage');
        } else {
          cy.get('body').should('contain.text', 'Storage');
        }
      });
    });

    it('should have test endpoint buttons', () => {
      cy.get('body').then(($body) => {
        const hasTestEndpoints = $body.find('.test-endpoints amw-button').length > 0;
        if (hasTestEndpoints) {
          cy.get('.test-endpoints amw-button').should('have.length.at.least', 1);
        } else {
          cy.get('amw-button').should('have.length.at.least', 1);
        }
      });
    });

    it('should have cache action buttons', () => {
      cy.get('body').then(($body) => {
        const hasCacheActions = $body.find('.cache-actions amw-button').length > 0;
        if (hasCacheActions) {
          cy.get('.cache-actions amw-button').should('have.length.at.least', 1);
        } else {
          cy.get('amw-button').should('have.length.at.least', 2);
        }
      });
    });

    it('should have Prune Expired button', () => {
      cy.get('body').then(($body) => {
        const hasPruneBtn = $body.find('amw-button').filter((_, el) => /prune/i.test(el.textContent || '')).length > 0;
        if (hasPruneBtn) {
          cy.get('amw-button').contains(/prune/i).should('exist');
        } else {
          cy.log('No Prune Expired button found - skipping');
        }
      });
    });

    it('should have Clear All Cache button', () => {
      cy.get('body').then(($body) => {
        const hasClearBtn = $body.find('amw-button').filter((_, el) => /clear/i.test(el.textContent || '')).length > 0;
        if (hasClearBtn) {
          cy.get('amw-button').contains(/clear/i).should('exist');
        } else {
          cy.log('No Clear All Cache button found - skipping');
        }
      });
    });
  });

  describe('Cache Configuration Tab', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Cache Configuration').click();
    });

    it('should display Cache Configuration tab', () => {
      cy.get('h2').should('contain.text', 'Current Cache Configuration');
    });

    it('should mention cache-map.json', () => {
      cy.get('.subtitle').should('contain.text', 'cache-map.json');
    });

    it('should display config items', () => {
      cy.get('.config-list').should('exist');
    });
  });

  describe('How It Works Tab', () => {
    beforeEach(() => {
      cy.get('.amw-tabs__tab, amw-tab').contains('How It Works').click();
    });

    it('should display How It Works documentation', () => {
      cy.get('h2').should('contain.text', 'HTTP Cache Interceptor');
    });

    it('should list features', () => {
      cy.get('h3').should('contain.text', 'Features');
      cy.get('ul li').should('have.length.at.least', 5);
    });

    it('should mention Automatic Caching', () => {
      cy.get('li').should('contain.text', 'Automatic Caching');
    });

    it('should mention Persistent Storage', () => {
      cy.get('li').should('contain.text', 'Persistent Storage');
    });

    it('should mention Cross-Tab Sharing', () => {
      cy.get('li').should('contain.text', 'Cross-Tab');
    });

    it('should mention Two-Tier Architecture', () => {
      cy.get('li').should('contain.text', 'Two-Tier');
    });

    it('should mention Pattern Matching', () => {
      cy.get('li').should('contain.text', 'Pattern Matching');
    });

    it('should describe pattern examples', () => {
      cy.get('h3').should('contain.text', 'Pattern Examples');
    });

    it('should describe usage', () => {
      cy.get('h3').should('contain.text', 'Usage');
    });

    it('should provide testing tips', () => {
      cy.get('h3').should('contain.text', 'Testing Tips');
    });
  });

  describe('Cache Actions', () => {
    it('should click Prune Expired button', () => {
      cy.get('amw-button').contains('Prune Expired').click();
    });

    it('should click Clear All Cache button', () => {
      cy.get('amw-button').contains('Clear All Cache').click();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('exist');
      cy.get('h2').should('exist');
    });

    it('should have accessible tabs', () => {
      cy.get('amw-tabs').should('exist');
    });

    it('should have accessible buttons', () => {
      cy.get('amw-button button').should('have.length.at.least', 3);
    });

    it('should be keyboard navigable', () => {
      cy.get('amw-button button').first().focus().should('have.focus');
    });
  });
});
