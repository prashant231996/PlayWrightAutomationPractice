//const{test,page}=require("@playwright/test");

import {test,page} from "@playwright/test";

//describe is basically used to group multiple test cases under single group
/*

  test.describe("GroupName",()=>
  {
       Test1
       Test2
  });

  //If we want to execute test cases present only particular group
  test.describe.only

  //If we want to skip test cases present under particular group
  test.descripbe.skip

*/

test.beforeAll(async()=>
{
    console.log("Inside Before All")
})

test.afterAll(async()=>
{
    console.log("Inside After All")
})

test.beforeEach(async()=>
{
    console.log("Inside before each");
})

test.afterEach(async()=>
{
    console.log("Inside after each");
})

test.describe.only("Group1",()=>
{
    test("Test1",async({page})=>
{
    console.log("This is Test1")

});

test("Test2",async({page})=>
{
    console.log("This is Test2")

});

})

test.describe.skip("Group2",()=>
{
    test("Test3",async({page})=>
{
    console.log("This is Test3")

});

test("Test4",async({page})=>
{
    console.log("This is Test4clear")

});

})








