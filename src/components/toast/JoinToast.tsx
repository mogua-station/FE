"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, type ToastContentProps } from "react-toastify";
import JoinCheck from "@/assets/images/icons/join-check.svg";
import useUserStore from "@/store/auth/useUserStore";

interface JoinToastProps extends ToastContentProps {
  toastType:
    | "join"
    | "copy"
    | "leave"
    | "wishlistError"
    | "failed"
    | "wishlistAdd"
    | "wishlistRemove"
    | "deleteMeetup";
  errorProps?: any;
}

export default function JoinToast({
  closeToast,
  toastType,
  errorProps,
}: JoinToastProps) {
  const router = useRouter();
  const { user } = useUserStore();

  const [toastMessge, setToastMessge] = useState<string>("");

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

  useEffect(() => {
    if (toastType === "join") setToastMessge("모임 신청이 완료되었어요");

    if (toastType === "copy") setToastMessge("모임 링크를 복사했어요");

    if (toastType === "leave") setToastMessge("모임 신청취소가 완료되었어요");

    if (toastType === "wishlistError")
      setToastMessge("모집중인 모임만 가능합니다");

    if (toastType === "wishlistAdd") setToastMessge("찜하기가 완료되었습니다");

    if (toastType === "wishlistRemove")
      setToastMessge("찜하기가 취소되었습니다");

    if (toastType === "deleteMeetup")
      setToastMessge("모임삭제 기능이 추가될 예정이에요");

    if (toastType === "failed") {
      if (errorProps.statusCode === 400) {
        if (errorProps.message === "이미 이 모임을 찜하지 않았습니다.")
          setToastMessge("이미 찜하기가 취소된 모임입니다.");

        if (errorProps.message === "이미 이 모임을 찜하셨습니다")
          setToastMessge(errorProps.message);
      }

      setToastMessge("요청에 실패하였습니다");
    }
  }, []);

  return (
    <div className='border-1 flex h-[66px] w-full items-center justify-between rounded-[20px] border-solid border-gray-700 bg-gray-800-80 px-5 py-3.5 desktop:max-w-[584px]'>
      <p className='relative pl-9 text-body-2-normal font-semibold text-gray-200'>
        <JoinCheck
          className={`${toastType === "wishlistError" || toastType === "deleteMeetup" || toastType === "failed" ? "text-[#F56973]" : "text-[#13C299]"} absolute left-0 top-1/2 -translate-y-1/2`}
        />
        {toastMessge}
      </p>
      {toastType === "join" && (
        <button
          className='rounded-[20px] bg-gray-600 px-3 py-2.5 text-label-normal font-medium text-gray-200'
          onClick={() => handleClickUser()}
          aria-label={`${user?.userId} 페이지 이동 버튼`}
        >
          내역확인
        </button>
      )}
    </div>
  );
}
