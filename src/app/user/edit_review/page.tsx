import { type Metadata } from "next";
import { redirect } from "next/navigation";
import AuthWrapper from "@/components/auth/AuthWrapper";

import ReviewGreeting from "@/components/create-reaview/ReviewGreeting";
import EditReviewForm from "@/components/edit-review/EditReviewForm";
import BackButton from "@/components/user/BackButton";

export const metadata: Metadata = {
  title: "리뷰 수정 | mogua",
  description: "작성한 리뷰를 수정해보세요.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EditReview({
  searchParams,
}: {
  searchParams: { reviewId: string };
}) {
  if (!searchParams.reviewId) {
    redirect("/");
  }

  return (
    <AuthWrapper>
      <div className='header-mt relative z-10 flex justify-center'>
        <div className='mx-4 mb-3.5 flex flex-1 flex-col tablet:mx-20 tablet:mb-[171px] tablet:mt-4 desktop:mx-20 desktop:mb-[104px] desktop:mt-[96px] desktop:max-w-[960px]'>
          <div className='hidden items-center justify-between border-b border-gray-900 px-5 py-2.5 *:text-gray-200 tablet:flex'>
            <h2>리뷰 수정하기</h2>
            <BackButton />
          </div>
          <ReviewGreeting />
          <EditReviewForm reviewId={searchParams.reviewId} />
        </div>
      </div>
    </AuthWrapper>
  );
}
