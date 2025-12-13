const {page,test,expect}=require("@playwright/test");

test("Soft Assertion",async({page})=>
{
    await page.goto("https://demoblaze.com/");
    //Hard Assertions
    /*await expect(page).toHaveTitle("STORE2424");
    await expect(page).toHaveURL("https://demoblaze.com/");
    await expect(page.locator(".navbar .navbar-brand")).toBeVisible();*/

    //SOFT Assertions
    await expect.soft(page).toHaveTitle("STORE2424");
    await expect.soft(page).toHaveURL("https://demoblaze.com/");
    await expect.soft(page.locator(".navbar .navbar-brand")).toBeVisible();
})