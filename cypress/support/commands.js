// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('getAuth', (dadosChamada) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/auth/realms/api-management/protocol/openid-connect/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: dadosChamada,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('getToken', () => {
    cy.request({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/auth/realms/api-management/protocol/openid-connect/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
            // eslint-disable-next-line 
            client_id: 'iterasys-app',
            // eslint-disable-next-line 
            client_secret: 'Q7RrBqtIK42ZLUV16HiFndvkQPk3ECBn',            
            scope: 'convenio-api/.default',
            // eslint-disable-next-line 
            grant_type: 'client_credentials'
        },
    })
})

Cypress.Commands.add('cadastrarEmpresa', (dadosEmpresa) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('baseUrl2') + '/enroll/customer/',        
        body: dadosEmpresa,
        failOnStatusCode: false
    })
})