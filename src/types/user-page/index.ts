// 유저 프로필 타입
export type UserProfile = {
  userId: number;
  email: string;
  nickname: string;
  profileImg: string;
  qualificationStatus: "QUALIFIED" | "UNQUALIFIED";
  bio: string;
  userTagList: string[];
  ownId: boolean;
};

// 탭 목록 관련 타입
export type UserPageSection =
  | "myMeeting"
  | "myReview"
  | "createdMeeting"
  | "classReview";
export type MyReviewTab = "toWrite" | "written";
export type StudyType = "study" | "tutoring";

export interface UserTabsProps {
  ownId: boolean;
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
