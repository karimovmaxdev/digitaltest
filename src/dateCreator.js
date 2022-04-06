  import { calendar } from "./constsants/constants";

export function allDates() {
    const allDays = []
     //   получаем сегодшянюю дату в формате хххх-хх-хх и добавляем ее в массив дат
    let nowMiliseconds = Date.now();
    const dateIsNow = new Date(nowMiliseconds);

    const formatedDate = `
        ${dateIsNow.getFullYear()}-${dateIsNow.getMonth() + 1}-${dateIsNow.getDate()}
    `;
    allDays.push({ date: formatedDate.trim(), contr: 0 });

  //   добавляем в массив все дни начиная с сегодняшнего в обраном порядке
    let startingDay = 356 - (7 - dateIsNow.getDay());
    
    for (let i = startingDay; i !== 0; i--) {
        nowMiliseconds = nowMiliseconds - 86400000;
        const tempDate = new Date(nowMiliseconds);
        const formatedTempDate = `
            ${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}
        `;
        allDays.unshift({ date: formatedTempDate.trim(), contr: 0 });
        }
        
        return allDays
    }

export function correctMonths() {
    const allMonth = []
    let nowMiliseconds = Date.now();
  const dateIsNow = new Date(nowMiliseconds);

  // корректное наполненеи массива с месяцами, для дальнейшей отрисовки
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