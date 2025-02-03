import compareDates from "./compareDates";
import { type MeetProps } from "@/types/meetDetail";
import { type MeetupFormType } from "@/types/meetup.type";

export const checkForChanges = (
  data: MeetupFormType,
  meetupData?: MeetProps,
) => {
  return Object.entries(data).some(([key, value]) => {
    const compareKey = key === "isOnline" ? "online" : key;
    if (
      [
        "recruitmentStartDate",
        "recruitmentEndDate",
        "meetingStartDate",
        "meetingEndDate",
      ].includes(key) &&
      value instanceof Date &&
      meetupData?.[compareKey as keyof MeetProps]
    ) {
      const originalDate = new Date(
        meetupData[compareKey as keyof MeetProps] as string,
      );
      return !compareDates(value, originalDate);
    }
    return value !== meetupData?.[compareKey as keyof MeetProps];
  });
};

export const prepareFormData = async (
  data: MeetupFormType,
  image: File | null,
  removedInitImage: boolean,
) => {
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(data)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);

  if (image) {
    formData.append("image", image);
  } else if (removedInitImage) {
    formData.append("image", "");
  }

  return formData;
};
