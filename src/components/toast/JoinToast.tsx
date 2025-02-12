"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast, type ToastContentProps } from "react-toastify";
import JoinCheck from "@/assets/images/icons/join-check.svg";
import useUserStore from "@/store/auth/useUserStore";

interface JoinToastProps extends ToastContentProps {
  toastType:
    | "join"
    | "copy"
    | "leave"
    | "wishlistError"
    | "wishlistAdd"
    | "wishlistRemove"
    | "deleteMeetup";
}

export default function JoinToast({ closeToast, toastType }: JoinToastProps) {
  const router = useRouter();
  const { user } = useUserStore();

  const handleClickUser = () => {
    if (closeToast) closeToast(); // closeToast가 undefined일 수 있으므로 체크
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
        <JoinCheck
          className={`${toastType === "wishlistError" || toastType === "deleteMeetup" ? "text-[#F56973]" : "text-[#13C299]"} absolute left-0 top-1/2 -translate-y-1/2`}
        />
        {toastType === "join" && "모임 신청이 완료되었어요"}
        {toastType === "copy" && "모임 링크를 복사했어요"}
        {toastType === "leave" && "모임 신청취소가 완료되었어요"}
        {toastType === "wishlistError" && "모집중인 모임만 가능합니다"}
        {toastType === "wishlistAdd" && "찜하기가 완료되었습니다"}
        {toastType === "wishlistRemove" && "찜하기가 취소되었습니다"}
        {toastType === "deleteMeetup" && "모임삭제 기능이 추가될 예정이에요"}
      </p>
      {toastType === "join" && (
        <button
          className='rounded-[20px] bg-gray-600 px-3 py-2.5 text-label-normal font-medium text-gray-200'
          onClick={handleClickUser}
          aria-label={`${user?.userId} 페이지 이동 버튼`}
        >
          내역확인
        </button>
      )}
    </div>
  );
}
