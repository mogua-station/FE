import MainNavigation from "@/components/main/MainNavigation";
import WishlistContent from "@/components/wishlist/WishlistContent";
import { type MeetupQueryType } from "@/types/meetup.type";

export default function Wishlist({
  searchParams,
}: {
  searchParams: MeetupQueryType;
}) {
  return (
    <div className='flex grow flex-col px-4 tablet:px-8 desktop:px-0'>
      <div className='z-10 mx-auto flex size-full max-w-[1200px] flex-col items-center justify-center gap-8 rounded-[2.5rem] pt-2 tablet:pt-[3.25rem] desktop:pb-2.5 desktop:pt-[4.5rem]'>
        <MainNavigation initialParams={searchParams} />
        <WishlistContent />
      </div>
    </div>
  );
}
