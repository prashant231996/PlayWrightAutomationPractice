const {test,page,request,browser,expect}=require("@playwright/test");
const { url } = require("inspector");
//Intercept Network request calls with Playwrigt
let webContext;
const emailId="PrashantDemo@gmail.com";
const pwd="Test@123";

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

test("Security Test require intercept",async()=>
{
    const page=await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const orderLink=page.locator("button[routerlink='/dashboard/myorders']");
    await orderLink.click();
    //login & reach the orders pageclear
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=693516ea32ed865871234999"})
    )
    await page.locator("button:has-text('View')").first().click();
    expect(await page.locator(".blink_me")).toContainText("You are not authorize to view this order");
    expect(await page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
});

test.only("Security Test require intercept Check abort function (Aborting request itself equivalant to server down scenarios)",async()=>
{
    const page=await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const orderLink=page.locator("button[routerlink='/dashboard/myorders']");
    await orderLink.click();
    //Below statement is used to abort all image related calls which are hitting on server
    await page.route("**/*.{jpg,jpeg,png}",
        route=>route.abort()
    )
    await page.pause();
});