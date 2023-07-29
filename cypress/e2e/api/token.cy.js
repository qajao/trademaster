describe('Token trademaster', () => {


    it('Get Token - Sucesso em gerar token', () => {
        cy.fixture('dadosEntradaSucesso.json').then((dadosEntradaSucesso) => {
            cy.getAuth(dadosEntradaSucesso)
                .then(({ status, body }) => {
                    expect(status).to.eq(200)
                    expect(body).to.have.property('access_token') // Verifica se a propriedade acces_toke existe
                    expect(body.access_token).to.exist  // Verficiar se exite algum valor dentro de acesstoken 
                    expect(body.expires_in).to.be.eq('360')              
                })
        })
    })

    it('Get token - falha no cliente_secret', () => {
        cy.fixture('dadosEntradaFalha.json').then((dadosEntradaFalha) => {
            cy.getAuth(dadosEntradaFalha)
                .then(({ status, body }) => {                    
                    console.log(body)
                    expect(status).to.eq(401)
                    expect(body.error).to.have.eq('unauthorized_client')
                    expect(body.error_description).to.have.eq('Invalid client secret')
                })
        })
    })
})