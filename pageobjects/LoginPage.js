const { expect } = require("@playwright/test");

exports.LoginPage=
class LoginPage
{
    constructor(page)
    {
        this.page=page;
        this.usernameEmail=page.locator("#userEmail");
        this.userPwd=page.locator("#userPassword");
        this.loginBtn=page.locator("#login");
    }


    async validLogin(email,password)
    {
        await this.usernameEmail.fill("");
        await this.usernameEmail.fill(email);
        await this.userPwd.fill("");
        await this.userPwd.fill(password);
        await this.loginBtn.click();
    }

    async navigateToLoginPage()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await expect(this.page).toHaveTitle("Let's Shop");
    }

}