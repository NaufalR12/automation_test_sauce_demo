const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  allowCypressEnv: true,
  projectId: "3rmsw1",
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config); //--> Tambahkan ini
      return config; //--> Tambahkan ini
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: true,
      json: true,
    },
   //------------------------------------
    baseUrl: 'https://saucedemo.com',
    chromeWebSecurity: false,
  },
});

