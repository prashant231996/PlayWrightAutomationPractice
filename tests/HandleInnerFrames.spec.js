const {page,test,expect}=require("@playwright/test");

test("Inner Frames",async({page})=>
{
    await page.goto("https://ui.vision/demo/webtest/frames/");
    const frame3=await page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3.html"});
    await frame3.locator("//input[@name='mytext3']").fill("Hariom Prashant More");

    //Nested Frames
    /*
    childFrames() Method will return all child frames in as an array of frames
    */
    const childFrames=await frame3.childFrames();
    await childFrames[0].locator("//*[text()='Choose']").click();
    await childFrames[0].locator("//*[text()='Well, now I know :-)']").nth(1).click();

    await childFrames[0].locator("//*[@aria-label='Web Testing' and @role='checkbox']").check();
    await expect(childFrames[0].locator("//*[@aria-label='Web Testing' and @role='checkbox']")).toBeChecked();




})