export type MeetupType = "study" | "tutoring";

export type StateType = "ALL" | "RECRUITING" | "IN_PROGRESS" | "COMPLETED";

export type CityType =
  | "ALL"
  | "Capital"
  | "DAEJEON"
  | "JEONJU"
  | "GWANGJU"
  | "BUSAN"
  | "DAEGU"
  | "GANGNEUNG";

export type SortType = "latest" | "deadline" | "participant";

export type DateType = {
  startDate: Date | null;
  endDate: Date | null;
};

export interface FilterType {
  city: CityType;
  state: StateType;
  date: {
    startDate: Date | null;
    endDate: Date | null;
  };
}
