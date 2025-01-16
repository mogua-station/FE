import type {
  MeetupPromiseType,
  MeetupQueryType,
  MeetupResponseType,
} from "@/types/meetup.type";

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
  data: MeetupResponseType[];
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

  return {
    data: data.data,
    nextPage: data.additionalData.nextPage,
    isLast: data.additionalData.isLast,
  };
};

export const createMeetup = async (formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meetups`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: 1600,
    },
  });

  return await res.json();
};
