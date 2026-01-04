import { PageObjectManager } from "../pageobjects/PageObjectManager";
const {customtest}=require("../testdata/test-base")

customtest("Client App End To End Automation",async({page,testDataForOrder})=>
{
    const pageObjectManager=new PageObjectManager(page);
    const loginpage=pageObjectManager.getLoginPage();
    await loginpage.navigateToLoginPage();
    await loginpage.validLogin(testDataForOrder.userEmail,testDataForOrder.userPassword);
    const dashboardPage=pageObjectManager.getDashboardPage();
    await dashboardPage.searchProduct(testDataForOrder.productName);
    await dashboardPage.navigateToCartPage();
    const cartPage=pageObjectManager.getCartPage();
    await cartPage.verifyProductOnCartPage(testDataForOrder.productName);
    await cartPage.navigateToCheckOutPage();
    const checkoutPage=pageObjectManager.getCheckoutPage();
    await checkoutPage.applyCouponCode("12345","PM Card","rahulshettyacademy");
    await checkoutPage.placeOrder("India",testDataForOrder.userEmail);
    const orderId=await checkoutPage.checkOrderPlacedAndGetOrderId();
    await checkoutPage.navigateToOrdersPage();
    const ordersPage=pageObjectManager.getOrdersPage();
    await ordersPage.verifyOrder(orderId);
    await dashboardPage.dosignOut();
});