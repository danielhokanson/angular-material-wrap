/// <reference types="cypress" />

describe('AMW Tabs Component', () => {
  beforeEach(() => {
    cy.visit('/components/tabs');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Tabs demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'Tabs');
    });

    it('should have tabs components on the page', () => {
      cy.get('amw-tabs').should('exist');
    });
  });

  describe('Tabs Structure', () => {
    it('should have tab header', () => {
      cy.get('amw-tabs .amw-tabs__header, amw-tabs .mat-mdc-tab-header').should('exist');
    });

    it('should have multiple tabs', () => {
      cy.get('amw-tabs .amw-tabs__tab, amw-tabs .mat-mdc-tab').should('have.length.greaterThan', 1);
    });

    it('should have tab content area', () => {
      cy.get('amw-tabs .amw-tabs__content, amw-tabs .mat-mdc-tab-body-wrapper').should('exist');
    });
  });

  describe('Tab Navigation', () => {
    it('should have one active tab by default', () => {
      cy.get('amw-tabs .amw-tabs__tab--active, amw-tabs .mat-mdc-tab.mdc-tab--active').should('have.length', 1);
    });

    it('should switch tabs on click', () => {
      // Click second tab
      cy.get('amw-tabs .amw-tabs__tab, amw-tabs .mat-mdc-tab').eq(1).click();

      // Second tab should be active (check for either AMW or Material active class)
      cy.get('amw-tabs .amw-tabs__tab, amw-tabs .mat-mdc-tab').eq(1)
        .should($el => {
          const hasAmwActive = $el.hasClass('amw-tabs__tab--active');
          const hasMdcActive = $el.hasClass('mdc-tab--active');
          expect(hasAmwActive || hasMdcActive, 'tab should be active').to.be.true;
        });
    });

    it('should show corresponding content when tab is selected', () => {
      // Click second tab
      cy.get('amw-tabs .amw-tabs__tab, amw-tabs .mat-mdc-tab').eq(1).click();

      // Content should change
      cy.get('amw-tabs .amw-tabs__panel--active, amw-tabs .mat-mdc-tab-body-active').should('exist');
    });
  });

  describe('Tab Labels', () => {
    it('should display tab labels', () => {
      cy.get('amw-tabs .amw-tabs__tab, amw-tabs .mat-mdc-tab').first()
        .should('not.be.empty');
    });
  });

  describe('Tab with Icons', () => {
    it('should display tabs with icons', () => {
      cy.get('amw-tabs .amw-tabs__tab mat-icon, amw-tabs .mat-mdc-tab mat-icon').should('exist');
    });
  });

  describe('Disabled Tabs', () => {
    it('should have disabled tabs', () => {
      cy.get('amw-tabs .amw-tabs__tab--disabled, amw-tabs .mat-mdc-tab-disabled').should('exist');
    });

    it('disabled tab should not be selectable', () => {
      cy.get('amw-tabs .amw-tabs__tab--disabled, amw-tabs .mat-mdc-tab-disabled').first().click({ force: true });
      // Should not become active
      cy.get('amw-tabs .amw-tabs__tab--disabled, amw-tabs .mat-mdc-tab-disabled').first()
        .should('not.have.class', 'amw-tabs__tab--active');
    });
  });

  describe('Tab Content', () => {
    it('should display content for active tab', () => {
      cy.get('amw-tabs .amw-tabs__panel--active, amw-tabs .mat-mdc-tab-body-active').should('be.visible');
    });

    it('should hide content for inactive tabs', () => {
      cy.get('amw-tabs .amw-tabs__panel:not(.amw-tabs__panel--active)').should('not.be.visible');
    });
  });

  describe('Accessibility', () => {
    it('tabs should be keyboard accessible', () => {
      cy.get('amw-tabs .amw-tabs__tab, amw-tabs .mat-mdc-tab').first()
        .focus()
        .should('have.focus');
    });

    it('should navigate tabs with arrow keys', () => {
      cy.get('amw-tabs .amw-tabs__tab, amw-tabs .mat-mdc-tab').first()
        .focus()
        .type('{rightarrow}');
      cy.get('amw-tabs .amw-tabs__tab, amw-tabs .mat-mdc-tab').eq(1).should('have.focus');
    });

    it('should have proper ARIA attributes', () => {
      cy.get('amw-tabs .amw-tabs__tab, amw-tabs .mat-mdc-tab').first()
        .should('have.attr', 'role', 'tab');
    });

    it('tab content should have tabpanel role', () => {
      cy.get('amw-tabs .amw-tabs__panel, amw-tabs .mat-mdc-tab-body').first()
        .should('have.attr', 'role', 'tabpanel');
    });
  });
});
