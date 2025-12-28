const {test,expect}=require("@playwright/test");

import { LoginPage } from "../Pages/LoginPage";
import { HomePage } from "../Pages/HomePage";
import { CartPage } from "../Pages/CartPage";

test("test",async({page})=>
{
    //Login
    const loginpage=new LoginPage(page);
    await loginpage.goToLoginPage();
    await loginpage.login("TestPm","TestPm");
    await page.waitForTimeout(3000);

    //Home
    const homepage=new HomePage(page);
    await expect(await homepage.verifyNameOfUser("TestPm")).toBeTruthy();
    await homepage.addProductToCart("Nexus 6");
    await homepage.navigateToCartPage();
    await page.waitForTimeout(3000);

    //Cart
    const cartpage=new CartPage(page);
    expect(await cartpage.checkProctInCart("Nexus 6")).toBeTruthy();


})