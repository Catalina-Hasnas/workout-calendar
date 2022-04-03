import { Dispatch, SetStateAction } from "react";

interface ICalendarHeaderProps {
  currentMonth: number;
  setCurrentMonth: Dispatch<SetStateAction<number>>;
}

const CalendarHeader = ({
  currentMonth,
  setCurrentMonth,
}: ICalendarHeaderProps) => {
  function getMonthName() {
    switch (currentMonth) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "";
    }
  }

  const month = getMonthName();
  return (
    <div className="max-w-screen-xl m-auto">
      <div className="w-full px-2 h-32 flex justify-center items-center">
        <button onClick={() => setCurrentMonth((currentMonth as number) - 1)}>
          Previous month
        </button>
        <p>{month}</p>
        <button onClick={() => setCurrentMonth((currentMonth as number) + 1)}>
          Next month
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
