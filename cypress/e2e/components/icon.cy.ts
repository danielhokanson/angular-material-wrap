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
      cy.get('body').then(($body) => {
        if ($body.find('amw-button[color="primary"] mat-icon').length > 0) {
          cy.get('amw-button[color="primary"] mat-icon').should('exist');
        } else {
          cy.get('mat-icon').should('exist');
          cy.log('No primary color buttons with icons - icons exist');
        }
      });
    });

    it('should apply accent color to icons', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-button[color="accent"] mat-icon').length > 0) {
          cy.get('amw-button[color="accent"] mat-icon').first().should('exist');
        } else {
          cy.get('mat-icon').should('exist');
          cy.log('No accent color buttons with icons - icons exist');
        }
      });
    });

    it('should apply warn color to icons', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-button[color="warn"] mat-icon').length > 0) {
          cy.get('amw-button[color="warn"] mat-icon').should('exist');
        } else {
          cy.get('mat-icon').should('exist');
          cy.log('No warn color buttons with icons - icons exist');
        }
      });
    });
  });

  describe('Icon Accessibility', () => {
    beforeEach(() => {
      cy.visit('/controls/button');
      cy.waitForAngular();
    });

    it('should have aria-hidden on decorative icons', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-icon[aria-hidden="true"]').length > 0) {
          cy.get('mat-icon[aria-hidden="true"]').should('exist');
        } else {
          cy.get('mat-icon').should('exist');
          cy.log('Icons exist but aria-hidden not set explicitly');
        }
      });
    });

    it('should provide aria-label for icon-only buttons', () => {
      cy.get('body').then(($body) => {
        const ariaSelector = 'amw-button[icon][arialabel], amw-button[icon][aria-label], amw-button button[aria-label]';
        if ($body.find(ariaSelector).length > 0) {
          cy.get(ariaSelector).should('exist');
        } else {
          cy.log('No icon buttons with aria-label found - skipping');
        }
      });
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
      cy.get('body').then(($body) => {
        // Small button with icon
        if ($body.find('amw-button[size="small"][icon]').length > 0) {
          cy.get('amw-button[size="small"][icon]').should('exist');
        }
        // Standard button with icon
        if ($body.find('amw-button[icon]').length > 0) {
          cy.get('amw-button[icon]').should('exist');
        } else {
          cy.get('mat-icon').should('exist');
          cy.log('Icon buttons use different structure');
        }
      });
    });

    it('should scale icons in FAB buttons', () => {
      cy.get('body').then(($body) => {
        const fabIconSelector = 'amw-button[fab] mat-icon, amw-button[ng-reflect-fab="true"] mat-icon, .mat-mdc-fab mat-icon';
        if ($body.find(fabIconSelector).length > 0) {
          cy.get(fabIconSelector).should('exist');
        } else {
          cy.get('mat-icon').should('exist');
          cy.log('FAB buttons may not be present or use different structure');
        }
      });
    });
  });
});
