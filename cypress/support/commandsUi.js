Cypress.Commands.add('getId', (id) => {
    return cy.get(`input[id="${id}"]`)
})

Cypress.Commands.add('getButton', (button) => {
    return cy.get(`button[type="${button}"]`)
})

Cypress.Commands.add('getError', (error) => {
    return cy.get(`div[type="${error}"]`)
})