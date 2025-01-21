export const fetchHostData = async (hostId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/profile/${hostId}`,
      {
        headers: {
          Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1")}`,
        },
      },
    );

    if (!res.ok) {
      //catch문에 error 응답객체 전달
      const error = new Error("API 요청 에러");
      (error as any).response = res;
      throw error;
    }

    return res.json();
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/meetups/${id}/join`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1")}`,
        },
      },
    );

    if (!res.ok) {
      //catch문에 error 응답객체 전달
      const error = new Error("API 요청 에러");
      (error as any).response = res;
      throw error;
    }

    return res.json();
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/meetups/${id}/leave`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1")}`,
        },
      },
    );

    if (!res.ok) {
      //catch문에 error 응답객체 전달
      const error = new Error("API 요청 에러");
      (error as any).response = res;
      throw error;
    }

    return res.json();
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
