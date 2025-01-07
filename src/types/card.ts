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
};

export type BadgeProps = {
  status: string;
  recruitmentDate: Date;
};
