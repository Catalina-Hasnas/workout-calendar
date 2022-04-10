const Day = ({ date }: { date: number }) => {
  return (
    <div
      className={
        "pb-16 pt-2 px-2 flex justify-end items-start border border-zinc-200 " +
        (date === 99 && "disabledPattern")
      }
    >
      {date !== 99 && (
        <p className="text-sm text-sky-700 tracking-widest">{date}</p>
      )}
    </div>
  );
};

export default Day;
