"use client";

import { useRouter } from "next/navigation";
import ConfirmModal from "./ConfirmModal";

interface CancelModalProps {
  userId: number;
  close: () => void;
}

export default function CancelModal({ userId, close }: CancelModalProps) {
  const router = useRouter();

  const handleBack = () => {
    close();
    router.replace(`/user/${userId}`);
  };

  return (
    <ConfirmModal
      title='취소하고 나갈까요?'
      message='나가면 내용이 저장되지 않아요'
      leftButton={{
        text: "나가기",
        onClick: handleBack,
        isActivated: false,
      }}
      rightButton={{
        text: "이어서 작성하기",
        onClick: close,
        isActivated: true,
      }}
    />
  );
}
