import { generateDate } from "../support/date"

describe("Get Bookings", () => {
    let id: string

    before(() => {
        cy.createBooking({
            firstname : "Jim",
            lastname : "Brown",
            totalprice : 111,
            depositpaid : true,
            bookingdates : {
                checkin : generateDate(new Date()),
                checkout : generateDate(new Date()),
            },
            additionalneeds : "Breakfast"
        }).then(response => {
            id = response.body.bookingid
        })
    })

    it("Get booking by id", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/booking/${id}`,
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.body.firstname).equal("Jim");
            expect(response.body.lastname).equal("Brown")
            expect(response.body.totalprice).equal(111);
        })
    })

    it("Try get booking with invalid id", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/booking/aaa`,
            failOnStatusCode: false,
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            expect(response.status).eq(404);
            expect(response.body).eq("Not Found")
        })
    })
})