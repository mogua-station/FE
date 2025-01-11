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

// 모임 리스트
export interface MeetingListProps {
  items: BaseMeeting[] | Review[];
  variant: EmptyStateVariant;
}

// 유저 프로필
export interface UserProfile {
  userId: number;
  email?: string; // 본인에게만 표시
  nickname: string;
  profileImg: string;
  qualificationStatus: string;
  bio: string;
  userTagList: string[];
}

// 모임 공통 타입
export interface BaseMeeting {
  title: string;
  location: string;
  currentParticipants: number;
  recruitmentEndDate: string;
  meetingStartDate: string;
  meetingEndDate: string;
  thumbnail: string;
  isFavorite: boolean;
  meetupStatus: "recruiting" | "beforeStart" | "ongoing" | "ended";
  isDeadlineSoon: boolean; // 마감 10일 전
  meetupId: number;
}

// 리뷰 타입
export interface Review {
  rating: number;
  title: string;
  content: string;
  meetingStartDate: string;
  meetingEndDate: string;
  userNickname: string;
  userProfileImg: string;
  reviewDate: string;
  meetupId: number;
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
