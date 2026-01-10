const {test}=require("@playwright/test");
import { PageObjectManager } from "../pageobjects/PageObjectManager";
//JSON ==> String ==> JavaScript Object
const dataset=JSON.parse(JSON.stringify(require("../testdata/placeOrderTestData.json")));

for(const data of dataset)
{
test(`Client App End To End Automation of ${data.productName}`,async({page})=>
{
    const pageObjectManager=new PageObjectManager(page);
    const loginpage=pageObjectManager.getLoginPage();
    await loginpage.navigateToLoginPage();
    await loginpage.validLogin(data.userEmail,data.userPassword);
    const dashboardPage=pageObjectManager.getDashboardPage();
    await dashboardPage.searchProduct(data.productName);
    await dashboardPage.navigateToCartPage();
    const cartPage=pageObjectManager.getCartPage();
    await cartPage.verifyProductOnCartPage(data.productName);
    await cartPage.navigateToCheckOutPage();
    const checkoutPage=pageObjectManager.getCheckoutPage();
    await checkoutPage.applyCouponCode("12345","PM Card","rahulshettyacademy");
    await checkoutPage.placeOrder("India",data.userEmail);
    const orderId=await checkoutPage.checkOrderPlacedAndGetOrderId();
    await checkoutPage.navigateToOrdersPage();
    const ordersPage=pageObjectManager.getOrdersPage();
    await ordersPage.verifyOrder(orderId);
    await dashboardPage.dosignOut();
});
}