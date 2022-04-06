<script>
  import { getDates } from "./service/fetchAPI";
  import { allWeekdays } from "./constsants/constants";
  import { allDates, correctMonths } from "./dateCreator";

  const allDays = allDates();
  const allMonth = correctMonths();

  // функция вешает нужный класс на ячейку, по условию
  function classNameSwitcher(item) {
    if (item > 30) {
      return "cell cell30";
    }

    if (item > 19) {
      return "cell cell29";
    }

    if (item > 9) {
      return "cell cell19";
    }

    if (item > 0 && item < 9) {
      return "cell cell9";
    }
    return "cell";
  }

  function mouseMoveHandler(e) {
    const target = e.target;
    if (target.classList.length >= 2) {
      target.classList.toggle("cellIsHover");
    }
  }
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
          <div class="week-days">
            <span class="week-days-text">
              {weekDay}
            </span>
          </div>
        {/each}
      </div>

      {#await getDates(allDays)}
        <p>...waiting</p>
      {:then dates}
        <div class="box">
          {#each dates as item}
            <div
              on:mouseenter={mouseMoveHandler}
              on:mouseleave={mouseMoveHandler}
              class={classNameSwitcher(item[1])}
            >
              <p class="info">
                {item[1]} contributions
                <span class="info-text">{item[0]}</span>
                <svg
                  class="info-logo"
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 6L0.169873 1.38009e-07L8.83013 8.95112e-07L4.5 6Z"
                    fill="black"
                  />
                </svg>
              </p>
            </div>
          {/each}
        </div>
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}
    </div>

    <div class="grade">
      <span class="grade-text">Меньше</span>
      <div class="cell" />
      <div class="cell cell9" />
      <div class="cell cell19" />
      <div class="cell cell29" />
      <div class="cell cell30" />
      <span class="grade-text">Больше</span>
    </div>
  </div>
</main>

<style>
  .main-box {
    margin: 50px auto;
    width: 900px;
  }

  .month-box {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
  }

  .months {
    width: 68px;
    text-align: center;
    font-size: 12px;
    color: #959494;
  }

  .calendar-box {
    display: flex;
  }

  .weekdays-box {
    margin-right: 5px;
    display: flex;
    flex-direction: column;
  }
  .week-days {
    display: flex;
    align-items: center;
    width: 15px;
    height: 15px;
    margin: 1px 0px 1px 0px;
    font-size: 12px;
    color: #959494;
  }

  .box {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 120px;
  }

  .cell {
    position: relative;
    width: 15px;
    height: 15px;
    margin: 1px;
    background-color: #ededed;
  }
  .cellIsHover {
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
    margin-top: 15px;
  }

  .grade-text {
    margin-right: 10px;
    font-size: 12px;
    color: #959494;
  }

  .grade-text:last-child {
    margin-left: 10px;
  }

  .info {
    position: absolute;
    display: none;
    padding: 5px 0 0 0;
    margin: 0;
    width: 145px;
    height: 42px;
    pointer-events: none;

    bottom: calc(100% + 5px);
    right: 50%;
    transform: translate(50%);

    color: white;
    background-color: black;

    text-align: center;
    font-size: 12px;
    border-radius: 3px;
  }

  .info-text {
    display: block;
    font-size: 12px;
    color: #7c7c7c;
  }

  .info-logo {
    position: absolute;
    right: 50%;
    bottom: -5px;
    transform: translate(50%);
  }

  .cell:hover {
    outline: 1px solid rgba(0, 0, 0, 0.5);
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
