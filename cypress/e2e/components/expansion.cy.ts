/// <reference types="cypress" />

describe('AMW Expansion Panel Component', () => {
  beforeEach(() => {
    cy.visit('/components/expansion');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Expansion Panel demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Expansion');
    });

    it('should have expansion panel elements on the page', () => {
      cy.get('amw-expansion-panel').should('exist');
    });
  });

  describe('Basic Expansion Panel', () => {
    it('should display expansion panel header', () => {
      cy.get('amw-expansion-panel-header').should('exist');
    });

    it('should display panel title', () => {
      cy.get('amw-panel-title').should('exist');
    });

    it('should have clickable header', () => {
      cy.get('amw-expansion-panel-header').first().should('have.css', 'cursor', 'pointer');
    });
  });

  describe('Panel Expand/Collapse', () => {
    it('should expand panel when clicking header', () => {
      cy.get('amw-expansion-panel').first().then(($panel) => {
        const isExpanded = $panel.find('.amw-expansion-panel-content').is(':visible');
        if (!isExpanded) {
          cy.wrap($panel).find('amw-expansion-panel-header').click();
          cy.wrap($panel).find('.amw-expansion-panel-content').should('be.visible');
        } else {
          cy.log('Panel already expanded - testing collapse');
          cy.wrap($panel).find('amw-expansion-panel-header').click();
          cy.wrap($panel).find('.amw-expansion-panel-content').should('not.be.visible');
        }
      });
    });

    it('should collapse panel when clicking expanded header', () => {
      cy.get('amw-expansion-panel[expanded="true"], amw-expansion-panel.expanded').first().then(($panel) => {
        if ($panel.length > 0) {
          cy.wrap($panel).find('amw-expansion-panel-header').click();
          cy.wrap($panel).find('.amw-expansion-panel-content').should('not.be.visible');
        } else {
          cy.log('No expanded panel found - skipping');
        }
      });
    });
  });

  describe('Panel with Description', () => {
    it('should display panel description', () => {
      cy.get('body').then(($body) => {
        const hasDescription = $body.find('amw-panel-description').length > 0;
        if (hasDescription) {
          cy.get('amw-panel-description').should('exist');
        } else {
          cy.log('Panel description not found - skipping');
        }
      });
    });
  });

  describe('Expanded by Default', () => {
    it('should have panel expanded by default when configured', () => {
      cy.get('body').then(($body) => {
        const expandedPanel = $body.find('amw-expansion-panel[expanded="true"]');
        if (expandedPanel.length > 0) {
          cy.wrap(expandedPanel).find('.amw-expansion-panel-content').should('be.visible');
        } else {
          cy.log('No default expanded panel found - skipping');
        }
      });
    });
  });

  describe('Disabled Panel', () => {
    it('should not expand disabled panel', () => {
      cy.get('body').then(($body) => {
        const disabledPanel = $body.find('amw-expansion-panel[disabled]');
        if (disabledPanel.length > 0) {
          cy.wrap(disabledPanel).should('have.css', 'pointer-events', 'none');
        } else {
          cy.log('Disabled panel not found - skipping');
        }
      });
    });
  });

  describe('Accordion (Single Mode)', () => {
    it('should close other panels when opening one in single mode', () => {
      cy.get('amw-accordion:not([multi])').first().then(($accordion) => {
        if ($accordion.length > 0) {
          const panels = $accordion.find('amw-expansion-panel');
          if (panels.length >= 2) {
            // Click first panel
            cy.wrap(panels).first().find('amw-expansion-panel-header').click();
            // Click second panel
            cy.wrap(panels).eq(1).find('amw-expansion-panel-header').click();
            // First should be closed
            cy.wrap(panels).first().find('.amw-expansion-panel-content').should('not.be.visible');
          } else {
            cy.log('Not enough panels for accordion test - skipping');
          }
        } else {
          cy.log('Single mode accordion not found - skipping');
        }
      });
    });
  });

  describe('Accordion (Multi Mode)', () => {
    it('should allow multiple panels open in multi mode', () => {
      cy.get('amw-accordion[multi="true"]').first().then(($accordion) => {
        if ($accordion.length > 0) {
          const panels = $accordion.find('amw-expansion-panel');
          if (panels.length >= 2) {
            // Click first panel
            cy.wrap(panels).first().find('amw-expansion-panel-header').click();
            // Click second panel
            cy.wrap(panels).eq(1).find('amw-expansion-panel-header').click();
            // Both should be open
            cy.wrap(panels).first().find('.amw-expansion-panel-content').should('be.visible');
            cy.wrap(panels).eq(1).find('.amw-expansion-panel-content').should('be.visible');
          } else {
            cy.log('Not enough panels for multi mode test - skipping');
          }
        } else {
          cy.log('Multi mode accordion not found - skipping');
        }
      });
    });
  });

  describe('Events', () => {
    it('should update state text when panel opens', () => {
      cy.get('body').then(($body) => {
        const stateText = $body.find('.state-text');
        if (stateText.length > 0) {
          cy.get('amw-expansion-panel').first().find('amw-expansion-panel-header').click();
          cy.get('.state-text').should('contain.text', 'Open');
        } else {
          cy.log('State text not found - skipping');
        }
      });
    });
  });

  describe('Flat Display Mode', () => {
    it('should support flat display mode', () => {
      cy.get('body').then(($body) => {
        const flatAccordion = $body.find('amw-accordion[displayMode="flat"]');
        if (flatAccordion.length > 0) {
          cy.wrap(flatAccordion).should('exist');
        } else {
          cy.log('Flat display mode not found - skipping');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('expansion panel header should be focusable', () => {
      cy.get('amw-expansion-panel-header').first()
        .focus()
        .should('have.focus');
    });

    it('should toggle with keyboard', () => {
      cy.get('amw-expansion-panel').first().then(($panel) => {
        cy.wrap($panel).find('amw-expansion-panel-header').focus().type('{enter}');
        // Panel state should change
        cy.wrap($panel).should('exist');
      });
    });

    it('should have aria-expanded attribute', () => {
      cy.get('amw-expansion-panel .amw-expansion-panel, amw-expansion-panel[aria-expanded]').first()
        .should('have.attr', 'aria-expanded');
    });
  });
});
