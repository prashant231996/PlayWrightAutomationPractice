const {test,expect}=require("@playwright/test");

/*
//Hooks in Playwright BeforeEach, BeforeAll, AfterEach,AfterAll
BeforeEach==> It will execute before each test case

AfterEach==> It will execute after each test case

BeforeAll==> It will execute before all test cases

AfterAll==> It will execute after all test cases.

*/

let page;

test.beforeAll(async({browser})=>
{
    page=await browser.newPage();
     //Login
    await page.goto("https://demoblaze.com/");
    await page.locator("#login2").click();
    await page.locator("#loginusername").fill("TestPm");
    await page.locator("#loginpassword").fill("TestPm");
    await page.locator("//button[normalize-space()='Log in']").click();
});

test.afterAll(async()=>
{
    //Logout
    await page.locator("#logout2").click();
});

test("Home Page Test",async()=>
{
    //Home Page Test
    await page.waitForSelector(".hrefch");
    const products=await page.$$(".hrefch");
    await expect(await products).toHaveLength(9);
});

test("Add Product To Cart Test",async()=>
{
    //Add Product To The Cart
    await page.locator("//a[normalize-space()='Samsung galaxy s6']").click();
    
    //Enabling Alert Handling  //Dialog Window handler
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toBe("alert");
        expect(dialog.message()).toContain("Product added.");
        await dialog.accept();
    })

    await page.locator("a[onclick='addToCart(1)']").click(); 
});