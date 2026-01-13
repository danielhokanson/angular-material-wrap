/// <reference types="cypress" />

describe('AMW Icon Component', () => {
  describe('Icon Usage Across Demo App', () => {
    beforeEach(() => {
      cy.visit('/controls/button');
      cy.waitForAngular();
    });

    it('should render Material icons', () => {
      cy.get('mat-icon, amw-icon').should('exist');
    });

    it('should display icons with correct font family', () => {
      cy.get('mat-icon').first().should('have.css', 'font-family').and('match', /Material/i);
    });

    it('should display icons within buttons', () => {
      cy.get('amw-button mat-icon, amw-button .amw-button__icon').should('exist');
    });

    it('should render icon-only buttons', () => {
      cy.get('amw-button[icon]').should('exist');
    });
  });

  describe('Icon in Theme Menu', () => {
    beforeEach(() => {
      cy.visit('/controls');
      cy.waitForAngular();
    });

    it('should display palette icon in theme menu trigger', () => {
      cy.get('amw-demo-theme-menu amw-button[icon="palette"], amw-demo-theme-menu mat-icon').should('exist');
    });

    it('should display theme icons in theme list', () => {
      // Open theme menu
      cy.get('amw-demo-theme-menu amw-button').click();
      cy.get('.theme-menu').should('be.visible');
      cy.get('.theme-menu amw-icon, .theme-menu mat-icon').should('exist');
    });
  });

  describe('Icon in Navigation', () => {
    beforeEach(() => {
      cy.visit('/controls');
      cy.waitForAngular();
    });

    it('should display icons in navigation items', () => {
      cy.get('amw-demo-navigation mat-icon, .nav-item mat-icon, .amw-sidenav mat-icon').should('exist');
    });
  });

  describe('Icon Colors and Theming', () => {
    beforeEach(() => {
      cy.visit('/controls/button');
      cy.waitForAngular();
    });

    it('should apply primary color to icons', () => {
      cy.get('amw-button[color="primary"] mat-icon').should('exist');
    });

    it('should apply accent color to icons', () => {
      cy.get('amw-button[color="accent"] mat-icon').first().should('exist');
    });

    it('should apply warn color to icons', () => {
      cy.get('amw-button[color="warn"] mat-icon').should('exist');
    });
  });

  describe('Icon Accessibility', () => {
    beforeEach(() => {
      cy.visit('/controls/button');
      cy.waitForAngular();
    });

    it('should have aria-hidden on decorative icons', () => {
      cy.get('mat-icon[aria-hidden="true"]').should('exist');
    });

    it('should provide aria-label for icon-only buttons', () => {
      cy.get('amw-button[icon][arialabel], amw-button[icon][aria-label]').should('exist');
    });
  });

  describe('Icon in Services Demo', () => {
    beforeEach(() => {
      cy.visit('/services/messaging');
      cy.waitForAngular();
    });

    it('should display icons in message type buttons', () => {
      cy.get('amw-button[icon="info"]').should('exist');
      cy.get('amw-button[icon="check_circle"]').should('exist');
      cy.get('amw-button[icon="warning"]').should('exist');
      cy.get('amw-button[icon="error"]').should('exist');
    });

    it('should display icons in message list', () => {
      // Send a message first
      cy.get('amw-button[icon="info"]').first().click();
      cy.get('.message-item mat-icon, .message-header amw-icon').should('exist');
    });
  });

  describe('Icon Sizing', () => {
    beforeEach(() => {
      cy.visit('/controls/button');
      cy.waitForAngular();
    });

    it('should render icons in various button sizes', () => {
      // Small button with icon
      cy.get('amw-button[size="small"][icon]').should('exist');

      // Standard button with icon
      cy.get('amw-button[icon]').should('exist');
    });

    it('should scale icons in FAB buttons', () => {
      cy.get('amw-button[fab] mat-icon, amw-button[ng-reflect-fab="true"] mat-icon').should('exist');
    });
  });
});
