describe('Testes de Login', () => {

    const CAMPO_EMAIL = 'email'
    const CAMPO_SENHA = 'password'
    const BOTAO_LOGIN = 'submit'

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrlUi'))
    })

    it('Realizar login com sucesso', () => {
        // spy api de login
        cy.intercept('POST', Cypress.env('uiLoginBaseUrl') + '/login/login/user/signin')
            .as('apilogin')

        // spy api carregamento total da pagina com regex
        cy.intercept(/\/list\?/)
            .as('apilogin2')

        // preencher campo login
        cy.getId(CAMPO_EMAIL)
            .type(Cypress.env('login'))

        // preencher campo senha
        cy.getId(CAMPO_SENHA)
            .type(Cypress.env('password'))

        // clicar botão de login
        cy.getButton(BOTAO_LOGIN)
            .click()

        cy.wait('@apilogin')
            .then(({ response }) => {
                console.log(response)
                expect(response.statusCode).to.eq(200)
            })

        cy.wait('@apilogin2')
            .then(({ response }) => {
                console.log(response)
                expect(response.statusCode).to.eq(200)
            })
    })

    it('Falha no login', () => {
        // spy api de login
        cy.intercept('POST', Cypress.env('uiLoginBaseUrl') + '/login/login/user/signin')
            .as('apilogin')        

        // preencher campo login
        cy.getId(CAMPO_EMAIL)
            .type(Cypress.env('loginFailure'))

        // preencher campo senha
        cy.getId(CAMPO_SENHA)
            .type(Cypress.env('passwordFailure'))

        // clicar botão de login
        cy.getButton(BOTAO_LOGIN)
            .click()

        cy.wait('@apilogin')
            .then(({ response }) => {
                console.log(response)
                expect(response.statusCode).to.eq(400)                
            })

        cy.getError('error').should('contain', 'Credenciais Inválidas')
    })

})