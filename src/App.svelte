<script>
  async function getDates() {
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

      const findedObject = allDays.find((it) => it.date == formatedDate);
      if (findedObject !== undefined) {
        findedObject.contr = value;
      }
    }

    return allDays;
  }
  const allWeekdays = ["пн", "ср", "пт"];

  const calendar = {
    0: "Янв.",
    1: "Февр.",
    2: "Март",
    3: "Апр.",
    4: "Май",
    5: "Июнь",
    6: "Июль",
    7: "Авг.",
    8: "Сент.",
    9: "Окт.",
    10: "Нояб.",
    11: "Дек.",
  };

  //  массив с датами
  const allDays = [];
  //   массиви для отображения месяцев
  const allMonth = [];

  //   получаем сегодшянюю дату в формате хххх-хх-хх и добавляем ее в массив дат
  let nowMiliseconds = Date.now();
  const dateIsNow = new Date(nowMiliseconds);
  const formatedDate = `
  	${dateIsNow.getFullYear()}-${dateIsNow.getMonth() + 1}-${dateIsNow.getDate()}
  `;
  allDays.push({ date: formatedDate.trim(), contr: 0 });

  //   добавляем в массив все дни начиная с сегодняшнего в обраном порядке
  for (let i = 356; i !== 0; i--) {
    nowMiliseconds = nowMiliseconds - 86400000;
    const tempDate = new Date(nowMiliseconds);
    const formatedTempDate = `
		${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}
	`;
    allDays.unshift({ date: formatedTempDate.trim(), contr: 0 });
  }

  const currentMonth = dateIsNow.getMonth();
  const lastMonth = currentMonth + 1;
  console.log(currentMonth);
  console.log(lastMonth);

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
  console.log(allMonth);

  // функция вешает нужный класс по условию
  function classNameSwitcher(item) {
    if (item.contr > 30) {
      return "cell cell30";
    }

    if (item.contr > 19) {
      return "cell cell29";
    }

    if (item.contr > 9) {
      return "cell cell19";
    }

    if (item.contr > 0 && item.contr < 9) {
      return "cell cell9";
    }
    return "cell";
  }
  console.log(allDays);
</script>

<main>
  <div class="main-box">
    <div class="month-box">
      {#each allMonth as month}
        <div class="months">{month}</div>
      {/each}
    </div>

    <div class="calendar-box">
      <div class="weekdays-box">
        {#each allWeekdays as weekDay}
          <div class="week-days">{weekDay}</div>
        {/each}
      </div>

      {#await getDates()}
        <p>...waiting</p>
      {:then dates}
        <div class="box">
          {#each dates as item}
            <div class={classNameSwitcher(item)}>
              <p class="info">
                {item.contr} contributions
                <br />{item.date}
              </p>
            </div>
          {/each}
        </div>
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}
    </div>

    <div class="grade">
      <span>меньше</span>
      <div class="cell" />
      <div class="cell cell9" />
      <div class="cell cell19" />
      <div class="cell cell29" />
      <div class="cell cell30" />
      <span>больше</span>
    </div>
  </div>
</main>

<style>
  .main-box {
    margin: 50px auto;
    width: 894px;
  }

  .month-box {
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    width: 894px;
  }

  .calendar-box {
    display: flex;
  }

  .week-days {
    margin-bottom: 15px;
  }

  .box {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 894px;
    height: 145px;
  }

  .cell {
    position: relative;
    width: 15px;
    height: 15px;
    margin: 2px;
    background-color: #ededed;
  }

  .cell9 {
    position: relative;
    background-color: #acd5f2;
  }

  .cell19 {
    position: relative;
    background-color: #7fa8c9;
  }

  .cell29 {
    position: relative;
    background-color: #527ba0;
  }

  .cell30 {
    position: relative;
    background-color: #254e77;
  }

  .grade {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  span {
    height: 25px;
    margin-right: 10px;
  }

  span:last-child {
    margin-left: 10px;
  }

  .info {
    display: none;
    position: absolute;
    bottom: calc(100% + 5px);
    right: 50%;
    transform: translate(50%);
    text-align: center;
    margin: 0;
    padding: 0;
    width: 175px;
    height: 42px;
    color: white;
    background-color: black;
  }

  .cell:hover {
    outline: 1px solid black;
  }

  .cell9:hover .info {
    display: block;
    z-index: 1;
  }

  .cell19:hover .info {
    display: block;
    z-index: 1;
  }

  .cell29:hover .info {
    display: block;
    z-index: 1;
  }

  .cell30:hover .info {
    display: block;
    z-index: 1;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
