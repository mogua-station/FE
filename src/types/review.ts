export interface ReviewInfo {
  rating: string;
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
  reviewInfo: ReviewInfo;
}

export interface ContentProps {
  reviewContent: ReviewInfo;
  isOpen: boolean;
}
