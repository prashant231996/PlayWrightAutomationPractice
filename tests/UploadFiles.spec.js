const {test,expect}=require("@playwright/test");

test("Single File",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.waitForSelector("#singleFileInput");

    //setInputFiles({Specify the File location}) ==>Used to upload file.
    await page.locator("#singleFileInput").setInputFiles("tests\\UploadFiles\\Test1.txt");

    await page.waitForTimeout(5000);
   
})

test.only("Multiple Files",async({page})=>
{
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");

    await page.waitForSelector("#filesToUpload");

    //setInputFiles([{Specify the File 1 location}, {Specify the File 2 location}]) ==>Used to upload file.
    await page.locator("#filesToUpload")
      .setInputFiles(["tests\\UploadFiles\\Test1.txt","tests\\UploadFiles\\Test2.txt"]);

    await page.waitForTimeout(5000);

    await expect(await page.locator("(//*[@id='fileList']//li)[1]")).toHaveText("Test1.txt");
    await expect(await page.locator("(//*[@id='fileList']//li)[2]")).toHaveText("Test2.txt");

    //Removing uploaded files
    /*
      Remove uloaded file==>setInputFiles([])
    */
    await page.locator("#filesToUpload")
      .setInputFiles([]);

    await page.waitForTimeout(4000);
    await expect(await page.locator("(//*[@id='fileList']//li)")).toHaveText("No Files Selected");
})