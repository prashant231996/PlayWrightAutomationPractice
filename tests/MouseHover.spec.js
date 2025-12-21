const {test,page,expect}=require("@playwright/test");

test("Mouse Hover",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const pointMeElement=await page.locator("//button[text()='Point Me']");
    const mobileDropDownEle=await page.locator("//a[text()='Mobiles']");

    //Mouse Hover
    await pointMeElement.hover();
    await mobileDropDownEle.click();

    await page.waitForTimeout(3000);
})