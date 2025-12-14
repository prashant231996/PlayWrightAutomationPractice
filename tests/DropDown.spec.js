const {test,page,expect}=require("@playwright/test");

test("Handle Dorop down",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Mutiple ways to select options from dropdown

    //selectOption() method is used to select option from drop down having select tag in it.

    //await page.locator("#country").selectOption({label:"India"});  //Label or visible text
   
    //await page.locator("#country").selectOption("India");  //Visible Text

    //await page.locator("#country").selectOption({value:"india"});  //Using value attrubutes value
    
    //await page.locator("#country").selectOption({index:1});  //Using index value

    await page.selectOption("#country","India"); //by visible text
    
    //Assertions
    //1) Chck to total number of options available in dropdown -Approch 1
    const options=await page.locator("#country option");
    expect(options).toHaveCount(10);

    //Approch 2
    //Check number of options in dropdown
     const optionsElment=await page.$$("#country option");
     //console.log("Number of options :"+optionsElment.length);
     await expect(optionsElment.length).toBe(10);

    //3) Verify particular option present in drop down or not  --Approch 1
    const content=await page.locator("#country").textContent(); //textContent() it will fetch all option and return string which content all options
    expect(content.includes("India")).toBeTruthy();

    //4) Verify particular option present in drop down or not  --Approch 2
    const optionList=await page.locator("#country").allTextContents();//allTextContents() it will fetch all option and return list of option element
    let status=false;
    for(const option of optionList)
    {
       if(option.match("India"))
       {
        status=true;
        break;
       }
    }
    expect(content.includes("India")).toBeTruthy();
    expect(status).toBeTruthy();

    //5) Verify particular option present in drop down or not  --Approch 3
    const optionListNew=await page.$$("#country option");//This will return list of dropdown options
    let flag=false;
    for(const option of optionListNew)
    {
        let value=await option.textContent();
       if(value.includes("France"))
       {
        flag=true;
        break;
       }
    }
    expect(flag).toBeTruthy();

    //6) Select option from drop down using loop
    const dropDownOptions=await page.$$("#country option");//This will return list of dropdown options
    let optionFlag=false;
    for(const option of dropDownOptions)
    {
        let value=await option.textContent();
       if(value.includes("France"))
       {
        optionFlag=true;
        console.log("Value to be select is "+value);
        await page.selectOption("#country","France");
        console.log("Clicked on option with a value as "+await option.textContent());
        break;
       }
    }
    if(!optionFlag)
    {
        console.log("Given option is not available");
    }
    await expect(optionFlag).toBeTruthy();

})