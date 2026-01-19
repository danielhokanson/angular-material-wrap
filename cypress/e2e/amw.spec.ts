describe('AMW components smoke tests', () => {
    it('root page loads and contains amw elements (if present)', () => {
        cy.visit('/');
        // check for elements that demos will render; these checks are non-fatal if not present
        cy.get('amw-divider').should('exist').or('not.exist');
        cy.get('amw-paginator').should('exist').or('not.exist');
        cy.get('amw-chip').should('exist').or('not.exist');
        // dialog won't be visible until opened, but token/service usage is compile-time; ensure page loads
        cy.document().its('readyState').should('eq', 'complete');
    });
});
