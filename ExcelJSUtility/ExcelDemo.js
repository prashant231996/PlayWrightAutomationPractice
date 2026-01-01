const ExcelJs=require ('exceljs');

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

//Update price of Mango to 350
WriteExcel("Mango",350,{rowChange:0,columnChange:2},"Sheet1","excelDownloadTest.xlsx");

