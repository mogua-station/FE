export type UserPageSection =
  | "myMeeting"
  | "myReview"
  | "createdMeeting"
  | "classReview";
export type MyReviewTab = "toWrite" | "written";
export type StudyType = "study" | "tutoring";

// 유저 탭
export interface UserTabsProps {
  isInstructor?: boolean;
}

// EmptyState 공통 타입
type BaseEmptyState = {
  marginTop: string;
  content: React.ReactNode;
};

type MyReviewEmptyState = {
  toWrite: BaseEmptyState;
  written: BaseEmptyState;
};

export type EmptyStateConfig = {
  myMeeting: BaseEmptyState;
  myReview: MyReviewEmptyState;
  createdMeeting: BaseEmptyState;
  classReview: BaseEmptyState;
};

export type EmptyStateVariant =
  | Exclude<UserPageSection, "myReview">
  | { type: "myReview"; tab: MyReviewTab };

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
}

//API 관련 타입
export interface PageResponse<T> {
  items: T[];
  hasNextPage: boolean;
}

export interface FetchConfig {
  tab: UserPageSection;
  studyType: StudyType;
  reviewTab?: MyReviewTab;
  page: number;
}
