describe('Sceanario - Items ordered within the existing stock range', () => {
    // Basic test to accept cookies upon app launch , searches a specific item ,
    // selects number of items , adds items to the basket , manipulates the number of items ,
    // finally emptying the basket .
    // The cookies are cleared as the last step & is also validated by code.

    before(function () {
        cy.LaunchApp('https://www.johnlewis.com')

    })

    const searchitem1 = "Canterbury of New Zealand Cricket Shirt";
    const orderquantity = 3;
    const appmessage1 = "It might be temporarily out of stock. Try a more generic search term";
    const appmessage2 = "Delivery Options";
    const appmessage3 = "Continue shopping";
    const reducedquantity = 2;

    it('Searches a specifc cricket shirt ,selects it & chose number of items', function () {

        //below array contains list of eligible sizes for the search item available in the shopping store 
        var sizes = ["6 years", "8 years", "10 years", "12 years", "14 years"];

        cy.contains('Allow all').click()

        cy.get('#mobileSearch').type(searchitem1).type('{enter}')
        //when the searched item does not exist - need to validate below text 
        //'It might be temporarily out of stock. Try a more generic search term'

        cy.contains(appmessage2).then($p => {
            if ($p.is(':visible')) {
                //you get here only if the text is visible
                if (cy.contains(appmessage2)) {
                    cy.get('[alt="Canterbury of New Zealand Cricket Shirt, White"]').click({ force: true })

                    //have selected 1 category - age here but can be parameterised if there is similar repeating trends for 
                    //other products , as of now it selects age groups available in app for new zealand cricket tshirt (6,8,10,12,14 years)
                    cy.contains(sizes[4]).click()    //this selects 14 years 

                    cy.get('[data-alert-text="Adding to basket"]').click()
                    cy.contains('Go to your basket').click()


                    if (orderquantity > 50) {   //when executed with any quantity which is greater than stock quantity , anyways the 
                        //app behavior is to order max quantities that is available in the system 
                        cy.get('.quantity-input').clear()
                        //negative tests which can be written further -
                        // validate whether the test works fine when items are ordered more than supply stock 
                        //'Sorry, we have reduced the quantity of this item as there’s only 3 left in stock.'
                        cy.get('.quantity-input').type(orderquantity)
                        cy.contains('Sorry, we have reduced the quantity of this item as there’s only')
                    }
                    else {
                        if (orderquantity <= 3) {
                            cy.get('.quantity-input').clear()
                            //the text box should be cleared every time before inputing desired value else it may just append the text 
                            //the number of items to be bought should be passed into the function
                            cy.get('.quantity-input').type(orderquantity)

                        }
                        //below code can be immplemented but not mandate condition hence ignored for now
                        //in case 0 items are tried to be ordered -  
                        //following text has to be validated - 'Your basket is empty.'
                    }



                }

            }
        })


    })

    it('Manipulates the number of items ,clears the basket & deletes the cookies', function () {


        cy.contains(appmessage3).then($a => {
            if ($a.is(':visible')) {
                //you get here only if element is visible
                //the text box should be cleared every time before inputing desired value else it may just append the text 
                //the number of items to be bought should be passed into the function

                cy.get('.quantity-input').clear()
                cy.get('.quantity-input').type(reducedquantity)

                cy.contains('Remove item').click()
            }

            else {


            }
        })

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