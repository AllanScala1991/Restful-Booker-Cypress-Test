/// <reference types="cypress" />

Cypress.Commands.add('token', (username: string, password: string) => {
    cy.request({
        url: `${Cypress.env("baseUrl")}/auth`,
        method: "POST",
        body: {
            username: username,
            password: password
        }
    })
})

declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      token(username: string, password: string): Chainable<Element>;
    }
  }