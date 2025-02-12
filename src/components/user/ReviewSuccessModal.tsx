"use client";

import SolidButton from "@/components/common/buttons/SolidButton";

interface UserSuccessModalProps {
  title: string;
  message: string;
  close: () => void;
}

export default function UserSuccessModal({
  title,
  message,
  close,
}: UserSuccessModalProps) {
  return (
    <div className='mx-auto w-[238px] rounded-3xl bg-gray-800 pb-2 pt-[11px]'>
      <div className='text-center'>
        <p className='text-heading-2 font-medium text-gray-100'>{title}</p>
        <p className='mt-3 text-body-2-normal font-medium text-gray-400'>
          {message}
        </p>
      </div>
      <SolidButton
        className='mt-6'
        variant='secondary'
        state='activated'
        onClick={close}
      >
        확인
      </SolidButton>
    </div>
  );
}
