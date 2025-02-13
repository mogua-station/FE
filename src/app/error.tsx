"use client";

import { useRouter } from "next/navigation";
import SolidButton from "@/components/common/buttons/SolidButton";

export type ErrorProps = {
  error: Error & { digest?: string };
};

export const dynamic = "force-dynamic";

export default function Error({ error }: ErrorProps) {
  const router = useRouter();

  return (
    <div className='flex h-full flex-1 flex-col items-center justify-center gap-4'>
      <p className='text-gray-100'>
        {error?.message || "오류가 발생했습니다."}
      </p>

      <SolidButton
        className='w-fit'
        size='small'
        onClick={() => router.replace("/")}
      >
        홈으로 돌아가기
      </SolidButton>
    </div>
  );
}
