const{test,expect, chromium}=require("@playwright/test");

test("Handling Pages/Windows",async()=>
{
    const browser=await chromium.launch();
    const context=await browser.newContext();
    const page1=await context.newPage();
    const page2=await context.newPage();

    const allPages=await context.pages();
    console.log("Number of windows "+allPages.length)

    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page1).toHaveTitle("OrangeHRM");

    await page2.goto("https://www.orangehrm.com/")
    await expect(page2).toHaveTitle("Human Resources Management Software | HRMS | OrangeHRM");

});

test.only("Handling Multiple Pages/Windows",async()=>
{
    const browser=await chromium.launch();
    const context=await browser.newContext();
    const page1=await context.newPage();

    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page1).toHaveTitle("OrangeHRM");

    //Need to handle new page opening event and store it as pagePromise before action which will open new page
    const pagePromise=context.waitForEvent("page");
    await page1.locator("//a[normalize-space()='OrangeHRM, Inc']").click();

    const newPage=await pagePromise;
    await expect(newPage).toHaveTitle("Human Resources Management Software | HRMS | OrangeHRM");

    await browser.close();
});