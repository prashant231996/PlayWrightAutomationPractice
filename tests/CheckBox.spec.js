const {test,page,expect}=require("@playwright/test");

test("Handle Checkbox",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Single Checkbox
    //await page.locator("#monday").check();
    await page.locator("//input[@id='monday' and @type='checkbox']").check();
    await expect(page.locator("#monday")).toBeChecked();
    await expect(page.locator("#monday").isChecked()).toBeTruthy();
   //Unchecking checkbo
    await page.locator("//input[@id='monday' and @type='checkbox']").uncheck();
    await expect(await page.locator("#monday").isChecked()).toBeFalsy();

    //Handling Multiple checkboxes
    const checkBoxeLocators=[
        "//input[@type='checkbox' and @id='monday']",
        "//input[@type='checkbox' and @id='sunday']",
        "//input[@type='checkbox' and @id='saturday']"
    ]

   for(const locator of checkBoxeLocators)  //Select Multiple checkboxes
   {
    await page.locator(locator).check();
   }

   for(const locator of checkBoxeLocators)  //Un-Select Multiple checkboxes
   {
    if(await page.locator(locator).isChecked())
    {
    await page.locator(locator).uncheck();
    }
   }

})