import { useState } from "react";
import generateCalendar from "@/utils/generateCalendar";

interface UseCalendarProps {
  selectedDates?: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onDateChange?: (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

export function useCalendar({ selectedDates, onDateChange }: UseCalendarProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [startDate, setStartDate] = useState<Date | null>(
    selectedDates?.startDate || null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    selectedDates?.endDate || null,
  );

  const { prevDates, currentDates, nextDates } = generateCalendar(year, month);

  const handlePrevMonth = () => {
    setMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (month === 0) setYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (month === 11) setYear((prev) => prev + 1);
  };

  const handleDateClick = ({
    date,
    state = "current",
  }: {
    date: number;
    state?: "prev" | "next" | "current";
  }) => {
    const selectedDate = getSelectedDate(year, month, date, state);

    if (startDate && endDate) {
      setStartDate(selectedDate);
      setEndDate(null);
      onDateChange?.({ startDate: selectedDate, endDate: null });
    } else if (!startDate) {
      setStartDate(selectedDate);
      onDateChange?.({ startDate: selectedDate, endDate: null });
    } else {
      if (selectedDate > startDate) {
        setEndDate(selectedDate);
        onDateChange?.({ startDate, endDate: selectedDate });
      } else {
        setStartDate(selectedDate);
        setEndDate(null);
        onDateChange?.({ startDate: selectedDate, endDate: null });
      }
    }
  };

  const isSelected = ({
    date,
    state = "current",
  }: {
    date: number;
    state?: "prev" | "next" | "current";
  }) => {
    const selectedDate = getSelectedDate(year, month, date, state);
    return (
      (startDate && selectedDate.toDateString() === startDate.toDateString()) ||
      (endDate && selectedDate.toDateString() === endDate.toDateString())
    );
  };

  const isInRange = ({
    date,
    state = "current",
  }: {
    date: number;
    state?: "prev" | "next" | "current";
  }) => {
    const selectedDate = getSelectedDate(year, month, date, state);
    return (
      startDate && endDate && selectedDate > startDate && selectedDate < endDate
    );
  };

  const isRangeStart = ({
    date,
    state = "current",
  }: {
    date: number;
    state?: "prev" | "next" | "current";
  }) => {
    const selectedDate = getSelectedDate(year, month, date, state);
    return (
      startDate &&
      endDate &&
      selectedDate.toDateString() === startDate.toDateString() &&
      (prevDates.length + date) % 7 !== 0
    );
  };

  const isRangeEnd = ({
    date,
    state = "current",
  }: {
    date: number;
    state?: "prev" | "next" | "current";
  }) => {
    const selectedDate = getSelectedDate(year, month, date, state);
    return endDate && selectedDate.toDateString() === endDate.toDateString();
  };

  const onDatesReset = () => {
    setStartDate(null);
    setEndDate(null);
    onDateChange?.({ startDate: null, endDate: null });
  };

  return {
    year,
    month,
    startDate,
    endDate,
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
  };
}

const getSelectedDate = (
  year: number,
  month: number,
  date: number,
  state: "prev" | "next" | "current" = "current",
): Date => {
  let selectedDate = new Date(year, month, date);
  if (state === "prev") selectedDate = new Date(year, month - 1, date);
  if (state === "next") selectedDate = new Date(year, month + 1, date);
  return selectedDate;
};
