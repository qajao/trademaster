describe('Token trademaster', () => {


    it('Get Token - Sucesso em gerar token', () => {
        cy.fixture('dadosEntradaSucesso.json').then((dadosEntradaSucesso) => {
            cy.getToken(dadosEntradaSucesso)
                .then(({ status, body }) => {
                    expect(status).to.eq(200)
                    expect(body).to.have.property('access_token') // Verifica se a propriedade acces_toke existe
                    expect(body.access_token).to.exist  // Verficiar se exite algum valor dentro de acesstoken                  
                })
        })
    })

    it('Get token - falha no cliente_secret', () => {
        cy.fixture('dadosEntradaFalha.json').then((dadosEntradaFalha) => {
            cy.getToken(dadosEntradaFalha)
                .then(({ status, body }) => {
                    console.log(body)
                    expect(status).to.eq(401)
                })
        })
    })
})