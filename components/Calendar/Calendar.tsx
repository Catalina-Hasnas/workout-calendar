import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

//   const some = dayjs().add(dayjs.duration({ days: 1 }));

// const groupedByDayOfWeek: any[] = Object.values(
//   days.reduce((acc, item) => {
//     // Append the item to the array for each country
//     acc[item.$W] = [...(acc[item.$W] || []), item];
//     return acc;
//   }, {})
// );

interface IDay {
  dayOfTheWeek?: number;
  date?: number;
  month?: number;
}

const Calendar = () => {
  function getDaysInMonth(year: number, month: number) {
    let day = 0;
    let days: IDay[] = [];

    const monthDigit = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;

    const daysInMonthString = `${year}-${monthDigit}-01`;

    const daysInMonth = dayjs(daysInMonthString).daysInMonth();

    for (let i = 0; i < daysInMonth; i++) {
      day++;
      days.push({
        date: dayjs().year(year).month(month).date(day).date(),
        dayOfTheWeek: dayjs().year(year).month(month).date(day).day(),
        month: dayjs().year(year).month(month).date(day).month(),
      });
    }

    const daysOfPrevMonth = days[0].dayOfTheWeek as number;

    for (let i = 0; i < daysOfPrevMonth; i++) {
      days.unshift({});
    }

    return days;
  }

  const daysInMonth = getDaysInMonth(2022, 9);

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="flex flex-col">
      <div className="flex">
        {dayNames.map((day, index) => {
          return <p key={index}>{day}</p>;
        })}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {daysInMonth.map((dayInMonth, index) => {
          if (Object.keys(dayInMonth).length === 0) {
            return <p key={index}>null</p>;
          } else {
            return <p key={index}> {dayInMonth.date} </p>;
          }
        })}
      </div>
    </div>
  );
};

export default Calendar;
