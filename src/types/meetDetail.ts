export interface ParticipantInfo {
  userId: number;
  profileImageUrl: string;
}

export interface ClientInfo {
  meetupId: number;
  hostId: number;
  participants: ParticipantInfo[];
  maxParticipants: number;
  minParticipants: number;
  meetupStatus: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "BEFORE_START";
}

export interface MeetProps {
  meetupId: number;
  meetingType: "STUDY" | "TUTORING";
  meetupStatus: "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "BEFORE_START";
  location:
    | "CAPITAL"
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
  recruitmentStartDate: Date;
  recruitmentEndDate: Date;
  meetingStartDate: Date;
  meetingEndDate: Date;
  thumbnail: string;
  hostId: number;
  hostNickname: string;
  online: boolean;
  participants: ParticipantInfo[];
}

export interface MeetInfo {
  meetInfo: MeetProps;
}
