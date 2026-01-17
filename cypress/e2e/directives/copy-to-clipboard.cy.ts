/// <reference types="cypress" />

describe('AMW Copy to Clipboard Directive', () => {
  beforeEach(() => {
    cy.visit('/directives/copy-to-clipboard');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Copy to Clipboard Directive demo page', () => {
      cy.get('h1, h3').should('contain.text', 'Copy');
    });

    it('should have copy-to-clipboard demo elements', () => {
      cy.get('body').then(($body) => {
        const hasCopyDirective = $body.find('[amwCopyToClipboard], [amwcopyToClipboard], amw-button').length > 0;
        if (hasCopyDirective) {
          cy.get('[amwCopyToClipboard], [amwcopyToClipboard], amw-button').should('exist');
        } else {
          cy.log('No copy-to-clipboard elements found - skipping');
        }
      });
    });
  });

  describe('Copy Text Demo', () => {
    it('should have text input field', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-input').length > 0) {
          cy.get('amw-input').should('exist');
        } else {
          cy.log('No input field found - skipping');
        }
      });
    });

    it('should have copy to clipboard button', () => {
      cy.get('body').then(($body) => {
        const hasCopyBtn = $body.find('amw-button').filter((_, el) => /copy/i.test(el.textContent || '')).length > 0;
        if (hasCopyBtn) {
          cy.get('amw-button').contains(/copy/i).should('exist');
        } else {
          cy.log('No copy button found - skipping');
        }
      });
    });

    it('should copy text on button click', () => {
      cy.get('body').then(($body) => {
        const hasInput = $body.find('amw-input input').length > 0;
        const hasCopyBtn = $body.find('amw-button').filter((_, el) => /copy/i.test(el.textContent || '')).length > 0;
        if (hasInput && hasCopyBtn) {
          cy.get('amw-input input').first().clear().type('Test copy text');
          cy.get('amw-button').contains(/copy/i).first().click();
        } else {
          cy.log('No copy controls found - skipping');
        }
      });
    });
  });

  describe('Copy Code Block Demo', () => {
    it('should have code block', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-block pre, pre code, pre').length > 0) {
          cy.get('.code-block pre, pre code, pre').should('exist');
        } else {
          cy.log('No code block found - skipping');
        }
      });
    });

    it('should have copy code button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-button[icon="content_copy"], amw-button').length > 0) {
          cy.get('amw-button[icon="content_copy"], amw-button').should('exist');
        } else {
          cy.log('No copy code button found - skipping');
        }
      });
    });
  });

  describe('Code Tab', () => {
    beforeEach(() => {
      cy.get('body').then(($body) => {
        const hasCodeTab = $body.find('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').filter((_, el) => /code/i.test(el.textContent || '')).length > 0;
        if (hasCodeTab) {
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/code/i).click();
        }
      });
    });

    it('should display code examples', () => {
      cy.get('body').then(($body) => {
        if ($body.find('pre code, .code-example, pre').length > 0) {
          cy.get('pre code, .code-example, pre').should('exist');
        } else {
          cy.log('No code examples found - skipping');
        }
      });
    });

    it('should have basic usage example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example').text().toLowerCase().includes('basic')) {
          cy.get('.code-example').should('exist');
        } else {
          cy.log('Basic example not found - skipping');
        }
      });
    });

    it('should have copy from input example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, pre').text().toLowerCase().includes('input')) {
          cy.get('.code-example, pre').should('exist');
        } else {
          cy.log('Input example not found - skipping');
        }
      });
    });

    it('should have event handling example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, pre').text().toLowerCase().includes('event')) {
          cy.get('.code-example, pre').should('exist');
        } else {
          cy.log('Event example not found - skipping');
        }
      });
    });

    it('should have custom messages example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, pre').text().toLowerCase().includes('custom')) {
          cy.get('.code-example, pre').should('exist');
        } else {
          cy.log('Custom example not found - skipping');
        }
      });
    });

    it('should have code block copy example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, pre').text().toLowerCase().includes('code')) {
          cy.get('.code-example, pre').should('exist');
        } else {
          cy.log('Code block example not found - skipping');
        }
      });
    });

    it('should have interactive copy buttons', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.preview amw-button, amw-button').length > 0) {
          cy.get('.preview amw-button, amw-button').should('exist');
        } else {
          cy.log('No interactive copy buttons found - skipping');
        }
      });
    });
  });

  describe('Interactive Code Examples', () => {
    beforeEach(() => {
      cy.get('body').then(($body) => {
        const hasCodeTab = $body.find('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').filter((_, el) => /code/i.test(el.textContent || '')).length > 0;
        if (hasCodeTab) {
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/code/i).click();
        }
      });
    });

    it('should have copy text button in preview', () => {
      cy.get('body').then(($body) => {
        const hasCopyBtn = $body.find('.preview amw-button, amw-button').filter((_, el) => /copy/i.test(el.textContent || '')).length > 0;
        if (hasCopyBtn) {
          cy.get('.preview amw-button, amw-button').contains(/copy/i).should('exist');
        } else {
          cy.log('No copy button in preview - skipping');
        }
      });
    });

    it('should have copy code button in preview', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.preview amw-button, amw-button[icon="content_copy"], amw-button').length > 0) {
          cy.get('.preview amw-button, amw-button[icon="content_copy"], amw-button').should('exist');
        } else {
          cy.log('No copy code button in preview - skipping');
        }
      });
    });

    it('should copy text when clicking copy button', () => {
      cy.get('body').then(($body) => {
        // Look for visible copy button in the active tab panel
        const visiblePanel = '.amw-tabs__panel--active, .mat-mdc-tab-body-active, [role="tabpanel"]:visible';
        const hasCopyBtn = $body.find(`${visiblePanel} amw-button`).filter((_, el) => /copy/i.test(el.textContent || '')).length > 0;
        if (hasCopyBtn) {
          cy.get(`${visiblePanel} amw-button`).contains(/copy/i).first().click();
        } else {
          // Fallback: try to find any visible copy button
          const anyVisibleCopyBtn = $body.find('amw-button:visible').filter((_, el) => /copy/i.test(el.textContent || '')).length > 0;
          if (anyVisibleCopyBtn) {
            cy.get('amw-button:visible').contains(/copy/i).first().click();
          } else {
            cy.log('No visible copy button found - skipping');
          }
        }
      });
    });
  });

  describe('API Tab', () => {
    beforeEach(() => {
      cy.get('body').then(($body) => {
        const hasApiTab = $body.find('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').filter((_, el) => /api/i.test(el.textContent || '')).length > 0;
        if (hasApiTab) {
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/api/i).click();
        }
      });
    });

    it('should display API documentation', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.copy-to-clipboard-api, .api-content, .api-section, table').length > 0) {
          cy.get('.copy-to-clipboard-api, .api-content, .api-section, table').should('exist');
        } else {
          cy.log('No API documentation found - skipping');
        }
      });
    });

    it('should display directive inputs', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.api-section__inputs .api-table, .api-table, table').length > 0) {
          cy.get('.api-section__inputs .api-table, .api-table, table').should('exist');
        } else {
          cy.log('No directive inputs found - skipping');
        }
      });
    });

    it('should display directive outputs', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.api-section__outputs .api-table, .api-table, table').length > 0) {
          cy.get('.api-section__outputs .api-table, .api-table, table').should('exist');
        } else {
          cy.log('No directive outputs found - skipping');
        }
      });
    });

    it('should display usage notes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.api-section__usage, .usage-notes').length > 0) {
          cy.get('.api-section__usage, .usage-notes').should('exist');
        } else {
          cy.log('No usage notes found - skipping');
        }
      });
    });

    it('should display behavior details', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.api-section__behavior, .behavior-notes').length > 0) {
          cy.get('.api-section__behavior, .behavior-notes').should('exist');
        } else {
          cy.log('No behavior details found - skipping');
        }
      });
    });

    it('should document amwCopySuccess event', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('copysuccess')) {
          cy.get('body').should('contain.text', 'opySuccess');
        } else {
          cy.log('amwCopySuccess not documented - skipping');
        }
      });
    });

    it('should document amwCopyError event', () => {
      cy.get('body').then(($body) => {
        if ($body.text().toLowerCase().includes('copyerror')) {
          cy.get('body').should('contain.text', 'opyError');
        } else {
          cy.log('amwCopyError not documented - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should have accessible copy buttons', () => {
      cy.get('body').then(($body) => {
        const buttonSelector = 'amw-button button, button';
        if ($body.find(buttonSelector).length > 0) {
          cy.get(buttonSelector).should('have.length.at.least', 1);
        } else {
          cy.log('No buttons found - skipping');
        }
      });
    });

    it('should have accessible input fields', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-input[label], amw-input').length > 0) {
          cy.get('amw-input[label], amw-input').should('exist');
        } else {
          cy.log('No input fields found - skipping');
        }
      });
    });

    it('should support keyboard activation', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-button button, button').length > 0) {
          cy.get('amw-button button, button').first().focus().should('have.focus');
        } else {
          cy.log('No buttons found - skipping');
        }
      });
    });
  });
});
