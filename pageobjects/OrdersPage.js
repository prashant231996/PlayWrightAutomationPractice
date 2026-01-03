const {expect}=require("@playwright/test");

exports.OrdersPage=
class OrdersPage
{
    constructor(page)
    {
        this.page=page;
        this.orders=page.locator("table tbody tr");
        this.thankYouTag=page.locator("p.tagline");
        this.orderIdElement=page.locator("div.-main");
    }

    async verifyOrder(orderId)
    {
        await this.orders.first().waitFor();
        const totalOrders=await this.orders.count();
        console.log("total orders are "+totalOrders);
        for(let i=0;i<totalOrders;i++)
        {
            if(await this.orders.nth(i).locator("th").textContent()===orderId)
            {
                await this.orders.nth(i).locator("text=View").click();
                break;
            }
        }
            
            await this.thankYouTag.waitFor();
            await expect(this.thankYouTag).toHaveText("Thank you for Shopping With Us");
            await expect(this.orderIdElement).toHaveText(orderId);
    }

}