import { CalendarDatesGrid } from "./CalendarDatesGrid";
import { CalendarDaysOfWeek } from "./CalendarDaysOfWeek";
import { CalendarHeader } from "./CalendarHeader";
import { useCalendar } from "@/hooks/calendar/useCalendar";
import type { CalendarProps } from "@/types/date.type";
import {
  isNextDisabled,
  isOutOfRange,
  isPrevDisabled,
} from "@/utils/calendarUtils";

const WEEK = {
  style: "flex flex-1 items-center justify-center",
  daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
};

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
    isInRange,
    isSelected,
    isRangeStart,
    isRangeEnd,
    onDatesReset,
    minDate,
    maxDate,
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
    const base = `${DATE_STYLE.base} ${isPrevNext ? DATE_STYLE.prevNext : ""}${
      isOutOfRange(date, state, year, month, minDate, maxDate)
        ? " cursor-default text-gray-600"
        : ""
    }`;

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
    const base =
      "flex size-10 items-center justify-center text-center relative";
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
      {/* 헤더 컴포넌트 */}
      <CalendarHeader
        year={year}
        month={month}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        isPrevDisabled={isPrevDisabled({ year, month, minDate })}
        isNextDisabled={isNextDisabled({ year, month, maxDate })}
      />

      <div className='flex w-full flex-col items-center text-gray-200'>
        {/* 요일 표시 컴포넌트 */}
        <CalendarDaysOfWeek style={WEEK.style} daysOfWeek={WEEK.daysOfWeek} />

        {/* 날짜 그리드 컴포넌트 */}
        <CalendarDatesGrid
          prevDates={prevDates}
          currentDates={currentDates}
          nextDates={nextDates}
          getDateWrapperStyles={getDateWrapperStyles}
          getDateStyles={getDateStyles}
          handleDateClick={handleDateClick}
        />
      </div>
    </div>
  );
}
