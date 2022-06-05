import { Dispatch, SetStateAction } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { getMonthName } from "../utils";

interface ICalendarHeaderProps {
  currentMonth: number;
  setCurrentMonth: Dispatch<SetStateAction<number>>;
}

const CalendarHeader = ({
  currentMonth,
  setCurrentMonth,
}: ICalendarHeaderProps) => {
  const month = getMonthName(currentMonth);
  return (
    <div className="max-w-screen-xl m-auto">
      <div className="w-full px-2 h-20 flex justify-center items-center">
        <button
          onClick={() => setCurrentMonth((currentMonth as number) - 1)}
          aria-label={"previous_month"}
        >
          <ArrowLeftIcon className="h-5 w-5 text-sky-700" />
        </button>
        <p className="text-xl tracking-wider w-28 text-center font-sans text-sky-700">
          {month}
        </p>
        <button
          onClick={() => setCurrentMonth((currentMonth as number) + 1)}
          aria-label={"next_month"}
        >
          <ArrowRightIcon className="h-5 w-5 text-sky-700" />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
