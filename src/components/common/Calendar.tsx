import ArrowIcon from "@/assets/images/icons/arrow_left.svg";
import { useCalendar } from "@/hooks/useCalendar";

const WEEK = {
  style: "flex flex-1 items-center justify-center",
  daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
};

const DATE_ITEM_STYLE = "flex size-10 items-center justify-center text-center";

const DATE_STYLE = {
  base: "flex items-center justify-center h-10 cursor-pointer",
  prevNext: "text-gray-600",
  rangeStart: "ml-[0.25rem] rounded-l-full bg-orange-200/35 pr-[0.25rem]",
  rangeEnd: "mr-[0.25rem] rounded-r-full bg-orange-200/35 pl-[0.25rem]",
  roundedLeft: "rounded-l-full",
  roundedRight: "rounded-r-full",
  selected: "size-10 rounded-full bg-orange-200 text-gray-950",
  inRange: "size-full bg-orange-200/35 text-gray-200",
};

interface CalendarProps {
  selectedDates?: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onDateChange?: (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
  exposeOnDatesReset?: (fn: () => void) => void;
}

export default function Calendar({
  selectedDates,
  onDateChange,
  exposeOnDatesReset,
}: CalendarProps) {
  const {
    year,
    month,
    prevDates,
    currentDates,
    nextDates,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
    isSelected,
    isInRange,
    isRangeStart,
    isRangeEnd,
    onDatesReset,
  } = useCalendar({ selectedDates, onDateChange });

  if (exposeOnDatesReset) {
    exposeOnDatesReset(onDatesReset);
  }

  const getDateWrapperStyles = (
    date: number,
    index: number,
    state: "prev" | "next" | "current" = "current",
  ) => {
    const isPrevNext = state === "prev" || state === "next";
    const base = `${DATE_STYLE.base} ${isPrevNext ? DATE_STYLE.prevNext : ""}`;

    const isLastIndex =
      (state === "current" && index === currentDates.length - 1) ||
      (state === "next" && index === nextDates.length - 1);

    const rangeStart =
      isRangeStart({ date, state }) &&
      (!isRangeEnd({ date, state }) || (prevDates.length + index) % 7 === 0) &&
      !isLastIndex
        ? DATE_STYLE.rangeStart
        : "";
    const rangeEnd =
      isRangeEnd({ date, state }) && (prevDates.length + index) % 7 !== 0
        ? DATE_STYLE.rangeEnd
        : "";
    const roundedLeft =
      (prevDates.length + index) % 7 === 0 ? DATE_STYLE.roundedLeft : "";
    const roundedRight =
      state !== "prev" && (prevDates.length + index + 1) % 7 === 0
        ? DATE_STYLE.roundedRight
        : "";

    return [base, rangeStart, rangeEnd, roundedLeft, roundedRight]
      .filter(Boolean)
      .join(" ");
  };

  const getDateStyles = (
    date: number,
    index: number,
    state: "prev" | "next" | "current" = "current",
  ) => {
    const base = `${DATE_ITEM_STYLE} relative`;
    const selected = isSelected({ date, state }) ? DATE_STYLE.selected : "";
    const inRange = isInRange({ date, state })
      ? `${DATE_STYLE.inRange} ${
          (state === "prev" && index === 0) ||
          ((prevDates.length + index) % 7 === 0 && state === "current")
            ? DATE_STYLE.rangeStart
            : ""
        } ${
          state !== "prev" &&
          state !== "next" &&
          (prevDates.length + index + 1) % 7 === 0
            ? DATE_STYLE.rangeEnd
            : state === "next" && index === nextDates.length - 1
              ? DATE_STYLE.rangeEnd
              : ""
        }`
      : "";

    return [base, selected, inRange].filter(Boolean).join(" ");
  };

  return (
    <div className='flex w-[23rem] flex-col items-center gap-2 p-4 font-medium'>
      <div className='flex w-full items-center justify-between text-gray-100'>
        <button className='size-6' onClick={handlePrevMonth}>
          <ArrowIcon className='size-full text-gray-100 disabled:text-gray-300' />
        </button>
        <div className='text-body-1-normal'>
          {year}년 {month + 1}월
        </div>
        <button className='size-6' onClick={handleNextMonth}>
          <ArrowIcon className='size-full rotate-180 text-gray-100 disabled:text-gray-300' />
        </button>
      </div>

      <div className='flex w-full flex-col items-center text-gray-200'>
        <div className='flex h-[2.625rem] w-full justify-between text-caption-normal text-gray-400'>
          {WEEK.daysOfWeek.map((day) => (
            <div key={day} className={WEEK.style}>
              {day}
            </div>
          ))}
        </div>

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
      </div>
    </div>
  );
}
