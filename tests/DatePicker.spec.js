const {test,page,expect}=require("@playwright/test");

test("Date Picker",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    //Filling directly date value in i/p box
    //await page.fill("#datepicker","12/21/2025");

    //Selecting dates from the web tables
    const year="2026";
    const month="December";
    const date="21";

    await page.locator("#datepicker").click();  //Opens Calender

    //Selecting Year & Month
    while(true)
    {
        const currantYear=await page.locator(".ui-datepicker-year").textContent();
        const currantMonth=await page.locator(".ui-datepicker-month").textContent();

        if(currantYear == year && currantMonth == month)
        {
            break;
        }

        await page.locator("//a[@title='Next']").click();
    }

    //Date seletion using loop
   /* const dates=await page.$$("a.ui-state-default");   //Returning multiple webelemebt in an array
    
    for(let dt of dates)
    {
        if(await dt.textContent()==date)
        {
            await dt.click();
        }
    }*/

     //Direct date selection using xpath
     //Parameterized XPATH Value in Java Script
     await page.locator(`//a[@class='ui-state-default' and text()='${date}']`).click();


    await page.waitForTimeout(3000);





})