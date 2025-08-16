const {test,expect}=require("@playwright/test");

test(("Handling Calenders"),async({page})=>
{
   const monthNumber="6";
   const date="15";
   const year="2027";

   const expectedList=[monthNumber,date,year];

   await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
   await page.locator("div.react-date-picker__inputGroup").click();
   await page.locator(".react-calendar__navigation__label").click();
   await page.locator(".react-calendar__navigation__label").click();
   await page.getByText(year).click();
   await page.locator("button.react-calendar__tile").nth(Number(monthNumber)-1).click();
   await page.locator("//button//abbr[text()='"+date+"']").click();
   expect(await page.locator(".react-date-picker__inputGroup input").nth(0)).toHaveAttribute("value","2027-06-15");
   const inputs=await page.locator(".react-date-picker__inputGroup input");
   for(let i=1;i<=expectedList.length;i++)
   {
      const actual=await inputs.nth(i).inputValue();
      expect(actual).toEqual(expectedList[i-1]);
   }
});