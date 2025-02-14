export interface ReviewInfo {
  rating: number;
  title?: string;
  content: string;
  userid: number;
  userNickname: string;
  thumbnail: string;
  updatedAt: string;
  createdAt: string;
  meetingEndDate?: Date;
  isMyReview?: boolean;
  isMyWritten?: boolean;
  eventId?: number;
  eventType?: string;
  reviewId: number;
  editable?: boolean;
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
