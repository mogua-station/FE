export interface ReviewInfo {
  rating: number;
  title?: string;
  review: string;
  userid: number;
  username: string;
  userprofile?: string;
  date: Date;
  meetingEndDate: Date;
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

export interface MeetupReviewProps {
  pageParams: number;
  meetupId: number;
}

export interface ReviewQueryProps {
  data: any[];
  page: number;
}
