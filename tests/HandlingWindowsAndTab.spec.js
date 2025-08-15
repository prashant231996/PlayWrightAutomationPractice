const {test,expect}=require("@playwright/test");

test("Handling multiple windows/Tabs",async({browser})=>
{
    const context=await browser.newContext();
    const page=await context.newPage();
    const username=page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    const link=page.locator("a[href*='documents-request']");
    /*WaitForEvent("page")==>This method will wait until any new page is opened and will
    return that new page Listens for any new page
    After resolving or fullfilled promises under Promise.all it will return new page
    */
    const [newPage]=await Promise.all(
    [
        context.waitForEvent("page"),
        link.click(),
    ]
    );
    const text=await newPage.locator('.red').textContent();
    expect(text).toContain("Please email us at mentor@rahulshettyacademy.com");
    const arrayText=text.split("@");
    const domainName=arrayText[1].split(" ")[0];
    //Entering value in parent window again
    await username.fill(""); //Empty string is paased in fill() method to clear value from input textbox
    await username.fill(domainName);
    //inputValue()=> This method will return the value present in input text box
    //console.log(await username.inputValue());
    expect(await username.inputValue()).toContain(domainName);

});