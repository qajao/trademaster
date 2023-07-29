const faker = require('faker-br');

Cypress.Commands.add('generateEmpresaJson', () => {
    // Gerar os dados ficticios
    const nome = faker.company.companyName();
    const sufixo = faker.company.companySuffix()
    const combinado = `${nome} ${sufixo}`
    
    // Json a ser enviado
    const jsonData = {        
        name: combinado,
        companyName: combinado,
        document: formatCnpj(faker.br.cnpj()), // Coloque aqui a lógica para gerar o CNPJ ou outros dados dinamicamente
        documentType: 'CNPJ',
        tradeName: nome,
    }

    return jsonData
})

function formatCnpj(cnpj) {

    const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/
    
    return cnpj.replace(cnpjRegex, '$1.$2.$3/$4-$5');
}
