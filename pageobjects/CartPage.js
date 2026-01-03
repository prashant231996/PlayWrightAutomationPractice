const {expect}=require("@playwright/test");

exports.CartPage=
class CartPage{
    constructor(page)
    {
        this.page=page;
        this.checkOutBtn=page.locator("text=Checkout");
    }

    async verifyProductOnCartPage(productName)
    {
        //Checking whether On cart page product which is added is preesent
        const bool=await this.getProductLocator(productName).isVisible();
        await expect(bool).toBeTruthy();
    }

    async navigateToCheckOutPage()
    {
        //Click on checkout
        await this.checkOutBtn.click();
    }

     getProductLocator(productName)
    {
        console.log("Returning element is "+"h3:has-text('"+productName+"')")
        return this.page.locator("h3:has-text('"+productName+"')");
    }

}