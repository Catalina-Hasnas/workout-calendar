import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DayHeader from "../../components/Day/DayHeader";

const Day: NextPage = () => {
  const router = useRouter();
  const { date, month, dayOfTheWeek } = router.query;

  return (
    <div className="backgroundPattern min-h-screen">
      <DayHeader
        currentDate={parseInt(date as string)}
        currentMonth={parseInt(month as string)}
        currentDayOfTheWeek={parseInt(dayOfTheWeek as string)}
        isReady={router.isReady}
      />
    </div>
  );
};

export default Day;
