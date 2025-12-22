const {test,expect}=require("@playwright/test");

test("Keyboar Action",async({page})=>
{
   await page.goto("https://gotranscript.com/text-compare");

   //await page.locator("//textarea[@name='text1']").fill("Prashant Shivaji More");

   await page.fill("//textarea[@name='text1']","Prashant Shivaji More");

   //CTRL + A  --Select the text

   await page.keyboard.press("Control+A");

   //CTRL + C  --Copy the text

   await page.keyboard.press("Control+C")

   //TAB

   await page.keyboard.down("Tab");
   await page.keyboard.up("Tab");

   //CTRL + V

   await page.keyboard.press("Control+V");

   await page.waitForTimeout(4000);
})