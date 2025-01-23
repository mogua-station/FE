"use client";

import { useRouter } from "next/navigation";
import SolidButton from "@/components/common/buttons/SolidButton";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  return (
    <div className='flex h-full flex-1 flex-col items-center justify-center gap-4'>
      <p className='text-gray-100'>{error?.message}</p>

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
