const {test,page,expect}=require("@playwright/test");

test("Handle input box",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    //Input Box
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#name")).toBeEmpty();
    await expect(page.locator("#name")).toBeEditable();
    await expect(page.locator("#name")).toBeEnabled();
    //await page.locator("#name").fill("Prashant Shivaji More");
    await page.fill("#name","Prashant More");
     await expect(page.locator("#name")).toHaveValue("Prashant More");

})