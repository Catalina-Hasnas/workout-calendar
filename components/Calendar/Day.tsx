import Link from "next/link";
import { getMonthDigit } from "../utils";
import { IDay } from "./Calendar";

const Day = ({ date, month }: IDay) => {
  const dateDigit = date < 10 ? `0${date}` : date;
  return (
    <Link
      href={{
        pathname: `/day/2022-${getMonthDigit(month)}-${dateDigit}`,
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
