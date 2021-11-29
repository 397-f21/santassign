describe('Omar\'s Tests', () => {
    it('launches', () => {
        cy.visit('/');
    });

    it('inputs 5 names and emails', () => {

        // 1st name and email
        cy.get('[data-cy=name-btn]').type('Omar');
        cy.get('[data-cy=email-btn]').type('omarkhatib2023@u.northwestern.edu');
        cy.get('[data-cy=add-btn]').click()

        // 2nd name and email
        cy.get('[data-cy=name-btn]').type('Aseel');
        cy.get('[data-cy=email-btn]').type('aseelskhatib@gmail.com');
        cy.get('[data-cy=add-btn]').click()

        // 3rd name and email
        cy.get('[data-cy=name-btn]').type('Lana');
        cy.get('[data-cy=email-btn]').type('l.khatib98@gmail.com');
        cy.get('[data-cy=add-btn]').click()

        // 4th name and email
        cy.get('[data-cy=name-btn]').type('Faisal');
        cy.get('[data-cy=email-btn]').type('faisalalkhatib@uaskuwait.net');
        cy.get('[data-cy=add-btn]').click()

        // 5th name and email
        cy.get('[data-cy=name-btn]').type('Nadeen');
        cy.get('[data-cy=email-btn]').type('nadeenalkh@gmail.com');
        cy.get('[data-cy=add-btn]').click()

    });

    it('assigns santas and displays message', () => {
        cy.get('[data-cy=assign-btn]').click();
        cy.get('[data-cy=assigned-msg]').should('contain', 'The assignments have been sent to everyone\'s email!!!')
    });
});