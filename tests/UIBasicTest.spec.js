const {test,expect} =require('@playwright/test');

test("Browser Context Playwrigt Test",async({browser})=>
{
    //Creating browser context
    const context=await browser.newContext();
    //Creatiing new page using browser context
    const page=await context.newPage();
    //Hitting url in page
    await page.goto("https://www.flipkart.com");
    console.log(await page.title());
   //await expect(page).toHaveTitle()
});

test("Page Playwrigt Test",async({page})=>
{
    //Hitting url in page
    await page.goto("https://google.com");
    console.log(await page.title());
   await expect(page).toHaveTitle("Google");
});

test("Rahul Shetty Login Page Practice with invalid creds",async({page})=>
{
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     await console.log("Page titiel is "+page.title);
     await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
     //Using locator method to locate webelement
     //Using fille method to enter in text box
     await page.locator("#username").fill("Prashant More");
     await page.locator("[name='password']").fill("Prashant12345");
     await page.locator("#signInBtn").click();
     //Wait untile related locator to shown up
     //textContext==>Fetching inner text of webelement similar to getText() from seleneium
     console.log(await page.locator("[style*='block']").textContent());
     const actualErorMsg=await page.locator("[style*='block']").textContent();
     const expectedErrorMsg="Incorrect username/password.";
     //Assertion to check innertext of element contains with expected value
     await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
     await expect(actualErorMsg).toEqual(expectedErrorMsg);
});

test("Login Page Practice With Valid Creds",async({page})=>
{
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    const username= page.locator("#username");
    const password= page.locator("input[name='password']");
    const signInBtn= page.locator("#signInBtn");
    const firstProduct=page.locator(".card-body a").nth(0);
    const lastProduct=page.locator(".card-body a").last();
    const products=page.locator(".card-body a");
     /*fill()==>This method will wipe out existing data which is present in input box if you
     pass empty string to that input box*/
     await username.fill("");
     await username.fill("rahulshettyacademy");
     await password.fill("");
     await password.fill("learning");
     await signInBtn.click();
     /*
        .nth(0)=>Will be used in case of provided locator returns multiple webelement
        .first()=>Will return first matching webelement
        .last()=> Will return last matching webelement
     */
     console.log(await page.locator(".card-body a").nth(0).textContent());
     console.log(await page.locator(".card-body a").first().textContent());
     console.log(await page.locator(".card-body a").last().textContent());
     await expect(firstProduct).toContainText("iphone X");
     await expect(lastProduct).toContainText("Blackberry");
     //allTextContents()=>Will return all the inner HTML or inner text for all mathing webements
     const allTitles=await products.allTextContents();
     console.log(allTitles);
});

test.only("Rahul shetty auth login test",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const userEmail=page.locator("#userEmail");
    const userPwd=page.locator("#userPassword");
    const loginBtn=page.locator("[value='Login']");
    const products=page.locator("#products b");
    await userEmail.fill("PrashantDemo@gmail.com");
    await userPwd.fill("Test@123");
    await loginBtn.click();
    // console.log(await products.nth(0).textContent());
    // console.log(await products.last().textContent());
    // await expect(products.first()).toContainText("ZARA COAT 3");
    // await expect(products.last()).toContainText("IPHONE 13 PRO");
    /*
     Waiting explicitly until page loaded completly.
    */
    //await page.waitForLoadState('networkidle');
    //Alternate way to put wait while locating webelement
    //waitFor()==> It will use to avoid syncronization issue, wait for the specified webelement
    await products.first().waitFor();
    const productList=await products.allTextContents();
    console.log(productList);
});