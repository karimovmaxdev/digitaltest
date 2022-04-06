  import { calendar } from "./constsants/constants";

  // функция возвращает массив дат
export function allDates() {
  //   получаем сегодшянюю дату добавляем ее в массив дат
  const allDays = []
  let nowMiliseconds = Date.now();
  const dateIsNow = new Date();
  let startingDay = 356 - (7 - dateIsNow.getDay());
  
  const formatedDate = dateFormatter(dateIsNow)
  allDays.push({ date: formatedDate, contr: 0 });
  //   добавляем в массив все дни начиная с сегодняшнего в обраном порядке
    
  for (let i = startingDay; i !== 0; i--) {
    nowMiliseconds = nowMiliseconds - 86400000;
    const tempDate = new Date(nowMiliseconds);
    const formatedDate = dateFormatter(tempDate)
     allDays.unshift({ date: formatedDate, contr: 0 });
  }
        
    return allDays
  }


export function correctMonths() {
  // корректное наполненеи массива с месяцами, для дальнейшей отрисовки
  const allMonth = []
  const dateIsNow = new Date();
  

  const currentMonth = dateIsNow.getMonth() - 1;
  const lastMonth = currentMonth + 1;

  for (let i = currentMonth; i !== lastMonth; i--) {
    if (i - 1 === lastMonth) {
      allMonth.push(calendar[i]);
      allMonth.push(calendar[i - 1]);
      break;
    }
    if (i === 0) {
      allMonth.push(calendar[i]);
      i = 11;
    }
    allMonth.push(calendar[i]);
  }
    allMonth.reverse();
    return allMonth
}


  export function dateFormatter(date) {
    const year = date.getFullYear().toString()
    let month = (date.getMonth() + 1).toString()
    let day = date.getDate().toString()
    
    if (month.length === 1) {
      month = `0${month}`
    }

    if (day.length === 1) {
      day = `0${day}`
    }
    return `${year}-${month}-${day}`;
  }