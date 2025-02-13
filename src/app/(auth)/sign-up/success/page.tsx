"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Spacecraft from "@/assets/images/icons/spacecraft.svg";
import SolidButton from "@/components/common/buttons/SolidButton";

const SignUPSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams?.get("username");

  // url에 페이지 도메인 작성해서 접근하는 것 방지
  if (!username) {
    router.push("/error");
    return null;
  }

  const handleConfirm = () => {
    router.push("/"); // 추후 마이페이지로 연결
  };

  return (
    <div className='relative flex flex-grow flex-col justify-center overflow-hidden bg-gray-950'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className='z-10 mx-auto flex flex-col items-center justify-center gap-8 p-4 tablet:h-[70%] tablet:w-[90%] tablet:rounded-[2.5rem] tablet:bg-gray-950/[0.48] tablet:px-6 desktop:w-[60%]'
      >
        {/* 컨텐츠 영역 */}
        {/* 이미지 및 텍스트 */}
        <div className='flex flex-col items-center justify-center gap-4'>
          <div>
            <Spacecraft />
          </div>
          <p className='text-body-1-normal font-semibold text-orange-300'>
            가입 완료
          </p>
          <p className='text-heading-2 font-medium text-gray-100'>
            {username || "møgua"}님 환영해요!
          </p>
        </div>

        {/* 버튼 */}
        <div className='absolute bottom-0 left-0 right-0 p-4 tablet:relative tablet:w-[60%]'>
          <SolidButton
            variant='primary'
            state='activated'
            size='large'
            onClick={handleConfirm}
          >
            확인
          </SolidButton>
        </div>
      </motion.div>
    </div>
  );
};

export default function SignUpSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUPSuccessContent />
    </Suspense>
  );
}
