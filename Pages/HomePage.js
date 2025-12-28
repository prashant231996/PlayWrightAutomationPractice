const { expect } = require("@playwright/test");

exports.HomePage=
class HomePage{

    constructor(page)
    {
        this.page=page;
        this.productList="//*[@id='tbodyid']//a[@class='hrefch']";
        this.addToCartBtn="//a[normalize-space()='Add to cart']";
        this.cartLink="#cartur";
        this.nameOfUser="#nameofuser";
    }

    async addProductToCart(productName)
    {
        const products=await this.page.$$(this.productList);
        for(const product of products)
        {
            const currantProductName=await product.textContent();
           if(currantProductName==productName)
            {
                await product.click();
                break;
            }
        }

        //Handling alert Pop pup & asserting message
        await this.page.on("dialog",async dialog=>
        {
            expect(dialog.type()).toBe("alert");
            expect(dialog.message()).toBe("Product added.");
            await dialog.accept();
        }
        )
        await this.page.locator(this.addToCartBtn).click();
    }

    async navigateToCartPage()
    {
        await this.page.locator(this.cartLink).click();
    }

    async verifyNameOfUser(username)
    {
        const currantUserName=await this.page.locator(this.nameOfUser).textContent();
        if(currantUserName.includes(username))
        {
            return true;
        }
        else{
            return false;
        }
    }

}