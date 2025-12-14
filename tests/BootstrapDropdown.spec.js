const {test,page,expect}=require("@playwright/test");

test("Handle Bootstrap drop downs",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#dropdown-class-example").click();
    await expect(page.locator("#dropdown-class-example option")).toHaveCount(4);
    const optionList=await page.$$("#dropdown-class-example option");
    expect(optionList.length).toBe(4);
    for(const option of optionList)
    {
        let value=await option.textContent();
        if(value.includes("Option2"))
        {
            await page.selectOption("#dropdown-class-example","Option2");
        }
    }

})