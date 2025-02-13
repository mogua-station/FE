import { type CardProps } from "@/types/card";
import { type ReviewInfo } from "@/types/review";

// ===== 공통 상수 타입 =====
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

// ===== 기본 모임 정보 =====
interface BaseMeetup {
  meetupId: number;
  title: string;
  location: Location;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  meetingStartDate: string;
  meetingEndDate: string;
  thumbnail: string;
  isOnline: boolean;
}

// ===== 유저 프로필 타입 =====
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

// ===== 탭 관련 타입 =====
export type UserPageSection =
  | "myMeeting"
  | "myReview"
  | "createdMeeting"
  | "classReview";
export type MyReviewTab = "toWrite" | "written";
export type StudyType = "study" | "tutoring";

// ===== EmptyState 관련 타입 =====
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
  | "myMeeting"
  | "createdMeeting"
  | "classReview"
  | { type: "myReview"; tab: "toWrite" | "written" };

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  isMe?: boolean;
}

// ===== API 응답 타입 =====
export interface ApiResponse<T> {
  status: string;
  data: T[];
  message: string | null;
  additionalData: {
    isLast: boolean;
    nextPage: number;
  };
}

export interface PageResponse<T> {
  items: T[];
  hasNextPage: boolean;
  nextPage: number;
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
  meetupId: number;
  title: string;
  reviewId: number;
  content: string;
  meetingEndDate: string;
  thumbnail: string | null;
  reviewThumbnail?: string | null;
  reviewDate: string;
  editabel: boolean;
}

// ===== API 요청 설정 타입 =====
export interface FetchConfig {
  tab: UserPageSection;
  studyType: StudyType;
  reviewTab?: MyReviewTab;
  page: number;
  userId: string;
  currentUserId: string;
}

// ===== 타입가드 함수 =====
export function isMeetingCard(item: CardProps | ReviewInfo): item is CardProps {
  return "meetupId" in item && "meetupStatus" in item;
}

export function isReviewInfo(item: CardProps | ReviewInfo): item is ReviewInfo {
  return "userid" in item && "review" in item;
}

// ===== 컴포넌트 Props 타입 =====
export interface UserProfileProps {
  userInfo: UserProfile;
}

export interface UserTabsProps {
  userId: string;
  isInstructor?: boolean;
}

export interface TabListProps {
  currentTab: UserPageSection;
  onChange: (tab: UserPageSection) => void;
  isInstructor?: boolean;
}

export interface StudyTypeFilterProps {
  value: StudyType;
  onChange: (value: StudyType) => void;
}

export interface ReviewTabsProps {
  value: MyReviewTab;
  onChange: (value: MyReviewTab) => void;
}

export interface MeetingListProps {
  userId: string;
  tab: UserPageSection;
  studyType: StudyType;
  reviewTab?: MyReviewTab;
  isMe: boolean;
}
