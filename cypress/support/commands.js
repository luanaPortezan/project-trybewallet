Cypress.Commands.add('getByTestId', (testId, ...params) => cy.get(`[data-testid="${testId}"]`, ...params));

Cypress.Commands.overwrite('type', (originalFn, subject, text, options = { delay: 0 }) => originalFn(subject, text, options));