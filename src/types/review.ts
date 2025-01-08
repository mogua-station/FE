export interface ReviewInfo {
  rating: number;
  title?: string;
  review: string;
  userid: number;
  userprofile?: string;
  date: Date;
  isMyReview?: boolean;
}

export interface ReviewInfoProps {
  reviewinfo: ReviewInfo;
}

export interface ContentProps {
  review: ReviewInfo;
  isOpen: boolean;
}
