const {test,expect}=require("@playwright/test");
import { PageObjectManager } from "../pageobjects/PageObjectManager";

test("Client App End To End Automation",async({page})=>
{
    const pageObjectManager=new PageObjectManager(page);
    const loginpage=pageObjectManager.getLoginPage();
    const productName="ZARA COAT 3";
    const emailId="PrashantDemo@gmail.com";
    const password="Test@123";
    await loginpage.navigateToLoginPage();
    await loginpage.validLogin(emailId,password);
    const dashboardPage=pageObjectManager.getDashboardPage();
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCartPage();
    const cartPage=pageObjectManager.getCartPage();
    await cartPage.verifyProductOnCartPage(productName);
    await cartPage.navigateToCheckOutPage();
    const checkoutPage=pageObjectManager.getCheckoutPage();
    await checkoutPage.applyCouponCode("12345","PM Card","rahulshettyacademy");
    await checkoutPage.placeOrder("India",emailId);
    const orderId=await checkoutPage.checkOrderPlacedAndGetOrderId();
    await checkoutPage.navigateToOrdersPage();
    const ordersPage=pageObjectManager.getOrdersPage();
    await ordersPage.verifyOrder(orderId);
});