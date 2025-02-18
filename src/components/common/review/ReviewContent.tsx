import Image from "next/image";
import { type ContentProps } from "@/types/review";

export default function Content({ reviewContent, isOpen }: ContentProps) {
  const contentStyle = isOpen ? "" : "comment-overflow comment-overflow-webkit";

  return (
    <div className='w-full'>
      {reviewContent.isMyReview && (
        <div className='mt-2 flex'>
          <span className='caption-stroke relative inline-block pr-2 text-label-reading font-regular text-gray-400'>
            {reviewContent.title}
          </span>
          <span className='inline-block pl-2 text-label-reading font-regular text-gray-400'>
            {new Date(reviewContent.updatedAt).toLocaleDateString("ko-KR") ??
              "-"}
          </span>
        </div>
      )}

      <div>
        <p
          className={`body-2-reading mt-4 whitespace-pre-line break-keep text-gray-200 ${contentStyle}`}
        >
          {reviewContent.content}
        </p>
        {isOpen &&
          reviewContent.thumbnail &&
          typeof reviewContent.thumbnail === "string" && (
            <div className='mt-4 flex justify-end'>
              <Image
                className='size-20 rounded-lg object-cover'
                src={reviewContent.thumbnail}
                width={80}
                height={80}
                alt='리뷰 이미지'
                priority
                loading='eager'
              />
            </div>
          )}
      </div>
      <div className='mt-4 flex justify-end'>
        <div className='flex items-center'>
          <div className='flex items-center gap-2'>
            <div className='flex h-7 w-7 items-center justify-center rounded-[50%] bg-gray-800'>
              <div className='h-6 w-6 overflow-hidden rounded-[50%] bg-gray-700'>
                <Image
                  src={`https://fesi6.s3.dualstack.ap-southeast-2.amazonaws.com/profileImage/defaultProfileImages/4.png`}
                  alt='유저 이미지'
                  className='object-cover'
                  width={24}
                  height={24}
                  priority
                  loading='eager'
                />
              </div>
            </div>
            <span className='caption-stroke relative inline-block pr-2 text-caption-normal font-regular text-gray-400'>
              {reviewContent.userNickname}
            </span>
          </div>
          <span className='inline-block pl-2 text-caption-normal font-regular text-gray-400'>
            {new Date(reviewContent.updatedAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
      </div>
    </div>
  );
}
