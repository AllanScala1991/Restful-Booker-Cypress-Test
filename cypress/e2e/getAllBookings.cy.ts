import { generateDate } from "../support/date"

describe("Get all bookings", () => {
    it("Get all bookings without id", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/booking`,
            method: "GET"
        }).then(response => {
            expect(response.body.length).greaterThan(0)
            expect(response.body[0]).haveOwnProperty("bookingid")
        })
    })

    it("Filter booking by name", () => {
        let id;
        cy.createBooking({
            firstname : "Test",
            lastname : "Filter",
            totalprice : 333,
            depositpaid : true,
            bookingdates : {
                checkin : generateDate(new Date()),
                checkout : generateDate(new Date()),
            },
            additionalneeds : "Breakfast"
        }).then(response => {
            id = response.body.bookingid;
        })

        cy.request({
            url: `${Cypress.env("baseUrl")}/booking?firstname=Test&lastname=Filter`,
            method: "GET"
        }).then(response => {
            expect(response.body.length).greaterThan(0);
            expect(response.body.some(booking => booking.bookingid === id)).to.be.true;
        })
    })
})