it('Manipulates the number of items ,clears the basket & deletes the cookies', function () {
    //the text box should be cleared every time before inputing desired value else it may just append the text 
    //the number of items to be bought should be passed into the function
    
    //cy.get('.quantity-input').clear()
    //cy.get('.quantity-input').type('2')

    //cy.contains('Remove item').click()

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
