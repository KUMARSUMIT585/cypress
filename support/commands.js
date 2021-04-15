// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

//The below command is written to launch the url so that it is reusable & can be called from other functions
Cypress.Commands.add('LaunchApp',function(str)
{
    cy.visit(str)
    
}
)
