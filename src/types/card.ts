import {
  type QueryObserverResult,
  type InfiniteData,
} from "@tanstack/react-query";

export interface ParticipantInfo {
  userId: number;
  profileImageUrl: string;
}

export interface CardProps {
  meetupId: number;
  meetingType: "STUDY" | "TUTORING";
  meetupStatus: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "BEFORE_START";
  location?:
    | "CAPITAL"
    | "DAEJEON"
    | "JEONJU"
    | "GWANGJU"
    | "BUSAN"
    | "DAEGU"
    | "GANGNEUNG";
  title: string;
  minParticipants: number;
  recruitmentStartDate: Date;
  recruitmentEndDate: Date;
  meetingStartDate: Date;
  meetingEndDate: Date;
  thumbnail?: string;
  online: boolean;
  participants: ParticipantInfo[];
  isReview?: boolean; //리뷰 작성 가능한 상태?
  isMypage?: boolean;
  isWishlist?: boolean;
  callback?: () => Promise<
    QueryObserverResult<
      InfiniteData<Error | { data: any; page: number }, unknown>,
      Error
    >
  >;
}

export interface CardProps2 {
  meetupId: number;
  meetingType: "STUDY" | "TUTORING";
  status: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "BEFORE_START";
  location?:
    | "CAPITAL"
    | "DAEJEON"
    | "JEONJU"
    | "GWANGJU"
    | "BUSAN"
    | "DAEGU"
    | "GANGNEUNG";
  title: string;
  minParticipants: number;
  recruitmentStartDate: Date;
  recruitmentEndDate: Date;
  meetingStartDate: Date;
  meetingEndDate: Date;
  thumbnail?: string;
  online: boolean;
  participants: ParticipantInfo[];
}

export interface CardInfo {
  card: CardProps;
}

export interface BadgeProps {
  meetupStatus: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "BEFORE_START";
  recruitmentEndDate: Date;
  confirm: boolean;
  isMypage?: boolean;
}

export interface BadgeInfo {
  badge: BadgeProps;
}

export interface CardContentProps {
  content: Pick<
    CardProps,
    | "title"
    | "location"
    | "participants"
    | "recruitmentStartDate"
    | "recruitmentEndDate"
    | "meetingStartDate"
    | "meetingEndDate"
    | "thumbnail"
  >;
}

export interface QueryProps {
  data: CardProps[];
  page: number;
}

export interface CacheResult {
  pageParams: number[];
  pages: QueryProps[];
}
