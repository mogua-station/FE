import { type ReviewInfo, type MeetupReviewProps } from "@/types/review";

export const fetchHostData = async (hostId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/${hostId}`,
      {
        headers: {
          Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1")}`,
        },
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
    // 에러 객체의 response (API 응답 객체)에 접근 가능
    if ((error as any).response) {
      const response = (error as any).response;
      if (response.status === 403) alert("사용자 인증 오류 발생");
      if (response.status === 404) alert("잘못된 경로 요청");
      if (response.status === 400) alert("잘못된 데이터 요청");
      if (response.status === 500) alert("네트워크 오류");
    }

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
        headers: {
          Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1")}`,
        },
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
    // 에러 객체의 response (API 응답 객체)에 접근 가능
    if ((error as any).response) {
      const response = (error as any).response;
      if (response.status === 403) alert("사용자 인증 오류 발생");
      if (response.status === 404) alert("잘못된 경로 요청");
      if (response.status === 400) alert(response.message);
      if (response.status === 500) alert("네트워크 오류");
    }

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
        headers: {
          Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1")}`,
        },
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
    // 에러 객체의 response (API 응답 객체)에 접근 가능
    if ((error as any).response) {
      const response = (error as any).response;
      if (response.status === 403) alert("사용자 인증 오류 발생");
      if (response.status === 404) alert("잘못된 경로 요청");
      if (response.status === 400) alert(response.message);
      if (response.status === 500) alert("네트워크 오류");
    }

    throw error;
  }
};

export const fetchMeetupData = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meetups/${id}`,
      {
        cache: "no-store", //매 요청마다 새로운 데이터를 가져온다.
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchMeetupReview = async ({
  pageParams = 0,
  meetupId,
}: MeetupReviewProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meetups/${meetupId}/reviews?page=${pageParams}&limit=3`,
      {
        cache: "no-store", //매 요청마다 새로운 데이터를 가져온다.
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const reviewData = await response.json();
    const reviewArr = reviewData.data;

    const pageSize = 3;
    const start = pageParams * pageSize;
    const end = start + pageSize;
    const data: ReviewInfo[] = reviewArr.slice(start, end);

    return {
      data: data,
      page: pageParams,
      nextPage: (pageParams + 1) * pageSize < reviewArr.length,
      allDataLenght: reviewArr.length,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
