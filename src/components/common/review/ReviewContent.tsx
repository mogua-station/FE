import Link from "next/link";
import { type ContentProps } from "@/types/review";

export default function Content({ reviewContent, isOpen }: ContentProps) {
  const contentStyle = reviewContent.isMyWritten
    ? ""
    : isOpen
      ? ""
      : "comment-overflow comment-overflow-webkit";

  return (
    <div className='w-full'>
      {reviewContent.isMyReview && (
        <div className='mt-2 flex'>
          <span className='caption-stroke relative inline-block pr-2 text-label-reading font-regular text-gray-400'>
            {reviewContent.title}
          </span>
          <span className='inline-block pl-2 text-label-reading font-regular text-gray-400'>
            {new Date().toLocaleDateString("ko-KR")}
          </span>
        </div>
      )}

      <p
        className={`body-2-reading mt-4 break-keep text-gray-200 ${contentStyle}`}
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
