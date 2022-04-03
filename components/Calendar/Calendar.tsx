import { useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Day from "./Day";
import CalendarHeader from "./CalendarHeader";

dayjs.extend(duration);

//   const some = dayjs().add(dayjs.duration({ days: 1 }));

// const groupedByDayOfWeek: any[] = Object.values(
//   days.reduce((acc, item) => {
//     // Append the item to the array for each country
//     acc[item.$W] = [...(acc[item.$W] || []), item];
//     return acc;
//   }, {})
// );

export interface IDay {
  dayOfTheWeek?: number;
  date?: number;
  month?: number;
}

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
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

    const daysOfPrevMonth =
      days[0].dayOfTheWeek === 0 ? 6 : (days[0].dayOfTheWeek as number) - 1;

    for (let i = 0; i < daysOfPrevMonth; i++) {
      days.unshift({});
    }

    return days;
  }

  const daysInMonth = getDaysInMonth(2022, currentMonth);

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <main className="p-16 flex justify-center items-center">
      <div className="max-w-screen-xl m-auto bg-zinc-50">
        <CalendarHeader
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
        <div className="w-full grid grid-cols-7 gap-0">
          {dayNames.map((day, index) => {
            return (
              <div className="p-6 flex justify-center border border-zinc-300">
                <p key={index}>{day}</p>
              </div>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-7 gap-0">
          {daysInMonth.map((dayInMonth, index) => {
            return <Day key={index} {...dayInMonth} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default Calendar;
