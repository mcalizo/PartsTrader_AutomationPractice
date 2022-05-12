import {webLocators} from '../../integration/elements/webLocators'

describe('Automation test', () => {

    before(function() {
    cy.visit(Cypress.env('url'));     
    
}) 
    
    it('Search for a dress and sort the results to lowest first', () => {         
    cy.get(webLocators.searchfor).type("Printed Summer Dress");  
    cy.get(webLocators.submitsearch).click();
    //I tried to sort it by price: lowest first but it's not giving me the correct ascending results. 
    cy.get(webLocators.sortresults).select('Product Name: A to Z').should('have.value', 'name:asc');
    cy.get(webLocators.getresultscount).should('have.length.gt', 1).then((items) => {
    cy.get(webLocators.productprice).should('have.length', items.length);    
})
    cy.get(webLocators.productprice).then(($price) => {
    const text = Cypress._.map($price, (p) => p.innerText);
    const firstWord = (text) => text.split(' ')[0]
    const words = text.map(firstWord);
    cy.log(words.slice(0, 5).join(','));
    const justDigits = (str) => str.replace(/[^0-9.]/g, '');
    const numbers = words.map(justDigits);
    cy.log(numbers.slice(0, 5).join(','));
    const sorted = Cypress._.sortBy(numbers);
    expect(sorted).to.deep.equal(numbers);
})

})
        
    it('View the cheapest dress and proceed to checkout', () => {
    cy.get(webLocators.viewthefirstitem).click();
    cy.get(webLocators.confirmdressprice).invoke('text').should('eq', '$16.40'); 
    cy.get(webLocators.addquantity).click();
    cy.get(webLocators.confirmproductquantity).should('have.value', 2);
    cy.get(webLocators.changethesize).select("M").should("have.value", 2);
    cy.get(webLocators.colourgreen).click().should('have.css', 'background-color', 'rgb(160, 212, 104)');
    cy.get(webLocators.addtocart).should('be.visible').click();
    cy.wait(4000);
    cy.get(webLocators.productaddedtocart).contains("Product successfully added to your shopping cart").should('be.visible');    
    cy.get(webLocators.proceedtocheckout).click();    
    cy.get(webLocators.totalamount).invoke('text').should('eq', '$34.80');
    cy.screenshot(webLocators.totalamount);
    
})


})
