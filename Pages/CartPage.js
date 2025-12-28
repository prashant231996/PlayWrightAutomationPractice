exports.CartPage=
class CartPage {

    constructor(page)
    {
        this.page=page;
        this.noOfProduct="#tbodyid tr td:nth-child(2)";
    }

    async checkProctInCart(productName)
    {
        const products=await this.page.$$(this.noOfProduct);
        for(const product of products)
        {
            const currantProductName=await product.textContent();
            if(currantProductName==productName)
            {
                return true;
                break;
            }
        }
        return false;

    }


}