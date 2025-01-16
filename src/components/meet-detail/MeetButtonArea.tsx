"use client";

import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ArrowRight from "@/assets/images/icons/arrow_right.svg";
import Bookmark from "@/assets/images/icons/bookmark.svg";
import BookmarkActive from "@/assets/images/icons/bookmark_active.svg";
import IconButton from "@/components/common/buttons/IconButton";
import SolidButton from "@/components/common/buttons/SolidButton";
import useAddWishlist from "@/hooks/useToggleWishlist";
import { type ClientInfo } from "@/types/meetDetail";

interface UserTag {
  id: number;
  tag: string;
}

const fetchHostData = async (hostId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/profile/${hostId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
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
const fetchJoinMeet = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/meetups/${id}/join`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
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

//모임 탈퇴
const fetchLeaveMeet = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/meetups/${id}/leave`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
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

export default function MeetButtonArea({
  clientInfo,
}: {
  clientInfo: ClientInfo;
}) {
  //임시 유저 데이터 확인
  const user = null;

  //임시 내 유저 아이디
  const joinId = 7;

  //지금 페이지가 북마크가 되어있느지 확인
  const [bookmark, setBookmark] = useState<boolean | null>(null);
  const [joinButton, setJoinButton] = useState<boolean>(() => {
    const join =
      clientInfo.participants.filter((item) => item.userId === joinId).length >
      0;
    return join;
  });

  const { data: hostData, isLoading } = useQuery({
    queryKey: ["host", clientInfo.hostId],
    queryFn: async () => {
      const host = await fetchHostData(clientInfo.hostId);
      return host.data;
    },
  });

  const toggleWishlist = useAddWishlist();
  const router = useRouter();

  const handleClickAreaButton = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    const isBookmarked = toggleWishlist(id);
    setBookmark(isBookmarked);
  };

  const handleClickNavigateUser = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    router.push(`/user/${id}`);
  };

  const joinMutate = useMutation({
    mutationFn: (id: number) => fetchJoinMeet(id),
    onSuccess: () => {
      alert("모임 신청이 완료되었습니다.");
    },
  });

  const leaveMutate = useMutation({
    mutationFn: (id: number) => fetchLeaveMeet(id),
    onSuccess: () => {
      alert("신청 취소가 완료되었습니다.");
    },
  });

  //참여자가 변경될 때 마다
  useEffect(() => {
    const join =
      clientInfo.participants.filter((item) => item.userId === joinId).length >
      0;

    setJoinButton(join);
  }, [clientInfo.participants]);

  //븍마크 확인
  useEffect(() => {
    if (!user) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (wishlist.includes(clientInfo.meetupId)) {
        setBookmark(true);
      }
    }
  }, [user, setBookmark]);

  if (isLoading) {
    <div>로딩중..</div>;
  }

  return (
    <div className='flex flex-1 flex-col'>
      <button className='relative hidden gap-[15px] rounded-[16px] bg-gray-800 p-3 desktop:flex'>
        <div className='overflow-hidden rounded-[50%] bg-gray-600'>
          <img src='/images/share_character.png' alt='캐릭터 이미지' />
        </div>
        <div className='flex flex-col justify-between'>
          <p className='text-body text-gray-300'>친구와 함께 참여해보세요</p>
          <p className='text-left text-body-2-normal font-bold text-gray-100'>
            모임 공유하기
          </p>
        </div>
        <ArrowRight className='absolute right-10 top-1/2 size-6 -translate-y-1/2 text-gray-400' />
      </button>
      <div className='meet-info-box-small fixed bottom-0 left-0 z-50 mt-8 flex w-full gap-2 bg-gray-950 p-5 desktop:static desktop:bg-[unset] desktop:p-0'>
        <IconButton
          mode='special'
          className='w-[72px]'
          onClick={(e) => handleClickAreaButton(e, clientInfo.meetupId)}
        >
          {bookmark ? (
            <BookmarkActive className='size-6 text-orange-200' />
          ) : (
            <Bookmark className='size-6' />
          )}
        </IconButton>
        {joinButton && clientInfo.stauts === "RECRUITING" ? (
          <SolidButton
            mode='special'
            onClick={() => leaveMutate.mutate(joinId)}
          >
            신청 취소하기
          </SolidButton>
        ) : (
          <SolidButton mode='special' onClick={() => joinMutate.mutate(joinId)}>
            모임 신청하기
          </SolidButton>
        )}
      </div>
      <button
        className='meet-info-box-small mt-6 flex flex-col gap-4'
        onClick={(e) => handleClickNavigateUser(e, clientInfo.hostId)}
      >
        <span className='text-title block'>주최자 프로필</span>
        <div className='meet-info-box-inner-2 flex w-full flex-col gap-5'>
          <div className='flex gap-[14px]'>
            <div className='h-[46px] w-[46px] overflow-hidden rounded-[50%] bg-gray-700'>
              <img src={hostData?.profileImg} alt='유저 프로필' />
            </div>
            <div>
              <span className='flex items-center gap-[6px] text-body-2-normal font-medium text-gray-300'>
                {clientInfo.hostNickname}
                {hostData?.qualificationStatus == "QUALIFIED" && (
                  <span className='rounded-5 text-gary-300 inline-block rounded-[20px] bg-gray-700 px-2 py-1 text-caption-normal font-medium'>
                    과외선생님
                  </span>
                )}
              </span>
              {hostData?.bio.length === 0 && (
                <p className='text-body mt-[6px] text-gray-400'>
                  안녕하세요! 기획하는 모과입니다.
                </p>
              )}
            </div>
          </div>
          <ul className='flex gap-1'>
            {hostData?.userTagList.map((item: UserTag, index: number) => (
              <li
                className='rounded-[6px] bg-gray-600 px-2 py-[3px] text-caption-normal font-medium text-gray-300'
                key={index}
              >
                {item.tag}
              </li>
            ))}
            <li className='rounded-[6px] bg-gray-600 px-2 py-[3px] text-caption-normal font-medium text-gray-300'>
              태그
            </li>
          </ul>
        </div>
      </button>
    </div>
  );
}
