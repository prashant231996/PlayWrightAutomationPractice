const ExcelJs=require ('exceljs');
const {test,page,expect}=require("@playwright/test");

/* ExcelJS==>This is basically use to read and manipulate Excel workbooks & Json */

async function WriteExcel(fruiteName,updatedPrice,change,sheetName,filePath) {
const workbook=new ExcelJs.Workbook();
await workbook.xlsx.readFile(filePath)
const worksheet=workbook.getWorksheet(sheetName);
const output=await readExcel(worksheet,fruiteName);
const cell=worksheet.getCell(output.row+change.rowChange,output.column+change.columnChange);
cell.value=updatedPrice;
await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet,fruiteName)
{
    let output={row:-1,column:-1};
    // eachRow()==>Iterate over all rows that have values in a worksheet
worksheet.eachRow((row,rowNumber)=>
{
    // eachCell()==> Iterate over all non-null cells in a row
     row.eachCell((cell,colNumber)=>
    {
        if(cell.value===fruiteName)
        {
            output.row=rowNumber;
            output.column=colNumber;
        }
 
    })
})
return output; 
}

test("Upload Download Excel Validation", async({page})=>
{
    const fruiteName="Mango";
    const updatePrice="350";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    await expect(page).toHaveTitle("RS Web Table Automation Page");
    //It will wait until particular downoad action is completed, before proceed to next test execution
    const downLoadPromise=page.waitForEvent('download');
    await page.locator("#downloadButton").click();
    await downLoadPromise;
    //Update price of Mango to 350
    WriteExcel(fruiteName,updatePrice,{rowChange:0,columnChange:2},"Sheet1","excelDownloadTest.xlsx");
    await page.locator("#fileinput").setInputFiles(["excelDownloadTest.xlsx"]);
    //Verify Updated value in table
    const fruiteLocator=await page.getByText(fruiteName);
    const desiredRow=await page.getByRole("row").filter({has:fruiteLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatePrice);
    
    //  const rows=await page.$$("//div[contains(@class,'rdt_TableBody')]//*[contains(@class,'rdt_TableRow')]");
    // let fruitePrice;
    // for(let row of rows)
    // {
    //     row.
    //     const desiredFruiteName=await row.locator("(//div//div)[2]").textCOntent();
    //     if(desiredFruiteName=="Mango")
    //     {
    //        fruitePrice=await row.locator("(//div//div)[4]").textCOntent();
    //        break;
    //     }
    // }
    // await expect(fruitePrice).tobe("350");
})

