import { generateDate } from "../support/date";


describe("Create Booking", () => {
    it("Create new booking succesfully", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/booking`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                firstname : "Jim",
                lastname : "Brown",
                totalprice : 111,
                depositpaid : true,
                bookingdates : {
                    checkin : generateDate(new Date()),
                    checkout : generateDate(new Date()),
                },
                additionalneeds : "Breakfast"
            }
        }).then(response => {
            expect(response.body.booking).not.null;
            expect(response.body.bookingid).not.null;
            expect(response.body.booking.firstname).equal("Jim");
        })
    })

    it("Try create booking with invalid payload keys", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/booking`,
            failOnStatusCode: false,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                lastname : "",
                totalprice : 111,
                depositpaid : true,
                bookingdates : {
                    checkin : generateDate(new Date()),
                    checkout : generateDate(new Date()),
                },
                additionalneeds : "Breakfast"
            }
        }).then(response => {
            expect(response.status).equal(500);
            expect(response.body).equal("Internal Server Error");
        })
    })
})