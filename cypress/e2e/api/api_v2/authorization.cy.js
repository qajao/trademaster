describe('Teste Apis Authorization ', () => {

    it.skip('Cadastrar cliente com sucesso', () => {
        cy.generateEmpresaJson().then((jsonData) => {            
            cy.cadastrarEmpresa(jsonData)
                .then(({ status, body }) => {
                    console.log(jsonData)
                    console.log(body)
                    expect(status).to.eq(201)
                    expect(body.payload.companyName).to.equals(jsonData.name)
                    expect(body.payload.document).to.equals(jsonData.document)
                    expect(body.payload.id).to.exist
                    expect(body.payload.uuid).to.exist
                    
                })

        })


    })

    it('Falha no cadastro de usuário - Empresa já existente', () => {
        cy.fixture('cadastroExistente.json').then((cadastroExistente) => {
            cy.cadastrarEmpresa(cadastroExistente)
                .then(({ status, body }) => {
                    expect(status).to.eq(400)
                    expect(body.errors[0].message).to.eq('Customer already exists')
                })
        })
    })

    it('Falha no cadastro de usuário - CNPJ vazio', () => {
        cy.fixture('cadastroCnpjVazio.json').then((cadastroCnpjVazio) => {
            cy.cadastrarEmpresa(cadastroCnpjVazio)
                .then(({ status, body }) => {
                    expect(status).to.eq(400)
                    expect(body.errors[0].message).to.eq('Field document is mandatory')
                })
        })
    })

    // BUG está registrando as empresas sem validar CNPJ
    it('Falha no cadastro de usuário - CNPJ menos 14 digitos', () => {
        cy.fixture('cadastroCnpjDigito1.json').then((cadastroCnpjDigito1) => {
            cy.cadastrarEmpresa(cadastroCnpjDigito1)
                .then(({ status, body }) => {
                    expect(status).to.eq(400)
                    expect(body.errors[0].message).to.eq('Field document is mandatory')
                })
        })
    })


})