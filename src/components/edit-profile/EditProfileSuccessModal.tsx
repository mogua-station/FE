"use client";

import { useRouter } from "next/navigation";
import SolidButton from "../common/buttons/SolidButton";

export default function EditProfileSuccessModal({
  userId,
  close,
}: {
  userId: number;
  close: () => void;
}) {
  const router = useRouter();

  const handleCloseModal = async () => {
    close();
    await router.replace(`/user/${userId}`, {});
    router.refresh();
  };

  return (
    <div className='mx-auto w-[238px] rounded-3xl bg-gray-800 pb-2 pt-[11px]'>
      <div className='text-center'>
        <p className='text-heading-2 font-medium text-gray-100'>수정 완료</p>
        <p className='mt-3 text-body-2-normal font-medium text-gray-400'>
          계정 정보 변경이 완료되었어요
        </p>
      </div>
      <SolidButton
        className='mt-6'
        variant='secondary'
        state='activated'
        onClick={handleCloseModal}
      >
        확인
      </SolidButton>
    </div>
  );
}
