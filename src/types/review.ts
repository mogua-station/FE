export interface ReviewInfo {
  rating: number;
  title?: string;
  review: string;
  userid: number;
  username: string;
  userprofile?: string;
  date: Date;
  isMyReview?: boolean;
  eventId?: number;
  eventType?: string;
}

export interface ReviewInfoProps {
  reviewinfo: ReviewInfo;
}

export interface ContentProps {
  review: ReviewInfo;
  isOpen: boolean;
}
