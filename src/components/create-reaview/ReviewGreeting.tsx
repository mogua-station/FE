"use client";

import useUserStore from "@/store/auth/useUserStore";

// TODO: 유저 정보 받아와서 모과님 대신 유저 이름 넣기
export default function ReviewGreeting() {
  const { user } = useUserStore();

  return (
    <p className='mb-10 mt-[34px] text-heading-2 font-medium text-gray-200'>
      {user?.name}님 <br /> 이번 모임은 어땠나요?
    </p>
  );
}
