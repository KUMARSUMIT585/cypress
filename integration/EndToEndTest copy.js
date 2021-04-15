describe('End to End Test For Shopping On John Lewis', () => {

    before(() => {
        cy.LaunchApp('https://www.johnlewis.com')

    })

    it('Launches the shopping portal', function () {

        cy.contains('Allow all').click()

        cy.get('#mobileSearch').type('Canterbury of New Zealand Cricket Shirt').type('{enter}')

        cy.get('[alt="Canterbury of New Zealand Cricket Shirt, White"]').click({ force: true })


        cy.contains('14 years').click()
        cy.get('[data-alert-text="Adding to basket"]').click()
        cy.contains('Go to your basket').click()

        cy.get('.quantity-input').clear()
        //the text box should be cleared every time before inputing desired value else it may just append the text 
        //the number of items to be bought should be passed into the function
        cy.get('.quantity-input').type('3')

        cy.get('.quantity-input').clear()
        cy.get('.quantity-input').type('2')

        cy.contains('Remove item').click()

        //to delete the cookies
        cy.clearCookies()

        //below code line is to verfiy whether whether the cookies is successfully deleted or not 
        cy.get('[alt="John Lewis & Partners Home"]').click()

        //below code validates whether Cookies is deleted or not (once cookies are deleted , the wesbite should 
        //again ask for Cookies to be accepted or managed)
        cy.contains('Allow all').then($button => {
            if ($button.is(':visible')) {
                //you get here only if button is visible
                cy.contains('Allow all').click()
            }
        })


    })






})  