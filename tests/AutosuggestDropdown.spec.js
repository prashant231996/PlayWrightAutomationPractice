const {page,test,expect}=require("@playwright/test");

test("Handle Bootstrap drop down",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#autocomplete").fill("india");
    //Approch 1 verify number of options
    const options=await page.locator(".ui-menu-item div");
    expect(options).toHaveCount(2);
    //Approch 2 verify number of options
    await page.locator("#autocomplete").fill("");
    await page.locator("#autocomplete").fill("india");
    const optionsList=await page.$$(".ui-menu-item div");
    //expect(await optionsList.length).toBe(2);
    //Select options from drop down
    for(const option of optionsList)
    {
      let value=await option.textContent();
      if(value.includes("India"))
      {
        await option.click();
        break;
      }
    }
    await expect(page.locator("#autocomplete")).toHaveValue("India");

    

})