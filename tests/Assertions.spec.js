const {page,test,expect}=require("@playwright/test");

test("Assertions Test",async({page})=>
{
    //HARD ASSERTION==> If any assertion got failed it will terminate execution move to next test 
    //await keyword is basically used to solve the promises
     await page.goto("https://demo.nopcommerce.com/register");

     //1) expect(page).toHaveURL({expected Url});
     await expect(page).toHaveURL("https://demo.nopcommerce.com/register");

     //2) expect(page).toHaveTitle({expectedPageTitle});
     await expect(page).toHaveTitle("nopCommerce demo store. Register");

     //3) expect(locator).toBeVisible()
     const logoElement=page.locator(".header-logo");
     await expect(logoElement).toBeVisible();

     //4) expect(locator).toBeEnabled()
     const searchStoreElement=page.locator("input#small-searchterms");
     await expect(searchStoreElement).toBeEnabled();

     //5) expect(locator).toBeDisabled()

     //6) expect(locator).toBeChecked()
     const maleRadioBtn= page.locator("input#gender-male");
     await maleRadioBtn.click();
     await expect(maleRadioBtn).toBeChecked();
     const newsLetter= page.locator("input#NewsLetterSubscriptions_0__IsActive");
     await expect(newsLetter).toBeChecked();

     //7)expect(locator).toHaveAttribute() Element has attribute
     const registerbtn=page.locator("#register-button");
     await expect(registerbtn).toHaveAttribute('type','submit');
    
     //8)expect(locator).toHaveText({exact text want to match with inner text})  //Exact math with innertext
     const headerElement=page.locator(".page-title h1");
     await expect(headerElement).toHaveText("Register");
     await expect(headerElement).not.toHaveText("Prashant");

     //9)expect(locator).toContainText({partial text want to match with inner text})  //partial match
      await expect(headerElement).toContainText("Register");

      //10)expect(locator).toHaveValue() Input has a value
      const emailInput=page.locator("#Email");
      await emailInput.fill("Prashantsdet@mail.com");
      await expect(emailInput).toHaveValue("Prashantsdet@mail.com");

      //11)expect(locator).toHaveCount()  List of element has given length
      const radioBtn=page.locator("input[type='radio']");
      await expect(radioBtn).toHaveCount(2);
      await expect(radioBtn).not.toHaveCount(10);

});
