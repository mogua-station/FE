import { useMemo } from "react";

export const isPrevDisabled = ({
  year,
  month,
  minDate,
}: {
  year: number;
  month: number;
  minDate: Date;
}) => {
  return useMemo(() => {
    const prevMonthDate = new Date(year, month - 1, 1);
    const minMonthDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    return prevMonthDate < minMonthDate;
  }, [year, month, minDate]);
};

export const isNextDisabled = ({
  year,
  month,
  maxDate,
}: {
  year: number;
  month: number;
  maxDate: Date;
}) => {
  return useMemo(() => {
    const nextMonthDate = new Date(year, month + 1, 1);
    const maxMonthDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
    return nextMonthDate > maxMonthDate;
  }, [year, month, maxDate]);
};

export const isOutOfRange = (
  date: number,
  state: "prev" | "next" | "current",
  year: number,
  month: number,
  minDate: Date,
  maxDate: Date,
) => {
  const selectedDate = new Date(
    year,
    month + (state === "prev" ? -1 : state === "next" ? 1 : 0),
    date,
  );
  return selectedDate < minDate || selectedDate > maxDate;
};
