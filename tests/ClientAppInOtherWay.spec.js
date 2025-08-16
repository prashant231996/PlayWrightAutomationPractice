const {test,expect}=require("@playwright/test");
const { emit } = require("process");

test("Client App End To End Automation",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await expect(page).toHaveTitle("Let's Shop");
    const productName="ZARA COAT 3";
    const emailId="PrashantDemo@gmail.com";
    const usernameEmail=page.getByPlaceholder("email@example.com");
    const userPwd=page.getByPlaceholder("enter your passsword");
    const loginBtn=page.getByRole("button",{name:'Login'});
    const productsNames=page.locator("#products b");
    const products=page.locator(".card-body");
    const cartBtn=page.getByRole("listitem").getByRole("button",{name:"Cart"});
    const checkOutBtn=page.getByRole("button",{name:"Checkout"});
    await usernameEmail.fill("");
    await usernameEmail.fill(emailId);
    await userPwd.fill("");
    await userPwd.fill("Test@123");
    await loginBtn.click();
    await productsNames.first().waitFor();
    const productList=await productsNames.allTextContents();
    console.log("Products list is "+ productList);
    await products.filter({hasText:productName}).getByRole("button",{name:"Add To Cart"}).click();
    await cartBtn.click();
    await page.locator(".cart li").first().waitFor();
    const bool=await page.getByText("ZARA COAT 3").isVisible();
    expect(bool).toBeTruthy();
    await checkOutBtn.click();
    await page.locator("input.input[type='text']").nth(1).fill("12345");
    await page.locator("input.input[type='text']").nth(2).fill("PM Card");
    await page.locator("input.input[type='text']").nth(3).fill("rahulshettyacademy");
    await page.locator("button[type='submit']").click();
    await page.locator("p.ng-star-inserted").waitFor();
    await expect(page.locator("p.ng-star-inserted")).toHaveText("* Coupon Applied");
    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await page.locator(".hero-primary").waitFor();
    expect(await page.getByText("Thankyou for the order.").isVisible()).toBeTruthy();
    const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order Id is "+orderId);
    const actualOrderId=orderId.split(" ")[2];
    console.log("Actual Order Id is "+actualOrderId);
    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("table tbody tr").first().waitFor();
    const totalOrders=await page.locator("table tbody tr").count();
    console.log("total orders are "+totalOrders);
    for(let i=0;i<totalOrders;i++)
    {
        if(await page.locator("table tbody tr").nth(i).locator("th").textContent()===actualOrderId)
        {
            await page.locator("table tbody tr").nth(i).locator("text=View").click();
            break;
        }
    }
    
    await page.locator("p.tagline").waitFor();
    await expect(page.locator("p.tagline")).toHaveText("Thank you for Shopping With Us");
    await expect(page.locator("div.-main")).toHaveText(actualOrderId);
});