const {base} =require("@playwright/test")

exports.customtest=base.test.extend(
    {
        testDataForOrder:
        {
             userEmail:"PrashantDemo@gmail.com",
             userPassword:"Test@123",
              productName:"ZARA COAT 3"
        }
    }
)