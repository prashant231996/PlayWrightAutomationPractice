const {page,test,expect}=require("@playwright/test");

test("Handle Autosuggest Dropdown",async({page})=>
{
    await page.goto("https://www.redbus.in/");
    await page.locator("#srcinput").fill("");
    await page.locator("#srcinput").fill("Ich");
    await page.locator("//*[@aria-label='Search suggestions list']//*[contains(@class,'listHeader')]").last().waitFor();
    const optionList= await page.$$("//*[@aria-label='Search suggestions list']//*[contains(@class,'listHeader')]");
    await page.locator("//*[@aria-label='Search suggestions list']//*[contains(@class,'listHeader')]").first().waitFor();
    for(const option of optionList)
    {
        let value=await option.textContent();
        console.log("Value to click is "+value);
        if(value.includes("Ichalkaranji"))
        {
            await option.click();
            break;
        }
        
    }
})