describe ('Test App', () => {
    it ('launches', () => {
      cy.visit ('/');
    });

    it ('has logo', () => {
        cy.visit ('/');
        cy.get('[data-cy=logo]')
          .contains(/santassign/i)
          .should('exist');
    });
});