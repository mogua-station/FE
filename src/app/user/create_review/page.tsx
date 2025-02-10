import { redirect } from "next/navigation";
import CreateReviewForm from "@/components/create-reaview/CreateReviewForm";
import ReviewGreeting from "@/components/create-reaview/ReviewGreeting";
import BackButton from "@/components/user/BackButton";

export default function CreateReview({
  searchParams,
}: {
  searchParams: { meetupId: string };
}) {
  if (!searchParams.meetupId) {
    redirect("/");
  }

  return (
    // TODO: NavBar 없는 레이아웃 적용 필요
    <div className='header-mt nav-mb relative z-10 flex justify-center'>
      <div className='mx-4 mb-3.5 flex flex-1 flex-col tablet:mx-20 tablet:mb-[171px] tablet:mt-4 desktop:mx-20 desktop:mb-[104px] desktop:mt-[96px] desktop:max-w-[960px]'>
        <div className='hidden items-center justify-between border-b border-gray-900 px-5 py-2.5 *:text-gray-200 tablet:flex'>
          <h2>리뷰 작성하기</h2>
          <BackButton />
        </div>
        <ReviewGreeting />
        <CreateReviewForm meetupId={searchParams.meetupId} />
      </div>
    </div>
  );
}
