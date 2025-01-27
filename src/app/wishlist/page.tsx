import MainNavigation from "@/components/main/MainNavigation";
import WishlistContent from "@/components/wishlist/WishlistContent";
import { type MeetupQueryType } from "@/types/meetup.type";

export default function Wishlist({
  searchParams,
}: {
  searchParams: MeetupQueryType;
}) {
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
        <MainNavigation initialParams={searchParams} />
        <WishlistContent />
      </div>
    </div>
  );
}
