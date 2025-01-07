export type CardProps = {
  id: number;
  status: string;
  itemType: string;
  title: string;
  location: string;
  participants: number;
  recruitmentPeriod: { startDate: Date; endDate: Date };
  eventPeriod: { startDate: Date; endDate: Date };
  image?: string;
  review?: boolean; //리뷰 작성 가능한 상태?
};

export type BadgeProps = {
  status: string;
  recruitmentDate: Date;
};
