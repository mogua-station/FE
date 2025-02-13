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
  isOnline: boolean;
  participants: ParticipantInfo[];
  isReview?: boolean; //리뷰 작성 가능한 상태?
  isMypage?: boolean;
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
    | "isOnline"
  >;
}

export interface WishlistMutationProps {
  additionalData: {
    isLast: boolean;
    nextPage: number | boolean;
  };
  data: CardProps[];
  message: string | null;
  status: string;
}
