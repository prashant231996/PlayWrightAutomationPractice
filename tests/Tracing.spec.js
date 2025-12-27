import {test,expect} from "@playwright/test";

test("test",async({page})=>
{
    await page.goto("https://demoblaze.com/");
    await page.locator("#login2").click();
    await page.locator("#loginusername").fill("TestPm");
    await page.locator("#loginpassword").fill("TestPm");
    await page.locator("//button[normalize-space()='Log in']").click();
    await expect(page.locator("#nameofuser")).toHaveText("Welcome TestPm1234");
    await page.locator("#logout2").click();  
})