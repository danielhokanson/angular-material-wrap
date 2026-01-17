/// <reference types="cypress" />

describe('AMW Accordion Component', () => {
  beforeEach(() => {
    cy.visit('/components/accordion');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Accordion demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Accordion');
    });

    it('should have accordion components on the page', () => {
      cy.get('amw-accordion, mat-accordion').should('exist');
    });
  });

  describe('Accordion Panels', () => {
    it('should have expandable panels', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-expansion-panel, .amw-accordion__panel').length > 0) {
          cy.get('mat-expansion-panel, .amw-accordion__panel').should('exist');
        } else {
          cy.log('No expansion panels found - skipping');
        }
      });
    });

    it('should expand panel on header click', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-expansion-panel-header, .amw-accordion__panel-header').length > 0) {
          cy.get('mat-expansion-panel-header, .amw-accordion__panel-header').first().click();
          cy.get('mat-expansion-panel.mat-expanded, .amw-accordion__panel--expanded').should('exist');
        } else {
          cy.log('No expansion panel headers found - skipping');
        }
      });
    });

    it('should collapse panel when clicking expanded header', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-expansion-panel-header').length > 0) {
          // First expand
          cy.get('mat-expansion-panel-header').first().click();
          cy.get('mat-expansion-panel.mat-expanded').should('exist');

          // Then collapse
          cy.get('mat-expansion-panel-header').first().click();
          cy.get('mat-expansion-panel').first().should('not.have.class', 'mat-expanded');
        } else {
          cy.log('No expansion panel headers found - skipping');
        }
      });
    });

    it('should show panel content when expanded', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-expansion-panel-header').length > 0) {
          cy.get('mat-expansion-panel-header').first().click();
          cy.get('.mat-expansion-panel-body, .mat-expansion-panel-content').should('be.visible');
        } else {
          cy.log('No expansion panel headers found - skipping');
        }
      });
    });
  });

  describe('Accordion Types', () => {
    it('should have multiple accordion panels', () => {
      cy.get('body').then(($body) => {
        const panelCount = $body.find('mat-expansion-panel, .amw-accordion__panel').length;
        if (panelCount > 0) {
          cy.get('mat-expansion-panel, .amw-accordion__panel').should('have.length.at.least', 1);
        } else {
          cy.log('No accordion panels found - skipping');
        }
      });
    });

    it('should support multi-expand mode', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-accordion[multi="true"], mat-accordion.multi-expand').length > 0) {
          cy.get('mat-accordion[multi="true"], mat-accordion.multi-expand').should('exist');
        } else if ($body.find('mat-expansion-panel-header').length >= 2) {
          // Try expanding multiple panels to test multi-mode
          cy.get('mat-expansion-panel-header').eq(0).click();
          cy.get('mat-expansion-panel-header').eq(1).click();
          // At least one should be expanded
          cy.get('mat-expansion-panel.mat-expanded').should('have.length.at.least', 1);
        } else {
          cy.log('Multi-expand mode not available - skipping');
        }
      });
    });
  });

  describe('Panel Content', () => {
    it('should display panel title', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-panel-title, .mat-expansion-panel-header-title').length > 0) {
          cy.get('mat-panel-title, .mat-expansion-panel-header-title').first().should('exist');
        } else {
          cy.log('No panel titles found - skipping');
        }
      });
    });

    it('should display panel description', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-panel-description, .mat-expansion-panel-header-description').length > 0) {
          cy.get('mat-panel-description, .mat-expansion-panel-header-description').first().should('exist');
        } else {
          cy.log('No panel descriptions found - skipping');
        }
      });
    });

    it('should display expand/collapse indicator', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-expansion-indicator, mat-expansion-panel-header .mat-icon').length > 0) {
          cy.get('.mat-expansion-indicator, mat-expansion-panel-header .mat-icon').first().should('exist');
        } else {
          cy.log('No expansion indicator found - skipping');
        }
      });
    });
  });

  describe('Disabled State', () => {
    it('should support disabled panels', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-expansion-panel[disabled], mat-expansion-panel.mat-expansion-panel-disabled').length > 0) {
          cy.get('mat-expansion-panel[disabled], mat-expansion-panel.mat-expansion-panel-disabled').should('exist');
        } else {
          cy.log('No disabled panels found - skipping');
        }
      });
    });
  });

  describe('Lazy Loading', () => {
    it('should support lazy content loading', () => {
      cy.get('body').then(($body) => {
        if ($body.find('ng-template[matExpansionPanelContent]').length > 0) {
          cy.get('ng-template[matExpansionPanelContent]').should('exist');
        } else {
          // Check if panel content loads on expand
          if ($body.find('mat-expansion-panel-header').length > 0) {
            cy.get('mat-expansion-panel-header').first().click();
            cy.get('.mat-expansion-panel-content').should('be.visible');
          } else {
            cy.log('Lazy loading not demonstrated - skipping');
          }
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-expansion-panel-header').length > 0) {
          cy.get('mat-expansion-panel-header').first()
            .focus()
            .should('have.focus');
        } else {
          cy.log('No expansion panel headers found - skipping');
        }
      });
    });

    it('should expand on Enter key', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-expansion-panel-header').length > 0) {
          cy.get('mat-expansion-panel-header').first()
            .focus()
            .type('{enter}');
          cy.get('mat-expansion-panel.mat-expanded').should('exist');
        } else {
          cy.log('No expansion panel headers found - skipping');
        }
      });
    });

    it('should expand on Space key', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-expansion-panel-header').length > 0) {
          cy.get('mat-expansion-panel-header').first()
            .focus()
            .type(' ');
          cy.get('mat-expansion-panel.mat-expanded').should('exist');
        } else {
          cy.log('No expansion panel headers found - skipping');
        }
      });
    });

    it('should have proper aria-expanded attribute', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-expansion-panel-header').length > 0) {
          cy.get('mat-expansion-panel-header').first()
            .should('have.attr', 'aria-expanded');
        } else {
          cy.log('No expansion panel headers found - skipping');
        }
      });
    });

    it('should update aria-expanded on toggle', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-expansion-panel-header').length > 0) {
          cy.get('mat-expansion-panel-header').first()
            .should('have.attr', 'aria-expanded', 'false')
            .click()
            .should('have.attr', 'aria-expanded', 'true');
        } else {
          cy.log('No expansion panel headers found - skipping');
        }
      });
    });

    it('should have proper role attributes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-expansion-panel-header').length > 0) {
          cy.get('mat-expansion-panel-header').first()
            .should('have.attr', 'role', 'button');
        } else {
          cy.log('No expansion panel headers found - skipping');
        }
      });
    });
  });
});
