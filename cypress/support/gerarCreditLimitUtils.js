const faker = require('faker-br');

Cypress.Commands.add('generateCreditLimitJson', () => {
    // Gerar os dados ficticios
    const nome = faker.company.companyName();
    const sufixo = faker.company.companySuffix()
    const combinado = `${nome} ${sufixo}`
    
    // Json a ser enviado
    const jsonData = {
        'buyerDocument': faker.br.cnpj(),
        'externalCustomerCode': faker.address.zipCode(),
        'suggestedCreditLimit': faker.finance.amount(),
        'buyerName': combinado,
        'businessPhone': faker.phone.phoneNumber(),
        'billingPhone': faker.phone.phoneNumber(),
        'address': {
            'street': faker.address.streetName(),
            'complement': '123',
            'neighborhood': 'Bairro Teste2',
            'city': faker.address.city(),
            'state': faker.address.stateAbbr(),
            'postalCode': faker.address.zipCodeValid(),
            'country': faker.address.countryCode()
        },
        'financialHistory': [
            {
                'transactionNumber': '0123',
                'ticketNumber': '1',
                'billingDate': '2023-07-20',
                'dueDate': '2021-08-20',
                'paymentDate': '2021-08-20',
                'amount': 1050.11,
                'paidAmount': 19990.11,
                'settled': true
            }
        ]
    }

    return jsonData
})