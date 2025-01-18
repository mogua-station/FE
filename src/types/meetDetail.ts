export interface ParticipantInfo {
  userId: number;
  userProfile: string;
}

export interface ClientInfo {
  meetupId: number;
  hostId: number;
  hostNickname: string;
  participants: ParticipantInfo[];
  minParticipants: number;
  stauts: "RECRUITING" | "IN_PROGRESS" | "COMPLETED";
}

export interface MeetProps {
  meetupId: number;
  meetingType: "STUDY" | "TUTORING";
  status: "RECRUITING" | "IN_PROGRESS" | "COMPLETED";
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
  thumbnail?: string;
  hostId: number;
  hostNickname: string;
  online: boolean;
  participants: ParticipantInfo[];
}

export interface MeetInfo {
  meetInfo: MeetProps;
}
