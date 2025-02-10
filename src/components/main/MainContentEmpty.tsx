"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { memo } from "react";
import SolidButton from "../common/buttons/SolidButton";
import EmptyImage from "@/assets/images/icons/empty.svg";

const MainContentEmpty = memo(function MainContentEmpty() {
  const router = useRouter();
  const search = useSearchParams();
  const isSearching = search.toString().length > 0 && !search.get("orderBy");

  return (
    <section className='relative size-full grow'>
      <div className='flex h-[50vh] flex-col items-center justify-center gap-4'>
        <EmptyImage />
        <p className='text-center text-body-1-reading text-gray-500'>
          {isSearching
            ? "조건에 맞는 모임이 없어요"
            : "아직 개설된 모임이 없어요"}
        </p>
        {!isSearching && (
          <div className='flex flex-col items-center gap-8'>
            <SolidButton
              size='small'
              onClick={() => {
                router.push("/create");
              }}
              aria-label='create meetup'
            >
              모임 개설하기
            </SolidButton>
          </div>
        )}
      </div>
    </section>
  );
});

export default MainContentEmpty;
