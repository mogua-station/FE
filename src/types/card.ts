export interface ParticipantInfo {
  userId: number;
  userProfile: string;
}

export interface CardProps {
  meetupId: number;
  meetingType: "STUDY" | "TUTORING";
  status: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "PENDING";
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
  reviewId?: number; //리뷰 작성 가능한 상태?
  isMypage?: boolean;
}

export interface CardInfo {
  card: CardProps;
}

export interface BadgeProps {
  status: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "PENDING";
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
