const {page,test,expect}=require("@playwright/test");

test("Handle multiselect drop down",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Select multiple options from multi select drop down

    await page.selectOption("#colors",["Blue","Red"]);

    //Assertions
    //1) Check number of options
    const options=await page.locator("#colors option");
    await expect(options).toHaveCount(7);

     //2) Check number uing JS array
    const optionslist=await page.$$("#colors option");  //$$ will return drop down options in the form of array
    await expect(optionslist.length).toBe(7);

    //3) Verify option is present in drop down or not
    const optionListNew=await page.locator("#colors").textContent();
    await expect(optionListNew.includes("Blue")).toBeTruthy();

      //4) Verify option is present in drop down or not
    const optionListUpd=await page.locator("#colors").allTextContents();
    let status=false;
    for(const option of optionListUpd)
    {
        if(option.match("Blue"))
        {
           status=true;
           break;
        }
    }
    await expect(status).toBeTruthy();

    //5) Selet drop down option using loop
    const dropOptions=await page.$$("#colors option");
    for(const option of dropOptions)
    {
        let value=await option.textContent();
        if(value.includes("Green"))
        {
          await page.selectOption("#colors","Green");
          break;
        }
    }
})