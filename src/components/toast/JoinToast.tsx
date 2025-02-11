"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast, type ToastContentProps } from "react-toastify";
import JoinCheck from "@/assets/images/icons/join-check.svg";
import useUserStore from "@/store/auth/useUserStore";

interface JoinToastProps extends ToastContentProps {
  type: string;
}

export default function JoinToast({ closeToast, type }: JoinToastProps) {
  const router = useRouter();
  const { user } = useUserStore();

  const handleClickUser = () => {
    closeToast();
    router.push(`/user/${user?.userId}`);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      toast.dismiss();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className='border-1 flex h-[66px] w-full items-center justify-between rounded-[20px] border-solid border-gray-700 bg-gray-800-80 px-5 py-3.5 desktop:max-w-[584px]'>
      <p className='relative pl-9 text-body-2-normal font-semibold text-gray-200'>
        <JoinCheck className='absolute left-0 top-1/2 -translate-y-1/2 text-[#13C299]' />
        {type === "join" && "모임 신청이 완료되었어요"}
        {type === "copy" && "모임 링크를 복사했어요"}
        {type === "leave" && "모임 신청취소가 완료되었어요"}
      </p>
      {type === "join" && (
        <button
          className='rounded-[20px] bg-gray-600 px-3 py-2.5 text-label-normal font-medium text-gray-200'
          onClick={() => handleClickUser()}
        >
          내역확인
        </button>
      )}
    </div>
  );
}
