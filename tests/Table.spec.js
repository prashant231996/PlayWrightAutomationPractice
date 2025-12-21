const {page,test,expect}=require("@playwright/test");
const { text } = require("stream/consumers");

test("Handling Table",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const webTable=await page.locator("#productTable");
    //Total Number of rows & columns
    const columns=await webTable.locator("//thead//tr//th");
    //As above locator is returning multiple web elements, count() method will return number of webelements matching given locator
    console.log("Number of columns: "+await columns.count());
    const rows=await webTable.locator("//tbody//tr");
    console.log("Number of rows: "+await rows.count());

    await expect(await columns.count()).toBe(4);
    await expect(await rows.count()).toBe(5);

    //Select Checkbox for Smartwatch
    /*
    const matchedRow=rows.filter({
        has:page.locator('td'),
        hasText:'Smartwatch'
    })

    await matchedRow.locator("//td//input[@type='checkbox']").check();
    */

    //3)Select multiple products by reusing the function
    //await selectProduct(rows,page,"Smartwatch");
    //await selectProduct(rows,page,"Laptop");

    //4) Print all product details using loop
   /* console.log("Count of rows are "+rows.count());
    for(let i=0;i<await rows.count();i++)
    {
        const row=await rows.nth(i);
        const tds=await row.locator('td');
        console.log("Count of tds are "+tds.count());

        for(let j=0;j<await tds.count()-1;j++)
        {
           console.log(await tds.nth(j).textContent());
        }
    }*/

    //5) Read data from all the pages in a table
    const pages=await page.locator(".pagination li a");
    const pagesCount=await pages.count();

    for(let p=0;p<pagesCount;p++)
    {
        if(p>0)
        {
            await pages.nth(p).click();
        }

         for(let i=0;i<await rows.count();i++)
       {
        const row=await rows.nth(i);
        const tds=await row.locator('td');
        console.log("Count of tds are "+tds.count());

        for(let j=0;j<await tds.count()-1;j++)
        {
           console.log(await tds.nth(j).textContent());
        }
       }

    }





})

async function selectProduct(rows,page,name)
{
    const matchedRow=rows.filter({
        has:page.locator('td'),
        hasText:name
    })

    await matchedRow.locator("//td//input[@type='checkbox']").check();
}