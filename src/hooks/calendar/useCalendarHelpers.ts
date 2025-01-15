import { useCallback } from "react";

function isSameDay(date1: Date | null, date2: Date | null) {
  if (!date1 || !date2) return false;
  return date1.toDateString() === date2.toDateString();
}

export function useIsOutOfRange(minDate: Date, maxDate: Date) {
  return useCallback(
    (targetDate: Date) => targetDate < minDate || targetDate > maxDate,
    [minDate, maxDate],
  );
}

export function useIsSelected(
  getSelectedDate: (date: number, state: "prev" | "next" | "current") => Date,
  startDate: Date | null,
  endDate: Date | null,
) {
  return useCallback(
    ({
      date,
      state = "current",
    }: {
      date: number;
      state?: "prev" | "next" | "current";
    }) => {
      const target = getSelectedDate(date, state);
      return isSameDay(target, startDate) || isSameDay(target, endDate);
    },
    [startDate, endDate, getSelectedDate],
  );
}

export function useIsInRange(
  getSelectedDate: (date: number, state: "prev" | "next" | "current") => Date,
  startDate: Date | null,
  endDate: Date | null,
) {
  return useCallback(
    ({
      date,
      state = "current",
    }: {
      date: number;
      state?: "prev" | "next" | "current";
    }) => {
      const target = getSelectedDate(date, state);
      return startDate && endDate && target > startDate && target < endDate;
    },
    [startDate, endDate, getSelectedDate],
  );
}

export function useIsRangeStart(
  getSelectedDate: (date: number, state: "prev" | "next" | "current") => Date,
  startDate: Date | null,
  endDate: Date | null,
) {
  return useCallback(
    ({
      date,
      state = "current",
    }: {
      date: number;
      state?: "prev" | "next" | "current";
    }) => {
      const target = getSelectedDate(date, state);
      return startDate && endDate && isSameDay(target, startDate);
    },
    [startDate, endDate, getSelectedDate],
  );
}

export function useIsRangeEnd(
  getSelectedDate: (date: number, state: "prev" | "next" | "current") => Date,
  endDate: Date | null,
) {
  return useCallback(
    ({
      date,
      state = "current",
    }: {
      date: number;
      state?: "prev" | "next" | "current";
    }) => {
      const target = getSelectedDate(date, state);
      return endDate && isSameDay(target, endDate);
    },
    [endDate, getSelectedDate],
  );
}
