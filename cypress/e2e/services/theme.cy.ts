/// <reference types="cypress" />

describe('Theme Service', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForAngular();
  });

  describe('Theme Menu', () => {
    it('should open theme menu', () => {
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.theme-menu').should('be.visible');
    });

    it('should display current theme info', () => {
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.current-theme-info').should('be.visible');
    });

    it('should display theme name', () => {
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.current-theme-info .theme-name').should('not.be.empty');
    });

    it('should display theme color swatches', () => {
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.theme-colors .color-swatch').should('exist');
    });

    it('should close theme menu', () => {
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.theme-menu').should('be.visible');
      cy.get('.amw-popover__close button').click();
      cy.get('.theme-menu').should('not.exist');
    });
  });

  describe('Theme Switching', () => {
    beforeEach(() => {
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.theme-menu').should('be.visible');
    });

    it('should display available themes', () => {
      cy.get('.theme-list .theme-item').should('have.length.greaterThan', 0);
    });

    it('should highlight current theme', () => {
      cy.get('.theme-list .theme-item.active').should('exist');
    });

    it('should switch to a different theme', () => {
      // Get current theme name
      cy.get('.current-theme-info .theme-name').invoke('text').then((currentTheme) => {
        // Click a different theme
        cy.get('.theme-list .theme-item:not(.active)').first().click();

        // Reopen menu and verify theme changed
        cy.get('amw-demo-theme-menu amw-button').click();
        cy.get('.current-theme-info .theme-name').invoke('text').should('not.eq', currentTheme);
      });
    });

    it('should apply light theme', () => {
      cy.get('.theme-item').contains('Light').click();
      cy.get('html').should('not.have.class', 'dark-theme');
    });

    it('should apply dark theme', () => {
      cy.get('.theme-item').contains('Dark').click();
      cy.get('html').should('have.class', 'dark-theme');
    });
  });

  describe('Theme Persistence', () => {
    it('should persist theme after page reload', () => {
      // Select a specific theme
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.theme-item').contains('Dark').click();

      // Reload page
      cy.reload();
      cy.waitForAngular();

      // Theme should still be applied
      cy.get('html').should('have.class', 'dark-theme');
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
      cy.visit('/theme');
      cy.waitForAngular();
    });

    it('should display Theme management page', () => {
      cy.get('h1, h2').should('contain.text', 'Theme');
    });

    it('should display theme customization options', () => {
      cy.get('amw-color-picker, .theme-color-picker').should('exist');
    });

    it('should allow creating custom themes', () => {
      cy.get('amw-button, button').contains(/create|new|add/i).should('exist');
    });
  });
});
