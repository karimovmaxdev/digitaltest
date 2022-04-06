  export async function getDates(staticDates) {
      
    const response = await fetch(
      "https://test.digitalpartnersglobal.com/test/calendar.json"
    );
    const dates = await response.json();

    for (const [key, value] of Object.entries(dates)) {
      const stringDate = new Date(key);
      const formatedDate = `
    	${stringDate.getFullYear()}-${
        stringDate.getMonth() + 1
      }-${stringDate.getDate()}
    `.trim();

      const findedObject = staticDates.find((it) => it.date == formatedDate);
      if (findedObject !== undefined) {
        findedObject.contr = value;
      }
      }
      

    return staticDates;
  }