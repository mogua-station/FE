import { type MeetProps } from "@/types/meetDetail";
import { type MeetupFormType } from "@/types/meetup.type";

const getDefaultValues = (meetupData?: MeetProps): MeetupFormType => {
  return meetupData
    ? {
        title: meetupData.title,
        meetingType: meetupData.meetingType,
        location: meetupData.location,
        content: meetupData.content,
        recruitmentStartDate: new Date(meetupData.recruitmentStartDate),
        recruitmentEndDate: new Date(meetupData.recruitmentEndDate),
        meetingStartDate: new Date(meetupData.meetingStartDate),
        meetingEndDate: new Date(meetupData.meetingEndDate),
        minParticipants: meetupData.minParticipants,
        maxParticipants: meetupData.maxParticipants,
        isOnline: meetupData.isOnline,
      }
    : {
        title: "",
        meetingType: "STUDY",
        location: "",
        content: "",
        recruitmentStartDate: new Date(),
        recruitmentEndDate: null,
        meetingStartDate: null,
        meetingEndDate: null,
        minParticipants: 2,
        maxParticipants: 10,
        isOnline: false,
      };
};

export default getDefaultValues;
