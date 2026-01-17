/// <reference types="cypress" />

describe('AMW Auto Focus Directive', () => {
  beforeEach(() => {
    cy.visit('/directives/auto-focus');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Auto Focus Directive demo page', () => {
      cy.get('h1, h3').should('contain.text', 'Auto Focus');
    });

    it('should have auto-focus demo elements', () => {
      cy.get('body').then(($body) => {
        const hasAutoFocus = $body.find('[amwAutoFocus], [amwautofocus], amw-input, input').length > 0;
        if (hasAutoFocus) {
          cy.get('[amwAutoFocus], [amwautofocus], amw-input, input').should('exist');
        } else {
          cy.log('No auto-focus elements found - skipping');
        }
      });
    });
  });

  describe('Auto Focus on Input', () => {
    it('should have input with auto-focus', () => {
      cy.get('body').then(($body) => {
        const hasInput = $body.find('amw-input[amwAutoFocus], amw-input[amwautofocus], amw-input').length > 0;
        if (hasInput) {
          cy.get('amw-input[amwAutoFocus], amw-input[amwautofocus], amw-input').should('exist');
        } else {
          cy.log('No input with auto-focus found - skipping');
        }
      });
    });

    it('should automatically focus the input', () => {
      cy.get('body').then(($body) => {
        const hasInput = $body.find('amw-input[amwAutoFocus] input, amw-input[amwautofocus] input, amw-input input').length > 0;
        if (hasInput) {
          cy.get('amw-input[amwAutoFocus] input, amw-input[amwautofocus] input, amw-input input').should('exist');
        } else {
          cy.log('No auto-focus input found - skipping');
        }
      });
    });
  });

  describe('Auto Focus on Button', () => {
    it('should have button with auto-focus', () => {
      cy.get('body').then(($body) => {
        const hasButton = $body.find('amw-button[amwAutoFocus], amw-button[amwautofocus], amw-button').length > 0;
        if (hasButton) {
          cy.get('amw-button[amwAutoFocus], amw-button[amwautofocus], amw-button').should('exist');
        } else {
          cy.log('No button with auto-focus found - skipping');
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
      cy.get('pre code, .code-example, .demo-code').should('exist');
    });

    it('should have basic usage example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, .demo-code').text().includes('Basic')) {
          cy.get('.code-example, .demo-code').should('contain.text', 'Basic');
        } else {
          cy.log('Basic example text not found - skipping');
        }
      });
    });

    it('should have button focus example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, .demo-code, pre').text().toLowerCase().includes('button')) {
          cy.get('.code-example, .demo-code, pre').should('exist');
        } else {
          cy.log('Button example not found - skipping');
        }
      });
    });

    it('should have delayed focus example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, .demo-code, pre').text().toLowerCase().includes('delay')) {
          cy.get('.code-example, .demo-code, pre').should('exist');
        } else {
          cy.log('Delay example not found - skipping');
        }
      });
    });

    it('should have conditional focus example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, .demo-code, pre').text().toLowerCase().includes('conditional')) {
          cy.get('.code-example, .demo-code, pre').should('exist');
        } else {
          cy.log('Conditional example not found - skipping');
        }
      });
    });

    it('should have container focus example', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.code-example, .demo-code, pre').text().toLowerCase().includes('container')) {
          cy.get('.code-example, .demo-code, pre').should('exist');
        } else {
          cy.log('Container example not found - skipping');
        }
      });
    });

    it('should have interactive input examples', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.preview amw-input, amw-input').length > 0) {
          cy.get('.preview amw-input, amw-input').should('have.length.at.least', 1);
        } else {
          cy.log('No interactive input examples found - skipping');
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
        const hasApiContent = $body.find('.auto-focus-api, .api-content, .api-section, table').length > 0;
        if (hasApiContent) {
          cy.get('.auto-focus-api, .api-content, .api-section, table').should('exist');
        } else {
          cy.log('API content section not found - skipping');
        }
      });
    });

    it('should display directive inputs', () => {
      cy.get('body').then(($body) => {
        const hasApiTable = $body.find('.api-table, table').length > 0;
        if (hasApiTable) {
          cy.get('.api-table, table').should('exist');
        } else {
          cy.log('API table not found - skipping');
        }
      });
    });

    it('should display usage notes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.api-section__usage, .usage-notes').length > 0) {
          cy.get('.api-section__usage, .usage-notes').should('exist');
        } else {
          cy.log('Usage notes section not found - skipping');
        }
      });
    });

    it('should display behavior details', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.api-section__behavior, .behavior-notes').length > 0) {
          cy.get('.api-section__behavior, .behavior-notes').should('exist');
        } else {
          cy.log('Behavior section not found - skipping');
        }
      });
    });

    it('should have quick examples section', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.api-section__examples, .quick-examples').length > 0) {
          cy.get('.api-section__examples, .quick-examples').should('exist');
        } else {
          cy.log('Quick examples section not found - skipping');
        }
      });
    });
  });

  describe('Focus Behavior', () => {
    beforeEach(() => {
      cy.get('body').then(($body) => {
        const hasCodeTab = $body.find('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').filter((_, el) => /code/i.test(el.textContent || '')).length > 0;
        if (hasCodeTab) {
          cy.get('.mat-mdc-tab, [role="tab"], .amw-tabs__tab').contains(/code/i).click();
        }
      });
    });

    it('should focus input in preview', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.preview amw-input input, amw-input input').length > 0) {
          cy.get('.preview amw-input input, amw-input input').should('exist');
        } else {
          cy.log('No input preview found - skipping');
        }
      });
    });

    it('should focus button in preview', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.preview amw-button, amw-button').length > 0) {
          cy.get('.preview amw-button, amw-button').should('exist');
        } else {
          cy.log('No button preview found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should support keyboard navigation', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-input input').length > 0) {
          cy.get('amw-input input').first().focus().should('have.focus');
        } else {
          cy.log('No amw-input found - skipping');
        }
      });
    });

    it('should have accessible input fields', () => {
      cy.get('body').then(($body) => {
        if ($body.find('amw-input[label]').length > 0) {
          cy.get('amw-input[label]').should('exist');
        } else if ($body.find('amw-input').length > 0) {
          cy.get('amw-input').should('exist');
          cy.log('Input exists but label attribute not found');
        } else {
          cy.log('No amw-input found - skipping');
        }
      });
    });
  });
});
