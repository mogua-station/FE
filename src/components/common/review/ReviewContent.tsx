import Link from "next/link";
import { type ContentProps } from "@/types/review";

type RatingStyle = {
  [key: string]: string;
};

export default function Content({ review, isOpen }: ContentProps) {
  const reviewTextStyle: RatingStyle = {
    그냥그래요: "text-orange-200",
    괜찮아요: "text-orange-200",
    추천해요: "text-orange-200",
  };

  return (
    <div className='w-full'>
      <div className='flex'>
        <span
          className={`inline-block px-2 py-[3px] text-caption-normal ${reviewTextStyle[review.rating]} rounded-[20px] bg-gray-700`}
        >
          {review.rating === "그냥그래요"
            ? "그냥그래요"
            : review.rating === "괜찮아요"
              ? "괜찮아요"
              : review.rating === "추천해요"
                ? "추천해요"
                : ""}
        </span>
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
