import Link from "next/link";
import { type ContentProps, type RatingStyle } from "@/types/review";

export default function Content({ reviewContent, isOpen }: ContentProps) {
  const reviewTextStyle: RatingStyle = {
    0: "text-purple-200",
    1: "text-blue-200",
    2: "text-orange-200",
  };

  const ratingArr = ["그냥그래요", "괜찮아요", "추천해요"];

  return (
    <div className='w-full'>
      <div className='flex'>
        <span
          className={`inline-block px-2 py-[3px] text-caption-normal ${reviewTextStyle[reviewContent.rating]} rounded-[20px] bg-gray-700`}
        >
          {ratingArr[reviewContent.rating]}
        </span>
      </div>

      {reviewContent.isMyReview && (
        <div className='mt-2 flex'>
          <span className='caption-stroke relative inline-block pr-2 text-label-reading font-regular text-gray-400'>
            {reviewContent.title}
          </span>
          <span className='inline-block pl-2 text-label-reading font-regular text-gray-400'>
            {reviewContent.meetingEndDate?.toLocaleDateString("ko-KR") ?? "-"}
          </span>
        </div>
      )}

      <p
        className={`body-2-reading mt-4 break-keep text-gray-200 ${isOpen ? "" : "comment-overflow comment-overflow-webkit"}`}
      >
        {reviewContent.review}
      </p>
      <div className='mt-4 flex justify-end'>
        <div className='flex items-center'>
          <Link
            href={`/user/${reviewContent.userid}`}
            className='flex items-center gap-2'
          >
            <div className='flex h-7 w-7 items-center justify-center rounded-[50%] bg-gray-800'>
              <div className='h-6 w-6 overflow-hidden rounded-[50%] bg-gray-700'>
                <img
                  src={`${reviewContent.userprofile != null ? reviewContent.userprofile : "/images/default_user_profile.png"}`}
                  alt='유저 이미지'
                  className='object-cover'
                />
              </div>
            </div>
            <span className='caption-stroke relative inline-block pr-2 text-caption-normal font-regular text-gray-400'>
              {reviewContent.username}
            </span>
          </Link>
          <span className='inline-block pl-2 text-caption-normal font-regular text-gray-400'>
            {reviewContent.date.toLocaleDateString("ko-KR")}
          </span>
        </div>
      </div>
    </div>
  );
}
