interface CalendarDatesGridProps {
  prevDates: number[];
  currentDates: number[];
  nextDates: number[];
  getDateWrapperStyles: (
    date: number,
    index: number,
    state?: "prev" | "current" | "next",
  ) => string;
  getDateStyles: (
    date: number,
    index: number,
    state?: "prev" | "current" | "next",
  ) => string;
  handleDateClick: ({
    date,
    state,
  }: {
    date: number;
    state?: "prev" | "current" | "next";
  }) => void;
}

export function CalendarDatesGrid({
  prevDates,
  currentDates,
  nextDates,
  getDateWrapperStyles,
  getDateStyles,
  handleDateClick,
}: CalendarDatesGridProps) {
  return (
    <div className='grid size-full h-auto grid-cols-7 grid-rows-6 text-body-1-normal'>
      {prevDates.map((date, index) => (
        <div
          key={`prev-${date}`}
          className={getDateWrapperStyles(date, index, "prev")}
          onClick={() => handleDateClick({ date, state: "prev" })}
        >
          <div className={getDateStyles(date, index, "prev")}>{date}</div>
        </div>
      ))}
      {currentDates.map((date, index) => (
        <div
          key={`current-${date}`}
          className={getDateWrapperStyles(date, index)}
          onClick={() => handleDateClick({ date })}
        >
          <div className={getDateStyles(date, index)}>{date}</div>
        </div>
      ))}
      {nextDates.map((date, index) => (
        <div
          key={`next-${date}`}
          className={getDateWrapperStyles(date, index, "next")}
          onClick={() => handleDateClick({ date, state: "next" })}
        >
          <div className={getDateStyles(date, index, "next")}>{date}</div>
        </div>
      ))}
    </div>
  );
}
