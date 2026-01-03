const {LoginPage}= require("./LoginPage");
const {DashboardPage}= require("./DashboardPage");
const { CartPage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");
const { OrdersPage } = require("./OrdersPage");

exports.PageObjectManager=
class PageObjectManager
{
    constructor(page)
    {
        this.page=page;
        this.loginpage=new LoginPage(page);
        this.dashboardPage=new DashboardPage(page);
        this.cartPage=new CartPage(page);
        this.checkoutPage=new CheckoutPage(page);
        this.ordersPage=new OrdersPage(page);
    }

    getLoginPage()
    {
        return this.loginpage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getCheckoutPage()
    {
        return this.checkoutPage;
    }

    getOrdersPage()
    {
        return this.ordersPage;
    }

}


