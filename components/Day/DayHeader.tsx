import { useEffect, useState, useTransition } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { getMonthName, dayNames, getOrdinal } from "../utils";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);

const DayHeader = () => {
  const router = useRouter();
  const { date } = router.query;
  const [dateDisplay, setDateDisplay] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (router.isReady) {
      const day = dayjs(date as string).date();
      const weekday = dayjs(date as string).weekday();
      const month = dayjs(date as string).month();
      startTransition(() => {
        setDateDisplay(
          `${dayNames[weekday]}, ${getMonthName(month)} ${getOrdinal(day)} `
        );
      });
    }
  }, [date]);

  return (
    <div className="max-w-screen-xl m-auto bg-white">
      <div className="w-full px-2 h-20 flex justify-between items-center">
        <Link
          href={{
            pathname: `/day/${dayjs(date as string)
              .subtract(1, "day")
              .format("YYYY-MM-DD")}`,
          }}
        >
          <ArrowLeftIcon className="h-5 w-5 text-sky-700" />
        </Link>
        {isPending && "...loading"}
        <p className="text-xl tracking-wider text-center font-sans text-sky-700">
          {dateDisplay}
        </p>
        <Link
          href={{
            pathname: `/day/${dayjs(date as string)
              .add(1, "day")
              .format("YYYY-MM-DD")}`,
          }}
        >
          <ArrowRightIcon className="h-5 w-5 text-sky-700" />
        </Link>
      </div>
    </div>
  );
};

export default DayHeader;
