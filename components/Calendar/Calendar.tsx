import { useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Day from "./Day";
import CalendarHeader from "./CalendarHeader";
import { dayNames } from "../utils";

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
  date: number;
  dayOfTheWeek: number;
  month: number;
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
      days.unshift({
        date: 99,
        month: 99,
        dayOfTheWeek: 99,
      });
    }

    return days;
  }

  const daysInMonth = getDaysInMonth(2022, currentMonth);

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-w-screen-xl m-auto bg-white">
        <div className="rounded-sm shadow-all-sides shadow-indigo-300">
          <CalendarHeader
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
          <div className="w-full grid grid-cols-7 gap-0">
            {dayNames.map((day, index) => {
              return (
                <div
                  key={index}
                  className="p-6 flex justify-center items-center border-y border-sky-700 hover:bg-sky-700 text-sky-700 hover:text-white"
                >
                  <p className="text-sm uppercase tracking-wide text-center">
                    {day}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="w-full grid grid-cols-7 gap-0 overflow-hidden">
            {daysInMonth.map((dayInMonth, index) => {
              return <Day key={index} {...dayInMonth} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Calendar;
