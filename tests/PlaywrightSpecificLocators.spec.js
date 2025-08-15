const {test,expect}=require("@playwright/test");

test("Playwright special locators",async({page})=>
{
   await page.goto("https://rahulshettyacademy.com/angularpractice/");
   /*
      getByLabel() method is basically used to locate webelement have label tag in them,
      we can locate that by specifying inner text value in getByLabel()
   */
   await page.getByLabel("Check me out if you Love IceCreams!").click();
   await page.getByLabel("Employed").check();
   await page.getByLabel("Gender").selectOption("Female");
   /*
   getByPlaceholder=> using this method we can locate webelement having placeholder
   attribute in them
   */
   await page.getByPlaceholder("Password").fill("Test@123");
   /*
   getByRole()=>This method will help to locate related web element by its role
   */
   await page.getByRole("button",{name:'Submit'}).click();
   /*
   getByText()=>This method helps to locate webelement by its text value directly
   */
   const bool=await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
   expect(bool).toBeTruthy();
   await page.getByRole("link",{name:'Shop'}).click();
   await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();



});