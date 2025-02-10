import { type CardProps } from "@/types/card";
import { getAccessToken } from "@/utils/cookie";

export const fetchUserAllWishlist = async (userId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/wishlist/${userId}`,
      {
        cache: "no-store",
        credentials: "include",
      },
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(response.statusText || "인증 오류가 발생하였습니다");
      } else {
        throw new Error(response.statusText || "오류가 발생하였습니다.");
      }
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

//사용자의 찜 목록을 가져오는 함수
export const fetchUserWishlist = async ({
  pageParms = 0,
  userId,
}: {
  pageParms: number;
  userId: number;
}) => {
  //유저 정보가 있을 때
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/wishlist/${userId}?page=${pageParms}&limit=8&orderBy=latest&type=STUDY&state=RECRUITING&location=ALL`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        // credentials: "include",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseData = await response.json();

    return {
      data: responseData.data,
      page: pageParms,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchLocalWishlist = async ({
  pageParms = 0,
}: {
  pageParms: number;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meetups/list`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseData = await response.json();

    const meetupList = responseData.data;

    const wishlist = localStorage.getItem("wishlist");
    const arr = wishlist ? JSON.parse(wishlist as string) : [];

    //전체 리스트에서 로컬스토리지에 들어가있는 id만 필터링
    const filteredList = meetupList.filter(
      (item: CardProps) =>
        arr.includes(item.meetupId) && item.meetupStatus === "RECRUITING",
    );

    const startIndex = pageParms * 8;
    const endIndex = startIndex + 8;

    return {
      data: filteredList.slice(startIndex, endIndex),
      page: pageParms,
    };
  } catch (error) {
    throw error;
  }
};

//로그인 상태일 때 유저의 찜하기 삭제
export const deleteUserWishList = async (meetupId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/wishlist/${meetupId}`,
      {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
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

//로그인 상태일 때 유저의 찜하기 추가
export const addUserWishlist = async (meetupId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/wishlist/${meetupId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
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
