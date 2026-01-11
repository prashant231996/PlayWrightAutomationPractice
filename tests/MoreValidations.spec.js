const {test,expect}=require("@playwright/test");

/*
  If test file contains inter dependant test cases like test 2 is dependant on test1.
  After executing test 1 successfully, then only test 2 will run in those case we will use mode as serial.
  For example if test 1 fail, It will skip test 2 execution as test 2 is dependant on test 1
*/
//test.describe.configure({mode:'serial'}); //Serial execution of tests from test files.

//Run Tets cases in prallel from this test file
test.describe.configure({mode:'parallel'});

test("Handling hidden element", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    // //goBack()=>This method is used to navigate backward in backward history
    // await page.goBack();
    // //goForward()=>This method is used to navigate forward in backward history
    // await page.goForward();
    //Assertions to make element is visible on webpage
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    //Assertions to make element is hidden on webpage
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test("Handling web app pop pups",async({page})=>
{
     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
     //.on('dialog',dialog=>dialog.accept()) This method will accept the alert pop pup
     //page.on('dailog',dialog=>dialog.accept());
     page.on('dialog',dialog=>dialog.dismiss());
     await page.locator("#confirmbtn").click();
     //hover() This method will do mouse hover over an element
     page.locator("#mousehover").hover();
});

test("Handling frames over webpage",async({page})=>
{
     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
     //.frameLocator(Specify frame locator value)==>Handling iframe using .frameLocator()
     const framePage=await page.frameLocator("#courses-iframe");
     await framePage.locator("li a[href*='lifetime-access']:visible").click();
     const text= await framePage.locator("div.text span").textContent();
     expect(text).toEqual("13,522");
});