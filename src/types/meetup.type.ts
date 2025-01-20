import {
  type Control,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";

export type MeetupType = "STUDY" | "TUTORING";

export type HybridType = "ONLINE" | "OFFLINE";

export type StateType =
  | "ALL"
  | "RECRUITING"
  | "BEFORE_START"
  | "IN_PROGRESS"
  | "COMPLETED";

export type LocationType =
  | "ALL"
  | "Capital"
  | "DAEJEON"
  | "JEONJU"
  | "GWANGJU"
  | "BUSAN"
  | "DAEGU"
  | "GANGNEUNG";

export type OrderType = "latest" | "deadline" | "participant";

export type DateType = {
  startDate: Date | null;
  endDate: Date | null;
};

export interface FilterType {
  location: LocationType;
  state: StateType;
  date: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

export interface MeetupQueryType {
  page?: number;
  limit?: number;
  type?: MeetupType;
  orderBy?: OrderType;
  state?: StateType;
  location?: LocationType;
  startDate?: string;
  endDate?: string;
}

export interface MeetupPromiseType {
  data: MeetupListResponseType[];
  additionalData: {
    nextPage: number | null;
    isLast: boolean;
  };
}

export interface MeetupListResponseType {
  meetupId: number;
  title: string;
  meetingType: MeetupType;
  location: LocationType;
  content: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  meetingStartDate: string;
  meetingEndDate: string;
  maxParticipants: number;
  minParticipants: number;
  thumbnail: string;
  participants: {
    userId: number;
    profileImageUrl: string;
  }[];
  status: StateType;
  online: boolean;
  isWishlist: boolean;
}

export interface MeetupFormType {
  title: string;
  meetingType: MeetupType;
  location: LocationType | null | "";
  content: string;
  recruitmentStartDate: Date;
  recruitmentEndDate: Date | null;
  meetingStartDate: Date | null;
  meetingEndDate: Date | null;
  maxParticipants: number;
  minParticipants: number;
  isOnline: boolean;
}

export interface BaseFormProps {
  control: Control<MeetupFormType>;
  watch: UseFormWatch<MeetupFormType>;
  setValue: UseFormSetValue<MeetupFormType>;
}
