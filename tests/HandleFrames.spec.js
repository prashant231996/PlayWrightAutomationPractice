const {page,test,expect}=require("@playwright/test");

test('frames',async({page})=>
{
    await page.goto("https://ui.vision/demo/webtest/frames/");

    //Total Frames
    const allFrames=page.frames();
    console.log("Number of frames",allFrames.length);

    //approch 1 Using Frame name attribute or Frame URL
    //const frame1=await page.frame("frameNameAttributeValue");
    const frame1=await page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1.html'});
    await frame1.fill("//input[@name='mytext1']","Prashant");

   //Approch 2 -Using Frame Locator
   const inputBox=await page.frameLocator("//frame[@src='frame_2.html']").locator("//input[@name='mytext2']");
   await inputBox.fill("Prashant More");



})