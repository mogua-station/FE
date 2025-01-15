export interface CardProps {
  id: number;
  status: string;
  itemType: string;
  title: string;
  location: string;
  participants: number;
  recruitmentPeriod: { startDate: Date; endDate: Date };
  eventPeriod: { startDate: Date; endDate: Date };
  image?: string;
  isReview?: boolean; //리뷰 작성 가능한 상태?
}

export interface CardInfo {
  card: CardProps;
}

export interface BadgeProps {
  status: string;
  recruitmentDate?: Date;
}

export interface CardContentProps {
  content: Pick<
    CardProps,
    | "title"
    | "location"
    | "participants"
    | "recruitmentPeriod"
    | "eventPeriod"
    | "image"
  >;
}
