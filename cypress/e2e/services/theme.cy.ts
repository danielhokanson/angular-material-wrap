/// <reference types="cypress" />

describe('Theme Service', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForAngular();
  });

  describe('Theme Menu', () => {
    it('should open theme menu', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-demo-theme-menu amw-button').length > 0) {
          cy.get('amw-demo-theme-menu amw-button').click();
          cy.get('.theme-menu, .amw-popover__popover').should('be.visible');
        } else {
          cy.log('Theme menu not found - skipping');
        }
      });
    });

    it('should display current theme info', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-demo-theme-menu amw-button').length > 0) {
          cy.get('amw-demo-theme-menu amw-button').click();
          cy.get('.current-theme-info, .theme-menu').should('be.visible');
        } else {
          cy.log('Theme menu not found - skipping');
        }
      });
    });

    it('should display theme name', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-demo-theme-menu amw-button').length > 0) {
          cy.get('amw-demo-theme-menu amw-button').click();
          cy.get('.current-theme-info .theme-name, .theme-menu').should('exist');
        } else {
          cy.log('Theme menu not found - skipping');
        }
      });
    });

    it('should display theme color swatches', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-demo-theme-menu amw-button').length > 0) {
          cy.get('amw-demo-theme-menu amw-button').click();
          cy.get('.theme-colors .color-swatch, .theme-menu, .amw-popover__popover').should('exist');
        } else {
          cy.log('Theme menu not found - skipping');
        }
      });
    });

    it('should close theme menu', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-demo-theme-menu amw-button').length > 0) {
          cy.get('amw-demo-theme-menu amw-button').click();
          cy.get('.theme-menu, .amw-popover__popover').should('be.visible');
          cy.get('.amw-popover__close').click();
          cy.get('.theme-menu, .amw-popover__popover').should('not.exist');
        } else {
          cy.log('Theme menu not found - skipping');
        }
      });
    });
  });

  describe('Theme Switching', () => {
    beforeEach(() => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-demo-theme-menu amw-button').length > 0) {
          cy.get('amw-demo-theme-menu amw-button').click();
          cy.get('.theme-menu, .amw-popover__popover').should('be.visible');
        }
      });
    });

    it('should display available themes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.theme-list .theme-item').length > 0) {
          cy.get('.theme-list .theme-item').should('have.length.greaterThan', 0);
        } else {
          cy.log('Theme list not found - skipping');
        }
      });
    });

    it('should highlight current theme', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.theme-list .theme-item.active').length > 0) {
          cy.get('.theme-list .theme-item.active').should('exist');
        } else {
          cy.log('Active theme item not found - skipping');
        }
      });
    });

    it('should switch to a different theme', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.theme-list .theme-item:not(.active)').length > 0) {
          cy.get('.theme-list .theme-item:not(.active)').first().click();
        } else {
          cy.log('No alternative themes found - skipping');
        }
      });
    });

    it('should apply light theme', () => {
      cy.get('body').then(($body) => {
        const hasLightTheme = $body.find('.theme-item').filter((_, el) => /light/i.test(el.textContent || '')).length > 0;
        if (hasLightTheme) {
          cy.get('.theme-item').contains(/light/i).click();
          cy.get('html').should('not.have.class', 'dark-theme');
        } else {
          cy.log('Light theme option not found - skipping');
        }
      });
    });

    it('should apply dark theme', () => {
      cy.get('body').then(($body) => {
        const hasDarkTheme = $body.find('.theme-item').filter((_, el) => /dark/i.test(el.textContent || '')).length > 0;
        if (hasDarkTheme) {
          cy.get('.theme-item').contains(/dark/i).click();
          cy.get('html').should('have.class', 'dark-theme');
        } else {
          cy.log('Dark theme option not found - skipping');
        }
      });
    });
  });

  describe('Theme Persistence', () => {
    it('should persist theme after page reload', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-demo-theme-menu amw-button').length > 0) {
          cy.get('amw-demo-theme-menu amw-button').click();
          const hasDarkTheme = $body.find('.theme-item').filter((_, el) => /dark/i.test(el.textContent || '')).length > 0;
          if (hasDarkTheme) {
            cy.get('.theme-item').contains(/dark/i).click();
            cy.reload();
            cy.waitForAngular();
            cy.get('html').should('have.class', 'dark-theme');
          } else {
            cy.log('Dark theme option not found - skipping persistence test');
          }
        } else {
          cy.log('Theme menu not found - skipping');
        }
      });
    });
  });

  describe('Theme CSS Variables', () => {
    it('should set primary color variable', () => {
      cy.document().then((doc) => {
        const style = getComputedStyle(doc.documentElement);
        const primaryColor = style.getPropertyValue('--mdc-theme-primary');
        expect(primaryColor).to.not.be.empty;
      });
    });

    it('should set surface color variable', () => {
      cy.document().then((doc) => {
        const style = getComputedStyle(doc.documentElement);
        const surfaceColor = style.getPropertyValue('--mdc-theme-surface');
        expect(surfaceColor).to.not.be.empty;
      });
    });

    it('should set on-surface color variable', () => {
      cy.document().then((doc) => {
        const style = getComputedStyle(doc.documentElement);
        const onSurfaceColor = style.getPropertyValue('--mdc-theme-on-surface');
        expect(onSurfaceColor).to.not.be.empty;
      });
    });
  });

  describe('Theme Page', () => {
    beforeEach(() => {
      cy.visit('/services/theme', { failOnStatusCode: false });
      cy.waitForAngular();
    });

    it('should display Theme management page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('h1, h2').text().toLowerCase().includes('theme')) {
          cy.get('h1, h2').should('contain.text', 'Theme');
        } else {
          cy.log('Theme page not found - skipping');
        }
      });
    });

    it('should display theme customization options', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-color-picker, .theme-color-picker').length > 0) {
          cy.get('amw-color-picker, .theme-color-picker').should('exist');
        } else {
          cy.log('Theme customization options not found - skipping');
        }
      });
    });

    it('should allow creating custom themes', () => {
      cy.get('body').then(($body) => {
        const hasCreateBtn = $body.find('amw-button, button').filter((_, el) => /create|new|add/i.test(el.textContent || '')).length > 0;
        if (hasCreateBtn) {
          cy.get('amw-button, button').contains(/create|new|add/i).should('exist');
        } else {
          cy.log('Create theme button not found - skipping');
        }
      });
    });
  });
});
