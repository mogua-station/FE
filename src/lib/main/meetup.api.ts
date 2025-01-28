import type {
  MeetupPromiseType,
  MeetupQueryType,
  MeetupListResponseType,
} from "@/types/meetup.type";
import { getAccessToken } from "@/utils/cookie";

export const getMeetupList = async ({
  page = 0,
  limit = 10,
  type = "STUDY",
  orderBy = "latest",
  state,
  location,
  startDate,
  endDate,
}: MeetupQueryType): Promise<{
  data: MeetupListResponseType[];
  nextPage: number | null;
  isLast: boolean;
}> => {
  let parameters = "page=" + page + "&limit=" + limit + "&type=" + type;

  if (orderBy) parameters += "&orderBy=" + orderBy;
  if (state) parameters += "&state=" + state;
  if (location) parameters += "&location=" + location;
  if (startDate) parameters += "&startDate=" + startDate;
  if (endDate) parameters += "&endDate=" + endDate;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/meetups/list?${parameters.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 1600,
      },
    },
  );

  const data: MeetupPromiseType = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch meetup list");
  }

  if (data.data.length === 0) {
    return {
      data: [],
      nextPage: null,
      isLast: true,
    };
  }

  return {
    data: data.data,
    nextPage: data.additionalData.nextPage,
    isLast: data.additionalData.isLast,
  };
};

export const createMeetup = async (formData: FormData) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("Access token is not found");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meetups`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create meetup");
  }

  return await res.json();
};

export const editMeetup = async ({
  id,
  formData,
}: {
  id: number;
  formData: FormData;
}) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("Access token is not found");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meetups/${id}`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to edit meetup");
  }

  return await res.json();
};
