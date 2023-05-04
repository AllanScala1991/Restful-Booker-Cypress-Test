describe("Token Tests", () => {
    it("Create new token", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/auth`,
            method: "POST",
            body: {
                username: "admin",
                password: "password123"
            }
        }).then(response => {
            expect(response.body.token).not.null;
        })
    })

    it("Try create token with invalid username", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/auth`,
            method: "POST",
            body: {
                username: "invalid",
                password: "password123"
            }
        }).then(response => {
            expect(response.body.reason).equal("Bad credentials")
        })
    })

    it("Try create token with invalid password", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/auth`,
            method: "POST",
            body: {
                username: "admin",
                password: "password321"
            }
        }).then(response => {
            expect(response.body.reason).equal("Bad credentials")
        })
    })

    it("Try create token with invalid body", () => {
        cy.request({
            url: `${Cypress.env("baseUrl")}/auth`,
            method: "POST",
            body: {
                name: "admin",
                pass: "password321"
            }
        }).then(response => {
            expect(response.body.reason).equal("Bad credentials")
        })
    })
})