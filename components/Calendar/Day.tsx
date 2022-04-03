import { IDay } from "./Calendar";

// interface IDayProps extends IDay {

// }

const Day = ({ dayOfTheWeek, date, month }: IDay) => {
  return (
    <div className="p-6 flex justify-center border border-zinc-300">
      <p>{date}</p>
    </div>
  );
};

export default Day;
