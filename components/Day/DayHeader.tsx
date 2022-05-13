import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { getMonthName, dayNames, getOrdinal } from "../utils";
import dayjs from "dayjs";
import Link from "next/link";

interface IDayHeaderProps {
  currentDate: number;
  currentMonth: number;
  currentDayOfTheWeek: number;
  isReady: boolean;
}

const DayHeader = ({
  currentDate,
  currentMonth,
  currentDayOfTheWeek,
  isReady,
}: IDayHeaderProps) => {
  const [day, setCurrentDay] = useState(0);
  const [month, setCurrentMonth] = useState(0);
  const [dayOfTheWeek, setDateOfTheWeek] = useState(0);

  useEffect(() => {
    if (isReady) {
      setCurrentDay(currentDate);
      setCurrentMonth(currentMonth);
      setDateOfTheWeek(currentDayOfTheWeek);
    }
  }, [isReady]);

  const dateDisplay = `${dayNames[dayOfTheWeek]}, ${getMonthName(
    month
  )} ${getOrdinal(day)} `;

  const getDaysInMonth = (month: number) => {
    const monthDigit = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
    const daysInMonthString = `2022-${monthDigit}-01`;
    return dayjs(daysInMonthString).daysInMonth();
  };

  const handlePreviousChange = () => {
    setCurrentDay(day - 1);
    if (day === 1) {
      setCurrentMonth(month - 1);
      setCurrentDay(getDaysInMonth(month - 1));
    }
    setDateOfTheWeek(dayOfTheWeek - 1);
    if (dayOfTheWeek === 0) {
      setDateOfTheWeek(6);
    }
  };

  const handleNextChange = () => {
    setCurrentDay(day + 1);
    if (day === getDaysInMonth(month)) {
      setCurrentMonth(month + 1);
      setCurrentDay(1);
    }
    setDateOfTheWeek(dayOfTheWeek + 1);
    if (dayOfTheWeek === 6) {
      setDateOfTheWeek(0);
    }
  };

  console.log({ day: day, month: month, dayOfTheWeek: dayOfTheWeek });

  return (
    <div className="max-w-screen-xl m-auto bg-white">
      <div className="w-full px-2 h-20 flex justify-between items-center">
        <button onClick={handlePreviousChange}>
          <ArrowLeftIcon className="h-5 w-5 text-sky-700" />
        </button>
        <p className="text-xl tracking-wider text-center font-sans text-sky-700">
          {dateDisplay}
        </p>
        <button onClick={handleNextChange}>
          <ArrowRightIcon className="h-5 w-5 text-sky-700" />
        </button>
      </div>
    </div>
  );
};

export default DayHeader;
