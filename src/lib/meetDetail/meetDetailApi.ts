import { type ReviewInfo, type MeetupReviewProps } from "@/types/review";

export const fetchHostData = async (hostId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/${hostId}`,
      {
        next: { revalidate: 60 * 60 }, //캐싱 한시간
      },
    );

    if (!response.ok) {
      //catch문에 error 응답객체 전달
      const error = new Error("API 요청 에러");
      (error as any).response = response;
      throw error;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

//모임 신청
export const fetchJoinMeet = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meetups/${id}/join`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (!response.ok) {
      //catch문에 error 응답객체 전달
      const error = new Error("API 요청 에러");
      (error as any).response = response;
      throw error;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

//모임 탈퇴
export const fetchLeaveMeet = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meetups/${id}/leave`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (!response.ok) {
      //catch문에 error 응답객체 전달
      const error = new Error("API 요청 에러");
      (error as any).response = response;
      throw error;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchMeetupData = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meetups/${id}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchMeetupReview = async ({
  pageParams = 0,
  meetupId,
}: MeetupReviewProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/list/${meetupId}?page=${pageParams}&limit=3`,
      {
        next: { revalidate: 60 }, //캐싱 1분
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const reviewData = await response.json();
    const reviewArr: ReviewInfo[] = reviewData.data;

    return {
      data: reviewArr,
      page: pageParams,
      nextPage: !reviewData.additionalData.isLast,
      allDataLenght: reviewArr.length,
    };
  } catch (error) {
    throw error;
  }
};
