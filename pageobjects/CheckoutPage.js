const {expect}=require("@playwright/test");

exports.CheckoutPage=
class CheckoutPage
{
    constructor(page)
    {
        this.page=page;
        this.applyCouponinputbox=page.locator("input.input[type='text']");
        this.applyCouponBtn=page.locator("button[type='submit']");
        this.couponAppliedPopPupBox=page.locator("p.ng-star-inserted");
        this.countryBox=page.locator("[placeholder*='Country']");
        this.countryDropdownOptions=page.locator(".ta-results");
        this.userNameLabel=page.locator(".user__name label");
        this.userNameInput=page.locator(".user__name input");
        this.placeOrderBtn=page.locator(".action__submit");
        this.thankYouMsg=page.locator(".hero-primary");
        this.orderIdElement=page.locator(".em-spacer-1 .ng-star-inserted");
        this.ordersLink=page.locator("button[routerlink*=myorders]");
    }

    async applyCouponCode(cvvCode,cardName,couponCode)
    {
       await this.applyCouponinputbox.nth(1).fill(cvvCode);
       await this.applyCouponinputbox.nth(2).fill(cardName);
       await this.applyCouponinputbox.nth(3).fill(couponCode);
       await this.applyCouponBtn.click();
       await this.couponAppliedPopPupBox.waitFor();
       await expect(this.couponAppliedPopPupBox).toHaveText("* Coupon Applied");
    }

    async placeOrder(countryName,emailId)
    {
    //Do place order actions
    //pressSequentially()=>Method is basically used to type chracters one by one
    await this.countryBox.pressSequentially(countryName, { delay: 150 });
    await this.countryDropdownOptions.waitFor();
    const optionCount=await this.countryDropdownOptions.locator("button").count();
    for(let i=0;i<optionCount;i++)
    {
        const text=await this.countryDropdownOptions.locator("button").nth(i).textContent();
        if(text.trim()===countryName)
        {
            await this.countryDropdownOptions.locator("button").nth(i).click();
            break;
        }
    }
    //Validating email Id present over checkut page
    await expect(this.userNameLabel).toHaveText(emailId);
    await expect(await this.userNameInput.nth(0).inputValue()).toContain(emailId);
    await this.placeOrderBtn.click();
    }

    async checkOrderPlacedAndGetOrderId()
    {
     await this.thankYouMsg.waitFor();
     await expect(this.thankYouMsg).toHaveText(" Thankyou for the order. ");
    const orderId=await this.orderIdElement.textContent();
    console.log("Order Id is "+orderId);
    const actualOrderId=orderId.split(" ")[2];
    console.log("Actual Order Id is "+actualOrderId);
    return actualOrderId;
    }

    async navigateToOrdersPage()
    {
        await this.ordersLink.click();
    }


}