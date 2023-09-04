describe('Testes Api - Credit Limit', () => {

    let authToken = ''

    before(() => {

        cy.getToken()
            .then(({ status, body }) => {
                expect(status).to.eq(200)
                expect(body).to.have.property('access_token') // Verifica se a propriedade acces_toke existe
                expect(body.access_token).to.exist  // Verficia se exite algum valor dentro de acesstoken 
                authToken = body.access_token
            })
    })

    it('Solicitar limite de credito com sucesso', () => {
        cy.generateCreditLimitJson().then((dadosCreditLimit) => {
            console.log(dadosCreditLimit)
            cy.solicitarLimiteCredito(dadosCreditLimit, authToken)
                .then(({ status, body }) => {
                    console.log(body)
                    expect(status).to.eq(200)
                })            
        })
    })

})