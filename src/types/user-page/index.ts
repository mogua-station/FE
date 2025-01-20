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

// 공통 상수 타입
export type MeetingType = "STUDY" | "TUTORING";
export type MeetingStatus =
  | "RECRUITING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "BEFORE_START";
export type Location =
  | "CAPITAL"
  | "DAEJEON"
  | "JEONJU"
  | "GWANGJU"
  | "BUSAN"
  | "DAEGU"
  | "GANGNEUNG";

// 기본 모임 정보
interface BaseMeetup {
  meetupId: number;
  title: string;
  location: Location;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  meetingStartDate: string;
  meetingEndDate: string;
  thumbnail: string;
  online: boolean;
}

// 탭 목록 관련 타입
export type UserPageSection =
  | "myMeeting"
  | "myReview"
  | "createdMeeting"
  | "classReview";
export type MyReviewTab = "toWrite" | "written";
export type StudyType = "study" | "tutoring";

export interface UserTabsProps {
  userId: string;
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

export interface ParticipatingMeetup extends BaseMeetup {
  meetingType: MeetingType;
  content: string;
  maxParticipants: number;
  minParticipants: number;
  hostNickname: string;
  hostId: number;
  participants: Array<{
    userId: number;
    profileImageUrl: string;
  }>;
  meetupStatus: MeetingStatus;
}

export interface CreatedMeetup extends BaseMeetup {
  meetupStatus: MeetingStatus;
  participants: number;
}

export interface EligibleReview extends BaseMeetup {
  status: MeetingStatus;
  maxParticipants: number;
  minParticipants: number;
  participantsCount: number;
}

export interface WrittenReview {
  userId: number;
  nickname: string;
  profileImg: string;
  rating: 0 | 1 | 2;
  id: number;
  meetupId: number;
  meetingType: MeetingType;
  title: string;
  content: string;
  meetingEndDate: string;
  thumbnail?: string;
  reviewDate: string;
}
