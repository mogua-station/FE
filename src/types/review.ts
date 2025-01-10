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
  reviewInfo: ReviewInfo;
}

export interface ContentProps {
  reviewContent: ReviewInfo;
  isOpen: boolean;
}

export interface RatingStyle {
  [key: number]: string;
}
