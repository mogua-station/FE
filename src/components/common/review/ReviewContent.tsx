import Link from "next/link";
import Rating from "@/assets/images/icons/rating.svg";
import { type ContentProps } from "@/types/review";

export default function Content({ review, isOpen }: ContentProps) {
  return (
    <div className='w-full'>
      <div className='flex'>
        {Array.from({ length: 5 }, (_, i) =>
          i + 1 <= review.rating ? (
            <Rating key={i} className='size-6 text-orange-200' />
          ) : (
            <Rating key={i} className='size-6 text-gray-600' />
          ),
        )}
      </div>

      {review.isMyReview && (
        <div className='mt-2 flex'>
          <span className='caption-stroke relative inline-block pr-2 text-label-reading font-regular text-gray-400'>
            {review.title}
          </span>
          <span className='inline-block pl-2 text-label-reading font-regular text-gray-400'>
            {new Date().toLocaleDateString("ko-KR")}
            {` <= `}
            {`이건 백/디와 상의가 필요할것 같습니다.`}
          </span>
        </div>
      )}

      <p
        className={`body-2-reading mt-4 break-keep text-gray-200 ${isOpen ? "" : "comment-overflow comment-overflow-webkit"}`}
      >
        {review.review}
      </p>
      <div className='mt-4 flex justify-end'>
        <div className='flex items-center'>
          <Link
            href={`/user/${review.userid}`}
            className='flex items-center gap-2'
          >
            <div className='flex h-7 w-7 items-center justify-center rounded-[50%] bg-gray-800'>
              <div className='h-6 w-6 overflow-hidden rounded-[50%] bg-gray-700'>
                <img
                  src={`${review.userprofile != null ? review.userprofile : "/images/default_user_profile.png"}`}
                  alt='유저 이미지'
                  className='object-cover'
                />
              </div>
            </div>
            <span className='caption-stroke relative inline-block pr-2 text-caption-normal font-regular text-gray-400'>
              {review.username}
            </span>
          </Link>
          <span className='inline-block pl-2 text-caption-normal font-regular text-gray-400'>
            {review.date.toLocaleDateString("ko-KR")}
          </span>
        </div>
      </div>
    </div>
  );
}
