const {test,expect,page}=require("@playwright/test");

test("Handle radion btns",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("#female").check();
    //await page.check("#female");
    await expect(page.locator("#female")).toBeChecked();
    await expect(await page.locator("#female").isChecked()).toBeTruthy();
    await expect(await page.locator("#male").isChecked()).toBeFalsy();
})