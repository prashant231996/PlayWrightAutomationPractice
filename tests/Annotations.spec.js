const {test,expect, chromium}=require("@playwright/test");

//only
/*test.only("Test1",async({})=>
{
    console.log("Inside Test 1.");
})*/

//skip
test.skip("Test2",async({})=>
{
    console.log("Inside Test 2.");
})

//skip test case based on certain condition
test("Test3",async({browserName})=>
{
    if(browserName=="chromium")
    {
        test.skip();
    }
    console.log("Inside Test 3.");
})

//fixme ==>This annotation is used in case of skiping test case execution until related defect is open
test("Test4",async({})=>
{
    test.fixme();
    console.log("Inside Test 4.");
})

/*fail ==> This annotation is  used to marks the test as failing. Playwright will run this test and ensure it does
indeed fail. If the test does not fail, Playwright will complain.*/

test("Test5",async({})=>
{
    test.fail();
    console.log("Inside Test 5.");
    expect(1).toBe(2);
})

//Fail test case based on certain condition
/*test("Test6",async({browserName})=>
{
    console.log("Inside test 6")
    expect(1).toBe(1);
    if(browserName==chromium)
    {
        test.fail();
    }
 
})*/

//slow==>test.slow() marks the test as slow and triples the test timeout.
test("Test7",async({page})=>
{
    //It will tripple default timeout
    test.slow();
    //Set timeout for currant test case execution
    //test.setTimeout(5000);
    console.log("Inside Test 7.");
    await page.goto("https://demoblaze.com/");
})
