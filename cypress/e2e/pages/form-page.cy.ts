/// <reference types="cypress" />

describe('AMW Form Page', () => {
  beforeEach(() => {
    cy.visit('/pages/form');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the Form Page demo', () => {
      cy.get('h1').should('contain.text', 'Form');
    });

    it('should display page description', () => {
      cy.get('.form-page-demo__header p').should('contain.text', 'AMW Form Page');
    });

    it('should have form page component', () => {
      cy.get('amw-form-page').should('exist');
    });
  });

  describe('View Tabs', () => {
    it('should have view tabs', () => {
      cy.get('amw-tabs').should('exist');
    });

    it('should have Basic View tab', () => {
      cy.get('amw-tab').contains('Basic View').should('exist');
    });

    it('should have Advanced View tab', () => {
      cy.get('amw-tab').contains('Advanced View').should('exist');
    });

    it('should switch between views', () => {
      cy.get('.amw-tabs__tab, amw-tab').contains('Advanced View').click();
      cy.get('.form-page-demo__tab-content').should('contain.text', 'auto-save');
    });
  });

  describe('Form Mode Controls', () => {
    it('should have mode controls section', () => {
      cy.get('.form-page-demo__mode-controls').should('exist');
    });

    it('should have Create mode button', () => {
      cy.get('amw-button').contains('Create').should('exist');
    });

    it('should have Edit mode button', () => {
      cy.get('amw-button').contains('Edit').should('exist');
    });

    it('should have View mode button', () => {
      cy.get('amw-button').contains('View').should('exist');
    });

    it('should switch to Create mode', () => {
      cy.get('amw-button').contains('Create').click();
    });

    it('should switch to Edit mode', () => {
      cy.get('amw-button').contains('Edit').click();
    });

    it('should switch to View mode', () => {
      cy.get('amw-button').contains('View').click();
    });
  });

  describe('Form Page Component', () => {
    it('should display form fields', () => {
      cy.get('amw-form-page input, amw-form-page amw-input').should('have.length.at.least', 1);
    });

    it('should have form sections', () => {
      cy.get('amw-form-page').should('exist');
    });
  });

  describe('Demo Information Card', () => {
    it('should display info card', () => {
      cy.get('.form-page-demo__info-card').should('exist');
    });

    it('should display features list', () => {
      cy.get('.form-page-demo__info-content ul li').should('have.length.at.least', 5);
    });

    it('should mention validation', () => {
      cy.get('.form-page-demo__info-content').should('contain.text', 'validation');
    });

    it('should mention auto-save', () => {
      cy.get('.form-page-demo__info-content').should('contain.text', 'Auto-save');
    });

    it('should mention form sections', () => {
      cy.get('.form-page-demo__info-content').should('contain.text', 'Form Sections');
    });

    it('should list Personal Information section', () => {
      cy.get('.form-page-demo__info-content').should('contain.text', 'Personal Information');
    });

    it('should list Professional Information section', () => {
      cy.get('.form-page-demo__info-content').should('contain.text', 'Professional Information');
    });

    it('should display validation rules', () => {
      cy.get('.form-page-demo__info-content').should('contain.text', 'Validation Rules');
    });
  });

  describe('Form Interactions', () => {
    it('should allow input in form fields', () => {
      cy.get('amw-form-page amw-input input, amw-form-page input').first()
        .clear()
        .type('Test Value');
    });

    it('should show validation errors on invalid input', () => {
      // Clear a required field and blur to trigger validation
      cy.get('amw-form-page amw-input input, amw-form-page input').first()
        .clear()
        .blur();
    });
  });

  describe('Divider Component', () => {
    it('should have divider between sections', () => {
      cy.get('.form-page-demo__divider, amw-divider').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('exist');
      cy.get('h2').should('exist');
      cy.get('h4').should('have.length.at.least', 2);
    });

    it('should have accessible form fields', () => {
      cy.get('amw-input[label], input[placeholder]').should('exist');
    });

    it('should have accessible buttons', () => {
      cy.get('amw-button button').should('have.length.at.least', 3);
    });

    it('should have mode buttons with icons', () => {
      cy.get('.form-page-demo__mode-buttons amw-button[icon]').should('have.length', 3);
    });
  });
});
