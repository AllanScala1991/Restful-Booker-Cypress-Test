import { generateDate } from "../support/date"


describe("Update booking", () => {
    let id;
    let token;

    before(() => {
        cy.createBooking({
            firstname : "old name",
            lastname : "old lastname",
            totalprice : 999,
            depositpaid : true,
            bookingdates : {
                checkin : generateDate(new Date()),
                checkout : generateDate(new Date()),
            },
            additionalneeds : "Breakfast"
        }).then(response => {
            id = response.body.bookingid;
        })

        cy.token("admin", "password123").then(response => token = response.body.token)
    })

    it("Update booking by id", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/booking/${id}`,
            method: "PUT",
            headers: {
                Cookie: `token=${token}`
            },
            body: {
                firstname : "new name",
                lastname : "new lastname",
                totalprice : 300,
                depositpaid : false,
                bookingdates : {
                    checkin : generateDate(new Date()),
                    checkout : generateDate(new Date()),
                },
                additionalneeds : "Breakfast"
            }
        }).then(response => {
            expect(response.body.firstname).equal("new name");
            expect(response.body.lastname).equal("new lastname");
            expect(response.body.totalprice).equal(300);
            expect(response.body.depositpaid).equal(false);
        })
    })

    it("Try update booking by id with no send token", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/booking/${id}`,
            method: "PUT",
            failOnStatusCode: false,
            body: {
                firstname : "new name",
                lastname : "new lastname",
                totalprice : 300,
                depositpaid : false,
                bookingdates : {
                    checkin : generateDate(new Date()),
                    checkout : generateDate(new Date()),
                },
                additionalneeds : "Breakfast"
            }
        }).then(response => {
            expect(response.status).equal(403);
        })
    })
    
    it("Try update booking with send invalid id", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/booking/invalid`,
            method: "PUT",
            headers: {
                Cookie: `token=${token}`
            },
            failOnStatusCode: false,
            body: {
                firstname : "new name",
                lastname : "new lastname",
                totalprice : 300,
                depositpaid : false,
                bookingdates : {
                    checkin : generateDate(new Date()),
                    checkout : generateDate(new Date()),
                },
                additionalneeds : "Breakfast"
            }
        }).then(response => {
            expect(response.status).equal(405);
        })
    })

    it("Try update booking without payload", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/booking/${id}`,
            method: "PUT",
            headers: {
                Cookie: `token=${token}`
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).equal(400);
        })
    })
})