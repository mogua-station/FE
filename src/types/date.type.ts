export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export type DateState = "prev" | "next" | "current";

export interface DateClickParams {
  date: number;
  state?: DateState;
}

export interface UseCalendarProps {
  selectedDates?: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onDateChange?: (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

export interface CalendarProps {
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
