const {page,test,expect}=require("@playwright/test");

test("Drag And Drop",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const srcElement=await page.locator("#draggable");
    const targetElement=await page.locator("#droppable");

    //Approch 1
    /*await srcElement.hover();
    await page.mouse.down();

    await targetElement.hover();
    await page.mouse.up();

    await expect(await page.locator("#droppable p")).toHaveText("Dropped!");*/

    //Approch 2
    await srcElement.dragTo(targetElement);
    await expect(await page.locator("#droppable p")).toHaveText("Dropped!");
})