const {test,expect}=require("@playwright/test");

test("Handling static dropdowns and Radio Btns",async({page})=>
{
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
   const username=page.locator("#username");
   const password=page.locator("#password");
   const selectDropDown=page.locator("select.form-control");
   const adminRadioBtn=page.locator(".checkmark").first();
   const userRadioBtn=page.locator(".checkmark").nth(1);
   const OkBtnOnPopup=page.locator("#okayBtn");
   const termsCheckBox=page.locator("#terms");
   await username.fill("");
   await username.fill("rahulshettyacademy ");
   await password.fill("");
   await password.fill("learning");
   //Need to pass here value attribute's value of selected option
   await selectDropDown.selectOption("consult");
   await userRadioBtn.click();
   await OkBtnOnPopup.click();
   //Assertion for checking radio btn is checked
   await expect(userRadioBtn).toBeChecked();
   expect(await userRadioBtn.isChecked()).toBeTruthy();
   //Checking checkboxes
   await termsCheckBox.click();
   //Assertions whether checkbox checked
   await expect(termsCheckBox).toBeChecked();
   expect(await termsCheckBox.isChecked()).toBeTruthy();
   //Unchecking checkbox
   await termsCheckBox.uncheck();
   //Assertion whether checkbox is unchecked
   expect(await termsCheckBox.isChecked()).toBeFalsy();
   //Validating blinking link present over webpage
   const blinkngLink=page.locator("a[href*='documents-request']");
   await expect(blinkngLink).toHaveAttribute("class","blinkingText");

});