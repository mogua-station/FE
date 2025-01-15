import { useCallback, useEffect, useState } from "react";
import {
  useIsOutOfRange,
  useIsSelected,
  useIsInRange,
  useIsRangeStart,
  useIsRangeEnd,
} from "./useCalendarHelpers";
import type { UseCalendarProps } from "@/types/date.type";
import generateCalendar from "@/utils/generateCalendar";

export function useCalendar({ selectedDates, onDateChange }: UseCalendarProps) {
  const today = new Date();
  const minDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
  const maxDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [startDate, setStartDate] = useState<Date | null>(
    selectedDates?.startDate ?? null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    selectedDates?.endDate ?? null,
  );

  useEffect(() => {
    if (selectedDates) {
      setStartDate(selectedDates.startDate);
      setEndDate(selectedDates.endDate);
    }
  }, [selectedDates]);

  const { prevDates, currentDates, nextDates } = generateCalendar(year, month);

  const getSelectedDate = useCallback(
    (date: number, state: "prev" | "next" | "current" = "current") => {
      if (state === "prev") return new Date(year, month - 1, date);
      if (state === "next") return new Date(year, month + 1, date);
      return new Date(year, month, date);
    },
    [year, month],
  );

  const isOutOfRange = useIsOutOfRange(minDate, maxDate);
  const isSelected = useIsSelected(getSelectedDate, startDate, endDate);
  const isInRange = useIsInRange(getSelectedDate, startDate, endDate);
  const isRangeStart = useIsRangeStart(getSelectedDate, startDate, endDate);
  const isRangeEnd = useIsRangeEnd(getSelectedDate, endDate);

  useEffect(() => {
    setStartDate(selectedDates?.startDate ?? null);
    setEndDate(selectedDates?.endDate ?? null);
  }, [selectedDates?.startDate, selectedDates?.endDate]);

  const handlePrevMonth = useCallback(() => {
    const prevMonthDate = new Date(year, month - 1, 1);
    const minMonthDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);

    if (prevMonthDate < minMonthDate) return;

    setMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (month === 0) setYear((prev) => prev - 1);
  }, [year, month, minDate]);

  const handleNextMonth = useCallback(() => {
    const nextMonthDate = new Date(year, month + 1, 1);
    const maxMonthDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

    if (nextMonthDate > maxMonthDate) return;

    setMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (month === 11) setYear((prev) => prev + 1);
  }, [year, month, maxDate]);

  const handleDateClick = useCallback(
    ({
      date,
      state = "current",
    }: {
      date: number;
      state?: "prev" | "next" | "current";
    }) => {
      const selectedDate = getSelectedDate(date, state);
      if (isOutOfRange(selectedDate)) return;

      if (startDate && endDate) {
        setStartDate(selectedDate);
        setEndDate(null);
        onDateChange?.({ startDate: selectedDate, endDate: null });
        return;
      }

      if (!startDate) {
        setStartDate(selectedDate);
        onDateChange?.({ startDate: selectedDate, endDate: null });
        return;
      }

      if (selectedDate > startDate) {
        setEndDate(selectedDate);
        onDateChange?.({ startDate, endDate: selectedDate });
      } else {
        setStartDate(selectedDate);
        setEndDate(null);
        onDateChange?.({ startDate: selectedDate, endDate: null });
      }
    },
    [startDate, endDate, getSelectedDate, isOutOfRange, onDateChange],
  );

  const onDatesReset = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    onDateChange?.({ startDate: null, endDate: null });
  }, [onDateChange]);

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
    minDate,
    maxDate,
  };
}
