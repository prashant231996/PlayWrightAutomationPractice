const {page,test,expect}=require("@playwright/test");

/*By default dailogs are autodismissed by playwright, so you don't need to handle them.
However you can register a dialog handler before the action that triggers the dialog.
*/


test.skip("Alert with OK",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Enabling Alert Handling  //Dialog Window handler
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toBe("alert");
        expect(dialog.message()).toContain("I am an alert box!");
        await dialog.accept();
    })

    await page.locator("#alertBtn").click();
});

test.skip("Confirmation Dialog with OK and Cancel",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Enabling Dialog Window handler
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toContain("Press a button!");
        await dialog.accept(); //Close confirmation box using OK button
        //await dialog.dismiss();  //Close confirmation box using Cancel button
    })

    await page.locator("#confirmBtn").click();
    //await expect(page.locator("#demo")).toContainText("You pressed OK!");
    await expect(page.locator("#demo")).toHaveText("You pressed OK!");
});

test("Prompt Dialog with OK and Cancel",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Enabling Dialog Window handler
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toBe("prompt");
        expect(dialog.message()).toContain("Please enter your name:");
        expect(dialog.defaultValue()).toContain("Harry Potter");
        await dialog.accept('Prashant'); //Close Prompt box using OK button and by paasing Prashant Value to it
        //await dialog.dismiss();  //Close prompt box using Cancel button
    })

    await page.locator("#promptBtn").click();
    await expect(page.locator("#demo")).toHaveText("Hello Prashant! How are you today?");
});