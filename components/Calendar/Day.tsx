import Link from "next/link";
import { IDay } from "./Calendar";

const Day = ({ date, dayOfTheWeek, month }: IDay) => {
  return (
    <Link
      href={{
        pathname: "/day",
        query: { date: date, month: month, dayOfTheWeek: dayOfTheWeek },
      }}
    >
      <div
        className={
          "pb-16 pt-2 px-2 flex justify-end items-start border border-zinc-200"
        }
      >
        <p className="text-sm text-sky-700 tracking-widest">{date}</p>
      </div>
    </Link>
  );
};

export default Day;
