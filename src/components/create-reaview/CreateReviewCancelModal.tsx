"use client";

import { useRouter } from "next/navigation";
import SolidButton from "../common/buttons/SolidButton";

export default function CreateReviewCancelModal({
  userId,
  close,
}: {
  userId: number;
  close: () => void;
}) {
  const router = useRouter();

  const handleBack = () => {
    close();
    router.replace(`/user/${userId}`);
  };

  return (
    <div className='mx-auto w-[238px] rounded-3xl bg-gray-800 pb-2 pt-[11px]'>
      <div className='text-center'>
        <p className='text-heading-2 font-medium text-gray-100'>
          취소하고 나갈까요?
        </p>
        <p className='mt-3 text-body-2-normal font-medium text-gray-400'>
          나가면 내용이 저장되지 않아요
        </p>
      </div>
      <div className='mt-6 flex h-[52px] gap-[7px] text-body-2-normal font-semibold'>
        <SolidButton
          className='h-full border-none bg-gray-600'
          variant='secondary'
          state='default'
          onClick={handleBack}
        >
          나가기
        </SolidButton>
        <SolidButton
          className='h-full w-fit text-nowrap border-none'
          variant='secondary'
          state='activated'
          onClick={() => close()}
        >
          이어서 작성하기
        </SolidButton>
      </div>
    </div>
  );
}
