import { dateFormatter } from "../dateCreator";  
export async function getDates(staticDates) {
      
    const response = await fetch(
      "https://test.digitalpartnersglobal.com/test/calendar.json"
    );
    const dates = await response.json();

    for (const [key, value] of Object.entries(dates)) {
      const stringDate = new Date(key);
      const formatedDate = dateFormatter(stringDate)

      if (staticDates[formatedDate] === undefined) {
        continue
      }
      
      staticDates[formatedDate] = value
    }
      
  const result = Object.entries(staticDates).reverse()
    return result;
  }