import { type ReviewInfo } from "./review";

export interface HostInfo {
  userId: number;
  userName: string;
  userProfile: string;
}

export interface UserInfo {
  userId: number;
  userName: string;
  userProfile: string;
}

export interface MeetProps {
  id: number;
  meetingType: "STUDY" | "TUTORING";
  isOnline: false;
  meetingState: "RECRUITING" | "IN_PROGRESS" | "COMPLETED";
  location:
    | "Capital"
    | "DAEJEON"
    | "JEONJU"
    | "GWANGJU"
    | "BUSAN"
    | "DAEGU"
    | "GANGNEUNG";
  title: string;
  content: string;
  maxParticipants: number;
  minParticipants: number;
  recruitmentDate: {
    startDate: Date;
    endDate: Date;
  };
  meetingDate: {
    startDate: Date;
    endDate: Date;
  };
  thumbnail?: string;
  isWishlist: false;
  host: HostInfo;
  users: UserInfo[];
  reviews: ReviewInfo[];
}

export interface MeetInfo {
  meetInfo: MeetProps;
}
