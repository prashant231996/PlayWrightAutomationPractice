import {test,page} from "@playwright/test";

test("Page screenshot",async({page})=>
{
    await page.goto("https://demoblaze.com/");
    await page.waitForSelector("#login2");
    await page.screenshot({path:"tests\\ScreenShots\\"+ Date.now()+"HomePage.png"})
});

test("Full page screenshot",async({page})=>
{
    await page.goto("https://demoblaze.com/");
    await page.waitForSelector("#login2");
    await page.screenshot({path:"tests\\ScreenShots\\"+ Date.now()+"FullPage.png",fullPage:true})
})

test.only("Element screenshot",async({page})=>
{
    await page.goto("https://demoblaze.com/");
    await page.waitForSelector("#login2");
    const categorList=await page.locator(".list-group"); 
    await categorList.screenshot({path:"tests\\ScreenShots\\"+ Date.now()+"CategoryListEle.png"});
})



