const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {

        baseUrl: 'https://apigateway.hml.trademaster.com.br',
        
        // eslint-disable-next-line
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
