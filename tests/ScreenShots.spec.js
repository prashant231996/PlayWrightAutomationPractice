const { test,page,expect } = require("@playwright/test")

const emailId = "PrashantDemo@gmail.com";
const pwd = "Test@123";

test("Take full page screen shot", async ({ page }) => {
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   expect(page).toHaveTitle("Let's Shop");
   const emailField = page.locator("#userEmail");
   const pwdField = page.locator("#userPassword");
   const loginBtn = page.locator("#login");
   await emailField.fill("");
   await emailField.fill(emailId);
   await pwdField.fill("");
   await pwdField.fill(pwd);
   await loginBtn.click();
   await page.locator("button:has-text('Sign Out')").waitFor();
   await page.screenshot({path:'snap.png'});
   await page.locator("button:has-text('Sign Out')").click();
})

test("Take screen shot of webelement", async ({ page }) => {
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   expect(page).toHaveTitle("Let's Shop");
   const emailField = page.locator("#userEmail");
   const pwdField = page.locator("#userPassword");
   const loginBtn = page.locator("#login");
   await emailField.fill("");
   await emailField.fill(emailId);
   await pwdField.fill("");
   await pwdField.fill(pwd);
   await loginBtn.click();
   await page.locator("button:has-text('Sign Out')").waitFor();
   await page.locator("#products img").first().screenshot({path:"snapWeb.png"});
   await page.locator("button:has-text('Sign Out')").click();
})

test.only("Visual Testing=> Comapre actual & expected snap shots", async ({ page }) => {
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   expect(page).toHaveTitle("Let's Shop");
   const emailField = page.locator("#userEmail");
   const pwdField = page.locator("#userPassword");
   const loginBtn = page.locator("#login");
   await emailField.fill("");
   await emailField.fill(emailId);
   await pwdField.fill("");
   await pwdField.fill(pwd);
   await loginBtn.click();
   await page.locator("button:has-text('Sign Out')").waitFor();
   //Comparing home page lay out by checking earlier captured home page snap shot with currant snap shot
   expect(await page.screenshot()).toMatchSnapshot("homePage.png");
   await page.locator("button:has-text('Sign Out')").click();
})