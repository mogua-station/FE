import { Suspense } from "react";
import MainNavigation from "@/components/main/MainNavigation";
import WishlistContent from "@/components/wishlist/WishlistContent";

export default function Wishlist() {
  return (
    <div className='relative flex grow flex-col'>
      <video
        className='absolute inset-0 h-full w-full object-cover'
        src='/videos/background.mp4'
        loop
        autoPlay
        muted
        preload='auto'
        playsInline
      />

      <div className='z-10 mx-auto flex size-full max-w-[1200px] flex-col items-center justify-center gap-8 rounded-[2.5rem] px-4 pt-2 tablet:pt-[3.25rem] desktop:pb-2.5 desktop:pt-[4.5rem]'>
        <Suspense
          fallback={
            <div className='flex h-11 w-full grow items-center justify-between px-5'>
              <div className='h-full w-[6.1875rem] animate-pulse bg-gray-800' />
              <div>
                <div className='h-full w-[3.25rem] animate-pulse rounded-2xl bg-gray-800' />
                <div className='h-full w-[3.25rem] animate-pulse rounded-2xl bg-gray-800' />
              </div>
            </div>
          }
        >
          <MainNavigation />
        </Suspense>
        <WishlistContent />
      </div>
    </div>
  );
}
