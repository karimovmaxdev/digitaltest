import { dateFormatter } from "../dateCreator";  
export async function getDates(staticDates) {
      
    const response = await fetch(
      "https://test.digitalpartnersglobal.com/test/calendar.json"
    );
    const dates = await response.json();

    for (const [key, value] of Object.entries(dates)) {
      const stringDate = new Date(key);
      const formatedDate = dateFormatter(stringDate)
      
      const findedObject = staticDates.find((it) => it.date == formatedDate);
      if (findedObject !== undefined) {
        findedObject.contr = value;
      }
    }
      

    return staticDates;
  }