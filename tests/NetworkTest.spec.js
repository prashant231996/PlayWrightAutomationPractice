const {test,page,browser,expect,request}=require("@playwright/test");

let webContext;
const emailId="PrashantDemo@gmail.com";
const pwd="Test@123";
const fakerPayloadOrders={data:[],message:"No Orders"}
//Intercept API Request Response
test.beforeAll(async({browser})=>
{  
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    expect(page).toHaveTitle("Let's Shop");
    const emailField= page.locator("#userEmail");
    const pwdField= page.locator("#userPassword");
    const loginBtn= page.locator("#login");
    await emailField.fill(""); 
    await emailField.fill(emailId);
    await pwdField.fill("");
    await pwdField.fill(pwd);
    await loginBtn.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:"state.json"});
    webContext=await browser.newContext({storageState:'state.json'});
})

test("Verify message for empty orders",async()=>
{
    const page=await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>
        {
            const respone=await page.request.fetch(route.request());
            //Converting Jvascript Object to JSON String
            let body=JSON.stringify(fakerPayloadOrders);
            route.fulfill(
                {
                    respone,
                    body,
                }
            )

            //intercepting response=>API response=>{Playwright Faker Response}=>Browser will render it on UI
        }
    )
    const orderLink=page.locator("button[routerlink='/dashboard/myorders']");
    await orderLink.click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await page.locator(".container .ng-star-inserted").waitFor();
    let expectedMsg=await page.locator(".container .ng-star-inserted").textContent();
    expect(await page.locator(".container .ng-star-inserted")).toContainText(expectedMsg);
})