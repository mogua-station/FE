export const CALENDAR_CONSTANTS = {
  DAYS_IN_WEEK: 7,
  RANGE_DAYS: 90,
  MS_PER_DAY: 24 * 60 * 60 * 1000,
} as const;

export const WEEK = {
  style: "flex flex-1 items-center justify-center",
  daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
} as const;

export const DATE_STYLE = {
  base: "flex items-center justify-center h-10 cursor-pointer",
  prevNext: "text-gray-600",
  rangeStart: "ml-[0.25rem] rounded-l-full bg-orange-200/35 pr-[0.25rem]",
  rangeEnd: "mr-[0.25rem] rounded-r-full bg-orange-200/35 pl-[0.25rem]",
  roundedLeft: "rounded-l-full",
  roundedRight: "rounded-r-full",
  selected: "size-10 rounded-full bg-orange-200 text-gray-950",
  inRange: "size-full bg-orange-200/35 text-gray-200",
} as const;
