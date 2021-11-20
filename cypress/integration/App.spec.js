describe ('Test App', () => {
    it ('launches', () => {
      cy.visit ('/');
    });

    it ('has logo', () => {
        cy.visit ('/');
        cy.get('[data-cy=logo]').should('contain', 'SANTAssign');
    });
});