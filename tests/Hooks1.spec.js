const {test,expect}=require("@playwright/test");

test("Home Page Test",async({page})=>
{
    //Login
    await page.goto("https://demoblaze.com/");
    await page.locator("#login2").click();
    await page.locator("#loginusername").fill("TestPm");
    await page.locator("#loginpassword").fill("TestPm");
    await page.locator("//button[normalize-space()='Log in']").click();

    //Home Page Test
    await page.waitForSelector(".hrefch");
    const products=await page.$$(".hrefch");
    await expect(await products).toHaveLength(9);

    //Logout
    await page.locator("#logout2").click();

});

test("Add Product To Cart Test",async({page})=>
{
    //Login
     await page.goto("https://demoblaze.com/");
    await page.locator("#login2").click();
    await page.locator("#loginusername").fill("TestPm");
    await page.locator("#loginpassword").fill("TestPm");
    await page.locator("//button[normalize-space()='Log in']").click();

    //Add Product To The Cart
    await page.locator("//a[normalize-space()='Samsung galaxy s6']").click();
    
    //Enabling Alert Handling  //Dialog Window handler
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toBe("alert");
        expect(dialog.message()).toContain("Product added.");
        await dialog.accept();
    })

    await page.locator("a[onclick='addToCart(1)']").click();

    //Logout
     await page.locator("#logout2").click();
  
});