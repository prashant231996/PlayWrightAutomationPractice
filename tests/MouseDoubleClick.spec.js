const {test,page,expect}=require("@playwright/test");

test("Mouse Double Click",async({page})=>
{
   await page.goto("https://testautomationpractice.blogspot.com/");

   const button=await page.locator("//button[text()='Copy Text']");

   await button.dblclick();

   await expect(await page.locator("#field2")).toHaveValue("Hello World!");
})