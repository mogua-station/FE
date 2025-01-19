// 유저 프로필 타입
export type UserProfile = {
  userId: number;
  email: string;
  nickname: string;
  profileImg: string;
  qualificationStatus: "QUALIFIED" | "UNQUALIFIED";
  bio: string;
  userTagList: Array<{ id: number; tag: string }>;
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
  userId: string;
  currentUserId: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  status: string;
  data: T[];
  message: string | null;
  additionalData: {
    isLast: boolean;
    nextPage: number;
  };
}

export interface ParticipatingMeetup {
  meetupId: number;
  title: string;
  meetingType: "STUDY" | "TUTORING";
  location:
    | "CAPITAL"
    | "DAEJEON"
    | "JEONJU"
    | "GWANGJU"
    | "BUSAN"
    | "DAEGU"
    | "GANGNEUNG";
  content: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  meetingStartDate: string;
  meetingEndDate: string;
  maxParticipants: number;
  minParticipants: number;
  thumbnail: string;
  hostNickname: string;
  hostId: number;
  participants: Array<{
    userId: number;
    profileImageUrl: string;
  }>;
  status: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "BEFORE_START";
  online: boolean;
}

export interface CreatedMeetup {
  meetupId: number;
  meetupStatus: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "BEFORE_START";
  location:
    | "CAPITAL"
    | "DAEJEON"
    | "JEONJU"
    | "GWANGJU"
    | "BUSAN"
    | "DAEGU"
    | "GANGNEUNG";
  title: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  meetingStartDate: string;
  meetingEndDate: string;
  thumbnail: string;
  participants: number;
  online: boolean;
}

// 작성 가능한 리뷰 API 응답 타입
export interface EligibleReview {
  meetupId: number;
  status: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "BEFORE_START";
  location:
    | "CAPITAL"
    | "DAEJEON"
    | "JEONJU"
    | "GWANGJU"
    | "BUSAN"
    | "DAEGU"
    | "GANGNEUNG";
  title: string;
  maxParticipants: number;
  minParticipants: number;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  meetingStartDate: string;
  meetingEndDate: string;
  thumbnail: string;
  participantsCount: number;
  online: boolean;
}

// 작성한 리뷰 API 응답 타입
export interface WrittenReview {
  userId: number;
  nickname: string;
  profileImg: string;
  rating: 0 | 1 | 2;
  id: number;
  meetupId: number;
  meetingType: "STUDY" | "TUTORING";
  title: string;
  content: string;
  meetingEndDate: string;
  thumbnail?: string;
  reviewDate: string;
}
