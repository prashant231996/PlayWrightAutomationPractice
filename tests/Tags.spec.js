import {test,page} from "@playwright/test";

/*
1) Provide tags to the test methods
test(TestName @Tag1Name@Teg2Name)

2) Running only those test cases which are having those tags
npx playwright test {Test case Name} --grep "@TagName"

3)Cammand to run test cases having particular tag name
npx playwright test Tags.spec.js --headed --grep "@Sanity@Regression"

4)Cammand to run test cases which are not belong to particular tag name
npx playwright test Tags.spec.js --grep-invert "@TagName"

*/

test("Test1 @Sanity",async({})=>
{
    console.log("Inside Test 1.");
})

test("Test2 @Sanity",async({})=>
{
    console.log("Inside Test 2.");
})

test("Test3 @Regression",async({})=>
{
    console.log("Inside Test 3.");
})

test("Test4 @Sanity@Regression",async({})=>
{
    console.log("Inside Test 4.");
})

test("Test5 @Sanity",async({})=>
{
    console.log("Inside Test 5.");
})