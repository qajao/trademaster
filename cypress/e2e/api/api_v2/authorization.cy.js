describe('Teste Apis Authorization ', () => {

    context('Não precisa de token', () => {


        it('Cadastrar cliente com sucesso', () => {
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
                        console.log(body.document)
                        expect(status).to.eq(400)
                        expect(body.errors[0].message).to.eq('Field document is mandatory')
                    })
            })
        })


        it('Falha no cadastro de usuário - Campo com nomes vazios', () => {
            cy.fixture('cadastroNomeVazio.json').then((cadastroNomeVazio) => {
                cy.cadastrarEmpresa(cadastroNomeVazio)
                    .then(({ status, body }) => {
                        expect(status).to.eq(400)

                        const msgvalidacao = [
                            { mensagem: 'Field name is mandatory' },
                            { mensagem: 'Field companyName is mandatory' },
                            { mensagem: 'Field tradeName is mandatory' }
                        ]

                        body.errors.forEach((errors, index) => {
                            expect(errors.message).to.eq(msgvalidacao[index].mensagem)
                        })

                    })
            })
        })

    })

    context('Precisa de token', () => {

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

        it('Get Authorization com sucesso', () => {
            cy.getAuthorization('00009576000110', authToken)
                .then(({ status, body }) => {
                    console.log(body)
                    expect(status).to.eq(200)
                    expect(body).to.have.property('data')
                    expect(body).to.have.property('pageNumber')
                    expect(body).to.have.property('pageSize')
                    expect(body).to.have.property('totalCount')
                })

        })
    })

})