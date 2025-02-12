import { type CardProps } from "@/types/card";
import { type FilterProps } from "@/types/meetup.type";

export const fetchUserAllWishlist = async ({
  userId,
  pageParams = 0,
}: {
  userId: number;
  pageParams: number;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/wishlist/${userId}?page=${pageParams}&limit=50`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {

      console.log(response);
      throw new Error(response.statusText);
    }

    const resData = await response.json();

    return {
      data: resData,
      page: pageParams,
      isNext: resData.additionalData.nextPage,
    };

  } catch (error) {
    throw error;
  }
};

//사용자의 찜 목록을 가져오는 함수
export const fetchUserWishlist = async ({
  pageParams = 0,
  userId,
  filter = "",
}: {
  pageParams: number;
  userId: number;
  filter: string;
}) => {
  //유저 정보가 있을 때
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/wishlist/${userId}?page=${pageParams}&${filter}`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseData = await response.json();

    return {
      data: responseData.data,
      page: pageParams,
      isNext: responseData.additionalData.nextPage,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchLocalWishlist = async ({
  pageParms = 0,
  filter,
}: {
  pageParms: number;
  filter: FilterProps;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meetups/all`,
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseData = await response.json();

    const meetupList = responseData.data;

    const wishlist = localStorage.getItem("wishlist");
    const arr = wishlist ? JSON.parse(wishlist as string) : [];

    let filteredList: CardProps[] = [];

    //전체 리스트에서 로컬스토리지에 들어가있는 id만 필터링
    filteredList = meetupList.filter(
      (item: CardProps) =>
        arr.includes(item.meetupId) && item.meetupStatus === "RECRUITING",
    );

    if (filter.meetupType != null) {
      filteredList = filteredList.filter(
        (item: CardProps) => item.meetingType === filter.meetupType,
      );
    }

    if (filter.location != null) {
      if (filter.location !== "ALL") {
        filteredList = filteredList.filter(
          (item: CardProps) => item.location === filter.location,
        );
      }
    }

    if (filter.orderBy != null) {
      if (filter.orderBy === "latest") {
        filteredList = filteredList.sort((a, b) => {
          const aTime = new Date(a.recruitmentStartDate).getTime();
          const bTime = new Date(b.recruitmentStartDate).getTime();

          return bTime - aTime;
        });
      }

      if (filter.orderBy === "deadline") {
        filteredList = filteredList.sort((a, b) => {
          const aTime = new Date(a.recruitmentEndDate).getTime();
          const bTime = new Date(b.recruitmentEndDate).getTime();

          return aTime - bTime;
        });
      }

      if (filter.orderBy === "participant") {
        filteredList = filteredList.sort((a, b) => {
          const aLenght = a.participants.length;
          const bLenght = b.participants.length;

          return bLenght - aLenght;
        });
      }
    }

    const startIndex = pageParms * filter.limit;
    const endIndex = startIndex + filter.limit;

    return {
      data: filteredList.slice(startIndex, endIndex),
      page: pageParms,
      isNext:
        filteredList.length - (startIndex + 1) * filter.limit > 0
          ? true
          : false,
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
        method: "DELETE",
        credentials: "include",
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
        credentials: "include",
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
