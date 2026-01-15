describe('Demo App', () => {
  it('should load the demo app home page', () => {
    cy.visit('/');
    cy.waitForAngular();
    // Home page should have the main app structure
    cy.get('app-root, amw-demo-root').should('exist');
  });
})
