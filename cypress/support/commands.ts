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

Cypress.Commands.add('createBooking', (payload: {
    firstname : string,
    lastname : string,
    totalprice : number,
    depositpaid : boolean,
    bookingdates : {
        checkin : Date,
        checkout : Date
    },
    additionalneeds : string
}) => {
    cy.request({
        url: `${Cypress.env("baseUrl")}/booking`,
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    })
})

declare namespace Cypress {
    interface Chainable {
      token(username: string, password: string): Chainable<Element>;
      createBooking(payload: {
        firstname : string,
        lastname : string,
        totalprice : number,
        depositpaid : boolean,
        bookingdates : {
            checkin : Date,
            checkout : Date
        },
        additionalneeds : string
    }): Chainable<Element>;
    }
}
