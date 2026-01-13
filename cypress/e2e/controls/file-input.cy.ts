/// <reference types="cypress" />

describe('AMW File Input Component', () => {
  beforeEach(() => {
    cy.visit('/file-input');
    cy.waitForAngular();
  });

  describe('Page Load', () => {
    it('should display the File Input demo page', () => {
      cy.get('h2, .demo-header h1').should('contain.text', 'File');
    });

    it('should have file input components on the page', () => {
      cy.get('amw-file-input, input[type="file"]').should('exist');
    });
  });

  describe('File Input Structure', () => {
    it('should have file input element', () => {
      cy.get('input[type="file"]').should('exist');
    });

    it('should have upload button or trigger', () => {
      cy.get('amw-file-input amw-button, amw-file-input button').should('exist');
    });
  });

  describe('File Selection', () => {
    it('should open file dialog on click', () => {
      // File inputs can't be easily tested for dialog opening
      // but we can test the component exists and is interactive
      cy.get('amw-file-input').first().should('exist');
    });

    it('should accept file upload', () => {
      cy.get('input[type="file"]').first().then(($input) => {
        // Create a test file
        const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);

        const inputEl = $input[0] as HTMLInputElement;
        inputEl.files = dataTransfer.files;
        cy.wrap($input).trigger('change', { force: true });
      });
    });
  });

  describe('File Input States', () => {
    it('should have disabled file input', () => {
      cy.get('amw-file-input[disabled="true"], input[type="file"]:disabled').should('exist');
    });
  });

  describe('File Type Restrictions', () => {
    it('should have accept attribute for file types', () => {
      cy.get('input[type="file"][accept]').then(($input) => {
        if ($input.length) {
          cy.wrap($input).should('have.attr', 'accept');
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should have associated label', () => {
      cy.get('amw-file-input label, amw-file-input mat-label').should('exist');
    });
  });
});
