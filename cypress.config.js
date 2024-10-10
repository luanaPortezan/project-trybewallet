const { defineConfig } = require("cypress");
const { getCoverage } = require('../project-trybewallet/cypress/support/testCoverage');
const { runTest } = require('../project-trybewallet/cypress/support/runTest');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        getCoverage,
        runTest,
      });
    },
  },
});
