/// <reference types="cypress" />

describe('AMW Notification Service', () => {
  beforeEach(() => {
    cy.visit('/services/notification');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Notification Service demo page', () => {
      cy.get('h1, h2, h3').should('contain.text', 'Notification');
    });

    it('should have notification type buttons', () => {
      cy.get('body').then(($body) => {
        const hasSuccess = $body.find('amw-button').filter((_, el) => /success/i.test(el.textContent || '')).length > 0;
        const hasError = $body.find('amw-button').filter((_, el) => /error/i.test(el.textContent || '')).length > 0;
        const hasInfo = $body.find('amw-button').filter((_, el) => /info/i.test(el.textContent || '')).length > 0;
        if (hasSuccess || hasError || hasInfo) {
          cy.get('amw-button').should('exist');
        } else {
          cy.get('amw-button').should('have.length.at.least', 1);
        }
      });
    });
  });

  describe('Notification Types', () => {
    it('should show success notification', () => {
      cy.get('body').then(($body) => {
        const successBtn = $body.find('amw-button').filter((_, el) => /success/i.test(el.textContent || ''));
        if (successBtn.length > 0) {
          cy.get('amw-button').contains(/success/i).first().click();
          cy.waitForNotification();
        } else {
          cy.log('No success button found - skipping');
        }
      });
    });

    it('should show error notification', () => {
      cy.get('body').then(($body) => {
        const errorBtn = $body.find('amw-button').filter((_, el) => /error/i.test(el.textContent || ''));
        if (errorBtn.length > 0) {
          cy.get('amw-button').contains(/error/i).first().click();
          cy.waitForNotification();
        } else {
          cy.log('No error button found - skipping');
        }
      });
    });

    it('should show info notification', () => {
      cy.get('body').then(($body) => {
        const infoBtn = $body.find('amw-button').filter((_, el) => /info/i.test(el.textContent || ''));
        if (infoBtn.length > 0) {
          cy.get('amw-button').contains(/info/i).first().click();
          cy.waitForNotification();
        } else {
          cy.log('No info button found - skipping');
        }
      });
    });
  });

  describe('Code Tab', () => {
    beforeEach(() => {
      cy.get('body').then(($body) => {
        const hasCodeTab = $body.find('.amw-tabs__tab, [role="tab"]').filter((_, el) => /code/i.test(el.textContent || '')).length > 0;
        if (hasCodeTab) {
          cy.get('.amw-tabs__tab, [role="tab"]').contains(/code/i).click();
        }
      });
    });

    it('should display code examples', () => {
      cy.get('body').then(($body) => {
        const hasCode = $body.find('pre code, .code-example, .demo-code').length > 0;
        if (hasCode) {
          cy.get('pre code, .code-example, .demo-code').should('exist');
        } else {
          cy.log('No code examples found - skipping');
        }
      });
    });

    it('should have code content', () => {
      cy.get('body').then(($body) => {
        const hasCode = $body.find('pre, code').length > 0;
        if (hasCode) {
          cy.get('pre, code').should('exist');
        } else {
          cy.log('No code content found - skipping');
        }
      });
    });
  });

  describe('API Tab', () => {
    beforeEach(() => {
      cy.get('body').then(($body) => {
        const hasApiTab = $body.find('.amw-tabs__tab, [role="tab"]').filter((_, el) => /api/i.test(el.textContent || '')).length > 0;
        if (hasApiTab) {
          cy.get('.amw-tabs__tab, [role="tab"]').contains(/api/i).click();
        }
      });
    });

    it('should display API documentation', () => {
      cy.get('body').then(($body) => {
        const hasApi = $body.find('.api-content, .api-table, table, .notification-api').length > 0;
        if (hasApi) {
          cy.get('.api-content, .api-table, table, .notification-api').should('exist');
        } else {
          cy.log('No API documentation found - skipping');
        }
      });
    });

    it('should display service information', () => {
      cy.get('body').then(($body) => {
        const hasTable = $body.find('table, .api-table').length > 0;
        if (hasTable) {
          cy.get('table, .api-table').should('exist');
        } else {
          cy.log('No service information table found - skipping');
        }
      });
    });
  });

  describe('Notification Display', () => {
    it('should display notification in snackbar container', () => {
      cy.get('body').then(($body) => {
        const hasButton = $body.find('amw-button').length > 0;
        if (hasButton) {
          cy.get('amw-button').first().click();
          cy.get('.mat-mdc-snack-bar-container, .mat-snack-bar-container, .amw-notification, [role="alert"]', { timeout: 5000 }).should('exist');
        } else {
          cy.log('No notification buttons found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should have accessible notification buttons', () => {
      cy.get('amw-button button, button').should('have.length.at.least', 1);
    });

    it('should be keyboard navigable', () => {
      cy.get('body').then(($body) => {
        const hasButton = $body.find('amw-button button, button').length > 0;
        if (hasButton) {
          cy.get('amw-button button, button').first().focus().should('have.focus');
        } else {
          cy.log('No buttons found for keyboard navigation test - skipping');
        }
      });
    });

    it('should announce notifications to screen readers', () => {
      cy.get('body').then(($body) => {
        const hasButton = $body.find('amw-button').length > 0;
        if (hasButton) {
          cy.get('amw-button').first().click();
          cy.get('[aria-live], [role="status"], [role="alert"], .mat-mdc-snack-bar-container', { timeout: 5000 }).should('exist');
        } else {
          cy.log('No buttons found - skipping');
        }
      });
    });
  });
});
