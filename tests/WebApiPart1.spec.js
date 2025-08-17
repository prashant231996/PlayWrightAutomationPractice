const {test,expect,request}=require("@playwright/test");
const { emit } = require("process");

//Payload in the form of java script object
const loginPayload={
    userEmail: "PrashantDemo@gmail.com",
    userPassword: "Test@123"
}

let token;

//beforeAll()==>This method will execute before all test cases
test.beforeAll(async()=>
{
     const apiContext=await request.newContext();
     const loginResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPayload
        }
     );
     //Validating whether we got 200 OK status code
     expect((await loginResponse).ok);
     //Grabbing json response in const variable
     const loginResponseJson=await loginResponse.json();
     //storing token value from response 
     token=loginResponseJson.token;
     
});

//beforeEach()==>This method will execute befor each test case
test.beforeEach(()=>
{

})

test("Client App End To End Automation",async({page})=>
{
    const productName="ZARA COAT 3";
    const emailId="PrashantDemo@gmail.com";
    const usernameEmail=page.locator("#userEmail");
    const userPwd=page.locator("#userPassword");
    const loginBtn=page.locator("#login");
    const productsNames=page.locator("#products b");
    const products=page.locator(".card-body");
    const cartBtn=page.locator("[routerlink*='cart']");
    const checkOutBtn=page.locator("text=Checkout");

    /*Below method is used to insert token value which we got via rest call in before all method,
    to localstorage as token:valueOfToken*/
    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token',value);
    },token );
    /*After setting the token value in local storage hittin the application url,
    which will bypass login page, as we already inserted token in it*/
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await expect(page).toHaveTitle("Let's Shop");
    // await usernameEmail.fill("");
    // await usernameEmail.fill(emailId);
    // await userPwd.fill("");
    // await userPwd.fill("Test@123");
    // await loginBtn.click();
    await productsNames.first().waitFor();
    const productList=await productsNames.allTextContents();
    console.log("Products list is "+ productList);
    //Select ZARA COAT 3 and add it to the cart
    //count() This method will return count of webelements matches with given selector value
    const count=await products.count();
    for(let i=0;i<count;i++)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            //Add product to cart
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }
    //Navigate to cart btn
    await cartBtn.click();
    //Waiting untill all elements get loaded successfully in cart
    await page.locator(".cart li").first().waitFor();
    //Checking whether On cart page product which is added is preesent
    const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    //Click on checkout
    await checkOutBtn.click();
    await page.locator("input.input[type='text']").nth(1).fill("12345");
    await page.locator("input.input[type='text']").nth(2).fill("PM Card");
    await page.locator("input.input[type='text']").nth(3).fill("rahulshettyacademy");
    await page.locator("button[type='submit']").click();
    await page.locator("p.ng-star-inserted").waitFor();
    await expect(page.locator("p.ng-star-inserted")).toHaveText("* Coupon Applied");
    //Do place order actions
    //pressSequentially()=>Method is basically used to type chracters one by one
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    const dropdown= page.locator(".ta-results");
    await dropdown.waitFor();
    const optionCount=await dropdown.locator("button").count();
    for(let i=0;i<optionCount;i++)
    {
        const text=await dropdown.locator("button").nth(i).textContent();
        if(text.trim()==="India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    //Validating email Id present over checkut page
    await expect(page.locator(".user__name label")).toHaveText(emailId);
    expect(await page.locator(".user__name input").nth(0).inputValue()).toContain(emailId);
    await page.locator(".action__submit").click();
    //Asserting thank you message
    await page.locator(".hero-primary").waitFor();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
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