const {expect}=require("@playwright/test");

exports.DashboardPage=
class DashboardPage
{
    constructor(page)
    {
        this.page=page;
        this.productsNames=page.locator("#products b");
        this.products=page.locator(".card-body");
        this.cartBtn=page.locator("[routerlink*='cart']");
        this.cartPageElements=page.locator(".cart li");
        this.signOutBtn=page.locator("//button[contains(text(),'Sign Out')]");
    }

    async searchProduct(productName)
    {
    await this.productsNames.first().waitFor();
    const productList=await this.productsNames.allTextContents();
    console.log("Products list is "+ productList);
    //Select ZARA COAT 3 and add it to the cart
    //count() This method will return count of webelements matches with given selector value
    const count=await this.products.count();
    for(let i=0;i<count;i++)
    {
        if(await this.products.nth(i).locator("b").textContent() === productName)
        {
            //Add product to cart
            await this.products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }
    }

    async navigateToCartPage()
    {
        //Navigate to cart btn
        await this.cartBtn.click();
        //Waiting untill all elements get loaded successfully in cart
        await this.cartPageElements.first().waitFor();
    }

    async dosignOut()
    {
        await this.signOutBtn.click();
    }
}