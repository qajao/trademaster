describe('Token trademaster', () => {


    it('Get Token - Sucesso em gerar token', () => {
        cy.fixture('dadosEntradaSucesso.json').then((dadosEntradaSucesso) => {
            cy.getAuth(dadosEntradaSucesso)
                .then(({ status, body }) => {
                    expect(status).to.eq(200)
                    expect(body).to.have.property('access_token') // Verifica se a propriedade acces_toke existe
                    expect(body.access_token).to.exist  // Verficia se exite algum valor dentro de acesstoken 
                    expect(body.expires_in).to.eq(3600)  // Verifica tempo de expiração do token            
                })
        })
    })

    it('Get token - falha no cliente_secret', () => {
        cy.fixture('dadosEntradaFalha.json').then((dadosEntradaFalha) => {
            cy.getAuth(dadosEntradaFalha)
                .then(({ status, body }) => {
                    expect(status).to.eq(401)
                    expect(body.error).to.have.eq('unauthorized_client')
                    expect(body.error_description).to.have.eq('Invalid client secret')
                })
        })
    })
})