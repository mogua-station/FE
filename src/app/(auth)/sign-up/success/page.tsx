"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Spacecraft from "@/assets/images/icons/spacecraft.svg";
import SolidButton from "@/components/common/buttons/SolidButton";

const SignUPSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  // url에 페이지 도메인 작성해서 접근하는 것 방지
  if (!username) {
    router.push("/error");
    return null;
  }

  const handleConfirm = () => {
    router.push("/"); // 추후 마이페이지로 연결
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-8 bg-gray-950 p-4'>
      <div>
        <Spacecraft />
      </div>
      <div className='flex flex-col items-center justify-center gap-[6px]'>
        <p className='text-body-1-normal font-semibold text-orange-300'>
          가입 완료
        </p>
        <p className='text-heading-2 font-medium text-gray-100'>
          {username ? username : "møgua"}님 환영해요!
        </p>
      </div>
      <div className='flex w-full flex-col'>
        <SolidButton
          variant='primary'
          state='activated'
          size='large'
          onClick={handleConfirm}
        >
          확인
        </SolidButton>
      </div>
    </div>
  );
};

export default function SignUpSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUPSuccessContent />;
    </Suspense>
  );
}
