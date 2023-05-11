import { generateDate } from "../support/date";

describe("Partial update booking", () => {
    let id;
    let token;

    before(() => {
        cy.createBooking({
            firstname : "partial",
            lastname : "update",
            totalprice : 999,
            depositpaid : false,
            bookingdates : {
                checkin : generateDate(new Date()),
                checkout : generateDate(new Date()),
            },
            additionalneeds : "Breakfast"
        }).then(response => {
            id = response.body.bookingid;
        })

        cy.token("admin", "password123").then(response =>  token = response.body.token);
    })

    it("Partial update booking by id", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/booking/${id}`,
            method: "PATCH",
            headers: {
                Cookie: `token=${token}`
            },
            body: {
                totalprice: 299,
                additionalneeds: "food"
            }
        }).then(response => {
            expect(response.body.totalprice).equal(299);
            expect(response.body.additionalneeds).equal("food");
        })
    })

    it("Try partial update booking with empty token", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/booking/${id}`,
            method: "PATCH",
            failOnStatusCode: false,
            body: {
                totalprice: 499,
                additionalneeds: "food"
            }
        }).then(response => {
            expect(response.status).equal(403);
        })
    })

    it("Try partial update booking with send invalid id", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/booking/invalid`,
            method: "PATCH",
            headers: {
                Cookie: `token=${token}`
            },
            failOnStatusCode: false,
            body: {
                totalprice: 689,
                additionalneeds: "pizza"
            }
        }).then(response => {
            expect(response.status).equal(405);
        })
    })
})