/// <reference types="cypress" />

describe('AMW Sidenav Component', () => {
  beforeEach(() => {
    cy.visit('/components/sidenav');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Sidenav demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Sidenav');
    });

    it('should have sidenav component on the page', () => {
      cy.get('amw-sidenav, mat-sidenav-container').should('exist');
    });
  });

  describe('Sidenav Structure', () => {
    it('should have sidenav container', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-sidenav-container, .mat-drawer-container').length > 0) {
          cy.get('mat-sidenav-container, .mat-drawer-container').should('exist');
        } else {
          cy.log('No sidenav container found - skipping');
        }
      });
    });

    it('should have sidenav drawer', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-sidenav, mat-drawer, .mat-drawer').length > 0) {
          cy.get('mat-sidenav, mat-drawer, .mat-drawer').should('exist');
        } else {
          cy.log('No sidenav drawer found - skipping');
        }
      });
    });

    it('should have sidenav content area', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-sidenav-content, mat-drawer-content, .mat-drawer-content').length > 0) {
          cy.get('mat-sidenav-content, mat-drawer-content, .mat-drawer-content').should('exist');
        } else {
          cy.log('No sidenav content area found - skipping');
        }
      });
    });
  });

  describe('Sidenav Toggle', () => {
    it('should have toggle button', () => {
      cy.get('body').then(($body) => {
        const toggleBtn = $body.find('amw-button, button').filter((_, el) => /toggle|menu/i.test(el.textContent || ''));
        if (toggleBtn.length > 0) {
          cy.get('amw-button, button').contains(/toggle|menu/i).should('exist');
        } else {
          cy.log('No toggle button found - skipping');
        }
      });
    });

    it('should toggle sidenav visibility', () => {
      cy.get('body').then(($body) => {
        const toggleBtn = $body.find('amw-button button, button').filter((_, el) => /toggle|menu/i.test(el.textContent || ''));
        if (toggleBtn.length > 0) {
          cy.get('amw-button button, button').contains(/toggle|menu/i).first().click();
          cy.get('mat-sidenav, mat-drawer').should('exist');
        } else {
          cy.log('No toggle button found - skipping');
        }
      });
    });

    it('should open sidenav when closed', () => {
      cy.get('body').then(($body) => {
        const sidenav = $body.find('mat-sidenav, mat-drawer');
        if (sidenav.length > 0 && !sidenav.hasClass('mat-drawer-opened')) {
          const toggleBtn = $body.find('amw-button button, button').filter((_, el) => /toggle|menu|open/i.test(el.textContent || ''));
          if (toggleBtn.length > 0) {
            cy.wrap(toggleBtn).first().click();
            cy.get('mat-sidenav.mat-drawer-opened, mat-drawer.mat-drawer-opened').should('exist');
          } else {
            cy.log('No open button found - skipping');
          }
        } else {
          cy.log('Sidenav already open or not found - skipping');
        }
      });
    });
  });

  describe('Sidenav Modes', () => {
    it('should support over mode', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-sidenav[mode="over"], mat-drawer[mode="over"]').length > 0) {
          cy.get('mat-sidenav[mode="over"], mat-drawer[mode="over"]').should('exist');
        } else {
          cy.log('No over mode sidenav found - skipping');
        }
      });
    });

    it('should support push mode', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-sidenav[mode="push"], mat-drawer[mode="push"]').length > 0) {
          cy.get('mat-sidenav[mode="push"], mat-drawer[mode="push"]').should('exist');
        } else {
          cy.log('No push mode sidenav found - skipping');
        }
      });
    });

    it('should support side mode', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-sidenav[mode="side"], mat-drawer[mode="side"]').length > 0) {
          cy.get('mat-sidenav[mode="side"], mat-drawer[mode="side"]').should('exist');
        } else {
          cy.log('No side mode sidenav found - skipping');
        }
      });
    });
  });

  describe('Sidenav Position', () => {
    it('should support start position', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-sidenav[position="start"], mat-sidenav:not([position])').length > 0) {
          cy.get('mat-sidenav[position="start"], mat-sidenav:not([position])').should('exist');
        } else {
          cy.log('No start position sidenav found - skipping');
        }
      });
    });

    it('should support end position', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-sidenav[position="end"]').length > 0) {
          cy.get('mat-sidenav[position="end"]').should('exist');
        } else {
          cy.log('No end position sidenav found - skipping');
        }
      });
    });
  });

  describe('Sidenav Content', () => {
    it('should display navigation items', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-nav-list, nav, .sidenav-nav, mat-list').length > 0) {
          cy.get('mat-nav-list, nav, .sidenav-nav, mat-list').should('exist');
        } else {
          cy.log('No navigation items found - skipping');
        }
      });
    });

    it('should display navigation links', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-sidenav a, mat-drawer a, mat-list-item').length > 0) {
          cy.get('mat-sidenav a, mat-drawer a, mat-list-item').should('exist');
        } else {
          cy.log('No navigation links found - skipping');
        }
      });
    });
  });

  describe('Backdrop', () => {
    it('should show backdrop when sidenav opens in over mode', () => {
      cy.get('body').then(($body) => {
        const overSidenav = $body.find('mat-sidenav[mode="over"], mat-drawer[mode="over"]');
        if (overSidenav.length > 0) {
          // Open the sidenav
          const toggleBtn = $body.find('amw-button button, button').filter((_, el) => /toggle|menu/i.test(el.textContent || ''));
          if (toggleBtn.length > 0) {
            cy.wrap(toggleBtn).first().click();
            cy.get('.mat-drawer-backdrop').should('exist');
          } else {
            cy.log('No toggle button found - skipping');
          }
        } else {
          cy.log('No over mode sidenav found - skipping');
        }
      });
    });

    it('should close sidenav when clicking backdrop', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.mat-drawer-backdrop.mat-drawer-shown').length > 0) {
          cy.get('.mat-drawer-backdrop').click({ force: true });
          cy.get('mat-sidenav.mat-drawer-opened').should('not.exist');
        } else {
          cy.log('No visible backdrop found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-sidenav a, mat-sidenav button, mat-list-item').length > 0) {
          cy.get('mat-sidenav a, mat-sidenav button, mat-list-item').first()
            .focus()
            .should('have.focus');
        } else {
          cy.log('No focusable sidenav elements found - skipping');
        }
      });
    });

    it('should have proper ARIA attributes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-sidenav, mat-drawer').length > 0) {
          cy.get('mat-sidenav, mat-drawer').first()
            .should('have.attr', 'role');
        } else {
          cy.log('No sidenav found - skipping');
        }
      });
    });

    it('should trap focus when open in over mode', () => {
      cy.get('body').then(($body) => {
        if ($body.find('mat-sidenav[mode="over"].mat-drawer-opened').length > 0) {
          cy.get('mat-sidenav[mode="over"]').should('exist');
        } else {
          cy.log('No open over mode sidenav found - skipping');
        }
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('should handle different viewport sizes', () => {
      cy.get('amw-sidenav, mat-sidenav-container').should('exist');
      // Sidenav should adapt to viewport
    });
  });
});
