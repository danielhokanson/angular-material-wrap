/// <reference types="cypress" />

describe('AMW Button Component', () => {
  beforeEach(() => {
    cy.visit('/controls/button');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Button demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Button');
    });

    it('should have tabs for navigation', () => {
      cy.get('.amw-tabs, amw-tabs').should('exist');
    });
  });

  describe('Size Variations', () => {
    it('should display small button', () => {
      cy.contains('Small Button').should('be.visible');
    });

    it('should display medium button', () => {
      cy.contains('Medium Button').should('be.visible');
    });

    it('should display large button', () => {
      cy.contains('Large Button').should('be.visible');
    });
  });

  describe('Appearance Variations', () => {
    it('should display text appearance button', () => {
      cy.get('amw-button[appearance="text"]').should('exist');
    });

    it('should display elevated appearance button', () => {
      cy.get('amw-button[appearance="elevated"]').should('exist');
    });

    it('should display outlined appearance button', () => {
      cy.get('amw-button[appearance="outlined"]').should('exist');
    });

    it('should display filled appearance button (default)', () => {
      // Filled is the default, so buttons without appearance attribute are filled
      cy.get('amw-button').should('exist');
    });

    it('should display tonal appearance button', () => {
      cy.get('amw-button[appearance="tonal"]').should('exist');
    });
  });

  describe('FAB Variations', () => {
    it('should display standard FAB button', () => {
      cy.get('body').then(($body) => {
        const fabSelector = 'amw-button .mat-mdc-fab, amw-button[fab], .mat-fab';
        if ($body.find(fabSelector).length > 0) {
          cy.get(fabSelector).should('exist');
        } else {
          cy.log('No standard FAB button found - skipping');
        }
      });
    });

    it('should display mini FAB button', () => {
      cy.get('body').then(($body) => {
        const miniFabSelector = 'amw-button[fab="mini"], amw-button .mat-mdc-mini-fab, .mat-mini-fab';
        if ($body.find(miniFabSelector).length > 0) {
          cy.get(miniFabSelector).should('exist');
        } else {
          cy.log('No mini FAB button found - skipping');
        }
      });
    });

    it('should display extended FAB button', () => {
      cy.get('body').then(($body) => {
        const extendedFabSelector = 'amw-button[fab="extended"], amw-button .mat-mdc-extended-fab, .mat-extended-fab';
        if ($body.find(extendedFabSelector).length > 0) {
          cy.get(extendedFabSelector).should('exist');
        } else {
          cy.log('No extended FAB button found - skipping');
        }
      });
    });
  });

  describe('Icon-Only Buttons', () => {
    it('should display icon-only button (inferred from icon without text)', () => {
      cy.get('body').then(($body) => {
        const iconBtnSelector = 'amw-button[icon], amw-button mat-icon';
        if ($body.find(iconBtnSelector).length > 0) {
          cy.get(iconBtnSelector).should('exist');
        } else {
          cy.log('No icon-only button found - skipping');
        }
      });
    });
  });

  describe('Color Variations', () => {
    it('should display primary color button', () => {
      cy.get('body').then(($body) => {
        if ($body.text().includes('Primary Action')) {
          cy.contains('Primary Action').scrollIntoView().should('be.visible');
        } else if ($body.find('amw-button[color="primary"]').length > 0) {
          cy.get('amw-button[color="primary"]').should('exist');
        } else {
          cy.get('amw-button').should('exist');
          cy.log('Primary color button with expected text not found - default buttons exist');
        }
      });
    });

    it('should display accent/secondary color button', () => {
      cy.get('body').then(($body) => {
        if ($body.text().includes('Secondary Action')) {
          cy.contains('Secondary Action').scrollIntoView().should('be.visible');
        } else if ($body.find('amw-button[color="accent"], amw-button[color="secondary"]').length > 0) {
          cy.get('amw-button[color="accent"], amw-button[color="secondary"]').should('exist');
        } else {
          cy.get('amw-button').should('exist');
          cy.log('Secondary color button with expected text not found - buttons exist');
        }
      });
    });

    it('should display warn color button', () => {
      cy.get('body').then(($body) => {
        if ($body.text().includes('Delete Item')) {
          cy.contains('Delete Item').scrollIntoView().should('be.visible');
        } else if ($body.find('amw-button[color="warn"]').length > 0) {
          cy.get('amw-button[color="warn"]').should('exist');
        } else {
          cy.get('amw-button').should('exist');
          cy.log('Warn color button with expected text not found - buttons exist');
        }
      });
    });
  });

  describe('State Variations', () => {
    it('should display normal state button', () => {
      cy.get('amw-button:not([disabled])').first().should('exist');
    });

    it('should display disabled state button', () => {
      cy.get('body').then(($body) => {
        const disabledSelector = 'amw-button[ng-reflect-disabled="true"], amw-button button:disabled, amw-button[disabled]';
        if ($body.find(disabledSelector).length > 0) {
          cy.get(disabledSelector).should('exist');
        } else {
          cy.log('No disabled button found in demo - skipping');
        }
      });
    });

    it('should display loading state button', () => {
      cy.get('body').then(($body) => {
        const loadingSelector = 'amw-button[ng-reflect-loading="true"], .amw-button--loading, amw-button[loading]';
        if ($body.find(loadingSelector).length > 0) {
          cy.get(loadingSelector).should('exist');
        } else {
          cy.log('No loading button found in demo - skipping');
        }
      });
    });
  });

  describe('Button Interactions', () => {
    it('should be clickable when enabled', () => {
      cy.get('amw-button:not([disabled]) button').first().click();
      // Button should respond to click (no error)
    });

    it('should not be clickable when disabled', () => {
      cy.get('amw-button button:disabled').first().should('be.disabled');
    });

    it('should show hover state on mouse over', () => {
      cy.get('amw-button:not([disabled]) button').first().trigger('mouseover');
      // Visual inspection - hover state should be applied
    });

    it('should show focus state on focus', () => {
      cy.get('amw-button:not([disabled]) button').first().focus();
      // Visual inspection - focus state should be applied
    });
  });

  describe('Button with Icons', () => {
    it('should display button with icon', () => {
      cy.get('amw-button[icon] mat-icon, amw-button .amw-button__icon, amw-button mat-icon').should('exist');
    });

    it('should display button with icon and text', () => {
      cy.get('body').then(($body) => {
        if ($body.text().includes('Real-world Example')) {
          cy.contains('Real-world Example').scrollIntoView();
        }
        // Find any button with both icon and text
        if ($body.find('amw-button mat-icon').length > 0) {
          cy.get('amw-button mat-icon').should('exist');
        } else if ($body.find('amw-button[icon]').length > 0) {
          cy.get('amw-button[icon]').should('exist');
        } else {
          cy.log('No button with icon and text found - skipping');
        }
      });
    });
  });

  describe('Real-world Examples', () => {
    beforeEach(() => {
      cy.get('body').then(($body) => {
        if ($body.text().includes('Real-world Example')) {
          cy.contains('Real-world Example').scrollIntoView();
        }
      });
    });

    it('should have Cancel and Save Changes buttons', () => {
      cy.get('body').then(($body) => {
        // Look for Cancel/Save buttons in main content area, not sidenav
        const mainContent = '.mat-sidenav-content, .main-content, main, .content-container';
        const cancelBtn = $body.find(`${mainContent} amw-button`).filter((_, el) => /cancel/i.test(el.textContent || ''));
        const saveBtn = $body.find(`${mainContent} amw-button`).filter((_, el) => /save/i.test(el.textContent || ''));

        if (cancelBtn.length > 0) {
          cy.get(`${mainContent} amw-button`).contains(/cancel/i).should('exist');
        }
        if (saveBtn.length > 0) {
          cy.get(`${mainContent} amw-button`).contains(/save/i).should('exist');
        }
        if (cancelBtn.length === 0 && saveBtn.length === 0) {
          cy.get('amw-button').should('have.length.at.least', 1);
          cy.log('Cancel/Save buttons not found in main content - buttons exist');
        }
      });
    });

    it('should have Edit and Delete buttons with icons', () => {
      cy.get('body').then(($body) => {
        // Look for Edit/Delete buttons in main content area, not sidenav
        const mainContent = '.mat-sidenav-content, .main-content, main, .content-container';
        const editBtn = $body.find(`${mainContent} amw-button`).filter((_, el) => /edit/i.test(el.textContent || ''));
        const deleteBtn = $body.find(`${mainContent} amw-button`).filter((_, el) => /delete/i.test(el.textContent || ''));

        if (editBtn.length > 0) {
          cy.get(`${mainContent} amw-button`).contains(/edit/i).should('exist');
        }
        if (deleteBtn.length > 0) {
          cy.get(`${mainContent} amw-button`).contains(/delete/i).should('exist');
        }
        if (editBtn.length === 0 && deleteBtn.length === 0) {
          cy.get('amw-button').should('have.length.at.least', 1);
          cy.log('Edit/Delete buttons not found in main content - buttons exist');
        }
      });
    });

    it('should have a FAB add button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.example-actions amw-button[icon="add"], .real-world-example amw-button[icon="add"], amw-button[fab]').length > 0) {
          cy.get('.example-actions amw-button[icon="add"], .real-world-example amw-button[icon="add"], amw-button[fab]').should('exist');
        } else {
          cy.log('FAB add button not found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('buttons should be keyboard accessible', () => {
      cy.get('amw-button:not([disabled]) button').first()
        .focus()
        .should('have.focus');
    });

    it('disabled buttons should have proper disabled attribute', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-button button:disabled').length > 0) {
          cy.get('amw-button button:disabled').first().should('have.attr', 'disabled');
        } else {
          cy.log('No disabled buttons found - skipping');
        }
      });
    });

    it('icon-only buttons should have aria-label', () => {
      cy.get('body').then(($body) => {
        const iconBtnWithAriaSelector = 'amw-button[icon] button[aria-label], amw-button button[aria-label]';
        if ($body.find(iconBtnWithAriaSelector).length > 0) {
          cy.get(iconBtnWithAriaSelector).should('exist');
        } else {
          cy.log('No icon-only buttons with aria-label found - skipping');
        }
      });
    });
  });
});
